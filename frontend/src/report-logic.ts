// Reine Logik für Logbuch, Flugbuch, Wartung, Akku-Bericht und Export (Vorbild: Flightbook/BatteryReport/Maintenance der iOS-App)
import { cellLevel, cellLevelText, type Row } from "./flight-logic";
import { dash, formatDecimal, formatDistance, formatDuration, formatPercent } from "./format";
import { t, tf, type MessageKey } from "./i18n";
import type {
  AssessmentDTO, AssessmentLevel, BatteryReportDTO, FindingDTO, FlightbookDTO, HassLike, MaintenanceLevel, MaintenanceRowDTO, ReportFlightDTO,
} from "./types";

const MAX_TAG_LENGTH = 40;

/** „Urlaub, #Alpen, urlaub“ → ["Urlaub", "Alpen"]: getrimmt, ohne Raute, ohne Doppelte (Groß-/Kleinschreibung egal); wie das Backend. */
export function parseTags(text: string): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const part of text.split(",")) {
    const tag = part.trim().replace(/^#+|#+$/g, "").trim();
    if (tag && !seen.has(tag.toLowerCase())) {
      seen.add(tag.toLowerCase());
      tags.push(tag.slice(0, MAX_TAG_LENGTH));
    }
  }
  return tags;
}

export const tagsToText = (tags: string[]): string => tags.join(", ");

/** Verzögert Aufrufe (Entprellen); `flush` führt einen anstehenden sofort aus. */
export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pending: A | undefined;
  const run = () => {
    timer = undefined;
    const args = pending;
    pending = undefined;
    if (args) fn(...args);
  };
  return {
    call(...args: A) {
      pending = args;
      if (timer !== undefined) clearTimeout(timer);
      timer = setTimeout(run, ms);
    },
    flush() {
      if (timer !== undefined) clearTimeout(timer);
      run();
    },
    cancel() {
      if (timer !== undefined) clearTimeout(timer);
      timer = undefined;
      pending = undefined;
    },
  };
}

// --- Flugbuch ---------------------------------------------------------------------------------------------------------

export interface FlightbookRowView {
  nr: string;
  date: string;
  time: string;
  place: string;
  drone: string;
  battery: string;
  duration: string;
  distance: string;
  note: string;
}

export interface FlightbookView {
  rows: FlightbookRowView[];
  summary: Row[];
}

/** Datum "2026-10-27" (Ortszeit des Backends) in der Sprache des Nutzers: 27.10.2026. */
export function formatBookDate(isoDate: string, lang: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return dash;
  return new Intl.DateTimeFormat(lang, { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}

export function flightbookView(book: FlightbookDTO, lang: string): FlightbookView {
  return {
    rows: book.rows.map((r) => ({
      nr: String(r.nr),
      date: formatBookDate(r.date, lang),
      time: r.time,
      place: r.place ? r.place.label : dash,
      drone: r.drone_label,
      battery: r.battery_label ?? dash,
      duration: formatDuration(r.duration_s),
      distance: formatDistance(r.distance_m, lang),
      note: r.note,
    })),
    summary: [
      { label: t("metric_flights", lang), value: String(book.summary.flights) },
      { label: t("metric_hours", lang), value: formatDuration(book.summary.duration_s) },
      { label: t("distance", lang), value: formatDistance(book.summary.distance_m, lang) },
    ],
  };
}

export function flightbookFilterText(filter: { drone?: string; battery?: string; year?: number }, lang: string): string {
  const parts: string[] = [];
  if (filter.drone) parts.push(`${t("col_drone", lang)}: ${filter.drone}`);
  if (filter.battery) parts.push(`${t("battery", lang)}: ${filter.battery}`);
  if (filter.year !== undefined) parts.push(`${t("year", lang)}: ${filter.year}`);
  return parts.length ? parts.join(" · ") : t("all_flights", lang);
}

/** Spalten des Flugbuchs in Reihenfolge der App: Nr., Datum, Zeit, Ort, Drohne, Dauer, Strecke, Notiz. */
export const flightbookColumns: { key: keyof FlightbookRowView; title: MessageKey; right: boolean }[] = [
  { key: "nr", title: "col_nr", right: true },
  { key: "date", title: "col_date", right: false },
  { key: "time", title: "col_time", right: false },
  { key: "place", title: "col_place", right: false },
  { key: "drone", title: "col_drone", right: false },
  { key: "duration", title: "duration", right: true },
  { key: "distance", title: "distance", right: true },
  { key: "note", title: "col_note", right: false },
];

// --- Wartung ----------------------------------------------------------------------------------------------------------

const SOON = 0.9;
const EPSILON = 1e-9;

export function fractionLevel(fraction: number): MaintenanceLevel {
  return fraction >= 1 - EPSILON ? "due" : fraction >= SOON - EPSILON ? "soon" : "ok";
}

export const maintenanceColor: Record<MaintenanceLevel, string> = { ok: "#1e88e5", soon: "#fb8c00", due: "#e53935" };

export interface MaintenanceBar {
  kind: "hours" | "flights";
  title: string;
  value: string;
  percent: number;
  level: MaintenanceLevel;
  color: string;
}

export function maintenanceBars(row: MaintenanceRowDTO, lang: string): MaintenanceBar[] {
  const { plan, status } = row;
  if (!plan || !status) return [];
  const bars: MaintenanceBar[] = [];
  const make = (kind: MaintenanceBar["kind"], title: string, value: string, fraction: number): void => {
    const level = fractionLevel(fraction);
    bars.push({ kind, title, value, percent: Math.round(Math.min(Math.max(fraction, 0), 1) * 100), level, color: maintenanceColor[level] });
  };
  if (status.hours_fraction !== null && plan.interval_hours !== null) {
    make("hours", t("maint_hours_progress", lang), `${formatDuration(status.used_hours * 3600)} / ${formatDecimal(plan.interval_hours, lang, plan.interval_hours % 1 ? 1 : 0)} h`, status.hours_fraction);
  }
  if (status.flights_fraction !== null && plan.interval_flights !== null) {
    make("flights", t("maint_flights_progress", lang), `${status.used_flights} / ${plan.interval_flights}`, status.flights_fraction);
  }
  return bars;
}

export function maintenanceLevelText(level: MaintenanceLevel, lang: string): string {
  return t(level === "due" ? "maint_due" : level === "soon" ? "maint_soon" : "maint_ok", lang);
}

export interface PlanDraft {
  hoursOn: boolean;
  hours: number;
  flightsOn: boolean;
  flights: number;
}

export const HOURS_RANGE = { min: 1, max: 500 };
export const FLIGHTS_RANGE = { min: 1, max: 2000 };
const DEFAULT_DRAFT: PlanDraft = { hoursOn: false, hours: 10, flightsOn: false, flights: 50 };

const clamp = (value: number, range: { min: number; max: number }, fallback: number) =>
  Number.isFinite(value) ? Math.min(range.max, Math.max(range.min, value)) : fallback;

/** Eingabefelder aus dem gespeicherten Plan; ein abgeschaltetes Intervall behält den zuletzt gewählten Wert. */
export function draftFromRow(row: MaintenanceRowDTO, previous: PlanDraft = DEFAULT_DRAFT): PlanDraft {
  const plan = row.plan;
  return {
    hoursOn: plan?.interval_hours != null,
    hours: plan?.interval_hours ?? previous.hours,
    flightsOn: plan?.interval_flights != null,
    flights: plan?.interval_flights ?? previous.flights,
  };
}

export interface PlanPayload {
  hours: number | null;
  flights: number | null;
}

export function planPayload(draft: PlanDraft): PlanPayload {
  return {
    hours: draft.hoursOn ? clamp(draft.hours, HOURS_RANGE, DEFAULT_DRAFT.hours) : null,
    flights: draft.flightsOn ? Math.round(clamp(draft.flights, FLIGHTS_RANGE, DEFAULT_DRAFT.flights)) : null,
  };
}

/** Nur speichern, wenn sich das Intervall gegenüber dem gespeicherten Plan geändert hat (kein Echo). */
export function payloadChanged(payload: PlanPayload, row: MaintenanceRowDTO): boolean {
  return payload.hours !== (row.plan?.interval_hours ?? null) || payload.flights !== (row.plan?.interval_flights ?? null);
}

// --- Gesamteinschätzung -----------------------------------------------------------------------------------------------

export const levelColor: Record<AssessmentLevel, string> = { good: "#2e7d32", watch: "#ef6c00", critical: "#c62828" };
const levelSymbol: Record<AssessmentLevel, string> = { good: "●", watch: "▲", critical: "✖" };
const FINDING_KEYS: Record<string, MessageKey> = {
  soh_missing: "f_soh_missing", soh_trend_cycles: "f_soh_trend_cycles", soh_trend: "f_soh_trend", soh: "f_soh",
  health_critical: "f_health_critical", health_watch: "f_health_watch", health_missing: "f_health_missing",
  cell_critical: "f_cell_critical", cell_watch: "f_cell_watch", voltage_warnings: "f_voltage_warnings", all_clear: "f_all_clear",
};

/** Übersetzt einen Befund über seinen stabilen Code; unbekannte Codes zeigen den Backend-Text. */
export function findingText(finding: FindingDTO, lang: string): string {
  const key = FINDING_KEYS[finding.code];
  return key ? tf(key, lang, finding.params) : finding.text;
}

export interface AssessmentView {
  level: AssessmentLevel;
  color: string;
  symbol: string;
  levelText: string;
  headline: string;
  stateOfHealth: string;
  points: string[];
}

export function assessmentView(a: AssessmentDTO, lang: string): AssessmentView {
  const level: AssessmentLevel = a.level in levelColor ? a.level : "watch";
  const headlineKey = `head_${level}` as MessageKey;
  return {
    level, color: levelColor[level], symbol: levelSymbol[level], levelText: t(`level_${level}` as MessageKey, lang),
    headline: a.headline_code === level ? t(headlineKey, lang) : a.headline,
    stateOfHealth: findingText(a.state_of_health, lang), points: a.points.map((p) => findingText(p, lang)),
  };
}

// --- Akku-Bericht -----------------------------------------------------------------------------------------------------

export interface ReportContent {
  title: string;
  subtitle: string;
  tiles: Row[];
  rows: Row[];
  recentHeader: string[];
  recent: string[][];
  notes: string[];
}

const int = (v: number) => String(Math.round(v));

function shortDate(iso: string, timeZone: string, lang: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? dash : new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeZone }).format(d);
}

export function reportContent(r: BatteryReportDTO, lang: string, timeZone: string): ReportContent {
  const n = (v: number, digits = 1) => formatDecimal(v, lang, digits);
  const rows: Row[] = [
    { label: t("flights_count", lang), value: String(r.flights) },
    { label: t("distance", lang), value: formatDistance(r.total_distance_m, lang) },
  ];
  if (r.cycles_added !== null && r.cycles_first !== null && r.cycles_latest !== null) {
    rows.push({ label: t("cycles_in_period", lang), value: `${r.cycles_first} → ${r.cycles_latest} (+${r.cycles_added})` });
  }
  if (r.health_first !== null && r.health_latest !== null) rows.push({ label: t("health_in_period", lang), value: `${r.health_first} % → ${r.health_latest} %` });
  if (r.full_capacity_mah > 0) rows.push({ label: t("capacity_full", lang), value: `${r.full_capacity_mah} mAh` });
  rows.push({ label: t("avg_used", lang), value: `${int(r.avg_charge_used_pct)} %` });
  if (r.min_voltage > 0) rows.push({ label: t("voltage", lang), value: `${n(r.min_voltage)} … ${n(r.max_voltage)} V` });
  if (r.peak_current_a > 0) rows.push({ label: t("peak_current", lang), value: `${n(r.peak_current_a)} A` });
  rows.push({ label: t("power_avg_peak", lang), value: `${int(r.avg_power_w)} W / ${int(r.peak_power_w)} W` });
  if (r.temp_max_c !== 0) rows.push({ label: t("temperature", lang), value: `${int(r.temp_min_c)} … ${int(r.temp_max_c)} °C` });
  rows.push({ label: t("cell_max", lang), value: `${int(r.cell_deviation_max_mv)} mV (${cellLevelText(cellLevel(r.cell_deviation_max_mv / 1000), lang)})` });
  if (r.flights_above_cell_warning > 0) rows.push({ label: t("flights_over_20", lang), value: String(r.flights_above_cell_warning) });
  if (r.voltage_warnings > 0) rows.push({ label: t("voltage_warnings", lang), value: String(r.voltage_warnings) });
  if (r.resistance_median_mohm !== null) rows.push({ label: t("resistance_median", lang), value: `${int(r.resistance_median_mohm)} mΩ` });
  const subtitle = [r.drone_models.join(", "), `${shortDate(r.first_use, timeZone, lang)} – ${shortDate(r.last_use, timeZone, lang)}`].filter(Boolean).join(" · ");
  return {
    title: tf("report_for", lang, { serial: r.serial }),
    subtitle,
    tiles: [
      { label: t("flights_count", lang), value: String(r.flights) },
      { label: t("metric_hours", lang), value: formatDuration(r.total_duration_s) },
      { label: t("cycles", lang), value: r.cycles_latest === null ? dash : String(r.cycles_latest) },
      { label: t("health", lang), value: formatPercent(r.health_latest) },
    ],
    rows,
    recentHeader: [t("col_date", lang), t("duration", lang), t("col_charge", lang), t("col_peak", lang), t("col_temp", lang), t("col_cell", lang)],
    recent: r.history.slice(-12).reverse().map((f: ReportFlightDTO) => [
      shortDate(f.start, timeZone, lang), formatDuration(f.duration_s), `${f.charge_start} → ${f.charge_end} %`, `${n(f.peak_current_a)} A`,
      f.temp_max_c !== 0 ? `${int(f.temp_max_c)} °C` : dash, `${int(f.cell_deviation_mv)} mV`,
    ]),
    notes: [t("report_note_base", lang), t("report_note_resistance", lang)],
  };
}

export interface ChartSpec {
  id: string;
  title: MessageKey;
  color: string;
  zeroBased: boolean;
  rule?: number;
  ruleTitle?: MessageKey;
  points: { t: number; v: number }[];
}

/** Die sechs Verlaufsdiagramme des Berichts (Reihenfolge, Farben und Schwelle wie in der App). */
export function reportCharts(history: ReportFlightDTO[]): ChartSpec[] {
  const time = (f: ReportFlightDTO) => Date.parse(f.start);
  const series = (pick: (f: ReportFlightDTO) => number | null | undefined, keep: (f: ReportFlightDTO) => boolean = () => true) =>
    history.filter(keep).flatMap((f) => {
      const v = pick(f);
      return typeof v === "number" && Number.isFinite(v) && Number.isFinite(time(f)) ? [{ t: time(f), v }] : [];
    });
  return [
    { id: "health", title: "ch_health", color: "#2e7d32", zeroBased: false, points: series((f) => f.health_pct) },
    { id: "cycles", title: "ch_cycles", color: "#1565c0", zeroBased: false, points: series((f) => f.cycles) },
    { id: "cell", title: "ch_cell", color: "#00897b", zeroBased: true, rule: 20, ruleTitle: "ch_threshold", points: series((f) => f.cell_deviation_mv) },
    { id: "resistance", title: "ch_resistance", color: "#6a1b9a", zeroBased: false, points: series((f) => f.resistance_mohm) },
    { id: "temp", title: "ch_temp", color: "#c2185b", zeroBased: false, points: series((f) => f.temp_max_c, (f) => f.temp_max_c !== 0) },
    { id: "peak", title: "ch_peak", color: "#ef6c00", zeroBased: true, points: series((f) => f.peak_current_a) },
  ];
}

export interface ChartGeometry {
  width: number;
  height: number;
  plot: { left: number; top: number; right: number; bottom: number };
  path: string;
  dots: { x: number; y: number }[];
  ruleY: number | null;
  yTicks: { y: number; label: string }[];
  min: number;
  max: number;
}

/** Geometrie eines kleinen Liniendiagramms (SVG-Koordinaten); null bei weniger als zwei Messwerten. */
export function lineChartGeometry(spec: ChartSpec, width = 320, height = 110, lang = "de"): ChartGeometry | null {
  if (spec.points.length < 2) return null;
  const plot = { left: 36, top: 8, right: width - 8, bottom: height - 18 };
  const values = spec.points.map((p) => p.v);
  if (spec.rule !== undefined) values.push(spec.rule);
  if (spec.zeroBased) values.push(0);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) { min -= 1; max += 1; }
  else if (!spec.zeroBased) { const pad = (max - min) * 0.08; min -= pad; max += pad; }
  const times = spec.points.map((p) => p.t);
  const t0 = Math.min(...times);
  const t1 = Math.max(...times);
  const x = (time: number) => (t1 === t0 ? plot.left : plot.left + ((time - t0) / (t1 - t0)) * (plot.right - plot.left));
  const y = (v: number) => plot.bottom - ((v - min) / (max - min)) * (plot.bottom - plot.top);
  const dots = spec.points.map((p) => ({ x: x(p.t), y: y(p.v) }));
  const round = (v: number) => Math.round(v * 10) / 10;
  const ticks = [min, (min + max) / 2, max];
  return {
    width, height, plot, min, max,
    path: dots.map((d, i) => `${i === 0 ? "M" : "L"}${round(d.x)} ${round(d.y)}`).join(" "),
    dots,
    ruleY: spec.rule !== undefined ? y(spec.rule) : null,
    yTicks: ticks.map((v) => ({ y: y(v), label: formatDecimal(v, lang, max - min < 10 ? 1 : 0) })),
  };
}

/** Textbeschreibung eines Diagramms für Screenreader. */
export function chartSummary(spec: ChartSpec, lang: string, timeZone = "UTC"): string {
  if (spec.points.length < 2) return t("too_few", lang);
  const values = spec.points.map((p) => p.v);
  const times = spec.points.map((p) => p.t);
  const date = (ms: number) => new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeZone }).format(new Date(ms));
  return tf("chart_range", lang, {
    count: spec.points.length, from: date(Math.min(...times)), to: date(Math.max(...times)),
    min: formatDecimal(Math.min(...values), lang, 1), max: formatDecimal(Math.max(...values), lang, 1),
  });
}

// --- Export -----------------------------------------------------------------------------------------------------------

export type ExportFormat = "csv" | "gpx" | "kml";

export const exportUrl = (flightId: number, format: ExportFormat) => `/api/dronelog/export/${flightId}/${format}`;

/** CSV immer, GPX und KML nur bei Positionen. */
export function exportFormats(hasPosition: boolean): { format: ExportFormat; label: MessageKey }[] {
  const all: { format: ExportFormat; label: MessageKey }[] = [{ format: "csv", label: "export_csv" }];
  if (hasPosition) all.push({ format: "gpx", label: "export_gpx" }, { format: "kml", label: "export_kml" });
  return all;
}

export function fileNameFromDisposition(header: string | null, fallback: string): string {
  const match = header?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  if (!match) return fallback;
  try { return decodeURIComponent(match[1]); } catch { return match[1]; }
}

/** Lädt eine Exportdatei mit der Anmeldung der Oberfläche (ein einfacher Link trägt kein Token) und speichert sie. */
export async function downloadExport(hass: HassLike, flightId: number, format: ExportFormat, save: (blob: Blob, name: string) => void = saveBlob): Promise<void> {
  const path = exportUrl(flightId, format);
  if (!hass.fetchWithAuth) throw new Error("fetchWithAuth fehlt");
  const response = await hass.fetchWithAuth(path);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  save(await response.blob(), fileNameFromDisposition(response.headers.get("Content-Disposition"), `flight-${flightId}.${format}`));
}

export function saveBlob(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
