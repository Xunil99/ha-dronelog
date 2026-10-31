/** Gleichmäßig ausdünnen; erster und letzter Punkt bleiben erhalten. */
export function downsamplePoints<T extends { t: number }>(points: T[], max: number): T[] {
  if (points.length <= max) return points;
  const step = (points.length - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => points[Math.round(i * step)]);
}
