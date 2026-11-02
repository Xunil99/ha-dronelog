"""Zellabweichung eines Flugs: bis 20 mV in Ordnung, bis 50 mV auffällig, darüber kritisch (wie FlightModes.swift)."""

from __future__ import annotations

from enum import StrEnum


class CellDeviationLevel(StrEnum):
    OK = "ok"
    MINOR = "minor"
    MAJOR = "major"

    @property
    def text(self) -> str:
        return {"ok": "in Ordnung", "minor": "auffällig", "major": "kritisch"}[self.value]


def cell_deviation_level(volts: float) -> CellDeviationLevel:
    mv = volts * 1000
    if mv > 50.0001:
        return CellDeviationLevel.MAJOR
    return CellDeviationLevel.MINOR if mv > 20.0001 else CellDeviationLevel.OK
