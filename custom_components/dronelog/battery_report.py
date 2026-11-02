"""Akku-Bericht und Gesamteinschätzung (wie BatteryReport.swift / BatteryReportQueries.swift der iOS-App)."""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from datetime import datetime
from statistics import median
from typing import Any

from .models import BatterySummary, EventKind, FlightExtras

MAX_DURATION_S = 2 * 86_400
MAX_DISTANCE_M = 10_000_000
CELL_WARNING_MV = 20
CELL_CRITICAL_MV = 50


def round_half_up(value: float) -> int:
    """Wie Swifts `.rounded()` (Hälften weg von null), nicht das kaufmännische Python-`round`."""
    return int(math.floor(abs(value) + 0.5)) * (1 if value >= 0 else -1)


@dataclass(frozen=True)
class BatteryReportFlight:
    flight_id: int
    start: datetime
    duration_s: float
    charge_start: int
    charge_end: int
    peak_current_a: float
    temp_max_c: float
    cell_deviation_mv: float
    cycles: int | None
    health_pct: int | None
    resistance_mohm: float | None


@dataclass(frozen=True)
class BatteryReportData:
    """Alles, was die Flugprotokolle über einen Akku hergeben (Ladevorgänge außerhalb des Flugs fehlen)."""

    serial: str
    drone_models: tuple[str, ...]
    flights: int
    first_use: datetime
    last_use: datetime
    total_duration_s: float
    total_distance_m: float
    cycles_first: int | None
    cycles_latest: int | None
    health_first: int | None
    health_latest: int | None
    full_capacity_mah: int
    peak_current_a: float
    peak_power_w: float
    avg_power_w: float
    min_voltage: float
    max_voltage: float
    temp_min_c: float
    temp_max_c: float
    cell_deviation_max_mv: float
    flights_above_cell_warning: int
    voltage_warnings: int
    resistance_median_mohm: float | None
    avg_charge_used_pct: float
    history: tuple[BatteryReportFlight, ...] = ()

    @property
    def cycles_added(self) -> int | None:
        return None if self.cycles_first is None or self.cycles_latest is None else self.cycles_latest - self.cycles_first

    @property
    def health_loss_pct(self) -> int | None:
        return None if self.health_first is None or self.health_latest is None else self.health_first - self.health_latest


@dataclass(frozen=True)
class FlightInput:
    """Ein Flug des Akkus, wie ihn die Datenbank liefert."""

    flight_id: int
    start: datetime
    duration_s: float
    distance_m: float
    drone_model: str
    battery: BatterySummary
    extras: FlightExtras | None


def _is_placeholder(b: BatterySummary) -> bool:
    return not any((b.charge_start, b.charge_end, b.full_capacity_mah, b.peak_power_w, b.avg_power_w))


def _valid(value: float, limit: float) -> float:
    return value if math.isfinite(value) and 0 <= value <= limit else 0.0


def build_battery_report(serial: str, flights: list[FlightInput]) -> BatteryReportData | None:
    """flights: alle Flüge des Akkus, älteste zuerst. None, wenn kein Flug echte Akkuwerte enthält."""
    history: list[BatteryReportFlight] = []
    summaries: list[BatterySummary] = []
    warnings = 0
    for f in flights:
        b = f.battery
        if _is_placeholder(b):
            continue  # Log ohne Zeitreihe
        summaries.append(b)
        if f.extras:
            warnings += sum(1 for e in f.extras.events if e.kind == EventKind.VOLTAGE_WARNING.value)
        history.append(BatteryReportFlight(
            flight_id=f.flight_id, start=f.start, duration_s=f.duration_s, charge_start=b.charge_start, charge_end=b.charge_end,
            peak_current_a=b.peak_current_a, temp_max_c=b.temp_max_c, cell_deviation_mv=b.cell_deviation_max_v * 1000,
            cycles=b.cycles, health_pct=b.health_pct, resistance_mohm=b.internal_resistance_mohm))
    if not flights or not summaries:
        return None
    used = [float(b.charge_start - b.charge_end) for b in summaries]
    voltages = [b.min_voltage for b in summaries if b.min_voltage > 0]
    temps = [b.temp_min_c for b in summaries if b.temp_min_c != 0]
    cycles = [b.cycles for b in summaries if b.cycles is not None]
    healths = [b.health_pct for b in summaries if b.health_pct is not None]
    resistances = [b.internal_resistance_mohm for b in summaries if b.internal_resistance_mohm is not None]
    return BatteryReportData(
        serial=serial, drone_models=tuple(sorted({f.drone_model for f in flights if f.drone_model})),
        flights=len(flights), first_use=flights[0].start, last_use=flights[-1].start,
        total_duration_s=sum(_valid(f.duration_s, MAX_DURATION_S) for f in flights),
        total_distance_m=sum(_valid(f.distance_m, MAX_DISTANCE_M) for f in flights),
        cycles_first=cycles[0] if cycles else None, cycles_latest=cycles[-1] if cycles else None,
        health_first=healths[0] if healths else None, health_latest=healths[-1] if healths else None,
        full_capacity_mah=max(b.full_capacity_mah for b in summaries),
        peak_current_a=max(b.peak_current_a for b in summaries), peak_power_w=max(b.peak_power_w for b in summaries),
        avg_power_w=sum(b.avg_power_w for b in summaries) / len(summaries),
        min_voltage=min(voltages) if voltages else 0.0, max_voltage=max(b.max_voltage for b in summaries),
        temp_min_c=min(temps) if temps else 0.0, temp_max_c=max(b.temp_max_c for b in summaries),
        cell_deviation_max_mv=max(b.cell_deviation_max_v for b in summaries) * 1000,
        flights_above_cell_warning=sum(1 for b in summaries if b.cell_deviation_max_v * 1000 > CELL_WARNING_MV),
        voltage_warnings=warnings, resistance_median_mohm=median(resistances) if resistances else None,
        avg_charge_used_pct=sum(used) / len(used), history=tuple(history))


# --- Gesamteinschätzung ------------------------------------------------------------------------------------------------

_LEVELS = ("good", "watch", "critical")
_HEADLINES = {"good": "Akku in gutem Zustand", "watch": "Akku beobachten", "critical": "Austausch erwägen"}


@dataclass(frozen=True)
class Finding:
    """Stabiler Code (für die Übersetzung im Frontend), Parameter und der deutsche Text."""

    code: str
    text: str
    params: dict[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class BatteryAssessment:
    level: str  # good | watch | critical
    headline_code: str
    headline: str
    state_of_health: Finding
    points: tuple[Finding, ...]


def _state_of_health(r: BatteryReportData) -> Finding:
    health = r.health_latest
    if health is None:
        return Finding("soh_missing", "State of Health: nicht verfügbar (der Akku meldet keinen Gesundheitswert).")
    base = f"State of Health (laut Akku-Elektronik): {health} %"
    first, added = r.health_first, r.cycles_added
    if first is not None and added is not None and added > 0 and first != health:
        params = {"health": health, "first": first, "loss": first - health, "cycles": added}
        return Finding("soh_trend_cycles", f"{base} (zu Beginn des Zeitraums {first} %, {first - health} Punkte in {added} Zyklen).", params)
    if first is not None and first != health:
        return Finding("soh_trend", f"{base} (zu Beginn des Zeitraums {first} %).", {"health": health, "first": first})
    return Finding("soh", f"{base}.", {"health": health})


def assess(r: BatteryReportData) -> BatteryAssessment:
    """Schwellen: Gesundheit ab 90 % gut, ab 80 % beobachten, darunter kritisch; Zellabweichung über 20 mV auffällig (mind. ein Flug),
    über 50 mV kritisch; ab zwei Spannungswarnungen beobachten."""
    level = 0
    points: list[Finding] = []
    if r.health_latest is not None:
        if r.health_latest < 80:
            level = max(level, 2)
            points.append(Finding("health_critical", "Die Gesundheit liegt unter 80 %: Ein Austausch des Akkus ist zu erwägen.",
                                  {"health": r.health_latest}))
        elif r.health_latest < 90:
            level = max(level, 1)
            points.append(Finding("health_watch", "Die Gesundheit lässt nach (unter 90 %): Beobachte den Akku und plane einen Ersatz ein.",
                                  {"health": r.health_latest}))
    else:
        points.append(Finding("health_missing", "Der Akku meldet keinen Gesundheitswert; die Einschätzung stützt sich nur auf "
                                                "Zellabweichung und Warnungen."))
    if r.cell_deviation_max_mv > CELL_CRITICAL_MV:
        level = max(level, 2)
        mv = round_half_up(r.cell_deviation_max_mv)
        points.append(Finding("cell_critical", f"Die Zellen liefen bis zu {mv} mV auseinander (über 50 mV): Das deutet auf eine schwache Zelle hin.",
                              {"mv": mv}))
    elif r.cell_deviation_max_mv > CELL_WARNING_MV and r.flights_above_cell_warning >= 1:
        level = max(level, 1)
        points.append(Finding("cell_watch", f"In {r.flights_above_cell_warning} Flügen lagen die Zellen über 20 mV auseinander.",
                              {"flights": r.flights_above_cell_warning}))
    if r.voltage_warnings >= 2:
        level = max(level, 1)
        points.append(Finding("voltage_warnings", f"Es gab {r.voltage_warnings} Spannungswarnungen: Lande früher und lade den Akku nicht tief entladen.",
                              {"count": r.voltage_warnings}))
    if not points:
        points.append(Finding("all_clear", "Keine Auffälligkeiten bei Gesundheit, Zellabweichung und Warnungen."))
    name = _LEVELS[level]
    return BatteryAssessment(level=name, headline_code=name, headline=_HEADLINES[name], state_of_health=_state_of_health(r), points=tuple(points))
