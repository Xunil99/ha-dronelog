/** Verlauf Blau (niedrig) → Grün → Rot (hoch); Werte außerhalb werden begrenzt. */
export function heightColor(value: number, min: number, max: number): string {
  const ratio = max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0.5;
  return `hsl(${Math.round(240 * (1 - ratio))}, 80%, 50%)`;
}
