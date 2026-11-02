import { describe, expect, it } from "vitest";
import { makeDetail, makePoints } from "./fixtures";
import {
  batteryRows, cameraRows, cellLevel, energyRows, eventDescription, eventInfo, eventMarkers, eventRows, flightBadges, modeBand, phaseRows,
  signalRows, windHintRow,
} from "./flight-logic";
import type { FlightExtrasDTO, Point } from "./types";

const extras = (o: Partial<FlightExtrasDTO> = {}): FlightExtrasDTO => ({
  events: [], energy_wh: 0, wh_per_km: null, max_distance_from_start_m: 0, downlink_min: null, uplink_min: null, weak_signal_s: 0,
  photo_count: 0, video_s: 0, max_descent_ms: 0, max_climb_ms: 0, ...o,
});
const values = (rows: { value: string }[]) => rows.map((r) => r.value);

describe("eventInfo", () => {
  it("maps severities like the app", () => {
    expect(eventInfo("signalLossGoHome").severity).toBe("critical");
    expect(eventInfo("batteryGoHome").severity).toBe("warning");
    expect(eventInfo("weakSignal").severity).toBe("warning");
    expect(eventInfo("manualGoHome").severity).toBe("info");
    expect(eventInfo("propellerCatapult").severity).toBe("info");
  });
  it("has icon and distinct colours per severity", () => {
    const colors = new Set(["info", "warning", "critical"].map((s) => eventInfo(s === "info" ? "manualGoHome" : s === "warning" ? "lowGPS" : "signalLossGoHome").color));
    expect(colors.size).toBe(3);
    expect(eventInfo("lowGPS").icon).toMatch(/^mdi:/);
  });
  it("treats unknown kinds as info", () => {
    expect(eventInfo("somethingNew").severity).toBe("info");
  });
});

describe("eventDescription", () => {
  it("adds duration or level", () => {
    expect(eventDescription({ t: 1, kind: "weakSignal", value: 5, severity: "warning" }, "de")).toBe("Funksignal schwach · 5 s");
    expect(eventDescription({ t: 1, kind: "voltageWarning", value: 2, severity: "warning" }, "de")).toBe("Spannungswarnung · Stufe 2");
    expect(eventDescription({ t: 1, kind: "batteryGoHome", value: 3, severity: "warning" }, "en")).toBe("Return home due to battery");
    expect(eventDescription({ t: 1, kind: "lowGPS", value: 0, severity: "warning" }, "de")).toBe("GPS-Signal schwach");
  });
});

describe("eventRows", () => {
  it("sorts by time and shows a clock", () => {
    const rows = eventRows(extras({ events: [
      { t: 130, kind: "signalLossGoHome", value: 4, severity: "critical" },
      { t: 65, kind: "weakSignal", value: 5, severity: "warning" },
      { t: 3, kind: "manualGoHome", value: 1, severity: "info" },
    ] }), "de");
    expect(rows.map((r) => r.timeText)).toEqual(["0:03", "1:05", "2:10"]);
    expect(rows.map((r) => r.severity)).toEqual(["info", "warning", "critical"]);
    expect(rows[1].text).toContain("5 s");
  });
  it("is empty without extras", () => {
    expect(eventRows(null, "de")).toEqual([]);
    expect(eventRows(undefined, "de")).toEqual([]);
  });
});

describe("eventMarkers", () => {
  it("uses the nearest positioned point within 3 s", () => {
    const pts: Point[] = [0, 2, 4].map((t) => ({ ...makePoints(1)[0], t, lat: 47.25, lon: 11.5 }));
    const markers = eventMarkers([
      { t: 3, kind: "weakSignal", value: 4, severity: "warning" },
      { t: 100, kind: "batteryGoHome", value: 3, severity: "warning" },
    ], pts);
    expect(markers).toHaveLength(1);
    expect(markers[0].event.kind).toBe("weakSignal");
    expect(markers[0].lat).toBe(47.25);
  });
  it("ignores points without position", () => {
    const pts: Point[] = [{ ...makePoints(1)[0], t: 0, lat: null, lon: null }];
    expect(eventMarkers([{ t: 0, kind: "lowGPS", value: 3, severity: "warning" }], pts)).toEqual([]);
  });
});

describe("flightBadges", () => {
  it("lists kinds, photos and video; empty when nothing", () => {
    expect(flightBadges({ event_kinds: ["signalLossGoHome", "lowGPS"], photo_count: 3, video_s: 95 })).toEqual({
      kinds: ["signalLossGoHome", "lowGPS"], photos: 3, videoS: 95, empty: false });
    expect(flightBadges({}).empty).toBe(true);
    expect(flightBadges({ event_kinds: [], photo_count: 0, video_s: 0 }).empty).toBe(true);
  });
});

describe("energy / signal / camera rows", () => {
  it("formats energy rows and hides zero values", () => {
    expect(values(energyRows(extras({ energy_wh: 5.64, wh_per_km: 4, max_descent_ms: 3.2, max_climb_ms: 5.5 }), "de"))).toEqual(["5,6 Wh", "4,0 Wh/km", "3,2 m/s", "5,5 m/s"]);
    expect(energyRows(extras({ energy_wh: 5.64, max_descent_ms: 3.2, max_climb_ms: 5.5 }), "de")).toHaveLength(3);
    expect(energyRows(extras(), "de")).toEqual([]);
    expect(energyRows(null, "de")).toEqual([]);
    expect(values(energyRows(extras({ max_descent_ms: 2 }), "de"))).toEqual(["2,0 m/s"]);
    expect(values(energyRows(extras({ energy_wh: 3.2 }), "en"))).toEqual(["3.2 Wh"]);
  });
  it("formats signal rows", () => {
    expect(values(signalRows(extras({ downlink_min: 12, uplink_min: 80, weak_signal_s: 14, max_distance_from_start_m: 1894 }), "de"))).toEqual(["12 %", "80 %", "14 s", "1,9 km"]);
    expect(values(signalRows(extras({ max_distance_from_start_m: 332 }), "de"))).toEqual(["332 m"]);
    expect(signalRows(extras(), "de")).toEqual([]);
    expect(signalRows(null, "de")).toEqual([]);
  });
  it("clamps signal percentages", () => {
    expect(values(signalRows(extras({ downlink_min: 140, uplink_min: -5 }), "de")).slice(0, 2)).toEqual(["100 %", "0 %"]);
  });
  it("shows camera rows only for what happened", () => {
    expect(values(cameraRows(extras({ photo_count: 3, video_s: 95 }), "de"))).toEqual(["3", "1 min 35 s"]);
    expect(values(cameraRows(extras({ photo_count: 2 }), "de"))).toEqual(["2"]);
    expect(values(cameraRows(extras({ video_s: 40 }), "de"))).toEqual(["40 s"]);
    expect(cameraRows(extras(), "de")).toEqual([]);
    expect(cameraRows(null, "de")).toEqual([]);
  });
});

describe("cellLevel", () => {
  it("uses 20 and 50 mV thresholds", () => {
    expect(cellLevel(0.0124)).toBe("ok");
    expect(cellLevel(0.02)).toBe("ok");
    expect(cellLevel(0.035)).toBe("minor");
    expect(cellLevel(0.05)).toBe("minor");
    expect(cellLevel(0.08)).toBe("major");
  });
});

describe("batteryRows", () => {
  const base = makeDetail().battery!;
  it("lists the extended rows with cell level, resistance estimate and cap/voltage/current", () => {
    const rows = batteryRows({ ...base, cell_deviation_max_v: 0.0124, internal_resistance_mohm: 187.4 }, "ok", "de");
    expect(rows.map((r) => r.value)).toEqual(["99 % → 79 %", "40 W", "104 W", "12 mV (in Ordnung)", "187 mΩ (Schätzung)", "21 … 33 °C", "2", "98 %", "2800 mAh", "7,3 … 8,2 V", "14,1 A"]);
  });
  it("names the level in English and takes the backend level", () => {
    const rows = batteryRows({ ...base, cell_deviation_max_v: 0.035 }, "minor", "en");
    expect(values(rows)).toContain("35 mV (noticeable)");
    expect(values(batteryRows({ ...base, cell_deviation_max_v: 0.08 }, null, "de"))).toContain("80 mV (kritisch)");  // Rückfall: selbst berechnet
  });
  it("shows a dash for missing cycles and health, hides zero capacity/voltage/current", () => {
    const rows = batteryRows({ ...base, cycles: null, health_pct: null, full_capacity_mah: 0, min_voltage: 0, max_voltage: 0, peak_current_a: 0 }, "ok", "de");
    expect(values(rows).slice(-2)).toEqual(["–", "–"]);
    expect(rows).toHaveLength(7);
  });
});

describe("phaseRows / windHintRow", () => {
  it("orders phases and skips those under one second", () => {
    const rows = phaseRows({ hover: 120, climb: 30, descent: 0.4, cruise: 200 }, "de");
    expect(rows.map((r) => r.label)).toEqual(["Steigflug", "Reiseflug", "Schweben"]);
    expect(values(rows)).toEqual(["30 s", "3 min 20 s", "2 min 0 s"]);
    expect(phaseRows(undefined, "de")).toEqual([]);
  });
  it("describes the wind class and direction", () => {
    const hint = windHintRow({ tilt_deg: 3, bearing_deg: 45, seconds: 20, class: "moderate" }, "de");
    expect(hint).toEqual({ label: "Wind laut Flugzeug", value: "mäßig, aus NO (45°)" });
    expect(windHintRow({ tilt_deg: 1, bearing_deg: 359.7, seconds: 20, class: "calm" }, "en")?.value).toBe("calm, from N (0°)");
    expect(windHintRow(null, "de")).toBeNull();
  });
});

describe("modeBand", () => {
  it("computes shares and per-category durations", () => {
    const band = modeBand([
      { category: "automatic", title: "Start/Landung", start: 0, end: 10 },
      { category: "normal", title: "Normal", start: 10, end: 90 },
      { category: "automatic", title: "Start/Landung", start: 90, end: 100 },
    ], "de");
    expect(band.segments.map((s) => Math.round(s.share * 100))).toEqual([10, 80, 10]);
    expect(band.legend.map((l) => [l.label, l.seconds])).toEqual([["Normal", 80], ["Start/Landung", 20]]);
    expect(band.legend[0].color).not.toBe(band.legend[1].color);
  });
  it("is empty without segments", () => {
    expect(modeBand([], "de").segments).toEqual([]);
    expect(modeBand(undefined, "de").legend).toEqual([]);
  });
  it("gives zero-length segments a visible minimum", () => {
    const band = modeBand([{ category: "normal", title: "", start: 0, end: 100 }, { category: "sport", title: "", start: 100, end: 100 }], "de");
    expect(band.segments[1].share).toBeGreaterThan(0);
  });
});
