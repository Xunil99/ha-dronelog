"""Schweregrade der Flugereignisse und Badges für die Flugliste (wie EventInfo.swift)."""

from __future__ import annotations

from typing import Any

from .models import EventKind, FlightExtras

SEVERITY = {
    EventKind.SIGNAL_LOSS_GO_HOME: "critical",
    EventKind.BATTERY_GO_HOME: "warning",
    EventKind.VOLTAGE_WARNING: "warning",
    EventKind.WEAK_SIGNAL: "warning",
    EventKind.LOW_GPS: "warning",
    EventKind.MANUAL_GO_HOME: "info",
    EventKind.PROPELLER_CATAPULT: "info",
}
_RANK = {"info": 0, "warning": 1, "critical": 2}
_ORDER = {kind.value: index for index, kind in enumerate(EventKind)}


def event_severity(kind: str) -> str:
    return SEVERITY.get(EventKind(kind), "info") if kind in _ORDER else "info"


def badge_kinds(kinds) -> list[str]:
    """Verschiedene Ereignisarten, schwerste zuerst, dann in der Reihenfolge der Arten."""
    return sorted(set(kinds), key=lambda k: (-_RANK[event_severity(k)], _ORDER.get(k, len(_ORDER))))


def flight_badges(extras: FlightExtras | None) -> dict[str, Any]:
    if extras is None:
        return {"kinds": [], "worst": None, "photo_count": 0, "video_s": 0.0}
    kinds = badge_kinds(e.kind for e in extras.events)
    worst = max((event_severity(k) for k in kinds), key=_RANK.__getitem__, default=None)
    return {"kinds": kinds, "worst": worst, "photo_count": extras.photo_count, "video_s": extras.video_s}


EVENT_TITLES = {
    EventKind.SIGNAL_LOSS_GO_HOME: "Rückkehr wegen Verbindungsabbruch",
    EventKind.BATTERY_GO_HOME: "Rückkehr wegen Akku",
    EventKind.VOLTAGE_WARNING: "Spannungswarnung",
    EventKind.WEAK_SIGNAL: "Funksignal schwach",
    EventKind.LOW_GPS: "GPS-Signal schwach",
    EventKind.MANUAL_GO_HOME: "Rückkehr per Taste",
    EventKind.PROPELLER_CATAPULT: "Propeller-Anlauf",
}


def event_title(kind: str) -> str:
    """Deutscher Titel wie in der iOS-App; unbekannte Arten behalten ihren Schlüssel."""
    return EVENT_TITLES.get(kind, kind) if kind in _ORDER else kind  # StrEnum-Schlüssel sind gleich ihren Werten
