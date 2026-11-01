// Entwicklungs-Harness: gefälschtes hass-Objekt mit SYNTHETISCHEN Daten (keine echten Flüge oder Orte).
import "../src/dronelog-panel";
import { makeAnalysis, makeBattery, makeChannelPoints, makeDetail, makeExtras, makeSummary } from "../src/fixtures";

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

const hass = {
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
      default: return {};
    }
  },
};

const panel = document.createElement("dronelog-panel") as HTMLElement & Record<string, unknown>;
panel.hass = hass;
panel.narrow = narrow;
if (params.get("tab") === "stats") setTimeout(() => (panel.shadowRoot!.querySelectorAll("nav button")[1] as HTMLButtonElement).click(), 400);
panel.panel = { config: { tile_url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png" } };
document.body.appendChild(panel);
