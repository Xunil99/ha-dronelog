import { LitElement, css, html } from "lit";
import { DroneLogApi } from "./api";
import "./battery-report-view";
import "./logbook-view";
import "./maintenance-view";
import "./stats-view";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { BatteryDTO, DroneStat, HassLike } from "./types";

export type Section = "stats" | "logbook" | "maintenance";

/** Reiter „Auswertung“: Statistik, Logbuch und Wartung mit gemeinsamem Drohnen-/Akku-Filter; dazu der Akku-Bericht. */
export class AnalysisView extends LitElement {
  static properties = {
    hass: { attribute: false },
    tileUrl: { type: String },
    openReport: { type: String },
    section: { state: true },
    drone: { state: true },
    battery: { state: true },
    drones: { state: true },
    batteries: { state: true },
    report: { state: true },
  };
  declare hass: HassLike;
  declare tileUrl: string;
  declare openReport: string | undefined;
  declare section: Section;
  declare drone: string;
  declare battery: string;
  declare drones: DroneStat[];
  declare batteries: BatteryDTO[];
  declare report: string | undefined;

  constructor() {
    super();
    this.tileUrl = "";
    this.section = "stats";
    this.drone = "";
    this.battery = "";
    this.drones = [];
    this.batteries = [];
    // Berichte aus der Akku-Auswertung öffnet dieser Reiter selbst (nicht über den Panel-Zustand, der bei gleichem Akku keine Änderung sähe)
    this.addEventListener("open-battery-report", (event) => {
      event.stopPropagation();
      this.report = (event as CustomEvent<string>).detail;
    });
  }

  static styles = [
    baseStyles,
    css`
      .sub { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
      .sub button[aria-pressed="true"] { background: var(--primary-color); color: var(--text-primary-color, #fff); border-color: var(--primary-color); }
      .toolbar { display: flex; gap: 8px; align-items: center; margin: 0 0 12px; flex-wrap: wrap; }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    void this.loadOptions();
  }

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("openReport") && this.openReport) this.report = this.openReport;
  }

  private async loadOptions() {
    try {
      const api = new DroneLogApi(this.hass);
      const [stats, batteries] = await Promise.all([api.stats(), api.batteries()]);
      this.drones = stats.drones;
      this.batteries = batteries.batteries;
    } catch {
      /* Filter sind optional */
    }
  }

  private get language() {
    return this.hass?.language ?? "en";
  }

  /** Akkus erscheinen nur, wenn die zugehörige Drohne gewählt ist. */
  private get batteryOptions(): BatteryDTO[] {
    return this.drone ? this.batteries.filter((b) => b.drones.includes(this.drone)) : [];
  }

  private get droneLabel(): string {
    const d = this.drones.find((x) => x.serial === this.drone);
    return d ? `${d.model} …${d.serial_suffix}` : this.drone;
  }

  private get batteryLabel(): string {
    const b = this.batteries.find((x) => x.serial === this.battery);
    return b ? `…${b.suffix}` : this.battery;
  }

  private onDrone(event: Event) {
    this.drone = (event.target as HTMLSelectElement).value;
    this.battery = "";  // ein Akku einer anderen Drohne gilt nicht mehr
  }

  private onBattery(event: Event) {
    this.battery = (event.target as HTMLSelectElement).value;
  }

  private closeReport() {
    this.report = undefined;
    this.openReport = undefined;
  }

  render() {
    const l = this.language;
    if (this.report) {
      return html`<dl-battery-report .hass=${this.hass} .serial=${this.report} @close=${() => this.closeReport()}></dl-battery-report>`;
    }
    const sections: { id: Section; label: string }[] = [
      { id: "stats", label: t("sub_stats", l) }, { id: "logbook", label: t("sub_logbook", l) }, { id: "maintenance", label: t("sub_maintenance", l) },
    ];
    return html`
      <div class="sub" role="group" aria-label=${t("tab_stats", l)}>
        ${sections.map((s) => html`<button data-section=${s.id} aria-pressed=${this.section === s.id} @click=${() => (this.section = s.id)}>${s.label}</button>`)}
      </div>
      ${this.section === "maintenance" ? "" : html`<div class="toolbar">
        <select name="drone" aria-label=${t("col_drone", l)} @change=${this.onDrone}>
          <option value="">${t("all_drones", l)}</option>
          ${this.drones.map((d) => html`<option value=${d.serial} ?selected=${d.serial === this.drone}>${d.model} …${d.serial_suffix}</option>`)}
        </select>
        <select name="battery" aria-label=${t("battery", l)} @change=${this.onBattery} ?disabled=${!this.drone}>
          <option value="">${t("all_batteries", l)}</option>
          ${this.batteryOptions.map((b) => html`<option value=${b.serial} ?selected=${b.serial === this.battery}>…${b.suffix}</option>`)}
        </select>
      </div>`}
      ${this.section === "stats"
        ? html`<dl-stats-view .hass=${this.hass} .tileUrl=${this.tileUrl} .drone=${this.drone} .battery=${this.battery}></dl-stats-view>`
        : this.section === "logbook"
          ? html`<dl-logbook-view .hass=${this.hass} .drone=${this.drone} .battery=${this.battery} .droneLabel=${this.droneLabel} .batteryLabel=${this.batteryLabel}></dl-logbook-view>`
          : html`<dl-maintenance-view .hass=${this.hass}></dl-maintenance-view>`}
    `;
  }
}
customElements.define("dl-analysis-view", AnalysisView);
