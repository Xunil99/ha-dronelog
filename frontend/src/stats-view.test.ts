import { beforeEach, describe, expect, it, vi } from "vitest";
import "./stats-view";
import { makeBattery } from "./fixtures";
import type { StatsDTO } from "./types";

const stats: StatsDTO = {
  totals: { flights: 3, duration_s: 7200, distance_m: 15500 },
  months: [{ month: "2026-08", flights: 2, duration_s: 3600, distance_m: 9000 }, { month: "2026-10", flights: 1, duration_s: 3600, distance_m: 6500 }],
  drones: [{ serial: "D1", serial_suffix: "D001", model: "DJI Test", flights: 3, duration_s: 7200 }],
};

function hassFor(result: StatsDTO = stats) {
  return { language: "de", config: { time_zone: "Europe/Berlin" }, themes: { darkMode: false },
    callWS: vi.fn(async (m: Record<string, unknown>) => (m.type === "dronelog/stats" ? result : m.type === "dronelog/batteries" ? { batteries: [makeBattery()] } : { cells: [] })) };
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
});
