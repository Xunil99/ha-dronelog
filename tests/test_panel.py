from homeassistant.components.frontend import DATA_PANELS
from homeassistant.data_entry_flow import FlowResultType

from custom_components.dronelog.const import DEFAULT_TILE_URL, DOMAIN


def panel(hass):
    return hass.data[DATA_PANELS].get("dronelog")


async def test_panel_registered_for_admins_only_with_tile_config(hass, setup_dronelog):
    p = panel(hass)
    assert p is not None
    assert p.require_admin is True
    assert p.sidebar_title == "Drohnenflüge"
    assert p.sidebar_icon == "mdi:quadcopter"
    assert p.config["tile_url"] == DEFAULT_TILE_URL
    assert p.config["_panel_custom"]["name"] == "dronelog-panel"
    assert "/dronelog_static/dronelog-panel.js?v=" in p.config["_panel_custom"]["module_url"]


async def test_static_path_serves_bundle(hass, hass_client, setup_dronelog):
    client = await hass_client()
    resp = await client.get("/dronelog_static/dronelog-panel.js")
    assert resp.status == 200


async def test_panel_removed_on_unload(hass, setup_dronelog):
    await hass.config_entries.async_unload(setup_dronelog.entry_id)
    await hass.async_block_till_done()
    assert panel(hass) is None


async def test_options_flow_default_tile_url(hass, setup_dronelog):
    result = await hass.config_entries.options.async_init(setup_dronelog.entry_id)
    defaults = {str(k): k.default() for k in result["data_schema"].schema if hasattr(k, "default") and callable(k.default)}
    assert defaults["tile_url"] == DEFAULT_TILE_URL


async def test_options_flow_validates_tile_url_placeholders(hass, setup_dronelog):
    result = await hass.config_entries.options.async_init(setup_dronelog.entry_id)
    for bad in ("https://tiles.example/{z}/{x}.png", "ftp://tiles.example/{z}/{x}/{y}.png", "kein-link"):
        outcome = await hass.config_entries.options.async_configure(
            result["flow_id"], user_input={"api_key": "", "weather_enabled": True, "tile_url": bad})
        assert outcome["type"] is FlowResultType.FORM, bad
        assert outcome["errors"] == {"tile_url": "invalid_tile_url"}


async def test_saving_new_tile_url_updates_panel_config(hass, setup_dronelog):
    result = await hass.config_entries.options.async_init(setup_dronelog.entry_id)
    new = "https://tiles.example/{z}/{x}/{y}.png"
    outcome = await hass.config_entries.options.async_configure(
        result["flow_id"], user_input={"api_key": "", "weather_enabled": True, "tile_url": new})
    assert outcome["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    assert panel(hass).config["tile_url"] == new
