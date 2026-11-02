from dataclasses import replace
from datetime import UTC, datetime, timedelta
from unittest.mock import patch

import pytest
from homeassistant.helpers import entity_registry as er

from custom_components.dronelog.const import DOMAIN
from custom_components.dronelog.db import FlightStore
from custom_components.dronelog.maintenance import MaintenancePlan, evaluate, mark_serviced, maintenance_status, set_plan
from custom_components.dronelog.models import FlightHeader
from tests.factories import make_flight
from tests.test_websocket_api import add, call

T0 = datetime(2026, 9, 1, 8, 0, tzinfo=UTC)


def row(i, drone="D1", dur=600.0, after=None):
    start = (after or T0) + timedelta(hours=i)
    return FlightHeader(flight_id=i, sha256=f"{i:064x}", start=start, duration_s=dur, distance_m=100.0, max_height_m=10.0, max_speed_ms=5.0,
                        drone_serial=drone, drone_model="Mini", battery_serial="B", start_lat=None, start_lon=None)


def plan(hours=None, flights=None, since=None, drone="D1"):
    return MaintenancePlan(drone_serial=drone, interval_hours=hours, interval_flights=flights, since=since or T0 - timedelta(seconds=1))


# --- reine Berechnung ----------------------------------------------------------------------------------------------------

def test_status_counts_only_flights_since_the_last_service():
    p = plan(hours=1, flights=10, since=T0 + timedelta(hours=2) - timedelta(seconds=1))
    s = maintenance_status(p, [row(i) for i in range(5)])         # Flüge 2, 3, 4 liegen nach der Wartung
    assert s.used_flights == 3 and s.used_hours == pytest.approx(0.5) and s.level == "ok"


def test_flight_exactly_at_since_is_not_counted():
    assert maintenance_status(plan(flights=5, since=T0), [row(0)]).used_flights == 0


def test_levels_at_ninety_and_hundred_percent_of_any_interval():
    p = plan(flights=10)
    assert [maintenance_status(p, [row(i) for i in range(n)]).level for n in (8, 9, 10)] == ["ok", "soon", "due"]
    both = plan(hours=1, flights=100)
    assert maintenance_status(both, [row(i) for i in range(6)]).level == "due"       # 6 x 10 min = 1 h: die Stunden entscheiden


def test_fractions():
    s = maintenance_status(plan(hours=2, flights=4), [row(i) for i in range(3)])
    assert s.hours_fraction == pytest.approx(0.25) and s.flights_fraction == pytest.approx(0.75)
    assert maintenance_status(plan(flights=4), [row(0)]).hours_fraction is None


def test_no_interval_means_no_tracking():
    p = plan()
    assert not p.is_active and maintenance_status(p, [row(i) for i in range(50)]).level == "ok"


def test_other_drones_flights_are_ignored():
    s = maintenance_status(plan(flights=2), [row(0), row(1, drone="D2"), row(2, drone="D2")])
    assert s.used_flights == 1


def test_negative_or_nan_durations_count_as_zero():
    s = maintenance_status(plan(hours=1), [row(0, dur=-50.0), row(1, dur=float("nan")), row(2, dur=1800.0)])
    assert s.used_hours == pytest.approx(0.5)


# --- Speicher und Modell -------------------------------------------------------------------------------------------------

@pytest.fixture
def store(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    for i in range(4):
        s.add_flight(replace(make_flight(sha=f"{i:064x}", start=T0 + timedelta(hours=i), drone="D1", samples=(), duration=600.0), drone_model="Mini"), None, "x")
    return s


NOW = T0 + timedelta(hours=100)


def test_plans_persist_and_set_plan_counts_from_now(store):
    p = set_plan(store, "D1", None, 3, NOW)
    assert p.since == NOW and p.interval_flights == 3
    assert FlightStore(store._path).plans()["D1"] == p
    assert evaluate(store).rows[0].status.used_flights == 0       # Zählung beginnt jetzt


def test_removing_the_plan_stops_tracking(store):
    set_plan(store, "D1", 5.0, None, NOW)
    assert set_plan(store, "D1", None, None, NOW) is None
    assert store.plans() == {}


def test_due_is_reported_exactly_once_until_service(store):
    set_plan(store, "D1", None, 3, NOW)
    store.save_plan(replace(store.plans()["D1"], since=T0 - timedelta(seconds=1)))
    first = evaluate(store)
    assert [r.serial for r in first.newly_due] == ["D1"] and first.rows[0].status.level == "due"
    assert store.plans()["D1"].notified_due
    assert evaluate(store).newly_due == []                          # nicht erneut
    serviced = mark_serviced(store, "D1", NOW)
    assert serviced.since == NOW and not serviced.notified_due
    assert evaluate(store).rows[0].status.level == "ok"


def test_changing_the_interval_rearms_the_notification(store):
    set_plan(store, "D1", None, 3, NOW)
    store.save_plan(replace(store.plans()["D1"], since=T0 - timedelta(seconds=1)))
    assert len(evaluate(store).newly_due) == 1
    set_plan(store, "D1", None, 3, NOW)                             # gleiches Intervall: weiter stumm
    assert evaluate(store).newly_due == []
    set_plan(store, "D1", None, 4, NOW)                             # neues Intervall, wieder erreicht
    assert len(evaluate(store).newly_due) == 1


def test_unchanged_since_on_interval_change(store):
    set_plan(store, "D1", None, 3, NOW)
    assert set_plan(store, "D1", 2.0, 3, NOW + timedelta(days=1)).since == NOW


def test_mark_serviced_without_plan_is_none(store):
    assert mark_serviced(store, "D1", NOW) is None


def test_counts_all_flights_without_limit(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    for i in range(260):                     # mehr als jedes Listenlimit (200)
        s.add_flight(make_flight(sha=f"{i:064x}", start=T0 + timedelta(minutes=i), drone="D1", samples=()), None, "x")
    set_plan(s, "D1", None, 1000, NOW)
    s.save_plan(replace(s.plans()["D1"], since=T0 - timedelta(seconds=1)))
    assert evaluate(s).rows[0].status.used_flights == 260


def test_drones_without_plan_are_listed_without_status(store):
    r = evaluate(store).rows[0]
    assert r.serial == "D1" and r.plan is None and r.status is None and r.name == "Mini …D1"


# --- Websocket, Entitäten, Benachrichtigung -----------------------------------------------------------------------------

def entity(hass, platform, serial, key):
    return er.async_get(hass).async_get_entity_id(platform, DOMAIN, f"drone_{serial}_{key}")


async def test_ws_maintenance_roundtrip(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, drone="D1"))
    client = await hass_ws_client(hass)
    rows = (await call(client, "maintenance_get"))["result"]["drones"]
    assert rows[0]["serial"] == "D1" and rows[0]["plan"] is None and rows[0]["status"] is None
    set_ = (await call(client, "maintenance_set", drone="D1", interval_hours=2.5, interval_flights=20))["result"]
    assert set_["plan"]["interval_hours"] == 2.5 and set_["plan"]["interval_flights"] == 20
    assert set_["status"]["used_flights"] == 0 and set_["status"]["level"] == "ok"
    assert (await call(client, "maintenance_serviced", drone="D1"))["result"]["plan"]["notified_due"] is False
    removed = (await call(client, "maintenance_set", drone="D1"))["result"]
    assert removed["plan"] is None and removed["status"] is None
    assert not (await call(client, "maintenance_serviced", drone="D1"))["success"]
    assert not (await call(client, "maintenance_set", drone="D1", interval_hours=0))["success"]
    assert not (await call(client, "maintenance_set", drone="D1", interval_flights=0))["success"]


async def test_entities_exist_only_with_an_active_plan_and_follow_it(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, drone="D1"))
    assert entity(hass, "binary_sensor", "D1", "maintenance_due") is None
    client = await hass_ws_client(hass)
    await call(client, "maintenance_set", drone="D1", interval_flights=3)
    await hass.async_block_till_done()
    due = entity(hass, "binary_sensor", "D1", "maintenance_due")
    hours = entity(hass, "sensor", "D1", "hours_since_service")
    assert due and hours
    assert hass.states.get(due).state == "off"
    assert hass.states.get(hours).state == "0.0"
    assert hass.states.get(hours).attributes["interval_flights"] == 3 and hass.states.get(hours).attributes["used_flights"] == 0
    store = hass.data[DOMAIN]["db"]
    await hass.async_add_executor_job(lambda: store.save_plan(replace(store.plans()["D1"], since=datetime(2020, 1, 1, tzinfo=UTC))))
    await add(hass, make_flight(sha="2" * 64, drone="D1", start=T0), make_flight(sha="3" * 64, drone="D1", start=T0 + timedelta(hours=1)))
    hass.bus.async_fire("dronelog_flight_added", {"flight_id": 3})      # wie der Processor nach jedem neuen Flug
    await hass.async_block_till_done()
    assert hass.states.get(due).state == "on" and hass.states.get(due).attributes["level"] == "due"
    assert float(hass.states.get(hours).state) > 0


async def test_persistent_notification_once_per_cycle(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, drone="D1", start=T0))
    client = await hass_ws_client(hass)
    store = hass.data[DOMAIN]["db"]
    with patch("homeassistant.components.persistent_notification.async_create") as create, \
            patch("homeassistant.components.persistent_notification.async_dismiss") as dismiss:
        await call(client, "maintenance_set", drone="D1", interval_flights=1)
        assert create.call_count == 0
        dismiss.reset_mock()
        await hass.async_add_executor_job(lambda: store.save_plan(replace(store.plans()["D1"], since=T0 - timedelta(seconds=1))))
        await hass.data[DOMAIN]["coordinator"].async_refresh()
        assert create.call_count == 1
        assert create.call_args.kwargs["notification_id"] == "dronelog_maintenance_D1"
        assert "Mini" in create.call_args.args[1] or "DJI Test" in create.call_args.args[1]
        await hass.data[DOMAIN]["coordinator"].async_refresh()
        assert create.call_count == 1                                  # nicht erneut
        await call(client, "maintenance_serviced", drone="D1")
        assert dismiss.call_count == 1
        await hass.async_add_executor_job(lambda: store.save_plan(replace(store.plans()["D1"], since=T0 - timedelta(seconds=1))))
        await hass.data[DOMAIN]["coordinator"].async_refresh()
        assert create.call_count == 2                                  # neuer Zyklus


async def test_maintenance_commands_reject_non_admins(hass, hass_ws_client, hass_read_only_access_token, setup_dronelog):
    client = await hass_ws_client(hass, hass_read_only_access_token)
    for command, data in (("maintenance_get", {}), ("maintenance_set", {"drone": "D1"}), ("maintenance_serviced", {"drone": "D1"})):
        assert (await call(client, command, **data))["error"]["code"] == "unauthorized"


async def test_removing_the_plan_removes_the_entities_and_they_return_with_a_new_plan(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, drone="D1"))
    client = await hass_ws_client(hass)
    await call(client, "maintenance_set", drone="D1", interval_hours=1)
    await hass.async_block_till_done()
    due = entity(hass, "binary_sensor", "D1", "maintenance_due")
    assert hass.states.get(due).state == "off"
    await call(client, "maintenance_set", drone="D1")
    await hass.async_block_till_done()
    assert entity(hass, "binary_sensor", "D1", "maintenance_due") is None
    assert entity(hass, "sensor", "D1", "hours_since_service") is None
    assert hass.states.get(due) is None
    await call(client, "maintenance_set", drone="D1", interval_hours=2)
    await hass.async_block_till_done()
    assert hass.states.get(entity(hass, "binary_sensor", "D1", "maintenance_due")).state == "off"


async def test_maintenance_set_for_unknown_drone_is_not_found(hass, hass_ws_client, setup_dronelog):
    client = await hass_ws_client(hass)
    response = await call(client, "maintenance_set", drone="NOPE", interval_hours=1)
    assert response["success"] is False and response["error"]["code"] == "not_found"
    assert hass.data[DOMAIN]["db"].plans() == {}


async def test_notification_is_dismissed_when_interval_change_or_removal_clears_the_due_state(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, drone="D1", start=T0))
    client = await hass_ws_client(hass)
    with patch("homeassistant.components.persistent_notification.async_dismiss") as dismiss:
        await call(client, "maintenance_set", drone="D1", interval_flights=1)
        dismiss.reset_mock()
        await call(client, "maintenance_set", drone="D1", interval_flights=50)
        assert dismiss.call_count == 1
        dismiss.reset_mock()
        await call(client, "maintenance_set", drone="D1")
        assert dismiss.call_count == 1
