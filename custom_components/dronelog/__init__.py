"""DroneLog: nimmt DJI-Flightlogs von der iOS-App entgegen."""

from __future__ import annotations

from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import CONF_TOKEN, DOMAIN
from .storage import RawLogStore
from .view import DroneLogPingView, DroneLogUploadView

_VIEWS_KEY = f"{DOMAIN}_views_registered"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    base = Path(hass.config.path(DOMAIN, "raw"))
    hass.data[DOMAIN] = {"token": entry.data[CONF_TOKEN], "store": RawLogStore(base)}
    if not hass.data.get(_VIEWS_KEY):
        hass.http.register_view(DroneLogUploadView())
        hass.http.register_view(DroneLogPingView())
        hass.data[_VIEWS_KEY] = True
    entry.async_on_unload(entry.add_update_listener(_async_token_changed))
    return True


async def _async_token_changed(hass: HomeAssistant, entry: ConfigEntry) -> None:
    if DOMAIN in hass.data:
        hass.data[DOMAIN]["token"] = entry.data[CONF_TOKEN]


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.data.pop(DOMAIN, None)
    return True
