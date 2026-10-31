import { describe, expect, it } from "vitest";
import { buildChartData, chartColors } from "./chart-data";
import { makePoints } from "./fixtures";

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
