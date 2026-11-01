import math

import pytest
from pydjirecord import Frame
from pydjirecord.frame.battery import FrameBattery
from pydjirecord.frame.camera import FrameCamera
from pydjirecord.frame.osd import FrameOSD
from pydjirecord.frame.rc import FrameRC
from pydjirecord.utils import haversine_distance

from custom_components.dronelog.extras import compute_extras
from custom_components.dronelog.models import FlightExtras


def fr(t, height=10.0, action=0, vw=0, cat=False, gps=5, dl=None, ul=None, v=15.0, i=-2.0, z=0.0, photo=False, video=False,
       rt=0, lat=47.0, lon=11.0):
    return Frame(
        osd=FrameOSD(fly_time=t, height=height, flight_action=action, voltage_warning=vw, is_propeller_catapult=cat,
                     gps_level=gps, z_speed=z, latitude=lat, longitude=lon),
        battery=FrameBattery(voltage=v, current=i),
        rc=FrameRC(downlink_signal=dl, uplink_signal=ul),
        camera=FrameCamera(is_photo=photo, is_video=video, record_time=rt),
    )


def kinds(e):
    return [ev.kind for ev in e.events]


def test_empty_frames_give_empty_extras():
    assert compute_extras([], 0) == FlightExtras()


def test_energy_integrates_power_over_time():
    frames = [fr(0), fr(3), fr(6)]
    e = compute_extras(frames, 1000)
    assert e.energy_wh == pytest.approx(30.0 * 6 / 3600, abs=1e-12)
    assert e.wh_per_km == pytest.approx(e.energy_wh / 1.0, abs=1e-12)
    assert compute_extras(frames, 150).wh_per_km is None  # nur bei > 200 m
    assert compute_extras(frames, 200).wh_per_km is None


def test_energy_ignores_backward_jumps_long_gaps_and_nan():
    frames = [fr(0), fr(100), fr(5), fr(8, v=math.nan), fr(10)]
    e = compute_extras(frames, 1000)
    assert e.energy_wh == pytest.approx(30.0 * 3 / 3600, abs=1e-12)
    assert math.isfinite(e.energy_wh)


def test_go_home_and_warning_events():
    frames = []
    for t in range(12):
        action = 3 if 3 <= t <= 5 else (15 if t == 8 else (8 if t == 10 else 0))
        frames.append(fr(float(t), action=action, vw=1 if t in (6, 7) else 0, cat=t == 1))
    e = compute_extras(frames, 100)
    assert kinds(e) == ["propellerCatapult", "batteryGoHome", "voltageWarning", "signalLossGoHome", "manualGoHome"]
    assert e.events[1].t == 3
    assert e.events[1].value == pytest.approx(3)  # Abschnitt 3..5 -> Dauer bis zum ersten Folgeframe (6)
    assert e.events[2].t == 6
    assert e.events[2].value == 1  # Stufe


def test_normal_landing_action_is_no_event():
    assert compute_extras([fr(float(t), action=27) for t in range(6)], 10).events == ()


def test_low_gps_needs_three_seconds_and_being_airborne():
    frames = []
    for t in range(20):
        on_ground = t < 4
        low = t < 8 or t in (14, 15)
        frames.append(fr(float(t), height=0.0 if on_ground else 20.0, gps=2 if low else 5))
    e = compute_extras(frames, 100)
    low = [ev for ev in e.events if ev.kind == "lowGPS"]
    assert len(low) == 1
    assert low[0].t == 4 and low[0].value == pytest.approx(4)


def test_weak_signal_event_and_minima():
    frames = [fr(float(t), dl=10 if 3 <= t <= 7 else 80, ul=90 - t) for t in range(12)]
    e = compute_extras(frames, 100)
    assert e.downlink_min == 10 and e.uplink_min == 79
    assert e.weak_signal_s == pytest.approx(5)
    weak = next(ev for ev in e.events if ev.kind == "weakSignal")
    assert weak.t == 3 and weak.value == pytest.approx(5)
    assert compute_extras([fr(0), fr(1)], 1).downlink_min is None  # keine Funk-Records


def test_camera_counters():
    frames = [fr(0, photo=True), fr(1), fr(2, photo=True), fr(3, photo=True), fr(4, video=True, rt=5),
              fr(5, video=True, rt=6), fr(6), fr(7, video=True, rt=3)]
    e = compute_extras(frames, 100)
    assert e.photo_count == 2  # steigende Flanken
    assert e.video_s == 6 + 3  # zwei Abschnitte


def test_climb_descent_and_distance_from_start():
    frames = [fr(0, z=0, lat=47.0), fr(1, z=3.2, lat=47.001), fr(2, z=-2.0, lat=47.002)]
    e = compute_extras(frames, 100)
    assert e.max_descent_ms == pytest.approx(3.2)
    assert e.max_climb_ms == pytest.approx(2.0)
    assert e.max_distance_from_start_m == pytest.approx(haversine_distance(47.0, 11.0, 47.002, 11.0), abs=1e-6)


def test_no_position_means_zero_distance():
    assert compute_extras([fr(0, lat=0.0, lon=0.0), fr(1, lat=0.0, lon=0.0)], 0).max_distance_from_start_m == 0


def test_non_finite_values_never_escape():
    frames = [fr(0, z=math.nan), fr(1, z=math.inf, lat=math.nan), fr(2, v=math.inf, i=math.nan)]
    e = compute_extras(frames, math.nan)
    assert all(math.isfinite(x) for x in (e.energy_wh, e.max_climb_ms, e.max_descent_ms, e.max_distance_from_start_m))
    assert e.wh_per_km is None


def test_flight_action_none_is_tolerated():
    f = fr(0)
    f.osd.flight_action = None
    assert compute_extras([f, fr(1)], 10).events == ()


def test_events_sorted_by_time_then_kind_order():
    frames = [fr(0, action=8, cat=True), fr(1)]
    assert kinds(compute_extras(frames, 10)) == ["manualGoHome", "propellerCatapult"]
