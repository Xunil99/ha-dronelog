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

export function chartColors(dark: boolean): { axis: string; grid: string; height: string; speed: string; voltage: string; current: string; charge: string } {
  return {
    axis: dark ? "#c8c8c8" : "#555555",
    grid: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
    height: dark ? "#64b5f6" : "#1565c0",
    speed: dark ? "#ffb74d" : "#ef6c00",
    voltage: dark ? "#81c784" : "#2e7d32",
    current: dark ? "#e57373" : "#c62828",
    charge: dark ? "#ba68c8" : "#6a1b9a",
  };
}
