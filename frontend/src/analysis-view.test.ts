import { beforeEach, describe, expect, it, vi } from "vitest";
import "./analysis-view";
import { makeBattery, makeReport } from "./fixtures";
import type { StatsDTO } from "./types";

const stats: StatsDTO = {
  totals: { flights: 3, duration_s: 7200, distance_m: 15500 }, months: [{ month: "2026-10", flights: 3, duration_s: 7200, distance_m: 15500 }],
  drones: [{ serial: "D1", serial_suffix: "D001", model: "DJI Neo", flights: 2, duration_s: 0 }, { serial: "D2", serial_suffix: "D002", model: "DJI Avata", flights: 1, duration_s: 0 }],
};
const logbook = { flights: 3, duration_s: 7200, distance_m: 15500, longest_flight_s: 600, farthest_flight_m: 3000, highest_m: 90, fastest_ms: 15, years: [{ year: 2026, flights: 3, duration_s: 7200, distance_m: 15500 }], places: [], tags: {} };

function hassFor() {
  return { language: "de", config: { time_zone: "UTC" }, themes: { darkMode: false },
    callWS: vi.fn(async (m: Record<string, unknown>) => {
      switch (m.type) {
        case "dronelog/stats": return stats;
        case "dronelog/batteries": return { batteries: [makeBattery({ serial: "BN", suffix: "NEO1", drones: ["D1"] }), makeBattery({ serial: "BA", suffix: "AVA1", drones: ["D2"] })].filter((b) => !m.drone || b.drones.includes(m.drone as string)) };
        case "dronelog/logbook": return logbook;
        case "dronelog/maintenance_get": return { drones: [] };
        case "dronelog/battery_report": return makeReport();
        default: return { cells: [] };
      }
    }) };
}
type El = HTMLElement & { hass: unknown; openReport?: string; updateComplete: Promise<boolean> };
const tick = async (el: El) => { for (let i = 0; i < 6; i++) { await new Promise((r) => setTimeout(r, 0)); await el.updateComplete; } };
async function mount(hass = hassFor()) {
  const el = document.createElement("dl-analysis-view") as El;
  el.hass = hass;
  document.body.appendChild(el);
  await tick(el);
  return { el, hass };
}
const root = (el: El) => el.shadowRoot!;
const choose = async (el: El, name: string, value: string) => {
  const select = root(el).querySelector(`select[name=${name}]`) as HTMLSelectElement;
  select.value = value;
  select.dispatchEvent(new Event("change"));
  await tick(el);
};
const section = async (el: El, id: string) => { (root(el).querySelector(`button[data-section=${id}]`) as HTMLButtonElement).click(); await tick(el); };

beforeEach(() => { document.body.innerHTML = ""; });

describe("analysis-view", () => {
  it("starts with the statistics and offers logbook and maintenance", async () => {
    const { el } = await mount();
    expect(root(el).querySelector("dl-stats-view")).not.toBeNull();
    expect([...root(el).querySelectorAll("button[data-section]")].map((b) => b.textContent)).toEqual(["Statistik", "Logbuch", "Wartung"]);
    await section(el, "logbook");
    expect(root(el).querySelector("dl-logbook-view")).not.toBeNull();
    await section(el, "maintenance");
    expect(root(el).querySelector("dl-maintenance-view")).not.toBeNull();
    expect(root(el).querySelector("select[name=drone]")).toBeNull();
  });
  it("disables the battery filter until a drone is chosen and lists only its batteries", async () => {
    const { el } = await mount();
    const battery = () => root(el).querySelector("select[name=battery]") as HTMLSelectElement;
    expect(battery().disabled).toBe(true);
    await choose(el, "drone", "D1");
    expect(battery().disabled).toBe(false);
    expect([...battery().options].map((o) => o.value).filter(Boolean)).toEqual(["BN"]);
  });
  it("passes the filters to statistics and logbook and resets the battery when the drone changes", async () => {
    const { el, hass } = await mount();
    await choose(el, "drone", "D1");
    await choose(el, "battery", "BN");
    const stats = root(el).querySelector("dl-stats-view") as HTMLElement & { drone: string; battery: string };
    expect([stats.drone, stats.battery]).toEqual(["D1", "BN"]);
    await section(el, "logbook");
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/logbook", drone: "D1", battery: "BN" });
    const logbookView = root(el).querySelector("dl-logbook-view") as HTMLElement & { droneLabel: string; batteryLabel: string };
    expect([logbookView.droneLabel, logbookView.batteryLabel]).toEqual(["DJI Neo …D001", "…NEO1"]);
    await choose(el, "drone", "D2");
    expect((root(el).querySelector("dl-logbook-view") as HTMLElement & { battery: string }).battery).toBe("");
  });
  it("opens the battery report from an event and returns with back", async () => {
    const { el } = await mount();
    root(el).querySelector("dl-stats-view")!.dispatchEvent(new CustomEvent("open-battery-report", { detail: "BN", bubbles: true, composed: true }));
    // das Ereignis steigt zum Panel auf; hier öffnet der Reiter den Bericht über openReport
    el.openReport = "BN";
    await tick(el);
    const report = root(el).querySelector("dl-battery-report") as HTMLElement & { serial: string };
    expect(report.serial).toBe("BN");
    report.dispatchEvent(new CustomEvent("close"));
    await tick(el);
    expect(root(el).querySelector("dl-battery-report")).toBeNull();
    expect(root(el).querySelector("dl-stats-view")).not.toBeNull();
  });
});
