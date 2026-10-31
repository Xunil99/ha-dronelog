"""Registrierung des Panels „Drohnenflüge" (nur für Administratoren)."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import DOMAIN

PANEL_PATH = "dronelog"
STATIC_URL = "/dronelog_static"
_STATIC_KEY = f"{DOMAIN}_static_registered"


async def async_register_panel(hass: HomeAssistant, tile_url: str) -> None:
    """Registriert (oder ersetzt) das Panel; `tile_url` wird als Panel-Konfiguration übergeben."""
    if not hass.data.get(_STATIC_KEY):
        folder = Path(__file__).parent / "frontend"
        await hass.http.async_register_static_paths([StaticPathConfig(STATIC_URL, str(folder), False)])
        hass.data[_STATIC_KEY] = True
    version = (await async_get_integration(hass, DOMAIN)).version
    async_remove_panel(hass)
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_PATH,
        webcomponent_name="dronelog-panel",
        sidebar_title="Drohnenflüge",
        sidebar_icon="mdi:quadcopter",
        module_url=f"{STATIC_URL}/dronelog-panel.js?v={version}",  # Version verhindert veraltete Zwischenspeicher
        embed_iframe=False,
        require_admin=True,
        config={"tile_url": tile_url},
    )


def async_remove_panel(hass: HomeAssistant) -> None:
    frontend.async_remove_panel(hass, PANEL_PATH, warn_if_unknown=False)
