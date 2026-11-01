"""FlightExtras aus den vollaufgelösten Frames (Definitionen identisch zur iOS-App, siehe FlightExtras.swift)."""

from __future__ import annotations

import math

from pydjirecord.utils import haversine_distance

from .models import EventKind, FlightEvent, FlightExtras

AIRBORNE_HEIGHT = 2.0
WEAK_SIGNAL_PERCENT = 30
MINIMUM_RUN_SECONDS = 3.0
MAXIMUM_STEP = 5.0
MIN_DISTANCE_FOR_WH_PER_KM = 200.0

_ORDER = {kind.value: index for index, kind in enumerate(EventKind)}


def _flight_action(frame) -> int:
    action = frame.osd.flight_action
    return int(action) if action is not None else 0


def _airborne(frame) -> bool:
    height = frame.osd.height
    return math.isfinite(height) and height > AIRBORNE_HEIGHT


def compute_extras(frames, distance_m: float) -> FlightExtras:
    if not frames:
        return FlightExtras()
    t = [f.osd.fly_time for f in frames]

    def step(i: int) -> float:
        """Zeitschritt nach Frame i (nur plausible Vorwärtsschritte zählen)."""
        if i + 1 >= len(frames):
            return 0.0
        dt = t[i + 1] - t[i]
        return dt if math.isfinite(dt) and 0 < dt <= MAXIMUM_STEP else 0.0

    energy = weak_s = max_distance = max_descent = max_climb = 0.0
    downlink_min: int | None = None
    uplink_min: int | None = None
    origin: tuple[float, float] | None = None
    for i, f in enumerate(frames):
        power = f.battery.voltage * abs(f.battery.current)
        if math.isfinite(power):
            energy += power * step(i) / 3600
        dl, ul = f.rc.downlink_signal, f.rc.uplink_signal
        if dl is not None:
            downlink_min = dl if downlink_min is None else min(downlink_min, dl)
            if _airborne(f) and dl < WEAK_SIGNAL_PERCENT:
                weak_s += step(i)
        if ul is not None:
            uplink_min = ul if uplink_min is None else min(uplink_min, ul)
        lat, lon = f.osd.latitude, f.osd.longitude
        if math.isfinite(lat) and math.isfinite(lon) and (lat != 0 or lon != 0):
            if origin is not None:
                max_distance = max(max_distance, haversine_distance(origin[0], origin[1], lat, lon))
            else:
                origin = (lat, lon)
        z = f.osd.z_speed  # positiv = Sinken
        if math.isfinite(z):
            max_descent = max(max_descent, z)
            max_climb = max(max_climb, -z)
    wh_per_km = None
    if math.isfinite(distance_m) and distance_m > MIN_DISTANCE_FOR_WH_PER_KM and math.isfinite(energy):
        wh_per_km = energy / (distance_m / 1000)

    # Kamera: steigende Flanken der Foto-Flagge, Summe der Maxima je zusammenhängendem Videoabschnitt
    photos, video_s, segment_max = 0, 0.0, 0
    previous_photo = in_video = False
    for f in frames:
        if f.camera.is_photo and not previous_photo:
            photos += 1
        previous_photo = f.camera.is_photo
        if f.camera.is_video:
            segment_max = max(segment_max, f.camera.record_time)
            in_video = True
        elif in_video:
            video_s += segment_max
            segment_max, in_video = 0, False
    if in_video:
        video_s += segment_max

    def runs(condition) -> list[tuple[int, int]]:
        result, begin = [], None
        for i, f in enumerate(frames):
            if condition(f):
                if begin is None:
                    begin = i
            elif begin is not None:
                result.append((begin, i - 1))
                begin = None
        if begin is not None:
            result.append((begin, len(frames) - 1))
        return result

    events: list[FlightEvent] = []

    def add(kind: EventKind, condition, min_duration: float = 0.0, level: bool = False) -> None:
        for start, end in runs(condition):
            end_t = t[end + 1] if end + 1 < len(frames) else t[end]
            d = end_t - t[start]
            d = max(0.0, d) if math.isfinite(d) else 0.0
            if d < min_duration or not math.isfinite(t[start]):
                continue
            value = float(max(frames[k].osd.voltage_warning for k in range(start, end + 1))) if level else d
            events.append(FlightEvent(t=t[start], kind=kind.value, value=value))

    add(EventKind.BATTERY_GO_HOME, lambda f: _flight_action(f) == 3)
    add(EventKind.SIGNAL_LOSS_GO_HOME, lambda f: _flight_action(f) == 15)
    add(EventKind.MANUAL_GO_HOME, lambda f: _flight_action(f) == 8)
    add(EventKind.VOLTAGE_WARNING, lambda f: f.osd.voltage_warning > 0, level=True)
    add(EventKind.PROPELLER_CATAPULT, lambda f: f.osd.is_propeller_catapult)
    add(EventKind.LOW_GPS, lambda f: _airborne(f) and f.osd.gps_level < 3, min_duration=MINIMUM_RUN_SECONDS)
    add(EventKind.WEAK_SIGNAL,
        lambda f: _airborne(f) and f.rc.downlink_signal is not None and f.rc.downlink_signal < WEAK_SIGNAL_PERCENT,
        min_duration=MINIMUM_RUN_SECONDS)
    events.sort(key=lambda e: (e.t, _ORDER[e.kind]))

    return FlightExtras(
        events=tuple(events), energy_wh=energy, wh_per_km=wh_per_km, max_distance_from_start_m=max_distance,
        downlink_min=downlink_min, uplink_min=uplink_min, weak_signal_s=weak_s, photo_count=photos, video_s=video_s,
        max_descent_ms=max_descent, max_climb_ms=max_climb)
