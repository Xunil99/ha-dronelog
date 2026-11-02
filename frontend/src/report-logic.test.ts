import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assessmentView, chartSummary, debounce, downloadExport, draftFromRow, exportFormats, exportUrl, fileNameFromDisposition, findingText, flightbookFilterText,
  flightbookView, formatBookDate, fractionLevel, lineChartGeometry, maintenanceBars, parseTags, payloadChanged, planPayload, reportCharts, reportContent,
} from "./report-logic";
import { makeReport, makeReportFlight } from "./fixtures";
import type { FlightbookDTO, MaintenanceRowDTO } from "./types";

afterEach(() => vi.useRealTimers());

describe("parseTags", () => {
  it("trims, strips hashes and drops duplicates ignoring case", () => {
    expect(parseTags("Urlaub, #Alpen, urlaub,  ,##Tirol#")).toEqual(["Urlaub", "Alpen", "Tirol"]);
  });
  it("limits the tag length and handles empty input", () => {
    expect(parseTags("a".repeat(60))[0]).toHaveLength(40);
    expect(parseTags("")).toEqual([]);
  });
});

describe("debounce", () => {
  it("runs once with the last arguments", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const d = debounce(fn, 500);
    d.call(1); d.call(2); d.call(3);
    vi.advanceTimersByTime(499);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith(3);
  });
  it("flush runs a pending call immediately and cancel drops it", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const d = debounce(fn, 500);
    d.call("x");
    d.flush();
    expect(fn).toHaveBeenCalledWith("x");
    d.call("y");
    d.cancel();
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledOnce();
    d.flush();
    expect(fn).toHaveBeenCalledOnce();
  });
});

const book: FlightbookDTO = {
  rows: [
    { nr: 1, flight_id: 1, start: "2026-10-27T12:00:00+00:00", end: "2026-10-27T12:05:30+00:00", date: "2026-10-27", time: "13:00–13:05", day_offset: 0,
      place: { key: "1,2", name: "Wiese", lat: 47.5, lon: 11, label: "Wiese" }, drone_serial: "D1", drone_model: "DJI Test", drone_label: "DJI Test …D001",
      battery_serial: "B1", battery_label: "…H413", duration_s: 330, distance_m: 1460, max_height_m: 40, note: "Test #Alpen", note_text: "Test", tags: ["Alpen"] },
    { nr: 2, flight_id: 2, start: "2026-10-28T12:00:00+00:00", end: "2026-10-28T12:01:00+00:00", date: "2026-10-28", time: "13:00–13:01", day_offset: 0,
      place: null, drone_serial: "D1", drone_model: "", drone_label: "…D001", battery_serial: "", battery_label: null, duration_s: 60, distance_m: 200, max_height_m: 5,
      note: "", note_text: "", tags: [] },
  ],
  summary: { flights: 2, duration_s: 390, distance_m: 1660 },
};

describe("flightbookView", () => {
  it("formats rows as the app does", () => {
    const v = flightbookView(book, "de");
    expect(v.rows[0]).toEqual({ nr: "1", date: "27.10.2026", time: "13:00–13:05", place: "Wiese", drone: "DJI Test …D001", battery: "…H413",
      duration: "5 min 30 s", distance: "1,5 km", note: "Test #Alpen" });
    expect(v.rows[1].place).toBe("–");
    expect(v.rows[1].battery).toBe("–");
  });
  it("sums up flights, flight time and distance", () => {
    expect(flightbookView(book, "de").summary.map((r) => r.value)).toEqual(["2", "6 min 30 s", "1,7 km"]);
    expect(flightbookView(book, "en").summary[1].label).toBe("Flight time");
  });
  it("formats the date per language", () => {
    expect(formatBookDate("2026-01-05", "de")).toBe("05.01.2026");
    expect(formatBookDate("kaputt", "de")).toBe("–");
  });
  it("describes the filter", () => {
    expect(flightbookFilterText({}, "de")).toBe("Alle Flüge");
    expect(flightbookFilterText({ drone: "DJI Test …D001", battery: "…H413", year: 2026 }, "de")).toBe("Drohne: DJI Test …D001 · Akku: …H413 · Jahr: 2026");
    expect(flightbookFilterText({ year: 2025 }, "en")).toBe("Year: 2025");
  });
});

const row = (over: Partial<MaintenanceRowDTO> = {}): MaintenanceRowDTO => ({
  serial: "D1", suffix: "D001", name: "DJI Test …D001", model: "DJI Test",
  plan: { interval_hours: 10, interval_flights: 50, since: "2026-10-01T00:00:00+00:00", notified_due: false },
  status: { used_hours: 9.5, used_flights: 20, hours_fraction: 0.95, flights_fraction: 0.4, level: "soon" }, ...over,
});

describe("maintenance", () => {
  it("classifies the fraction ok / soon / due", () => {
    expect([0, 0.89, 0.9, 0.99, 1, 1.4].map(fractionLevel)).toEqual(["ok", "ok", "soon", "soon", "due", "due"]);
  });
  it("builds a bar per active interval with percent, level and colour", () => {
    const bars = maintenanceBars(row(), "de");
    expect(bars.map((b) => [b.kind, b.percent, b.level])).toEqual([["hours", 95, "soon"], ["flights", 40, "ok"]]);
    expect(bars[0].value).toBe("9 h 30 min / 10 h");
    expect(bars[1].value).toBe("20 / 50");
    expect(bars[0].color).not.toBe(bars[1].color);
  });
  it("caps the bar at 100 percent and shows only active intervals", () => {
    const r = row({ plan: { interval_hours: null, interval_flights: 5, since: "x", notified_due: true }, status: { used_hours: 0, used_flights: 8, hours_fraction: null, flights_fraction: 1.6, level: "due" } });
    const bars = maintenanceBars(r, "en");
    expect(bars).toHaveLength(1);
    expect(bars[0]).toMatchObject({ percent: 100, level: "due" });
  });
  it("has no bars without a plan", () => {
    expect(maintenanceBars(row({ plan: null, status: null }), "de")).toEqual([]);
  });
  it("derives the draft from the plan and keeps the last value of a disabled interval", () => {
    expect(draftFromRow(row())).toEqual({ hoursOn: true, hours: 10, flightsOn: true, flights: 50 });
    const off = draftFromRow(row({ plan: null, status: null }), { hoursOn: true, hours: 25, flightsOn: true, flights: 80 });
    expect(off).toEqual({ hoursOn: false, hours: 25, flightsOn: false, flights: 80 });
  });
  it("builds the payload: off = null, values clamped, NaN falls back", () => {
    expect(planPayload({ hoursOn: false, hours: 10, flightsOn: false, flights: 50 })).toEqual({ hours: null, flights: null });
    expect(planPayload({ hoursOn: true, hours: 9999, flightsOn: true, flights: 0 })).toEqual({ hours: 500, flights: 1 });
    expect(planPayload({ hoursOn: true, hours: Number.NaN, flightsOn: true, flights: 12.6 })).toEqual({ hours: 10, flights: 13 });
  });
  it("only saves changed intervals", () => {
    expect(payloadChanged({ hours: 10, flights: 50 }, row())).toBe(false);
    expect(payloadChanged({ hours: 12, flights: 50 }, row())).toBe(true);
    expect(payloadChanged({ hours: null, flights: null }, row({ plan: null, status: null }))).toBe(false);
    expect(payloadChanged({ hours: 5, flights: null }, row({ plan: null, status: null }))).toBe(true);
  });
});

describe("assessment", () => {
  const a = (level: "good" | "watch" | "critical", over = {}) => ({
    level, headline_code: level, headline: "x",
    state_of_health: { code: "soh_trend_cycles", text: "", params: { health: 88, first: 95, loss: 7, cycles: 40 } },
    points: [{ code: "health_watch", text: "" }, { code: "cell_critical", text: "", params: { mv: 56 } }, { code: "neu", text: "Unbekannter Text" }].map((p) => ({ params: {}, ...p })), ...over,
  });
  it("translates findings by code with parameters", () => {
    const v = assessmentView(a("watch"), "de");
    expect(v.stateOfHealth).toBe("State of Health (laut Akku-Elektronik): 88 % (zu Beginn des Zeitraums 95 %, 7 Punkte in 40 Zyklen).");
    expect(v.points[1]).toContain("56 mV");
    expect(assessmentView(a("watch"), "en").points[0]).toContain("declining");
  });
  it("falls back to the backend text for unknown codes", () => {
    expect(assessmentView(a("watch"), "de").points[2]).toBe("Unbekannter Text");
    expect(findingText({ code: "x", text: "roh", params: {} }, "en")).toBe("roh");
  });
  it("maps the level to colour, symbol, text and headline", () => {
    const [good, watch, critical] = (["good", "watch", "critical"] as const).map((l) => assessmentView(a(l), "de"));
    expect(new Set([good.color, watch.color, critical.color]).size).toBe(3);
    expect(new Set([good.symbol, watch.symbol, critical.symbol]).size).toBe(3);
    expect(critical.headline).toBe("Austausch erwägen");
    expect(good.levelText).toBe("Gut");
  });
  it("treats an unknown level as watch", () => {
    expect(assessmentView({ ...a("good"), level: "weird" as never }, "de").level).toBe("watch");
  });
});

describe("report content", () => {
  it("builds title, subtitle and tiles", () => {
    const c = reportContent(makeReport(), "de", "Europe/Berlin");
    expect(c.title).toBe("Akku BATTERY00H413");
    expect(c.subtitle).toBe("DJI Test · 01.09.2026 – 27.10.2026");
    expect(c.tiles.map((t) => t.value)).toEqual(["3", "16 min 30 s", "12", "86 %"]);
  });
  it("lists the key figures like the app", () => {
    const labels = reportContent(makeReport(), "de", "UTC").rows.map((r) => r.label);
    expect(labels).toEqual(["Flüge", "Strecke", "Zyklen im Zeitraum", "Gesundheit im Zeitraum", "Kapazität (voll)", "Ø Ladung pro Flug verbraucht", "Spannung",
      "Spitzenstrom", "Leistung Ø / Spitze", "Temperatur", "Zellabweichung (max.)", "Flüge über 20 mV Abweichung", "Spannungswarnungen", "Innenwiderstand (Median)"]);
    const rows = Object.fromEntries(reportContent(makeReport(), "de", "UTC").rows.map((r) => [r.label, r.value]));
    expect(rows["Zyklen im Zeitraum"]).toBe("10 → 12 (+2)");
    expect(rows["Zellabweichung (max.)"]).toBe("26 mV (auffällig)");
    expect(rows["Leistung Ø / Spitze"]).toBe("40 W / 104 W");
  });
  it("omits rows without data", () => {
    const r = makeReport({ cycles_first: null, cycles_latest: null, cycles_added: null, health_first: null, health_latest: null, full_capacity_mah: 0, min_voltage: 0,
      peak_current_a: 0, temp_max_c: 0, flights_above_cell_warning: 0, voltage_warnings: 0, resistance_median_mohm: null });
    const c = reportContent(r, "en", "UTC");
    expect(c.rows.map((x) => x.label)).toEqual(["Flights", "Distance", "Avg. charge used per flight", "Power avg. / peak", "Cell deviation (max.)"]);
    expect(c.tiles[2].value).toBe("–");
    expect(c.tiles[3].value).toBe("–");
  });
  it("shows at most the 12 latest flights, newest first", () => {
    const history = Array.from({ length: 15 }, (_, i) => makeReportFlight({ flight_id: i + 1, start: `2026-09-${String(i + 1).padStart(2, "0")}T10:00:00+00:00`, charge_start: 99, charge_end: 70 }));
    const c = reportContent(makeReport({ history }), "de", "UTC");
    expect(c.recent).toHaveLength(12);
    expect(c.recent[0][0]).toContain("15");
    expect(c.recent[0].slice(2)).toEqual(["99 → 70 %", "14,1 A", "33 °C", "3 mV"]);
    expect(c.recentHeader).toHaveLength(6);
  });
  it("carries both footnotes", () => {
    expect(reportContent(makeReport(), "de", "UTC").notes).toHaveLength(2);
  });
});

describe("report charts", () => {
  it("returns six charts in app order, the cell chart with the 20 mV rule", () => {
    const charts = reportCharts(makeReport().history);
    expect(charts.map((c) => c.id)).toEqual(["health", "cycles", "cell", "resistance", "temp", "peak"]);
    expect(charts[2].rule).toBe(20);
    expect(charts[2].zeroBased).toBe(true);
    expect(charts.every((c) => c.points.length >= 2 || c.id === "resistance")).toBe(true);
  });
  it("skips null values and zero temperatures", () => {
    const h = [makeReportFlight({ health_pct: null, temp_max_c: 0 }), makeReportFlight({ start: "2026-10-02T10:00:00+00:00", health_pct: 90, temp_max_c: 30 })];
    const charts = reportCharts(h);
    expect(charts[0].points).toHaveLength(1);
    expect(charts[4].points).toHaveLength(1);
  });
  it("computes geometry inside the plot area and includes the rule in the scale", () => {
    const spec = reportCharts(makeReport().history)[2];
    const g = lineChartGeometry({ ...spec, points: [{ t: 0, v: 2 }, { t: 100, v: 30 }] })!;
    expect(g.dots[0].x).toBeCloseTo(g.plot.left);
    expect(g.dots[1].x).toBeCloseTo(g.plot.right);
    expect(g.max).toBe(30);
    expect(g.min).toBe(0);
    expect(g.ruleY!).toBeLessThan(g.dots[0].y);
    expect(g.ruleY!).toBeGreaterThan(g.dots[1].y);
    expect(g.path.startsWith("M")).toBe(true);
  });
  it("handles a flat series and too few points", () => {
    const flat = lineChartGeometry({ id: "x", title: "ch_cycles", color: "#000", zeroBased: false, points: [{ t: 0, v: 5 }, { t: 10, v: 5 }] })!;
    expect(flat.max).toBeGreaterThan(flat.min);
    expect(lineChartGeometry({ id: "x", title: "ch_cycles", color: "#000", zeroBased: false, points: [{ t: 0, v: 5 }] })).toBeNull();
  });
  it("summarises a chart for screen readers", () => {
    const spec = reportCharts(makeReport().history)[0];
    expect(chartSummary(spec, "de")).toContain("3 Messwerte");
    expect(chartSummary({ ...spec, points: [] }, "de")).toBe("Zu wenige Messwerte");
  });
});

describe("export", () => {
  it("builds urls and offers gpx/kml only with positions", () => {
    expect(exportUrl(7, "gpx")).toBe("/api/dronelog/export/7/gpx");
    expect(exportFormats(true).map((f) => f.format)).toEqual(["csv", "gpx", "kml"]);
    expect(exportFormats(false).map((f) => f.format)).toEqual(["csv"]);
  });
  it("reads the file name from Content-Disposition", () => {
    expect(fileNameFromDisposition('attachment; filename="flug 1.csv"', "x")).toBe("flug 1.csv");
    expect(fileNameFromDisposition(null, "fallback.csv")).toBe("fallback.csv");
  });
  it("downloads with the authenticated fetch and saves the file", async () => {
    const save = vi.fn();
    const fetchWithAuth = vi.fn(async () => new Response("a,b", { headers: { "Content-Disposition": 'attachment; filename="f.csv"' } }));
    await downloadExport({ callWS: vi.fn(), fetchWithAuth }, 5, "csv", save);
    expect(fetchWithAuth).toHaveBeenCalledWith("/api/dronelog/export/5/csv");
    expect(save.mock.calls[0][1]).toBe("f.csv");
  });
  it("fails on a bad status or without authenticated fetch", async () => {
    const fetchWithAuth = vi.fn(async () => new Response("no", { status: 404 }));
    await expect(downloadExport({ callWS: vi.fn(), fetchWithAuth }, 5, "gpx", vi.fn())).rejects.toThrow("404");
    await expect(downloadExport({ callWS: vi.fn() }, 5, "gpx", vi.fn())).rejects.toThrow();
  });
});
