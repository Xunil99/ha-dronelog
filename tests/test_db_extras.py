import dataclasses
import json
import sqlite3

import pytest

from custom_components.dronelog.db import ANALYSIS_VERSION, SCHEMA_VERSION, FlightStore
from custom_components.dronelog.models import FlightEvent, FlightExtras, Sample, WeatherSummary
from tests.factories import later, make_battery, make_flight
from tests.test_db_migration import make_v1_db

WEATHER = WeatherSummary(9.0, 3.0, None, 6.0, 220.0, 0.0, 40, "open-meteo")

EXTRAS = FlightExtras(events=(FlightEvent(5.0, "weakSignal", 4.0), FlightEvent(9.0, "manualGoHome", 2.0)), energy_wh=12.5,
                      wh_per_km=8.0, max_distance_from_start_m=300.0, downlink_min=12, uplink_min=60, weak_signal_s=4.0,
                      photo_count=2, video_s=33.0, max_descent_ms=3.5, max_climb_ms=2.0)


def rich_samples():
    return tuple(Sample(t=float(i * 2), lat=48.75 + i * 1e-5, lon=12.4, height=10.0, speed=1.0, voltage=8.0, current=-3.0,
                        charge=90 - i, dist=float(i), dl=80 - i, ul=70, rec=bool(i % 2), mode=6, temp=25.5, cell_dev=0.012,
                        pitch=-3.0, roll=1.3, yaw=181.5) for i in range(4))


def test_schema_version_and_analysis_version_constants():
    assert SCHEMA_VERSION == 3 and ANALYSIS_VERSION == 4


def test_new_database_has_new_columns(tmp_path):
    FlightStore(tmp_path / "n.db")
    with sqlite3.connect(tmp_path / "n.db") as conn:
        assert conn.execute("PRAGMA user_version").fetchone()[0] == SCHEMA_VERSION
        flights = {r[1] for r in conn.execute("PRAGMA table_info(flights)")}
        samples = {r[1] for r in conn.execute("PRAGMA table_info(samples)")}
    assert {"extras_json", "analysis_version"} <= flights
    assert {"dist", "dl", "ul", "rec", "mode", "temp", "cell_dev", "pitch", "roll", "yaw"} <= samples


def test_flight_roundtrip_with_channels_extras_and_resistance(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    battery = dataclasses.replace(make_battery(), internal_resistance_mohm=52.5)
    flight_id = store.add_flight(dataclasses.replace(make_flight(samples=rich_samples(), battery_summary=battery), extras=EXTRAS), None, "a")
    detail = store.get_flight(flight_id)
    assert detail.samples == rich_samples()
    assert detail.samples[1].rec is True and detail.samples[0].rec is False
    assert detail.extras == EXTRAS
    assert detail.battery.internal_resistance_mohm == 52.5
    assert detail.analysis_version == ANALYSIS_VERSION
    assert store.battery_history("BAT1")[0].internal_resistance_mohm == 52.5


def test_flight_without_extras_and_plain_samples(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    flight_id = store.add_flight(make_flight(), None, "a")
    detail = store.get_flight(flight_id)
    assert detail.extras is None
    assert detail.samples[0].dist is None and detail.samples[0].rec is None and detail.samples[0].pitch is None


def test_migration_from_v1_adds_columns_and_marks_flights_outdated(tmp_path):
    path = tmp_path / "d.db"
    make_v1_db(path)
    store = FlightStore(path)
    assert store.totals().flights == 3
    assert sorted(store.shas_needing_reanalysis()) == ["a", "b", "c"]
    detail = store.get_flight(1)
    assert detail.extras is None and detail.analysis_version == 1
    assert detail.samples[0].dist is None and len(detail.samples) == 3


def test_migration_from_v2_database(tmp_path):
    path = tmp_path / "d.db"
    make_v1_db(path)
    with sqlite3.connect(path) as conn:
        conn.execute("ALTER TABLE flights ADD COLUMN end_lat REAL")
        conn.execute("ALTER TABLE flights ADD COLUMN end_lon REAL")
        conn.execute("PRAGMA user_version = 2")
    store = FlightStore(path)
    assert store.totals().flights == 3
    with sqlite3.connect(path) as conn:
        assert conn.execute("PRAGMA user_version").fetchone()[0] == SCHEMA_VERSION
    FlightStore(path)  # idempotent


def test_old_battery_json_without_resistance_still_loads(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    flight_id = store.add_flight(make_flight(), None, "a")
    legacy = {k: v for k, v in dataclasses.asdict(make_battery()).items()}
    with sqlite3.connect(tmp_path / "d.db") as conn:
        conn.execute("UPDATE flights SET battery_json=?", (json.dumps(legacy),))
    assert store.get_flight(flight_id).battery.internal_resistance_mohm is None
    assert store.battery_history("BAT1")[0].internal_resistance_mohm is None


def test_shas_needing_reanalysis_and_replace_flight(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    sha = "e" * 64
    flight_id = store.add_flight(make_flight(sha=sha), WEATHER, "Quelle.txt")
    with sqlite3.connect(tmp_path / "d.db") as conn:
        conn.execute("UPDATE flights SET analysis_version=1")
    assert store.shas_needing_reanalysis() == [sha]
    new = dataclasses.replace(make_flight(sha=sha, samples=rich_samples()), extras=EXTRAS,
                              battery=dataclasses.replace(make_battery(), internal_resistance_mohm=48.0))
    assert store.replace_flight(new) is True
    detail = store.get_flight(flight_id)
    assert detail.row.id == flight_id and detail.samples == rich_samples() and detail.extras == EXTRAS
    assert detail.weather == WEATHER and detail.row.source_name == "Quelle.txt"
    assert detail.battery.internal_resistance_mohm == 48.0 and detail.analysis_version == ANALYSIS_VERSION
    assert store.shas_needing_reanalysis() == []
    assert store.totals().flights == 1


def test_replace_flight_unknown_sha_is_noop(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    assert store.replace_flight(make_flight()) is False


def test_replace_flight_failure_keeps_old_flight(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    flight_id = store.add_flight(make_flight(), None, "a")
    with sqlite3.connect(tmp_path / "d.db") as conn:
        conn.execute("UPDATE flights SET analysis_version=1")
    duplicate = (Sample(t=1.0, lat=1.0, lon=2.0, height=0, speed=0, voltage=8, current=1, charge=90),) * 2
    with pytest.raises(sqlite3.IntegrityError):
        store.replace_flight(make_flight(samples=duplicate))
    detail = store.get_flight(flight_id)
    assert len(detail.samples) == 5 and detail.analysis_version == 1


def test_mark_reanalyzed_without_frames_clears_outdated_flag(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    store.add_flight(make_flight(), None, "a")
    with sqlite3.connect(tmp_path / "d.db") as conn:
        conn.execute("UPDATE flights SET analysis_version=1")
    store.replace_flight(make_flight(samples=()))
    assert store.shas_needing_reanalysis() == []


def test_event_kinds_in_rows_and_only_events_filter(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    store.add_flight(make_flight(sha="1" * 64, start=later(0)), None, "a")
    with_events = dataclasses.replace(make_flight(sha="2" * 64, start=later(1)), extras=EXTRAS)
    store.add_flight(with_events, None, "b")
    quiet = dataclasses.replace(make_flight(sha="3" * 64, start=later(2)), extras=FlightExtras(photo_count=4, video_s=9.0))
    store.add_flight(quiet, None, "c")
    rows = {r.sha256[0]: r for r in store.list_flights()}
    assert rows["1"].event_kinds == () and rows["2"].event_kinds == ("weakSignal", "manualGoHome")
    assert rows["3"].photo_count == 4 and rows["3"].video_s == 9.0
    assert [r.sha256[0] for r in store.list_flights(only_events=True)] == ["2"]
    assert store.count_flights(only_events=True) == 1 and store.count_flights() == 3


def test_replace_flight_updates_header_fields(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    sha = "f" * 64
    flight_id = store.add_flight(make_flight(sha=sha), WEATHER, "Quelle.txt")
    samples = (Sample(t=0.0, lat=49.0, lon=11.0, height=1, speed=1, voltage=8, current=1, charge=90),
               Sample(t=2.0, lat=49.5, lon=11.5, height=2, speed=2, voltage=8, current=1, charge=89))
    new = dataclasses.replace(make_flight(sha=sha, samples=samples, drone="DRONE2", battery="BAT2", lat=49.0, lon=11.0,
                                          duration=777.0, distance=999.0, start=later(3)), max_height_m=88.0, max_speed_ms=21.0)
    assert store.replace_flight(new) is True
    detail = store.get_flight(flight_id)
    assert detail.row.start == later(3) and detail.row.duration_s == 777.0 and detail.row.distance_m == 999.0
    assert detail.row.max_height_m == 88.0 and detail.row.max_speed_ms == 21.0
    assert (detail.start_lat, detail.start_lon, detail.end_lat, detail.end_lon) == (49.0, 11.0, 49.5, 11.5)
    assert detail.row.drone_serial == "DRONE2" and detail.row.battery_serial == "BAT2"
    assert detail.weather == WEATHER and detail.row.source_name == "Quelle.txt"
    assert [b.serial for b in store.overview().batteries] == ["BAT2"]


def test_replace_flight_invalid_coordinates_become_null(tmp_path):
    store = FlightStore(tmp_path / "d.db")
    sha = "f" * 64
    flight_id = store.add_flight(make_flight(sha=sha), None, "a")
    bad = dataclasses.replace(make_flight(sha=sha, samples=()), start_lat=95.0, start_lon=200.0)
    store.replace_flight(bad)
    detail = store.get_flight(flight_id)
    assert (detail.start_lat, detail.start_lon, detail.end_lat, detail.end_lon) == (None, None, None, None)
