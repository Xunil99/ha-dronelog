// Entwicklungs-Harness: gefälschtes hass-Objekt mit SYNTHETISCHEN Daten (keine echten Flüge oder Orte).
import "../src/dronelog-panel";
import { makeAnalysis, makeBattery, makeChannelPoints, makeDetail, makeExtras, makeReport, makeReportFlight, makeSummary } from "../src/fixtures";

const params = new URLSearchParams(location.search);
const narrow = params.get("narrow") === "1";
const empty = params.get("empty") === "1";

const base = new Date("2026-10-27T13:11:11Z").getTime();
const summaries = empty ? [] : Array.from({ length: 12 }, (_, i) =>
  makeSummary({ id: 12 - i, ...(i % 2 === 0 ? { event_kinds: ['signalLossGoHome', 'weakSignal'], photo_count: 2, video_s: 95 } : {}), start: new Date(base - i * 86400000 * 3).toISOString(), duration_s: 200 + i * 40, distance_m: 900 + i * 150, battery_suffix: ["H413", "KG66", "05KP"][i % 3], has_position: i !== 5 }));

function detailFor(id: number) {
  const summary = summaries.find((s) => s.id === id) ?? summaries[0];
  const detail = makeDetail({ extras: makeExtras(), analysis: makeAnalysis() }, summary);
  const channels = makeChannelPoints(60);
  detail.points = detail.points.map((p, i) => ({ ...channels[i], lat: p.lat, lon: p.lon }));
  detail.battery = { ...detail.battery!, internal_resistance_mohm: 187.4 };
  // Dev-Koordinaten: generischer Ort in den Alpen, nicht das Zuhause des Nutzers
  detail.points = detail.points.map((p) => ({ ...p, lat: summary.has_position ? 47.5 + (p.lat! - 48.75) : null, lon: summary.has_position ? 11.0 + (p.lon! - 12.4) : null }));
  detail.start = summary.has_position ? { lat: 47.5, lon: 11.0 } : null;
  detail.end = summary.has_position ? { lat: 47.512, lon: 11.001 } : null;
  if (id === 3) detail.weather = null;
  return { ...detail, summary };
}

let placeName: string | null = "Testwiese";
// Synthetische Wartungs-, Logbuch- und Flugbuchdaten (keine echten Orte)
let plans: Record<string, { interval_hours: number | null; interval_flights: number | null }> = { DRONE0001D003: { interval_hours: 1, interval_flights: 40 }, DRONE0002D004: { interval_hours: null, interval_flights: null } };
const maintRow = (serial: string, name: string, used: number, flights: number) => {
  const p = plans[serial];
  const active = p && (p.interval_hours !== null || p.interval_flights !== null);
  const hf = active && p.interval_hours ? used / p.interval_hours : null;
  const ff = active && p.interval_flights ? flights / p.interval_flights : null;
  const worst = Math.max(hf ?? 0, ff ?? 0);
  return { serial, suffix: serial.slice(-4), name, model: name.split(" ")[0], plan: active ? { ...p, since: "2026-09-01T00:00:00+00:00", notified_due: false } : null,
    status: active ? { used_hours: used, used_flights: flights, hours_fraction: hf, flights_fraction: ff, level: worst >= 1 ? "due" : worst >= 0.9 ? "soon" : "ok" } : null };
};
const bookRows = Array.from({ length: 45 }, (_, i) => ({ nr: i + 1, flight_id: i + 1, start: "", end: "", date: `2026-10-${String(1 + (i % 28)).padStart(2, "0")}`, time: `1${i % 10}:00–1${i % 10}:0${1 + (i % 8)}`, day_offset: 0,
  place: i % 3 ? { key: "1,2", name: i % 3 === 1 ? "Testwiese" : null, lat: 47.5, lon: 11.0, label: i % 3 === 1 ? "Testwiese" : "47.500, 11.000" } : null,
  drone_serial: "DRONE0001D003", drone_model: "DJI Test", drone_label: "DJI Test …D003", battery_serial: "B", battery_label: "…H413", duration_s: 200 + i * 20, distance_m: 900 + i * 50, max_height_m: 40,
  note: i % 4 === 0 ? "Übungsflug am See #Training #Alpen" : "", note_text: "", tags: [] }));
const report = makeReport({
  history: Array.from({ length: 14 }, (_, i) => makeReportFlight({ flight_id: i + 1, start: new Date(base - (14 - i) * 86400000 * 9).toISOString(), cycles: 10 + i, health_pct: 99 - Math.floor(i * 0.8),
    cell_deviation_mv: 3 + (i % 5) * (i > 9 ? 6 : 1), resistance_mohm: 170 + i * 2, temp_max_c: 28 + (i % 6), peak_current_a: 12 + (i % 4), duration_s: 300 + i * 10 })),
  flights: 14, cycles_latest: 23, health_latest: 89,
});
const notes: Record<number, { text: string; tags: string[] }> = {};

const hass = {
  fetchWithAuth: async () => new Response("a,b\n1,2\n", { headers: { "Content-Disposition": 'attachment; filename="flug.csv"' } }),
  language: params.get("lang") ?? "de",
  config: { time_zone: "Europe/Berlin" },
  themes: { darkMode: params.get("dark") === "1" },
  callWS: async (m: Record<string, unknown>) => {
    await new Promise((r) => setTimeout(r, 80));
    switch (m.type) {
      case "dronelog/flights": if (m.only_events) { const ev = summaries.filter((x) => x.event_kinds?.length); return { flights: ev.slice(0, Number(m.limit ?? 50)), total: ev.length }; } return { flights: summaries.slice(Number(m.offset ?? 0), Number(m.offset ?? 0) + Number(m.limit ?? 50)), total: summaries.length };
      case "dronelog/flight": return detailFor(Number(m.flight_id));
      case "dronelog/heatmap": return { cells: [{ lat: 47.5, lon: 11.0, count: 9 }, { lat: 47.512, lon: 11.003, count: 4 }, { lat: 47.53, lon: 11.05, count: 2 }, { lat: 47.48, lon: 10.97, count: 1 }] };
      case "dronelog/cell_flights": return { flights: summaries.slice(0, 3) };
      case "dronelog/stats": return { totals: { flights: summaries.length, duration_s: 4000, distance_m: 15000 }, months: [{ month: "2026-05", flights: 3, duration_s: 900, distance_m: 4000 }, { month: "2026-08", flights: 8, duration_s: 3600, distance_m: 9000 }, { month: "2026-09", flights: 5, duration_s: 2100, distance_m: 6000 }, { month: "2026-10", flights: 12, duration_s: 5400, distance_m: 15000 }], drones: [{ serial: "DRONE0001D003", serial_suffix: "D003", model: "DJI Test", flights: summaries.length, duration_s: 4000 }] };
      case "dronelog/batteries": return { batteries: [makeBattery(), makeBattery({ serial: "B2KG66", suffix: "KG66", history: makeBattery().history.map((h, i) => ({ ...h, health_pct: 95 - i * 4, cell_deviation_mv: 8 + i * 9 })) })] };
      case "dronelog/logbook": return { flights: summaries.length, duration_s: 14000, distance_m: 52000, longest_flight_s: 820, farthest_flight_m: 4100, highest_m: 118.4, fastest_ms: 17.3,
        years: [{ year: 2026, flights: 9, duration_s: 9000, distance_m: 40000 }, { year: 2025, flights: 3, duration_s: 5000, distance_m: 12000 }],
        places: [{ key: "1,2", lat: 47.5, lon: 11.0, flights: 8, duration_s: 9000, name: placeName }, { key: "3,4", lat: 47.53, lon: 11.05, flights: 4, duration_s: 5000, name: null }], tags: { Training: 4, Alpen: 2 } };
      case "dronelog/place_name_set": placeName = String(m.name) || null; return { key: m.key, name: placeName };
      case "dronelog/flightbook": return { rows: bookRows, summary: { flights: bookRows.length, duration_s: 12000, distance_m: 52000 } };
      case "dronelog/battery_report": return report;
      case "dronelog/note_get": return { flight_id: m.flight_id, ...(notes[Number(m.flight_id)] ?? { text: "", tags: [] }) };
      case "dronelog/note_set": notes[Number(m.flight_id)] = { text: String(m.text), tags: String(m.tags).split(",").map((x) => x.trim()).filter(Boolean) }; return { flight_id: m.flight_id, ...notes[Number(m.flight_id)] };
      case "dronelog/maintenance_get": return { drones: [maintRow("DRONE0001D003", "DJI Test …D003", 0.95, 12), maintRow("DRONE0002D004", "DJI Zweite …D004", 0.2, 3)] };
      case "dronelog/maintenance_set": plans[String(m.drone)] = { interval_hours: m.interval_hours as number | null, interval_flights: m.interval_flights as number | null }; return maintRow(String(m.drone), "DJI Test …D003", 0.95, 12);
      case "dronelog/maintenance_serviced": return maintRow(String(m.drone), "DJI Test …D003", 0, 0);
      default: return {};
    }
  },
};

const panel = document.createElement("dronelog-panel") as HTMLElement & Record<string, unknown>;
panel.hass = hass;
panel.narrow = narrow;
if (params.get("tab") === "stats") setTimeout(() => (panel.shadowRoot!.querySelectorAll("nav button")[1] as HTMLButtonElement).click(), 400);
if (params.get("report")) setTimeout(() => panel.shadowRoot!.querySelector("main")!.dispatchEvent(new CustomEvent("open-battery-report", { detail: "BATTERY00H413" })), 400);
panel.panel = { config: { tile_url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png" } };
document.body.appendChild(panel);
