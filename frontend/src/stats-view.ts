import { LitElement, css, html, nothing } from "lit";
import { DroneLogApi } from "./api";
import "./battery-history";
import { formatDistance, formatDuration } from "./format";
import "./heatmap-view";
import { t } from "./i18n";
import { fillMonths, monthLabel } from "./stats-logic";
import { baseStyles } from "./styles";
import type { BatteryDTO, HassLike, StatsDTO } from "./types";

type Metric = "flights" | "duration";

export class StatsView extends LitElement {
  static properties = {
    hass: { attribute: false },
    tileUrl: { type: String },
    stats: { state: true },
    drone: { state: true },
    battery: { state: true },
    batteries: { state: true },
    metric: { state: true },
    error: { state: true },
  };
  declare hass: HassLike;
  declare tileUrl: string;
  declare stats: StatsDTO | undefined;
  declare drone: string;
  declare battery: string;
  declare batteries: BatteryDTO[];
  declare metric: Metric;
  declare error: boolean;

  constructor() {
    super();
    this.tileUrl = "";
    this.drone = "";
    this.battery = "";
    this.batteries = [];
    this.metric = "flights";
    this.error = false;
  }

  static styles = [
    baseStyles,
    css`
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-bottom: 12px; }
      .tile { text-align: center; }
      .tile b { display: block; font-size: 1.3rem; font-weight: 500; }
      .toolbar { display: flex; gap: 8px; align-items: center; margin: 12px 0 8px; flex-wrap: wrap; }
      .bars { display: flex; align-items: flex-end; gap: 4px; height: 160px; overflow-x: auto; padding-bottom: 4px; }
      .col { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; min-width: 34px; height: 100%; }
      .bar { width: 22px; background: var(--primary-color); border-radius: 4px 4px 0 0; min-height: 2px; }
      .bar.empty { background: var(--divider-color, #ddd); min-height: 2px; }
      .bar-label { font-size: 0.7rem; color: var(--secondary-text-color); }
      .month { font-size: 0.7rem; color: var(--secondary-text-color); white-space: nowrap; }
      section { margin-bottom: 20px; }
      button[aria-pressed="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    void this.load();
    void this.loadBatteries();
  }

  private async loadBatteries() {
    try {
      this.batteries = (await new DroneLogApi(this.hass).batteries()).batteries;
    } catch {
      this.batteries = [];
    }
  }

  /** Akkus erscheinen nur, wenn die zugehörige Drohne gewählt ist. */
  private get batteryOptions(): BatteryDTO[] {
    return this.drone ? this.batteries.filter((b) => b.drones.includes(this.drone)) : [];
  }

  private get language() {
    return this.hass?.language ?? "en";
  }

  private async load() {
    try {
      this.stats = await new DroneLogApi(this.hass).stats(this.drone || undefined, this.battery || undefined);
      this.error = false;
    } catch {
      this.error = true;
    }
  }

  private onDrone(event: Event) {
    this.drone = (event.target as HTMLSelectElement).value;
    this.battery = "";  // ein Akku einer anderen Drohne gilt nicht mehr
    void this.load();
  }

  private onBattery(event: Event) {
    this.battery = (event.target as HTMLSelectElement).value;
    void this.load();
  }

  render() {
    const l = this.language;
    if (this.error) return html`<p class="muted">${t("error", l)}</p>`;
    const s = this.stats;
    if (!s) return html`<p class="muted">${t("loading", l)}</p>`;
    if (s.totals.flights === 0 && !this.drone && !this.battery) return html`<p class="muted">${t("no_flights", l)}</p>`;
    const months = fillMonths(s.months);
    const value = (m: (typeof months)[number]) => (this.metric === "flights" ? m.flights : m.duration_s);
    const peak = Math.max(1, ...months.map(value));
    const label = (m: (typeof months)[number]) => (this.metric === "flights" ? String(m.flights) : formatDuration(m.duration_s));
    return html`
      <section>
        <div class="tiles">
          <div class="card tile"><span class="muted">${t("tab_flights", l)}</span><b>${s.totals.flights}</b></div>
          <div class="card tile"><span class="muted">${t("duration", l)}</span><b>${formatDuration(s.totals.duration_s).replace(/^(\d+) min .*/, "$1 min")}</b></div>
          <div class="card tile"><span class="muted">${t("distance", l)}</span><b>${formatDistance(s.totals.distance_m, l)}</b></div>
        </div>
        <div class="toolbar">
          <select name="drone" @change=${this.onDrone}>
            <option value="">${t("all_drones", l)}</option>
            ${s.drones.map((d) => html`<option value=${d.serial} ?selected=${d.serial === this.drone}>${d.model} …${d.serial_suffix}</option>`)}
          </select>
          <select name="battery" @change=${this.onBattery} ?disabled=${!this.drone}>
            <option value="">${t("all_batteries", l)}</option>
            ${this.batteryOptions.map((b) => html`<option value=${b.serial} ?selected=${b.serial === this.battery}>…${b.suffix}</option>`)}
          </select>
          <button data-metric="flights" aria-pressed=${this.metric === "flights"} @click=${() => (this.metric = "flights")}>${t("metric_flights", l)}</button>
          <button data-metric="duration" aria-pressed=${this.metric === "duration"} @click=${() => (this.metric = "duration")}>${t("metric_hours", l)}</button>
        </div>
        <div class="card bars">
          ${months.map(
            (m) => html`<div class="col" title=${`${monthLabel(m.month, l)}: ${label(m)}`}>
              <span class="bar-label">${value(m) ? label(m) : nothing}</span>
              <div class="bar ${value(m) === 0 ? "empty" : ""}" style="height:${(value(m) / peak) * 120}px"></div>
              <span class="month">${monthLabel(m.month, l)}</span>
            </div>`,
          )}
        </div>
      </section>
      <section>
        <div class="card" style="margin-bottom:8px"><h3>${t("drones", l)}</h3>
          ${s.drones.map((d) => html`<div class="kv"><span>${d.model} …${d.serial_suffix}</span><b>${d.flights} · ${formatDuration(d.duration_s)}</b></div>`)}
        </div>
      </section>
      <section><dl-battery-history .hass=${this.hass} .drone=${this.drone || undefined} .battery=${this.battery || undefined}></dl-battery-history></section>
      <section><dl-heatmap-view .hass=${this.hass} .tileUrl=${this.tileUrl} .drone=${this.drone || undefined} .battery=${this.battery || undefined}></dl-heatmap-view></section>
    `;
  }
}
customElements.define("dl-stats-view", StatsView);
