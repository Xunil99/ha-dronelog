"""Warteschlange: Rohlogs auswerten (entschlüsseln, Wetter, speichern)."""

from __future__ import annotations

import asyncio
import json
import logging
from collections.abc import Callable
from dataclasses import dataclass
from datetime import timedelta
from pathlib import Path

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .db import FlightStore
from .models import FileStatus
from .parser import DecryptError, KeyRequiredError, KeyServiceError, ParseError, parse_log
from .weather import fetch_weather

_LOGGER = logging.getLogger(__name__)

EVENT_FLIGHT_ADDED = "dronelog_flight_added"
EVENT_QUEUE_CHANGED = "dronelog_queue_changed"
DJI_PAUSE_S = 1.0


@dataclass
class Options:
    api_key: str | None
    weather_enabled: bool = True


class Processor:
    def __init__(self, hass: HomeAssistant, store: FlightStore, raw_dir: Path, get_options: Callable[[], Options],
                 pause_s: float = DJI_PAUSE_S) -> None:
        self._hass = hass
        self._store = store
        self._raw_dir = raw_dir
        self._get_options = get_options
        self._pause_s = pause_s
        self._queue: asyncio.Queue[str] = asyncio.Queue()
        self._queued: set[str] = set()
        self._worker: asyncio.Task | None = None

    async def enqueue(self, sha256: str) -> None:
        if sha256 in self._queued:
            return
        job = self._hass.async_add_executor_job
        if await job(self._store.has_flight, sha256):
            return
        if await job(self._store.file_status, sha256) is None:
            await job(self._store.set_file_status, sha256, FileStatus.PENDING)
        self._queued.add(sha256)
        self._queue.put_nowait(sha256)
        if self._worker is None or self._worker.done():
            self._worker = self._hass.async_create_background_task(self._work(), "dronelog_processor")

    async def reprocess(self, include_errors: bool = False) -> int:
        wanted = [FileStatus.PENDING, FileStatus.PENDING_KEY] + ([FileStatus.ERROR] if include_errors else [])
        shas = await self._hass.async_add_executor_job(self._store.files_with_status, *wanted)
        for sha in shas:
            await self._hass.async_add_executor_job(self._store.set_file_status, sha, FileStatus.PENDING)
            await self.enqueue(sha)
        return len(shas)

    async def enqueue_unprocessed_raw(self) -> int:
        """Reiht alle abgelegten Rohdateien ein, die weder einen Flug noch einen Fehlerstatus haben (Nachimport)."""
        job = self._hass.async_add_executor_job
        shas = await job(self._unprocessed_raw)
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

    async def _work(self) -> None:
        while not self._queue.empty():
            sha = await self._queue.get()
            try:
                await self._process(sha)
            except Exception as err:  # noqa: BLE001 - Warteschlange darf nie stehen bleiben
                _LOGGER.warning("Verarbeitung abgebrochen (%s)", type(err).__name__)
            finally:
                self._queued.discard(sha)
                self._queue.task_done()
                self._hass.bus.async_fire(EVENT_QUEUE_CHANGED)

    async def _process(self, sha: str) -> None:
        job = self._hass.async_add_executor_job
        options = self._get_options()
        raw = self._raw_dir / f"{sha}.txt"
        if not await job(raw.exists):
            await job(self._store.set_file_status, sha, FileStatus.ERROR, "Rohdatei fehlt.")
            return
        data = await job(raw.read_bytes)
        stored = await job(self._store.stored_keychains, sha)
        try:
            flight = await job(parse_log, data, sha, options.api_key, stored)
        except KeyRequiredError:
            await job(self._store.set_file_status, sha, FileStatus.PENDING_KEY, "DJI-Key fehlt.")
            return
        except KeyServiceError:
            await job(self._store.set_file_status, sha, FileStatus.PENDING_KEY, "DJI-Schlüsseldienst nicht erreichbar.")
            return
        except (DecryptError, ParseError) as err:
            await job(self._store.set_file_status, sha, FileStatus.ERROR, str(err))
            return
        except Exception as err:  # noqa: BLE001
            _LOGGER.warning("Unerwarteter Fehler beim Auswerten (%s)", type(err).__name__)
            await job(self._store.set_file_status, sha, FileStatus.ERROR, "Unerwarteter Fehler beim Auswerten.")
            return

        weather = None
        if options.weather_enabled and flight.start_lat is not None and flight.start_lon is not None:
            weather = await fetch_weather(async_get_clientsession(self._hass), flight.start_lat, flight.start_lon,
                                          flight.start, flight.start + timedelta(seconds=flight.duration_s))
        name = await job(self._source_name, sha)
        flight_id = await job(self._store.add_flight, flight, weather, name)
        await job(self._store.set_file_status, sha, FileStatus.PROCESSED)
        self._hass.bus.async_fire(EVENT_FLIGHT_ADDED, {"flight_id": flight_id, "start": flight.start.isoformat()})
        if flight.keychains_json and not stored and self._pause_s:
            await asyncio.sleep(self._pause_s)

    def _source_name(self, sha: str) -> str:
        sidecar = self._raw_dir / f"{sha}.json"
        try:
            return json.loads(sidecar.read_text(encoding="utf-8")).get("name", f"{sha}.txt")
        except (OSError, ValueError):
            return f"{sha}.txt"
