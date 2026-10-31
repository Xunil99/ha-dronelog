import sqlite3

from custom_components.dronelog.db import SCHEMA_VERSION, FlightStore
from tests.factories import make_flight

V1_SCHEMA = """
CREATE TABLE files (sha256 TEXT PRIMARY KEY, status TEXT NOT NULL, message TEXT NOT NULL DEFAULT '', updated TEXT NOT NULL);
CREATE TABLE drones (serial TEXT PRIMARY KEY, model TEXT NOT NULL);
CREATE TABLE batteries (serial TEXT PRIMARY KEY, first_seen TEXT NOT NULL, last_seen TEXT NOT NULL);
CREATE TABLE flights (
  id INTEGER PRIMARY KEY AUTOINCREMENT, sha256 TEXT NOT NULL UNIQUE, start_utc TEXT NOT NULL, duration_s REAL NOT NULL,
  distance_m REAL NOT NULL, max_height_m REAL NOT NULL, max_speed_ms REAL NOT NULL, start_lat REAL, start_lon REAL,
  drone_serial TEXT NOT NULL, battery_serial TEXT NOT NULL, weather_json TEXT,
  source_name TEXT NOT NULL, battery_json TEXT NOT NULL);
CREATE TABLE samples (
  flight_id INTEGER NOT NULL REFERENCES flights(id) ON DELETE CASCADE, t REAL NOT NULL, lat REAL, lon REAL, height REAL,
  speed REAL, voltage REAL, current REAL, charge INTEGER, PRIMARY KEY (flight_id, t));
CREATE TABLE keychains (sha256 TEXT PRIMARY KEY, json TEXT NOT NULL);
"""


def make_v1_db(path):
    with sqlite3.connect(path) as conn:
        conn.executescript(V1_SCHEMA)
        conn.execute("INSERT INTO flights VALUES (1,'a',  '2026-10-27T13:11:11+00:00', 300, 1000, 40, 12, 48.75, 12.40, 'D', 'B', NULL, 'x', '{}')")
        conn.executemany("INSERT INTO samples VALUES (1,?,?,?,1,1,8,1,90)", [(0.0, 48.75, 12.40), (2.0, 48.76, 12.41), (4.0, None, None)])
        # Flug ohne Proben (altes Phantom-Log): Landung = Start
        conn.execute("INSERT INTO flights VALUES (2,'b','2017-05-12T17:40:00+00:00', 1000, 1400, 70, 13, 48.5, 12.2, 'D', 'B', NULL, 'y', '{}')")
        # Flug ohne jede Position
        conn.execute("INSERT INTO flights VALUES (3,'c','2026-10-28T10:00:00+00:00', 100, 10, 5, 1, NULL, NULL, 'D', 'B', NULL, 'z', '{}')")


def test_migration_from_v1_adds_end_position_from_samples(tmp_path):
    path = tmp_path / "d.db"
    make_v1_db(path)
    FlightStore(path)
    with sqlite3.connect(path) as conn:
        rows = {r[0]: r[1:] for r in conn.execute("SELECT id, end_lat, end_lon FROM flights")}
    assert rows[1] == (48.76, 12.41)   # letzte Probe MIT Position
    assert rows[2] == (48.5, 12.2)     # ohne Proben: Start
    assert rows[3] == (None, None)


def test_migration_keeps_existing_data_and_sets_version(tmp_path):
    path = tmp_path / "d.db"
    make_v1_db(path)
    store = FlightStore(path)
    assert store.totals().flights == 3
    with sqlite3.connect(path) as conn:
        assert conn.execute("PRAGMA user_version").fetchone()[0] == SCHEMA_VERSION
        assert conn.execute("SELECT COUNT(*) FROM samples").fetchone()[0] == 3


def test_migration_is_idempotent_on_reopen(tmp_path):
    path = tmp_path / "d.db"
    make_v1_db(path)
    FlightStore(path)
    FlightStore(path)
    with sqlite3.connect(path) as conn:
        assert conn.execute("SELECT end_lat FROM flights WHERE id=1").fetchone()[0] == 48.76


def test_new_database_has_schema_version_2(tmp_path):
    FlightStore(tmp_path / "n.db")
    with sqlite3.connect(tmp_path / "n.db") as conn:
        assert conn.execute("PRAGMA user_version").fetchone()[0] == 2
        assert "end_lat" in {r[1] for r in conn.execute("PRAGMA table_info(flights)")}


def test_add_flight_stores_end_position_from_last_sample_with_position(tmp_path):
    store = FlightStore(tmp_path / "e.db")
    store.add_flight(make_flight(lat=48.75, lon=12.40), None, "a")
    with sqlite3.connect(tmp_path / "e.db") as conn:
        end_lat, end_lon = conn.execute("SELECT end_lat, end_lon FROM flights").fetchone()
    assert end_lat > 48.75 and end_lon == 12.40   # letzte Probe liegt weiter nördlich als der Start


def test_add_flight_without_samples_uses_start_as_end(tmp_path):
    store = FlightStore(tmp_path / "e.db")
    store.add_flight(make_flight(lat=48.5, lon=12.2, samples=()), None, "a")
    with sqlite3.connect(tmp_path / "e.db") as conn:
        assert conn.execute("SELECT end_lat, end_lon FROM flights").fetchone() == (48.5, 12.2)
