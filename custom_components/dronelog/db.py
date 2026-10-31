"""SQLite-Speicher für Flüge (blockierend, im Executor aufrufen)."""

from __future__ import annotations

import json
import math
import sqlite3
import threading
from contextlib import closing, contextmanager
from dataclasses import asdict
from datetime import UTC, datetime
from pathlib import Path

from .models import (
    BatteryInfo,
    BatteryListItem,
    BatteryPoint,
    BatterySummary,
    DroneInfo,
    FileStatus,
    FlightDetail,
    FlightRow,
    HeatCell,
    MonthStat,
    Overview,
    ParsedFlight,
    Sample,
    Totals,
    WeatherSummary,
)

SCHEMA_VERSION = 2

SCHEMA = """
CREATE TABLE IF NOT EXISTS files (sha256 TEXT PRIMARY KEY, status TEXT NOT NULL, message TEXT NOT NULL DEFAULT '', updated TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS drones (serial TEXT PRIMARY KEY, model TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS batteries (serial TEXT PRIMARY KEY, first_seen TEXT NOT NULL, last_seen TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS flights (
  id INTEGER PRIMARY KEY AUTOINCREMENT, sha256 TEXT NOT NULL UNIQUE, start_utc TEXT NOT NULL, duration_s REAL NOT NULL,
  distance_m REAL NOT NULL, max_height_m REAL NOT NULL, max_speed_ms REAL NOT NULL, start_lat REAL, start_lon REAL,
  end_lat REAL, end_lon REAL,
  drone_serial TEXT NOT NULL, battery_serial TEXT NOT NULL, weather_json TEXT,
  source_name TEXT NOT NULL, battery_json TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS samples (
  flight_id INTEGER NOT NULL REFERENCES flights(id) ON DELETE CASCADE, t REAL NOT NULL, lat REAL, lon REAL, height REAL,
  speed REAL, voltage REAL, current REAL, charge INTEGER, PRIMARY KEY (flight_id, t));
CREATE TABLE IF NOT EXISTS keychains (sha256 TEXT PRIMARY KEY, json TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_flights_start ON flights(start_utc);
CREATE INDEX IF NOT EXISTS idx_flights_battery ON flights(battery_serial);
"""

_FLIGHT_COLUMNS = (
    "f.id, f.sha256, f.start_utc, f.duration_s, f.distance_m, f.max_height_m, f.max_speed_ms, f.drone_serial, "
    "COALESCE(d.model, ''), f.battery_serial, f.source_name, f.weather_json, (f.start_lat IS NOT NULL)"
)
_FLIGHT_FROM = "FROM flights f LEFT JOIN drones d ON d.serial = f.drone_serial"


def _iso(moment: datetime) -> str:
    return moment.astimezone(UTC).isoformat()


def _row(values) -> FlightRow:
    weather = json.loads(values[11]) if values[11] else None
    return FlightRow(
        id=values[0], sha256=values[1], start=datetime.fromisoformat(values[2]), duration_s=values[3], distance_m=values[4],
        max_height_m=values[5], max_speed_ms=values[6], drone_serial=values[7], drone_model=values[8], battery_serial=values[9],
        source_name=values[10], temperature_c=weather["temperature_c"] if weather else None,
        wind_10m_ms=weather["wind_10m_ms"] if weather else None, has_position=bool(values[12]),
    )


class FlightStore:
    def __init__(self, path: Path) -> None:
        self._path = path
        self._lock = threading.Lock()
        path.parent.mkdir(parents=True, exist_ok=True)
        with self._connect() as conn:
            conn.executescript(SCHEMA)
            self._migrate(conn)

    @staticmethod
    def _migrate(conn: sqlite3.Connection) -> None:
        version = conn.execute("PRAGMA user_version").fetchone()[0]
        if version >= SCHEMA_VERSION:
            return
        columns = {row[1] for row in conn.execute("PRAGMA table_info(flights)")}
        if "end_lat" not in columns:
            conn.execute("ALTER TABLE flights ADD COLUMN end_lat REAL")
            conn.execute("ALTER TABLE flights ADD COLUMN end_lon REAL")
        # Landeposition: letzte Probe mit Position, sonst der Startpunkt (alte Logs ohne Zeitreihe)
        conn.execute(
            "UPDATE flights SET "
            "end_lat = COALESCE((SELECT lat FROM samples s WHERE s.flight_id = flights.id AND s.lat IS NOT NULL ORDER BY s.t DESC LIMIT 1), start_lat), "
            "end_lon = COALESCE((SELECT lon FROM samples s WHERE s.flight_id = flights.id AND s.lat IS NOT NULL ORDER BY s.t DESC LIMIT 1), start_lon) "
            "WHERE end_lat IS NULL")
        conn.execute(f"PRAGMA user_version = {SCHEMA_VERSION}")

    @contextmanager
    def _connect(self):
        with closing(sqlite3.connect(self._path)) as conn:
            conn.execute("PRAGMA journal_mode=WAL")
            conn.execute("PRAGMA foreign_keys=ON")
            with conn:
                yield conn

    def add_flight(self, flight: ParsedFlight, weather: WeatherSummary | None, source_name: str) -> int:
        with self._lock, self._connect() as conn:
            existing = conn.execute("SELECT id FROM flights WHERE sha256=?", (flight.sha256,)).fetchone()
            if existing:
                return existing[0]
            conn.execute("INSERT OR IGNORE INTO drones(serial, model) VALUES (?, ?)", (flight.drone_serial, flight.drone_model))
            conn.execute(
                "INSERT INTO batteries(serial, first_seen, last_seen) VALUES (?, ?, ?) "
                "ON CONFLICT(serial) DO UPDATE SET last_seen=MAX(last_seen, excluded.last_seen), first_seen=MIN(first_seen, excluded.first_seen)",
                (flight.battery_serial, _iso(flight.start), _iso(flight.start)),
            )
            cursor = conn.execute(
                "INSERT INTO flights(sha256, start_utc, duration_s, distance_m, max_height_m, max_speed_ms, start_lat, start_lon, "
                "end_lat, end_lon, drone_serial, battery_serial, weather_json, source_name, battery_json) "
                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (flight.sha256, _iso(flight.start), flight.duration_s, flight.distance_m, flight.max_height_m, flight.max_speed_ms,
                 flight.start_lat, flight.start_lon, *self._end_position(flight), flight.drone_serial, flight.battery_serial,
                 json.dumps(asdict(weather)) if weather else None, source_name, json.dumps(asdict(flight.battery))),
            )
            flight_id = cursor.lastrowid
            if flight.keychains_json:
                conn.execute("INSERT OR REPLACE INTO keychains(sha256, json) VALUES (?, ?)", (flight.sha256, flight.keychains_json))
            conn.executemany(
                "INSERT INTO samples VALUES (?,?,?,?,?,?,?,?,?)",
                [(flight_id, s.t, s.lat, s.lon, s.height, s.speed, s.voltage, s.current, s.charge) for s in flight.samples],
            )
            return flight_id

    @staticmethod
    def _end_position(flight: ParsedFlight) -> tuple[float | None, float | None]:
        positioned = [s for s in flight.samples if s.lat is not None and s.lon is not None]
        return (positioned[-1].lat, positioned[-1].lon) if positioned else (flight.start_lat, flight.start_lon)

    def has_flight(self, sha256: str) -> bool:
        with self._connect() as conn:
            return conn.execute("SELECT 1 FROM flights WHERE sha256=?", (sha256,)).fetchone() is not None

    def delete_flight(self, flight_id: int) -> None:
        with self._lock, self._connect() as conn:
            conn.execute("DELETE FROM flights WHERE id=?", (flight_id,))

    def delete_flight_by_sha(self, sha256: str) -> bool:
        with self._lock, self._connect() as conn:
            return conn.execute("DELETE FROM flights WHERE sha256=?", (sha256,)).rowcount > 0

    def set_file_status(self, sha256: str, status: FileStatus, message: str = "") -> None:
        with self._lock, self._connect() as conn:
            conn.execute(
                "INSERT INTO files(sha256, status, message, updated) VALUES (?,?,?,?) "
                "ON CONFLICT(sha256) DO UPDATE SET status=excluded.status, message=excluded.message, updated=excluded.updated",
                (sha256, status.value, message, _iso(datetime.now(UTC))),
            )

    def file_status(self, sha256: str) -> tuple[FileStatus, str] | None:
        with self._connect() as conn:
            row = conn.execute("SELECT status, message FROM files WHERE sha256=?", (sha256,)).fetchone()
        return (FileStatus(row[0]), row[1]) if row else None

    def files_with_status(self, *statuses: FileStatus) -> list[str]:
        marks = ",".join("?" * len(statuses))
        with self._connect() as conn:
            rows = conn.execute(f"SELECT sha256 FROM files WHERE status IN ({marks}) ORDER BY updated", [s.value for s in statuses])
            return [r[0] for r in rows]

    def stored_keychains(self, sha256: str) -> str | None:
        with self._connect() as conn:
            row = conn.execute("SELECT json FROM keychains WHERE sha256=?", (sha256,)).fetchone()
        return row[0] if row else None

    def list_flights(self, limit: int = 50, offset: int = 0, *, drone: str | None = None, battery: str | None = None,
                     since: datetime | None = None) -> list[FlightRow]:
        where, args = [], []
        if drone:
            where.append("f.drone_serial=?"); args.append(drone)
        if battery:
            where.append("f.battery_serial=?"); args.append(battery)
        if since:
            where.append("f.start_utc>=?"); args.append(_iso(since))
        clause = f"WHERE {' AND '.join(where)}" if where else ""
        with self._connect() as conn:
            rows = conn.execute(f"SELECT {_FLIGHT_COLUMNS} {_FLIGHT_FROM} {clause} ORDER BY f.start_utc DESC LIMIT ? OFFSET ?",
                                [*args, limit, offset]).fetchall()
        return [_row(r) for r in rows]

    def count_flights(self, *, drone: str | None = None, battery: str | None = None, since: datetime | None = None) -> int:
        where, args = [], []
        if drone:
            where.append("drone_serial=?"); args.append(drone)
        if battery:
            where.append("battery_serial=?"); args.append(battery)
        if since:
            where.append("start_utc>=?"); args.append(_iso(since))
        clause = f"WHERE {' AND '.join(where)}" if where else ""
        with self._connect() as conn:
            return conn.execute(f"SELECT COUNT(*) FROM flights {clause}", args).fetchone()[0]

    def get_flight(self, flight_id: int) -> FlightDetail | None:
        with self._connect() as conn:
            row = conn.execute(f"SELECT {_FLIGHT_COLUMNS}, f.start_lat, f.start_lon, f.battery_json, f.end_lat, f.end_lon {_FLIGHT_FROM} WHERE f.id=?",
                               (flight_id,)).fetchone()
            if not row:
                return None
            samples = conn.execute("SELECT t, lat, lon, height, speed, voltage, current, charge FROM samples WHERE flight_id=? ORDER BY t",
                                   (flight_id,)).fetchall()
        weather = WeatherSummary(**json.loads(row[11])) if row[11] else None
        return FlightDetail(row=_row(row[:13]), start_lat=row[13], start_lon=row[14], end_lat=row[16], end_lon=row[17],
                            battery=BatterySummary(**json.loads(row[15])), weather=weather, samples=tuple(Sample(*s) for s in samples))

    def totals(self) -> Totals:
        with self._connect() as conn:
            count, duration, distance = conn.execute("SELECT COUNT(*), COALESCE(SUM(duration_s),0), COALESCE(SUM(distance_m),0) FROM flights").fetchone()
        last = self.list_flights(limit=1)
        return Totals(flights=count, duration_s=duration, distance_m=distance, last_flight=last[0] if last else None)

    def battery_history(self, serial: str) -> list[BatteryPoint]:
        with self._connect() as conn:
            rows = conn.execute("SELECT id, start_utc, battery_json FROM flights WHERE battery_serial=? ORDER BY start_utc", (serial,)).fetchall()
        points = []
        for flight_id, start, battery_json in rows:
            b = json.loads(battery_json)
            points.append(BatteryPoint(flight_id=flight_id, start=datetime.fromisoformat(start), charge_start=b["charge_start"],
                                       charge_end=b["charge_end"], cycles=b["cycles"], health_pct=b["health_pct"],
                                       cell_deviation_max_v=b["cell_deviation_max_v"], temp_max_c=b["temp_max_c"], avg_power_w=b["avg_power_w"]))
        return points

    @staticmethod
    def _cell(lat: float, lon: float, precision_m: int) -> tuple[int, int]:
        lat_step = precision_m / 111_320
        lat_i = round(lat / lat_step)
        lon_step = lat_step / max(math.cos(math.radians(lat_i * lat_step)), 0.01)  # Zellbreite aus der Zellmitte
        return lat_i, round(lon / lon_step)

    @staticmethod
    def _cell_center(cell: tuple[int, int], precision_m: int) -> tuple[float, float]:
        lat_step = precision_m / 111_320
        lat = cell[0] * lat_step
        return lat, cell[1] * lat_step / max(math.cos(math.radians(lat)), 0.01)

    def _positions(self, conn) -> list[tuple[int, float | None, float | None, float | None, float | None]]:
        return conn.execute("SELECT id, start_lat, start_lon, end_lat, end_lon FROM flights").fetchall()

    def heat_cells(self, precision_m: int = 300) -> list[HeatCell]:
        counts: dict[tuple[int, int], int] = {}
        with self._connect() as conn:
            for _id, s_lat, s_lon, e_lat, e_lon in self._positions(conn):
                cells = set()
                if s_lat is not None and s_lon is not None:
                    cells.add(self._cell(s_lat, s_lon, precision_m))
                if e_lat is not None and e_lon is not None:
                    cells.add(self._cell(e_lat, e_lon, precision_m))
                for cell in cells:  # ein Flug zählt je Zelle höchstens einmal
                    counts[cell] = counts.get(cell, 0) + 1
        return [HeatCell(lat=lat, lon=lon, count=count)
                for cell, count in counts.items() for lat, lon in [self._cell_center(cell, precision_m)]]

    def flights_in_cell(self, lat: float, lon: float, precision_m: int = 300) -> list[FlightRow]:
        target = self._cell(lat, lon, precision_m)
        ids = []
        with self._connect() as conn:
            for flight_id, s_lat, s_lon, e_lat, e_lon in self._positions(conn):
                points = [(s_lat, s_lon), (e_lat, e_lon)]
                if any(a is not None and b is not None and self._cell(a, b, precision_m) == target for a, b in points):
                    ids.append(flight_id)
            if not ids:
                return []
            marks = ",".join("?" * len(ids))
            rows = conn.execute(f"SELECT {_FLIGHT_COLUMNS} {_FLIGHT_FROM} WHERE f.id IN ({marks}) ORDER BY f.start_utc DESC", ids).fetchall()
        return [_row(r) for r in rows]

    def monthly_stats(self, drone: str | None = None) -> list[MonthStat]:
        clause, args = ("WHERE drone_serial=?", [drone]) if drone else ("", [])
        with self._connect() as conn:
            rows = conn.execute(
                f"SELECT substr(start_utc,1,7), COUNT(*), SUM(duration_s), SUM(distance_m) FROM flights {clause} "
                "GROUP BY 1 ORDER BY 1", args).fetchall()
        return [MonthStat(month=m, flights=c, duration_s=d or 0.0, distance_m=dist or 0.0) for m, c, d, dist in rows]

    def battery_list(self) -> list[BatteryListItem]:
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT b.serial, (SELECT COUNT(*) FROM flights f WHERE f.battery_serial=b.serial), b.first_seen, b.last_seen "
                "FROM batteries b ORDER BY b.serial").fetchall()
        items = []
        for serial, count, first, last in rows:
            history = self.battery_history(serial)
            items.append(BatteryListItem(serial=serial, flights=count, first=datetime.fromisoformat(first),
                                         last=datetime.fromisoformat(last), latest=history[-1] if history else None))
        return items

    def drone_list(self) -> list[DroneInfo]:
        return list(self.overview().drones)

    def overview(self) -> Overview:
        with self._connect() as conn:
            drones = conn.execute(
                "SELECT f.drone_serial, COALESCE(d.model, ''), COUNT(*), SUM(f.duration_s) FROM flights f "
                "LEFT JOIN drones d ON d.serial=f.drone_serial GROUP BY f.drone_serial ORDER BY f.drone_serial").fetchall()
            batteries = conn.execute("SELECT battery_serial, COUNT(*) FROM flights GROUP BY battery_serial ORDER BY battery_serial").fetchall()
            counts = dict(conn.execute("SELECT status, COUNT(*) FROM files GROUP BY status").fetchall())
        battery_infos = []
        for serial, count in batteries:
            history = self.battery_history(serial)
            battery_infos.append(BatteryInfo(serial=serial, flights=count, last=history[-1] if history else None))
        return Overview(
            totals=self.totals(),
            drones=tuple(DroneInfo(serial=s, model=m, flights=c, duration_s=d or 0.0) for s, m, c, d in drones),
            batteries=tuple(battery_infos),
            pending=counts.get(FileStatus.PENDING.value, 0) + counts.get(FileStatus.PENDING_KEY.value, 0),
            errors=counts.get(FileStatus.ERROR.value, 0),
        )
