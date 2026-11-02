"""Flugbuch: wann (von–bis), wo, mit welcher Drohne (wie FlightbookQueries.swift / Flightbook.swift)."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, tzinfo
from typing import Any

from .grid import place_key as grid_place_key
from .grid import valid_coordinate
from .logbook import MAX_DISTANCE_M, MAX_DURATION_S, plausible
from .models import FlightHeader
from .notes import FlightNote

UNKNOWN = "unbekannt"


@dataclass(frozen=True)
class FlightbookEntry:
    flight_id: int
    sha256: str
    start: datetime
    end: datetime
    duration_s: float
    distance_m: float
    max_height_m: float
    drone_serial: str
    drone_model: str
    battery_serial: str
    place_key: str | None  # Rasterzelle des Startorts (Schlüssel für Ortsnamen)
    lat: float | None
    lon: float | None


def entry_from_header(h: FlightHeader) -> FlightbookEntry:
    duration = plausible(h.duration_s, MAX_DURATION_S)
    positioned = valid_coordinate(h.start_lat, h.start_lon)
    return FlightbookEntry(
        flight_id=h.flight_id, sha256=h.sha256, start=h.start, end=h.start + timedelta(seconds=duration), duration_s=duration,
        distance_m=plausible(h.distance_m, MAX_DISTANCE_M), max_height_m=h.max_height_m, drone_serial=h.drone_serial,
        drone_model=h.drone_model, battery_serial=h.battery_serial,
        place_key=grid_place_key(h.start_lat, h.start_lon) if positioned else None,
        lat=h.start_lat if positioned else None, lon=h.start_lon if positioned else None)


def serial_suffix(serial: str) -> str:
    return serial if serial == UNKNOWN else "…" + serial[-4:]


def drone_label(model: str, serial: str) -> str:
    return f"{model} {serial_suffix(serial)}" if model else serial_suffix(serial)


def build_flightbook(entries: list[FlightbookEntry], place_names: dict[str, str], notes: dict[str, FlightNote], tz: tzinfo) -> dict[str, Any]:
    rows = []
    for number, e in enumerate(entries, start=1):
        start, end = e.start.astimezone(tz), e.end.astimezone(tz)
        days = (end.date() - start.date()).days
        time = f"{start:%H:%M}–{end:%H:%M}" + (f" (+{days})" if days > 0 else "")
        place = None
        if e.place_key is not None:
            name = place_names.get(e.place_key)
            label = name or f"{e.lat:.3f}, {e.lon:.3f}"
            place = {"key": e.place_key, "name": name, "lat": e.lat, "lon": e.lon, "label": label}
        note = notes.get(e.sha256) or FlightNote()
        rows.append({
            "nr": number, "flight_id": e.flight_id, "start": e.start.isoformat(), "end": e.end.isoformat(),
            "date": start.date().isoformat(), "time": time, "day_offset": max(days, 0), "place": place,
            "drone_serial": e.drone_serial, "drone_model": e.drone_model, "drone_label": drone_label(e.drone_model, e.drone_serial),
            "battery_serial": e.battery_serial, "battery_label": serial_suffix(e.battery_serial) if e.battery_serial else None,
            "duration_s": e.duration_s, "distance_m": e.distance_m, "max_height_m": e.max_height_m,
            "note": note.display, "note_text": note.text.strip(), "tags": list(note.tags),
        })
    return {"rows": rows, "summary": {"flights": len(entries), "duration_s": sum(e.duration_s for e in entries),
                                       "distance_m": sum(e.distance_m for e in entries)}}
