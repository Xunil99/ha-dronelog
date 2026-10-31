import { beforeEach, describe, expect, it, vi } from "vitest";
import "./flights-view";
import { makeBattery, makeDetail, makeSummary } from "./fixtures";
import type { FlightsResult } from "./types";

type Handler = (msg: Record<string, unknown>) => unknown;

function makeHass(handler: Handler, lang = "de") {
  return { language: lang, config: { time_zone: "Europe/Berlin" }, themes: { darkMode: false }, callWS: vi.fn(async (m: Record<string, unknown>) => handler(m)) };
}

async function mount(hass: ReturnType<typeof makeHass>, narrow = false) {
  const el = document.createElement("dl-flights-view") as HTMLElement & { hass: unknown; narrow: boolean; updateComplete: Promise<boolean> };
  el.hass = hass;
  el.narrow = narrow;
  document.body.appendChild(el);
  await settle(el);
  return el;
}

async function settle(el: { updateComplete: Promise<boolean> }) {
  for (let i = 0; i < 6; i++) {
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
  }
}

function deepText(root: ParentNode | null | undefined): string {
  if (!root) return "";
  let out = "";
  for (const node of Array.from(root.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) out += node.textContent ?? "";
    else if (node instanceof Element) out += " " + deepText(node.shadowRoot) + " " + deepText(node) + " ";
  }
  return out;
}

const text = (el: HTMLElement) => deepText(el.shadowRoot).replace(/\s+/g, " ");

function standardHandler(flights: ReturnType<typeof makeSummary>[], total = flights.length, detail = makeDetail()): Handler {
  return (m) => {
    switch (m.type) {
      case "dronelog/flights": return { flights, total } satisfies FlightsResult;
      case "dronelog/flight": return { ...detail, summary: flights.find((f) => f.id === m.flight_id) ?? detail.summary };
      case "dronelog/stats": return { totals: { flights: total, duration_s: 0, distance_m: 0 }, months: [], drones: [{ serial: "DRONE0001D003", serial_suffix: "D003", model: "DJI Test", flights: total, duration_s: 0 }] };
      case "dronelog/batteries": return { batteries: [makeBattery()] };
      default: return {};
    }
  };
}

beforeEach(() => { document.body.innerHTML = ""; });

describe("flights-view", () => {
  it("shows an empty message when there are no flights", async () => {
    const el = await mount(makeHass(standardHandler([])));
    expect(text(el)).toContain("Noch keine Flüge");
  });

  it("selects the newest flight automatically and shows its details", async () => {
    const hass = makeHass(standardHandler([makeSummary({ id: 2, duration_s: 330 }), makeSummary({ id: 1 })]));
    const el = await mount(hass);
    expect(hass.callWS).toHaveBeenCalledWith(expect.objectContaining({ type: "dronelog/flight", flight_id: 2 }));
    expect(text(el)).toContain("5 min 30 s");
    expect(text(el)).toContain("1,5 km");
  });

  it("loads the next page with offset 50", async () => {
    const page = Array.from({ length: 50 }, (_, i) => makeSummary({ id: 100 - i }));
    const hass = makeHass(standardHandler(page, 120));
    const el = await mount(hass);
    const more = [...el.shadowRoot!.querySelectorAll("button")].find((b) => b.textContent!.includes("Mehr laden"))!;
    more.click();
    await settle(el as never);
    expect(hass.callWS).toHaveBeenCalledWith(expect.objectContaining({ type: "dronelog/flights", offset: 50 }));
  });

  it("requests the flights again with the drone filter", async () => {
    const hass = makeHass(standardHandler([makeSummary()]));
    const el = await mount(hass);
    const select = el.shadowRoot!.querySelector("select[name=drone]") as HTMLSelectElement;
    select.value = "DRONE0001D003";
    select.dispatchEvent(new Event("change"));
    await settle(el as never);
    expect(hass.callWS).toHaveBeenCalledWith(expect.objectContaining({ type: "dronelog/flights", drone: "DRONE0001D003", offset: 0 }));
  });

  it("shows dashes and notes for missing weather and health values", async () => {
    const detail = makeDetail({ weather: null });
    detail.battery.health_pct = null;
    detail.battery.cycles = null;
    const el = await mount(makeHass(standardHandler([makeSummary()], 1, detail)));
    expect(text(el)).toContain("Kein Wetter vorhanden");
    expect(text(el)).not.toMatch(/null|NaN/);
    expect(text(el)).toContain("Gesundheit –");
  });

  it("escapes the file name instead of rendering markup", async () => {
    const detail = makeDetail({ source_name: "<img src=x onerror=alert(1)>.txt" });
    const el = await mount(makeHass(standardHandler([makeSummary()], 1, detail)));
    expect(el.shadowRoot!.querySelector("img")).toBeNull();
    const nested = [...el.shadowRoot!.querySelectorAll("*")].flatMap((n) => (n.shadowRoot ? [...n.shadowRoot.querySelectorAll("img")] : []));
    expect(nested).toHaveLength(0);
    expect(text(el)).toContain("<img src=x onerror=alert(1)>.txt");
  });

  it("narrow layout shows the list first, then the detail with a back button", async () => {
    const el = await mount(makeHass(standardHandler([makeSummary({ id: 2 }), makeSummary({ id: 1 })])), true);
    expect(el.shadowRoot!.querySelector("dl-flight-list")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("dl-flight-detail")).toBeNull();
    (el.shadowRoot!.querySelector("dl-flight-list") as HTMLElement).dispatchEvent(new CustomEvent("select", { detail: 1 }));
    await settle(el as never);
    expect(el.shadowRoot!.querySelector("dl-flight-detail")).not.toBeNull();
    const back = [...el.shadowRoot!.querySelectorAll("button")].find((b) => b.textContent!.includes("Zurück"))!;
    back.click();
    await settle(el as never);
    expect(el.shadowRoot!.querySelector("dl-flight-list")).not.toBeNull();
  });

  it("uses English texts for English users", async () => {
    const el = await mount(makeHass(standardHandler([]), "en"));
    expect(text(el)).toContain("No flights yet");
  });

  it("shows an error message when loading fails", async () => {
    const el = await mount(makeHass(() => { throw { code: "unauthorized", message: "nein" }; }));
    expect(text(el)).toContain("Fehler beim Laden");
  });
});
