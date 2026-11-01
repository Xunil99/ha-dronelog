import type { AnalysisDTO, BatteryDTO, FlightDetailDTO, FlightExtrasDTO, FlightSummary, Point } from "./types";

export function makeSummary(overrides: Partial<FlightSummary> = {}): FlightSummary {
  return {
    id: 1, start: "2026-10-27T13:11:11+00:00", duration_s: 330, distance_m: 1460, max_height_m: 40.7, max_speed_ms: 12.2,
    drone_model: "DJI Test", drone_suffix: "D003", drone_serial: "DRONE0001D003", battery_suffix: "H413", battery_serial: "BATTERY00H413",
    temperature_c: 9, wind_10m_ms: 3, has_position: true, ...overrides,
  };
}

export function makePoints(n = 60): Point[] {
  return Array.from({ length: n }, (_, i) => ({
    t: i * 2, lat: 48.75 + i * 0.0002, lon: 12.4 + Math.sin(i / 8) * 0.001, height: 5 + (i % 30), speed: 6 + (i % 5),
    voltage: 8.2 - i * 0.004, current: 3 + (i % 7) / 3, charge: 99 - Math.floor(i / 3),
  }));
}

export function makeDetail(overrides: Partial<FlightDetailDTO> = {}, summary: Partial<FlightSummary> = {}): FlightDetailDTO {
  return {
    summary: makeSummary(summary),
    battery: { charge_start: 99, charge_end: 79, min_voltage: 7.3, max_voltage: 8.2, peak_current_a: 14.1, avg_power_w: 40, peak_power_w: 104,
      temp_min_c: 21, temp_max_c: 33, cell_deviation_max_v: 0.003, full_capacity_mah: 2800, cycles: 2, health_pct: 98 },
    weather: { temperature_c: 9, wind_10m_ms: 3, wind_80m_ms: 5, gust_ms: 6, wind_dir_deg: 220, precipitation_mm: 0, cloud_cover_pct: 40, source: "open-meteo" },
    start: { lat: 48.75, lon: 12.4 }, end: { lat: 48.76, lon: 12.401 }, points: makePoints(), source_name: "FlightRecord_test.txt", ...overrides,
  };
}

export function makeBattery(overrides: Partial<BatteryDTO> = {}): BatteryDTO {
  return {
    serial: "BATTERY00H413", suffix: "H413", drones: ["DRONE0001D003"], flights: 3, first: "2026-09-01T10:00:00+00:00", last: "2026-10-27T13:11:11+00:00",
    history: [
      { flight_id: 1, time: "2026-09-01T10:00:00+00:00", charge_end: 80, cycles: 1, health_pct: 99, cell_deviation_mv: 2, temp_max_c: 30, avg_power_w: 40 },
      { flight_id: 2, time: "2026-10-01T10:00:00+00:00", charge_end: 78, cycles: 2, health_pct: 98, cell_deviation_mv: 3, temp_max_c: 31, avg_power_w: 41 },
      { flight_id: 3, time: "2026-10-27T13:11:11+00:00", charge_end: 79, cycles: 3, health_pct: 98, cell_deviation_mv: 4, temp_max_c: 33, avg_power_w: 39 },
    ],
    ...overrides,
  };
}

export function makeChannelPoints(n = 60): Point[] {
  return makePoints(n).map((p, i) => ({
    ...p, dist: i * 20, dl: 95 - i, ul: 90, rec: i > 10, mode: i < 5 ? 10 : 6, temp: 22 + i / 10, cell_dev: 0.004 + i * 0.0003, pitch: Math.sin(i) * 3, roll: Math.cos(i) * 2, yaw: i,
  }));
}

export function makeExtras(overrides: Partial<FlightExtrasDTO> = {}): FlightExtrasDTO {
  return {
    events: [{ t: 30, kind: "weakSignal", value: 5, severity: "warning" }, { t: 90, kind: "batteryGoHome", value: 3, severity: "warning" }],
    energy_wh: 5.64, wh_per_km: 4, max_distance_from_start_m: 1894, downlink_min: 12, uplink_min: 80, weak_signal_s: 14,
    photo_count: 3, video_s: 95, max_descent_ms: 3.2, max_climb_ms: 5.5, ...overrides,
  };
}

export function makeAnalysis(overrides: Partial<AnalysisDTO> = {}): AnalysisDTO {
  return {
    phases: { climb: 30, cruise: 200, hover: 60, descent: 20 },
    hover_wind: { tilt_deg: 3, bearing_deg: 45, seconds: 20, class: "moderate" },
    cell_level: "ok",
    mode_segments: [{ category: "automatic", title: "Start/Landung", start: 0, end: 10 }, { category: "normal", title: "Normal", start: 10, end: 118 }],
    ...overrides,
  };
}
