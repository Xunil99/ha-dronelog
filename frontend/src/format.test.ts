import { describe, expect, it } from "vitest";
import { dash, formatDateTime, formatDistance, formatDuration, formatHeight, formatPercent, formatSpeedKmh } from "./format";

describe("format", () => {
  it("formatDuration", () => {
    expect(formatDuration(0)).toBe("0 s");
    expect(formatDuration(59)).toBe("59 s");
    expect(formatDuration(330)).toBe("5 min 30 s");
    expect(formatDuration(3900)).toBe("1 h 05 min");
    expect(formatDuration(3600)).toBe("1 h 00 min");
    expect(formatDuration(null)).toBe(dash);
  });
  it("formatDistance", () => {
    expect(formatDistance(null, "de")).toBe(dash);
    expect(formatDistance(850, "de")).toBe("850 m");
    expect(formatDistance(1460, "de")).toBe("1,5 km");
    expect(formatDistance(1460, "en")).toBe("1.5 km");
    expect(formatDistance(Number.NaN, "de")).toBe(dash);
  });
  it("formatSpeedKmh converts m/s", () => {
    expect(formatSpeedKmh(12.2, "de")).toBe("43,9 km/h");
    expect(formatSpeedKmh(undefined, "de")).toBe(dash);
  });
  it("formatHeight and formatPercent", () => {
    expect(formatHeight(40.7, "de")).toBe("40,7 m");
    expect(formatHeight(null, "de")).toBe(dash);
    expect(formatPercent(98)).toBe("98 %");
    expect(formatPercent(null)).toBe(dash);
  });
  it("formatDateTime uses the given time zone (summer and winter time)", () => {
    expect(formatDateTime("2026-10-27T13:11:11+00:00", "Europe/Berlin", "de")).toContain("14:11");
    expect(formatDateTime("2026-07-01T10:00:00+00:00", "Europe/Berlin", "de")).toContain("12:00");
    expect(formatDateTime("kaputt", "Europe/Berlin", "de")).toBe(dash);
  });
});
