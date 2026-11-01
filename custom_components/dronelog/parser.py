"""Parser: DJI-Flightlog (verschlüsselt ab Version 13) → ParsedFlight. Blockierend, im Executor aufrufen."""

from __future__ import annotations

import dataclasses
import json
import math
import re
from collections.abc import Sequence
from datetime import UTC, datetime, timedelta

from pydjirecord import DJILog
from pydjirecord.error import ApiError, ApiKeyError
from pydjirecord.keychain import KeychainFeaturePoint
from pydjirecord.utils import haversine_distance

from .extras import compute_extras
from .models import BatterySummary, ParsedFlight, Sample
from .resistance import estimate_internal_resistance

# Zellspannungs-Abweichungen darüber sind Messartefakte am Aufzeichnungsbeginn.
MAX_PLAUSIBLE_CELL_DEVIATION_V = 0.5
EPOCH_YEAR_LIMIT = 2010


class KeyRequiredError(Exception):
    """Log ab Version 13, aber kein DJI-Key und keine gespeicherten Keychains."""


class DecryptError(Exception):
    """DJI-Key ungültig."""


class KeyServiceError(Exception):
    """DJI-Schlüsseldienst nicht erreichbar oder liefert einen Fehler (später erneut versuchen)."""


class KeyRejectedError(Exception):
    """DJI lehnt die Schlüsselanfrage für genau diese Datei ab (kein Dienstausfall)."""


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
    # fly_time bleibt nach der Landung stehen: nur anhängen, wenn der Zeitwert wirklich neu ist
    if samples[-1].t > kept[-1].t:
        kept.append(samples[-1])
    return tuple(kept)


def _position(lat: float, lon: float) -> tuple[float | None, float | None]:
    if not (math.isfinite(lat) and math.isfinite(lon)) or (abs(lat) < 1e-6 and abs(lon) < 1e-6):
        return None, None
    if abs(lat) > 90 or abs(lon) > 180:
        return None, None  # kaputte Header/Frames: keine Position statt Müllkoordinaten
    return lat, lon


def _tenth(value: float) -> float | None:
    """Auf 0,1 gerundet (Halbwerte weg von Null wie in Swift); nicht endliche Werte gibt es in der Zeitreihe nicht."""
    if not math.isfinite(value):
        return None
    return math.copysign(math.floor(abs(value) * 10 + 0.5) / 10, value) + 0.0


MAX_CLOCK_DEVIATION = timedelta(days=1)


def _aware(moment: datetime) -> datetime:
    return moment if moment.tzinfo else moment.replace(tzinfo=UTC)


def _start_time(frames, details) -> datetime:
    header = _aware(details.start_time)
    for frame in frames:
        moment = frame.custom.date_time
        if moment and moment.year >= EPOCH_YEAR_LIMIT:
            moment = _aware(moment)
            # Falsch gestellte Drohnenuhr (z. B. Jahr 2040): dann gilt die Zeit aus dem Dateikopf.
            return moment if abs(moment - header) <= MAX_CLOCK_DEVIATION else header
    return header


def _clean_serial(value: str | None) -> str:
    cleaned = "".join(ch for ch in (value or "") if ch.isascii() and (ch.isalnum() or ch == "-"))
    return cleaned if len(cleaned) >= 4 else "unbekannt"


def _battery_summary(frames) -> BatterySummary:
    batt = [f.battery for f in frames]
    charges = [b.charge_level for b in batt if b.charge_level > 0]
    voltages = [b.voltage for b in batt if b.voltage > 0]
    power = [b.voltage * abs(b.current) for b in batt if b.voltage > 0]
    temps = [b.temperature for b in batt if b.temperature != 0.0]  # 0.0 = nicht gemessen; Minusgrade bleiben erhalten
    deviations = [b.cell_voltage_deviation for b in batt if 0 <= b.cell_voltage_deviation < MAX_PLAUSIBLE_CELL_DEVIATION_V]
    last = batt[-1] if batt else None
    return BatterySummary(
        charge_start=charges[0] if charges else 0,
        charge_end=charges[-1] if charges else 0,
        min_voltage=min(voltages, default=0.0),
        max_voltage=max(voltages, default=0.0),
        peak_current_a=max((abs(b.current) for b in batt), default=0.0),
        avg_power_w=sum(power) / len(power) if power else 0.0,
        peak_power_w=max(power, default=0.0),
        temp_min_c=min(temps, default=0.0),
        temp_max_c=max(temps, default=0.0),
        cell_deviation_max_v=max(deviations, default=0.0),
        full_capacity_mah=max((b.full_capacity for b in batt), default=0),
        cycles=(last.number_of_discharges or None) if last else None,
        health_pct=(last.lifetime_remaining or None) if last else None,
        internal_resistance_mohm=estimate_internal_resistance(frames),
    )


def flight_from_frames(frames, details, sha256: str, log_version: int, keychains_json: str) -> ParsedFlight:
    if not frames:
        raise ParseError("Keine Datenpunkte in der Logdatei.")
    positions_all = [_position(f.osd.latitude, f.osd.longitude) for f in frames]
    origin = next((p for p in positions_all if p[0] is not None), None)
    samples = []
    for frame, (lat, lon) in zip(frames, positions_all, strict=True):
        dist = haversine_distance(origin[0], origin[1], lat, lon) if origin and lat is not None else None
        temperature = frame.battery.temperature
        mode = frame.osd.flyc_state
        samples.append(Sample(
            t=frame.osd.fly_time, lat=lat, lon=lon, height=frame.osd.height, speed=frame.osd.h_speed,
            voltage=frame.battery.voltage, current=frame.battery.current, charge=frame.battery.charge_level,
            dist=dist, dl=frame.rc.downlink_signal, ul=frame.rc.uplink_signal, rec=bool(frame.camera.is_video),
            mode=int(mode) if mode is not None else None,
            temp=temperature if temperature != 0 and math.isfinite(temperature) else None,
            cell_dev=None if frame.battery.is_cell_voltage_estimated or not math.isfinite(frame.battery.cell_voltage_deviation)
            else frame.battery.cell_voltage_deviation,
            pitch=_tenth(frame.osd.pitch), roll=_tenth(frame.osd.roll), yaw=_tenth(frame.osd.yaw)))
    positions = [(s.lat, s.lon) for s in samples if s.lat is not None]
    first_lat, first_lon = positions[0] if positions else (None, None)
    battery_sn = _clean_serial(details.battery_sn or next((f.recover.battery_sn for f in frames if f.recover.battery_sn), ""))
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
        drone_serial=_clean_serial(details.aircraft_sn),
        battery_serial=battery_sn,
        battery=_battery_summary(frames),
        samples=downsample(samples),
        keychains_json=keychains_json,
        extras=compute_extras(frames, frames[-1].osd.cumulative_distance),
    )


def flight_from_details(details, sha256: str, log_version: int) -> ParsedFlight:
    """Fallback für alte Logs ohne lesbare Datenpunkte: nur die Zusammenfassung aus dem Kopf (keine Zeitreihe)."""
    if not details.total_time or details.total_time <= 0:
        raise ParseError("Keine Datenpunkte in der Logdatei.")
    distance = float(details.total_distance or 0.0)
    plausible_max = max(details.max_horizontal_speed, 1.0) * details.total_time * 1.2
    if distance > plausible_max and distance / 1000 <= plausible_max:
        distance /= 1000  # alte Logs speichern die Strecke teils in tausendfacher Einheit
    has_position = bool(details.latitude or details.longitude)
    lat, lon = _position(details.latitude, details.longitude) if has_position else (None, None)
    start = details.start_time if details.start_time.tzinfo else details.start_time.replace(tzinfo=UTC)
    return ParsedFlight(
        sha256=sha256, log_version=log_version, start=start, duration_s=float(details.total_time), distance_m=distance,
        max_height_m=float(details.max_height), max_speed_ms=float(details.max_horizontal_speed), start_lat=lat, start_lon=lon,
        drone_model=details.aircraft_name or "", drone_serial=_clean_serial(details.aircraft_sn),
        battery_serial=_clean_serial(details.battery_sn),
        battery=BatterySummary(0, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0, None, None), samples=(), keychains_json="",
    )


def parse_log(data: bytes, sha256: str, api_key: str | None, stored_keychains: str | None = None,
              allow_fetch: bool = True) -> ParsedFlight:
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
            if not allow_fetch:
                raise KeyServiceError("DJI-Schlüsseldienst vorübergehend pausiert.")
            try:
                keychains = log.fetch_keychains(api_key, cache=False)
            except ApiKeyError as err:
                raise DecryptError("DJI-API-Key ungültig.") from err
            except ApiError as err:
                text = str(err)
                match = re.search(r"returned status (\d{3})", text)
                specific = text.startswith("DJI API error:") or (
                    match is not None and match.group(1).startswith("4") and match.group(1) not in ("403", "429"))
                if specific:
                    raise KeyRejectedError(f"DJI lehnt die Schlüsselanfrage ab ({text[:100]}).") from err
                raise KeyServiceError(f"DJI-Schlüsseldienst nicht erreichbar ({text[:100]}).") from err
            except (ValueError, OSError) as err:
                raise KeyServiceError(f"DJI-Schlüsseldienst nicht erreichbar ({type(err).__name__}).") from err
            keychains_json = serialize_keychains(keychains)
        else:
            raise KeyRequiredError("DJI-Key fehlt.")
    try:
        frames = log.frames(keychains)
    except Exception as err:
        raise ParseError("Logdatei lässt sich nicht lesen (beschädigt oder unvollständig).") from err
    if not frames:
        return flight_from_details(log.details, sha256, log.version)
    return flight_from_frames(frames, log.details, sha256, log.version, keychains_json)
