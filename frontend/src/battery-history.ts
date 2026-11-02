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
  static properties = {
    hass: { attribute: false },
    drone: { type: String },
    battery: { type: String },
    batteries: { state: true },
    metric: { state: true },
  };
  declare hass: HassLike;
  declare drone: string | undefined;
  declare battery: string | undefined;
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
      .reports { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
      .summary { margin-top: 12px; border-top: 1px solid var(--divider-color, #ddd); padding-top: 8px; }
      .summary h3 { font-size: 0.95rem; }
      .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("drone") && this.loadedOnce) void this.load();
  }

  private loadedOnce = false;

  private async load() {
    try {
      this.batteries = (await new DroneLogApi(this.hass).batteries(this.drone || undefined)).batteries;
    } catch {
      this.batteries = [];
    }
    this.loadedOnce = true;
  }

  /** Ein gewählter Akku wird einzeln gezeigt, sonst alle (Vergleich). */
  private get visible(): BatteryDTO[] {
    return this.battery ? this.batteries.filter((b) => b.serial === this.battery) : this.batteries;
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
        ${this.visible.map(
          (b, i) => html`<span class=${isWarning(b) ? "warn" : ""}><span class="dot" style="background:${isWarning(b) ? "#c62828" : PALETTE[i % PALETTE.length]}"></span>…${b.suffix} (${b.flights})${isWarning(b) ? " ⚠" : ""}</span>`,
        )}
      </div>
      <div class="reports">
        ${this.visible.map((b) => html`<button data-report=${b.serial} @click=${() => this.dispatchEvent(new CustomEvent("open-battery-report", { detail: b.serial, bubbles: true, composed: true }))}>${t("open_report", l)} …${b.suffix}</button>`)}
      </div>
      ${this.visible.length === 1 ? this.summary(this.visible[0]) : ""}
    </div>`;
  }

  private summary(b: BatteryDTO) {
    const l = this.language;
    const last = b.history[b.history.length - 1];
    const value = (v: number | null | undefined, unit = "") => (v === null || v === undefined ? "–" : `${v}${unit}`);
    return html`<div class="summary">
      <h3>${t("battery_summary", l)} …${b.suffix}</h3>
      <div class="kv"><span>${t("flights_count", l)}</span><b>${b.flights}</b></div>
      <div class="kv"><span>${t("cycles", l)}</span><b>${value(last?.cycles)}</b></div>
      <div class="kv"><span>${t("health", l)}</span><b>${value(last?.health_pct, " %")}</b></div>
      <div class="kv"><span>${t("cell_deviation", l)} (${t("last_value", l)})</span><b>${value(last?.cell_deviation_mv, " mV")}</b></div>
      <div class="kv"><span>${t("temperature", l)} (${t("last_value", l)})</span><b>${value(last?.temp_max_c, " °C")}</b></div>
    </div>`;
  }

  updated(changed: Map<string, unknown>) {
    // HA setzt bei jedem Zustandswechsel ein neues hass: das Diagramm nur bei neuen Daten/Messgröße neu bauen
    if (!changed.has("batteries") && !changed.has("metric") && !changed.has("battery")) return;
    this.rebuilds++;
    this.plot?.destroy();
    this.plot = undefined;
    const container = this.renderRoot.querySelector("#plot") as HTMLElement | null;
    const shown = this.visible;
    if (!container || shown.length === 0 || !canvasSupported()) return;
    const { x, series } = alignSeries(shown, this.metric);
    try {
      this.plot = new uPlot(
        {
          width: container.clientWidth || 600, height: 240, legend: { show: false }, scales: { x: { time: true } },
          axes: [{ grid: { stroke: "rgba(128,128,128,0.2)" } }, { grid: { stroke: "rgba(128,128,128,0.2)" } }],
          series: [{}, ...shown.map((b, i) => ({ label: `…${b.suffix}`, stroke: isWarning(b) ? "#c62828" : PALETTE[i % PALETTE.length], width: 2, spanGaps: true, points: { show: true } }))],
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
