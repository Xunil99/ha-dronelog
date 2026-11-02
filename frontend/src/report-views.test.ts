import { beforeEach, describe, expect, it, vi } from "vitest";
import "./logbook-view";
import "./maintenance-view";
import "./flight-note";
import "./flightbook-view";
import "./battery-report-view";
import "./flight-detail";
import { DOC_CSS, PRINT_PAGE_CSS, SCREEN_PRINT_CSS, printDocument } from "./print-doc";
import { html } from "lit";
import { makeDetail, makeReport } from "./fixtures";
import type { FlightbookDTO, MaintenanceRowDTO } from "./types";

type El = HTMLElement & { updateComplete: Promise<boolean>; [key: string]: unknown };
const tick = async (el: El, n = 6) => { for (let i = 0; i < n; i++) { await new Promise((r) => setTimeout(r, 0)); await el.updateComplete; } };
async function mount<T extends El = El>(tag: string, props: Record<string, unknown>): Promise<T> {
  const el = document.createElement(tag) as T;
  Object.assign(el, props);
  document.body.appendChild(el);
  await tick(el);
  return el;
}
const text = (el: HTMLElement) => (el.shadowRoot?.textContent ?? "").replace(/\s+/g, " ");
beforeEach(() => { document.body.innerHTML = ""; vi.useRealTimers(); });

const logbook = {
  flights: 3, duration_s: 7200, distance_m: 15500, longest_flight_s: 600, farthest_flight_m: 3000, highest_m: 90.5, fastest_ms: 15,
  years: [{ year: 2026, flights: 2, duration_s: 100, distance_m: 1000 }, { year: 2025, flights: 1, duration_s: 50, distance_m: 500 }],
  places: [{ key: "1,2", lat: 47.5, lon: 11, flights: 2, duration_s: 100, name: "Wiese" }, { key: "3,4", lat: 47.6, lon: 11.1, flights: 1, duration_s: 50, name: null }],
  tags: { Alpen: 2, Urlaub: 5 },
};
const book: FlightbookDTO = { rows: [], summary: { flights: 0, duration_s: 0, distance_m: 0 } };

function hassWith(handler: (m: Record<string, unknown>) => unknown, language = "de") {
  return { language, config: { time_zone: "UTC" }, themes: { darkMode: false }, callWS: vi.fn(async (m: Record<string, unknown>) => handler(m)) };
}

describe("logbook-view", () => {
  const make = () => hassWith((m) => (m.type === "dronelog/logbook" ? logbook : m.type === "dronelog/flightbook" ? book : m.type === "dronelog/place_name_set" ? { key: m.key, name: m.name || null } : {}));
  it("shows totals, records, years, places and the tag counter sorted by count", async () => {
    const el = await mount("dl-logbook-view", { hass: make() });
    const content = text(el);
    expect(content).toContain("2 h 00 min");
    expect(content).toContain("15,5 km");
    expect(content).toContain("Rekorde");
    expect(content).toContain("2026");
    expect(content).toContain("Wiese");
    expect(content).toContain("Unbenannter Ort");
    expect(content).toContain("47.500, 11.000");
    const tags = [...el.shadowRoot!.querySelectorAll("#tags-card .kv span")].map((s) => s.textContent);
    expect(tags).toEqual(["#Urlaub", "#Alpen"]);
  });
  it("requests the logbook with the filters", async () => {
    const hass = make();
    await mount("dl-logbook-view", { hass, drone: "D1", battery: "B1" });
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/logbook", drone: "D1", battery: "B1" });
  });
  it("names a place through place_name_set and shows the name", async () => {
    const hass = make();
    const el = await mount("dl-logbook-view", { hass });
    (el.shadowRoot!.querySelector("button.place[data-key='3,4']") as HTMLButtonElement).click();
    await tick(el);
    const input = el.shadowRoot!.querySelector("#place-name") as HTMLInputElement;
    input.value = " Spielplatz ";
    input.dispatchEvent(new Event("input"));
    (el.shadowRoot!.querySelector("form.edit") as HTMLFormElement).dispatchEvent(new Event("submit", { cancelable: true }));
    await tick(el);
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/place_name_set", key: "3,4", name: "Spielplatz" });
    expect(el.shadowRoot!.querySelector("form.edit")).toBeNull();
  });
  it("shows an error next to the place form when naming fails and keeps the form open", async () => {
    const hass = hassWith((m) => { if (m.type === "dronelog/place_name_set") throw new Error("x"); return m.type === "dronelog/logbook" ? logbook : {}; });
    const el = await mount("dl-logbook-view", { hass });
    (el.shadowRoot!.querySelector("button.place[data-key='3,4']") as HTMLButtonElement).click();
    await tick(el);
    (el.shadowRoot!.querySelector("form.edit") as HTMLFormElement).dispatchEvent(new Event("submit", { cancelable: true }));
    await tick(el);
    expect(el.shadowRoot!.querySelector("form.edit")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("form.edit [role=alert]")).not.toBeNull();
    expect(el.shadowRoot!.querySelector("#places-card")).not.toBeNull();
  });
  it("discards a stale flight book answer when a newer request was made", async () => {
    const resolvers: Array<(v: unknown) => void> = [];
    const hass = hassWith((m) => (m.type === "dronelog/logbook" ? logbook : new Promise((resolve) => { resolvers.push(resolve); })));
    const el = await mount("dl-logbook-view", { hass });
    const create = el.shadowRoot!.querySelector("#create-book") as HTMLButtonElement;
    create.click();
    await tick(el);
    (el as unknown as { busy: boolean }).busy = false;  // zweite Anfrage trotz laufender erster (z. B. Filterwechsel)
    (el as unknown as { createBook(): Promise<void> }).createBook();
    await tick(el);
    expect(resolvers).toHaveLength(2);
    resolvers[1]({ rows: [], summary: { flights: 2, duration_s: 0, distance_m: 0 } });
    await tick(el);
    resolvers[0]({ rows: [], summary: { flights: 1, duration_s: 0, distance_m: 0 } });
    await tick(el);
    expect((el as unknown as { book: { data: FlightbookDTO } }).book.data.summary.flights).toBe(2);
  });
  it("creates the flight book for the chosen year and the filters, then goes back", async () => {
    const hass = make();
    const el = await mount("dl-logbook-view", { hass, drone: "D1", droneLabel: "DJI Test …D001" });
    const select = el.shadowRoot!.querySelector("select[name=year]") as HTMLSelectElement;
    select.value = "2026";
    select.dispatchEvent(new Event("change"));
    (el.shadowRoot!.querySelector("#create-book") as HTMLButtonElement).click();
    await tick(el);
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/flightbook", drone: "D1", year: 2026 });
    const view = el.shadowRoot!.querySelector("dl-flightbook-view") as El;
    expect(view).not.toBeNull();
    await tick(view);
    expect(text(view)).toContain("Drohne: DJI Test …D001 · Jahr: 2026");
    view.dispatchEvent(new CustomEvent("close"));
    await tick(el);
    expect(el.shadowRoot!.querySelector("dl-flightbook-view")).toBeNull();
  });
});

describe("flightbook and printing", () => {
  it("renders the table with repeated header, empty state and signature line", async () => {
    const data: FlightbookDTO = { rows: [{ nr: 1, flight_id: 1, start: "", end: "", date: "2026-10-27", time: "13:00–13:05", day_offset: 0, place: null, drone_serial: "D", drone_model: "M",
      drone_label: "M …D001", battery_serial: "B", battery_label: "…H413", duration_s: 330, distance_m: 1460, max_height_m: 4, note: "x #y", note_text: "x", tags: ["y"] }], summary: { flights: 1, duration_s: 330, distance_m: 1460 } };
    const el = await mount("dl-flightbook-view", { book: data, filterText: "Alle Flüge", lang: "de" });
    const ths = [...el.shadowRoot!.querySelectorAll("thead th")].map((th) => th.textContent);
    expect(ths).toEqual(["Nr.", "Datum", "Zeit", "Ort", "Drohne", "Dauer", "Strecke", "Notiz"]);
    expect(text(el)).toContain("27.10.2026");
    expect(text(el)).toContain("Datum, Unterschrift Pilot");
    expect(text(el)).toContain("Drucken / als PDF speichern");
    const empty = await mount("dl-flightbook-view", { book, lang: "en" });
    expect(text(empty)).toContain("No flights for this filter.");
    expect(empty.shadowRoot!.querySelector("table")).toBeNull();
  });
  it("has print styles for A4, repeated headers and unbroken rows", () => {
    expect(PRINT_PAGE_CSS).toContain("size: A4");
    expect(PRINT_PAGE_CSS).toMatch(/@media print\s*\{\s*@page\s*\{\s*size: A4/);
    expect(SCREEN_PRINT_CSS).toMatch(/@media print[\s\S]*\.bar\s*\{\s*display:\s*none/);
    expect(DOC_CSS).toMatch(/thead\s*\{\s*display:\s*table-header-group/);
    expect(DOC_CSS).toMatch(/tr\s*\{[^}]*break-inside:\s*avoid/);
  });
  function fakeWindow(contentDocument: Document | null) {
    const frameWindow = { addEventListener: vi.fn(), focus: vi.fn(), print: vi.fn() };
    const frame = { setAttribute: vi.fn(), tabIndex: 0, style: {} as Record<string, string>, remove: vi.fn(), contentDocument, contentWindow: contentDocument ? frameWindow : null };
    const win = { print: vi.fn(), document: { createElement: vi.fn(() => frame), body: { appendChild: vi.fn() }, documentElement: { lang: "de" } } };
    return { win: win as unknown as Window, winPrint: win.print, frame, frameWindow };
  }
  it("prints the document from a separate frame, not the Home Assistant page", () => {
    vi.useFakeTimers();
    const target = document.implementation.createHTMLDocument("x");
    const { win, winPrint, frame, frameWindow } = fakeWindow(target);
    expect(printDocument(html`<p id="doc">Flugbuch</p>`, "Titel", win)).toBe(true);
    expect(target.body.textContent).toContain("Flugbuch");
    vi.advanceTimersByTime(60);
    expect(frameWindow.print).toHaveBeenCalledOnce();
    expect(winPrint).not.toHaveBeenCalled();
    expect(frameWindow.addEventListener).toHaveBeenCalledWith("afterprint", expect.any(Function), { once: true });
    vi.advanceTimersByTime(130_000);
    expect(frame.remove).toHaveBeenCalled();
  });
  it("falls back to printing the page when no frame document is available", () => {
    const { win, winPrint, frame } = fakeWindow(null);
    expect(printDocument(html`<p>x</p>`, "t", win)).toBe(false);
    expect(winPrint).toHaveBeenCalledOnce();
    expect(frame.remove).toHaveBeenCalled();
  });
  it("the print button hands the rendered flight book to the printer", async () => {
    const el = await mount("dl-flightbook-view", { book, lang: "de" });
    const target = document.implementation.createHTMLDocument("x");
    const { win } = fakeWindow(target);
    const original = window.document.createElement.bind(window.document);
    const spy = vi.spyOn(document, "createElement").mockImplementation(((tag: string) => (tag === "iframe" ? win.document.createElement("iframe") : original(tag))) as never);
    vi.spyOn(document.body, "appendChild").mockImplementation((node) => node);
    (el.shadowRoot!.querySelector("#print") as HTMLButtonElement).click();
    expect(target.body.textContent).toContain("Flugbuch");
    expect(target.body.textContent).toContain("Keine Flüge für diesen Filter.");
    spy.mockRestore();
    vi.restoreAllMocks();
  });
});

describe("battery-report-view", () => {
  it("loads the report and shows tiles, six charts with labels, figures, recent flights, assessment and footnotes", async () => {
    const hass = hassWith((m) => (m.type === "dronelog/battery_report" ? makeReport() : {}));
    const el = await mount("dl-battery-report", { hass, serial: "BATTERY00H413" });
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/battery_report", battery_serial: "BATTERY00H413" });
    const root = el.shadowRoot!;
    expect(root.querySelector("h1")!.textContent).toBe("Akku BATTERY00H413");
    const charts = [...root.querySelectorAll(".chart svg")];
    expect(charts).toHaveLength(5);  // Innenwiderstand hat nur einen Wert: „Zu wenige Messwerte“
    expect(root.querySelectorAll(".chart .none")).toHaveLength(1);
    for (const svg of charts) {
      expect(svg.getAttribute("role")).toBe("img");
      expect(svg.getAttribute("aria-label")).toMatch(/^Diagramm .+: 3 Messwerte/);
    }
    expect(root.querySelector(".chart line[stroke-dasharray]")).not.toBeNull();  // 20-mV-Schwelle
    expect(root.querySelectorAll("tbody tr")).toHaveLength(3);
    const box = root.querySelector(".assessment") as HTMLElement;
    expect(box.dataset.level).toBe("watch");
    expect(box.style.getPropertyValue("--level")).toBe("#ef6c00");
    expect(box.textContent).toContain("Akku beobachten");
    expect(box.textContent).toContain("State of Health (laut Akku-Elektronik): 86 %");
    expect(box.querySelectorAll("li")).toHaveLength(3);
    expect(root.querySelectorAll(".footnote")).toHaveLength(2);
  });
  it("shows an error for batteries without measurements and a back button", async () => {
    const hass = { language: "en", config: {}, callWS: vi.fn(async () => { throw new Error("not_found"); }) };
    const el = await mount("dl-battery-report", { hass, serial: "X" });
    expect(text(el)).toContain("There are no measurements for this battery.");
    let closed = false;
    el.addEventListener("close", () => { closed = true; });
    (el.shadowRoot!.querySelector("#back") as HTMLButtonElement).click();
    expect(closed).toBe(true);
  });
});

const mrow = (over: Partial<MaintenanceRowDTO> = {}): MaintenanceRowDTO => ({
  serial: "D1", suffix: "D001", name: "DJI Test …D001", model: "DJI Test",
  plan: { interval_hours: 10, interval_flights: null, since: "2026-10-01T00:00:00+00:00", notified_due: false },
  status: { used_hours: 9.5, used_flights: 20, hours_fraction: 0.95, flights_fraction: null, level: "soon" }, ...over,
});

describe("maintenance-view", () => {
  it("lists the drones with progress bars (aria values), badge and the Home Assistant hint", async () => {
    const hass = hassWith((m) => (m.type === "dronelog/maintenance_get" ? { drones: [mrow(), mrow({ serial: "D2", name: "Zweite", plan: null, status: null })] } : {}));
    const el = await mount("dl-maintenance-view", { hass });
    expect(text(el)).toContain("Home Assistant liefert zusätzlich Sensoren");
    const cards = [...el.shadowRoot!.querySelectorAll("dl-maintenance-card")] as El[];
    expect(cards).toHaveLength(2);
    await tick(cards[0]);
    const bar = cards[0].shadowRoot!.querySelector("[role=progressbar]") as HTMLElement;
    expect(bar.getAttribute("aria-valuenow")).toBe("95");
    expect(bar.getAttribute("aria-label")).toBe("Flugstunden seit der Wartung");
    expect(bar.dataset.level).toBe("soon");
    expect(text(cards[0])).toContain("Bald fällig");
    expect(cards[1].shadowRoot!.querySelector("[role=progressbar]")).toBeNull();
    expect(cards[1].shadowRoot!.querySelector("#serviced")).toBeNull();
  });
  it("shows an empty message without drones", async () => {
    const el = await mount("dl-maintenance-view", { hass: hassWith(() => ({ drones: [] })) });
    expect(text(el)).toContain("Noch keine Drohnen");
  });
  it("saves a changed interval once, debounced, and shows the new state", async () => {
    vi.useFakeTimers();
    const updated = mrow({ plan: { interval_hours: 12, interval_flights: 30, since: "x", notified_due: false }, status: { used_hours: 1, used_flights: 3, hours_fraction: 0.1, flights_fraction: 0.1, level: "ok" } });
    const hass = hassWith((m) => (m.type === "dronelog/maintenance_set" ? updated : {}));
    const card = document.createElement("dl-maintenance-card") as El;
    Object.assign(card, { hass, row: mrow() });
    document.body.appendChild(card);
    await vi.advanceTimersByTimeAsync(0); await card.updateComplete;
    const root = card.shadowRoot!;
    const hours = root.querySelector("input[type=number]") as HTMLInputElement;
    for (const v of ["11", "12"]) { hours.value = v; hours.dispatchEvent(new Event("input")); await card.updateComplete; }
    const flightsOn = root.querySelector("input[name=flights_on]") as HTMLInputElement;
    flightsOn.checked = true;
    flightsOn.dispatchEvent(new Event("change"));
    await card.updateComplete;
    const flights = root.querySelectorAll("input[type=number]")[1] as HTMLInputElement;
    flights.value = "30"; flights.dispatchEvent(new Event("input"));
    await card.updateComplete;
    expect(hass.callWS).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(500); await card.updateComplete;
    const sets = hass.callWS.mock.calls.filter((c) => (c[0] as { type: string }).type === "dronelog/maintenance_set");
    expect(sets).toHaveLength(1);
    expect(sets[0][0]).toEqual({ type: "dronelog/maintenance_set", drone: "D1", interval_hours: 12, interval_flights: 30 });
    expect(root.textContent).toContain("Gespeichert");
    expect(root.querySelectorAll("[role=progressbar]")).toHaveLength(2);
  });
  it("does not save when nothing changed, and switching both intervals off sends nulls", async () => {
    vi.useFakeTimers();
    const hass = hassWith((m) => (m.type === "dronelog/maintenance_set" ? mrow({ plan: null, status: null }) : {}));
    const card = document.createElement("dl-maintenance-card") as El;
    Object.assign(card, { hass, row: mrow() });
    document.body.appendChild(card);
    await vi.advanceTimersByTimeAsync(0); await card.updateComplete;
    const on = card.shadowRoot!.querySelector("input[name=hours_on]") as HTMLInputElement;
    on.checked = true; on.dispatchEvent(new Event("change"));
    await vi.advanceTimersByTimeAsync(600);
    expect(hass.callWS).not.toHaveBeenCalled();
    on.checked = false; on.dispatchEvent(new Event("change"));
    await vi.advanceTimersByTimeAsync(600); await card.updateComplete;
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/maintenance_set", drone: "D1", interval_hours: null, interval_flights: null });
    expect(card.shadowRoot!.querySelector("#serviced")).toBeNull();
  });
  it("marks the drone as serviced", async () => {
    const after = mrow({ status: { used_hours: 0, used_flights: 0, hours_fraction: 0, flights_fraction: null, level: "ok" } });
    const hass = hassWith((m) => (m.type === "dronelog/maintenance_serviced" ? after : {}));
    const card = await mount("dl-maintenance-card", { hass, row: mrow() });
    (card.shadowRoot!.querySelector("#serviced") as HTMLButtonElement).click();
    await tick(card);
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/maintenance_serviced", drone: "D1" });
    expect((card.shadowRoot!.querySelector("[role=progressbar]") as HTMLElement).getAttribute("aria-valuenow")).toBe("0");
  });
});

describe("flight-note", () => {
  it("loads the note, then saves note and parsed tags debounced", async () => {
    const hass = hassWith((m) => (m.type === "dronelog/note_get" ? { flight_id: 5, text: "alt", tags: ["a", "b"] } : { flight_id: 5, text: "", tags: [] }));
    const el = await mount("dl-flight-note", { hass, flightId: 5 });
    const area = el.shadowRoot!.querySelector("textarea") as HTMLTextAreaElement;
    const tags = el.shadowRoot!.querySelector("input") as HTMLInputElement;
    expect(area.value).toBe("alt");
    expect(tags.value).toBe("a, b");
    vi.useFakeTimers();
    area.value = "neu"; area.dispatchEvent(new Event("input"));
    tags.value = "#Alpen, alpen, See"; tags.dispatchEvent(new Event("input"));
    await vi.advanceTimersByTimeAsync(300);
    expect(hass.callWS).not.toHaveBeenCalledWith(expect.objectContaining({ type: "dronelog/note_set" }));
    await vi.advanceTimersByTimeAsync(400);
    const sets = hass.callWS.mock.calls.filter((c) => (c[0] as { type: string }).type === "dronelog/note_set");
    expect(sets).toHaveLength(1);
    expect(sets[0][0]).toEqual({ type: "dronelog/note_set", flight_id: 5, text: "neu", tags: "Alpen, See" });
  });
  it("flushes a pending save when removed from the page", async () => {
    const hass = hassWith((m) => (m.type === "dronelog/note_get" ? { flight_id: 5, text: "", tags: [] } : { flight_id: 5, text: "x", tags: [] }));
    const el = await mount("dl-flight-note", { hass, flightId: 5 });
    const area = el.shadowRoot!.querySelector("textarea") as HTMLTextAreaElement;
    area.value = "x"; area.dispatchEvent(new Event("input"));
    el.remove();
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/note_set", flight_id: 5, text: "x", tags: "" });
  });
});

describe("flight-note robustness", () => {
  it("saves a pending change on pagehide", async () => {
    const hass = hassWith((m) => (m.type === "dronelog/note_get" ? { flight_id: 5, text: "", tags: [] } : { flight_id: 5, text: "x", tags: [] }));
    const el = await mount("dl-flight-note", { hass, flightId: 5 });
    const area = el.shadowRoot!.querySelector("textarea") as HTMLTextAreaElement;
    area.value = "x"; area.dispatchEvent(new Event("input"));
    window.dispatchEvent(new Event("pagehide"));
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/note_set", flight_id: 5, text: "x", tags: "" });
  });
  it("sends only the latest state after an in-flight request finishes and keeps the order", async () => {
    const sent: string[] = [];
    const resolvers: Array<() => void> = [];
    const hass = hassWith((m) => {
      if (m.type === "dronelog/note_get") return { flight_id: 5, text: "", tags: [] };
      sent.push(m.text as string);
      return new Promise<void>((resolve) => { resolvers.push(resolve); });
    });
    const el = await mount("dl-flight-note", { hass, flightId: 5 });
    const area = el.shadowRoot!.querySelector("textarea") as HTMLTextAreaElement;
    const type = (v: string) => { area.value = v; area.dispatchEvent(new Event("input")); (el as unknown as { saver: { flush(): void } }).saver.flush(); };
    type("a");
    await tick(el);
    type("b"); type("c");
    await tick(el);
    expect(sent).toEqual(["a"]);  // b und c warten auf die laufende Anfrage
    resolvers[0]();
    await tick(el);
    expect(sent).toEqual(["a", "c"]);
    resolvers[1]();
    await tick(el);
    expect(el.shadowRoot!.querySelector(".status")!.textContent).toContain("Gespeichert");
  });
  it("offers a retry when loading the note fails", async () => {
    let fail = true;
    const hass = hassWith((m) => { if (m.type === "dronelog/note_get") { if (fail) throw new Error("x"); return { flight_id: 5, text: "alt", tags: [] }; } return {}; });
    const el = await mount("dl-flight-note", { hass, flightId: 5 });
    const retry = el.shadowRoot!.querySelector("#retry") as HTMLButtonElement;
    expect(retry).not.toBeNull();
    fail = false;
    retry.click();
    await tick(el);
    expect((el.shadowRoot!.querySelector("textarea") as HTMLTextAreaElement).value).toBe("alt");
    expect(el.shadowRoot!.querySelector("#retry")).toBeNull();
  });
});

describe("flight-detail extras", () => {
  const detailEl = async (hass: ReturnType<typeof hassWith>, detail = makeDetail()) => mount("dl-flight-detail", { hass, detail, lang: "de", timeZone: "UTC" });
  it("offers CSV, GPX and KML with positions and only CSV without", async () => {
    const hass = hassWith(() => ({ flight_id: 1, text: "", tags: [] }));
    const el = await detailEl(hass);
    const links = [...el.shadowRoot!.querySelectorAll("#export-card a")] as HTMLAnchorElement[];
    expect(links.map((a) => a.dataset.format)).toEqual(["csv", "gpx", "kml"]);
    expect(links[1].getAttribute("href")).toBe("/api/dronelog/export/1/gpx");
    const none = await detailEl(hass, makeDetail({}, { has_position: false }));
    expect([...none.shadowRoot!.querySelectorAll("#export-card a")].map((a) => (a as HTMLElement).dataset.format)).toEqual(["csv"]);
  });
  it("downloads with the authenticated fetch and reports failures", async () => {
    const hass = { ...hassWith(() => ({ flight_id: 1, text: "", tags: [] })), fetchWithAuth: vi.fn(async () => new Response("x", { status: 500 })) };
    const el = await detailEl(hass as never);
    const link = el.shadowRoot!.querySelector("#export-card a[data-format=csv]") as HTMLAnchorElement;
    const event = new MouseEvent("click", { cancelable: true, bubbles: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    await tick(el);
    expect(hass.fetchWithAuth).toHaveBeenCalledWith("/api/dronelog/export/1/csv");
    expect(text(el)).toContain("Download fehlgeschlagen");
  });
  it("embeds the note editor and opens the battery report of the flight", async () => {
    const hass = hassWith(() => ({ flight_id: 1, text: "", tags: [] }));
    const el = await detailEl(hass);
    expect(el.shadowRoot!.querySelector("dl-flight-note")).not.toBeNull();
    let serial = "";
    el.addEventListener("open-battery-report", (e) => { serial = (e as CustomEvent<string>).detail; });
    (el.shadowRoot!.querySelector("#open-report") as HTMLButtonElement).click();
    expect(serial).toBe("BATTERY00H413");
  });
});
