import { beforeEach, describe, expect, it, vi } from "vitest";
import "./dronelog-panel";
import { makeBattery, makeDetail, makeSummary } from "./fixtures";

function hass() {
  return { language: "de", config: { time_zone: "UTC" }, themes: { darkMode: false },
    callWS: vi.fn(async (m: Record<string, unknown>) => {
      switch (m.type) {
        case "dronelog/flights": return { flights: [makeSummary({ id: 7 })], total: 1 };
        case "dronelog/flight": return makeDetail();
        case "dronelog/stats": return { totals: { flights: 1, duration_s: 60, distance_m: 100 }, months: [{ month: "2026-10", flights: 1, duration_s: 60, distance_m: 100 }], drones: [] };
        case "dronelog/batteries": return { batteries: [makeBattery()] };
        case "dronelog/heatmap": return { cells: [] };
        default: return {};
      }
    }) };
}

type El = HTMLElement & { hass: unknown; narrow: boolean; panel: unknown; updateComplete: Promise<boolean> };
async function mount(narrow = false) {
  const el = document.createElement("dronelog-panel") as El;
  el.hass = hass();
  el.narrow = narrow;
  el.panel = { config: { tile_url: "" } };
  document.body.appendChild(el);
  for (let i = 0; i < 4; i++) { await new Promise((r) => setTimeout(r, 0)); await el.updateComplete; }
  return el;
}
const tab = (el: El, name: string) => [...el.shadowRoot!.querySelectorAll("nav button")].find((b) => b.textContent!.includes(name)) as HTMLButtonElement;

beforeEach(() => { document.body.innerHTML = ""; });

describe("dronelog-panel", () => {
  it("shows the flights tab first and switches to the statistics tab", async () => {
    const el = await mount();
    expect(el.shadowRoot!.querySelector("dl-flights-view")).not.toBeNull();
    tab(el, "Auswertung").click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("dl-stats-view")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("dl-flights-view")).toBeNull();
  });
  it("jumps to the flights tab with the chosen flight when the heatmap opens one", async () => {
    const el = await mount();
    tab(el, "Auswertung").click();
    await el.updateComplete;
    el.shadowRoot!.querySelector("dl-stats-view")!.dispatchEvent(new CustomEvent("open-flight", { detail: 7, bubbles: true, composed: true }));
    await el.updateComplete;
    const view = el.shadowRoot!.querySelector("dl-flights-view") as HTMLElement & { initialId?: number };
    expect(view).not.toBeNull();
    expect(view.initialId).toBe(7);
  });
  it("shows the menu button on narrow screens and fires hass-toggle-menu", async () => {
    const el = await mount(true);
    let fired = false;
    el.addEventListener("hass-toggle-menu", () => { fired = true; });
    (el.shadowRoot!.querySelector("header button") as HTMLButtonElement).click();
    expect(fired).toBe(true);
  });
});
