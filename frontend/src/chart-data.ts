import type { Point } from "./types";

export interface ChartData {
  time: number[];
  height: number[];
  speedKmh: number[];
  voltage: (number | null)[];
  current: (number | null)[];
  charge: number[];
}

export function buildChartData(points: Point[]): ChartData {
  return {
    time: points.map((p) => p.t / 60),
    height: points.map((p) => p.height),
    speedKmh: points.map((p) => p.speed * 3.6),
    voltage: points.map((p) => (p.voltage > 0 ? p.voltage : null)),
    current: points.map((p) => (p.voltage > 0 ? p.current : null)),
    charge: points.map((p) => p.charge),
  };
}

type Channel = "dist" | "dl" | "ul" | "temp" | "cell_dev" | "pitch" | "roll" | "mode";

export function hasChannel(points: Point[], channel: Channel): boolean {
  return points.some((p) => typeof p[channel] === "number");
}

const num = (v: number | undefined): number | null => (typeof v === "number" ? v : null);
const percent = (v: number | undefined): number | null => (typeof v === "number" ? Math.min(100, Math.max(0, v)) : null);

export function buildAttitudeAndCellData(points: Point[]) {
  return {
    time: points.map((p) => p.t / 60),
    cellDevMv: points.map((p) => (typeof p.cell_dev === "number" ? p.cell_dev * 1000 : null)),
    temp: points.map((p) => num(p.temp)),
    pitch: points.map((p) => num(p.pitch)),
    roll: points.map((p) => num(p.roll)),
  };
}

export function buildSignalTime(points: Point[]) {
  return { time: points.map((p) => p.t / 60), dl: points.map((p) => percent(p.dl)), ul: points.map((p) => percent(p.ul)) };
}

/** Signal über die Entfernung vom Start: nur Punkte mit beiden Werten, nach Entfernung sortiert (uPlot braucht aufsteigendes X). */
export function buildSignalDistance(points: Point[]): { dist: number[]; dl: number[] } {
  const pairs = points.filter((p) => typeof p.dl === "number" && typeof p.dist === "number")
    .map((p) => [p.dist as number, Math.min(100, Math.max(0, p.dl as number))] as const)
    .sort((a, b) => a[0] - b[0]);
  return { dist: pairs.map((x) => x[0]), dl: pairs.map((x) => x[1]) };
}

/** Spannung (Gesamtpack) über dem Ladezustand; Messlücken (0 V) und Punkte ohne Ladestand fehlen, jeder Ladestand nur einmal. */
export function buildDischarge(points: Point[]): { charge: number[]; voltage: number[] } {
  const seen = new Set<number>();
  const pairs: [number, number][] = [];
  for (const p of points) {
    if (p.voltage > 0 && p.charge > 0 && !seen.has(p.charge)) {
      seen.add(p.charge);
      pairs.push([p.charge, p.voltage]);
    }
  }
  pairs.sort((a, b) => a[0] - b[0]);
  return { charge: pairs.map((x) => x[0]), voltage: pairs.map((x) => x[1]) };
}

export function chartAvailability(points: Point[]) {
  return {
    cell: hasChannel(points, "cell_dev"),
    temp: hasChannel(points, "temp"),
    attitude: hasChannel(points, "pitch"),
    signal: hasChannel(points, "dl"),
    distance: points.some((p) => typeof p.dl === "number" && typeof p.dist === "number"),
    discharge: buildDischarge(points).charge.length >= 10,
  };
}

export interface ChartPalette {
  axis: string; grid: string; height: string; speed: string; voltage: string; current: string; charge: string;
  cell: string; temp: string; pitch: string; roll: string; discharge: string; downlink: string; uplink: string; weak: string; limit: string;
}

export function chartColors(dark: boolean): ChartPalette {
  return {
    cell: dark ? "#4db6ac" : "#00796b",
    temp: dark ? "#f06292" : "#c2185b",
    pitch: dark ? "#4dd0e1" : "#00838f",
    roll: dark ? "#f48fb1" : "#ad1457",
    discharge: dark ? "#9fa8da" : "#3949ab",
    downlink: dark ? "#81c784" : "#2e7d32",
    uplink: dark ? "#64b5f6" : "#1565c0",
    weak: dark ? "rgba(239,83,80,0.8)" : "rgba(198,40,40,0.7)",
    limit: dark ? "#ffb74d" : "#ef6c00",
    axis: dark ? "#c8c8c8" : "#555555",
    grid: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
    height: dark ? "#64b5f6" : "#1565c0",
    speed: dark ? "#ffb74d" : "#ef6c00",
    voltage: dark ? "#81c784" : "#2e7d32",
    current: dark ? "#e57373" : "#c62828",
    charge: dark ? "#ba68c8" : "#6a1b9a",
  };
}
