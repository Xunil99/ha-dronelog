import { describe, expect, it } from "vitest";
import { downsamplePoints } from "./downsample";

describe("downsamplePoints", () => {
  const points = Array.from({ length: 1000 }, (_, i) => ({ t: i }));
  it("keeps first and last and respects the maximum", () => {
    const result = downsamplePoints(points, 100);
    expect(result.length).toBeLessThanOrEqual(100);
    expect(result[0].t).toBe(0);
    expect(result[result.length - 1].t).toBe(999);
  });
  it("returns the input when it is small enough", () => {
    expect(downsamplePoints(points.slice(0, 5), 100)).toHaveLength(5);
  });
  it("handles empty input", () => {
    expect(downsamplePoints([], 10)).toEqual([]);
  });
});
