import { describe, expect, it } from "vitest";
import { buildAttitudeAndCellData, buildChartData, buildDischarge, buildSignalDistance, buildSignalTime, chartAvailability, chartColors, hasChannel } from "./chart-data";
import { makePoints } from "./fixtures";
import type { Point } from "./types";

describe("buildChartData", () => {
  it("returns equally long columns, time in minutes", () => {
    const data = buildChartData(makePoints(10));
    expect(data.time).toHaveLength(10);
    for (const column of [data.height, data.speedKmh, data.voltage, data.current, data.charge]) expect(column).toHaveLength(10);
    expect(data.time[1]).toBeCloseTo(2 / 60, 5);
  });
  it("converts speed to km/h", () => {
    const [first] = buildChartData([{ ...makePoints(1)[0], speed: 10 }]).speedKmh;
    expect(first).toBeCloseTo(36, 5);
  });
  it("treats non-positive voltage as a gap (null)", () => {
    const points = makePoints(3);
    points[1] = { ...points[1], voltage: 0, current: 0 };
    const data = buildChartData(points);
    expect(data.voltage[1]).toBeNull();
    expect(data.current[1]).toBeNull();
    expect(data.voltage[0]).not.toBeNull();
  });
  it("returns empty columns for no points", () => {
    expect(buildChartData([]).time).toEqual([]);
  });
});

describe("chartColors", () => {
  it("differs between light and dark mode", () => {
    expect(chartColors(true).axis).not.toBe(chartColors(false).axis);
    expect(chartColors(true).grid).not.toBe(chartColors(false).grid);
  });
});

describe("extra channel series", () => {
  const withChannels = (): Point[] => makePoints(4).map((p, i) => ({ ...p, temp: 20 + i, cell_dev: 0.004 * (i + 1), pitch: i, roll: -i, dl: 90 - i * 10, ul: 80, dist: i * 50 }));
  it("detects which channels a flight has", () => {
    expect(hasChannel(makePoints(5), "temp")).toBe(false);
    expect(hasChannel(withChannels(), "temp")).toBe(true);
    expect(hasChannel(withChannels(), "dl")).toBe(true);
  });
  it("converts cell deviation to mV and keeps gaps as null", () => {
    const pts = withChannels();
    delete pts[2].cell_dev;
    const s = buildAttitudeAndCellData(pts);
    expect(s.cellDevMv[0]).toBeCloseTo(4);
    expect(s.cellDevMv[2]).toBeNull();
    expect(s.temp).toEqual([20, 21, 22, 23]);
    expect(s.pitch).toEqual([0, 1, 2, 3]);
    expect(s.roll[1]).toBe(-1);
  });
  it("builds the signal over time, clamped to 0..100", () => {
    const pts = withChannels();
    pts[0].dl = 130;
    const s = buildSignalTime(pts);
    expect(s.dl[0]).toBe(100);
    expect(s.ul).toEqual([80, 80, 80, 80]);
    expect(s.time[1]).toBeCloseTo(2 / 60, 5);
  });
  it("builds signal over distance sorted by distance, only points with both values", () => {
    const pts = withChannels();
    pts[1].dist = 500;
    delete pts[2].dl;
    const s = buildSignalDistance(pts);
    expect(s.dist).toEqual([0, 150, 500]);
    expect(s.dl).toEqual([90, 60, 80]);
  });
  it("builds the discharge curve: unique charge levels, no gaps, ascending charge", () => {
    const pts = makePoints(30);
    pts[3] = { ...pts[3], voltage: 0 };
    const d = buildDischarge(pts);
    expect(new Set(d.charge).size).toBe(d.charge.length);
    expect(d.charge).toEqual([...d.charge].sort((a, b) => a - b));
    expect(d.voltage.every((v) => v > 0)).toBe(true);
    expect(d.charge.length).toBeGreaterThanOrEqual(10);
    expect(buildDischarge(makePoints(3)).charge.length).toBeLessThan(10);
  });
});

describe("chartAvailability", () => {
  it("only offers charts the flight has data for", () => {
    expect(chartAvailability(makePoints(30))).toMatchObject({ cell: false, temp: false, attitude: false, signal: false, distance: false, discharge: true });
    const pts = makePoints(30).map((p) => ({ ...p, temp: 20, cell_dev: 0.01, pitch: 1, roll: 1, dl: 90, dist: 10 }));
    expect(chartAvailability(pts)).toMatchObject({ cell: true, temp: true, attitude: true, signal: true, distance: true });
  });
});
