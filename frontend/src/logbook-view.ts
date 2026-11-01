import { LitElement, css, html, nothing } from "lit";
import { DroneLogApi } from "./api";
import "./flightbook-view";
import { formatDecimal, formatDistance, formatDuration, formatHeight, formatSpeedKmh } from "./format";
import { flightbookFilterText } from "./report-logic";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { FlightbookDTO, HassLike, LogbookDTO, PlaceStatDTO } from "./types";

const PLACES_SHOWN = 15;

/** Pilotenlogbuch: Summen, Rekorde, Jahre, Orte (benennbar), Tags und Flugbuch-Erzeugung. Die Filter für Drohne und Akku kommen von außen. */
export class LogbookView extends LitElement {
  static properties = {
    hass: { attribute: false },
    drone: { type: String },
    battery: { type: String },
    droneLabel: { type: String },
    batteryLabel: { type: String },
    logbook: { state: true },
    error: { state: true },
    year: { state: true },
    book: { state: true },
    bookError: { state: true },
    editing: { state: true },
    draftName: { state: true },
    busy: { state: true },
  };
  declare hass: HassLike;
  declare drone: string;
  declare battery: string;
  declare droneLabel: string;
  declare batteryLabel: string;
  declare logbook: LogbookDTO | undefined;
  declare error: boolean;
  declare year: string;
  declare book: { data: FlightbookDTO; filterText: string } | undefined;
  declare bookError: boolean;
  declare editing: PlaceStatDTO | undefined;
  declare draftName: string;
  declare busy: boolean;
  private token = 0;

  constructor() {
    super();
    this.drone = "";
    this.battery = "";
    this.droneLabel = "";
    this.batteryLabel = "";
    this.error = false;
    this.year = "";
    this.bookError = false;
    this.draftName = "";
    this.busy = false;
  }

  static styles = [
    baseStyles,
    css`
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-bottom: 12px; }
      .tile { text-align: center; }
      .tile b { display: block; font-size: 1.3rem; font-weight: 500; }
      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; align-items: start; }
      .full { grid-column: 1 / -1; }
      .toolbar { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 8px; }
      .place { display: flex; justify-content: space-between; gap: 12px; width: 100%; text-align: left; border: none; border-radius: 6px; padding: 6px 4px; background: none; }
      .place:hover, .place:focus-visible { background: var(--secondary-background-color, rgba(128,128,128,0.12)); }
      .place small { display: block; color: var(--secondary-text-color); }
      .edit { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin: 8px 0; padding: 8px; border-radius: 8px; background: var(--secondary-background-color, rgba(128,128,128,0.12)); }
      .edit input { font: inherit; flex: 1; min-width: 10em; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }
      .hint { font-size: 0.8rem; margin: 6px 0 0; }
      .error { color: var(--error-color, #c62828); }
    `,
  ];

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("drone") || changed.has("battery")) {
      this.book = undefined;
      this.year = "";
      void this.load();
    }
  }

  private get api() {
    return new DroneLogApi(this.hass);
  }
  private get language() {
    return this.hass?.language ?? "en";
  }

  private async load() {
    const token = ++this.token;
    try {
      const logbook = await this.api.logbook(this.drone || undefined, this.battery || undefined);
      if (token === this.token) { this.logbook = logbook; this.error = false; }
    } catch {
      if (token === this.token) this.error = true;
    }
  }

  private async createBook() {
    this.busy = true;
    this.bookError = false;
    const year = this.year ? Number(this.year) : undefined;
    try {
      const data = await this.api.flightbook(this.drone || undefined, this.battery || undefined, year);
      this.book = { data, filterText: flightbookFilterText({ drone: this.drone ? this.droneLabel : undefined, battery: this.battery ? this.batteryLabel : undefined, year }, this.language) };
    } catch {
      this.bookError = true;
    } finally {
      this.busy = false;
    }
  }

  private async savePlace() {
    const place = this.editing;
    if (!place) return;
    try {
      const result = await this.api.placeNameSet(place.key, this.draftName.trim());
      const name = result.name || null;
      if (this.logbook) this.logbook = { ...this.logbook, places: this.logbook.places.map((p) => (p.key === place.key ? { ...p, name } : p)) };
      this.editing = undefined;
    } catch {
      this.error = true;
    }
  }

  private edit(place: PlaceStatDTO) {
    this.editing = place;
    this.draftName = place.name ?? "";
  }

  render() {
    const l = this.language;
    if (this.book) {
      return html`<dl-flightbook-view .book=${this.book.data} .filterText=${this.book.filterText} .lang=${l} @close=${() => (this.book = undefined)}></dl-flightbook-view>`;
    }
    if (this.error && !this.logbook) return html`<p class="muted">${t("error", l)}</p>`;
    const g = this.logbook;
    if (!g) return html`<p class="muted">${t("loading", l)}</p>`;
    const tags = Object.entries(g.tags).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return html`
      <div class="tiles">
        <div class="card tile"><span class="muted">${t("metric_flights", l)}</span><b>${g.flights}</b></div>
        <div class="card tile"><span class="muted">${t("metric_hours", l)}</span><b>${formatDuration(g.duration_s)}</b></div>
        <div class="card tile"><span class="muted">${t("distance", l)}</span><b>${formatDistance(g.distance_m, l)}</b></div>
      </div>
      <div class="cards">
        <div class="card full" id="flightbook-card">
          <h3>${t("flightbook", l)}</h3>
          <p class="muted hint">${t("flightbook_hint", l)}</p>
          <div class="toolbar">
            <label>${t("year", l)}
              <select name="year" @change=${(e: Event) => (this.year = (e.target as HTMLSelectElement).value)}>
                <option value="">${t("all_years", l)}</option>
                ${g.years.map((y) => html`<option value=${y.year} ?selected=${String(y.year) === this.year}>${y.year}</option>`)}
              </select>
            </label>
            <button class="primary" id="create-book" ?disabled=${this.busy} @click=${() => void this.createBook()}>${t("create_flightbook", l)}</button>
            ${this.bookError ? html`<span class="error" role="alert">${t("error", l)}</span>` : nothing}
          </div>
        </div>
        <div class="card" id="records-card">
          <h3>${t("records", l)}</h3>
          <div class="kv"><span>${t("longest_flight", l)}</span><b>${formatDuration(g.longest_flight_s)}</b></div>
          <div class="kv"><span>${t("farthest_flight", l)}</span><b>${formatDistance(g.farthest_flight_m, l)}</b></div>
          <div class="kv"><span>${t("highest_point", l)}</span><b>${formatHeight(g.highest_m, l)}</b></div>
          <div class="kv"><span>${t("fastest_speed", l)}</span><b>${formatSpeedKmh(g.fastest_ms, l)}</b></div>
        </div>
        ${g.years.length === 0 ? nothing : html`<div class="card" id="years-card">
          <h3>${t("years", l)}</h3>
          ${g.years.map((y) => html`<div class="kv"><span>${y.year}</span><b>${y.flights} · ${formatDuration(y.duration_s)} · ${formatDistance(y.distance_m, l)}</b></div>`)}
        </div>`}
        ${g.places.length === 0 ? nothing : html`<div class="card" id="places-card">
          <h3>${t("places", l)}</h3>
          ${g.places.slice(0, PLACES_SHOWN).map((p) => html`<button class="place" data-key=${p.key} @click=${() => this.edit(p)}>
            <span>${p.name ?? t("unnamed_place", l)}<small>${formatDecimal(p.lat, l, 3)}, ${formatDecimal(p.lon, l, 3)}</small></span>
            <b>${p.flights} · ${formatDuration(p.duration_s)}</b></button>`)}
          ${this.editing ? html`<form class="edit" @submit=${(e: Event) => { e.preventDefault(); void this.savePlace(); }}>
            <label for="place-name">${t("name_place", l)}</label>
            <input id="place-name" name="place_name" type="text" maxlength="100" .value=${this.draftName} placeholder=${t("place_name", l)} aria-describedby="place-hint"
              @input=${(e: Event) => (this.draftName = (e.target as HTMLInputElement).value)} />
            <button class="primary" type="submit">${t("save", l)}</button>
            <button type="button" @click=${() => (this.editing = undefined)}>${t("cancel", l)}</button>
            <span id="place-hint" class="muted hint">${t("place_name_hint", l)}</span>
          </form>` : nothing}
          <p class="muted hint">${t("places_hint", l)}</p>
        </div>`}
        ${tags.length === 0 ? nothing : html`<div class="card" id="tags-card">
          <h3>${t("tags", l)}</h3>
          ${tags.map(([tag, count]) => html`<div class="kv"><span>#${tag}</span><b>${count}</b></div>`)}
        </div>`}
      </div>`;
  }
}
customElements.define("dl-logbook-view", LogbookView);
