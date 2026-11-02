// Druckbare Dokumente (Flugbuch, Akku-Bericht): gemeinsame Vorlagen für Bildschirm und Druck.
import { html, nothing, render, svg, type TemplateResult } from "lit";
import { flightbookColumns, lineChartGeometry, chartSummary, type AssessmentView, type ChartSpec, type FlightbookView, type ReportContent } from "./report-logic";
import { t, tf } from "./i18n";

/** Gestaltung der Dokumente; die Farben kommen aus --doc-* (Bildschirm: Theme von Home Assistant, Druck: Schwarz auf Weiß). */
export const DOC_CSS = `
  .doc { color: var(--doc-fg, var(--primary-text-color, #212121)); font-size: 13px; line-height: 1.35; }
  .doc h1 { font-size: 20px; font-weight: 600; margin: 0 0 2px; }
  .doc h2 { font-size: 14px; font-weight: 600; margin: 14px 0 4px; }
  .doc .subtitle { color: var(--doc-muted, var(--secondary-text-color, #727272)); margin-bottom: 10px; }
  .doc .tiles { display: flex; gap: 8px; margin: 8px 0 12px; }
  .doc .tile { flex: 1; text-align: center; padding: 6px; border-radius: 6px; background: var(--doc-tile, rgba(128,128,128,0.12)); }
  .doc .tile span { display: block; font-size: 11px; color: var(--doc-muted, var(--secondary-text-color, #727272)); }
  .doc .tile b { font-size: 15px; font-weight: 600; }
  .doc table { width: 100%; border-collapse: collapse; }
  .doc th { text-align: left; font-size: 11px; font-weight: 600; color: var(--doc-muted, var(--secondary-text-color, #727272)); border-bottom: 2px solid var(--doc-line, #bbb); padding: 4px 6px; }
  .doc td { border-bottom: 1px solid var(--doc-line, #ddd); padding: 4px 6px; vertical-align: top; }
  .doc .right { text-align: right; }
  .doc thead { display: table-header-group; }
  .doc tr { break-inside: avoid; page-break-inside: avoid; }
  .doc .empty { color: var(--doc-muted, var(--secondary-text-color, #727272)); margin: 12px 0; }
  .doc .footnote { font-size: 11px; color: var(--doc-muted, var(--secondary-text-color, #727272)); margin-top: 14px; }
  .doc .signature { margin-top: 36px; width: 240px; border-top: 1px solid var(--doc-fg, #000); padding-top: 3px; font-size: 11px; color: var(--doc-muted, #555); break-inside: avoid; }
  .doc .charts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px 16px; margin: 8px 0; }
  .doc .chart { break-inside: avoid; }
  .doc .chart h3 { font-size: 12px; font-weight: 600; margin: 0 0 2px; }
  .doc .chart svg { width: 100%; height: auto; display: block; }
  .doc .chart .none { color: var(--doc-muted, #727272); font-size: 11px; height: 60px; display: flex; align-items: center; }
  .doc .axis { font-size: 9px; fill: var(--doc-muted, #727272); }
  .doc .grid { stroke: var(--doc-line, #ddd); stroke-width: 0.6; }
  .doc .figures { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0 24px; }
  .doc .fig { display: flex; justify-content: space-between; gap: 12px; padding: 2px 0; border-bottom: 1px dotted var(--doc-line, #ddd); }
  .doc .fig span { color: var(--doc-muted, #727272); }
  .doc .assessment { border-radius: 6px; padding: 8px 10px; margin: 12px 0; break-inside: avoid; border-left: 5px solid var(--level); background: color-mix(in srgb, var(--level) 12%, transparent); }
  .doc .assessment b.head { display: block; font-size: 14px; }
  .doc .assessment ul { margin: 4px 0 0; padding-left: 18px; }
  .doc .symbol { color: var(--level); margin-right: 4px; }
`;

/** Nur für die Druckausgabe im eigenen Dokument (iframe): Seitenformat und feste Farben. */
export const PRINT_PAGE_CSS = `
  @media print { @page { size: A4; margin: 14mm 12mm; } }
  @page { size: A4; margin: 14mm 12mm; }
  html, body { margin: 0; background: #fff; }
  body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; --doc-fg: #000; --doc-muted: #555; --doc-line: #bbb; --doc-tile: #eee; }
  .doc { font-size: 10pt; }
  .doc h1 { font-size: 16pt; }
  .doc table { font-size: 9pt; }
  .doc .chart svg { max-height: 38mm; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
`;

/** Für die Bildschirmdarstellung der Komponenten: beim Drucken der Seite selbst bleiben Knöpfe weg und Dokument-Farben fest. */
export const SCREEN_PRINT_CSS = `
  @media print {
    .bar { display: none !important; }
    :host { --doc-fg: #000; --doc-muted: #555; --doc-line: #bbb; --doc-tile: #eee; }
    .card { border: none !important; padding: 0 !important; }
  }
`;

const tiles = (items: { label: string; value: string }[]) =>
  html`<div class="tiles">${items.map((i) => html`<div class="tile"><span>${i.label}</span><b>${i.value}</b></div>`)}</div>`;

export function flightbookDoc(view: FlightbookView, filterText: string, lang: string): TemplateResult {
  return html`<div class="doc flightbook">
    <h1>${t("flightbook", lang)}</h1>
    <div class="subtitle">${filterText}</div>
    ${tiles(view.summary)}
    ${view.rows.length === 0
      ? html`<p class="empty">${t("flightbook_empty", lang)}</p>`
      : html`<table>
          <thead><tr>${flightbookColumns.map((c) => html`<th scope="col" class=${c.right ? "right" : ""}>${t(c.title, lang)}</th>`)}</tr></thead>
          <tbody>${view.rows.map((r) => html`<tr>${flightbookColumns.map((c) => html`<td class=${c.right ? "right" : ""}>${r[c.key]}</td>`)}</tr>`)}</tbody>
        </table>`}
    <p class="footnote">${t("flightbook_footnote", lang)}</p>
    <div class="signature">${t("signature", lang)}</div>
  </div>`;
}

function chartDoc(spec: ChartSpec, lang: string, timeZone: string): TemplateResult {
  const title = t(spec.title, lang);
  const geo = lineChartGeometry(spec, 320, 110, lang);
  if (!geo) return html`<div class="chart"><h3>${title}</h3><div class="none">${t("too_few", lang)}</div></div>`;
  const summary = chartSummary(spec, lang, timeZone);
  const ruleLabel = spec.ruleTitle ? t(spec.ruleTitle, lang) : "";
  const times = spec.points.map((p) => p.t);
  const fmt = (ms: number) => new Intl.DateTimeFormat(lang, { month: "short", year: "2-digit", timeZone }).format(new Date(ms));
  return html`<div class="chart"><h3>${title}</h3>
    <svg viewBox="0 0 ${geo.width} ${geo.height}" role="img" aria-label=${tf("chart_aria", lang, { title, summary })}>
      <title>${title}</title>
      ${geo.yTicks.map((tick) => svg`<line class="grid" x1=${geo.plot.left} x2=${geo.plot.right} y1=${tick.y} y2=${tick.y}></line>
        <text class="axis" x=${geo.plot.left - 4} y=${tick.y + 3} text-anchor="end">${tick.label}</text>`)}
      ${geo.ruleY === null ? nothing : svg`<line x1=${geo.plot.left} x2=${geo.plot.right} y1=${geo.ruleY} y2=${geo.ruleY} stroke="#ef6c00" stroke-width="1" stroke-dasharray="4 3"></line>
        <text class="axis" x=${geo.plot.right} y=${geo.ruleY - 2} text-anchor="end" fill="#ef6c00">${ruleLabel}</text>`}
      <path d=${geo.path} fill="none" stroke=${spec.color} stroke-width="1.6" stroke-linejoin="round"></path>
      ${geo.dots.map((d) => svg`<circle cx=${d.x} cy=${d.y} r="2" fill=${spec.color}></circle>`)}
      <text class="axis" x=${geo.plot.left} y=${geo.height - 4}>${fmt(Math.min(...times))}</text>
      <text class="axis" x=${geo.plot.right} y=${geo.height - 4} text-anchor="end">${fmt(Math.max(...times))}</text>
    </svg></div>`;
}

export function batteryReportDoc(content: ReportContent, charts: ChartSpec[], assessment: AssessmentView, lang: string, timeZone: string): TemplateResult {
  return html`<div class="doc battery-report">
    <h1>${content.title}</h1>
    <div class="subtitle">${content.subtitle}</div>
    ${tiles(content.tiles)}
    <div class="charts">${charts.map((c) => chartDoc(c, lang, timeZone))}</div>
    <h2>${t("key_figures", lang)}</h2>
    <div class="figures">${content.rows.map((r) => html`<div class="fig"><span>${r.label}</span><b>${r.value}</b></div>`)}</div>
    ${content.recent.length === 0 ? nothing : html`<h2>${t("recent_flights", lang)}</h2>
      <table>
        <thead><tr>${content.recentHeader.map((h, i) => html`<th scope="col" class=${i === 0 ? "" : "right"}>${h}</th>`)}</tr></thead>
        <tbody>${content.recent.map((line) => html`<tr>${line.map((cell, i) => html`<td class=${i === 0 ? "" : "right"}>${cell}</td>`)}</tr>`)}</tbody>
      </table>`}
    <div class="assessment" style="--level:${assessment.color}" data-level=${assessment.level} role="group" aria-label=${t("assessment", lang)}>
      <b class="head"><span class="symbol" aria-hidden="true">${assessment.symbol}</span>${t("assessment", lang)}: ${assessment.headline} (${assessment.levelText})</b>
      <div><b>${assessment.stateOfHealth}</b></div>
      <ul>${assessment.points.map((p) => html`<li>${p}</li>`)}</ul>
    </div>
    ${content.notes.map((n) => html`<p class="footnote">${n}</p>`)}
  </div>`;
}

/** Druckt ein Dokument aus einem eigenen, unsichtbaren Rahmen: so erscheint nur das Dokument (A4), nicht die Home-Assistant-Oberfläche. */
export function printDocument(content: TemplateResult, title: string, win: Window = window): boolean {
  const doc = win.document;
  const frame = doc.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.tabIndex = -1;
  frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";
  doc.body.appendChild(frame);
  const target = frame.contentDocument;
  const targetWindow = frame.contentWindow;
  if (!target || !targetWindow) {
    frame.remove();
    win.print();
    return false;
  }
  target.open();
  target.write(`<!doctype html><html lang="${doc.documentElement.lang || "de"}"><head><meta charset="utf-8"><title>${title.replace(/[<&]/g, "")}</title><style>${DOC_CSS}${PRINT_PAGE_CSS}</style></head><body></body></html>`);
  target.close();
  render(content, target.body);
  const cleanup = () => frame.remove();
  targetWindow.addEventListener("afterprint", cleanup, { once: true });
  setTimeout(cleanup, 120_000);
  // Rendern abwarten, dann drucken
  setTimeout(() => { targetWindow.focus(); targetWindow.print(); }, 50);
  return true;
}
