"""Wetter und Wind zur Flugzeit aus Open-Meteo (kein Schlüssel nötig)."""

from __future__ import annotations

import asyncio
import logging
import math
from datetime import UTC, datetime, timedelta

import aiohttp

from .models import WeatherSummary

_LOGGER = logging.getLogger(__name__)

ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive"
FORECAST_URL = "https://api.open-meteo.com/v1/forecast"
ARCHIVE_AFTER = timedelta(days=7)
TIMEOUT = aiohttp.ClientTimeout(total=10)
HOURLY = "temperature_2m,wind_speed_10m,wind_speed_80m,wind_gusts_10m,wind_direction_10m,precipitation,cloud_cover"


def _hour(moment: datetime) -> datetime:
    return moment.astimezone(UTC).replace(minute=0, second=0, microsecond=0)


def _mean(values: list[float]) -> float:
    return sum(values) / len(values)


async def fetch_weather(session: aiohttp.ClientSession, lat: float, lon: float, start: datetime, end: datetime,
                        now: datetime | None = None) -> WeatherSummary | None:
    """Liefert Mittelwerte über die Flugzeit (Böen: Maximum) oder None; wirft nie."""
    now = now or datetime.now(UTC)
    params = {"latitude": f"{lat:.4f}", "longitude": f"{lon:.4f}", "hourly": HOURLY, "wind_speed_unit": "ms", "timezone": "UTC"}
    if now - end > ARCHIVE_AFTER:
        url = ARCHIVE_URL
        params |= {"start_date": start.astimezone(UTC).date().isoformat(), "end_date": end.astimezone(UTC).date().isoformat()}
    else:
        url = FORECAST_URL
        params |= {"past_days": "8", "forecast_days": "1"}
    try:
        async with session.get(url, params=params, timeout=TIMEOUT) as response:
            if response.status != 200:
                _LOGGER.debug("Open-Meteo antwortete mit Status %s", response.status)
                return None
            payload = await response.json()
        return _summarise(payload["hourly"], _hour(start), _hour(end))
    except (TimeoutError, asyncio.TimeoutError, aiohttp.ClientError, KeyError, ValueError, TypeError) as err:
        # Bewusst ohne Ausnahmetext/Traceback: die URL (mit Koordinaten) darf nicht ins Log.
        _LOGGER.debug("Wetterabfrage fehlgeschlagen (%s)", type(err).__name__)
        return None


def _summarise(hourly: dict, first: datetime, last: datetime) -> WeatherSummary | None:
    indexes = [i for i, text in enumerate(hourly["time"])
               if first <= datetime.fromisoformat(text).replace(tzinfo=UTC) <= last]
    if not indexes:
        return None

    def column(name: str) -> list[float]:
        values = hourly.get(name) or []
        return [values[i] for i in indexes if i < len(values) and values[i] is not None]

    temperature, wind, gust = column("temperature_2m"), column("wind_speed_10m"), column("wind_gusts_10m")
    if not (temperature and wind and gust):
        return None
    wind80, rain, cloud, direction = column("wind_speed_80m"), column("precipitation"), column("cloud_cover"), column("wind_direction_10m")
    sin = _mean([math.sin(math.radians(d)) for d in direction]) if direction else 0.0
    cos = _mean([math.cos(math.radians(d)) for d in direction]) if direction else 0.0
    return WeatherSummary(
        temperature_c=round(_mean(temperature), 1),
        wind_10m_ms=round(_mean(wind), 1),
        wind_80m_ms=round(_mean(wind80), 1) if wind80 else None,
        gust_ms=max(gust),
        wind_dir_deg=round(math.degrees(math.atan2(sin, cos)) % 360, 0),
        precipitation_mm=round(sum(rain), 1),
        cloud_cover_pct=round(_mean(cloud)) if cloud else 0,
        source="open-meteo",
    )
