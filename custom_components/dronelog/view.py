"""HTTP-Endpunkte: Upload der Logdateien und Verbindungstest."""

from __future__ import annotations

import hashlib
import hmac
import shutil
from http import HTTPStatus

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from . import const
from .storage import RawLogStore


def _authorised(domain_data: dict, request: web.Request) -> bool:
    header = request.headers.get("Authorization", "")
    supplied = header.removeprefix("Bearer ").strip() if header.startswith("Bearer ") else ""
    return bool(supplied) and hmac.compare_digest(supplied, domain_data["token"])


def _error(message: str, status: HTTPStatus) -> web.Response:
    return web.json_response({"error": message}, status=status)


def _free_bytes(path) -> int:
    path.mkdir(parents=True, exist_ok=True)
    return shutil.disk_usage(path).free


class DroneLogUploadView(HomeAssistantView):
    """POST /api/dronelog/upload (eigene Token-Prüfung)."""

    url = "/api/dronelog/upload"
    name = "api:dronelog:upload"
    requires_auth = False

    async def post(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        domain_data = hass.data.get(const.DOMAIN)
        if not domain_data:
            return _error("Integration nicht aktiv", HTTPStatus.SERVICE_UNAVAILABLE)
        if not _authorised(domain_data, request):
            return _error("unauthorized", HTTPStatus.UNAUTHORIZED)
        expected = request.headers.get("X-SHA256", "").lower()
        if len(expected) != 64:
            return _error("X-SHA256 fehlt oder ist ungültig", HTTPStatus.BAD_REQUEST)
        if request.content_length and request.content_length > const.MAX_UPLOAD_BYTES:
            return _error("Datei zu groß", HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
        data = await request.read()
        if len(data) > const.MAX_UPLOAD_BYTES:
            return _error("Datei zu groß", HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
        actual = hashlib.sha256(data).hexdigest()
        if actual != expected:
            return _error("Hash stimmt nicht überein", HTTPStatus.BAD_REQUEST)
        store: RawLogStore = domain_data["store"]
        if await hass.async_add_executor_job(_free_bytes, store.base) - len(data) < const.MIN_FREE_BYTES:
            return _error("Zu wenig freier Speicherplatz", HTTPStatus.INSUFFICIENT_STORAGE)
        name = request.headers.get("X-Filename", "")
        status = await hass.async_add_executor_job(store.save, actual, name, data)
        await domain_data["processor"].enqueue(actual)
        return web.json_response({"status": status, "sha256": actual})


class DroneLogPingView(HomeAssistantView):
    """GET /api/dronelog/ping prüft Erreichbarkeit und Pairing-Code."""

    url = "/api/dronelog/ping"
    name = "api:dronelog:ping"
    requires_auth = False

    async def get(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        domain_data = hass.data.get(const.DOMAIN)
        if not domain_data:
            return _error("Integration nicht aktiv", HTTPStatus.SERVICE_UNAVAILABLE)
        if not _authorised(domain_data, request):
            return _error("unauthorized", HTTPStatus.UNAUTHORIZED)
        return web.json_response({"status": "ok", "app": "dronelog"})
