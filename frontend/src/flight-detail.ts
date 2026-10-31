import { LitElement, css, html, nothing } from "lit";
import { compass, dash, formatDateTime, formatDistance, formatDuration, formatHeight, formatPercent, formatSpeedKmh, formatWind } from "./format";
import { t } from "./i18n";
import "./flight-charts";
import "./route-map";
import { baseStyles } from "./styles";
import type { FlightDetailDTO } from "./types";

export class FlightDetail extends LitElement {
  static properties = {
    detail: { attribute: false },
    lang: { type: String },
    timeZone: { type: String },
    tileUrl: { type: String },
    dark: { type: Boolean },
  };
  declare detail: FlightDetailDTO | undefined;
  declare lang: string;
  declare timeZone: string;
  declare tileUrl: string;
  declare dark: boolean;

  constructor() {
    super();
    this.lang = "de";
    this.timeZone = "UTC";
    this.tileUrl = "";
    this.dark = false;
  }

  static styles = [
    baseStyles,
    css`
      :host { display: block; }
      .head h2 { margin: 0 0 2px; font-size: 1.2rem; font-weight: 500; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin: 12px 0; }
      .tile { text-align: center; padding: 8px; }
      .tile b { display: block; font-size: 1.25rem; font-weight: 500; }
      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 12px; }
    `,
  ];

  render() {
    const d = this.detail;
    if (!d) return html`<p class="muted">${t("select_flight", this.lang)}</p>`;
    const { summary: s, battery: b, weather: w } = d;
    const l = this.lang;
    return html`
      <div class="head">
        <h2>${formatDateTime(s.start, this.timeZone, l)}</h2>
        <div class="muted">${s.drone_model} · …${s.drone_suffix} · ${t("battery", l)} …${s.battery_suffix} · ${d.source_name}</div>
      </div>
      <div class="tiles">
        ${this.tile(t("duration", l), formatDuration(s.duration_s))}
        ${this.tile(t("distance", l), formatDistance(s.distance_m, l))}
        ${this.tile(t("max_height", l), formatHeight(s.max_height_m, l))}
        ${this.tile(t("max_speed", l), formatSpeedKmh(s.max_speed_ms, l))}
      </div>
      <div class="cards">
        <div class="card">
          <h3>${t("battery", l)}</h3>
          ${this.row(t("charge", l), `${formatPercent(b.charge_start)} → ${formatPercent(b.charge_end)}`)}
          ${this.row(t("power_avg", l), `${Math.round(b.avg_power_w)} W`)}
          ${this.row(t("power_peak", l), `${Math.round(b.peak_power_w)} W`)}
          ${this.row(t("cell_deviation", l), `${Math.round(b.cell_deviation_max_v * 1000)} mV`)}
          ${this.row(t("temperature", l), `${Math.round(b.temp_min_c)} … ${Math.round(b.temp_max_c)} °C`)}
          ${this.row(t("cycles", l), b.cycles === null ? dash : String(b.cycles))}
          ${this.row(t("health", l), formatPercent(b.health_pct))}
        </div>
        <div class="card">
          <h3>${t("weather", l)}</h3>
          ${w
            ? html`${this.row(t("temperature", l), `${w.temperature_c.toLocaleString(l)} °C`)}
              ${this.row(t("wind", l), `${formatWind(w.wind_10m_ms, l)} (${compass(w.wind_dir_deg, l)} ${Math.round(w.wind_dir_deg)}°)`)}
              ${w.wind_80m_ms === null ? nothing : this.row(`${t("wind", l)} 80 m`, formatWind(w.wind_80m_ms, l))}
              ${this.row(t("gusts", l), formatWind(w.gust_ms, l))}
              ${this.row(t("precipitation", l), `${w.precipitation_mm.toLocaleString(l)} mm`)}
              ${this.row(t("clouds", l), formatPercent(w.cloud_cover_pct))}
              ${this.row(t("source", l), w.source)}`
            : html`<p class="muted">${t("no_weather", l)}</p>`}
        </div>
      </div>
      <dl-route-map .points=${d.points} .start=${d.start} .end=${d.end} .tileUrl=${this.tileUrl} .lang=${l}></dl-route-map>
      <dl-flight-charts .points=${d.points} .lang=${l} .dark=${this.dark}></dl-flight-charts>
      <slot></slot>
    `;
  }

  private tile(label: string, value: string) {
    return html`<div class="card tile"><span class="muted">${label}</span><b>${value}</b></div>`;
  }

  private row(label: string, value: string) {
    return html`<div class="kv"><span>${label}</span><b>${value}</b></div>`;
  }
}
customElements.define("dl-flight-detail", FlightDetail);
