"""Flugphasen aus Höhenänderung und Bodengeschwindigkeit (identisch zu Logbook.swift)."""

from __future__ import annotations

from collections.abc import Sequence
from enum import StrEnum

from .models import Sample


class FlightPhase(StrEnum):
    CLIMB = "climb"
    CRUISE = "cruise"
    HOVER = "hover"
    DESCENT = "descent"


def flight_phase_durations(samples: Sequence[Sample]) -> dict[FlightPhase, float]:
    """Zeit je Flugphase (nur in der Luft, Höhe > 1,5 m); Lücken über 10 s zählen nicht."""
    result: dict[FlightPhase, float] = {}
    for a, b in zip(samples, samples[1:], strict=False):
        dt = b.t - a.t
        if not (0 < dt <= 10) or not (b.height > 1.5 or a.height > 1.5):
            continue
        vz = (b.height - a.height) / dt
        if vz >= 0.5:
            phase = FlightPhase.CLIMB
        elif vz <= -0.5:
            phase = FlightPhase.DESCENT
        elif b.speed < 0.8:
            phase = FlightPhase.HOVER
        else:
            phase = FlightPhase.CRUISE
        result[phase] = result.get(phase, 0.0) + dt
    return result
