from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.dronelog.const import CONF_TOKEN, DEFAULT_TILE_URL, DOMAIN


async def test_config_flow_creates_entry_with_long_token(hass):
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] is FlowResultType.FORM
    shown = result["description_placeholders"]["token"]
    result = await hass.config_entries.flow.async_configure(result["flow_id"], user_input={})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert len(result["data"][CONF_TOKEN]) >= 32
    assert result["data"][CONF_TOKEN] == shown


async def test_config_flow_allows_only_one_instance(hass):
    MockConfigEntry(domain=DOMAIN, data={CONF_TOKEN: "x" * 40}).add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"


async def test_options_flow_regenerates_token(hass, tmp_path):
    hass.config.config_dir = str(tmp_path)
    entry = MockConfigEntry(domain=DOMAIN, data={CONF_TOKEN: "x" * 40})
    entry.add_to_hass(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["description_placeholders"]["token"] == "x" * 40
    result = await hass.config_entries.options.async_configure(result["flow_id"], user_input={"regenerate": True})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.data[CONF_TOKEN] != "x" * 40
    assert len(entry.data[CONF_TOKEN]) >= 32


async def _setup(hass, tmp_path, options=None):
    hass.config.config_dir = str(tmp_path)
    entry = MockConfigEntry(domain=DOMAIN, data={CONF_TOKEN: "x" * 40}, options=options or {})
    entry.add_to_hass(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_options_flow_saves_api_key_and_weather_flag(hass, tmp_path):
    entry = await _setup(hass, tmp_path)
    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], user_input={"api_key": "DJIKEY", "weather_enabled": False, "regenerate": False})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options == {"api_key": "DJIKEY", "weather_enabled": False, "tile_url": DEFAULT_TILE_URL}


async def test_options_flow_blank_key_keeps_existing_key(hass, tmp_path):
    entry = await _setup(hass, tmp_path, {"api_key": "ALT", "weather_enabled": True})
    result = await hass.config_entries.options.async_init(entry.entry_id)
    await hass.config_entries.options.async_configure(result["flow_id"], user_input={"api_key": "", "weather_enabled": True})
    assert entry.options["api_key"] == "ALT"


async def test_options_flow_never_echoes_api_key(hass, tmp_path):
    entry = await _setup(hass, tmp_path, {"api_key": "GEHEIMERKEY", "weather_enabled": True})
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert "GEHEIMERKEY" not in str(result["description_placeholders"])
    assert "GEHEIMERKEY" not in str(result["data_schema"].schema)
    assert "GEHEIMERKEY" not in str(result["data_schema"].schema.keys())


async def test_saving_options_reprocesses_files_waiting_for_key(hass, tmp_path, monkeypatch):
    from custom_components.dronelog import processor as processor_module
    from custom_components.dronelog.models import FileStatus
    from tests.factories import make_flight

    entry = await _setup(hass, tmp_path)
    keys = []

    def parse(data, sha, api_key, stored, allow_fetch=True):
        keys.append(api_key)
        if not api_key:
            from custom_components.dronelog.parser import KeyRequiredError
            raise KeyRequiredError("fehlt")
        return make_flight(sha=sha)

    async def no_weather(*args, **kwargs):
        return None

    monkeypatch.setattr(processor_module, "parse_log", parse)
    monkeypatch.setattr(processor_module, "fetch_weather", no_weather)
    raw = tmp_path / "dronelog" / "raw"
    raw.mkdir(parents=True, exist_ok=True)
    sha = "c" * 64
    (raw / f"{sha}.txt").write_bytes(b"x")
    processor = hass.data[DOMAIN]["processor"]
    await processor.enqueue(sha)
    await processor.run_until_idle()
    assert hass.data[DOMAIN]["db"].file_status(sha)[0] is FileStatus.PENDING_KEY
    result = await hass.config_entries.options.async_init(entry.entry_id)
    await hass.config_entries.options.async_configure(result["flow_id"], user_input={"api_key": "NEU", "weather_enabled": True})
    await hass.async_block_till_done()
    await hass.data[DOMAIN]["processor"].run_until_idle()
    assert hass.data[DOMAIN]["db"].has_flight(sha)
