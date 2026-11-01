"""Websocket-Schnittstelle für das DroneLog-Panel (nur Administratoren)."""

from __future__ import annotations

from dataclasses import asdict
import re
from datetime import datetime, tzinfo
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from .const import DOMAIN
from .battery_report import BatteryAssessment, BatteryReportData, Finding, assess
from .cell_levels import cell_deviation_level
from .db import FlightStore
from .events import event_severity
from .flightbook import build_flightbook
from .flight_modes import flight_mode_segments
from .flight_phases import flight_phase_durations
from .hover_wind import hover_wind
from .notes import MAX_NOTE_LENGTH, MAX_PLACE_NAME_LENGTH, FlightNote, parse_tags
from .maintenance import MaintenanceRow, async_dismiss_notification, mark_serviced, maintenance_rows, set_plan
from .models import BatteryPoint, BatterySummary, FlightDetail, FlightExtras, FlightRow, Sample

MAX_POINTS = 600
_PLACE_KEY = re.compile(r"^-?\d{1,9},-?\d{1,9}$")
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
        "event_kinds": list(row.event_kinds), "photo_count": row.photo_count, "video_s": row.video_s,
    }


def thin(samples: tuple[Sample, ...], maximum: int = MAX_POINTS) -> list[Sample]:
    """Gleichmäßig ausdünnen; erster und letzter Punkt bleiben erhalten."""
    if len(samples) <= maximum:
        return list(samples)
    step = (len(samples) - 1) / (maximum - 1)
    return [samples[round(i * step)] for i in range(maximum)]


_CHANNELS = ("dist", "dl", "ul", "rec", "mode", "temp", "cell_dev", "pitch", "roll", "yaw")


def _point(sample: Sample) -> dict[str, Any]:
    point = {"t": sample.t, "lat": sample.lat, "lon": sample.lon, "height": sample.height, "speed": sample.speed,
             "voltage": sample.voltage, "current": sample.current, "charge": sample.charge}
    for name in _CHANNELS:  # Kanäle nur, wenn der Flug sie enthält (ältere Auswertungen: nicht vorhanden)
        value = getattr(sample, name)
        if value is not None:
            point[name] = value
    return point


def _extras(extras: FlightExtras | None) -> dict[str, Any] | None:
    if extras is None:
        return None
    result = asdict(extras)
    result["events"] = [{"t": e.t, "kind": e.kind, "value": e.value, "severity": event_severity(e.kind)} for e in extras.events]
    return result


def _analysis(detail: FlightDetail) -> dict[str, Any]:
    """Auswertungen aus den vollen (nicht ausgedünnten) Messpunkten."""
    samples = detail.samples
    wind = hover_wind(samples)
    return {
        "phases": {phase.value: seconds for phase, seconds in flight_phase_durations(samples).items()},
        "hover_wind": ({"tilt_deg": wind.tilt_deg, "bearing_deg": wind.bearing_deg, "seconds": wind.seconds,
                        "class": wind.wind_class.value} if wind else None),
        "cell_level": (cell_deviation_level(detail.battery.cell_deviation_max_v).value
                       if samples and battery_known(detail.battery) else None),
        "mode_segments": [{"category": g.category.value, "title": g.category.title, "start": g.start, "end": g.end}
                          for g in flight_mode_segments(samples)],
    }


def _history_point(point: BatteryPoint) -> dict[str, Any]:
    return {"flight_id": point.flight_id, "time": point.start.isoformat(), "charge_end": point.charge_end, "cycles": point.cycles,
            "health_pct": point.health_pct, "cell_deviation_mv": round(point.cell_deviation_max_v * 1000, 1),
            "temp_max_c": point.temp_max_c, "avg_power_w": point.avg_power_w}


def battery_known(battery: BatterySummary) -> bool:
    """Platzhalter (alles 0) aus Logs ohne Zeitreihe zählen nicht als Messwerte."""
    return any((battery.charge_start, battery.charge_end, battery.full_capacity_mah, battery.peak_power_w, battery.avg_power_w))


def local_tz(hass: HomeAssistant) -> tzinfo:
    """Zeitzone der HA-Instanz (Jahre, Datum und Uhrzeit im Logbuch/Flugbuch sind Ortszeit)."""
    return dt_util.get_time_zone(hass.config.time_zone) or dt_util.UTC


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
           vol.Optional("drone"): str, vol.Optional("battery"): str, vol.Optional("since"): str,
           vol.Optional("only_events", default=False): bool})
async def ws_flights(hass, connection, msg, store) -> None:
    since = datetime.fromisoformat(msg["since"]) if msg.get("since") else None
    filters = {"drone": msg.get("drone"), "battery": msg.get("battery"), "since": since, "only_events": msg["only_events"]}
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
        "extras": _extras(detail.extras), "analysis": _analysis(detail),
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
                    "duration_s": d.duration_s, "distance_m": d.distance_m,
                    "batteries": d.batteries, "last_flight": d.last_flight.isoformat() if d.last_flight else None} for d in drones],
    })


def _finding(finding: Finding) -> dict[str, Any]:
    return {"code": finding.code, "text": finding.text, "params": finding.params}


def battery_report_dict(report: BatteryReportData, assessment: BatteryAssessment) -> dict[str, Any]:
    result = asdict(report)
    result.pop("history")
    result.update(
        drone_models=list(report.drone_models), first_use=report.first_use.isoformat(), last_use=report.last_use.isoformat(),
        cycles_added=report.cycles_added, health_loss_pct=report.health_loss_pct,
        history=[{**asdict(h), "start": h.start.isoformat()} for h in report.history],
        assessment={"level": assessment.level, "headline_code": assessment.headline_code, "headline": assessment.headline,
                    "state_of_health": _finding(assessment.state_of_health), "points": [_finding(p) for p in assessment.points]})
    return result


@_command({vol.Required("battery_serial"): str})
async def ws_battery_report(hass, connection, msg, store) -> None:
    report = await hass.async_add_executor_job(store.battery_report, msg["battery_serial"])
    if report is None:
        connection.send_error(msg["id"], "not_found", "Für diesen Akku liegen keine Messwerte vor.")
        return
    connection.send_result(msg["id"], battery_report_dict(report, assess(report)))


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


def _note_dict(flight_id: int, note: FlightNote) -> dict[str, Any]:
    return {"flight_id": flight_id, "text": note.text, "tags": note.tags}


@_command({vol.Required("flight_id"): int})
async def ws_note_get(hass, connection, msg, store) -> None:
    def load():
        sha = store.sha_for_flight(msg["flight_id"])
        return None if sha is None else store.get_note(sha)

    note = await hass.async_add_executor_job(load)
    if note is None:
        connection.send_error(msg["id"], "not_found", "Flug nicht gefunden.")
        return
    connection.send_result(msg["id"], _note_dict(msg["flight_id"], note))


@_command({vol.Required("flight_id"): int, vol.Optional("text", default=""): vol.All(str, vol.Length(max=MAX_NOTE_LENGTH)),
           vol.Optional("tags", default=""): vol.Any(str, [str])})
async def ws_note_set(hass, connection, msg, store) -> None:
    raw_tags = msg["tags"] if isinstance(msg["tags"], str) else ",".join(msg["tags"])
    note = FlightNote(text=msg["text"], tags=parse_tags(raw_tags))

    def save():
        sha = store.sha_for_flight(msg["flight_id"])
        if sha is None:
            return False
        store.set_note(sha, note)
        return True

    if not await hass.async_add_executor_job(save):
        connection.send_error(msg["id"], "not_found", "Flug nicht gefunden.")
        return
    stored = note if not note.is_empty else FlightNote()
    connection.send_result(msg["id"], _note_dict(msg["flight_id"], stored))


@_command({vol.Required("key"): vol.Match(_PLACE_KEY), vol.Required("name"): vol.All(str, vol.Length(max=MAX_PLACE_NAME_LENGTH))})
async def ws_place_name_set(hass, connection, msg, store) -> None:
    name = await hass.async_add_executor_job(store.set_place_name, msg["key"], msg["name"])
    connection.send_result(msg["id"], {"key": msg["key"], "name": name})


@_command({vol.Optional("drone"): str, vol.Optional("battery"): str})
async def ws_logbook(hass, connection, msg, store) -> None:
    tz = local_tz(hass)
    book = await hass.async_add_executor_job(lambda: store.logbook(msg.get("drone"), msg.get("battery"), tz))
    names = await hass.async_add_executor_job(store.place_names)
    tags = await hass.async_add_executor_job(store.all_tags, msg.get("drone"), msg.get("battery"))
    connection.send_result(msg["id"], {
        "flights": book.flights, "duration_s": book.duration_s, "distance_m": book.distance_m,
        "longest_flight_s": book.longest_flight_s, "farthest_flight_m": book.farthest_flight_m,
        "highest_m": book.highest_m, "fastest_ms": book.fastest_ms,
        "years": [asdict(y) for y in book.years],
        "places": [{**asdict(p), "name": names.get(p.key)} for p in book.places],
        "tags": tags,
    })


@_command({vol.Optional("drone"): str, vol.Optional("battery"): str, vol.Optional("year"): vol.All(int, vol.Range(min=1970, max=3000))})
async def ws_flightbook(hass, connection, msg, store) -> None:
    tz = local_tz(hass)

    def load():
        entries = store.flightbook_entries(msg.get("drone"), msg.get("battery"), msg.get("year"), tz)
        return build_flightbook(entries, store.place_names(), store.notes(), tz)

    connection.send_result(msg["id"], await hass.async_add_executor_job(load))


def maintenance_dict(row: MaintenanceRow) -> dict[str, Any]:
    plan, status = row.plan, row.status
    return {
        "serial": row.serial, "suffix": _suffix(row.serial), "name": row.name, "model": row.model,
        "plan": None if plan is None else {"interval_hours": plan.interval_hours, "interval_flights": plan.interval_flights,
                                           "since": plan.since.isoformat(), "notified_due": plan.notified_due},
        "status": None if status is None else asdict(status),
    }


async def _maintenance_result(hass: HomeAssistant, serial: str) -> dict[str, Any]:
    """Aktualisiert Entitäten und Benachrichtigung und liefert die Zeile der Drohne."""
    await hass.data[DOMAIN]["coordinator"].async_refresh()
    rows = hass.data[DOMAIN]["coordinator"].maintenance_rows
    row = next((r for r in rows if r.serial == serial), MaintenanceRow(serial, serial, "", None, None))
    return maintenance_dict(row)


@_command({})
async def ws_maintenance_get(hass, connection, msg, store) -> None:
    rows = await hass.async_add_executor_job(maintenance_rows, store)
    connection.send_result(msg["id"], {"drones": [maintenance_dict(r) for r in rows]})


@_command({vol.Required("drone"): str,
           vol.Optional("interval_hours"): vol.Any(None, vol.All(vol.Coerce(float), vol.Range(min=0.0, min_included=False, max=100_000))),
           vol.Optional("interval_flights"): vol.Any(None, vol.All(int, vol.Range(min=1, max=1_000_000)))})
async def ws_maintenance_set(hass, connection, msg, store) -> None:
    """Beide Intervalle weggelassen/null = Wartungsüberwachung aus. Ein geändertes Intervall meldet „fällig“ neu."""
    await hass.async_add_executor_job(set_plan, store, msg["drone"], msg.get("interval_hours"), msg.get("interval_flights"), dt_util.utcnow())
    connection.send_result(msg["id"], await _maintenance_result(hass, msg["drone"]))


@_command({vol.Required("drone"): str})
async def ws_maintenance_serviced(hass, connection, msg, store) -> None:
    plan = await hass.async_add_executor_job(mark_serviced, store, msg["drone"], dt_util.utcnow())
    if plan is None:
        connection.send_error(msg["id"], "not_found", "Für diese Drohne ist kein Wartungsplan eingerichtet.")
        return
    async_dismiss_notification(hass, msg["drone"])
    connection.send_result(msg["id"], await _maintenance_result(hass, msg["drone"]))


def async_register_commands(hass: HomeAssistant) -> None:
    for handler in (ws_flights, ws_flight, ws_stats, ws_batteries, ws_heatmap, ws_cell_flights, ws_battery_report,
                    ws_note_get, ws_note_set, ws_place_name_set, ws_logbook, ws_flightbook,
                    ws_maintenance_get, ws_maintenance_set, ws_maintenance_serviced):
        websocket_api.async_register_command(hass, handler)
