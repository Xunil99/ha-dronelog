from datetime import UTC, datetime
from types import SimpleNamespace

import pytest
from pydjirecord import Frame
from pydjirecord.frame.battery import FrameBattery
from pydjirecord.frame.custom import FrameCustom
from pydjirecord.frame.osd import FrameOSD
from pydjirecord.frame.recover import FrameRecover
from pydjirecord.keychain import KeychainFeaturePoint

from custom_components.dronelog import parser
from custom_components.dronelog.models import Sample
from custom_components.dronelog.parser import (
    DecryptError,
    KeyRequiredError,
    KeyServiceError,
    ParseError,
    deserialize_keychains,
    downsample,
    flight_from_frames,
    parse_log,
    serialize_keychains,
)

SHA = "a" * 64
START = datetime(2026, 10, 27, 13, 11, 11, tzinfo=UTC)


def frame(t, lat=48.75, lon=12.4, height=10.0, speed=3.0, cum=0.0, volt=8.0, cur=5.0, charge=99,
          cell_dev=0.001, temp=25.0, with_time=True):
    return Frame(
        custom=FrameCustom(date_time=START if with_time else datetime(1970, 1, 1, tzinfo=UTC)),
        osd=FrameOSD(fly_time=t, latitude=lat, longitude=lon, height=height, h_speed=speed, cumulative_distance=cum),
        battery=FrameBattery(charge_level=charge, voltage=volt, current=cur, full_capacity=2800,
                             cell_voltage_deviation=cell_dev, temperature=temp, number_of_discharges=2,
                             lifetime_remaining=98),
        recover=FrameRecover(aircraft_sn="DRONE1", battery_sn="BAT1"),
    )


def details(total_distance=99999.0):
    return SimpleNamespace(aircraft_name="DJI Test", aircraft_sn="DRONE1", battery_sn="BAT1",
                           start_time=START, total_distance=total_distance, product_type=SimpleNamespace(name="X"))


class FakeLog:
    def __init__(self, version, frames_, details_=None, key_error=None):
        self.version = version
        self.details = details_ or details()
        self._frames = frames_
        self._key_error = key_error
        self.fetch_calls = 0

    def fetch_keychains(self, api_key, **kwargs):
        self.fetch_calls += 1
        if self._key_error:
            raise self._key_error
        return [[KeychainFeaturePoint(feature_point=1, aes_key="a", aes_iv="b")]]

    def frames(self, keychains=None):
        return self._frames


def patch_log(monkeypatch, fake):
    monkeypatch.setattr(parser.DJILog, "from_bytes", classmethod(lambda cls, data: fake))


def s(t, lat=1.0):
    return Sample(t=t, lat=lat, lon=2.0, height=1.0, speed=1.0, voltage=8.0, current=1.0, charge=90)


def test_downsample_keeps_first_and_last():
    result = downsample([s(0.0), s(0.1), s(0.2), s(2.5)])
    assert result[0].t == 0.0
    assert result[-1].t == 2.5


def test_downsample_step_two_seconds_reduces_10hz():
    samples = [s(i / 10) for i in range(0, 301)]  # 30 s mit 10 Hz
    result = downsample(samples, 2.0)
    assert 15 <= len(result) <= 17


def test_serialize_roundtrip_keychains():
    kc = [[KeychainFeaturePoint(feature_point=3, aes_key="k", aes_iv="i")], []]
    assert deserialize_keychains(serialize_keychains(kc)) == kc


def test_parse_log_garbage_raises_parse_error():
    with pytest.raises(ParseError):
        parse_log(b"das ist keine logdatei", SHA, api_key=None)


def test_parse_log_v13_without_key_raises_key_required(monkeypatch):
    patch_log(monkeypatch, FakeLog(13, []))
    with pytest.raises(KeyRequiredError):
        parse_log(b"x", SHA, api_key=None)


def test_parse_log_v13_with_stored_keychains_needs_no_key(monkeypatch):
    fake = FakeLog(13, [frame(0.0), frame(1.0, cum=5.0)])
    patch_log(monkeypatch, fake)
    stored = serialize_keychains([[KeychainFeaturePoint(feature_point=1, aes_key="a", aes_iv="b")]])
    flight = parse_log(b"x", SHA, api_key=None, stored_keychains=stored)
    assert flight.keychains_json == stored
    assert fake.fetch_calls == 0


def test_parse_log_invalid_key_raises_decrypt_error(monkeypatch):
    from pydjirecord.error import ApiKeyError

    patch_log(monkeypatch, FakeLog(14, [], key_error=ApiKeyError("Invalid DJI API key (403)")))
    with pytest.raises(DecryptError):
        parse_log(b"x", SHA, api_key="falsch")


def test_parse_log_dji_service_down_raises_key_service_error(monkeypatch):
    from pydjirecord.error import ApiError

    patch_log(monkeypatch, FakeLog(14, [], key_error=ApiError("Network error")))
    with pytest.raises(KeyServiceError):
        parse_log(b"x", SHA, api_key="k")


def test_parse_log_unencrypted_v6_needs_no_key(monkeypatch):
    patch_log(monkeypatch, FakeLog(6, [frame(0.0), frame(2.0, cum=10.0)]))
    flight = parse_log(b"x", SHA, api_key=None)
    assert flight.log_version == 6
    assert flight.keychains_json == ""


def test_flight_uses_last_frame_cumulative_distance_not_details():
    flight = flight_from_frames([frame(0.0), frame(5.0, cum=123.0)], details(total_distance=99999.0), SHA, 14, "")
    assert flight.distance_m == 123.0


def test_flight_summary_values():
    frames = [frame(0.0, height=0.0, speed=0.0), frame(5.0, height=40.7, speed=12.2, cum=50.0, volt=7.4, cur=14.1, charge=79)]
    flight = flight_from_frames(frames, details(), SHA, 14, "")
    assert flight.duration_s == 5.0
    assert flight.max_height_m == 40.7
    assert flight.max_speed_ms == 12.2
    assert flight.start == START
    assert (flight.drone_model, flight.drone_serial, flight.battery_serial) == ("DJI Test", "DRONE1", "BAT1")
    b = flight.battery
    assert (b.charge_start, b.charge_end) == (99, 79)
    assert b.min_voltage == 7.4 and b.peak_current_a == 14.1
    assert b.peak_power_w == pytest.approx(7.4 * 14.1)
    assert (b.cycles, b.health_pct) == (2, 98)


def test_flight_ignores_implausible_cell_deviation():
    frames = [frame(0.0, cell_dev=4.08), frame(1.0, cell_dev=0.002)]
    assert flight_from_frames(frames, details(), SHA, 14, "").battery.cell_deviation_max_v == 0.002


def test_flight_without_gps_fix_has_no_position():
    frames = [frame(0.0, lat=0.0, lon=0.0), frame(1.0, lat=0.0, lon=0.0)]
    flight = flight_from_frames(frames, details(), SHA, 14, "")
    assert flight.start_lat is None and flight.start_lon is None
    assert all(sample.lat is None for sample in flight.samples)


def test_flight_start_falls_back_to_details_when_frame_time_is_epoch():
    frames = [frame(0.0, with_time=False), frame(1.0, with_time=False)]
    assert flight_from_frames(frames, details(), SHA, 14, "").start == START


def test_downsample_never_duplicates_last_time():
    samples = [s(0.0), s(0.0), s(0.5), s(2.0), s(4.0), s(4.0), s(4.0)]  # fly_time bleibt nach der Landung stehen
    result = downsample(samples)
    times = [x.t for x in result]
    assert times == sorted(set(times))


def test_flight_on_ground_only_has_unique_sample_times():
    frames = [frame(0.0), frame(0.0), frame(0.0)]
    flight = flight_from_frames(frames, details(), SHA, 14, "")
    assert [x.t for x in flight.samples] == [0.0]


def test_battery_uses_absolute_current():
    frames = [frame(0.0, cur=-0.5), frame(1.0, cur=-14.2, volt=7.4)]
    battery = flight_from_frames(frames, details(), SHA, 13, "").battery
    assert battery.peak_current_a == 14.2
    assert battery.peak_power_w == pytest.approx(7.4 * 14.2)
    assert battery.avg_power_w > 0


def test_winter_temperatures_are_kept():
    frames = [frame(0.0, temp=-3.5), frame(1.0, temp=2.0)]
    battery = flight_from_frames(frames, details(), SHA, 14, "").battery
    assert (battery.temp_min_c, battery.temp_max_c) == (-3.5, 2.0)


def test_parse_log_non_json_dji_answer_is_service_error(monkeypatch):
    patch_log(monkeypatch, FakeLog(14, [], key_error=ValueError("Expecting value")))
    with pytest.raises(KeyServiceError):
        parse_log(b"x", SHA, api_key="k")


def test_parse_log_without_network_permission_needs_key_service(monkeypatch):
    fake = FakeLog(14, [frame(0.0)])
    patch_log(monkeypatch, fake)
    with pytest.raises(KeyServiceError):
        parse_log(b"x", SHA, api_key="k", allow_fetch=False)
    assert fake.fetch_calls == 0
