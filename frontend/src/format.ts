export const dash = "–";

const valid = (n: number | null | undefined): n is number => typeof n === "number" && Number.isFinite(n);

function number(n: number, locale: string, digits: number): string {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);
}

export function formatDuration(seconds: number | null | undefined): string {
  if (!valid(seconds)) return dash;
  const total = Math.round(seconds);
  if (total < 60) return `${total} s`;
  if (total < 3600) return `${Math.floor(total / 60)} min ${total % 60} s`;
  return `${Math.floor(total / 3600)} h ${String(Math.floor((total % 3600) / 60)).padStart(2, "0")} min`;
}

export function formatDistance(meters: number | null | undefined, locale: string): string {
  if (!valid(meters)) return dash;
  return meters < 1000 ? `${Math.round(meters)} m` : `${number(meters / 1000, locale, 1)} km`;
}

export function formatSpeedKmh(ms: number | null | undefined, locale: string): string {
  return valid(ms) ? `${number(ms * 3.6, locale, 1)} km/h` : dash;
}

export function formatHeight(m: number | null | undefined, locale: string): string {
  return valid(m) ? `${number(m, locale, 1)} m` : dash;
}

export function formatPercent(n: number | null | undefined): string {
  return valid(n) ? `${Math.round(n)} %` : dash;
}

export function formatDateTime(iso: string, timeZone: string, locale: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return dash;
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", timeZone }).format(date);
}
