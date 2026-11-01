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
    detail.battery!.health_pct = null;
    detail.battery!.cycles = null;
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


describe("flights-view robustness", () => {
  function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((r) => { resolve = r; });
    return { promise, resolve };
  }

  it("shows the flight of the LAST click even when answers arrive out of order", async () => {
    const flights = [makeSummary({ id: 2, distance_m: 2222 }), makeSummary({ id: 1, distance_m: 1111 }), makeSummary({ id: 3, distance_m: 3333 })];
    const slow = deferred<unknown>();
    const fast = deferred<unknown>();
    const hass = makeHass((m) => {
      if (m.type === "dronelog/flight") {
        if (m.flight_id === 2) return { ...makeDetail(), summary: flights[0] };
        return m.flight_id === 1 ? slow.promise : fast.promise;
      }
      return standardHandler(flights)(m);
    });
    const el = await mount(hass);
    const list = el.shadowRoot!.querySelector("dl-flight-list") as HTMLElement;
    list.dispatchEvent(new CustomEvent("select", { detail: 1 }));
    list.dispatchEvent(new CustomEvent("select", { detail: 3 }));
    fast.resolve({ ...makeDetail(), summary: flights[2] });
    await settle(el as never);
    slow.resolve({ ...makeDetail(), summary: flights[1] });
    await settle(el as never);
    expect(text(el)).toContain("3,3 km");        // Flug 3
    expect(text(el)).not.toContain("1,1 km");    // Flug 1 darf die Anzeige nicht überschreiben
  });

  it("a double click on 'Mehr laden' requests the next page only once", async () => {
    const page = Array.from({ length: 50 }, (_, i) => makeSummary({ id: 100 - i }));
    const gate = deferred<unknown>();
    const hass = makeHass((m) => (m.type === "dronelog/flights" && m.offset === 50 ? gate.promise : standardHandler(page, 120)(m)));
    const el = await mount(hass);
    const more = [...el.shadowRoot!.querySelectorAll("button")].find((b) => b.textContent!.includes("Mehr laden"))!;
    more.click();
    more.click();
    gate.resolve({ flights: [makeSummary({ id: 1 })], total: 120 });
    await settle(el as never);
    expect(hass.callWS.mock.calls.filter((c) => (c[0] as Record<string, unknown>).offset === 50)).toHaveLength(1);
  });

  it("a page of the old filter is not appended to the new list", async () => {
    const page = Array.from({ length: 50 }, (_, i) => makeSummary({ id: 100 - i }));
    const gate = deferred<unknown>();
    const hass = makeHass((m) => {
      if (m.type === "dronelog/flights" && m.offset === 50) return gate.promise;
      if (m.type === "dronelog/flights" && m.drone) return { flights: [makeSummary({ id: 500 })], total: 1 };
      return standardHandler(page, 120)(m);
    });
    const el = await mount(hass);
    const more = [...el.shadowRoot!.querySelectorAll("button")].find((b) => b.textContent!.includes("Mehr laden"))!;
    more.click();
    const select = el.shadowRoot!.querySelector("select[name=drone]") as HTMLSelectElement;
    select.value = "DRONE0001D003";
    select.dispatchEvent(new Event("change"));
    await settle(el as never);
    gate.resolve({ flights: [makeSummary({ id: 7 }), makeSummary({ id: 8 })], total: 120 });
    await settle(el as never);
    const list = el.shadowRoot!.querySelector("dl-flight-list") as unknown as { flights: { id: number }[] };
    expect(list.flights.map((f) => f.id)).toEqual([500]);
  });

  it("an error while loading one flight keeps list and filters usable", async () => {
    const flights = [makeSummary({ id: 2 }), makeSummary({ id: 1 })];
    const hass = makeHass((m) => {
      if (m.type === "dronelog/flight" && m.flight_id === 1) throw { code: "not_found", message: "weg" };
      return standardHandler(flights)(m);
    });
    const el = await mount(hass);
    (el.shadowRoot!.querySelector("dl-flight-list") as HTMLElement).dispatchEvent(new CustomEvent("select", { detail: 1 }));
    await settle(el as never);
    expect(el.shadowRoot!.querySelector("select[name=drone]")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("dl-flight-list")).not.toBeNull();
    expect(text(el)).toContain("Fehler beim Laden");
  });

  it("shows a note instead of zero values when the flight has no battery data", async () => {
    const detail = makeDetail({ battery: null });
    const el = await mount(makeHass(standardHandler([makeSummary()], 1, detail)));
    expect(text(el)).toContain("Keine Akkudaten");
    expect(text(el)).not.toContain("0 % → 0 %");
  });

  it("uses initialId once: a later filter change selects the newest flight again", async () => {
    const flights = [makeSummary({ id: 2 }), makeSummary({ id: 1 })];
    const hass = makeHass(standardHandler(flights));
    const el = document.createElement("dl-flights-view") as HTMLElement & { hass: unknown; initialId?: number; updateComplete: Promise<boolean> };
    el.hass = hass;
    el.initialId = 1;
    document.body.appendChild(el);
    await settle(el);
    expect(hass.callWS).toHaveBeenCalledWith(expect.objectContaining({ type: "dronelog/flight", flight_id: 1 }));
    hass.callWS.mockClear();
    const select = el.shadowRoot!.querySelector("select[name=drone]") as HTMLSelectElement;
    select.value = "DRONE0001D003";
    select.dispatchEvent(new Event("change"));
    await settle(el);
    expect(hass.callWS).toHaveBeenCalledWith(expect.objectContaining({ type: "dronelog/flight", flight_id: 2 }));
  });
});

describe("flights-view battery filter depends on the drone filter", () => {
  function handler() {
    const flights = [makeSummary({ id: 2 }), makeSummary({ id: 1 })];
    const base = standardHandler(flights);
    return (m: Record<string, unknown>) => {
      if (m.type === "dronelog/stats") {
        return { totals: { flights: 2, duration_s: 0, distance_m: 0 }, months: [], drones: [
          { serial: "DRONE0001D003", serial_suffix: "D003", model: "DJI Neo", flights: 1, duration_s: 0 },
          { serial: "DRONE0002D004", serial_suffix: "D004", model: "DJI Avata", flights: 1, duration_s: 0 }] };
      }
      if (m.type === "dronelog/batteries") {
        return { batteries: [makeBattery({ serial: "BAT_NEO", suffix: "NEO1", drones: ["DRONE0001D003"] }),
                              makeBattery({ serial: "BAT_AVATA", suffix: "AVA1", drones: ["DRONE0002D004"] }),
                              makeBattery({ serial: "BAT_BOTH", suffix: "BOTH", drones: ["DRONE0001D003", "DRONE0002D004"] })] };
      }
      return base(m);
    };
  }
  const batteryOptions = (el: HTMLElement) => [...el.shadowRoot!.querySelectorAll("select[name=battery] option")].map((o) => (o as HTMLOptionElement).value).filter(Boolean);
  const chooseDrone = async (el: HTMLElement, value: string) => {
    const select = el.shadowRoot!.querySelector("select[name=drone]") as HTMLSelectElement;
    select.value = value;
    select.dispatchEvent(new Event("change"));
    await settle(el as never);
  };

  it("lists no batteries while 'all drones' is selected", async () => {
    const el = await mount(makeHass(handler()));
    expect(batteryOptions(el)).toEqual([]);
  });

  it("lists only the batteries of the selected drone", async () => {
    const el = await mount(makeHass(handler()));
    await chooseDrone(el, "DRONE0001D003");
    expect(batteryOptions(el)).toEqual(["BAT_NEO", "BAT_BOTH"]);
    await chooseDrone(el, "DRONE0002D004");
    expect(batteryOptions(el)).toEqual(["BAT_AVATA", "BAT_BOTH"]);
  });

  it("resets the battery filter when another drone is chosen", async () => {
    const hass = makeHass(handler());
    const el = await mount(hass);
    await chooseDrone(el, "DRONE0001D003");
    const battery = el.shadowRoot!.querySelector("select[name=battery]") as HTMLSelectElement;
    battery.value = "BAT_NEO";
    battery.dispatchEvent(new Event("change"));
    await settle(el as never);
    hass.callWS.mockClear();
    await chooseDrone(el, "DRONE0002D004");
    const last = hass.callWS.mock.calls.filter((c) => (c[0] as Record<string, unknown>).type === "dronelog/flights").pop()![0] as Record<string, unknown>;
    expect(last.drone).toBe("DRONE0002D004");
    expect(last.battery).toBeUndefined();
  });

  it("drops the battery filter when going back to all drones", async () => {
    const hass = makeHass(handler());
    const el = await mount(hass);
    await chooseDrone(el, "DRONE0001D003");
    const battery = el.shadowRoot!.querySelector("select[name=battery]") as HTMLSelectElement;
    battery.value = "BAT_NEO";
    battery.dispatchEvent(new Event("change"));
    await settle(el as never);
    hass.callWS.mockClear();
    await chooseDrone(el, "");
    const last = hass.callWS.mock.calls.filter((c) => (c[0] as Record<string, unknown>).type === "dronelog/flights").pop()![0] as Record<string, unknown>;
    expect(last.battery).toBeUndefined();
  });

  it("offers a toggle with the number of flights with events and filters server-side", async () => {
    const withEvents = makeSummary({ id: 7, event_kinds: ["lowGPS"] });
    const plain = makeSummary({ id: 8 });
    const hass = makeHass((m) => {
      if (m.type === "dronelog/flights") {
        const rows = m.only_events ? [withEvents] : [plain, withEvents];
        return { flights: m.limit === 1 ? rows.slice(0, 1) : rows, total: rows.length } satisfies FlightsResult;
      }
      return standardHandler([plain, withEvents])(m);
    });
    const el = await mount(hass);
    expect(text(el)).toContain("Nur mit Ereignissen (1)");
    const box = el.shadowRoot!.querySelector("input[name=only_events]") as HTMLInputElement;
    box.checked = true;
    box.dispatchEvent(new Event("change"));
    await settle(el);
    expect(hass.callWS).toHaveBeenCalledWith(expect.objectContaining({ type: "dronelog/flights", only_events: true, limit: 50 }));
    const list = el.shadowRoot!.querySelector("dl-flight-list") as HTMLElement & { flights: unknown[] };
    expect(list.flights).toHaveLength(1);
  });

  it("hides the toggle when no flight has events", async () => {
    const hass = makeHass((m) => (m.type === "dronelog/flights" && m.only_events ? { flights: [], total: 0 } : standardHandler([makeSummary()])(m)));
    const el = await mount(hass);
    expect(el.shadowRoot!.querySelector("input[name=only_events]")).toBeNull();
  });
});
