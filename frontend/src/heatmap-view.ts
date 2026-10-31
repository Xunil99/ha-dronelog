import L from "leaflet";
import leafletCss from "leaflet/dist/leaflet.css?inline";
import "leaflet.heat";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { DroneLogApi } from "./api";
import { canvasSupported } from "./canvas";
import { formatDateTime, formatDuration } from "./format";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { FlightSummary, HassLike, HeatCellDTO } from "./types";

export class HeatmapView extends LitElement {
  static properties = {
    hass: { attribute: false },
    tileUrl: { type: String },
    cells: { state: true },
    precision: { state: true },
    flights: { state: true },
    loaded: { state: true },
  };
  declare hass: HassLike;
  declare tileUrl: string;
  declare cells: HeatCellDTO[];
  declare precision: number;
  declare flights: FlightSummary[];
  declare loaded: boolean;
  private map?: L.Map;
  private heat?: L.Layer;

  constructor() {
    super();
    this.tileUrl = "";
    this.cells = [];
    this.precision = 300;
    this.flights = [];
    this.loaded = false;
  }

  static styles = [
    unsafeCSS(leafletCss),
    baseStyles,
    css`
      .map { height: 360px; border-radius: 12px; border: 1px solid var(--divider-color, #ddd); z-index: 0; }
      .toolbar { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
      ul { list-style: none; margin: 8px 0 0; padding: 0; }
      li { padding: 6px 10px; border-radius: 8px; cursor: pointer; }
      li:hover { background: var(--secondary-background-color, #f3f3f3); }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  private get language() {
    return this.hass?.language ?? "en";
  }

  private async load() {
    try {
      this.cells = (await new DroneLogApi(this.hass).heatmap(this.precision)).cells;
    } catch {
      this.cells = [];
    }
    this.loaded = true;
  }

  private onPrecision(event: Event) {
    this.precision = Number((event.target as HTMLSelectElement).value);
    this.flights = [];
    void this.load();
  }

  async handleCellClick(lat: number, lon: number) {
    this.flights = await new DroneLogApi(this.hass).cellFlights(lat, lon, this.precision);
  }

  private open(id: number) {
    this.dispatchEvent(new CustomEvent("open-flight", { detail: id, bubbles: true, composed: true }));
  }

  render() {
    const l = this.language;
    if (this.loaded && this.cells.length === 0) return html`<div class="card"><h3>${t("heatmap", l)}</h3><p class="muted">${t("no_position", l)}</p></div>`;
    return html`<div class="card">
      <h3>${t("heatmap", l)}</h3>
      <div class="toolbar">
        <select name="precision" @change=${this.onPrecision}>
          <option value="300" ?selected=${this.precision === 300}>300 m</option>
          <option value="1000" ?selected=${this.precision === 1000}>1 km</option>
        </select>
        <span class="muted">${t("heatmap_hint", l)}</span>
      </div>
      <div class="map"></div>
      ${this.flights.length
        ? html`<ul>${this.flights.map((f) => html`<li @click=${() => this.open(f.id)}>${formatDateTime(f.start, this.hass?.config?.time_zone ?? "UTC", l)} · ${formatDuration(f.duration_s)} · ${f.drone_model}</li>`)}</ul>`
        : nothing}
    </div>`;
  }

  updated() {
    const container = this.renderRoot.querySelector(".map") as HTMLElement | null;
    if (!container || this.cells.length === 0) return;
    if (!this.map) {
      this.map = L.map(container).setView([0, 0], 2);
      if (this.tileUrl) L.tileLayer(this.tileUrl, { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(this.map);
      this.map.on("click", (event: L.LeafletMouseEvent) => void this.handleCellClick(event.latlng.lat, event.latlng.lng));
    }
    if (this.heat) this.map.removeLayer(this.heat);
    if (!canvasSupported()) return;
    const peak = Math.max(...this.cells.map((c) => c.count));
    this.heat = L.heatLayer(this.cells.map((c) => [c.lat, c.lon, c.count / peak]), { radius: 32, blur: 20, maxZoom: 14, minOpacity: 0.45 }).addTo(this.map);
    this.map.fitBounds(L.latLngBounds(this.cells.map((c) => [c.lat, c.lon] as L.LatLngTuple)), { padding: [30, 30], maxZoom: 14 });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.map?.remove();
    this.map = undefined;
  }
}
customElements.define("dl-heatmap-view", HeatmapView);
