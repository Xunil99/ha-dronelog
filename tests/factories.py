from datetime import UTC, datetime, timedelta

from custom_components.dronelog.models import BatterySummary, ParsedFlight, Sample


def make_battery(**overrides) -> BatterySummary:
    values = dict(charge_start=99, charge_end=79, min_voltage=7.3, max_voltage=8.2, peak_current_a=14.1, avg_power_w=40.0,
                  peak_power_w=104.0, temp_min_c=21.0, temp_max_c=33.0, cell_deviation_max_v=0.001, full_capacity_mah=2800,
                  cycles=2, health_pct=98)
    values.update(overrides)
    return BatterySummary(**values)


def make_flight(sha="a" * 64, start=None, battery="BAT1", drone="DRONE1", lat=48.75, lon=12.40, duration=330.0, distance=1460.0,
                samples=None, battery_summary=None, keychains="") -> ParsedFlight:
    start = start or datetime(2026, 10, 27, 13, 11, 11, tzinfo=UTC)
    samples = samples if samples is not None else tuple(
        Sample(t=float(i * 2), lat=lat + i * 1e-5, lon=lon, height=10.0 + i, speed=5.0, voltage=8.0, current=5.0, charge=99 - i)
        for i in range(5))
    return ParsedFlight(sha256=sha, log_version=14, start=start, duration_s=duration, distance_m=distance, max_height_m=40.7,
                        max_speed_ms=12.2, start_lat=lat, start_lon=lon, drone_model="DJI Test", drone_serial=drone,
                        battery_serial=battery, battery=battery_summary or make_battery(), samples=samples, keychains_json=keychains)


def later(days=0, hours=0):
    return datetime(2026, 10, 27, 13, 11, 11, tzinfo=UTC) + timedelta(days=days, hours=hours)
