import { beforeEach, describe, expect, it } from "vitest";
import L from "leaflet";
import "./flight-detail";
import "./flight-list";
import "./flight-charts";
import "./route-map";
import { makeAnalysis, makeChannelPoints, makeDetail, makeExtras, makePoints, makeSummary } from "./fixtures";
import type { FlightDetailDTO } from "./types";

type El = HTMLElement & Record<string, unknown> & { updateComplete: Promise<boolean> };

async function mount(tag: string, props: Record<string, unknown>) {
  const el = document.createElement(tag) as El;
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  return el;
}
const text = (el: HTMLElement, selector?: string) => (selector ? el.shadowRoot!.querySelector(selector) : el.shadowRoot)?.textContent?.replace(/\s+/g, " ") ?? "";

beforeEach(() => { document.body.innerHTML = ""; });

describe("flight list badges", () => {
  it("shows event icons by severity, photo count and video time", async () => {
    const f = makeSummary({ event_kinds: ["signalLossGoHome", "lowGPS"], photo_count: 3, video_s: 95 });
    const el = await mount("dl-flight-list", { flights: [f], lang: "de" });
    const kinds = Array.from(el.shadowRoot!.querySelectorAll(".badge.event")).map((b) => [b.getAttribute("data-kind"), b.getAttribute("data-severity")]);
    expect(kinds).toEqual([["signalLossGoHome", "critical"], ["lowGPS", "warning"]]);
    expect(text(el, "[data-badge=photos]")).toContain("3");
    expect(text(el, "[data-badge=video]")).toContain("1 min 35 s");
    expect(el.shadowRoot!.querySelector(".badge.event")!.getAttribute("aria-label")).toBe("Rückkehr wegen Verbindungsabbruch");
  });
  it("shows no badge row for flights without events or media (also old backends)", async () => {
    const el = await mount("dl-flight-list", { flights: [makeSummary(), makeSummary({ id: 2, event_kinds: [], photo_count: 0, video_s: 0 })], lang: "de" });
    expect(el.shadowRoot!.querySelector(".badges")).toBeNull();
  });
});

describe("flight detail cards", () => {
  const full = (): FlightDetailDTO => makeDetail({ points: makeChannelPoints(), extras: makeExtras(), analysis: makeAnalysis() });
  it("shows energy, radio, camera, phases and events", async () => {
    const el = await mount("dl-flight-detail", { detail: full(), lang: "de", timeZone: "UTC" });
    expect(text(el, "#energy-card")).toContain("5,6 Wh");
    expect(text(el, "#energy-card")).toContain("4,0 Wh/km");
    expect(text(el, "#signal-card")).toContain("12 %");
    expect(text(el, "#signal-card")).toContain("1,9 km");
    expect(text(el, "#camera-card")).toContain("1 min 35 s");
    expect(text(el, "#phases-card")).toContain("Reiseflug");
    const rows = Array.from(el.shadowRoot!.querySelectorAll("#events-card .event")).map((e) => [e.querySelector(".text")!.textContent, e.querySelector(".time")!.textContent]);
    expect(rows).toEqual([["Funksignal schwach · 5 s", "0:30"], ["Rückkehr wegen Akku", "1:30"]]);
  });
  it("extends the battery card (level, resistance estimate, capacity, voltage, peak current)", async () => {
    const detail = full();
    detail.battery = { ...detail.battery!, internal_resistance_mohm: 187.4, cell_deviation_max_v: 0.035 };
    detail.analysis = makeAnalysis({ cell_level: "minor" });
    const el = await mount("dl-flight-detail", { detail, lang: "de", timeZone: "UTC" });
    const card = text(el, "#battery-card");
    expect(card).toContain("35 mV (auffällig)");
    expect(card).toContain("187 mΩ (Schätzung)");
    expect(card).toContain("2800 mAh");
    expect(card).toContain("7,3 … 8,2 V");
    expect(card).toContain("14,1 A");
  });
  it("adds the aircraft wind hint to the weather card, also without weather data", async () => {
    const el = await mount("dl-flight-detail", { detail: full(), lang: "de", timeZone: "UTC" });
    expect(text(el, "#weather-card")).toContain("Wind laut Flugzeug");
    expect(text(el, "#weather-card")).toContain("mäßig, aus NO (45°)");
    const noWeather = await mount("dl-flight-detail", { detail: { ...full(), weather: null }, lang: "en", timeZone: "UTC" });
    expect(text(noWeather, "#weather-card")).toContain("moderate, from NE (45°)");
  });
  it("hides empty cards and explains missing extras", async () => {
    const old = makeDetail();  // altes Backend: weder extras noch analysis
    const el = await mount("dl-flight-detail", { detail: old, lang: "de", timeZone: "UTC" });
    for (const id of ["#energy-card", "#signal-card", "#camera-card", "#phases-card"]) expect(el.shadowRoot!.querySelector(id)).toBeNull();
    expect(text(el, "#events-card")).toContain("noch keine Ereignisdaten");
    const none = await mount("dl-flight-detail", { detail: makeDetail({ extras: makeExtras({ events: [], photo_count: 0, video_s: 0, energy_wh: 0 }) }), lang: "de", timeZone: "UTC" });
    expect(text(none, "#events-card")).toContain("Keine Ereignisse in diesem Flug.");
    expect(none.shadowRoot!.querySelector("#camera-card")).toBeNull();
  });
  it("is bilingual", async () => {
    const el = await mount("dl-flight-detail", { detail: full(), lang: "en", timeZone: "UTC" });
    expect(text(el, "#energy-card")).toContain("5.6 Wh");
    expect(text(el, "#events-card")).toContain("Return home due to battery");
    expect(text(el, "#signal-card")).toContain("Downlink (worst value)");
  });
});

describe("flight charts parity", () => {
  it("offers the channel charts and the mode band only when data exists", async () => {
    const plain = await mount("dl-flight-charts", { points: makePoints(20), lang: "de" });
    expect(plain.shadowRoot!.querySelectorAll(".chart")).toHaveLength(2);
    expect(plain.shadowRoot!.querySelector("#modes")).toBeNull();
    const full = await mount("dl-flight-charts", { points: makeChannelPoints(30), lang: "de", events: makeExtras().events, modeSegments: makeAnalysis().mode_segments });
    const ids = Array.from(full.shadowRoot!.querySelectorAll(".chart")).map((c) => c.id);
    expect(ids).toEqual(["motion", "power", "cell", "temp", "attitude", "discharge", "signal", "distance"]);
    expect(text(full as HTMLElement, "#modes")).toContain("Normal");
    expect(text(full as HTMLElement, "#modes")).toContain("1 min 48 s");
  });
});

describe("route map parity", () => {
  const lines = (el: El) => {
    const found: L.Path[] = [];
    (el.map as L.Map).eachLayer((l) => { if (l instanceof L.Polyline) found.push(l); });
    return found;
  };
  const markers = (el: El) => {
    const found: L.CircleMarker[] = [];
    (el.map as L.Map).eachLayer((l) => { if (l instanceof L.CircleMarker && !(l instanceof L.Polyline) && (l.options as { radius?: number }).radius === 6) found.push(l); });
    return found;
  };
  it("switches colouring between height and signal, unknown = grey", async () => {
    const points = makeChannelPoints(10);
    delete points[5].dl;
    const el = await mount("dl-route-map", { points, start: { lat: 47.5, lon: 11 }, end: null, events: [], lang: "de" });
    const heightColors = lines(el).map((l) => l.options.color);
    expect(el.shadowRoot!.querySelectorAll(".modes button")).toHaveLength(2);
    (el.shadowRoot!.querySelector("[data-channel=signal]") as HTMLElement).click();
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    const signalColors = lines(el).map((l) => l.options.color);
    expect(signalColors).not.toEqual(heightColors);
    expect(signalColors).toContain("#9e9e9e");
    expect(lines(el)).toHaveLength(9);
  });
  it("offers no colour switch without a signal channel", async () => {
    const el = await mount("dl-route-map", { points: makePoints(10), start: null, end: null, events: [], lang: "de" });
    expect(el.shadowRoot!.querySelector(".modes")).toBeNull();
  });
  it("draws event markers only where a position exists", async () => {
    const events = [{ t: 4, kind: "weakSignal", value: 3, severity: "warning" as const }, { t: 9999, kind: "lowGPS", value: 3, severity: "warning" as const }];
    const el = await mount("dl-route-map", { points: makePoints(10), start: null, end: null, events, lang: "de" });
    expect(markers(el)).toHaveLength(1);
  });
});
