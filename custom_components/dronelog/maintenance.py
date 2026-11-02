"""Wartungspläne je Drohne (wie Maintenance.swift): gezählt wird ab `since`; „bald fällig“ ab 90 %, „fällig“ ab 100 %."""

from __future__ import annotations

import math
import threading
from dataclasses import dataclass, replace
from datetime import datetime

from homeassistant.components import persistent_notification
from homeassistant.core import HomeAssistant

from .flightbook import drone_label
from .models import FlightHeader

SOON_FRACTION = 0.9
_EPSILON = 1e-9
_LOCK = threading.Lock()


@dataclass(frozen=True)
class MaintenancePlan:
    drone_serial: str
    interval_hours: float | None
    interval_flights: int | None
    since: datetime  # Zeitpunkt der letzten Wartung bzw. des Einrichtens
    notified_due: bool = False

    @property
    def is_active(self) -> bool:
        return self.interval_hours is not None or self.interval_flights is not None


@dataclass(frozen=True)
class MaintenanceStatus:
    used_hours: float
    used_flights: int
    hours_fraction: float | None  # 1 = Intervall erreicht
    flights_fraction: float | None
    level: str  # ok | soon | due


@dataclass(frozen=True)
class MaintenanceRow:
    serial: str
    name: str
    model: str
    plan: MaintenancePlan | None
    status: MaintenanceStatus | None


@dataclass(frozen=True)
class MaintenanceReport:
    rows: list[MaintenanceRow]
    newly_due: list[MaintenanceRow]


def maintenance_status(plan: MaintenancePlan, flights: list[FlightHeader]) -> MaintenanceStatus:
    """Zählt alle Flüge der Drohne nach `since` (strikt später), ohne Limit."""
    since = [f for f in flights if f.drone_serial == plan.drone_serial and f.start > plan.since]
    hours = sum(max(0.0, f.duration_s) if math.isfinite(f.duration_s) else 0.0 for f in since) / 3600
    hours_fraction = hours / plan.interval_hours if plan.interval_hours and plan.interval_hours > 0 else None
    flights_fraction = len(since) / plan.interval_flights if plan.interval_flights and plan.interval_flights > 0 else None
    worst = max((x for x in (hours_fraction, flights_fraction) if x is not None), default=0.0)
    level = "due" if worst >= 1 - _EPSILON else "soon" if worst >= SOON_FRACTION - _EPSILON else "ok"
    return MaintenanceStatus(used_hours=hours, used_flights=len(since), hours_fraction=hours_fraction, flights_fraction=flights_fraction, level=level)


def _rows(store, plans: dict[str, MaintenancePlan], headers: list[FlightHeader] | None = None) -> list[MaintenanceRow]:
    if headers is None:
        headers = store.flight_headers()
    models: dict[str, str] = {}
    for h in headers:
        if h.drone_model and h.drone_serial not in models:
            models[h.drone_serial] = h.drone_model
    serials = sorted({h.drone_serial for h in headers} | set(plans))
    rows = []
    for serial in serials:
        plan = plans.get(serial)
        active = plan if plan and plan.is_active else None
        model = models.get(serial, "")
        rows.append(MaintenanceRow(serial=serial, name=drone_label(model, serial), model=model, plan=active,
                                   status=maintenance_status(active, headers) if active else None))
    return rows


def maintenance_rows(store) -> list[MaintenanceRow]:
    """Nur lesen (keine Statusänderung)."""
    with _LOCK:
        return _rows(store, store.plans())


def evaluate(store, headers: list[FlightHeader] | None = None) -> MaintenanceReport:
    """Berechnet alle Zeilen neu und markiert fällige Wartungen genau einmal je Wartungszyklus als gemeldet."""
    with _LOCK:
        plans = store.plans()
        rows = _rows(store, plans, headers)
        newly_due = []
        for index, row in enumerate(rows):
            if row.plan and row.status and row.status.level == "due" and not row.plan.notified_due:
                marked = replace(row.plan, notified_due=True)
                store.save_plan(marked)
                row = replace(row, plan=marked)
                rows[index] = row
                newly_due.append(row)
        return MaintenanceReport(rows=rows, newly_due=newly_due)


def set_plan(store, drone: str, hours: float | None, flights: int | None, now: datetime) -> MaintenancePlan | None:
    """Legt das Intervall fest (beide None = Überwachung aus). Gezählt wird ab jetzt; ein neues Intervall meldet neu."""
    with _LOCK:
        if hours is None and flights is None:
            store.delete_plan(drone)
            return None
        existing = store.plans().get(drone)
        plan = existing or MaintenancePlan(drone_serial=drone, interval_hours=None, interval_flights=None, since=now)
        changed = plan.interval_hours != hours or plan.interval_flights != flights
        plan = replace(plan, interval_hours=hours, interval_flights=flights, notified_due=False if changed else plan.notified_due)
        store.save_plan(plan)
        return plan


def mark_serviced(store, drone: str, now: datetime) -> MaintenancePlan | None:
    with _LOCK:
        plan = store.plans().get(drone)
        if plan is None:
            return None
        plan = replace(plan, since=now, notified_due=False)
        store.save_plan(plan)
        return plan


# --- Benachrichtigung -----------------------------------------------------------------------------------------------------

def notification_id(serial: str) -> str:
    return f"dronelog_maintenance_{serial}"


def _texts(language: str, name: str) -> tuple[str, str]:
    if language.startswith("de"):
        return "Wartung fällig", f"{name}: Das eingestellte Wartungsintervall ist erreicht. Prüfe Propeller und Motoren."
    return "Maintenance due", f"{name}: The configured maintenance interval has been reached. Check propellers and motors."


async def async_check_maintenance(hass: HomeAssistant, store, headers: list[FlightHeader] | None = None) -> list[MaintenanceRow]:
    """Neuberechnung (Executor) und je Wartungszyklus genau eine dauerhafte Benachrichtigung."""
    report = await hass.async_add_executor_job(evaluate, store, headers)
    for row in report.newly_due:
        title, message = _texts(hass.config.language, row.name)
        persistent_notification.async_create(hass, message, title, notification_id=notification_id(row.serial))
    return report.rows


def async_dismiss_notification(hass: HomeAssistant, serial: str) -> None:
    persistent_notification.async_dismiss(hass, notification_id(serial))
