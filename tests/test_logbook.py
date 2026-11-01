from datetime import UTC, datetime
from zoneinfo import ZoneInfo

import pytest

from custom_components.dronelog.db import FlightStore
from custom_components.dronelog.notes import FlightNote, parse_tags
from tests.factories import make_flight
from tests.test_websocket_api import add, call

BERLIN = ZoneInfo("Europe/Berlin")


def utc(y, m, d, h=12, mi=0):
    return datetime(y, m, d, h, mi, tzinfo=UTC)


def lf(sha, start, dur, dist, height, speed, lat, lon, drone="D1", battery="B1"):
    f = make_flight(sha=sha * 64, start=start, duration=dur, distance=dist, lat=lat if lat is not None else 0.0, lon=lon if lon is not None else 0.0,
                    drone=drone, battery=battery, samples=())
    from dataclasses import replace
    return replace(f, max_height_m=height, max_speed_ms=speed, start_lat=lat, start_lon=lon)


@pytest.fixture
def store(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(lf("a", utc(2025, 12, 31), 600, 1000, 40, 8, 47.250, 11.500), None, "a")
    s.add_flight(lf("b", utc(2026, 1, 5), 1200, 3000, 90, 12, 47.2502, 11.5003), None, "b")      # gleicher Ort
    s.add_flight(lf("c", utc(2026, 3, 9), 300, 500, 20, 5, 48.5, 12.0, drone="D2", battery="B2"), None, "c")
    s.add_flight(lf("d", utc(2026, 3, 10), 100, 100, 10, 3, None, None), None, "d")
    return s


def test_logbook_totals_records_and_years(store):
    book = store.logbook(tz=UTC)
    assert (book.flights, book.duration_s, book.distance_m) == (4, 2200, 4600)
    assert (book.longest_flight_s, book.farthest_flight_m, book.highest_m, book.fastest_ms) == (1200, 3000, 90, 12)
    assert [y.year for y in book.years] == [2026, 2025]  # neuestes Jahr zuerst
    assert book.years[0].flights == 3 and book.years[0].duration_s == 1600 and book.years[0].distance_m == 3600


def test_logbook_years_use_local_time(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(lf("a", utc(2025, 12, 31, 23, 30), 60, 10, 5, 1, None, None), None, "a")   # in Berlin bereits 2026
    assert [y.year for y in s.logbook(tz=BERLIN).years] == [2026]
    assert [y.year for y in s.logbook(tz=UTC).years] == [2025]


def test_places_cluster_nearby_starts_and_skip_flights_without_position(store):
    places = store.logbook(tz=UTC).places
    assert len(places) == 2
    assert places[0].flights == 2 and places[0].duration_s == 1800     # meistbesuchter Ort zuerst
    assert places[1].flights == 1
    assert places[0].lat == pytest.approx(47.25, abs=0.01)


def test_place_keys_match_the_heatmap_grid(store):
    cells = {(round(c.lat, 5), round(c.lon, 5)) for c in store.heat_cells(500)}
    for place in store.logbook(tz=UTC).places:
        assert (round(place.lat, 5), round(place.lon, 5)) in cells
        i, j = (int(x) for x in place.key.split(","))
        assert store._cell(place.lat, place.lon, 500) == (i, j)


def test_empty_store_gives_empty_logbook(tmp_path):
    book = FlightStore(tmp_path / "d.db").logbook(tz=UTC)
    assert book.flights == 0 and not book.years and not book.places


def test_logbook_filters(store):
    assert store.logbook(drone="D2", tz=UTC).flights == 1
    assert store.logbook(battery="B1", tz=UTC).flights == 3
    assert store.logbook(drone="D1", battery="B2", tz=UTC).flights == 0


def test_corrupt_header_values_count_as_zero(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(lf("a", utc(2026, 1, 1), 3 * 86_400, 20_000_000, 30_000, 500, 47.0, 11.0), None, "a")
    book = s.logbook(tz=UTC)
    assert (book.flights, book.duration_s, book.distance_m, book.longest_flight_s, book.highest_m, book.fastest_ms) == (1, 0, 0, 0, 0, 0)


# --- Notizen, Tags, Ortsnamen --------------------------------------------------------------------------------------------

def test_place_names_persist_by_key(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    assert s.place_names() == {}
    s.set_place_name("1,2", "Wiese am See")
    assert FlightStore(tmp_path / "d.db").place_names() == {"1,2": "Wiese am See"}
    s.set_place_name("1,2", "  ")                                    # leer = Namen entfernen
    assert FlightStore(tmp_path / "d.db").place_names() == {}


def test_notes_roundtrip_and_tag_parsing(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    assert s.get_note("sha1") == FlightNote()
    s.set_note("sha1", FlightNote(text="Test nach Propellerwechsel", tags=["Urlaub", "Test"]))
    assert FlightStore(tmp_path / "d.db").get_note("sha1").tags == ["Urlaub", "Test"]
    s.set_note("sha1", FlightNote())                                 # leere Notiz wird nicht gespeichert
    assert s.all_tags() == {} and s.notes() == {}
    assert parse_tags(" Urlaub, test ,, Urlaub ,#Alpen") == ["Urlaub", "test", "Alpen"]
    assert parse_tags("") == [] and parse_tags("##, #") == []
    assert FlightNote(text="  ", tags=[]).is_empty and not FlightNote(text="", tags=["x"]).is_empty


def test_tag_counts(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.set_note("1", FlightNote(tags=["A", "B"]))
    s.set_note("2", FlightNote(tags=["A"]))
    assert s.all_tags() == {"A": 2, "B": 1}


def test_notes_survive_reprocessing_a_flight(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(lf("a", utc(2026, 1, 1), 60, 10, 5, 1, 47.0, 11.0), None, "a")
    s.set_note("a" * 64, FlightNote(text="bleibt"))
    s.delete_flight_by_sha("a" * 64)
    s.add_flight(lf("a", utc(2026, 1, 1), 60, 10, 5, 1, 47.0, 11.0), None, "a")
    assert s.get_note("a" * 64).text == "bleibt"


# --- Websocket -----------------------------------------------------------------------------------------------------------

async def test_ws_logbook_with_names_and_tags(hass, hass_ws_client, setup_dronelog):
    await hass.config.async_set_time_zone("Europe/Berlin")
    await add(hass, lf("a", utc(2025, 12, 31), 600, 1000, 40, 8, 47.250, 11.500), lf("b", utc(2026, 1, 5), 1200, 3000, 90, 12, 47.2502, 11.5003))
    client = await hass_ws_client(hass)
    key = (await call(client, "logbook"))["result"]["places"][0]["key"]
    assert (await call(client, "place_name_set", key=key, name=" Wiese am See "))["result"] == {"key": key, "name": "Wiese am See"}
    flight_id = 1
    note = (await call(client, "note_set", flight_id=flight_id, text="Test", tags="Urlaub, #Alpen, urlaub"))["result"]
    assert note == {"flight_id": 1, "text": "Test", "tags": ["Urlaub", "Alpen"]}
    result = (await call(client, "logbook"))["result"]
    assert result["flights"] == 2 and result["duration_s"] == 1800 and result["longest_flight_s"] == 1200
    assert result["places"][0]["name"] == "Wiese am See" and result["places"][0]["flights"] == 2
    assert result["tags"] == {"Urlaub": 1, "Alpen": 1}
    assert [y["year"] for y in result["years"]] == [2026, 2025]
    assert (await call(client, "logbook", drone="nope"))["result"]["flights"] == 0
    assert (await call(client, "note_get", flight_id=1))["result"] == note
    assert (await call(client, "place_name_set", key=key, name=""))["result"] == {"key": key, "name": None}
    assert (await call(client, "logbook"))["result"]["places"][0]["name"] is None


async def test_ws_note_set_accepts_tag_list_and_empty_removes(hass, hass_ws_client, setup_dronelog):
    await add(hass, lf("a", utc(2026, 1, 1), 60, 10, 5, 1, 47.0, 11.0))
    client = await hass_ws_client(hass)
    assert (await call(client, "note_set", flight_id=1, text="x", tags=["A", "#b", "a"]))["result"]["tags"] == ["A", "b"]
    assert (await call(client, "note_set", flight_id=1, text="", tags=[]))["result"] == {"flight_id": 1, "text": "", "tags": []}
    assert (await call(client, "logbook"))["result"]["tags"] == {}


async def test_ws_note_and_place_validation(hass, hass_ws_client, setup_dronelog):
    client = await hass_ws_client(hass)
    assert (await call(client, "note_get", flight_id=99))["error"]["code"] == "not_found"
    assert (await call(client, "note_set", flight_id=99, text="x"))["error"]["code"] == "not_found"
    assert not (await call(client, "place_name_set", key="kaputt", name="x"))["success"]
    assert not (await call(client, "place_name_set", key="1,2", name="x" * 500))["success"]
