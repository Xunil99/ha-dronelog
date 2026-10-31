from datetime import UTC, datetime

from homeassistant.helpers import entity_registry as er

from custom_components.dronelog.const import DOMAIN
from custom_components.dronelog.models import FileStatus
from tests.factories import later, make_battery, make_flight


def state(hass, entry, platform, key):
    registry = er.async_get(hass)
    entity_id = registry.async_get_entity_id(platform, DOMAIN, f"{entry.entry_id}_{key}")
    assert entity_id, f"Entität {key} nicht registriert"
    return hass.states.get(entity_id)


def battery_state(hass, platform, serial, key):
    registry = er.async_get(hass)
    entity_id = registry.async_get_entity_id(platform, DOMAIN, f"battery_{serial}_{key}")
    assert entity_id, f"Akku-Entität {key} nicht registriert"
    return hass.states.get(entity_id)


async def add(hass, *flights):
    db = hass.data[DOMAIN]["db"]
    for flight in flights:
        await hass.async_add_executor_job(db.add_flight, flight, None, "x")
    hass.bus.async_fire("dronelog_flight_added", {"flight_id": 1, "start": "2026-10-27T13:11:11+00:00"})
    await hass.async_block_till_done()


async def test_sensors_show_totals_after_flight_added(hass, setup_dronelog):
    entry = setup_dronelog
    assert state(hass, entry, "sensor", "flights_total").state == "0"
    await add(hass, make_flight(sha="1" * 64, duration=3600, distance=1000), make_flight(sha="2" * 64, start=later(1), duration=1800, distance=2000))
    assert state(hass, entry, "sensor", "flights_total").state == "2"
    assert float(state(hass, entry, "sensor", "flight_time_total").state) == 1.5
    assert float(state(hass, entry, "sensor", "distance_total").state) == 3.0


async def test_last_flight_sensors(hass, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, duration=300, distance=1500))
    entry = setup_dronelog
    assert datetime.fromisoformat(state(hass, entry, "sensor", "last_flight").state) == datetime(2026, 10, 27, 13, 11, 11, tzinfo=UTC)
    assert float(state(hass, entry, "sensor", "last_flight_duration").state) == 5.0
    assert float(state(hass, entry, "sensor", "last_flight_distance").state) == 1.5
    assert float(state(hass, entry, "sensor", "last_flight_max_height").state) == 40.7


async def test_battery_device_has_health_and_cycles(hass, setup_dronelog):
    await add(hass, make_flight(battery="BATSERIAL1", battery_summary=make_battery(health_pct=97, cycles=12, charge_end=79,
                                                                                    cell_deviation_max_v=0.003, temp_max_c=33.5)))
    assert battery_state(hass, "sensor", "BATSERIAL1", "health").state == "97"
    assert battery_state(hass, "sensor", "BATSERIAL1", "cycles").state == "12"
    assert battery_state(hass, "sensor", "BATSERIAL1", "charge_end_last_flight").state == "79"
    assert float(battery_state(hass, "sensor", "BATSERIAL1", "cell_deviation_last_flight").state) == 3.0
    assert float(battery_state(hass, "sensor", "BATSERIAL1", "temperature_max_last_flight").state) == 33.5
    assert battery_state(hass, "sensor", "BATSERIAL1", "flights").state == "1"


async def test_drone_device_counts_flights(hass, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64, drone="DRONEX"), make_flight(sha="2" * 64, drone="DRONEX", start=later(1)))
    registry = er.async_get(hass)
    entity_id = registry.async_get_entity_id("sensor", DOMAIN, "drone_DRONEX_flights")
    assert hass.states.get(entity_id).state == "2"


async def test_missing_health_is_unknown_not_zero(hass, setup_dronelog):
    await add(hass, make_flight(battery="B9", battery_summary=make_battery(health_pct=None, cycles=None)))
    assert battery_state(hass, "sensor", "B9", "health").state == "unknown"


async def test_event_entity_fires_on_new_flight(hass, setup_dronelog):
    entry = setup_dronelog
    await add(hass, make_flight())
    event_state = state(hass, entry, "event", "new_flight")
    assert event_state.attributes["event_type"] == "flight_added"


async def test_pending_and_error_counters(hass, setup_dronelog):
    entry = setup_dronelog
    db = hass.data[DOMAIN]["db"]
    await hass.async_add_executor_job(db.set_file_status, "a" * 64, FileStatus.PENDING_KEY)
    await hass.async_add_executor_job(db.set_file_status, "b" * 64, FileStatus.ERROR, "x")
    hass.bus.async_fire("dronelog_queue_changed")
    await hass.async_block_till_done()
    assert state(hass, entry, "sensor", "files_pending").state == "1"
    assert state(hass, entry, "sensor", "files_error").state == "1"


async def test_no_coordinates_or_serials_in_state_attributes(hass, setup_dronelog):
    await add(hass, make_flight(battery="GEHEIMBAT123", drone="GEHEIMDRONE456", lat=48.7512, lon=12.4034))
    for entity_state in hass.states.async_all():
        if not entity_state.entity_id.split(".")[1].startswith("dronelog") and DOMAIN not in entity_state.entity_id:
            continue
        text = str(entity_state.attributes) + entity_state.state
        for secret in ("48.75", "12.40", "GEHEIMBAT123", "GEHEIMDRONE456", "latitude", "longitude"):
            assert secret not in text, f"{secret} in {entity_state.entity_id}"


async def test_device_name_shows_only_serial_suffix(hass, setup_dronelog):
    from homeassistant.helpers import device_registry as dr

    await add(hass, make_flight(battery="B39PP1GAA0H413"))
    device = next(d for d in dr.async_entries_for_config_entry(dr.async_get(hass), setup_dronelog.entry_id) if (DOMAIN, "battery_B39PP1GAA0H413") in d.identifiers)
    assert device is not None
    assert "B39PP1GAA0H413" not in device.name
    assert device.name.endswith("H413")


async def test_totals_use_total_state_class_not_total_increasing(hass, setup_dronelog):
    await add(hass, make_flight())
    from homeassistant.components.sensor import SensorStateClass

    for key in ("flights_total", "flight_time_total", "distance_total"):
        assert state(hass, setup_dronelog, "sensor", key).attributes["state_class"] == SensorStateClass.TOTAL


async def test_delete_flight_refreshes_sensors_immediately(hass, setup_dronelog):
    await add(hass, make_flight(sha="1" * 64), make_flight(sha="2" * 64, start=later(1)))
    assert state(hass, setup_dronelog, "sensor", "flights_total").state == "2"
    await hass.services.async_call(DOMAIN, "delete_flight", {"flight_id": 1}, blocking=True)
    await hass.async_block_till_done()
    assert state(hass, setup_dronelog, "sensor", "flights_total").state == "1"
