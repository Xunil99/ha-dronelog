import uPlot from "uplot";
import uplotCss from "uplot/dist/uPlot.min.css?inline";
import { canvasSupported } from "./canvas";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import {
  buildAttitudeAndCellData, buildChartData, buildDischarge, buildSignalDistance, buildSignalTime, chartAvailability, chartColors,
  type ChartPalette,
} from "./chart-data";
import { eventInfo, modeBand } from "./flight-logic";
import { formatDuration } from "./format";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { FlightEventDTO, ModeSegmentDTO, Point } from "./types";

const HEIGHT = 200;

/** Welche Diagramme gezeigt werden (Reihenfolge wie in der App); Grundlage für Render und Aufbau. */
export function chartIds(points: Point[]): string[] {
  if (points.length < 2) return [];
  const a = chartAvailability(points);
  const ids = ["motion", "power"];
  if (a.cell) ids.push("cell");
  if (a.temp) ids.push("temp");
  if (a.attitude) ids.push("attitude");
  if (a.discharge) ids.push("discharge");
  if (a.signal) ids.push("signal");
  if (a.distance) ids.push("distance");
  return ids;
}

/** Ereignislinien (gestrichelt, nach Schweregrad gefärbt) in Zeitdiagrammen; X-Achse in Minuten. */
function eventLines(events: FlightEventDTO[]): uPlot.Plugin {
  return {
    hooks: {
      draw: [
        (u) => {
          const { ctx, bbox } = u;
          ctx.save();
          ctx.lineWidth = 1.5 * devicePixelRatio;
          ctx.setLineDash([4 * devicePixelRatio, 3 * devicePixelRatio]);
          for (const e of events) {
            const x = u.valToPos(e.t / 60, "x", true);
            if (!Number.isFinite(x) || x < bbox.left || x > bbox.left + bbox.width) continue;
            ctx.strokeStyle = eventInfo(e.kind).color;
            ctx.beginPath();
            ctx.moveTo(x, bbox.top);
            ctx.lineTo(x, bbox.top + bbox.height);
            ctx.stroke();
          }
          ctx.restore();
        },
      ],
    },
  };
}

export class FlightCharts extends LitElement {
  static properties = {
    points: { attribute: false },
    events: { attribute: false },
    modeSegments: { attribute: false },
    lang: { type: String },
    dark: { type: Boolean },
  };
  declare points: Point[];
  declare events: FlightEventDTO[];
  declare modeSegments: ModeSegmentDTO[];
  declare lang: string;
  declare dark: boolean;
  private plots = new Map<string, uPlot>();
  private resizeObserver?: ResizeObserver;

  constructor() {
    super();
    this.points = [];
    this.events = [];
    this.modeSegments = [];
    this.lang = "de";
    this.dark = false;
  }

  static styles = [
    unsafeCSS(uplotCss),
    baseStyles,
    css`
      .charts { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; margin-top: 12px; }
      .chart { min-height: 220px; }
      .chart h3, .modes h3 { margin: 0 0 4px; font-size: 0.95rem; font-weight: 500; }
      .modes { margin-top: 12px; }
      .band { display: flex; height: 28px; border-radius: 6px; overflow: hidden; margin: 6px 0 8px; }
      .band span { display: block; min-width: 2px; }
      .legend { display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 0.85rem; }
      .legend i { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 5px; }
    `,
  ];

  private chartTitle(id: string): string {
    const l = this.lang;
    switch (id) {
      case "motion": return `${t("max_height", l)} / ${t("max_speed", l)}`;
      case "power": return t("battery", l);
      case "cell": return t("chart_cell_deviation", l);
      case "temp": return t("chart_temperature", l);
      case "attitude": return t("chart_attitude", l);
      case "discharge": return t("chart_discharge", l);
      case "signal": return t("chart_signal_time", l);
      default: return t("chart_signal_distance", l);
    }
  }

  private renderModeBand() {
    const band = modeBand(this.modeSegments, this.lang);
    if (band.segments.length === 0) return nothing;
    return html`<div class="card modes" id="modes">
      <h3>${t("flight_mode", this.lang)}</h3>
      <div class="band" role="img" aria-label=${band.legend.map((x) => `${x.label} ${formatDuration(x.seconds)}`).join(", ")}>
        ${band.segments.map((s) => html`<span style="flex:${s.share};background:${s.color}" title="${s.label}"></span>`)}
      </div>
      <div class="legend">${band.legend.map((x) => html`<span><i style="background:${x.color}"></i>${x.label} <span class="muted">${formatDuration(x.seconds)}</span></span>`)}</div>
    </div>`;
  }

  render() {
    if (this.points.length < 2) return html`<p class="muted">${t("no_history", this.lang)}</p>`;
    return html`${this.renderModeBand()}<div class="charts">
      ${chartIds(this.points).map((id) => html`<div class="card"><h3>${this.chartTitle(id)}</h3><div class="chart" id=${id}></div></div>`)}
    </div>`;
  }

  private build(id: string, container: HTMLElement, c: ChartPalette): uPlot | undefined {
    const l = this.lang;
    const width = container.clientWidth || 400;
    const grid = { stroke: c.grid, width: 1 };
    const xAxis = (label: string) => ({ stroke: c.axis, grid: { stroke: c.grid }, label });
    const yAxis = (stroke: string, scale: string, label: string, side: 1 | 3 = 3, showGrid = true) => ({
      scale, label, stroke, grid: showGrid ? grid : { show: false }, ticks: { stroke: c.grid }, side, size: 50,
    });
    const timePlugins = this.events.length > 0 ? [eventLines(this.events)] : [];
    const base = { width, height: HEIGHT, legend: { show: true } };
    switch (id) {
      case "motion": {
        const d = buildChartData(this.points);
        return new uPlot({
          ...base, plugins: timePlugins, scales: { x: { time: false }, m: {}, kmh: {} },
          axes: [xAxis("min"), yAxis(c.height, "m", "m"), yAxis(c.speed, "kmh", "km/h", 1, false)],
          series: [{}, { label: "m", stroke: c.height, scale: "m", width: 2 }, { label: "km/h", stroke: c.speed, scale: "kmh", width: 2 }],
        }, [d.time, d.height, d.speedKmh], container);
      }
      case "power": {
        const d = buildChartData(this.points);
        return new uPlot({
          ...base, plugins: timePlugins, scales: { x: { time: false }, v: {}, a: {}, pct: { range: [0, 100] } },
          axes: [xAxis("min"), yAxis(c.voltage, "v", "V"), yAxis(c.current, "a", "A", 1, false)],
          series: [{}, { label: "V", stroke: c.voltage, scale: "v", width: 2, spanGaps: false },
            { label: "A", stroke: c.current, scale: "a", width: 2, spanGaps: false }, { label: "%", stroke: c.charge, scale: "pct", width: 1, dash: [4, 4] }],
        }, [d.time, d.voltage, d.current, d.charge], container);
      }
      case "cell": {
        const d = buildAttitudeAndCellData(this.points);
        const limit = d.time.map(() => 20);
        return new uPlot({
          ...base, plugins: timePlugins, scales: { x: { time: false }, mv: { range: (_u, min, max) => [0, Math.max(max, 25) * 1.05] } },
          axes: [xAxis("min"), yAxis(c.cell, "mv", "mV")],
          series: [{}, { label: "mV", stroke: c.cell, scale: "mv", width: 2, spanGaps: false }, { label: "20 mV", stroke: c.limit, scale: "mv", width: 1, dash: [4, 4] }],
        }, [d.time, d.cellDevMv, limit], container);
      }
      case "temp": {
        const d = buildAttitudeAndCellData(this.points);
        return new uPlot({
          ...base, plugins: timePlugins, scales: { x: { time: false }, c: {} },
          axes: [xAxis("min"), yAxis(c.temp, "c", "°C")],
          series: [{}, { label: "°C", stroke: c.temp, scale: "c", width: 2, spanGaps: false }],
        }, [d.time, d.temp], container);
      }
      case "attitude": {
        const d = buildAttitudeAndCellData(this.points);
        return new uPlot({
          ...base, plugins: timePlugins, scales: { x: { time: false }, deg: {} },
          axes: [xAxis("min"), yAxis(c.pitch, "deg", "°")],
          series: [{}, { label: t("pitch", l), stroke: c.pitch, scale: "deg", width: 1.5, spanGaps: false }, { label: t("roll", l), stroke: c.roll, scale: "deg", width: 1.5, spanGaps: false }],
        }, [d.time, d.pitch, d.roll], container);
      }
      case "discharge": {
        const d = buildDischarge(this.points);
        return new uPlot({
          ...base, scales: { x: { time: false, dir: -1 }, v: {} },
          axes: [xAxis(t("charge_state", l)), yAxis(c.discharge, "v", "V")],
          series: [{}, { label: "V", stroke: c.discharge, scale: "v", width: 2 }],
        }, [d.charge, d.voltage], container);
      }
      case "signal": {
        const d = buildSignalTime(this.points);
        const weak = d.time.map(() => 30);
        return new uPlot({
          ...base, plugins: timePlugins, scales: { x: { time: false }, pct: { range: [0, 100] } },
          axes: [xAxis("min"), yAxis(c.downlink, "pct", "%")],
          series: [{}, { label: t("downlink", l), stroke: c.downlink, scale: "pct", width: 2, spanGaps: false },
            { label: t("uplink", l), stroke: c.uplink, scale: "pct", width: 2, spanGaps: false }, { label: "30 %", stroke: c.weak, scale: "pct", width: 1, dash: [4, 4] }],
        }, [d.time, d.dl, d.ul, weak], container);
      }
      case "distance": {
        const d = buildSignalDistance(this.points);
        return new uPlot({
          ...base, legend: { show: false }, scales: { x: { time: false }, pct: { range: [0, 100] } },
          axes: [xAxis(t("distance_m", l)), yAxis(c.downlink, "pct", "%")],
          series: [{}, { label: t("downlink", l), stroke: c.downlink, scale: "pct", width: 0, points: { show: true, size: 4, fill: c.downlink, stroke: c.downlink } }],
        }, [d.dist, d.dl], container);
      }
    }
    return undefined;
  }

  updated() {
    this.destroyPlots();
    if (this.points.length < 2 || !canvasSupported()) return;  // ohne Canvas (z. B. Tests) bleiben die Diagramme leer
    const c = chartColors(this.dark);
    try {
      for (const id of chartIds(this.points)) {
        const container = this.renderRoot.querySelector(`#${id}`) as HTMLElement | null;
        if (!container) continue;
        const plot = this.build(id, container, c);
        if (plot) this.plots.set(id, plot);
      }
      this.resizeObserver ??= typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(() => this.resize());
      const first = this.renderRoot.querySelector("#motion");
      if (first) this.resizeObserver?.observe(first);
    } catch {
      // Umgebung ohne Canvas-Unterstützung (z. B. Tests): Diagramme bleiben leer, der Rest funktioniert
      this.destroyPlots();
    }
  }

  private resize() {
    for (const [id, plot] of this.plots) {
      const container = this.renderRoot.querySelector(`#${id}`) as HTMLElement | null;
      if (container) plot.setSize({ width: container.clientWidth, height: HEIGHT });
    }
  }

  private destroyPlots() {
    this.plots.forEach((plot) => plot.destroy());
    this.plots.clear();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.destroyPlots();
    this.resizeObserver?.disconnect();
  }
}
customElements.define("dl-flight-charts", FlightCharts);
