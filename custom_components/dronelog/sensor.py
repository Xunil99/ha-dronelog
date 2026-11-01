"""Sensoren: Summen, letzter Flug, je Akku und je Drohne."""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity, SensorStateClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import PERCENTAGE, UnitOfLength, UnitOfTemperature, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import DroneLogCoordinator
from .maintenance_entities import MaintenanceEntity, async_track_maintenance
from .models import BatteryInfo, DroneInfo, Overview


class DroneLogSensor(CoordinatorEntity[DroneLogCoordinator], SensorEntity):
    _attr_has_entity_name = True

    def __init__(self, coordinator: DroneLogCoordinator, unique_id: str, key: str, device: DeviceInfo,
                 value: Callable[[Overview], Any], **attributes: Any) -> None:
        super().__init__(coordinator)
        self._attr_unique_id = unique_id
        self._attr_translation_key = key
        self._attr_device_info = device
        self._value = value
        for name, content in attributes.items():
            setattr(self, f"_attr_{name}", content)

    @property
    def native_value(self) -> Any:
        return self._value(self.coordinator.data)


def _last(o: Overview):
    return o.totals.last_flight


def _main_sensors(entry: ConfigEntry, coordinator: DroneLogCoordinator) -> list[DroneLogSensor]:
    device = DeviceInfo(identifiers={(DOMAIN, entry.entry_id)}, name="DroneLog", manufacturer="DroneLog")
    uid = lambda key: f"{entry.entry_id}_{key}"  # noqa: E731
    total = SensorStateClass.TOTAL
    return [
        DroneLogSensor(coordinator, uid("flights_total"), "flights_total", device, lambda o: o.totals.flights, state_class=total),
        DroneLogSensor(coordinator, uid("flight_time_total"), "flight_time_total", device, lambda o: round(o.totals.duration_s / 3600, 2),
                       state_class=total, device_class=SensorDeviceClass.DURATION, native_unit_of_measurement=UnitOfTime.HOURS),
        DroneLogSensor(coordinator, uid("distance_total"), "distance_total", device, lambda o: round(o.totals.distance_m / 1000, 2),
                       state_class=total, device_class=SensorDeviceClass.DISTANCE, native_unit_of_measurement=UnitOfLength.KILOMETERS),
        DroneLogSensor(coordinator, uid("last_flight"), "last_flight", device, lambda o: _last(o).start if _last(o) else None,
                       device_class=SensorDeviceClass.TIMESTAMP),
        DroneLogSensor(coordinator, uid("last_flight_duration"), "last_flight_duration", device,
                       lambda o: round(_last(o).duration_s / 60, 1) if _last(o) else None,
                       device_class=SensorDeviceClass.DURATION, native_unit_of_measurement=UnitOfTime.MINUTES),
        DroneLogSensor(coordinator, uid("last_flight_distance"), "last_flight_distance", device,
                       lambda o: round(_last(o).distance_m / 1000, 2) if _last(o) else None,
                       device_class=SensorDeviceClass.DISTANCE, native_unit_of_measurement=UnitOfLength.KILOMETERS),
        DroneLogSensor(coordinator, uid("last_flight_max_height"), "last_flight_max_height", device,
                       lambda o: round(_last(o).max_height_m, 1) if _last(o) else None,
                       device_class=SensorDeviceClass.DISTANCE, native_unit_of_measurement=UnitOfLength.METERS),
        DroneLogSensor(coordinator, uid("files_pending"), "files_pending", device, lambda o: o.pending,
                       state_class=SensorStateClass.MEASUREMENT),
        DroneLogSensor(coordinator, uid("files_error"), "files_error", device, lambda o: o.errors,
                       state_class=SensorStateClass.MEASUREMENT),
    ]


def _battery_sensors(entry: ConfigEntry, coordinator: DroneLogCoordinator, battery: BatteryInfo) -> list[DroneLogSensor]:
    serial = battery.serial
    device = DeviceInfo(identifiers={(DOMAIN, f"battery_{serial}")}, name=f"Akku …{serial[-4:]}", manufacturer="DJI",
                        model="Intelligent Flight Battery", via_device=(DOMAIN, entry.entry_id))

    def find(o: Overview) -> BatteryInfo | None:
        return next((b for b in o.batteries if b.serial == serial), None)

    def point(getter):
        def value(o: Overview):
            info = find(o)
            return getter(info.last) if info and info.last else None
        return value

    uid = lambda key: f"battery_{serial}_{key}"  # noqa: E731
    return [
        DroneLogSensor(coordinator, uid("charge_end_last_flight"), "charge_end_last_flight", device, point(lambda p: p.charge_end),
                       device_class=SensorDeviceClass.BATTERY, native_unit_of_measurement=PERCENTAGE),
        DroneLogSensor(coordinator, uid("health"), "health", device, point(lambda p: p.health_pct), native_unit_of_measurement=PERCENTAGE),
        DroneLogSensor(coordinator, uid("cycles"), "cycles", device, point(lambda p: p.cycles), state_class=SensorStateClass.MEASUREMENT),
        DroneLogSensor(coordinator, uid("cell_deviation_last_flight"), "cell_deviation_last_flight", device,
                       point(lambda p: round(p.cell_deviation_max_v * 1000, 1)), native_unit_of_measurement="mV"),
        DroneLogSensor(coordinator, uid("temperature_max_last_flight"), "temperature_max_last_flight", device,
                       point(lambda p: p.temp_max_c), device_class=SensorDeviceClass.TEMPERATURE,
                       native_unit_of_measurement=UnitOfTemperature.CELSIUS),
        DroneLogSensor(coordinator, uid("flights"), "battery_flights", device,
                       lambda o: find(o).flights if find(o) else 0, state_class=SensorStateClass.TOTAL),
    ]


def _drone_sensors(entry: ConfigEntry, coordinator: DroneLogCoordinator, drone: DroneInfo) -> list[DroneLogSensor]:
    serial = drone.serial
    device = DeviceInfo(identifiers={(DOMAIN, f"drone_{serial}")}, name=f"{drone.model or 'Drohne'} …{serial[-4:]}", manufacturer="DJI",
                        model=drone.model or None, via_device=(DOMAIN, entry.entry_id))

    def find(o: Overview) -> DroneInfo | None:
        return next((d for d in o.drones if d.serial == serial), None)

    return [
        DroneLogSensor(coordinator, f"drone_{serial}_flights", "drone_flights", device,
                       lambda o: find(o).flights if find(o) else 0, state_class=SensorStateClass.TOTAL),
        DroneLogSensor(coordinator, f"drone_{serial}_flight_time", "drone_flight_time", device,
                       lambda o: round(find(o).duration_s / 3600, 2) if find(o) else 0, device_class=SensorDeviceClass.DURATION,
                       native_unit_of_measurement=UnitOfTime.HOURS, state_class=SensorStateClass.TOTAL),
    ]


class HoursSinceServiceSensor(MaintenanceEntity, SensorEntity):
    _attr_translation_key = "hours_since_service"
    _attr_device_class = SensorDeviceClass.DURATION
    _attr_native_unit_of_measurement = UnitOfTime.HOURS
    _attr_state_class = SensorStateClass.TOTAL_INCREASING

    def __init__(self, coordinator: DroneLogCoordinator, serial: str, model: str) -> None:
        super().__init__(coordinator, serial, model, "hours_since_service")

    @property
    def native_value(self) -> float | None:
        row = self.row
        return None if row is None or row.status is None else round(row.status.used_hours, 2)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    coordinator: DroneLogCoordinator = hass.data[DOMAIN]["coordinator"]
    async_add_entities(_main_sensors(entry, coordinator))
    known: set[str] = set()

    def add_new() -> None:
        new: list[DroneLogSensor] = []
        for battery in coordinator.data.batteries:
            if f"b_{battery.serial}" not in known:
                known.add(f"b_{battery.serial}")
                new += _battery_sensors(entry, coordinator, battery)
        for drone in coordinator.data.drones:
            if f"d_{drone.serial}" not in known:
                known.add(f"d_{drone.serial}")
                new += _drone_sensors(entry, coordinator, drone)
        if new:
            async_add_entities(new)

    add_new()
    entry.async_on_unload(coordinator.async_add_listener(add_new))
    async_track_maintenance(entry, coordinator, async_add_entities, lambda serial, model: HoursSinceServiceSensor(coordinator, serial, model))
