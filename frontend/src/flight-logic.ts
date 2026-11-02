// Reine Logik der Flugansicht (Vorbild: EventInfo, FlightDetailPresenter, FlightModes der iOS-App)
import { compass, formatClock, formatDecimal, formatDistance, formatDuration, formatPercent, dash } from "./format";
import { t, type MessageKey } from "./i18n";
import type { AnalysisDTO, BatterySummaryDTO, FlightEventDTO, FlightExtrasDTO, ModeSegmentDTO, Point, Severity } from "./types";

export interface Row {
  label: string;
  value: string;
}

export const severityColor: Record<Severity, string> = { info: "#1e88e5", warning: "#fb8c00", critical: "#e53935" };

const ICONS: Record<string, { icon: string; severity: Severity }> = {
  signalLossGoHome: { icon: "mdi:signal-off", severity: "critical" },
  batteryGoHome: { icon: "mdi:battery-30", severity: "warning" },
  voltageWarning: { icon: "mdi:flash-alert", severity: "warning" },
  weakSignal: { icon: "mdi:wifi-alert", severity: "warning" },
  lowGPS: { icon: "mdi:crosshairs-off", severity: "warning" },
  manualGoHome: { icon: "mdi:home", severity: "info" },
  propellerCatapult: { icon: "mdi:fan", severity: "info" },
};

export interface EventInfo {
  icon: string;
  severity: Severity;
  color: string;
  titleKey: MessageKey | null;
}

export function eventInfo(kind: string): EventInfo {
  const known = ICONS[kind];
  const severity = known?.severity ?? "info";
  return { icon: known?.icon ?? "mdi:information-outline", severity, color: severityColor[severity], titleKey: known ? (`event_${kind}` as MessageKey) : null };
}

export function eventTitle(kind: string, lang: string): string {
  const key = eventInfo(kind).titleKey;
  return key ? t(key, lang) : kind;
}

/** Titel plus Zusatzangabe (Dauer bzw. Warnstufe); Rückkehr-Ereignisse haben keine. */
export function eventDescription(event: FlightEventDTO, lang: string): string {
  const title = eventTitle(event.kind, lang);
  switch (event.kind) {
    case "weakSignal":
    case "lowGPS":
    case "propellerCatapult":
      return event.value > 0 ? `${title} · ${formatDuration(event.value)}` : title;
    case "voltageWarning":
      return `${title} · ${t("level", lang)} ${Math.round(event.value)}`;
    default:
      return title;
  }
}

export interface EventRow {
  timeText: string;
  icon: string;
  color: string;
  text: string;
  severity: Severity;
}

export function eventRows(extras: FlightExtrasDTO | null | undefined, lang: string): EventRow[] {
  return [...(extras?.events ?? [])]
    .sort((a, b) => a.t - b.t)
    .map((e) => {
      const info = eventInfo(e.kind);
      return { timeText: formatClock(e.t), icon: info.icon, color: info.color, text: eventDescription(e, lang), severity: info.severity };
    });
}

export interface EventMarker {
  event: FlightEventDTO;
  lat: number;
  lon: number;
}

/** Position des Ereignisses: nächster Messpunkt mit Position, höchstens 3 s entfernt (sonst kein Marker). */
export function eventMarkers(events: FlightEventDTO[], points: Point[]): EventMarker[] {
  const positioned = points.filter((p) => p.lat !== null && p.lon !== null);
  const markers: EventMarker[] = [];
  for (const event of events) {
    let best: Point | undefined;
    for (const p of positioned) if (!best || Math.abs(p.t - event.t) < Math.abs(best.t - event.t)) best = p;
    if (best && Math.abs(best.t - event.t) <= 3) markers.push({ event, lat: best.lat as number, lon: best.lon as number });
  }
  return markers;
}

export interface Badges {
  kinds: string[];
  photos: number;
  videoS: number;
  empty: boolean;
}

export function flightBadges(s: { event_kinds?: string[]; photo_count?: number; video_s?: number }): Badges {
  const kinds = s.event_kinds ?? [];
  const photos = s.photo_count ?? 0;
  const videoS = s.video_s ?? 0;
  return { kinds, photos, videoS, empty: kinds.length === 0 && photos === 0 && videoS === 0 };
}

const pct = (n: number) => Math.min(100, Math.max(0, n));
const rate = (v: number, lang: string) => `${formatDecimal(v, lang)} m/s`;

/** Nullwerte werden nicht als Messwert gezeigt; ohne Extras (alte Flüge) bleibt alles leer. */
export function energyRows(e: FlightExtrasDTO | null | undefined, lang: string): Row[] {
  if (!e) return [];
  const rows: Row[] = [];
  if (e.energy_wh > 0) rows.push({ label: t("energy", lang), value: `${formatDecimal(e.energy_wh, lang)} Wh` });
  if (e.wh_per_km !== null && e.wh_per_km > 0) rows.push({ label: t("wh_per_km", lang), value: `${formatDecimal(e.wh_per_km, lang)} Wh/km` });
  if (e.max_descent_ms > 0) rows.push({ label: t("max_descent", lang), value: rate(e.max_descent_ms, lang) });
  if (e.max_climb_ms > 0) rows.push({ label: t("max_climb", lang), value: rate(e.max_climb_ms, lang) });
  return rows;
}

export function signalRows(e: FlightExtrasDTO | null | undefined, lang: string): Row[] {
  if (!e) return [];
  const rows: Row[] = [];
  if (e.downlink_min !== null) rows.push({ label: t("downlink_worst", lang), value: formatPercent(pct(e.downlink_min)) });
  if (e.uplink_min !== null) rows.push({ label: t("uplink_worst", lang), value: formatPercent(pct(e.uplink_min)) });
  if (e.downlink_min !== null) rows.push({ label: t("weak_signal_time", lang), value: formatDuration(e.weak_signal_s) });
  if (e.max_distance_from_start_m > 0) rows.push({ label: t("max_distance", lang), value: formatDistance(e.max_distance_from_start_m, lang) });
  return rows;
}

export function cameraRows(e: FlightExtrasDTO | null | undefined, lang: string): Row[] {
  if (!e) return [];
  const rows: Row[] = [];
  if (e.photo_count > 0) rows.push({ label: t("photos", lang), value: String(e.photo_count) });
  if (e.video_s > 0) rows.push({ label: t("video", lang), value: formatDuration(e.video_s) });
  return rows;
}

export type CellLevel = "ok" | "minor" | "major";

/** Bis 20 mV in Ordnung, bis 50 mV auffällig, darüber kritisch. */
export function cellLevel(volts: number): CellLevel {
  const mv = volts * 1000;
  return mv > 50.0001 ? "major" : mv > 20.0001 ? "minor" : "ok";
}

export function cellLevelText(level: string, lang: string): string {
  return t(`cell_${level === "major" ? "major" : level === "minor" ? "minor" : "ok"}` as MessageKey, lang);
}

export function batteryRows(b: BatterySummaryDTO, level: string | null | undefined, lang: string): Row[] {
  const lvl = level ?? cellLevel(b.cell_deviation_max_v);
  const rows: Row[] = [
    { label: t("charge", lang), value: `${formatPercent(b.charge_start)} → ${formatPercent(b.charge_end)}` },
    { label: t("power_avg", lang), value: `${Math.round(b.avg_power_w)} W` },
    { label: t("power_peak", lang), value: `${Math.round(b.peak_power_w)} W` },
    { label: t("cell_deviation", lang), value: `${Math.round(b.cell_deviation_max_v * 1000)} mV (${cellLevelText(lvl, lang)})` },
  ];
  if (typeof b.internal_resistance_mohm === "number") {
    rows.push({ label: t("internal_resistance", lang), value: `${Math.round(b.internal_resistance_mohm)} mΩ (${t("estimate", lang)})` });
  }
  rows.push(
    { label: t("temperature", lang), value: `${Math.round(b.temp_min_c)} … ${Math.round(b.temp_max_c)} °C` },
    { label: t("cycles", lang), value: b.cycles === null ? dash : String(b.cycles) },
    { label: t("health", lang), value: formatPercent(b.health_pct) },
  );
  if (b.full_capacity_mah > 0) rows.push({ label: t("capacity", lang), value: `${b.full_capacity_mah} mAh` });
  if (b.min_voltage > 0) rows.push({ label: t("voltage", lang), value: `${formatDecimal(b.min_voltage, lang)} … ${formatDecimal(b.max_voltage, lang)} V` });
  if (b.peak_current_a > 0) rows.push({ label: t("peak_current", lang), value: `${formatDecimal(b.peak_current_a, lang)} A` });
  return rows;
}

const PHASES = ["climb", "cruise", "hover", "descent"] as const;

/** Zeit je Flugphase; nur Phasen mit mindestens einer Sekunde. */
export function phaseRows(phases: AnalysisDTO["phases"] | undefined, lang: string): Row[] {
  if (!phases) return [];
  return PHASES.filter((p) => (phases[p] ?? 0) >= 1).map((p) => ({ label: t(`phase_${p}` as MessageKey, lang), value: formatDuration(phases[p]) }));
}

/** Windhinweis aus der Fluglage im Schwebeflug (Klasse und Richtung, kein Messwert in m/s). */
export function windHintRow(wind: AnalysisDTO["hover_wind"] | undefined, lang: string): Row | null {
  if (!wind) return null;
  const cls = wind.class === "windy" ? "wind_windy" : wind.class === "moderate" ? "wind_moderate" : "wind_calm";
  const bearing = Math.round(wind.bearing_deg) % 360;
  return { label: t("wind_by_aircraft", lang), value: `${t(cls, lang)}, ${t("wind_from", lang)} ${compass(wind.bearing_deg, lang)} (${bearing}°)` };
}

export const modeColors: Record<string, string> = {
  normal: "#1e88e5", sport: "#fb8c00", cine: "#00acc1", manual: "#8d6e63", automatic: "#9e9e9e",
  goHome: "#e53935", attitude: "#fdd835", smart: "#8e24aa", other: "#78909c",
};
const MODE_ORDER = ["normal", "sport", "cine", "manual", "automatic", "goHome", "attitude", "smart", "other"];

export interface ModeBand {
  segments: { category: string; label: string; start: number; end: number; share: number; color: string }[];
  legend: { category: string; label: string; seconds: number; color: string }[];
  total: number;
}

export function modeBand(segments: ModeSegmentDTO[] | undefined, lang: string): ModeBand {
  if (!segments || segments.length === 0) return { segments: [], legend: [], total: 0 };
  const total = Math.max(segments[segments.length - 1].end, 1);
  const label = (category: string) => (category in modeColors ? t(`mode_${category}` as MessageKey, lang) : category);
  const durations = new Map<string, number>();
  for (const s of segments) durations.set(s.category, (durations.get(s.category) ?? 0) + Math.max(0, s.end - s.start));
  return {
    total,
    segments: segments.map((s) => ({
      category: s.category, label: label(s.category), start: s.start, end: s.end, color: modeColors[s.category] ?? modeColors.other,
      share: Math.max(0.004, Math.max(0, s.end - s.start) / total),  // winzige Abschnitte bleiben sichtbar
    })),
    legend: [...durations].filter(([, seconds]) => seconds > 0)
      .sort((a, b) => MODE_ORDER.indexOf(a[0]) - MODE_ORDER.indexOf(b[0]))
      .map(([category, seconds]) => ({ category, label: label(category), seconds, color: modeColors[category] ?? modeColors.other })),
  };
}
