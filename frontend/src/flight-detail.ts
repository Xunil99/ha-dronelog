import { LitElement, css, html, nothing } from "lit";
import { compass, formatDateTime, formatDistance, formatDuration, formatHeight, formatPercent, formatSpeedKmh, formatWind } from "./format";
import { batteryRows, cameraRows, energyRows, eventRows, phaseRows, signalRows, windHintRow, type Row } from "./flight-logic";
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
      .event { display: flex; align-items: center; gap: 10px; padding: 3px 0; --mdc-icon-size: 20px; }
      .event .text { flex: 1; }
      .event .time { font-variant-numeric: tabular-nums; color: var(--secondary-text-color); }
      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 12px; }
    `,
  ];

  render() {
    const d = this.detail;
    if (!d) return html`<p class="muted">${t("select_flight", this.lang)}</p>`;
    const { summary: s, battery: b } = d;
    const l = this.lang;
    const wind = windHintRow(d.analysis?.hover_wind, l);
    const events = eventRows(d.extras, l);
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
        <div class="card" id="battery-card">
          <h3>${t("battery", l)}</h3>
          ${!b ? html`<p class="muted">${t("no_battery", l)}</p>` : batteryRows(b, d.analysis?.cell_level, l).map((r) => this.row(r.label, r.value))}
        </div>
        <div class="card" id="weather-card">
          <h3>${t("weather", l)}</h3>
          ${this.weatherRows(d, wind)}
        </div>
        ${this.rowsCard("energy-card", t("energy_card", l), energyRows(d.extras, l))}
        ${this.rowsCard("signal-card", t("signal_card", l), signalRows(d.extras, l))}
        ${this.rowsCard("camera-card", t("camera_card", l), cameraRows(d.extras, l))}
        ${this.rowsCard("phases-card", t("phases", l), phaseRows(d.analysis?.phases, l))}
        <div class="card" id="events-card">
          <h3>${t("events", l)}</h3>
          ${events.length === 0
            ? html`<p class="muted">${d.extras ? t("events_none", l) : t("events_missing", l)}</p>`
            : events.map((e) => html`<div class="event" data-severity=${e.severity}>
                <ha-icon icon=${e.icon} style="color:${e.color}"></ha-icon><span class="text">${e.text}</span><span class="time">${e.timeText}</span>
              </div>`)}
        </div>
      </div>
      <dl-route-map .points=${d.points} .start=${d.start} .end=${d.end} .events=${d.extras?.events ?? []} .tileUrl=${this.tileUrl} .lang=${l}></dl-route-map>
      <dl-flight-charts .points=${d.points} .events=${d.extras?.events ?? []} .modeSegments=${d.analysis?.mode_segments ?? []} .lang=${l} .dark=${this.dark}></dl-flight-charts>
      <slot></slot>
    `;
  }

  private weatherRows(d: FlightDetailDTO, wind: Row | null) {
    const l = this.lang;
    const w = d.weather;
    if (!w) return wind ? this.row(wind.label, wind.value) : html`<p class="muted">${t("no_weather", l)}</p>`;
    return html`${this.row(t("temperature", l), `${w.temperature_c.toLocaleString(l)} °C`)}
      ${this.row(t("wind", l), `${formatWind(w.wind_10m_ms, l)} (${compass(w.wind_dir_deg, l)} ${Math.round(w.wind_dir_deg)}°)`)}
      ${w.wind_80m_ms === null ? nothing : this.row(`${t("wind", l)} 80 m`, formatWind(w.wind_80m_ms, l))}
      ${this.row(t("gusts", l), formatWind(w.gust_ms, l))}
      ${this.row(t("precipitation", l), `${w.precipitation_mm.toLocaleString(l)} mm`)}
      ${this.row(t("clouds", l), formatPercent(w.cloud_cover_pct))}
      ${wind ? this.row(wind.label, wind.value) : nothing}
      ${this.row(t("source", l), w.source)}`;
  }

  private rowsCard(id: string, title: string, rows: Row[]) {
    if (rows.length === 0) return nothing;
    return html`<div class="card" id=${id}><h3>${title}</h3>${rows.map((r) => this.row(r.label, r.value))}</div>`;
  }

  private tile(label: string, value: string) {
    return html`<div class="card tile"><span class="muted">${label}</span><b>${value}</b></div>`;
  }

  private row(label: string, value: string) {
    return html`<div class="kv"><span>${label}</span><b>${value}</b></div>`;
  }
}
customElements.define("dl-flight-detail", FlightDetail);
