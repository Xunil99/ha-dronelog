import { heightColor } from "./colors";
import type { Point } from "./types";

export interface Segment {
  from: [number, number];
  to: [number, number];
  color: string;
}

export function heightRange(points: Point[]): { min: number; max: number } {
  if (points.length === 0) return { min: 0, max: 0 };
  const heights = points.map((p) => p.height);
  return { min: Math.min(...heights), max: Math.max(...heights) };
}

/** Linienstücke zwischen aufeinanderfolgenden Punkten MIT Position; Lücken ohne Position trennen die Linie. */
export function buildSegments(points: Point[], min: number, max: number): Segment[] {
  const segments: Segment[] = [];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (a.lat === null || a.lon === null || b.lat === null || b.lon === null) continue;
    segments.push({ from: [a.lat, a.lon], to: [b.lat, b.lon], color: heightColor(b.height, min, max) });
  }
  return segments;
}
