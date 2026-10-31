import asyncio
from datetime import UTC, datetime, timedelta

import aiohttp

from custom_components.dronelog.weather import fetch_weather

START = datetime(2026, 10, 27, 13, 30, tzinfo=UTC)
END = datetime(2026, 10, 27, 14, 20, tzinfo=UTC)


class FakeResponse:
    def __init__(self, status=200, payload=None):
        self.status = status
        self._payload = payload

    async def json(self):
        return self._payload

    async def __aenter__(self):
        return self

    async def __aexit__(self, *exc):
        return False


class FakeSession:
    def __init__(self, response=None, error=None):
        self.response, self.error, self.calls = response, error, []

    def get(self, url, params=None, timeout=None):
        self.calls.append((url, params))
        if self.error:
            raise self.error
        return self.response


def hourly(times, temp, wind, gust, direction, rain, cloud, wind80=None):
    data = {"time": times, "temperature_2m": temp, "wind_speed_10m": wind, "wind_gusts_10m": gust,
            "wind_direction_10m": direction, "precipitation": rain, "cloud_cover": cloud}
    if wind80 is not None:
        data["wind_speed_80m"] = wind80
    return {"hourly": data}


PAYLOAD = hourly(["2026-10-27T12:00", "2026-10-27T13:00", "2026-10-27T14:00", "2026-10-27T15:00"],
                 [5, 8, 10, 20], [1, 2, 4, 9], [2, 5, 7, 20], [90, 350, 10, 90], [0, 0.2, 0.4, 9], [10, 40, 60, 100],
                 [3, 4, 6, 9])


async def test_uses_archive_for_old_flights():
    session = FakeSession(FakeResponse(payload=PAYLOAD))
    await fetch_weather(session, 48.75, 12.4, START, END, now=END + timedelta(days=30))
    assert "archive-api.open-meteo.com" in session.calls[0][0]


async def test_uses_forecast_for_recent_flights():
    session = FakeSession(FakeResponse(payload=PAYLOAD))
    await fetch_weather(session, 48.75, 12.4, START, END, now=END + timedelta(days=1))
    url, params = session.calls[0]
    assert "api.open-meteo.com/v1/forecast" in url
    assert "past_days" in params


async def test_averages_flight_hours_and_takes_max_gust():
    session = FakeSession(FakeResponse(payload=PAYLOAD))
    weather = await fetch_weather(session, 48.75, 12.4, START, END, now=END + timedelta(days=30))
    # Flug 13:30 bis 14:20 UTC berührt die Stunden 13 und 14
    assert weather.temperature_c == 9.0
    assert weather.wind_10m_ms == 3.0
    assert weather.wind_80m_ms == 5.0
    assert weather.gust_ms == 7
    assert weather.precipitation_mm == 0.6
    assert weather.cloud_cover_pct == 50
    assert weather.source == "open-meteo"


async def test_wind_direction_is_circular_mean():
    session = FakeSession(FakeResponse(payload=PAYLOAD))
    weather = await fetch_weather(session, 48.75, 12.4, START, END, now=END + timedelta(days=30))
    assert min(weather.wind_dir_deg, 360 - weather.wind_dir_deg) < 1.0  # Mittel aus 350 und 10 ist Nord


async def test_returns_none_on_http_error():
    assert await fetch_weather(FakeSession(FakeResponse(status=500)), 1.0, 2.0, START, END) is None


async def test_returns_none_on_timeout():
    assert await fetch_weather(FakeSession(error=asyncio.TimeoutError()), 1.0, 2.0, START, END) is None


async def test_returns_none_on_client_error():
    assert await fetch_weather(FakeSession(error=aiohttp.ClientError()), 1.0, 2.0, START, END) is None


async def test_returns_none_when_no_matching_hours():
    session = FakeSession(FakeResponse(payload=hourly(["2026-10-26T00:00"], [1], [1], [1], [1], [0], [0])))
    assert await fetch_weather(session, 1.0, 2.0, START, END, now=END + timedelta(days=30)) is None


class BrokenJsonResponse(FakeResponse):
    async def json(self):
        raise ValueError("url=https://api.open-meteo.com/v1/forecast?latitude=48.7512&longitude=12.4034")


async def test_failed_json_does_not_leak_coordinates_into_log(caplog):
    import logging

    with caplog.at_level(logging.DEBUG):
        result = await fetch_weather(FakeSession(BrokenJsonResponse()), 48.7512, 12.4034, START, END)
    assert result is None
    assert "48.75" not in caplog.text and "12.40" not in caplog.text
