from dataclasses import replace
from datetime import UTC, datetime
from zoneinfo import ZoneInfo

import pytest

from custom_components.dronelog.db import FlightStore
from custom_components.dronelog.flightbook import build_flightbook
from custom_components.dronelog.models import FlightHeader
from custom_components.dronelog.notes import FlightNote
from tests.factories import make_flight
from tests.test_websocket_api import add, call

BERLIN = ZoneInfo("Europe/Berlin")


def d(y, m, day, h, mi):
    return datetime(y, m, day, h, mi, tzinfo=UTC)


def fl(sha, start, dur=720.0, drone="D1", model="Mini", battery="B1", lat=47.25, lon=11.5):
    f = make_flight(sha=sha * 64, start=start, duration=dur, distance=1500.0, drone=drone, battery=battery, lat=lat or 0.0, lon=lon or 0.0, samples=())
    return replace(f, drone_model=model, start_lat=lat, start_lon=lon)


@pytest.fixture
def store(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(fl("c", d(2026, 3, 9, 15, 0), drone="D2", model="Avata", battery="B2", lat=None, lon=None), None, "c")
    s.add_flight(fl("a", d(2025, 12, 31, 9, 30)), None, "a")
    s.add_flight(fl("b", d(2026, 1, 5, 14, 5), dur=1260.0), None, "b")
    return s


def book(store, names=None, notes=None, tz=UTC, **filters):
    entries = store.flightbook_entries(**filters, tz=tz)
    return build_flightbook(entries, names or {}, notes or {}, tz)


def test_entries_oldest_first_with_start_and_end(store):
    e = store.flightbook_entries()
    assert [x.sha256[0] for x in e] == ["a", "b", "c"]
    assert (e[1].end - e[1].start).total_seconds() == 1260 and e[0].drone_model == "Mini"


def test_entries_filter_by_drone_battery_and_year(store):
    assert [x.sha256[0] for x in store.flightbook_entries(drone="D2")] == ["c"]
    assert [x.sha256[0] for x in store.flightbook_entries(battery="B1")] == ["a", "b"]
    assert [x.sha256[0] for x in store.flightbook_entries(year=2026)] == ["b", "c"]
    assert [x.sha256[0] for x in store.flightbook_entries(year=2025, tz=UTC)] == ["a"]


def test_year_filter_uses_local_time(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(fl("a", d(2025, 12, 31, 23, 30)), None, "a")
    assert len(s.flightbook_entries(year=2026, tz=BERLIN)) == 1 and len(s.flightbook_entries(year=2026, tz=UTC)) == 0


def test_rows_show_date_time_range_place_drone_and_note(store):
    entries = store.flightbook_entries()
    key = entries[0].place_key
    notes = {entries[0].sha256: FlightNote(text="Propellertest", tags=["Test", "Alpen"])}
    rows = build_flightbook(entries, {key: "Wiese am See"}, notes, UTC)["rows"]
    assert (rows[0]["nr"], rows[0]["date"], rows[0]["time"]) == (1, "2025-12-31", "09:30–09:42")
    assert rows[0]["place"] == {"key": key, "name": "Wiese am See", "lat": 47.25, "lon": 11.5, "label": "Wiese am See"}
    assert rows[0]["drone_label"] == "Mini …D1" and rows[0]["battery_label"] == "…B1"
    assert rows[0]["duration_s"] == 720 and rows[0]["distance_m"] == 1500
    assert rows[0]["note"] == "Propellertest #Test #Alpen" and rows[0]["note_text"] == "Propellertest" and rows[0]["tags"] == ["Test", "Alpen"]
    assert rows[1]["place"]["label"] == "Wiese am See"                          # gleicher Startort, gleicher Name
    plain = build_flightbook(entries, {}, {}, UTC)["rows"]
    assert plain[1]["place"]["label"] == "47.250, 11.500" and plain[1]["place"]["name"] is None
    assert plain[2]["place"] is None and plain[2]["note"] == ""                  # ohne Position


def test_local_time_of_the_ha_zone(store):
    rows = build_flightbook(store.flightbook_entries(), {}, {}, BERLIN)["rows"]
    assert (rows[0]["date"], rows[0]["time"]) == ("2025-12-31", "10:30–10:42")      # Winterzeit UTC+1


def test_summary_totals(store):
    summary = book(store)["summary"]
    assert summary == {"flights": 3, "duration_s": 720 + 1260 + 720, "distance_m": 4500}


def test_midnight_crossing_flights_show_the_end_day(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(fl("x", d(2026, 1, 1, 23, 55), dur=900.0), None, "x")
    row = book(s)["rows"][0]
    assert row["time"] == "23:55–00:10 (+1)" and row["day_offset"] == 1


def test_midnight_is_judged_in_local_time(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(fl("x", d(2026, 1, 1, 22, 55), dur=900.0), None, "x")          # Berlin: 23:55 - 00:10
    assert book(s, tz=BERLIN)["rows"][0]["time"] == "23:55–00:10 (+1)"
    assert book(s, tz=UTC)["rows"][0]["time"] == "22:55–23:10"


def test_corrupt_values_and_unknown_serials(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(fl("x", d(2026, 1, 1, 8, 0), dur=3 * 86_400.0, drone="unbekannt", model="", battery=""), None, "x")
    row = book(s)["rows"][0]
    assert row["duration_s"] == 0 and row["drone_label"] == "unbekannt" and row["battery_label"] is None


def test_header_dataclass_is_used_for_entries(store):
    assert isinstance(store.flight_headers()[0], FlightHeader)


async def test_ws_flightbook(hass, hass_ws_client, setup_dronelog):
    await hass.config.async_set_time_zone("Europe/Berlin")
    await add(hass, fl("a", d(2025, 12, 31, 9, 30)), fl("b", d(2026, 1, 5, 14, 5), dur=1260.0), fl("c", d(2026, 3, 9, 15, 0), drone="D2", battery="B2"))
    client = await hass_ws_client(hass)
    await call(client, "note_set", flight_id=1, text="Hallo", tags="A")
    result = (await call(client, "flightbook"))["result"]
    assert [r["flight_id"] for r in result["rows"]] == [1, 2, 3]
    assert result["rows"][0]["time"] == "10:30–10:42" and result["rows"][0]["note"] == "Hallo #A"
    assert result["summary"]["flights"] == 3
    assert result["rows"][0]["start"].startswith("2025-12-31T09:30") and result["rows"][0]["end"].startswith("2025-12-31T09:42")
    assert [r["flight_id"] for r in (await call(client, "flightbook", year=2026))["result"]["rows"]] == [2, 3]
    assert [r["flight_id"] for r in (await call(client, "flightbook", drone="D2"))["result"]["rows"]] == [3]
    assert [r["flight_id"] for r in (await call(client, "flightbook", battery="B1", year=2025))["result"]["rows"]] == [1]
