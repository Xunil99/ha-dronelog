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
