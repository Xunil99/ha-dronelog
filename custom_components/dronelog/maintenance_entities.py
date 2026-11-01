"""Gemeinsame Basis der Wartungs-Entitäten (Binärsensor und Sensor)."""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import DroneLogCoordinator
from .maintenance import MaintenanceRow


class MaintenanceEntity(CoordinatorEntity[DroneLogCoordinator]):
    _attr_has_entity_name = True

    def __init__(self, coordinator: DroneLogCoordinator, serial: str, model: str, key: str) -> None:
        super().__init__(coordinator)
        self._serial = serial
        self._attr_unique_id = f"drone_{serial}_{key}"
        self._attr_device_info = DeviceInfo(identifiers={(DOMAIN, f"drone_{serial}")}, name=f"{model or 'Drohne'} …{serial[-4:]}",
                                            manufacturer="DJI", model=model or None)

    @property
    def row(self) -> MaintenanceRow | None:
        return next((r for r in self.coordinator.maintenance_rows if r.serial == self._serial and r.plan and r.status), None)

    @property
    def available(self) -> bool:
        return self.row is not None  # ohne aktiven Plan gibt es keinen Wert

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        row = self.row
        if row is None or row.plan is None or row.status is None:
            return None
        return {
            "level": row.status.level, "used_flights": row.status.used_flights, "used_hours": round(row.status.used_hours, 2),
            "interval_flights": row.plan.interval_flights, "interval_hours": row.plan.interval_hours,
            "hours_fraction": None if row.status.hours_fraction is None else round(row.status.hours_fraction, 3),
            "flights_fraction": None if row.status.flights_fraction is None else round(row.status.flights_fraction, 3),
            "since": row.plan.since.isoformat(),
        }


def async_track_maintenance(entry: ConfigEntry, coordinator: DroneLogCoordinator, async_add_entities: AddEntitiesCallback,
                            factory: Callable[[str, str], Entity]) -> None:
    """Legt für jede Drohne mit aktivem Wartungsplan genau einmal eine Entität an (auch später, wenn ein Plan neu entsteht)."""
    known: set[str] = set()

    def add_new() -> None:
        new = []
        for row in coordinator.maintenance_rows:
            if row.plan and row.serial not in known:
                known.add(row.serial)
                new.append(factory(row.serial, row.model))
        if new:
            async_add_entities(new)

    add_new()
    entry.async_on_unload(coordinator.async_add_listener(add_new))
