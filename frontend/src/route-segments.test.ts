import { describe, expect, it } from "vitest";
import { makePoints } from "./fixtures";
import { buildSegments, hasSignal, heightRange, signalColor, UNKNOWN_COLOR } from "./route-segments";
import type { Point } from "./types";

const p = (t: number, lat: number | null, lon: number | null, height = 0): Point => ({ t, lat, lon, height, speed: 0, voltage: 8, current: 1, charge: 90 });
const hue = (c: string) => Number(/hsl\((\d+)/.exec(c)![1]);

describe("buildSegments", () => {
  it("returns nothing without positions", () => {
    expect(buildSegments([p(0, null, null), p(1, null, null)], 0, 10)).toEqual([]);
  });
  it("returns nothing for a single positioned point", () => {
    expect(buildSegments([p(0, 1, 1)], 0, 10)).toEqual([]);
  });
  it("connects consecutive positioned points", () => {
    const s = buildSegments([p(0, 1, 1), p(1, 2, 2), p(2, 3, 3)], 0, 10);
    expect(s).toHaveLength(2);
    expect(s[0].from).toEqual([1, 1]);
    expect(s[0].to).toEqual([2, 2]);
  });
  it("gaps without position break the line", () => {
    const s = buildSegments([p(0, 1, 1), p(1, 2, 2), p(2, null, null), p(3, 4, 4), p(4, 5, 5)], 0, 10);
    expect(s).toHaveLength(2);
    expect(s.map((x) => x.from)).toEqual([[1, 1], [4, 4]]);
  });
  it("colour moves from blue to red as height rises", () => {
    const s = buildSegments([p(0, 1, 1, 0), p(1, 2, 2, 0), p(2, 3, 3, 100)], 0, 100);
    expect(hue(s[0].color)).toBeGreaterThan(hue(s[1].color));
  });
});

describe("heightRange", () => {
  it("uses the heights of all points", () => {
    expect(heightRange([p(0, 1, 1, 5), p(1, 2, 2, 40), p(2, 3, 3, 12)])).toEqual({ min: 5, max: 40 });
  });
  it("is 0..0 for no points", () => {
    expect(heightRange([])).toEqual({ min: 0, max: 0 });
  });
});

describe("signal colouring", () => {
  const pts = (dls: (number | undefined)[]) => dls.map((dl, i) => ({ ...makePoints(1)[0], t: i, lat: 47 + i * 0.001, lon: 11, ...(dl === undefined ? {} : { dl }) }));
  it("colours red for bad and green for good signal", () => {
    const [bad, good] = buildSegments(pts([50, 0, 100]), 0, 10, "signal");
    expect(bad.color).toBe(signalColor(0));
    expect(good.color).toBe(signalColor(100));
    expect(signalColor(0)).not.toBe(signalColor(100));
    expect(bad.known).toBe(true);
  });
  it("draws unknown signal grey", () => {
    const [seg] = buildSegments(pts([90, undefined]), 0, 10, "signal");
    expect(seg.color).toBe(UNKNOWN_COLOR);
    expect(seg.known).toBe(false);
  });
  it("clamps over-range values", () => {
    expect(signalColor(250)).toBe(signalColor(100));
    expect(signalColor(-5)).toBe(signalColor(0));
  });
  it("keeps height colouring as default", () => {
    expect(buildSegments(pts([50, 60]), 0, 10)[0].known).toBe(true);
  });
  it("detects whether a signal channel exists", () => {
    expect(hasSignal(pts([undefined, undefined]))).toBe(false);
    expect(hasSignal(pts([undefined, 40]))).toBe(true);
  });
});
