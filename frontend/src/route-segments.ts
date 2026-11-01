import { heightColor } from "./colors";
import type { Point } from "./types";

export interface Segment {
  from: [number, number];
  to: [number, number];
  color: string;
  /** false: für dieses Stück gibt es keinen Messwert (z. B. kein Funksignal) → grau */
  known: boolean;
}

export type RouteChannel = "height" | "signal";

export const UNKNOWN_COLOR = "#9e9e9e";

export function heightRange(points: Point[]): { min: number; max: number } {
  if (points.length === 0) return { min: 0, max: 0 };
  const heights = points.map((p) => p.height);
  return { min: Math.min(...heights), max: Math.max(...heights) };
}

/** Funksignal in Prozent: 0 = schlecht (rot) … 100 = gut (grün); Werte außerhalb werden begrenzt. */
export function signalColor(percent: number): string {
  const ratio = Math.min(100, Math.max(0, percent)) / 100;
  return `hsl(${Math.round(120 * ratio)}, 75%, 42%)`;
}

export function hasSignal(points: Point[]): boolean {
  return points.some((p) => typeof p.dl === "number");
}

/** Linienstücke zwischen aufeinanderfolgenden Punkten MIT Position; Lücken ohne Position trennen die Linie. */
export function buildSegments(points: Point[], min: number, max: number, channel: RouteChannel = "height"): Segment[] {
  const segments: Segment[] = [];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (a.lat === null || a.lon === null || b.lat === null || b.lon === null) continue;
    const known = channel === "height" || typeof b.dl === "number";
    const color = channel === "height" ? heightColor(b.height, min, max) : known ? signalColor(b.dl as number) : UNKNOWN_COLOR;
    segments.push({ from: [a.lat, a.lon], to: [b.lat, b.lon], color, known });
  }
  return segments;
}
