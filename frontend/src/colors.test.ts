import { describe, expect, it } from "vitest";
import { heightColor } from "./colors";

const hue = (c: string) => Number(/hsl\((\d+)/.exec(c)![1]);

describe("heightColor", () => {
  it("higher values move from blue towards red", () => {
    expect(hue(heightColor(0, 0, 100))).toBeGreaterThan(hue(heightColor(100, 0, 100)));
  });
  it("clamps values outside the range", () => {
    expect(heightColor(-50, 0, 100)).toBe(heightColor(0, 0, 100));
    expect(heightColor(500, 0, 100)).toBe(heightColor(100, 0, 100));
  });
  it("is stable when min equals max", () => {
    expect(heightColor(5, 5, 5)).toBe(heightColor(9, 9, 9));
  });
});
