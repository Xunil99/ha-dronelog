import { LitElement, css, html, nothing } from "lit";
import { DroneLogApi } from "./api";
import "./flight-detail";
import "./flight-list";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { BatteryDTO, DroneStat, FlightDetailDTO, FlightSummary, HassLike } from "./types";

const PAGE = 50;

export class FlightsView extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    tileUrl: { type: String },
    initialId: { type: Number },
    flights: { state: true },
    total: { state: true },
    selectedId: { state: true },
    detail: { state: true },
    drones: { state: true },
    batteries: { state: true },
    droneFilter: { state: true },
    batteryFilter: { state: true },
    loading: { state: true },
    error: { state: true },
    showDetail: { state: true },
    detailError: { state: true },
  };
  declare hass: HassLike;
  declare narrow: boolean;
  declare tileUrl: string;
  declare initialId: number | undefined;
  declare flights: FlightSummary[];
  declare total: number;
  declare selectedId: number | undefined;
  declare detail: FlightDetailDTO | undefined;
  declare drones: DroneStat[];
  declare batteries: BatteryDTO[];
  declare droneFilter: string;
  declare batteryFilter: string;
  declare loading: boolean;
  declare error: boolean;
  declare showDetail: boolean;
  declare detailError: boolean;
  private listToken = 0;
  private detailToken = 0;

  constructor() {
    super();
    this.narrow = false;
    this.tileUrl = "";
    this.flights = [];
    this.total = 0;
    this.drones = [];
    this.batteries = [];
    this.droneFilter = "";
    this.batteryFilter = "";
    this.loading = false;
    this.error = false;
    this.showDetail = false;
    this.detailError = false;
  }

  static styles = [
    baseStyles,
    css`
      .layout { display: grid; grid-template-columns: minmax(240px, 320px) 1fr; gap: 16px; align-items: start; }
      .layout.narrow { grid-template-columns: 1fr; }
      .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
      .list { max-height: calc(100vh - 160px); overflow: auto; }
      .list.narrow { max-height: none; }
      .more { width: 100%; margin-top: 8px; }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    void this.loadOptions();
    void this.loadFlights(true);
  }

  private get api() {
    return new DroneLogApi(this.hass);
  }
  private get language() {
    return this.hass?.language ?? "en";
  }
  private get timeZone() {
    return this.hass?.config?.time_zone ?? "UTC";
  }

  private async loadOptions() {
    try {
      const [stats, batteries] = await Promise.all([this.api.stats(), this.api.batteries()]);
      this.drones = stats.drones;
      this.batteries = batteries.batteries;
    } catch {
      /* Filter sind optional */
    }
  }

  private async loadFlights(reset: boolean) {
    if (!reset && this.loading) return;  // Doppelklick auf "Mehr laden"
    const token = ++this.listToken;
    const offset = reset ? 0 : this.flights.length;
    this.loading = true;
    this.error = false;
    try {
      const result = await this.api.flights({
        limit: PAGE,
        offset,
        drone: this.droneFilter || undefined,
        battery: this.batteryFilter || undefined,
      });
      if (token !== this.listToken) return;  // inzwischen kam eine neuere Anfrage (z. B. anderer Filter)
      this.flights = reset ? result.flights : [...this.flights, ...result.flights];
      this.total = result.total;
      if (reset) {
        const jump = this.initialId;
        this.initialId = undefined;  // der Sprung aus der Heatmap gilt nur einmal
        const first = jump ?? result.flights[0]?.id;
        if (first !== undefined) await this.selectFlight(first, jump !== undefined);
        else this.detail = undefined;
      }
    } catch {
      if (token === this.listToken) this.error = true;
    } finally {
      if (token === this.listToken) this.loading = false;
    }
  }

  private async selectFlight(id: number, openDetail = true) {
    const token = ++this.detailToken;
    this.selectedId = id;
    this.detailError = false;
    if (openDetail) this.showDetail = true;
    try {
      const detail = await this.api.flight(id);
      if (token === this.detailToken) this.detail = detail;  // nur die Antwort auf den letzten Klick zählt
    } catch {
      if (token === this.detailToken) {
        this.detail = undefined;
        this.detailError = true;
      }
    }
  }

  private onFilter(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (select.name === "drone") this.droneFilter = select.value;
    else this.batteryFilter = select.value;
    void this.loadFlights(true);
  }

  render() {
    const l = this.language;
    if (this.error) return html`<p class="muted">${t("error", l)}</p>`;
    if (!this.loading && this.flights.length === 0 && !this.droneFilter && !this.batteryFilter) {
      return html`<p class="muted">${t("no_flights", l)}</p>`;
    }
    const list = html`
      <div class="filters">
        <select name="drone" @change=${this.onFilter}>
          <option value="">${t("all_drones", l)}</option>
          ${this.drones.map((d) => html`<option value=${d.serial} ?selected=${d.serial === this.droneFilter}>${d.model} …${d.serial_suffix}</option>`)}
        </select>
        <select name="battery" @change=${this.onFilter}>
          <option value="">${t("all_batteries", l)}</option>
          ${this.batteries.map((b) => html`<option value=${b.serial} ?selected=${b.serial === this.batteryFilter}>…${b.suffix}</option>`)}
        </select>
      </div>
      <div class="list ${this.narrow ? "narrow" : ""}">
        <dl-flight-list
          .flights=${this.flights}
          .selectedId=${this.selectedId}
          .lang=${l}
          .timeZone=${this.timeZone}
          @select=${(e: CustomEvent<number>) => void this.selectFlight(e.detail)}
        ></dl-flight-list>
        ${this.flights.length < this.total
          ? html`<button class="more" ?disabled=${this.loading} @click=${() => void this.loadFlights(false)}>${t("load_more", l)}</button>`
          : nothing}
      </div>
    `;
    const detail = this.detailError
      ? html`<p class="muted">${t("error", l)}</p>`
      : html`<dl-flight-detail
      .detail=${this.detail}
      .lang=${l}
      .timeZone=${this.timeZone}
      .tileUrl=${this.tileUrl}
      .dark=${Boolean(this.hass?.themes?.darkMode)}
    ></dl-flight-detail>`;
    if (this.narrow) {
      return this.showDetail
        ? html`<button @click=${() => (this.showDetail = false)}>← ${t("back", l)}</button>${detail}`
        : list;
    }
    return html`<div class="layout"><div>${list}</div><div>${detail}</div></div>`;
  }
}
customElements.define("dl-flights-view", FlightsView);
