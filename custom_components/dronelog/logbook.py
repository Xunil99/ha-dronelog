"""Pilotenlogbuch: Summen, Rekorde, Jahre (Ortszeit) und Startorte (wie LogbookQueries.swift)."""

from __future__ import annotations

import math
from dataclasses import dataclass
from datetime import tzinfo

from .grid import PLACE_PRECISION_M, heat_cell, heat_cell_center, valid_coordinate
from .models import FlightHeader

MAX_DURATION_S = 2 * 86_400
MAX_DISTANCE_M = 10_000_000
MAX_HEIGHT_M = 20_000
MAX_SPEED_MS = 200


def plausible(value: float, limit: float) -> float:
    """Beschädigte Kopfwerte (NaN, ∞, negativ, absurd groß) zählen als 0."""
    return value if math.isfinite(value) and 0 <= value <= limit else 0.0


@dataclass(frozen=True)
class YearStat:
    year: int
    flights: int
    duration_s: float
    distance_m: float


@dataclass(frozen=True)
class PlaceStat:
    key: str  # Rasterzelle, Schlüssel für den vom Nutzer vergebenen Namen
    lat: float
    lon: float
    flights: int
    duration_s: float


@dataclass(frozen=True)
class Logbook:
    flights: int = 0
    duration_s: float = 0.0
    distance_m: float = 0.0
    longest_flight_s: float = 0.0
    farthest_flight_m: float = 0.0
    highest_m: float = 0.0
    fastest_ms: float = 0.0
    years: tuple[YearStat, ...] = ()
    places: tuple[PlaceStat, ...] = ()


def build_logbook(headers: list[FlightHeader], tz: tzinfo) -> Logbook:
    flights = 0
    duration = distance = longest = farthest = highest = fastest = 0.0
    years: dict[int, list[float]] = {}
    places: dict[tuple[int, int], list[float]] = {}
    for h in headers:
        dur, dist = plausible(h.duration_s, MAX_DURATION_S), plausible(h.distance_m, MAX_DISTANCE_M)
        flights += 1
        duration += dur
        distance += dist
        longest, farthest = max(longest, dur), max(farthest, dist)
        highest = max(highest, plausible(h.max_height_m, MAX_HEIGHT_M))
        fastest = max(fastest, plausible(h.max_speed_ms, MAX_SPEED_MS))
        y = years.setdefault(h.start.astimezone(tz).year, [0, 0.0, 0.0])
        y[0] += 1
        y[1] += dur
        y[2] += dist
        if valid_coordinate(h.start_lat, h.start_lon):
            p = places.setdefault(heat_cell(h.start_lat, h.start_lon, PLACE_PRECISION_M), [0, 0.0])
            p[0] += 1
            p[1] += dur
    place_stats = []
    for cell, (count, dur) in places.items():
        lat, lon = heat_cell_center(cell, PLACE_PRECISION_M)
        place_stats.append(PlaceStat(key=f"{cell[0]},{cell[1]}", lat=lat, lon=lon, flights=count, duration_s=dur))
    place_stats.sort(key=lambda p: (-p.flights, -p.duration_s, p.key))  # meistbesucht, längste Flugzeit, Schlüssel aufsteigend
    return Logbook(
        flights=flights, duration_s=duration, distance_m=distance, longest_flight_s=longest, farthest_flight_m=farthest,
        highest_m=highest, fastest_ms=fastest,
        years=tuple(YearStat(year=y, flights=int(v[0]), duration_s=v[1], distance_m=v[2]) for y, v in sorted(years.items(), reverse=True)),
        places=tuple(place_stats))
