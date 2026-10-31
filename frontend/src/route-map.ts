import L from "leaflet";
import leafletCss from "leaflet/dist/leaflet.css?inline";
import { LitElement, css, html, unsafeCSS } from "lit";
import { heightColor } from "./colors";
import { t } from "./i18n";
import { buildSegments, heightRange } from "./route-segments";
import { baseStyles } from "./styles";
import type { LatLonDTO, Point } from "./types";

export class RouteMap extends LitElement {
  static properties = {
    points: { attribute: false },
    start: { attribute: false },
    end: { attribute: false },
    tileUrl: { type: String },
    lang: { type: String },
  };
  declare points: Point[];
  declare start: LatLonDTO | null;
  declare end: LatLonDTO | null;
  declare tileUrl: string;
  declare lang: string;
  map?: L.Map;
  private layer?: L.LayerGroup;
  private resizeObserver?: ResizeObserver;

  constructor() {
    super();
    this.points = [];
    this.start = null;
    this.end = null;
    this.tileUrl = "";
    this.lang = "de";
  }

  static styles = [
    unsafeCSS(leafletCss),
    baseStyles,
    css`
      .map { height: 340px; border-radius: 12px; border: 1px solid var(--divider-color, #ddd); z-index: 0; }
      .legend { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; margin-top: 6px; color: var(--secondary-text-color); }
      .legend .bar { flex: 1; height: 8px; border-radius: 4px; max-width: 220px; }
    `,
  ];

  private get hasPosition() {
    return this.start !== null || this.end !== null || this.points.some((p) => p.lat !== null && p.lon !== null);
  }

  render() {
    if (!this.hasPosition) return html`<p class="muted">${t("no_position", this.lang)}</p>`;
    const { min, max } = heightRange(this.points);
    const gradient = `linear-gradient(to right, ${heightColor(min, min, max)}, ${heightColor((min + max) / 2, min, max)}, ${heightColor(max, min, max)})`;
    return html`<div class="map"></div>
      <div class="legend"><span>${Math.round(min)} m</span><div class="bar" style="background:${gradient}"></div><span>${Math.round(max)} m</span></div>`;
  }

  updated() {
    if (!this.hasPosition) {
      this.destroyMap();
      return;
    }
    const container = this.renderRoot.querySelector(".map") as HTMLElement | null;
    if (!container) return;
    if (!this.map) this.createMap(container);
    this.draw();
  }

  private createMap(container: HTMLElement) {
    this.map = L.map(container, { zoomControl: true, attributionControl: true }).setView([0, 0], 2);
    if (this.tileUrl) {
      L.tileLayer(this.tileUrl, { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(this.map);
    }
    this.layer = L.layerGroup().addTo(this.map);
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.map?.invalidateSize());
      this.resizeObserver.observe(container);
    }
  }

  private draw() {
    if (!this.map || !this.layer) return;
    this.layer.clearLayers();
    const { min, max } = heightRange(this.points);
    const bounds: L.LatLngTuple[] = [];
    for (const s of buildSegments(this.points, min, max)) {
      L.polyline([s.from, s.to], { color: s.color, weight: 4 }).addTo(this.layer);
      bounds.push(s.from, s.to);
    }
    if (this.start) L.circleMarker([this.start.lat, this.start.lon], { radius: 7, color: "#fff", weight: 2, fillColor: "#2e7d32", fillOpacity: 1 }).addTo(this.layer);
    if (this.end) L.circleMarker([this.end.lat, this.end.lon], { radius: 7, color: "#fff", weight: 2, fillColor: "#c62828", fillOpacity: 1 }).addTo(this.layer);
    if (this.start) bounds.push([this.start.lat, this.start.lon]);
    if (this.end) bounds.push([this.end.lat, this.end.lon]);
    for (const p of this.points) if (p.lat !== null && p.lon !== null) bounds.push([p.lat, p.lon]);
    if (bounds.length === 0) return;
    const area = L.latLngBounds(bounds);
    // Ein einzelner Punkt (oder Start = Landung) ergibt keine Fläche: dann nah heranzoomen statt Weltkarte
    if (area.getNorthEast().equals(area.getSouthWest())) this.map.setView(area.getCenter(), 16);
    else this.map.fitBounds(area, { padding: [20, 20] });
  }

  private destroyMap() {
    this.resizeObserver?.disconnect();
    this.map?.remove();
    this.map = undefined;
    this.layer = undefined;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.destroyMap();
  }
}
customElements.define("dl-route-map", RouteMap);
