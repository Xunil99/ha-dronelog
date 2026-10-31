"""DroneLog: nimmt DJI-Flightlogs von der iOS-App entgegen."""

from __future__ import annotations

from pathlib import Path

from homeassistant.config_entries import ConfigEntry
import re
from datetime import timedelta

import voluptuous as vol
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import ServiceValidationError

from .const import CONF_TOKEN, DEFAULT_TILE_URL, DOMAIN
from .coordinator import DroneLogCoordinator
from .db import FlightStore
from .models import FileStatus
from .panel import async_register_panel, async_remove_panel
from .processor import Options, Processor
from .storage import RawLogStore
from .websocket_api import async_register_commands
from .view import DroneLogPingView, DroneLogUploadView

PLATFORMS = ["sensor", "event"]
RETRY_INTERVAL = timedelta(hours=1)
_SHA = re.compile(r"^[0-9a-f]{64}$")
_VIEWS_KEY = f"{DOMAIN}_views_registered"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    base = Path(hass.config.path(DOMAIN, "raw"))
    database = await hass.async_add_executor_job(FlightStore, Path(hass.config.path(DOMAIN, "dronelog.db")))

    def options() -> Options:
        return Options(api_key=entry.options.get("api_key") or None, weather_enabled=entry.options.get("weather_enabled", True))

    processor = Processor(hass, database, base, options)
    coordinator = DroneLogCoordinator(hass, entry, database)
    hass.data[DOMAIN] = {"token": entry.data[CONF_TOKEN], "store": RawLogStore(base), "db": database, "processor": processor,
                         "coordinator": coordinator}
    await coordinator.async_config_entry_first_refresh()
    await async_register_panel(hass, entry.options.get("tile_url", DEFAULT_TILE_URL))
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    if not hass.data.get(_VIEWS_KEY):
        async_register_commands(hass)
        hass.http.register_view(DroneLogUploadView())
        hass.http.register_view(DroneLogPingView())
        hass.data[_VIEWS_KEY] = True
    entry.async_on_unload(entry.add_update_listener(_async_token_changed))
    if not hass.services.has_service(DOMAIN, "reprocess"):
        hass.services.async_register(DOMAIN, "reprocess", _handle_reprocess, schema=vol.Schema({vol.Optional("sha256"): str}))
        hass.services.async_register(DOMAIN, "delete_flight", _handle_delete_flight, schema=vol.Schema({vol.Required("flight_id"): int}))
    entry.async_create_background_task(hass, processor.enqueue_unprocessed_raw(), "dronelog_startup")

    async def retry_waiting(_now) -> None:
        if DOMAIN in hass.data:
            await hass.data[DOMAIN]["processor"].reprocess()

    entry.async_on_unload(async_track_time_interval(hass, retry_waiting, RETRY_INTERVAL))
    return True


async def _async_token_changed(hass: HomeAssistant, entry: ConfigEntry) -> None:
    if DOMAIN in hass.data:
        hass.data[DOMAIN]["token"] = entry.data[CONF_TOKEN]
        await async_register_panel(hass, entry.options.get("tile_url", DEFAULT_TILE_URL))
        # Neuer DJI-Key oder Einstellung: wartende Dateien erneut versuchen.
        await hass.data[DOMAIN]["processor"].reprocess()


def _loaded(hass: HomeAssistant) -> dict:
    data = hass.data.get(DOMAIN)
    if not data:
        raise ServiceValidationError("DroneLog ist nicht geladen.")
    return data


async def _handle_reprocess(call: ServiceCall) -> None:
    data = _loaded(call.hass)
    sha = (call.data.get("sha256") or "").lower()
    if call.data.get("sha256") is not None and not _SHA.match(sha):
        raise ServiceValidationError("sha256 muss aus 64 Hexadezimalzeichen bestehen.")
    if sha:
        # Bewusste Neuauswertung: vorhandenen Flug ersetzen (gespeicherte Keychains werden wiederverwendet).
        await call.hass.async_add_executor_job(data["db"].delete_flight_by_sha, sha)
        await data["processor"].enqueue(sha, retry=True)
        await data["coordinator"].async_refresh()
    else:
        await data["processor"].reprocess(include_errors=True)


async def _handle_delete_flight(call: ServiceCall) -> None:
    data = _loaded(call.hass)
    await call.hass.async_add_executor_job(data["db"].delete_flight, call.data["flight_id"])
    await data["coordinator"].async_refresh()


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        await hass.data[DOMAIN]["processor"].async_shutdown()
        async_remove_panel(hass)
        hass.data.pop(DOMAIN, None)
    return unloaded
