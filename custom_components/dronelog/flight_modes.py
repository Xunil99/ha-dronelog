"""Flugmodus-IDs von DJI in Gruppen (identisch zu FlightModes.swift) und Modus-Abschnitte einer Zeitreihe."""

from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass
from enum import StrEnum

from .models import Sample


class FlightModeCategory(StrEnum):
    NORMAL = "normal"
    SPORT = "sport"
    CINE = "cine"
    MANUAL = "manual"
    AUTOMATIC = "automatic"
    GO_HOME = "goHome"
    ATTITUDE = "attitude"
    SMART = "smart"
    OTHER = "other"

    @property
    def title(self) -> str:
        return _TITLES[self]


_TITLES = {
    FlightModeCategory.NORMAL: "Normal", FlightModeCategory.SPORT: "Sport", FlightModeCategory.CINE: "Cine",
    FlightModeCategory.MANUAL: "Manuell", FlightModeCategory.AUTOMATIC: "Start/Landung", FlightModeCategory.GO_HOME: "Rückflug",
    FlightModeCategory.ATTITUDE: "Ohne GPS", FlightModeCategory.SMART: "Intelligent", FlightModeCategory.OTHER: "Sonstige",
}

_GROUPS = {
    FlightModeCategory.NORMAL: (4, 5, 6, 7, 8, 32, 43),  # Hover, GPS-Varianten, Novice, Gentle
    FlightModeCategory.SPORT: (31,),
    FlightModeCategory.CINE: (19, 38),  # Cinematic, Stativ
    FlightModeCategory.MANUAL: (0, 30),  # Manuell, FPV
    FlightModeCategory.AUTOMATIC: (10, 11, 12, 33, 35, 37, 41),  # Start, Landung, Terrain
    FlightModeCategory.GO_HOME: (15, 36),
    FlightModeCategory.ATTITUDE: (1, 2, 3, 13, 23),  # ohne GPS-Halt
    FlightModeCategory.SMART: (9, 14, 16, 17, 18, 24, 25, 26, 27, 28, 39),  # Hot Point, Waypoint, ActiveTrack, TapFly ...
}
_BY_MODE = {mode: category for category, modes in _GROUPS.items() for mode in modes}


def flight_mode_category(mode: int) -> FlightModeCategory:
    return _BY_MODE.get(mode, FlightModeCategory.OTHER)


@dataclass
class FlightModeSegment:
    category: FlightModeCategory
    start: float
    end: float


def flight_mode_segments(samples: Sequence[Sample]) -> list[FlightModeSegment]:
    """Aufeinanderfolgende Punkte derselben Gruppe werden ein Abschnitt; Punkte ohne Modus gehören zum vorigen.
    Leer, wenn der Flug keinen Modus-Kanal hat."""
    segments: list[FlightModeSegment] = []
    for sample in samples:
        if sample.mode is None:
            continue
        category = flight_mode_category(sample.mode)
        if segments and segments[-1].category == category:
            continue
        if segments:
            segments[-1].end = sample.t
        segments.append(FlightModeSegment(category, sample.t, sample.t))
    if segments and samples:
        segments[-1].end = max(samples[-1].t, segments[-1].start)
    return segments


def flight_mode_durations(segments: Sequence[FlightModeSegment]) -> dict[FlightModeCategory, float]:
    result: dict[FlightModeCategory, float] = {}
    for g in segments:
        result[g.category] = result.get(g.category, 0.0) + max(0.0, g.end - g.start)
    return result
