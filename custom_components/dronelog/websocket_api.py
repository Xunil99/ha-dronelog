"""Websocket-Schnittstelle für das DroneLog-Panel (nur Administratoren)."""

from __future__ import annotations

from dataclasses import asdict
from datetime import datetime
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .db import FlightStore
from .models import BatteryPoint, BatterySummary, FlightRow, Sample

MAX_POINTS = 600
UNKNOWN = "unbekannt"


def _suffix(serial: str) -> str:
    return serial[-4:] if serial and serial != UNKNOWN else UNKNOWN


def summary(row: FlightRow) -> dict[str, Any]:
    return {
        "id": row.id, "start": row.start.isoformat(), "duration_s": row.duration_s, "distance_m": row.distance_m,
        "max_height_m": row.max_height_m, "max_speed_ms": row.max_speed_ms, "drone_model": row.drone_model,
        "drone_suffix": _suffix(row.drone_serial), "drone_serial": row.drone_serial,
        "battery_suffix": _suffix(row.battery_serial), "battery_serial": row.battery_serial,
        "temperature_c": row.temperature_c, "wind_10m_ms": row.wind_10m_ms, "has_position": row.has_position,
    }


def thin(samples: tuple[Sample, ...], maximum: int = MAX_POINTS) -> list[Sample]:
    """Gleichmäßig ausdünnen; erster und letzter Punkt bleiben erhalten."""
    if len(samples) <= maximum:
        return list(samples)
    step = (len(samples) - 1) / (maximum - 1)
    return [samples[round(i * step)] for i in range(maximum)]


def _point(sample: Sample) -> dict[str, Any]:
    return {"t": sample.t, "lat": sample.lat, "lon": sample.lon, "height": sample.height, "speed": sample.speed,
            "voltage": sample.voltage, "current": sample.current, "charge": sample.charge}


def _history_point(point: BatteryPoint) -> dict[str, Any]:
    return {"flight_id": point.flight_id, "time": point.start.isoformat(), "charge_end": point.charge_end, "cycles": point.cycles,
            "health_pct": point.health_pct, "cell_deviation_mv": round(point.cell_deviation_max_v * 1000, 1),
            "temp_max_c": point.temp_max_c, "avg_power_w": point.avg_power_w}


def battery_known(battery: BatterySummary) -> bool:
    """Platzhalter (alles 0) aus Logs ohne Zeitreihe zählen nicht als Messwerte."""
    return any((battery.charge_start, battery.charge_end, battery.full_capacity_mah, battery.peak_power_w, battery.avg_power_w))


def _store(hass: HomeAssistant, connection, msg) -> FlightStore | None:
    data = hass.data.get(DOMAIN)
    if not data:
        connection.send_error(msg["id"], "not_loaded", "DroneLog ist nicht geladen.")
        return None
    return data["db"]


def _command(schema: dict):
    def decorator(func):
        @websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/{func.__name__.removeprefix('ws_')}", **schema})
        @websocket_api.require_admin
        @websocket_api.async_response
        async def handler(hass: HomeAssistant, connection, msg) -> None:
            store = _store(hass, connection, msg)
            if store is not None:
                await func(hass, connection, msg, store)
        return handler
    return decorator


@_command({vol.Optional("limit", default=50): vol.All(int, vol.Range(min=1, max=200)),
           vol.Optional("offset", default=0): vol.All(int, vol.Range(min=0)),
           vol.Optional("drone"): str, vol.Optional("battery"): str, vol.Optional("since"): str})
async def ws_flights(hass, connection, msg, store) -> None:
    since = datetime.fromisoformat(msg["since"]) if msg.get("since") else None
    filters = {"drone": msg.get("drone"), "battery": msg.get("battery"), "since": since}
    rows = await hass.async_add_executor_job(lambda: store.list_flights(msg["limit"], msg["offset"], **filters))
    total = await hass.async_add_executor_job(lambda: store.count_flights(**filters))
    connection.send_result(msg["id"], {"flights": [summary(r) for r in rows], "total": total})


@_command({vol.Required("flight_id"): int})
async def ws_flight(hass, connection, msg, store) -> None:
    detail = await hass.async_add_executor_job(store.get_flight, msg["flight_id"])
    if detail is None:
        connection.send_error(msg["id"], "not_found", "Flug nicht gefunden.")
        return
    position = lambda lat, lon: {"lat": lat, "lon": lon} if lat is not None and lon is not None else None  # noqa: E731
    connection.send_result(msg["id"], {
        "summary": summary(detail.row), "battery": asdict(detail.battery) if battery_known(detail.battery) else None,
        "weather": asdict(detail.weather) if detail.weather else None,
        "start": position(detail.start_lat, detail.start_lon), "end": position(detail.end_lat, detail.end_lon),
        "points": [_point(s) for s in thin(detail.samples)], "source_name": detail.row.source_name,
    })


@_command({vol.Optional("drone"): str, vol.Optional("battery"): str})
async def ws_stats(hass, connection, msg, store) -> None:
    months = await hass.async_add_executor_job(store.monthly_stats, msg.get("drone"), msg.get("battery"))
    drones = await hass.async_add_executor_job(store.drone_list)
    connection.send_result(msg["id"], {
        "totals": {"flights": sum(m.flights for m in months), "duration_s": sum(m.duration_s for m in months),
                   "distance_m": sum(m.distance_m for m in months)},
        "months": [asdict(m) for m in months],
        "drones": [{"serial": d.serial, "serial_suffix": _suffix(d.serial), "model": d.model, "flights": d.flights,
                    "duration_s": d.duration_s} for d in drones],
    })


@_command({vol.Optional("drone"): str})
async def ws_batteries(hass, connection, msg, store) -> None:
    def load():
        result = []
        for item in store.battery_list(msg.get("drone")):
            result.append({"serial": item.serial, "suffix": _suffix(item.serial), "flights": item.flights,
                           "first": item.first.isoformat(), "last": item.last.isoformat(), "drones": list(item.drones),
                           "history": [_history_point(p) for p in store.battery_history(item.serial, msg.get("drone"))]})
        return result

    connection.send_result(msg["id"], {"batteries": await hass.async_add_executor_job(load)})


@_command({vol.Optional("precision_m", default=300): vol.All(int, vol.Range(min=100, max=2000)),
           vol.Optional("drone"): str, vol.Optional("battery"): str})
async def ws_heatmap(hass, connection, msg, store) -> None:
    cells = await hass.async_add_executor_job(store.heat_cells, msg["precision_m"], msg.get("drone"), msg.get("battery"))
    connection.send_result(msg["id"], {"cells": [asdict(c) for c in cells]})


@_command({vol.Required("lat"): vol.Coerce(float), vol.Required("lon"): vol.Coerce(float),
           vol.Optional("precision_m", default=300): vol.All(int, vol.Range(min=100, max=2000)),
           vol.Optional("drone"): str, vol.Optional("battery"): str})
async def ws_cell_flights(hass, connection, msg, store) -> None:
    rows = await hass.async_add_executor_job(store.flights_in_cell, msg["lat"], msg["lon"], msg["precision_m"], msg.get("drone"), msg.get("battery"))
    connection.send_result(msg["id"], {"flights": [summary(r) for r in rows]})


def async_register_commands(hass: HomeAssistant) -> None:
    for handler in (ws_flights, ws_flight, ws_stats, ws_batteries, ws_heatmap, ws_cell_flights):
        websocket_api.async_register_command(hass, handler)
