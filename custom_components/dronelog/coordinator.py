"""Koordinator: liest Zusammenfassungen für die Sensoren aus der Datenbank."""

from __future__ import annotations

import logging
from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from .db import FlightStore
from .models import Overview
from .processor import EVENT_FLIGHT_ADDED, EVENT_QUEUE_CHANGED

_LOGGER = logging.getLogger(__name__)
REFRESH_INTERVAL = timedelta(hours=6)


class DroneLogCoordinator(DataUpdateCoordinator[Overview]):
    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, store: FlightStore) -> None:
        super().__init__(hass, _LOGGER, config_entry=entry, name="DroneLog", update_interval=REFRESH_INTERVAL)
        self._store = store
        for event in (EVENT_FLIGHT_ADDED, EVENT_QUEUE_CHANGED):
            entry.async_on_unload(hass.bus.async_listen(event, self._on_event))

    @callback
    def _on_event(self, _event) -> None:
        self.hass.async_create_task(self.async_refresh())

    async def _async_update_data(self) -> Overview:
        return await self.hass.async_add_executor_job(self._store.overview)
