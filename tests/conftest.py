import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.dronelog.const import CONF_TOKEN, DOMAIN

TOKEN = "t" * 40


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    yield


@pytest.fixture
async def setup_dronelog(hass, tmp_path):
    hass.config.config_dir = str(tmp_path)
    entry = MockConfigEntry(domain=DOMAIN, data={CONF_TOKEN: TOKEN})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry
