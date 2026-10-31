from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.dronelog.const import CONF_TOKEN, DOMAIN


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
