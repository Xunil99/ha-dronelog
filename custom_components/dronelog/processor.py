"""Warteschlange: Rohlogs auswerten (entschlüsseln, Wetter, speichern)."""

from __future__ import annotations

import asyncio
import json
import logging
import time
from collections.abc import Callable
from dataclasses import dataclass
from datetime import timedelta
from pathlib import Path

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .db import FlightStore
from .models import FileStatus
from .parser import DecryptError, KeyRejectedError, KeyRequiredError, KeyServiceError, ParseError, parse_log
from .weather import fetch_weather

_LOGGER = logging.getLogger(__name__)

EVENT_FLIGHT_ADDED = "dronelog_flight_added"
EVENT_QUEUE_CHANGED = "dronelog_queue_changed"
DJI_PAUSE_S = 1.0
DJI_BLOCK_S = 300.0
DJI_RETRY_DELAY_S = 5.0


@dataclass
class Options:
    api_key: str | None
    weather_enabled: bool = True


class Processor:
    def __init__(self, hass: HomeAssistant, store: FlightStore, raw_dir: Path, get_options: Callable[[], Options],
                 pause_s: float = DJI_PAUSE_S, retry_delay_s: float = DJI_RETRY_DELAY_S) -> None:
        self._hass = hass
        self._store = store
        self._raw_dir = raw_dir
        self._get_options = get_options
        self._pause_s = pause_s
        self._retry_delay_s = retry_delay_s
        self._queue: asyncio.Queue[str] = asyncio.Queue()
        self._queued: set[str] = set()
        self._worker: asyncio.Task | None = None
        self._dji_blocked_until = 0.0

    @property
    def is_idle(self) -> bool:
        return self._queue.empty() and (self._worker is None or self._worker.done())

    async def enqueue(self, sha256: str, *, retry: bool = False) -> None:
        """Reiht eine Datei ein. `retry` holt auch fertig/fehlerhaft markierte Dateien bewusst zurück."""
        if sha256 in self._queued:
            return
        self._queued.add(sha256)  # vor dem ersten await: schließt Doppel-Einreihung aus
        accepted = False
        try:
            job = self._hass.async_add_executor_job
            if await job(self._store.has_flight, sha256):
                return
            status = await job(self._store.file_status, sha256)
            if status is not None and status[0] is FileStatus.PROCESSED and not retry:
                return  # Flug wurde gelöscht: bleibt gelöscht
            if status is None or retry:
                await job(self._store.set_file_status, sha256, FileStatus.PENDING)
            accepted = True
        finally:
            if not accepted:
                self._queued.discard(sha256)
        self._queue.put_nowait(sha256)
        if self._worker is None or self._worker.done():
            self._worker = self._hass.async_create_background_task(self._work(), "dronelog_processor")

    async def reprocess(self, include_errors: bool = False) -> int:
        self._dji_blocked_until = 0.0  # ausdrücklicher Neuversuch hebt die Abruf-Pause auf
        wanted = [FileStatus.PENDING, FileStatus.PENDING_KEY] + ([FileStatus.ERROR] if include_errors else [])
        shas = await self._hass.async_add_executor_job(self._store.files_with_status, *wanted)
        for sha in shas:
            await self.enqueue(sha, retry=True)
        return len(shas)

    async def enqueue_unprocessed_raw(self) -> int:
        """Reiht alle abgelegten Rohdateien ein, die weder einen Flug noch einen Fehlerstatus haben (Nachimport)."""
        shas = await self._hass.async_add_executor_job(self._unprocessed_raw)
        for sha in shas:
            await self.enqueue(sha)
        return len(shas)

    def _unprocessed_raw(self) -> list[str]:
        if not self._raw_dir.exists():
            return []
        result = []
        for path in sorted(self._raw_dir.glob("*.txt")):
            sha = path.stem
            if len(sha) != 64 or self._store.has_flight(sha):
                continue
            status = self._store.file_status(sha)
            if status is None or status[0] in (FileStatus.PENDING, FileStatus.PENDING_KEY):
                result.append(sha)
        return result

    async def run_until_idle(self) -> None:
        await self._queue.join()
        if self._worker:
            await asyncio.gather(self._worker, return_exceptions=True)

    async def async_shutdown(self) -> None:
        """Bricht den Worker ab und verwirft den Rückstand (beim Entladen der Integration)."""
        if self._worker and not self._worker.done():
            self._worker.cancel()
            await asyncio.gather(self._worker, return_exceptions=True)
        while not self._queue.empty():
            self._queue.get_nowait()
            self._queue.task_done()
        self._queued.clear()

    async def _work(self) -> None:
        while not self._queue.empty():
            sha = await self._queue.get()
            try:
                await self._process(sha)
            except asyncio.CancelledError:
                raise
            except Exception as err:  # noqa: BLE001 - Warteschlange darf nie stehen bleiben
                _LOGGER.warning("Verarbeitung abgebrochen (%s)", type(err).__name__)
                await self._set_status(sha, FileStatus.ERROR, "Unerwarteter Fehler bei der Verarbeitung.")
            finally:
                self._queued.discard(sha)
                self._queue.task_done()
                self._hass.bus.async_fire(EVENT_QUEUE_CHANGED)

    async def _set_status(self, sha: str, status: FileStatus, message: str = "") -> None:
        try:
            await self._hass.async_add_executor_job(self._store.set_file_status, sha, status, message)
        except Exception as err:  # noqa: BLE001
            _LOGGER.warning("Status konnte nicht gespeichert werden (%s)", type(err).__name__)

    async def _process(self, sha: str) -> None:
        job = self._hass.async_add_executor_job
        if await job(self._store.has_flight, sha):
            await self._set_status(sha, FileStatus.PROCESSED)
            return
        options = self._get_options()
        raw = self._raw_dir / f"{sha}.txt"
        if not await job(raw.exists):
            await self._set_status(sha, FileStatus.ERROR, "Rohdatei fehlt.")
            return
        data = await job(raw.read_bytes)
        stored = await job(self._store.stored_keychains, sha)
        try:
            allowed = time.monotonic() >= self._dji_blocked_until
            try:
                flight = await job(parse_log, data, sha, options.api_key, stored, allowed)
            except KeyServiceError:
                if not allowed:
                    raise  # Pause aktiv: keine Anfrage, kein Wiederholen
                if self._retry_delay_s:
                    await asyncio.sleep(self._retry_delay_s)  # kurzer Aussetzer: einmal wiederholen, bevor pausiert wird
                flight = await job(parse_log, data, sha, options.api_key, stored, True)
        except KeyRequiredError:
            await self._set_status(sha, FileStatus.PENDING_KEY, "DJI-Key fehlt.")
            return
        except DecryptError as err:
            self._dji_blocked_until = time.monotonic() + DJI_BLOCK_S  # keine weiteren Abrufe mit ungültigem Key
            await self._set_status(sha, FileStatus.PENDING_KEY, f"{err} Bitte im Options-Dialog prüfen.")
            return
        except KeyServiceError as err:
            self._dji_blocked_until = time.monotonic() + DJI_BLOCK_S
            await self._set_status(sha, FileStatus.PENDING_KEY, str(err))
            return
        except KeyRejectedError as err:
            await self._set_status(sha, FileStatus.ERROR, str(err))
            return
        except ParseError as err:
            await self._set_status(sha, FileStatus.ERROR, str(err))
            return
        except Exception as err:  # noqa: BLE001
            _LOGGER.warning("Unerwarteter Fehler beim Auswerten (%s)", type(err).__name__)
            await self._set_status(sha, FileStatus.ERROR, "Unerwarteter Fehler beim Auswerten.")
            return

        try:
            weather = None
            if options.weather_enabled and flight.start_lat is not None and flight.start_lon is not None:
                weather = await fetch_weather(async_get_clientsession(self._hass), flight.start_lat, flight.start_lon,
                                              flight.start, flight.start + timedelta(seconds=flight.duration_s))
            name = await job(self._source_name, sha)
            flight_id = await job(self._store.add_flight, flight, weather, name)
        except asyncio.CancelledError:
            raise
        except Exception as err:  # noqa: BLE001
            _LOGGER.warning("Flug konnte nicht gespeichert werden (%s)", type(err).__name__)
            await self._set_status(sha, FileStatus.ERROR, "Speichern in der Datenbank fehlgeschlagen.")
            return
        await self._set_status(sha, FileStatus.PROCESSED)
        self._hass.bus.async_fire(EVENT_FLIGHT_ADDED, {"flight_id": flight_id, "start": flight.start.isoformat()})
        if flight.keychains_json and not stored and self._pause_s:
            await asyncio.sleep(self._pause_s)  # Rücksicht auf den DJI-Schlüsseldienst

    def _source_name(self, sha: str) -> str:
        sidecar = self._raw_dir / f"{sha}.json"
        try:
            return json.loads(sidecar.read_text(encoding="utf-8")).get("name", f"{sha}.txt")
        except (OSError, ValueError):
            return f"{sha}.txt"
