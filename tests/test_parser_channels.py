import math

import pytest
from pydjirecord import Frame
from pydjirecord.frame.battery import FrameBattery
from pydjirecord.frame.camera import FrameCamera
from pydjirecord.frame.custom import FrameCustom
from pydjirecord.frame.osd import FrameOSD
from pydjirecord.frame.rc import FrameRC
from pydjirecord.frame.recover import FrameRecover
from pydjirecord.record.osd import FlightMode
from pydjirecord.utils import haversine_distance

from custom_components.dronelog.parser import flight_from_details, flight_from_frames
from tests.test_parser import SHA, START, details
from tests.test_resistance import load_frames


def fr(t, lat=47.0, lon=11.0, temp=0.0, dev=0.0, estimated=True, dl=None, ul=None, video=False, mode=None,
       pitch=0.0, roll=0.0, yaw=0.0, cum=0.0):
    return Frame(
        custom=FrameCustom(date_time=START),
        osd=FrameOSD(fly_time=t, latitude=lat, longitude=lon, height=10.0, h_speed=3.0, cumulative_distance=cum,
                     flyc_state=mode, pitch=pitch, roll=roll, yaw=yaw),
        battery=FrameBattery(charge_level=90, voltage=8.0, current=-3.0, temperature=temp, cell_voltage_deviation=dev,
                             is_cell_voltage_estimated=estimated),
        rc=FrameRC(downlink_signal=dl, uplink_signal=ul),
        camera=FrameCamera(is_video=video),
        recover=FrameRecover(aircraft_sn="DRONE1", battery_sn="BAT1"),
    )


def flight(frames):
    return flight_from_frames(frames, details(), SHA, 13, "{}")


def test_samples_carry_distance_from_start_and_signal_channels():
    f = flight([fr(0, lat=47.0, dl=90, ul=80), fr(2, lat=47.001, dl=40, ul=70, video=True, mode=FlightMode.GPS_ATTI),
                fr(4, lat=0.0, lon=0.0)])
    a, b, c = f.samples
    assert a.dist == 0.0 and (a.dl, a.ul, a.rec) == (90, 80, False) and a.mode is None
    assert b.dist == pytest.approx(haversine_distance(47.0, 11.0, 47.001, 11.0), abs=1e-6)
    assert (b.dl, b.ul, b.rec, b.mode) == (40, 70, True, 6)
    assert c.lat is None and c.dist is None and c.dl is None


def test_temperature_zero_is_none_and_estimated_cells_have_no_deviation():
    f = flight([fr(0, temp=21.4, dev=0.012, estimated=False), fr(3, temp=0.0, dev=0.0, estimated=True),
                fr(6, temp=-3.5, dev=0.0, estimated=False)])
    assert f.samples[0].temp == pytest.approx(21.4) and f.samples[0].cell_dev == pytest.approx(0.012)
    assert f.samples[1].temp is None and f.samples[1].cell_dev is None
    assert f.samples[2].temp == -3.5 and f.samples[2].cell_dev == 0.0  # Minusgrade bleiben; echte Zellen ohne Abweichung = 0


def test_attitude_is_rounded_to_a_tenth_degree():
    f = flight([fr(0, pitch=-3.04, roll=1.26, yaw=181.5), fr(3, pitch=-0.05, roll=0.04, yaw=math.nan)])
    assert (f.samples[0].pitch, f.samples[0].roll, f.samples[0].yaw) == (-3.0, 1.3, 181.5)
    assert f.samples[1].pitch == -0.1  # Halbwerte weg von Null wie in Swift
    assert f.samples[1].roll == 0.0
    assert f.samples[1].yaw is None  # NaN gelangt nie in die Zeitreihe


def test_flight_has_extras_and_resistance_in_battery_summary():
    frames = [Frame(custom=FrameCustom(date_time=START), osd=FrameOSD(fly_time=fl.osd.fly_time, latitude=47.0, longitude=11.0),
                    battery=fl.battery, recover=FrameRecover(aircraft_sn="DRONE1", battery_sn="BAT1"))
              for fl in load_frames(400, 0.050)]
    f = flight(frames)
    assert f.extras is not None and f.extras.energy_wh > 0
    assert f.battery.internal_resistance_mohm == pytest.approx(50.0, abs=1.0)


def test_extras_events_are_computed_on_full_resolution_frames_not_samples():
    frames = [fr(i * 0.5, dl=10) for i in range(40)]  # 20 s schwaches Signal in 0,5-s-Frames, am Ende downsampled
    f = flight(frames)
    assert len(f.samples) < len(frames)
    assert f.extras.weak_signal_s == pytest.approx(19.5)


def test_header_fallback_has_no_extras():
    f = flight_from_details(details(total_distance=500.0, total_time=60.0, max_speed=5.0, max_height=20.0, lat=47.0, lon=11.0),
                            SHA, 6)
    assert f.extras is None and f.battery.internal_resistance_mohm is None


def test_out_of_range_coordinates_are_no_position():
    f = flight([fr(0, lat=95.0, lon=11.0), fr(3, lat=47.0, lon=200.0), fr(6, lat=47.0, lon=11.0)])
    assert [s.lat for s in f.samples] == [None, None, 47.0]
    assert f.start_lat == 47.0
