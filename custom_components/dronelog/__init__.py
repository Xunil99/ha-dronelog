"""DroneLog: nimmt DJI-Flightlogs von der iOS-App entgegen."""

from __future__ import annotations

from pathlib import Path

from homeassistant.config_entries import ConfigEntry
import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import ServiceValidationError

from .const import CONF_TOKEN, DOMAIN
from .db import FlightStore
from .models import FileStatus
from .processor import Options, Processor
from .storage import RawLogStore
from .view import DroneLogPingView, DroneLogUploadView

_VIEWS_KEY = f"{DOMAIN}_views_registered"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    base = Path(hass.config.path(DOMAIN, "raw"))
    database = await hass.async_add_executor_job(FlightStore, Path(hass.config.path(DOMAIN, "dronelog.db")))

    def options() -> Options:
        return Options(api_key=entry.options.get("api_key") or None, weather_enabled=entry.options.get("weather_enabled", True))

    processor = Processor(hass, database, base, options)
    hass.data[DOMAIN] = {"token": entry.data[CONF_TOKEN], "store": RawLogStore(base), "db": database, "processor": processor}
    if not hass.data.get(_VIEWS_KEY):
        hass.http.register_view(DroneLogUploadView())
        hass.http.register_view(DroneLogPingView())
        hass.data[_VIEWS_KEY] = True
    entry.async_on_unload(entry.add_update_listener(_async_token_changed))
    if not hass.services.has_service(DOMAIN, "reprocess"):
        hass.services.async_register(DOMAIN, "reprocess", _handle_reprocess, schema=vol.Schema({vol.Optional("sha256"): str}))
        hass.services.async_register(DOMAIN, "delete_flight", _handle_delete_flight, schema=vol.Schema({vol.Required("flight_id"): int}))
    await processor.reprocess()
    return True


async def _async_token_changed(hass: HomeAssistant, entry: ConfigEntry) -> None:
    if DOMAIN in hass.data:
        hass.data[DOMAIN]["token"] = entry.data[CONF_TOKEN]
        # Neuer DJI-Key oder Einstellung: wartende Dateien erneut versuchen.
        await hass.data[DOMAIN]["processor"].reprocess()


def _loaded(hass: HomeAssistant) -> dict:
    data = hass.data.get(DOMAIN)
    if not data:
        raise ServiceValidationError("DroneLog ist nicht geladen.")
    return data


async def _handle_reprocess(call: ServiceCall) -> None:
    data = _loaded(call.hass)
    sha = call.data.get("sha256")
    if sha:
        await call.hass.async_add_executor_job(data["db"].set_file_status, sha, FileStatus.PENDING)
        await data["processor"].enqueue(sha)
    else:
        await data["processor"].reprocess(include_errors=True)


async def _handle_delete_flight(call: ServiceCall) -> None:
    data = _loaded(call.hass)
    await call.hass.async_add_executor_job(data["db"].delete_flight, call.data["flight_id"])


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.data.pop(DOMAIN, None)
    return True
