import uPlot from "uplot";
import uplotCss from "uplot/dist/uPlot.min.css?inline";
import { canvasSupported } from "./canvas";
import { LitElement, css, html, unsafeCSS } from "lit";
import { DroneLogApi } from "./api";
import { t, type MessageKey } from "./i18n";
import { alignSeries, isWarning, type BatteryMetric } from "./stats-logic";
import { baseStyles } from "./styles";
import type { BatteryDTO, HassLike } from "./types";

const METRICS: { key: BatteryMetric; label: MessageKey }[] = [
  { key: "health_pct", label: "health" },
  { key: "cycles", label: "cycles" },
  { key: "cell_deviation_mv", label: "cell_deviation" },
  { key: "temp_max_c", label: "temperature" },
  { key: "avg_power_w", label: "power_avg" },
];
const PALETTE = ["#1565c0", "#ef6c00", "#2e7d32", "#6a1b9a", "#00838f", "#ad1457", "#4e342e", "#546e7a", "#9e9d24"];

export class BatteryHistory extends LitElement {
  static properties = { hass: { attribute: false }, batteries: { state: true }, metric: { state: true } };
  declare hass: HassLike;
  declare batteries: BatteryDTO[];
  declare metric: BatteryMetric;
  private plot?: uPlot;
  rebuilds = 0;

  constructor() {
    super();
    this.batteries = [];
    this.metric = "health_pct";
  }

  static styles = [
    unsafeCSS(uplotCss),
    baseStyles,
    css`
      .toolbar { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
      button[aria-pressed="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); }
      .legend { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; font-size: 0.85rem; }
      .legend .warn { color: var(--error-color, #c62828); font-weight: 500; }
      .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; }
    `,
  ];

  async connectedCallback() {
    super.connectedCallback();
    try {
      this.batteries = (await new DroneLogApi(this.hass).batteries()).batteries;
    } catch {
      this.batteries = [];
    }
  }

  private get language() {
    return this.hass?.language ?? "en";
  }

  render() {
    const l = this.language;
    return html`<div class="card">
      <h3>${t("battery_history", l)}</h3>
      <div class="toolbar">
        ${METRICS.map((m) => html`<button data-metric=${m.key} aria-pressed=${this.metric === m.key} @click=${() => (this.metric = m.key)}>${t(m.label, l)}</button>`)}
      </div>
      <div id="plot"></div>
      <div class="legend">
        ${this.batteries.map(
          (b, i) => html`<span class=${isWarning(b) ? "warn" : ""}><span class="dot" style="background:${isWarning(b) ? "#c62828" : PALETTE[i % PALETTE.length]}"></span>…${b.suffix} (${b.flights})${isWarning(b) ? " ⚠" : ""}</span>`,
        )}
      </div>
    </div>`;
  }

  updated(changed: Map<string, unknown>) {
    // HA setzt bei jedem Zustandswechsel ein neues hass: das Diagramm nur bei neuen Daten/Messgröße neu bauen
    if (!changed.has("batteries") && !changed.has("metric")) return;
    this.rebuilds++;
    this.plot?.destroy();
    this.plot = undefined;
    const container = this.renderRoot.querySelector("#plot") as HTMLElement | null;
    if (!container || this.batteries.length === 0 || !canvasSupported()) return;
    const { x, series } = alignSeries(this.batteries, this.metric);
    try {
      this.plot = new uPlot(
        {
          width: container.clientWidth || 600, height: 240, legend: { show: false }, scales: { x: { time: true } },
          axes: [{ grid: { stroke: "rgba(128,128,128,0.2)" } }, { grid: { stroke: "rgba(128,128,128,0.2)" } }],
          series: [{}, ...this.batteries.map((b, i) => ({ label: `…${b.suffix}`, stroke: isWarning(b) ? "#c62828" : PALETTE[i % PALETTE.length], width: 2, spanGaps: true, points: { show: true } }))],
        },
        [x, ...series] as uPlot.AlignedData,
        container,
      );
    } catch {
      this.plot = undefined;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.plot?.destroy();
    this.plot = undefined;
  }
}
customElements.define("dl-battery-history", BatteryHistory);
