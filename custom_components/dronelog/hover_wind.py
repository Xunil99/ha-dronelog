"""Windhinweis aus der Lage im Schwebeflug (identisch zu HoverWind.swift)."""

from __future__ import annotations

import math
from collections.abc import Sequence
from dataclasses import dataclass
from enum import StrEnum

from .models import Sample


class WindClass(StrEnum):
    CALM = "calm"
    MODERATE = "moderate"
    WINDY = "windy"

    @property
    def text(self) -> str:
        return {"calm": "ruhig", "moderate": "mäßig", "windy": "windig"}[self.value]


def wind_class(tilt_deg: float) -> WindClass:
    """Neigung im Schwebeflug: unter 2° ruhig, bis 5° mäßig, darüber windig."""
    return WindClass.CALM if tilt_deg < 2 else (WindClass.MODERATE if tilt_deg <= 5 else WindClass.WINDY)


@dataclass(frozen=True)
class HoverWind:
    tilt_deg: float  # mittlere Neigung gegen den Wind
    bearing_deg: float  # Richtung, AUS der der Wind kommt
    seconds: float

    @property
    def wind_class(self) -> WindClass:
        return wind_class(self.tilt_deg)


def wind_from_attitude(roll_deg: float, pitch_deg: float, yaw_deg: float) -> tuple[float, float]:
    """Nick/Roll im Erdkoordinatensystem ergeben Neigung und Windrichtung (Grad, 0..<360)."""
    f, r = -pitch_deg, roll_deg
    psi = math.radians(yaw_deg)
    north = f * math.cos(psi) - r * math.sin(psi)
    east = f * math.sin(psi) + r * math.cos(psi)
    bearing = math.degrees(math.atan2(east, north))
    if bearing < 0:
        bearing += 360
    return math.hypot(pitch_deg, roll_deg), bearing


def hover_wind(samples: Sequence[Sample]) -> HoverWind | None:
    """Aus ruhigen Schwebephasen (am Stück >= 5 s, Höhe > 1,5 m, Bodengeschwindigkeit < 0,8 m/s, Steigen/Sinken < 0,5 m/s)."""
    north = east = tilt = count = seconds = 0.0
    run: list[tuple[float, float, float, float]] = []

    def flush() -> None:
        nonlocal north, east, tilt, count, seconds
        if run and run[-1][0] - run[0][0] >= 5:
            for _t, n, e, tl in run:
                north += n
                east += e
                tilt += tl
                count += 1
            seconds += run[-1][0] - run[0][0]
        run.clear()

    for i, s in enumerate(samples):
        if s.pitch is None or s.roll is None or s.yaw is None or not s.height > 1.5 or not s.speed < 0.8:
            flush()
            continue
        if i > 0 and samples[i - 1].t < s.t:
            if abs(s.height - samples[i - 1].height) / (s.t - samples[i - 1].t) >= 0.5:
                flush()
                continue
        w_tilt, w_bearing = wind_from_attitude(s.roll, s.pitch, s.yaw)
        rad = math.radians(w_bearing)
        run.append((s.t, w_tilt * math.cos(rad), w_tilt * math.sin(rad), w_tilt))
    flush()
    if count <= 0:
        return None
    bearing = math.degrees(math.atan2(east, north))
    if bearing < 0:
        bearing += 360
    return HoverWind(tilt_deg=tilt / count, bearing_deg=bearing, seconds=seconds)
