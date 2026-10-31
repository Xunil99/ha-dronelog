import type { BatteryDTO, BatteryHistoryPoint, MonthStat } from "./types";

export type BatteryMetric = "health_pct" | "cycles" | "cell_deviation_mv" | "temp_max_c" | "avg_power_w";

export function fillMonths(months: MonthStat[]): MonthStat[] {
  if (months.length === 0) return [];
  const byMonth = new Map(months.map((m) => [m.month, m]));
  const [firstYear, firstMonth] = months[0].month.split("-").map(Number);
  const [lastYear, lastMonth] = months[months.length - 1].month.split("-").map(Number);
  const result: MonthStat[] = [];
  for (let year = firstYear, month = firstMonth; year < lastYear || (year === lastYear && month <= lastMonth); ) {
    const key = `${year}-${String(month).padStart(2, "0")}`;
    result.push(byMonth.get(key) ?? { month: key, flights: 0, duration_s: 0, distance_m: 0 });
    if (++month > 12) { month = 1; year++; }
  }
  return result;
}

export function monthLabel(month: string, lang: string): string {
  const [year, number] = month.split("-").map(Number);
  return new Intl.DateTimeFormat(lang, { month: "short", year: "2-digit", timeZone: "UTC" }).format(new Date(Date.UTC(year, number - 1, 1)));
}

/** Gemeinsame Zeitachse (Sekunden) für alle Akkus; Lücken sind null (nicht 0). */
export function alignSeries(batteries: BatteryDTO[], metric: BatteryMetric): { x: number[]; series: (number | null)[][] } {
  const times = new Set<number>();
  for (const b of batteries) for (const p of b.history) times.add(Date.parse(p.time) / 1000);
  const x = [...times].sort((a, b) => a - b);
  const series = batteries.map((b) => {
    const byTime = new Map<number, BatteryHistoryPoint>(b.history.map((p) => [Date.parse(p.time) / 1000, p]));
    return x.map((time) => {
      const point = byTime.get(time);
      const value = point ? point[metric] : null;
      return typeof value === "number" && Number.isFinite(value) ? value : null;
    });
  });
  return { x, series };
}

export function isWarning(battery: BatteryDTO): boolean {
  const last = battery.history[battery.history.length - 1];
  return last !== undefined && last.cell_deviation_mv > 20;
}
