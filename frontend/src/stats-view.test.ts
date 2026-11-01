import { beforeEach, describe, expect, it, vi } from "vitest";
import "./stats-view";
import { makeBattery } from "./fixtures";
import type { StatsDTO } from "./types";

const stats: StatsDTO = {
  totals: { flights: 3, duration_s: 7200, distance_m: 15500 },
  months: [{ month: "2026-08", flights: 2, duration_s: 3600, distance_m: 9000 }, { month: "2026-10", flights: 1, duration_s: 3600, distance_m: 6500 }],
  drones: [{ serial: "D1", serial_suffix: "D001", model: "DJI Test", flights: 3, duration_s: 7200 }],
};

const twoDrones: StatsDTO = { ...stats, drones: [
  { serial: "D1", serial_suffix: "D001", model: "DJI Neo", flights: 2, duration_s: 0 },
  { serial: "D2", serial_suffix: "D002", model: "DJI Avata", flights: 1, duration_s: 0 }] };

function hassFor(result: StatsDTO = stats) {
  return { language: "de", config: { time_zone: "Europe/Berlin" }, themes: { darkMode: false },
    callWS: vi.fn(async (m: Record<string, unknown>) => (m.type === "dronelog/stats" ? result : m.type === "dronelog/batteries"
      ? { batteries: [makeBattery({ serial: "BN", suffix: "NEO1", drones: ["D1"] }), makeBattery({ serial: "BA", suffix: "AVA1", drones: ["D2"] }), makeBattery({ serial: "BB", suffix: "BOTH", drones: ["D1", "D2"] })]
        .filter((b) => !m.drone || b.drones.includes(m.drone as string)) } : { cells: [] })) };
}

type El = HTMLElement & { hass: unknown; updateComplete: Promise<boolean> };
async function mount(hass: ReturnType<typeof hassFor>) {
  const el = document.createElement("dl-stats-view") as El;
  el.hass = hass;
  document.body.appendChild(el);
  for (let i = 0; i < 6; i++) { await new Promise((r) => setTimeout(r, 0)); await el.updateComplete; }
  return el;
}
const text = (el: HTMLElement) => (el.shadowRoot?.textContent ?? "").replace(/\s+/g, " ");

beforeEach(() => { document.body.innerHTML = ""; });

describe("stats-view", () => {
  it("shows totals", async () => {
    const el = await mount(hassFor());
    expect(text(el)).toContain("3");
    expect(text(el)).toContain("2 h 00 min");
    expect(text(el)).toContain("15,5 km");
  });
  it("draws a bar for every month including empty ones", async () => {
    const el = await mount(hassFor());
    expect(el.shadowRoot!.querySelectorAll(".bar").length).toBe(3);
    expect(el.shadowRoot!.querySelectorAll(".bar.empty").length).toBe(1);
  });
  it("switches between flights and hours", async () => {
    const el = await mount(hassFor());
    const toggle = [...el.shadowRoot!.querySelectorAll("button")].find((b) => b.dataset.metric === "duration")!;
    toggle.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector(".bar-label")!.textContent).toMatch(/h|min/);
  });
  it("requests statistics for the selected drone", async () => {
    const hass = hassFor();
    const el = await mount(hass);
    const select = el.shadowRoot!.querySelector("select[name=drone]") as HTMLSelectElement;
    select.value = "D1";
    select.dispatchEvent(new Event("change"));
    await new Promise((r) => setTimeout(r, 0));
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/stats", drone: "D1" });
  });
  it("shows an empty message without flights", async () => {
    const el = await mount(hassFor({ totals: { flights: 0, duration_s: 0, distance_m: 0 }, months: [], drones: [] }));
    expect(text(el)).toContain("Noch keine Flüge");
  });


  const batteryOptions = (el: HTMLElement) => [...el.shadowRoot!.querySelectorAll("select[name=battery] option")].map((o) => (o as HTMLOptionElement).value).filter(Boolean);
  const choose = async (el: HTMLElement, name: string, value: string) => {
    const select = el.shadowRoot!.querySelector(`select[name=${name}]`) as HTMLSelectElement;
    select.value = value;
    select.dispatchEvent(new Event("change"));
    for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
  };

  it("battery filter is disabled and empty until a drone is chosen", async () => {
    const el = await mount(hassFor(twoDrones));
    expect((el.shadowRoot!.querySelector("select[name=battery]") as HTMLSelectElement).disabled).toBe(true);
    expect(batteryOptions(el)).toEqual([]);
  });

  it("lists only the batteries of the chosen drone", async () => {
    const el = await mount(hassFor(twoDrones));
    await choose(el, "drone", "D1");
    expect(batteryOptions(el)).toEqual(["BN", "BB"]);
  });

  it("requests statistics for drone and battery, and resets the battery when the drone changes", async () => {
    const hass = hassFor(twoDrones);
    const el = await mount(hass);
    await choose(el, "drone", "D1");
    await choose(el, "battery", "BN");
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/stats", drone: "D1", battery: "BN" });
    hass.callWS.mockClear();
    await choose(el, "drone", "D2");
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/stats", drone: "D2" });
  });

  it("passes the filters to the battery history and the heatmap", async () => {
    const el = await mount(hassFor(twoDrones));
    await choose(el, "drone", "D1");
    await choose(el, "battery", "BN");
    const history = el.shadowRoot!.querySelector("dl-battery-history") as HTMLElement & { drone?: string; battery?: string };
    const heat = el.shadowRoot!.querySelector("dl-heatmap-view") as HTMLElement & { drone?: string; battery?: string };
    expect([history.drone, history.battery, heat.drone, heat.battery]).toEqual(["D1", "BN", "D1", "BN"]);
  });
});
