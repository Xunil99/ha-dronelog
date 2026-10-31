"""Parser: DJI-Flightlog (verschlüsselt ab Version 13) → ParsedFlight. Blockierend, im Executor aufrufen."""

from __future__ import annotations

import dataclasses
import json
import math
from collections.abc import Sequence
from datetime import UTC, datetime

from pydjirecord import DJILog
from pydjirecord.error import ApiError, ApiKeyError
from pydjirecord.keychain import KeychainFeaturePoint

from .models import BatterySummary, ParsedFlight, Sample

# Zellspannungs-Abweichungen darüber sind Messartefakte am Aufzeichnungsbeginn.
MAX_PLAUSIBLE_CELL_DEVIATION_V = 0.5
EPOCH_YEAR_LIMIT = 2010


class KeyRequiredError(Exception):
    """Log ab Version 13, aber kein DJI-Key und keine gespeicherten Keychains."""


class DecryptError(Exception):
    """DJI-Key ungültig."""


class KeyServiceError(Exception):
    """DJI-Schlüsseldienst nicht erreichbar oder liefert einen Fehler (später erneut versuchen)."""


class ParseError(Exception):
    """Datei ist keine auswertbare Logdatei."""


def serialize_keychains(keychains: Sequence[Sequence[KeychainFeaturePoint]]) -> str:
    return json.dumps([[dataclasses.asdict(point) for point in group] for group in keychains])


def deserialize_keychains(text: str) -> list[list[KeychainFeaturePoint]]:
    return [[KeychainFeaturePoint(**point) for point in group] for group in json.loads(text)]


def downsample(samples: Sequence[Sample], step_s: float = 2.0) -> tuple[Sample, ...]:
    """Erster Wert je Zeitfenster; der letzte Punkt bleibt immer erhalten."""
    if not samples:
        return ()
    kept: list[Sample] = []
    next_t = samples[0].t
    for sample in samples:
        if sample.t >= next_t:
            kept.append(sample)
            next_t = sample.t + step_s
    if kept[-1] is not samples[-1]:
        kept.append(samples[-1])
    return tuple(kept)


def _position(lat: float, lon: float) -> tuple[float | None, float | None]:
    if not (math.isfinite(lat) and math.isfinite(lon)) or (abs(lat) < 1e-6 and abs(lon) < 1e-6):
        return None, None
    return lat, lon


def _start_time(frames, details) -> datetime:
    for frame in frames:
        moment = frame.custom.date_time
        if moment and moment.year >= EPOCH_YEAR_LIMIT:
            return moment if moment.tzinfo else moment.replace(tzinfo=UTC)
    start = details.start_time
    return start if start.tzinfo else start.replace(tzinfo=UTC)


def _battery_summary(frames) -> BatterySummary:
    batt = [f.battery for f in frames]
    charges = [b.charge_level for b in batt if b.charge_level > 0]
    voltages = [b.voltage for b in batt if b.voltage > 0]
    power = [b.voltage * b.current for b in batt if b.voltage > 0]
    temps = [b.temperature for b in batt if b.temperature > 0]
    deviations = [b.cell_voltage_deviation for b in batt if 0 <= b.cell_voltage_deviation < MAX_PLAUSIBLE_CELL_DEVIATION_V]
    last = batt[-1] if batt else None
    return BatterySummary(
        charge_start=charges[0] if charges else 0,
        charge_end=charges[-1] if charges else 0,
        min_voltage=min(voltages, default=0.0),
        max_voltage=max(voltages, default=0.0),
        peak_current_a=max((b.current for b in batt), default=0.0),
        avg_power_w=sum(power) / len(power) if power else 0.0,
        peak_power_w=max(power, default=0.0),
        temp_min_c=min(temps, default=0.0),
        temp_max_c=max(temps, default=0.0),
        cell_deviation_max_v=max(deviations, default=0.0),
        full_capacity_mah=max((b.full_capacity for b in batt), default=0),
        cycles=(last.number_of_discharges or None) if last else None,
        health_pct=(last.lifetime_remaining or None) if last else None,
    )


def flight_from_frames(frames, details, sha256: str, log_version: int, keychains_json: str) -> ParsedFlight:
    if not frames:
        raise ParseError("Keine Datenpunkte in der Logdatei.")
    samples = []
    for frame in frames:
        lat, lon = _position(frame.osd.latitude, frame.osd.longitude)
        samples.append(Sample(t=frame.osd.fly_time, lat=lat, lon=lon, height=frame.osd.height, speed=frame.osd.h_speed,
                              voltage=frame.battery.voltage, current=frame.battery.current, charge=frame.battery.charge_level))
    positions = [(s.lat, s.lon) for s in samples if s.lat is not None]
    first_lat, first_lon = positions[0] if positions else (None, None)
    battery_sn = details.battery_sn or next((f.recover.battery_sn for f in frames if f.recover.battery_sn), "")
    return ParsedFlight(
        sha256=sha256,
        log_version=log_version,
        start=_start_time(frames, details),
        duration_s=max(f.osd.fly_time for f in frames),
        distance_m=frames[-1].osd.cumulative_distance,
        max_height_m=max(f.osd.height for f in frames),
        max_speed_ms=max(f.osd.h_speed for f in frames),
        start_lat=first_lat,
        start_lon=first_lon,
        drone_model=details.aircraft_name or getattr(details.product_type, "name", ""),
        drone_serial=details.aircraft_sn or "",
        battery_serial=battery_sn,
        battery=_battery_summary(frames),
        samples=downsample(samples),
        keychains_json=keychains_json,
    )


def parse_log(data: bytes, sha256: str, api_key: str | None, stored_keychains: str | None = None) -> ParsedFlight:
    try:
        log = DJILog.from_bytes(data)
    except Exception as err:
        raise ParseError("Datei ist keine auswertbare DJI-Logdatei.") from err

    keychains = None
    keychains_json = ""
    if log.version >= 13:
        if stored_keychains:
            keychains, keychains_json = deserialize_keychains(stored_keychains), stored_keychains
        elif api_key:
            try:
                keychains = log.fetch_keychains(api_key, cache=False)
            except ApiKeyError as err:
                raise DecryptError("DJI-API-Key ungültig.") from err
            except ApiError as err:
                raise KeyServiceError("DJI-Schlüsseldienst nicht erreichbar.") from err
            keychains_json = serialize_keychains(keychains)
        else:
            raise KeyRequiredError("DJI-Key fehlt.")
    try:
        frames = log.frames(keychains)
    except Exception as err:
        raise ParseError("Logdatei lässt sich nicht lesen (beschädigt oder unvollständig).") from err
    return flight_from_frames(frames, log.details, sha256, log.version, keychains_json)
