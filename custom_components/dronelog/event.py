"""Ereignis-Entität: wird bei jedem neu ausgewerteten Flug ausgelöst (für Automationen)."""

from __future__ import annotations

from homeassistant.components.event import EventEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .processor import EVENT_FLIGHT_ADDED


class NewFlightEvent(EventEntity):
    _attr_has_entity_name = True
    _attr_translation_key = "new_flight"
    _attr_event_types = ["flight_added"]

    def __init__(self, entry: ConfigEntry) -> None:
        self._attr_unique_id = f"{entry.entry_id}_new_flight"
        self._attr_device_info = DeviceInfo(identifiers={(DOMAIN, entry.entry_id)}, name="DroneLog", manufacturer="DroneLog")

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self.hass.bus.async_listen(EVENT_FLIGHT_ADDED, self._on_flight))

    @callback
    def _on_flight(self, event: Event) -> None:
        # Nur die Flug-ID, keine Orte.
        self._trigger_event("flight_added", {"flight_id": event.data.get("flight_id")})
        self.async_write_ha_state()


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_add_entities([NewFlightEvent(entry)])
