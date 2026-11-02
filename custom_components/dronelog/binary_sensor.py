"""Binärsensor „Wartung fällig“ je Drohne (nur mit aktivem Wartungsplan)."""

from __future__ import annotations

from homeassistant.components.binary_sensor import BinarySensorDeviceClass, BinarySensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .coordinator import DroneLogCoordinator
from .maintenance_entities import MaintenanceEntity, async_track_maintenance


class MaintenanceDueSensor(MaintenanceEntity, BinarySensorEntity):
    _attr_translation_key = "maintenance_due"
    _attr_device_class = BinarySensorDeviceClass.PROBLEM

    def __init__(self, coordinator: DroneLogCoordinator, serial: str, model: str) -> None:
        super().__init__(coordinator, serial, model, "maintenance_due")

    @property
    def is_on(self) -> bool | None:
        row = self.row
        return None if row is None or row.status is None else row.status.level == "due"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    coordinator: DroneLogCoordinator = hass.data[DOMAIN]["coordinator"]
    async_track_maintenance(entry, coordinator, async_add_entities, lambda serial, model: MaintenanceDueSensor(coordinator, serial, model))
