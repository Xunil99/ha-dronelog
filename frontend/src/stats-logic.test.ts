import { describe, expect, it } from "vitest";
import { alignSeries, fillMonths, isWarning, monthLabel } from "./stats-logic";
import { makeBattery } from "./fixtures";

describe("fillMonths", () => {
  it("adds missing months between the first and last month with zeros", () => {
    const filled = fillMonths([
      { month: "2026-08", flights: 2, duration_s: 100, distance_m: 10 },
      { month: "2026-11", flights: 1, duration_s: 50, distance_m: 5 },
    ]);
    expect(filled.map((m) => m.month)).toEqual(["2026-08", "2026-09", "2026-10", "2026-11"]);
    expect(filled[1]).toEqual({ month: "2026-09", flights: 0, duration_s: 0, distance_m: 0 });
  });
  it("handles year changes", () => {
    expect(fillMonths([{ month: "2025-12", flights: 1, duration_s: 1, distance_m: 1 }, { month: "2026-02", flights: 1, duration_s: 1, distance_m: 1 }]).map((m) => m.month))
      .toEqual(["2025-12", "2026-01", "2026-02"]);
  });
  it("returns an empty list for no data", () => {
    expect(fillMonths([])).toEqual([]);
  });
});

describe("monthLabel", () => {
  it("formats per language", () => {
    expect(monthLabel("2026-10", "de")).toMatch(/Okt/);
    expect(monthLabel("2026-10", "en")).toMatch(/Oct/);
  });
});

describe("alignSeries", () => {
  it("builds a shared time axis with null where a battery has no flight", () => {
    const a = makeBattery({ serial: "A", suffix: "AAAA" });
    const b = makeBattery({ serial: "B", suffix: "BBBB", history: [{ ...makeBattery().history[0], time: "2026-09-15T10:00:00+00:00", health_pct: 90 }] });
    const { x, series } = alignSeries([a, b], "health_pct");
    expect(x).toEqual([...x].sort((p, q) => p - q));
    expect(x).toHaveLength(4);
    expect(series[1].filter((v) => v !== null)).toEqual([90]);
    expect(series[1].filter((v) => v === null)).toHaveLength(3);
  });
  it("keeps missing metric values as null, not zero", () => {
    const a = makeBattery({ history: [{ ...makeBattery().history[0], health_pct: null }] });
    expect(alignSeries([a], "health_pct").series[0]).toEqual([null]);
  });
});

describe("isWarning", () => {
  it("flags a last cell deviation above 20 mV", () => {
    const bad = makeBattery({ history: [{ ...makeBattery().history[0], cell_deviation_mv: 25 }] });
    expect(isWarning(bad)).toBe(true);
    expect(isWarning(makeBattery())).toBe(false);
    expect(isWarning(makeBattery({ history: [] }))).toBe(false);
  });
});
