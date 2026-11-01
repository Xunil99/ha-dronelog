// DTOs zur Websocket-Schnittstelle (siehe custom_components/dronelog/websocket_api.py)

export interface FlightSummary {
  id: number;
  start: string;
  duration_s: number;
  distance_m: number;
  max_height_m: number;
  max_speed_ms: number;
  drone_model: string;
  drone_suffix: string;
  drone_serial: string;
  battery_suffix: string;
  battery_serial: string;
  temperature_c: number | null;
  wind_10m_ms: number | null;
  has_position: boolean;
  /** Ereignisarten, schwerste zuerst (fehlt bei älteren Backends) */
  event_kinds?: string[];
  photo_count?: number;
  video_s?: number;
}

export interface Point {
  t: number;
  lat: number | null;
  lon: number | null;
  height: number;
  speed: number;
  voltage: number;
  current: number;
  charge: number;
  // Kanäle nur, wenn der Flug sie enthält
  dist?: number;
  dl?: number;
  ul?: number;
  rec?: boolean;
  mode?: number;
  temp?: number;
  cell_dev?: number;
  pitch?: number;
  roll?: number;
  yaw?: number;
}

export type Severity = "info" | "warning" | "critical";

export interface FlightEventDTO {
  t: number;
  kind: string;
  value: number;
  severity: Severity;
}

export interface FlightExtrasDTO {
  events: FlightEventDTO[];
  energy_wh: number;
  wh_per_km: number | null;
  max_distance_from_start_m: number;
  downlink_min: number | null;
  uplink_min: number | null;
  weak_signal_s: number;
  photo_count: number;
  video_s: number;
  max_descent_ms: number;
  max_climb_ms: number;
}

export interface ModeSegmentDTO {
  category: string;
  title: string;
  start: number;
  end: number;
}

export interface AnalysisDTO {
  phases: Record<string, number>;
  hover_wind: { tilt_deg: number; bearing_deg: number; seconds: number; class: string } | null;
  cell_level: string | null;
  mode_segments: ModeSegmentDTO[];
}

export interface BatterySummaryDTO {
  charge_start: number;
  charge_end: number;
  min_voltage: number;
  max_voltage: number;
  peak_current_a: number;
  avg_power_w: number;
  peak_power_w: number;
  temp_min_c: number;
  temp_max_c: number;
  cell_deviation_max_v: number;
  full_capacity_mah: number;
  cycles: number | null;
  health_pct: number | null;
  internal_resistance_mohm?: number | null;
}

export interface WeatherDTO {
  temperature_c: number;
  wind_10m_ms: number;
  wind_80m_ms: number | null;
  gust_ms: number;
  wind_dir_deg: number;
  precipitation_mm: number;
  cloud_cover_pct: number;
  source: string;
}

export interface LatLonDTO {
  lat: number;
  lon: number;
}

export interface FlightDetailDTO {
  summary: FlightSummary;
  battery: BatterySummaryDTO | null;
  weather: WeatherDTO | null;
  start: LatLonDTO | null;
  end: LatLonDTO | null;
  points: Point[];
  source_name: string;
  extras?: FlightExtrasDTO | null;
  analysis?: AnalysisDTO;
}

export interface FlightsResult {
  flights: FlightSummary[];
  total: number;
}

export interface FlightQuery {
  limit?: number;
  offset?: number;
  drone?: string;
  battery?: string;
  since?: string;
  only_events?: boolean;
}

export interface MonthStat {
  month: string;
  flights: number;
  duration_s: number;
  distance_m: number;
}

export interface DroneStat {
  serial: string;
  serial_suffix: string;
  model: string;
  flights: number;
  duration_s: number;
}

export interface StatsDTO {
  totals: { flights: number; duration_s: number; distance_m: number };
  months: MonthStat[];
  drones: DroneStat[];
}

export interface BatteryHistoryPoint {
  flight_id: number;
  time: string;
  charge_end: number;
  cycles: number | null;
  health_pct: number | null;
  cell_deviation_mv: number;
  temp_max_c: number;
  avg_power_w: number;
}

export interface BatteryDTO {
  serial: string;
  suffix: string;
  drones: string[];
  flights: number;
  first: string;
  last: string;
  history: BatteryHistoryPoint[];
}

export interface BatteriesDTO {
  batteries: BatteryDTO[];
}

export interface HeatCellDTO {
  lat: number;
  lon: number;
  count: number;
}

export interface HeatmapDTO {
  cells: HeatCellDTO[];
}

export interface HassLike {
  callWS<T = unknown>(message: Record<string, unknown>): Promise<T>;
  language?: string;
  config?: { time_zone?: string };
  themes?: { darkMode?: boolean };
}
