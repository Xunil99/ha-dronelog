"""Config- und Options-Flow: erzeugt und zeigt den Pairing-Code."""

from __future__ import annotations

import secrets
from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback

from .const import CONF_TOKEN, DOMAIN, TOKEN_BYTES


def _new_token() -> str:
    return secrets.token_urlsafe(TOKEN_BYTES)


class DroneLogConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    def __init__(self) -> None:
        self._token = _new_token()

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(title="DroneLog", data={CONF_TOKEN: self._token})
        return self.async_show_form(step_id="user", description_placeholders={"token": self._token})

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        return DroneLogOptionsFlow()


class DroneLogOptionsFlow(OptionsFlow):
    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            if user_input.get("regenerate"):
                self.hass.config_entries.async_update_entry(
                    self.config_entry, data={**self.config_entry.data, CONF_TOKEN: _new_token()}
                )
            return self.async_create_entry(data={})
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema({vol.Optional("regenerate", default=False): bool}),
            description_placeholders={"token": self.config_entry.data[CONF_TOKEN]},
        )
