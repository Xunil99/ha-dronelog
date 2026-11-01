import { beforeEach, describe, expect, it, vi } from "vitest";
import "./heatmap-view";
import { makeSummary } from "./fixtures";

function hassFor(cells: { lat: number; lon: number; count: number }[]) {
  return { language: "de", config: { time_zone: "UTC" }, themes: { darkMode: false },
    callWS: vi.fn(async (m: Record<string, unknown>) => (m.type === "dronelog/heatmap" ? { cells: cells.map((c) => ({ ...c })) } : { flights: [makeSummary({ id: 7 })] })) };
}

type El = HTMLElement & { hass: unknown; tileUrl: string; updateComplete: Promise<boolean>; handleCellClick(lat: number, lon: number): Promise<void> };
async function mount(hass: ReturnType<typeof hassFor>) {
  const el = document.createElement("dl-heatmap-view") as El;
  el.hass = hass;
  el.tileUrl = "";
  document.body.appendChild(el);
  for (let i = 0; i < 6; i++) { await new Promise((r) => setTimeout(r, 0)); await el.updateComplete; }
  return el;
}
const text = (el: HTMLElement) => (el.shadowRoot?.textContent ?? "").replace(/\s+/g, " ");

beforeEach(() => { document.body.innerHTML = ""; });

describe("heatmap-view", () => {
  it("shows an empty message without cells", async () => {
    const el = await mount(hassFor([]));
    expect(text(el)).toContain("Keine Positionsdaten");
  });
  it("requests the heatmap with the chosen grid size", async () => {
    const hass = hassFor([{ lat: 47.5, lon: 11, count: 2 }]);
    const el = await mount(hass);
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/heatmap", precision_m: 300 });
    const select = el.shadowRoot!.querySelector("select[name=precision]") as HTMLSelectElement;
    select.value = "1000";
    select.dispatchEvent(new Event("change"));
    await new Promise((r) => setTimeout(r, 0));
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/heatmap", precision_m: 1000 });
  });
  it("lists the flights of a clicked cell and opens a flight", async () => {
    const hass = hassFor([{ lat: 47.5, lon: 11, count: 2 }]);
    const el = await mount(hass);
    await el.handleCellClick(47.5, 11);
    await el.updateComplete;
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/cell_flights", lat: 47.5, lon: 11, precision_m: 300 });
    let opened = 0;
    el.addEventListener("open-flight", (e) => { opened = (e as CustomEvent<number>).detail; });
    (el.shadowRoot!.querySelector("li") as HTMLElement).click();
    expect(opened).toBe(7);
  });

  it("does not reload or re-fit the map when Home Assistant sets a new hass object", async () => {
    const hass = hassFor([{ lat: 47.5, lon: 11, count: 2 }]);
    const el = await mount(hass);
    const map = (el as unknown as { map: { fitBounds: (...a: unknown[]) => unknown } }).map;
    const original = map.fitBounds.bind(map);
    let fits = 0;
    map.fitBounds = (...args: unknown[]) => { fits++; return original(...args); };
    const calls = hass.callWS.mock.calls.length;
    for (let i = 0; i < 3; i++) {
      el.hass = { ...hass };
      await el.updateComplete;
    }
    expect(fits).toBe(0);
    expect(hass.callWS.mock.calls.length).toBe(calls);
  });

  it("survives a failing cell request", async () => {
    const hass = hassFor([{ lat: 47.5, lon: 11, count: 2 }]);
    const el = await mount(hass);
    hass.callWS.mockRejectedValueOnce({ code: "unknown_error" });
    await expect(el.handleCellClick(1, 1)).resolves.toBeUndefined();
  });


  it("requests the heatmap with drone and battery filters and reloads when they change", async () => {
    const hass = hassFor([{ lat: 47.5, lon: 11, count: 2 }]);
    const el = await mount(hass);
    (el as unknown as { drone: string; battery: string }).drone = "D1";
    (el as unknown as { drone: string; battery: string }).battery = "B1";
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/heatmap", precision_m: 300, drone: "D1", battery: "B1" });
  });

  it("passes the filters to the cell request", async () => {
    const hass = hassFor([{ lat: 47.5, lon: 11, count: 2 }]);
    const el = await mount(hass);
    (el as unknown as { drone: string }).drone = "D1";
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.handleCellClick(47.5, 11);
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/cell_flights", lat: 47.5, lon: 11, precision_m: 300, drone: "D1" });
  });


  it("fits the map without animation so a filter change takes effect immediately", async () => {
    const hass = hassFor([{ lat: 47.5, lon: 11, count: 2 }]);
    const el = await mount(hass);
    const map = (el as unknown as { map: { fitBounds: (...a: unknown[]) => unknown } }).map;
    const original = map.fitBounds.bind(map);
    const options: unknown[] = [];
    map.fitBounds = (bounds: unknown, opts: unknown) => { options.push(opts); return original(bounds, opts); };
    (el as unknown as { drone: string }).drone = "D1";
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    expect(options.length).toBeGreaterThan(0);
    expect(options[0]).toMatchObject({ animate: false });
  });
});
