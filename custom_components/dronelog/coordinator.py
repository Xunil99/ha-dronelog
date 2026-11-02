"""Koordinator: liest Zusammenfassungen für die Sensoren aus der Datenbank."""

from __future__ import annotations

import logging
from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.debounce import Debouncer
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from .db import FlightStore
from .maintenance import MaintenanceRow, async_check_maintenance
from .models import Overview
from .processor import EVENT_FLIGHT_ADDED, EVENT_QUEUE_CHANGED

_LOGGER = logging.getLogger(__name__)
REFRESH_INTERVAL = timedelta(hours=6)
REFRESH_COOLDOWN_S = 5.0


class DroneLogCoordinator(DataUpdateCoordinator[Overview]):
    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, store: FlightStore) -> None:
        super().__init__(hass, _LOGGER, config_entry=entry, name="DroneLog", update_interval=REFRESH_INTERVAL,
                         request_refresh_debouncer=Debouncer(hass, _LOGGER, cooldown=REFRESH_COOLDOWN_S, immediate=True))
        self._store = store
        self.maintenance_rows: list[MaintenanceRow] = []
        for event in (EVENT_FLIGHT_ADDED, EVENT_QUEUE_CHANGED):
            entry.async_on_unload(hass.bus.async_listen(event, self._on_event))

    @callback
    def _on_event(self, _event) -> None:
        self.hass.async_create_task(self.async_request_refresh())

    async def _async_update_data(self) -> Overview:
        headers = await self.hass.async_add_executor_job(self._store.flight_headers)  # je Aktualisierung nur einmal laden
        overview = await self.hass.async_add_executor_job(self._store.overview, headers)
        try:
            self.maintenance_rows = await async_check_maintenance(self.hass, self._store, headers)
        except Exception as err:  # noqa: BLE001 - die Wartungsprüfung darf die Sensoren nicht ausfallen lassen
            _LOGGER.warning("Wartungsprüfung fehlgeschlagen (%s)", type(err).__name__)
        return overview
