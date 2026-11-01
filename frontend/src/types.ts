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

export interface YearStatDTO { year: number; flights: number; duration_s: number; distance_m: number }
export interface PlaceStatDTO { key: string; lat: number; lon: number; flights: number; duration_s: number; name: string | null }

export interface LogbookDTO {
  flights: number;
  duration_s: number;
  distance_m: number;
  longest_flight_s: number;
  farthest_flight_m: number;
  highest_m: number;
  fastest_ms: number;
  years: YearStatDTO[];
  places: PlaceStatDTO[];
  tags: Record<string, number>;
}

export interface FlightbookRowDTO {
  nr: number;
  flight_id: number;
  start: string;
  end: string;
  date: string;
  time: string;
  day_offset: number;
  place: { key: string; name: string | null; lat: number; lon: number; label: string } | null;
  drone_serial: string;
  drone_model: string;
  drone_label: string;
  battery_serial: string;
  battery_label: string | null;
  duration_s: number;
  distance_m: number;
  max_height_m: number;
  note: string;
  note_text: string;
  tags: string[];
}

export interface FlightbookDTO {
  rows: FlightbookRowDTO[];
  summary: { flights: number; duration_s: number; distance_m: number };
}

export interface FindingDTO { code: string; text: string; params: Record<string, number> }
export type AssessmentLevel = "good" | "watch" | "critical";

export interface AssessmentDTO {
  level: AssessmentLevel;
  headline_code: string;
  headline: string;
  state_of_health: FindingDTO;
  points: FindingDTO[];
}

export interface ReportFlightDTO {
  flight_id: number;
  start: string;
  duration_s: number;
  charge_start: number;
  charge_end: number;
  peak_current_a: number;
  temp_max_c: number;
  cell_deviation_mv: number;
  cycles: number | null;
  health_pct: number | null;
  resistance_mohm: number | null;
}

export interface BatteryReportDTO {
  serial: string;
  drone_models: string[];
  flights: number;
  first_use: string;
  last_use: string;
  total_duration_s: number;
  total_distance_m: number;
  cycles_first: number | null;
  cycles_latest: number | null;
  health_first: number | null;
  health_latest: number | null;
  full_capacity_mah: number;
  peak_current_a: number;
  peak_power_w: number;
  avg_power_w: number;
  min_voltage: number;
  max_voltage: number;
  temp_min_c: number;
  temp_max_c: number;
  cell_deviation_max_mv: number;
  flights_above_cell_warning: number;
  voltage_warnings: number;
  resistance_median_mohm: number | null;
  avg_charge_used_pct: number;
  history: ReportFlightDTO[];
  cycles_added: number | null;
  health_loss_pct: number | null;
  assessment: AssessmentDTO;
}

export interface NoteDTO { flight_id: number; text: string; tags: string[] }

export type MaintenanceLevel = "ok" | "soon" | "due";
export interface MaintenanceRowDTO {
  serial: string;
  suffix: string;
  name: string;
  model: string;
  plan: { interval_hours: number | null; interval_flights: number | null; since: string; notified_due: boolean } | null;
  status: { used_hours: number; used_flights: number; hours_fraction: number | null; flights_fraction: number | null; level: MaintenanceLevel } | null;
}

export interface HassLike {
  callWS<T = unknown>(message: Record<string, unknown>): Promise<T>;
  /** Anfrage mit Anmeldung der Oberfläche (Bearer-Token), z. B. für die Export-Downloads */
  fetchWithAuth?(path: string, init?: RequestInit): Promise<Response>;
  language?: string;
  config?: { time_zone?: string };
  themes?: { darkMode?: boolean };
}
