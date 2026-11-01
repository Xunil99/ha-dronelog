import itertools
from datetime import timedelta

import pytest

from custom_components.dronelog.const import DOMAIN
from custom_components.dronelog.models import Sample
from tests.factories import later, make_battery, make_flight


async def add(hass, *flights):
    db = hass.data[DOMAIN]["db"]
    for f in flights:
        await hass.async_add_executor_job(db.add_flight, f, None, f"{f.sha256[:4]}.txt")


_ids = itertools.count(1)


async def call(client, command, **data):
    await client.send_json({"id": next(_ids), "type": f"dronelog/{command}", **data})
    return await client.receive_json()


def long_samples(n=2000):
    return tuple(Sample(t=float(i), lat=48.75 + i * 1e-5, lon=12.4, height=float(i % 50), speed=5.0, voltage=8.0, current=3.0,
                        charge=99 - i // 100) for i in range(n))


async def test_flights_lists_newest_first_with_total(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, start=later(0)), make_flight(sha="2" * 64, start=later(2)), make_flight(sha="3" * 64, start=later(1)))
    response = await call(await hass_ws_client(hass), "flights")
    assert response["success"]
    assert response["result"]["total"] == 3
    assert [f["id"] for f in response["result"]["flights"]] == [2, 3, 1]


async def test_flights_paging_and_filters(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, start=later(0), battery="B1", drone="D1"),
              make_flight(sha="2" * 64, start=later(1), battery="B2", drone="D1"),
              make_flight(sha="3" * 64, start=later(2), battery="B1", drone="D2"))
    client = await hass_ws_client(hass)
    assert len((await call(client, "flights", limit=1, offset=1))["result"]["flights"]) == 1
    by_battery = (await call(client, "flights", battery="B1"))["result"]
    assert by_battery["total"] == 2
    assert (await call(client, "flights", drone="D2"))["result"]["total"] == 1
    since = (later(0) + timedelta(hours=1)).isoformat()
    assert (await call(client, "flights", since=since))["result"]["total"] == 2


async def test_flights_limit_above_200_is_rejected(hass, hass_ws_client, setup_dronelog):
    response = await call(await hass_ws_client(hass), "flights", limit=500)
    assert not response["success"]


async def test_flights_hide_full_serials_except_filter_keys(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(battery="B39PP1GAA0H413", drone="1581FB34C261D003"))
    summary = (await call(await hass_ws_client(hass), "flights"))["result"]["flights"][0]
    assert summary["battery_suffix"] == "H413" and summary["drone_suffix"] == "D003"
    assert summary["battery_serial"] == "B39PP1GAA0H413" and summary["drone_serial"] == "1581FB34C261D003"  # Filterschlüssel
    assert {"has_position", "temperature_c", "wind_10m_ms"} <= set(summary)


async def test_flight_returns_downsampled_points_max_600(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(samples=long_samples()))
    result = (await call(await hass_ws_client(hass), "flight", flight_id=1))["result"]
    assert 2 <= len(result["points"]) <= 600


async def test_flight_keeps_first_and_last_point(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(samples=long_samples()))
    points = (await call(await hass_ws_client(hass), "flight", flight_id=1))["result"]["points"]
    assert points[0]["t"] == 0.0 and points[-1]["t"] == 1999.0
    assert set(points[0]) == {"t", "lat", "lon", "height", "speed", "voltage", "current", "charge"}


async def test_flight_contains_battery_weather_positions_and_source(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(battery_summary=make_battery(health_pct=97)))
    result = (await call(await hass_ws_client(hass), "flight", flight_id=1))["result"]
    assert result["battery"]["health_pct"] == 97
    assert result["weather"] is None
    assert result["start"]["lat"] == 48.75 and result["end"]["lat"] > 48.75
    assert result["source_name"] == "aaaa.txt"
    assert result["summary"]["id"] == 1


async def test_flight_unknown_id_returns_not_found(hass, hass_ws_client, setup_dronelog):
    response = await call(await hass_ws_client(hass), "flight", flight_id=999)
    assert not response["success"] and response["error"]["code"] == "not_found"


async def test_flight_without_position_has_null_start_and_has_position_false(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(lat=None, lon=None, samples=()))
    result = (await call(await hass_ws_client(hass), "flight", flight_id=1))["result"]
    assert result["start"] is None and result["end"] is None
    assert result["summary"]["has_position"] is False
    assert result["points"] == []


async def test_stats_months_and_drone_totals(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, start=later(0), duration=100, distance=1000, drone="D1"),
              make_flight(sha="2" * 64, start=later(40), duration=60, distance=50, drone="D2"))
    client = await hass_ws_client(hass)
    result = (await call(client, "stats"))["result"]
    assert result["totals"] == {"flights": 2, "duration_s": 160, "distance_m": 1050}
    assert [m["month"] for m in result["months"]] == ["2026-10", "2026-12"]
    assert {d["serial"]: d["flights"] for d in result["drones"]} == {"D1": 1, "D2": 1}
    filtered = (await call(client, "stats", drone="D2"))["result"]
    assert filtered["totals"]["flights"] == 1


async def test_batteries_history_sorted_by_time(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="2" * 64, battery="B1", start=later(2), battery_summary=make_battery(cycles=5)),
              make_flight(sha="1" * 64, battery="B1", start=later(1), battery_summary=make_battery(cycles=4)))
    battery = (await call(await hass_ws_client(hass), "batteries"))["result"]["batteries"][0]
    assert [p["cycles"] for p in battery["history"]] == [4, 5]
    assert battery["flights"] == 2 and battery["suffix"] == "B1"[-4:]
    assert {"time", "charge_end", "cycles", "health_pct", "cell_deviation_mv", "temp_max_c", "avg_power_w"} <= set(battery["history"][0])


async def test_heatmap_cells(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, lat=48.75, lon=12.4), make_flight(sha="2" * 64, lat=49.5, lon=13.0))
    cells = (await call(await hass_ws_client(hass), "heatmap", precision_m=300))["result"]["cells"]
    assert sorted(c["count"] for c in cells) == [1, 1]
    assert (await call(await hass_ws_client(hass), "heatmap", precision_m=10))["success"] is False


async def test_cell_flights(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, lat=48.75, lon=12.4), make_flight(sha="2" * 64, lat=49.5, lon=13.0, start=later(1)))
    flights = (await call(await hass_ws_client(hass), "cell_flights", lat=48.75, lon=12.4))["result"]["flights"]
    assert [f["id"] for f in flights] == [1]


COMMANDS = [("flights", {}), ("flight", {"flight_id": 1}), ("stats", {}), ("batteries", {}), ("heatmap", {}),
            ("cell_flights", {"lat": 48.75, "lon": 12.4})]


@pytest.mark.parametrize(("command", "data"), COMMANDS)
async def test_non_admin_is_rejected_on_every_command(hass, hass_ws_client, hass_read_only_access_token, setup_dronelog, command, data):
    await add(hass, make_flight())
    response = await call(await hass_ws_client(hass, hass_read_only_access_token), command, **data)
    assert not response["success"]
    assert response["error"]["code"] == "unauthorized"


@pytest.mark.parametrize(("command", "data"), COMMANDS)
async def test_commands_when_integration_not_loaded_return_error(hass, hass_ws_client, setup_dronelog, command, data):
    client = await hass_ws_client(hass)
    await hass.config_entries.async_unload(setup_dronelog.entry_id)
    await hass.async_block_till_done()
    response = await call(client, command, **data)
    assert not response["success"]
    assert response["error"]["code"] in ("not_loaded", "unknown_command")


async def test_flight_without_samples_and_empty_battery_returns_battery_null(hass, hass_ws_client, setup_dronelog):
    """Alte Logs ohne Zeitreihe haben Platzhalter-Akkuwerte (0): sie dürfen nicht als echte Messwerte erscheinen."""
    empty = make_battery(charge_start=0, charge_end=0, min_voltage=0.0, max_voltage=0.0, peak_current_a=0.0, avg_power_w=0.0, peak_power_w=0.0,
                         temp_min_c=0.0, temp_max_c=0.0, cell_deviation_max_v=0.0, full_capacity_mah=0, cycles=None, health_pct=None)
    await add(hass, make_flight(samples=(), battery_summary=empty))
    result = (await call(await hass_ws_client(hass), "flight", flight_id=1))["result"]
    assert result["battery"] is None


async def test_batteries_history_skips_placeholder_battery_values(hass, hass_ws_client, setup_dronelog):
    empty = make_battery(charge_start=0, charge_end=0, full_capacity_mah=0, peak_power_w=0.0, avg_power_w=0.0, temp_max_c=0.0, temp_min_c=0.0)
    await add(hass, make_flight(sha="1" * 64, battery="B1", start=later(1), samples=(), battery_summary=empty),
              make_flight(sha="2" * 64, battery="B1", start=later(2)))
    battery = (await call(await hass_ws_client(hass), "batteries"))["result"]["batteries"][0]
    assert battery["flights"] == 2
    assert len(battery["history"]) == 1


async def test_batteries_contain_the_drone_serials_they_flew_with(hass, hass_ws_client, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, battery="B1", drone="D1", start=later(1)), make_flight(sha="2" * 64, battery="B2", drone="D2", start=later(2)))
    batteries = {b["serial"]: b for b in (await call(await hass_ws_client(hass), "batteries"))["result"]["batteries"]}
    assert batteries["B1"]["drones"] == ["D1"]
    assert batteries["B2"]["drones"] == ["D2"]
