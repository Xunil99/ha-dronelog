"""Datenmodelle der DroneLog-Integration."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum


class FileStatus(StrEnum):
    PENDING = "pending"
    PENDING_KEY = "pending_key"
    PROCESSED = "processed"
    ERROR = "error"


@dataclass(frozen=True)
class Sample:
    t: float
    lat: float | None
    lon: float | None
    height: float
    speed: float
    voltage: float
    current: float
    charge: int
    # Kanäle ab Analyseversion 2 (optional: ältere Datensätze enthalten sie nicht)
    dist: float | None = None  # Entfernung vom Startpunkt in m
    dl: int | None = None  # Downlink-Signal in %
    ul: int | None = None  # Uplink-Signal in %
    rec: bool | None = None  # Videoaufnahme läuft
    mode: int | None = None  # Flugmodus-ID
    # ab Analyseversion 3
    temp: float | None = None  # Akku-Temperatur in °C (None = nicht gemessen)
    cell_dev: float | None = None  # Zellabweichung in V (None = Zellwerte nur geschätzt)
    # ab Analyseversion 4 (Lage in Grad, auf 0,1° gerundet)
    pitch: float | None = None
    roll: float | None = None
    yaw: float | None = None


class EventKind(StrEnum):
    BATTERY_GO_HOME = "batteryGoHome"  # automatische Rückkehr wegen Akku (Flugaktion 3)
    SIGNAL_LOSS_GO_HOME = "signalLossGoHome"  # Rückkehr wegen Verbindungsabbruch (15)
    MANUAL_GO_HOME = "manualGoHome"  # Rückkehr per Taste (8)
    VOLTAGE_WARNING = "voltageWarning"  # Spannungswarnung (value = Stufe)
    PROPELLER_CATAPULT = "propellerCatapult"  # Propeller-Anlauf-Flag
    LOW_GPS = "lowGPS"  # GPS-Stufe < 3 in der Luft (>= 3 s)
    WEAK_SIGNAL = "weakSignal"  # Downlink < 30 % in der Luft (>= 3 s)


@dataclass(frozen=True)
class FlightEvent:
    t: float  # Flugsekunde des Beginns
    kind: str  # EventKind-Wert
    value: float  # Dauer in s (bzw. Warnstufe)


@dataclass(frozen=True)
class FlightExtras:
    """Zusätzliche Kennzahlen aus den vollaufgelösten Frames (Definitionen wie in der iOS-App)."""

    events: tuple[FlightEvent, ...] = ()
    energy_wh: float = 0.0
    wh_per_km: float | None = None
    max_distance_from_start_m: float = 0.0
    downlink_min: int | None = None
    uplink_min: int | None = None
    weak_signal_s: float = 0.0
    photo_count: int = 0
    video_s: float = 0.0
    max_descent_ms: float = 0.0
    max_climb_ms: float = 0.0


@dataclass(frozen=True)
class BatterySummary:
    charge_start: int
    charge_end: int
    min_voltage: float
    max_voltage: float
    peak_current_a: float
    avg_power_w: float
    peak_power_w: float
    temp_min_c: float
    temp_max_c: float
    cell_deviation_max_v: float
    full_capacity_mah: int
    cycles: int | None
    health_pct: int | None
    internal_resistance_mohm: float | None = None  # grobe Schätzung des Gesamtpacks; None = Qualitätstor nicht erfüllt


@dataclass(frozen=True)
class ParsedFlight:
    sha256: str
    log_version: int
    start: datetime
    duration_s: float
    distance_m: float
    max_height_m: float
    max_speed_ms: float
    start_lat: float | None
    start_lon: float | None
    drone_model: str
    drone_serial: str
    battery_serial: str
    battery: BatterySummary
    samples: tuple[Sample, ...]
    keychains_json: str
    extras: FlightExtras | None = None


@dataclass(frozen=True)
class WeatherSummary:
    temperature_c: float
    wind_10m_ms: float
    wind_80m_ms: float | None
    gust_ms: float
    wind_dir_deg: float
    precipitation_mm: float
    cloud_cover_pct: int
    source: str


@dataclass(frozen=True)
class FlightRow:
    id: int
    sha256: str
    start: datetime
    duration_s: float
    distance_m: float
    max_height_m: float
    max_speed_ms: float
    drone_serial: str
    drone_model: str
    battery_serial: str
    source_name: str
    temperature_c: float | None
    wind_10m_ms: float | None
    has_position: bool = False


@dataclass(frozen=True)
class FlightDetail:
    row: FlightRow
    start_lat: float | None
    start_lon: float | None
    end_lat: float | None
    end_lon: float | None
    battery: BatterySummary
    weather: WeatherSummary | None
    samples: tuple[Sample, ...]


@dataclass(frozen=True)
class Totals:
    flights: int
    duration_s: float
    distance_m: float
    last_flight: FlightRow | None


@dataclass(frozen=True)
class BatteryPoint:
    flight_id: int
    start: datetime
    charge_start: int
    charge_end: int
    cycles: int | None
    health_pct: int | None
    cell_deviation_max_v: float
    temp_max_c: float
    avg_power_w: float


@dataclass(frozen=True)
class HeatCell:
    lat: float
    lon: float
    count: int


@dataclass(frozen=True)
class DroneInfo:
    serial: str
    model: str
    flights: int
    duration_s: float


@dataclass(frozen=True)
class BatteryInfo:
    serial: str
    flights: int
    last: BatteryPoint | None


@dataclass(frozen=True)
class Overview:
    totals: Totals
    drones: tuple[DroneInfo, ...]
    batteries: tuple[BatteryInfo, ...]
    pending: int
    errors: int


@dataclass(frozen=True)
class MonthStat:
    month: str
    flights: int
    duration_s: float
    distance_m: float


@dataclass(frozen=True)
class BatteryListItem:
    serial: str
    flights: int
    first: datetime
    last: datetime
    latest: BatteryPoint | None
    drones: tuple[str, ...] = ()
