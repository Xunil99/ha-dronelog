from dataclasses import replace
from datetime import UTC, datetime, timedelta

import pytest

from custom_components.dronelog.battery_report import BatteryReportData, assess
from custom_components.dronelog.db import FlightStore
from custom_components.dronelog.models import FlightEvent, FlightExtras
from tests.factories import make_battery, make_flight
from tests.test_websocket_api import add, call

T0 = datetime(2026, 10, 1, 8, 0, tzinfo=UTC)


def flight(i, battery="B1", cycles=None, health=None, dev=0.010, resistance=None, temp=30.0, events=()):
    summary = make_battery(charge_start=90, charge_end=50 - i, min_voltage=13.1, max_voltage=16.4, peak_current_a=15.0 + i, avg_power_w=100.0,
                           peak_power_w=250.0, temp_min_c=15.0, temp_max_c=temp, cell_deviation_max_v=dev, full_capacity_mah=2400,
                           cycles=cycles, health_pct=health, internal_resistance_mohm=resistance)
    f = make_flight(sha=f"{i:064x}", start=T0 + timedelta(days=i), battery=battery, drone=f"D{i % 2}", duration=600.0, distance=1000.0,
                    samples=(), battery_summary=summary)
    return replace(f, drone_model="Avata" if i % 2 == 0 else "Mini", extras=FlightExtras(events=tuple(events)))


@pytest.fixture
def store(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    s.add_flight(flight(0, cycles=10, health=98, dev=0.010, resistance=50.0), None, "0")
    s.add_flight(flight(1, cycles=11, health=97, dev=0.030, resistance=56.0, temp=38.0, events=[FlightEvent(5.0, "voltageWarning", 1.0)]), None, "1")
    s.add_flight(flight(2, cycles=13, health=95, dev=0.012, resistance=60.0), None, "2")
    s.add_flight(flight(3, battery="B2", cycles=1, health=100, dev=0.005), None, "3")
    return s


def test_report_aggregates_only_the_chosen_battery(store):
    r = store.battery_report("B1")
    assert r.flights == 3 and r.total_duration_s == 1800 and r.total_distance_m == 3000
    assert r.drone_models == ("Avata", "Mini")
    assert (r.cycles_first, r.cycles_latest, r.health_first, r.health_latest) == (10, 13, 98, 95)
    assert r.full_capacity_mah == 2400 and r.peak_current_a == 17
    assert r.min_voltage == pytest.approx(13.1) and r.temp_max_c == 38
    assert r.cell_deviation_max_mv == pytest.approx(30)
    assert r.flights_above_cell_warning == 1 and r.voltage_warnings == 1
    assert r.resistance_median_mohm == pytest.approx(56)
    assert [h.flight_id for h in r.history] == [1, 2, 3]
    assert r.first_use == T0 and r.last_use == T0 + timedelta(days=2)


def test_report_average_charge_used_and_unknown_battery(store):
    assert store.battery_report("B1").avg_charge_used_pct == pytest.approx(41)
    assert store.battery_report("nope") is None


def test_cycles_added_and_health_loss(store):
    r = store.battery_report("B1")
    assert r.cycles_added == 3 and r.health_loss_pct == 3


def test_battery_without_resistance_has_none(store):
    assert store.battery_report("B2").resistance_median_mohm is None


def test_placeholder_flights_count_but_are_not_in_history(tmp_path):
    s = FlightStore(tmp_path / "d.db")
    empty = make_battery(charge_start=0, charge_end=0, full_capacity_mah=0, peak_power_w=0.0, avg_power_w=0.0, temp_max_c=0.0, temp_min_c=0.0,
                         min_voltage=0.0, max_voltage=0.0, peak_current_a=0.0, cycles=None, health_pct=None)
    s.add_flight(replace(flight(0), battery=empty), None, "0")
    assert s.battery_report("B1") is None        # nur Platzhalter: kein Bericht
    s.add_flight(flight(1, cycles=2, health=99), None, "1")
    r = s.battery_report("B1")
    assert r.flights == 2 and len(r.history) == 1


def report(health=97, dev=10.0, warnings=0, above=0, cycles_first=10, cycles_latest=40, health_first=100):
    return BatteryReportData(
        serial="S", drone_models=(), flights=20, first_use=T0, last_use=T0, total_duration_s=1000, total_distance_m=1000,
        cycles_first=cycles_first, cycles_latest=cycles_latest, health_first=health_first, health_latest=health, full_capacity_mah=2400,
        peak_current_a=15, peak_power_w=250, avg_power_w=100, min_voltage=13, max_voltage=16.4, temp_min_c=15, temp_max_c=35,
        cell_deviation_max_mv=dev, flights_above_cell_warning=above, voltage_warnings=warnings, resistance_median_mohm=None,
        avg_charge_used_pct=40, history=())


@pytest.mark.parametrize(("health", "level"), [(97, "good"), (90, "good"), (89, "watch"), (80, "watch"), (79, "critical")])
def test_assessment_level_follows_health(health, level):
    assert assess(report(health=health)).level == level


def test_assessment_state_of_health_line_names_value_and_trend():
    a = assess(report(health=94, health_first=100))
    assert "94 %" in a.state_of_health.text and "100 %" in a.state_of_health.text
    assert a.state_of_health.code == "soh_trend_cycles" and a.state_of_health.params == {"health": 94, "first": 100, "loss": 6, "cycles": 30}
    assert "%" not in assess(report(health=None, health_first=None)).state_of_health.text
    assert assess(report(health=None, health_first=None)).state_of_health.code == "soh_missing"
    assert assess(report(health=94, health_first=100, cycles_first=None)).state_of_health.code == "soh_trend"
    assert assess(report(health=94, health_first=94)).state_of_health.code == "soh"


def test_assessment_worst_finding_wins():
    assert assess(report(health=99, dev=60)).level == "critical"
    assert assess(report(health=99, dev=30, above=1)).level == "watch"
    assert assess(report(health=99, warnings=2)).level == "watch"
    assert assess(report(health=99, dev=10, warnings=1)).level == "good"      # eine einzelne Warnung genügt nicht
    assert assess(report(health=99, dev=30, above=0)).level == "good"         # über 20 mV, aber kein Flug darüber


def test_assessment_without_health_value_says_so_and_stays_cautious():
    a = assess(report(health=None, health_first=None))
    assert a.level == "good"
    assert [p.code for p in a.points] == ["health_missing"] and "Gesundheitswert" in a.points[0].text


def test_assessment_points_codes_and_clean_bill():
    assert [p.code for p in assess(report()).points] == ["all_clear"]
    a = assess(report(health=75, dev=61.4, warnings=3))
    assert [p.code for p in a.points] == ["health_critical", "cell_critical", "voltage_warnings"]
    assert a.headline_code == "critical" and a.headline == "Austausch erwägen"
    assert a.points[1].params == {"mv": 61} and "61 mV" in a.points[1].text
    assert assess(report(health=85)).points[0].code == "health_watch"
    assert assess(report(dev=30, above=4)).points[0].params == {"flights": 4}


async def test_ws_battery_report(hass, hass_ws_client, setup_dronelog):
    await add(hass, flight(0, cycles=10, health=98, resistance=50.0), flight(1, cycles=11, health=97, dev=0.030, resistance=56.0,
                                                                              events=[FlightEvent(5.0, "voltageWarning", 1.0)]))
    client = await hass_ws_client(hass)
    result = (await call(client, "battery_report", battery_serial="B1"))["result"]
    assert result["serial"] == "B1" and result["flights"] == 2 and result["cell_deviation_max_mv"] == pytest.approx(30)
    assert result["assessment"]["level"] == "watch"
    assert result["assessment"]["headline_code"] == "watch"
    assert len(result["history"]) == 2 and result["history"][0]["flight_id"] == 1
    assert result["history"][0]["start"].startswith("2026-10-01")
    assert result["first_use"] and result["resistance_median_mohm"] == pytest.approx(53)
    missing = await call(client, "battery_report", battery_serial="nope")
    assert not missing["success"] and missing["error"]["code"] == "not_found"
