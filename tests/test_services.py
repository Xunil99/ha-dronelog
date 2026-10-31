import json

from custom_components.dronelog import processor as processor_module
from custom_components.dronelog.const import DOMAIN
from custom_components.dronelog.models import FileStatus
from tests.factories import make_flight


async def test_service_reprocess_requeues_failed_files(hass, setup_dronelog, tmp_path, monkeypatch):
    monkeypatch.setattr(processor_module, "parse_log", lambda d, sha, k, s: make_flight(sha=sha))

    async def no_weather(*args, **kwargs):
        return None

    monkeypatch.setattr(processor_module, "fetch_weather", no_weather)
    raw = tmp_path / "dronelog" / "raw"
    raw.mkdir(parents=True, exist_ok=True)
    sha = "d" * 64
    (raw / f"{sha}.txt").write_bytes(b"x")
    db = hass.data[DOMAIN]["db"]
    db.set_file_status(sha, FileStatus.ERROR, "alt")
    await hass.services.async_call(DOMAIN, "reprocess", {}, blocking=True)
    await hass.data[DOMAIN]["processor"].run_until_idle()
    assert db.has_flight(sha)


async def test_service_delete_flight_keeps_raw_file(hass, setup_dronelog, tmp_path):
    raw = tmp_path / "dronelog" / "raw"
    raw.mkdir(parents=True, exist_ok=True)
    sha = "a" * 64
    (raw / f"{sha}.txt").write_bytes(b"x")
    db = hass.data[DOMAIN]["db"]
    flight_id = db.add_flight(make_flight(sha=sha), None, "n")
    await hass.services.async_call(DOMAIN, "delete_flight", {"flight_id": flight_id}, blocking=True)
    assert db.get_flight(flight_id) is None
    assert (raw / f"{sha}.txt").exists()
