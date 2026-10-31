import uPlot from "uplot";
import uplotCss from "uplot/dist/uPlot.min.css?inline";
import { LitElement, css, html, unsafeCSS } from "lit";
import { buildChartData, chartColors } from "./chart-data";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { Point } from "./types";

function canvasSupported(): boolean {
  try {
    return document.createElement("canvas").getContext("2d") !== null;
  } catch {
    return false;
  }
}

export class FlightCharts extends LitElement {
  static properties = {
    points: { attribute: false },
    lang: { type: String },
    dark: { type: Boolean },
  };
  declare points: Point[];
  declare lang: string;
  declare dark: boolean;
  private plots: uPlot[] = [];
  private resizeObserver?: ResizeObserver;

  constructor() {
    super();
    this.points = [];
    this.lang = "de";
    this.dark = false;
  }

  static styles = [
    unsafeCSS(uplotCss),
    baseStyles,
    css`
      .charts { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; margin-top: 12px; }
      .chart { min-height: 220px; }
      .chart h3 { margin: 0 0 4px; font-size: 0.95rem; font-weight: 500; }
    `,
  ];

  render() {
    if (this.points.length < 2) return html`<p class="muted">${t("no_history", this.lang)}</p>`;
    return html`<div class="charts">
      <div class="card"><h3>${t("max_height", this.lang)} / ${t("max_speed", this.lang)}</h3><div class="chart" id="motion"></div></div>
      <div class="card"><h3>${t("battery", this.lang)}</h3><div class="chart" id="power"></div></div>
    </div>`;
  }

  updated() {
    this.destroyPlots();
    if (this.points.length < 2 || !canvasSupported()) return;  // ohne Canvas (z. B. Tests) bleiben die Diagramme leer
    const motion = this.renderRoot.querySelector("#motion") as HTMLElement | null;
    const power = this.renderRoot.querySelector("#power") as HTMLElement | null;
    if (!motion || !power) return;
    const data = buildChartData(this.points);
    const c = chartColors(this.dark);
    const axis = (stroke: string, scale: string, label: string, side: 1 | 3 = 3) => ({
      scale, label, stroke, grid: { stroke: c.grid, width: 1 }, ticks: { stroke: c.grid }, side, size: 50,
    });
    try {
      this.plots = [
        new uPlot(
          {
            width: motion.clientWidth || 400, height: 200, legend: { show: true },
            scales: { x: { time: false }, m: {}, kmh: {} },
            axes: [{ stroke: c.axis, grid: { stroke: c.grid }, label: "min" }, { ...axis(c.height, "m", "m", 3), side: 3 }, { ...axis(c.speed, "kmh", "km/h", 1), grid: { show: false } }],
            series: [{}, { label: "m", stroke: c.height, scale: "m", width: 2 }, { label: "km/h", stroke: c.speed, scale: "kmh", width: 2 }],
          },
          [data.time, data.height, data.speedKmh],
          motion,
        ),
        new uPlot(
          {
            width: power.clientWidth || 400, height: 200, legend: { show: true },
            scales: { x: { time: false }, v: {}, a: {}, pct: { range: [0, 100] } },
            axes: [{ stroke: c.axis, grid: { stroke: c.grid }, label: "min" }, { ...axis(c.voltage, "v", "V", 3) }, { ...axis(c.current, "a", "A", 1), grid: { show: false } }],
            series: [{}, { label: "V", stroke: c.voltage, scale: "v", width: 2, spanGaps: false },
              { label: "A", stroke: c.current, scale: "a", width: 2, spanGaps: false }, { label: "%", stroke: c.charge, scale: "pct", width: 1, dash: [4, 4] }],
          },
          [data.time, data.voltage, data.current, data.charge],
          power,
        ),
      ];
      this.resizeObserver ??= typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(() => this.resize());
      this.resizeObserver?.observe(motion);
    } catch {
      // Umgebung ohne Canvas-Unterstützung (z. B. Tests): Diagramme bleiben leer, der Rest funktioniert
      this.plots = [];
    }
  }

  private resize() {
    const containers = [this.renderRoot.querySelector("#motion"), this.renderRoot.querySelector("#power")] as (HTMLElement | null)[];
    this.plots.forEach((plot, i) => containers[i] && plot.setSize({ width: containers[i]!.clientWidth, height: 200 }));
  }

  private destroyPlots() {
    this.plots.forEach((plot) => plot.destroy());
    this.plots = [];
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.destroyPlots();
    this.resizeObserver?.disconnect();
  }
}
customElements.define("dl-flight-charts", FlightCharts);
