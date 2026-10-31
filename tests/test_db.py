import sqlite3
from datetime import UTC, datetime

import pytest

from custom_components.dronelog.db import FlightStore
from custom_components.dronelog.models import FileStatus, Sample, WeatherSummary
from tests.factories import later, make_battery, make_flight

WEATHER = WeatherSummary(temperature_c=9.0, wind_10m_ms=3.0, wind_80m_ms=5.0, gust_ms=6.0, wind_dir_deg=220.0,
                         precipitation_mm=0.0, cloud_cover_pct=40, source="open-meteo")


@pytest.fixture
def store(tmp_path):
    return FlightStore(tmp_path / "dronelog.db")


def test_add_flight_is_atomic_on_failure(store):
    duplicate_t = (Sample(t=1.0, lat=1.0, lon=2.0, height=0, speed=0, voltage=8, current=1, charge=90),) * 2
    with pytest.raises(sqlite3.IntegrityError):
        store.add_flight(make_flight(samples=duplicate_t), None, "x.txt")
    assert not store.has_flight("a" * 64)
    assert store.totals().flights == 0


def test_add_flight_same_sha_returns_same_id(store):
    first = store.add_flight(make_flight(), None, "x.txt")
    second = store.add_flight(make_flight(), WEATHER, "y.txt")
    assert first == second
    assert store.totals().flights == 1


def test_get_flight_returns_samples_weather_and_battery(store):
    flight_id = store.add_flight(make_flight(), WEATHER, "FlightRecord_x.txt")
    detail = store.get_flight(flight_id)
    assert detail.row.source_name == "FlightRecord_x.txt"
    assert len(detail.samples) == 5
    assert detail.weather == WEATHER
    assert detail.battery.charge_end == 79
    assert (detail.start_lat, detail.start_lon) == (48.75, 12.40)
    assert store.get_flight(9999) is None


def test_list_flights_filters_by_battery_and_since_newest_first(store):
    store.add_flight(make_flight(sha="1" * 64, start=later(0), battery="B1"), None, "a")
    store.add_flight(make_flight(sha="2" * 64, start=later(5), battery="B2"), None, "b")
    store.add_flight(make_flight(sha="3" * 64, start=later(9), battery="B1"), None, "c")
    assert [r.sha256[0] for r in store.list_flights()] == ["3", "2", "1"]
    assert [r.sha256[0] for r in store.list_flights(battery="B1")] == ["3", "1"]
    assert [r.sha256[0] for r in store.list_flights(since=later(4))] == ["3", "2"]
    assert len(store.list_flights(limit=1, offset=1)) == 1


def test_totals_sums_duration_distance_count(store):
    store.add_flight(make_flight(sha="1" * 64, start=later(0), duration=100, distance=1000), None, "a")
    store.add_flight(make_flight(sha="2" * 64, start=later(1), duration=200, distance=500), None, "b")
    totals = store.totals()
    assert (totals.flights, totals.duration_s, totals.distance_m) == (2, 300, 1500)
    assert totals.last_flight.sha256 == "2" * 64


def test_totals_empty_store(store):
    totals = store.totals()
    assert (totals.flights, totals.duration_s, totals.last_flight) == (0, 0, None)


def test_battery_history_is_ordered_by_start(store):
    store.add_flight(make_flight(sha="2" * 64, start=later(2), battery_summary=make_battery(cycles=5)), None, "b")
    store.add_flight(make_flight(sha="1" * 64, start=later(1), battery_summary=make_battery(cycles=4)), None, "a")
    store.add_flight(make_flight(sha="3" * 64, start=later(3), battery="OTHER"), None, "c")
    assert [p.cycles for p in store.battery_history("BAT1")] == [4, 5]


def test_heat_cells_group_flights_within_raster(store):
    store.add_flight(make_flight(sha="1" * 64, lat=48.7500, lon=12.4000), None, "a")
    store.add_flight(make_flight(sha="2" * 64, lat=48.7501, lon=12.4001), None, "b")
    store.add_flight(make_flight(sha="3" * 64, lat=49.5, lon=13.0), None, "c")
    cells = sorted(store.heat_cells(300), key=lambda c: -c.count)
    assert [c.count for c in cells] == [2, 1]


def test_flights_without_position_are_not_in_heatmap(store):
    store.add_flight(make_flight(lat=None, lon=None, samples=()), None, "a")
    assert store.heat_cells() == []


def test_file_status_roundtrip(store):
    assert store.file_status("x") is None
    store.set_file_status("x", FileStatus.ERROR, "kaputt")
    assert store.file_status("x") == (FileStatus.ERROR, "kaputt")
    store.set_file_status("x", FileStatus.PROCESSED)
    assert store.file_status("x") == (FileStatus.PROCESSED, "")
    assert store.files_with_status(FileStatus.PROCESSED) == ["x"]


def test_stored_keychains_returned_by_sha(store):
    store.add_flight(make_flight(keychains='[["k"]]'), None, "a")
    assert store.stored_keychains("a" * 64) == '[["k"]]'
    assert store.stored_keychains("b" * 64) is None


def test_delete_flight_removes_samples(store, tmp_path):
    flight_id = store.add_flight(make_flight(), None, "a")
    store.delete_flight(flight_id)
    assert store.get_flight(flight_id) is None
    with sqlite3.connect(tmp_path / "dronelog.db") as conn:
        assert conn.execute("select count(*) from samples").fetchone()[0] == 0


def test_store_survives_reopen(tmp_path):
    FlightStore(tmp_path / "d.db").add_flight(make_flight(), None, "a")
    assert FlightStore(tmp_path / "d.db").totals().flights == 1
