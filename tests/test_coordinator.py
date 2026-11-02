from unittest.mock import patch

from custom_components.dronelog import coordinator as coordinator_module
from custom_components.dronelog.const import DOMAIN
from tests.factories import make_flight


async def test_refresh_loads_headers_only_once(hass, setup_dronelog):
    db = hass.data[DOMAIN]["db"]
    coordinator = hass.data[DOMAIN]["coordinator"]
    await hass.async_add_executor_job(db.add_flight, make_flight(), None, "x")
    calls = []
    original = db.flight_headers

    def counting(*args, **kwargs):
        calls.append(1)
        return original(*args, **kwargs)

    with patch.object(db, "flight_headers", counting):
        await coordinator.async_refresh()
    assert len(calls) == 1


async def test_maintenance_failure_does_not_fail_refresh(hass, setup_dronelog):
    coordinator = hass.data[DOMAIN]["coordinator"]
    with patch.object(coordinator_module, "async_check_maintenance", side_effect=RuntimeError("boom")):
        await coordinator.async_refresh()
    assert coordinator.last_update_success is True


async def test_event_burst_is_debounced(hass, setup_dronelog):
    coordinator = hass.data[DOMAIN]["coordinator"]
    db = hass.data[DOMAIN]["db"]
    calls = []
    original = db.overview

    def counting():
        calls.append(1)
        return original()

    with patch.object(db, "overview", counting):
        for _ in range(5):
            hass.bus.async_fire("dronelog_queue_changed")
        await hass.async_block_till_done()
    assert len(calls) <= 1
