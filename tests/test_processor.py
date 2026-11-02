import asyncio
import hashlib
import json
import logging
from dataclasses import dataclass
from datetime import timedelta

import pytest

from custom_components.dronelog import processor as processor_module
from custom_components.dronelog.const import DOMAIN
from custom_components.dronelog.db import FlightStore
from custom_components.dronelog.models import FileStatus, WeatherSummary
from custom_components.dronelog.parser import DecryptError, KeyRejectedError, KeyRequiredError, KeyServiceError, ParseError
from custom_components.dronelog.processor import Options, Processor
from tests.conftest import TOKEN
from tests.factories import make_flight

WEATHER = WeatherSummary(9.0, 3.0, None, 6.0, 220.0, 0.0, 40, "open-meteo")


@dataclass
class Env:
    hass: object
    store: FlightStore
    raw: object
    options: Options
    parse_calls: list
    weather_calls: list
    processor: Processor


def write_raw(raw, sha, data=b"x", name="FlightRecord_x.txt"):
    (raw / f"{sha}.txt").write_bytes(data)
    (raw / f"{sha}.json").write_text(json.dumps({"name": name, "received": "2026-10-31T00:00:00+00:00"}))


@pytest.fixture
def env(hass, tmp_path, monkeypatch):
    raw = tmp_path / "raw"
    raw.mkdir()
    parse_calls, weather_calls = [], []

    def fake_parse(data, sha, api_key, stored, allow_fetch=True):
        parse_calls.append((sha, api_key))
        return make_flight(sha=sha)

    async def fake_weather(session, lat, lon, start, end, now=None):
        weather_calls.append((lat, lon))
        return WEATHER

    monkeypatch.setattr(processor_module, "parse_log", fake_parse)
    monkeypatch.setattr(processor_module, "fetch_weather", fake_weather)
    options = Options(api_key="KEY", weather_enabled=True)
    store = FlightStore(tmp_path / "d.db")
    proc = Processor(hass, store, raw, lambda: options, pause_s=0, retry_delay_s=0)
    return Env(hass, store, raw, options, parse_calls, weather_calls, proc)


async def run(env, *shas):
    for sha in shas:
        await env.processor.enqueue(sha)
    await env.processor.run_until_idle()


async def test_processor_processes_uploaded_file_and_stores_flight(env):
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    assert env.store.has_flight("a" * 64)
    assert env.store.file_status("a" * 64) == (FileStatus.PROCESSED, "")
    assert env.store.list_flights()[0].source_name == "FlightRecord_x.txt"
    assert env.store.get_flight(1).weather == WEATHER


async def test_processor_missing_key_sets_pending_key_and_keeps_queue_running(env, monkeypatch):
    def parse(data, sha, api_key, stored, allow_fetch=True):
        if sha == "1" * 64:
            raise KeyRequiredError("fehlt")
        return make_flight(sha=sha)

    monkeypatch.setattr(processor_module, "parse_log", parse)
    write_raw(env.raw, "1" * 64)
    write_raw(env.raw, "2" * 64)
    await run(env, "1" * 64, "2" * 64)
    assert env.store.file_status("1" * 64)[0] is FileStatus.PENDING_KEY
    assert env.store.has_flight("2" * 64)


@pytest.mark.parametrize(("error", "status"), [
    (ParseError("kaputt"), FileStatus.ERROR),
    (DecryptError("Key ungültig"), FileStatus.PENDING_KEY),
    (KeyServiceError("DJI down"), FileStatus.PENDING_KEY),
    (RuntimeError("unerwartet"), FileStatus.ERROR),
])
async def test_processor_error_mapping_and_queue_continues(env, monkeypatch, error, status):
    def parse(data, sha, api_key, stored, allow_fetch=True):
        if sha == "1" * 64:
            raise error
        return make_flight(sha=sha)

    monkeypatch.setattr(processor_module, "parse_log", parse)
    write_raw(env.raw, "1" * 64)
    write_raw(env.raw, "2" * 64)
    await run(env, "1" * 64, "2" * 64)
    assert env.store.file_status("1" * 64)[0] is status
    assert env.store.has_flight("2" * 64)


async def test_processor_missing_raw_file_sets_error(env):
    await run(env, "9" * 64)
    assert env.store.file_status("9" * 64)[0] is FileStatus.ERROR


async def test_processor_retries_pending_key_after_key_is_set(env, monkeypatch):
    keys = []

    def parse(data, sha, api_key, stored, allow_fetch=True):
        keys.append(api_key)
        if api_key is None:
            raise KeyRequiredError("fehlt")
        return make_flight(sha=sha)

    monkeypatch.setattr(processor_module, "parse_log", parse)
    env.options.api_key = None
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    assert env.store.file_status("a" * 64)[0] is FileStatus.PENDING_KEY
    env.options.api_key = "KEY"
    assert await env.processor.reprocess() == 1
    await env.processor.run_until_idle()
    assert env.store.has_flight("a" * 64)
    assert keys == [None, "KEY"]


async def test_processor_reprocess_includes_errors_only_when_asked(env):
    env.store.set_file_status("e" * 64, FileStatus.ERROR, "x")
    write_raw(env.raw, "e" * 64)
    assert await env.processor.reprocess() == 0
    assert await env.processor.reprocess(include_errors=True) == 1


async def test_processor_same_sha_twice_creates_one_flight(env):
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    await run(env, "a" * 64)
    assert env.store.totals().flights == 1
    assert len(env.parse_calls) == 1


async def test_processor_weather_failure_still_stores_flight(env, monkeypatch):
    async def none_weather(*args, **kwargs):
        return None

    monkeypatch.setattr(processor_module, "fetch_weather", none_weather)
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    assert env.store.has_flight("a" * 64)
    assert env.store.get_flight(1).weather is None


async def test_processor_skips_weather_when_disabled_or_no_position(env, monkeypatch):
    env.options.weather_enabled = False
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    assert env.weather_calls == []
    env.options.weather_enabled = True
    monkeypatch.setattr(processor_module, "parse_log", lambda d, sha, k, s, allow_fetch=True: make_flight(sha=sha, lat=None, lon=None, samples=()))
    write_raw(env.raw, "b" * 64)
    await run(env, "b" * 64)
    assert env.weather_calls == []


async def test_processor_restart_requeues_pending(env, hass, tmp_path):
    env.store.set_file_status("a" * 64, FileStatus.PENDING)
    write_raw(env.raw, "a" * 64)
    fresh = Processor(hass, env.store, env.raw, lambda: env.options, pause_s=0, retry_delay_s=0)
    assert await fresh.reprocess() == 1
    await fresh.run_until_idle()
    assert env.store.has_flight("a" * 64)


async def test_processor_fires_event_without_coordinates(env, hass):
    events = []
    hass.bus.async_listen("dronelog_flight_added", lambda event: events.append(event.data))
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    await hass.async_block_till_done()
    assert events and set(events[0]) == {"flight_id", "start"}


async def test_processor_log_lines_contain_no_coordinates_or_key(env, monkeypatch, caplog):
    def parse(data, sha, api_key, stored, allow_fetch=True):
        raise RuntimeError("lat=48.75 lon=12.40 key=SECRETKEY")

    monkeypatch.setattr(processor_module, "parse_log", parse)
    write_raw(env.raw, "a" * 64)
    with caplog.at_level(logging.DEBUG):
        await run(env, "a" * 64)
    assert "SECRETKEY" not in caplog.text and "48.75" not in caplog.text
    assert "SECRETKEY" not in env.store.file_status("a" * 64)[1]


async def test_upload_view_triggers_processing(hass_client_no_auth, setup_dronelog, hass, monkeypatch):
    monkeypatch.setattr(processor_module, "parse_log", lambda d, sha, k, s, allow_fetch=True: make_flight(sha=sha))

    async def no_weather(*args, **kwargs):
        return None

    monkeypatch.setattr(processor_module, "fetch_weather", no_weather)
    data = b"logdaten" * 10
    sha = hashlib.sha256(data).hexdigest()
    client = await hass_client_no_auth()
    resp = await client.post("/api/dronelog/upload", data=data, headers={
        "Authorization": f"Bearer {TOKEN}", "X-SHA256": sha, "X-Filename": "FlightRecord_t.txt"})
    assert resp.status == 200
    await hass.data[DOMAIN]["processor"].run_until_idle()
    assert hass.data[DOMAIN]["db"].has_flight(sha)


async def test_startup_enqueues_raw_files_without_database_entry(env):
    for sha in ("1" * 64, "2" * 64, "3" * 64):
        write_raw(env.raw, sha)
    env.store.add_flight(make_flight(sha="1" * 64), None, "bereits")
    env.store.set_file_status("3" * 64, FileStatus.ERROR, "alt")
    assert await env.processor.enqueue_unprocessed_raw() == 1   # nur "2": "1" ist fertig, "3" bleibt bewusst im Fehlerstatus
    await env.processor.run_until_idle()
    assert env.store.has_flight("2" * 64)
    assert not env.store.has_flight("3" * 64)
    assert len(env.parse_calls) == 1


async def test_startup_ignores_non_log_files_in_raw_dir(env):
    (env.raw / "notiz.txt").write_text("keine Logdatei")
    (env.raw / ".upload-abc.tmp").write_bytes(b"x")
    write_raw(env.raw, "2" * 64)
    assert await env.processor.enqueue_unprocessed_raw() == 1


async def test_processor_retries_after_invalid_key_is_fixed(env, monkeypatch):
    def parse(data, sha, api_key, stored, allow_fetch=True):
        if api_key == "BAD":
            raise DecryptError("ungültig")
        return make_flight(sha=sha)

    monkeypatch.setattr(processor_module, "parse_log", parse)
    env.options.api_key = "BAD"
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    assert env.store.file_status("a" * 64)[0] is FileStatus.PENDING_KEY
    env.options.api_key = "GOOD"
    assert await env.processor.reprocess() == 1
    await env.processor.run_until_idle()
    assert env.store.has_flight("a" * 64)


async def test_processor_stops_contacting_dji_after_service_failure(env, monkeypatch):
    fetch_flags = []

    def parse(data, sha, api_key, stored, allow_fetch=True):
        fetch_flags.append(allow_fetch)
        if allow_fetch:
            raise KeyServiceError("DJI down")
        raise KeyServiceError("pausiert")

    monkeypatch.setattr(processor_module, "parse_log", parse)
    for n in "123":
        write_raw(env.raw, n * 64)
    await run(env, "1" * 64, "2" * 64, "3" * 64)
    assert fetch_flags == [True, True, False, False]   # erste Datei wird einmal wiederholt, danach pausiert
    assert all(env.store.file_status(n * 64)[0] is FileStatus.PENDING_KEY for n in "123")


async def test_processor_db_failure_sets_error_not_pending(env, monkeypatch):
    def boom(*args, **kwargs):
        raise RuntimeError("Platte voll")

    monkeypatch.setattr(env.store, "add_flight", boom)
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    assert env.store.file_status("a" * 64)[0] is FileStatus.ERROR


async def test_reupload_of_deleted_flight_does_not_reimport(env):
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    env.store.delete_flight(1)
    await run(env, "a" * 64)
    assert not env.store.has_flight("a" * 64)
    assert len(env.parse_calls) == 1


async def test_reprocess_does_not_leave_processed_file_pending(env):
    write_raw(env.raw, "a" * 64)
    await run(env, "a" * 64)
    await env.processor.reprocess(include_errors=True)
    assert env.store.file_status("a" * 64)[0] is FileStatus.PROCESSED
    assert env.store.overview().pending == 0


async def test_enqueue_same_sha_concurrently_fires_event_once(env, hass):
    import asyncio

    events = []
    hass.bus.async_listen("dronelog_flight_added", lambda event: events.append(event.data))
    write_raw(env.raw, "a" * 64)
    await asyncio.gather(env.processor.enqueue("a" * 64), env.processor.enqueue("a" * 64))
    await env.processor.run_until_idle()
    await hass.async_block_till_done()
    assert len(events) == 1
    assert len(env.parse_calls) == 1


async def test_shutdown_stops_worker_and_clears_queue(env, hass, monkeypatch):
    import threading

    gate = threading.Event()
    calls = []

    def slow_parse(data, sha, api_key, stored, allow_fetch=True):
        calls.append(sha)
        gate.wait(timeout=5)
        return make_flight(sha=sha)

    monkeypatch.setattr(processor_module, "parse_log", slow_parse)
    for n in "123":
        write_raw(env.raw, n * 64)
        await env.processor.enqueue(n * 64)
    await hass.async_add_executor_job(lambda: None)  # Worker hat die erste Datei begonnen
    await env.processor.async_shutdown()
    gate.set()
    await hass.async_block_till_done()
    assert env.processor.is_idle
    assert len(calls) == 1
    assert not env.store.has_flight("2" * 64) and not env.store.has_flight("3" * 64)


async def test_pending_key_files_are_retried_hourly(hass, setup_dronelog, tmp_path, monkeypatch):
    from homeassistant.util import dt as dt_util
    from pytest_homeassistant_custom_component.common import async_fire_time_changed

    monkeypatch.setattr(processor_module, "parse_log", lambda d, sha, k, s, allow_fetch=True: make_flight(sha=sha))

    async def no_weather(*args, **kwargs):
        return None

    monkeypatch.setattr(processor_module, "fetch_weather", no_weather)
    raw = tmp_path / "dronelog" / "raw"
    raw.mkdir(parents=True, exist_ok=True)
    sha = "f" * 64
    (raw / f"{sha}.txt").write_bytes(b"x")
    db = hass.data[DOMAIN]["db"]
    await hass.async_add_executor_job(db.set_file_status, sha, FileStatus.PENDING_KEY, "x")
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(hours=1, minutes=1))
    await hass.async_block_till_done(wait_background_tasks=True)
    assert db.has_flight(sha)


async def test_processor_rejected_file_is_error_and_does_not_block_others(env, monkeypatch):
    flags = []

    def parse(data, sha, api_key, stored, allow_fetch=True):
        flags.append(allow_fetch)
        if sha == "1" * 64:
            raise KeyRejectedError("DJI lehnt ab (400)")
        return make_flight(sha=sha)

    monkeypatch.setattr(processor_module, "parse_log", parse)
    for n in "12":
        write_raw(env.raw, n * 64)
    await run(env, "1" * 64, "2" * 64)
    assert env.store.file_status("1" * 64)[0] is FileStatus.ERROR
    assert env.store.has_flight("2" * 64)
    assert flags == [True, True]


async def test_processor_retries_transient_service_error_once_before_blocking(env, monkeypatch):
    attempts = []

    def parse(data, sha, api_key, stored, allow_fetch=True):
        attempts.append(sha)
        if len(attempts) == 1:
            raise KeyServiceError("kurzer Aussetzer")
        return make_flight(sha=sha)

    monkeypatch.setattr(processor_module, "parse_log", parse)
    write_raw(env.raw, "a" * 64)
    write_raw(env.raw, "b" * 64)
    await run(env, "a" * 64, "b" * 64)
    assert env.store.has_flight("a" * 64) and env.store.has_flight("b" * 64)
    assert attempts == ["a" * 64, "a" * 64, "b" * 64]


# --- Offline-Neuauswertung veralteter Flüge -------------------------------------------------------

def _outdated(env, sha, **flight_kwargs):
    env.store.add_flight(make_flight(sha=sha, **flight_kwargs), WEATHER, "orig.txt")
    with env.store._connect() as conn:
        conn.execute("UPDATE flights SET analysis_version=1 WHERE sha256=?", (sha,))


async def test_reanalyze_replaces_outdated_flight_offline_and_keeps_id_weather_source(env, monkeypatch):
    sha = "a" * 64
    _outdated(env, sha)
    write_raw(env.raw, sha)
    calls = []

    def parse(data, s, api_key, stored, allow_fetch=True):
        calls.append((api_key, stored, allow_fetch))
        return make_flight(sha=s, duration=999.0)

    monkeypatch.setattr(processor_module, "parse_log", parse)
    report = await env.processor.reanalyze_outdated()
    assert report == {"reanalyzed": 1, "skipped": 0, "failed": 0}
    assert calls == [(None, None, False)]  # nie ein Netzzugriff
    assert env.store.shas_needing_reanalysis() == []
    detail = env.store.get_flight(1)
    assert detail.weather == WEATHER and detail.row.source_name == "orig.txt" and detail.row.id == 1


async def test_reanalyze_uses_stored_keychains(env, monkeypatch):
    sha = "a" * 64
    _outdated(env, sha, keychains="KC")
    write_raw(env.raw, sha)
    seen = []
    monkeypatch.setattr(processor_module, "parse_log", lambda d, s, k, stored, allow_fetch=True: seen.append(stored) or make_flight(sha=s))
    await env.processor.reanalyze_outdated()
    assert seen == ["KC"]


async def test_reanalyze_missing_raw_or_parse_error_keeps_flight_and_is_not_retried(env, monkeypatch):
    _outdated(env, "1" * 64)  # Rohdatei fehlt
    _outdated(env, "2" * 64, start=None)
    write_raw(env.raw, "2" * 64)

    def parse(data, s, api_key, stored, allow_fetch=True):
        raise ParseError("kaputt")

    monkeypatch.setattr(processor_module, "parse_log", parse)
    report = await env.processor.reanalyze_outdated()
    assert report == {"reanalyzed": 0, "skipped": 2, "failed": 0}
    assert env.store.shas_needing_reanalysis() == []  # dauerhaft: kein erneuter Versuch bei jedem Start
    assert env.store.has_flight("1" * 64) and env.store.has_flight("2" * 64)
    assert len(env.store.get_flight(1).samples) == 5  # alte Daten unverändert


async def test_reanalyze_unexpected_error_is_retried_next_time(env, monkeypatch):
    _outdated(env, "1" * 64)
    write_raw(env.raw, "1" * 64)

    def parse(data, s, api_key, stored, allow_fetch=True):
        raise RuntimeError("unerwartet")

    monkeypatch.setattr(processor_module, "parse_log", parse)
    assert (await env.processor.reanalyze_outdated())["failed"] == 1
    assert env.store.shas_needing_reanalysis() == ["1" * 64]


async def test_reanalyze_key_required_marks_current_and_counts_skipped(env, monkeypatch):
    sha = "a" * 64
    _outdated(env, sha)
    write_raw(env.raw, sha)

    def parse(data, s, api_key, stored, allow_fetch=True):
        raise KeyRequiredError("fehlt")

    monkeypatch.setattr(processor_module, "parse_log", parse)
    report = await env.processor.reanalyze_outdated()
    assert report == {"reanalyzed": 0, "skipped": 1, "failed": 0}
    assert env.store.shas_needing_reanalysis() == []
    assert len(env.store.get_flight(1).samples) == 5  # alte Daten unverändert


async def test_reanalyze_flight_without_frames_is_set_current(env, monkeypatch):
    sha = "a" * 64
    _outdated(env, sha)
    write_raw(env.raw, sha)
    monkeypatch.setattr(processor_module, "parse_log", lambda d, s, k, stored, allow_fetch=True: make_flight(sha=s, samples=()))
    report = await env.processor.reanalyze_outdated()
    assert report["reanalyzed"] == 1
    assert env.store.shas_needing_reanalysis() == []


async def test_reanalyze_does_nothing_when_current_and_logs_counts(env, caplog):
    env.store.add_flight(make_flight(), None, "x.txt")
    with caplog.at_level(logging.INFO):
        assert await env.processor.reanalyze_outdated() == {"reanalyzed": 0, "skipped": 0, "failed": 0}
    assert not env.parse_calls


async def test_reanalyze_logs_counts_without_serials(env, monkeypatch, caplog):
    _outdated(env, "a" * 64)
    write_raw(env.raw, "a" * 64)
    with caplog.at_level(logging.DEBUG):
        await env.processor.reanalyze_outdated()
    assert "1 aktualisiert" in caplog.text and "a" * 64 not in caplog.text


async def test_reanalyze_summary_is_not_logged_above_debug(env, caplog):
    _outdated(env, "a" * 64)
    write_raw(env.raw, "a" * 64)
    with caplog.at_level(logging.INFO):
        await env.processor.reanalyze_outdated()
    assert "aktualisiert" not in caplog.text


async def test_startup_reanalyzes_outdated_flights(hass, tmp_path, monkeypatch):
    from pytest_homeassistant_custom_component.common import MockConfigEntry

    base = tmp_path / DOMAIN
    (base / "raw").mkdir(parents=True)
    sha = "a" * 64
    store = FlightStore(base / "dronelog.db")
    store.add_flight(make_flight(sha=sha), None, "orig.txt")
    with store._connect() as conn:
        conn.execute("UPDATE flights SET analysis_version=1")
    write_raw(base / "raw", sha)
    monkeypatch.setattr(processor_module, "parse_log", lambda d, s, k, st, allow_fetch=True: make_flight(sha=s, duration=777.0))
    hass.config.config_dir = str(tmp_path)
    entry = MockConfigEntry(domain=DOMAIN, data={"token": TOKEN})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    for _ in range(100):  # Hintergrundaufgabe: kurz abwarten
        if not store.shas_needing_reanalysis():
            break
        await asyncio.sleep(0.05)
    assert store.shas_needing_reanalysis() == []
