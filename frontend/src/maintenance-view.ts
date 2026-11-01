import { LitElement, css, html, nothing } from "lit";
import { DroneLogApi } from "./api";
import {
  FLIGHTS_RANGE, HOURS_RANGE, debounce, draftFromRow, maintenanceBars, maintenanceColor, maintenanceLevelText, payloadChanged, planPayload, type PlanDraft,
} from "./report-logic";
import { t, tf } from "./i18n";
import { baseStyles } from "./styles";
import type { HassLike, MaintenanceRowDTO } from "./types";

type Status = "" | "saved" | "failed";

/** Wartungsplan einer Drohne: Schalter und Eingabe je Intervall (entprellt gespeichert), Fortschrittsbalken, „Wartung erledigt“. */
export class MaintenanceCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    row: { attribute: false },
    draft: { state: true },
    status: { state: true },
  };
  declare hass: HassLike;
  declare row: MaintenanceRowDTO;
  declare draft: PlanDraft;
  declare status: Status;
  private initialised = false;
  private readonly saver = debounce(() => void this.commit(), 500);

  constructor() {
    super();
    this.status = "";
  }

  static styles = [
    baseStyles,
    css`
      :host { display: block; }
      .head { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 8px; }
      .head h3 { margin: 0; }
      .badge { font-size: 0.8rem; font-weight: 600; }
      .progress { margin: 6px 0 10px; }
      .progress .line { display: flex; justify-content: space-between; font-size: 0.85rem; gap: 8px; }
      .track { height: 8px; border-radius: 4px; background: var(--divider-color, #ddd); overflow: hidden; margin-top: 3px; }
      .fill { height: 100%; border-radius: 4px; }
      .plan { display: flex; align-items: center; gap: 8px; margin: 6px 0; flex-wrap: wrap; }
      .plan label { display: flex; align-items: center; gap: 6px; min-width: 11em; }
      input[type="number"] { font: inherit; width: 5.5em; padding: 4px 6px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }
      .foot { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
      .status { font-size: 0.8rem; }
      .failed { color: var(--error-color, #c62828); }
    `,
  ];

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("row") && this.row && !this.initialised) {
      this.draft = draftFromRow(this.row);
      this.initialised = true;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.saver.flush();
  }

  private get language() {
    return this.hass?.language ?? "en";
  }

  private patch(change: Partial<PlanDraft>) {
    this.draft = { ...this.draft, ...change };
    this.status = "";
    this.saver.call();
  }

  private async commit() {
    const payload = planPayload(this.draft);
    if (!payload.hours && !payload.flights && !this.row.plan) return;
    if (!payloadChanged(payload, this.row)) return;
    try {
      this.row = await new DroneLogApi(this.hass).maintenanceSet(this.row.serial, payload.hours, payload.flights);
      this.status = "saved";
    } catch {
      this.status = "failed";
    }
  }

  private async serviced() {
    this.saver.flush();
    try {
      this.row = await new DroneLogApi(this.hass).maintenanceServiced(this.row.serial);
      this.status = "saved";
    } catch {
      this.status = "failed";
    }
  }

  private number(value: number, range: { min: number; max: number }, set: (n: number) => void, label: string, step = 1) {
    return html`<input type="number" min=${range.min} max=${range.max} step=${step} .value=${String(value)} aria-label=${label}
      @input=${(e: Event) => { const n = (e.target as HTMLInputElement).valueAsNumber; if (Number.isFinite(n)) set(n); }} />`;
  }

  render() {
    if (!this.row || !this.draft) return nothing;
    const l = this.language;
    const level = this.row.status?.level ?? "ok";
    const bars = maintenanceBars(this.row, l);
    return html`<div class="card">
      <div class="head">
        <h3>${this.row.name}</h3>
        ${level !== "ok" ? html`<span class="badge" style="color:${maintenanceColor[level]}">${level === "due" ? "✖" : "▲"} ${maintenanceLevelText(level, l)}</span>` : nothing}
      </div>
      ${bars.map((b) => html`<div class="progress">
        <div class="line"><span>${b.title}</span><span>${b.value}</span></div>
        <div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${b.percent} aria-label=${b.title}
          aria-valuetext=${tf("progress_aria", l, { title: `${b.value} (${maintenanceLevelText(b.level, l)})`, value: `${b.percent} %` })} data-level=${b.level}>
          <div class="fill" style="width:${b.percent}%;background:${b.color}"></div>
        </div>
      </div>`)}
      <div class="plan">
        <label><input type="checkbox" name="hours_on" .checked=${this.draft.hoursOn} @change=${(e: Event) => this.patch({ hoursOn: (e.target as HTMLInputElement).checked })} /> ${t("maint_by_hours", l)}</label>
        ${this.draft.hoursOn ? this.number(this.draft.hours, HOURS_RANGE, (hours) => this.patch({ hours }), t("maint_interval_hours", l)) : nothing}
      </div>
      <div class="plan">
        <label><input type="checkbox" name="flights_on" .checked=${this.draft.flightsOn} @change=${(e: Event) => this.patch({ flightsOn: (e.target as HTMLInputElement).checked })} /> ${t("maint_by_flights", l)}</label>
        ${this.draft.flightsOn ? this.number(this.draft.flights, FLIGHTS_RANGE, (flights) => this.patch({ flights }), t("maint_interval_flights", l)) : nothing}
      </div>
      <div class="foot">
        ${this.row.plan ? html`<button id="serviced" @click=${() => void this.serviced()}>${t("maint_serviced", l)}</button>` : nothing}
        <span class="status muted ${this.status === "failed" ? "failed" : ""}" role="status" aria-live="polite">${this.status === "saved" ? t("maint_saved", l) : this.status === "failed" ? t("maint_save_failed", l) : ""}</span>
      </div>
    </div>`;
  }
}
customElements.define("dl-maintenance-card", MaintenanceCard);

export class MaintenanceView extends LitElement {
  static properties = {
    hass: { attribute: false },
    rows: { state: true },
    error: { state: true },
    loaded: { state: true },
  };
  declare hass: HassLike;
  declare rows: MaintenanceRowDTO[];
  declare error: boolean;
  declare loaded: boolean;

  constructor() {
    super();
    this.rows = [];
    this.error = false;
    this.loaded = false;
  }

  static styles = [baseStyles, css`.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; margin-top: 12px; }`];

  connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  private async load() {
    try {
      this.rows = await new DroneLogApi(this.hass).maintenance();
      this.error = false;
    } catch {
      this.error = true;
    }
    this.loaded = true;
  }

  render() {
    const l = this.hass?.language ?? "en";
    if (this.error) return html`<p class="muted">${t("error", l)}</p>`;
    return html`<p class="muted">${t("maint_hint", l)}</p>
      ${this.loaded && this.rows.length === 0 ? html`<p class="muted">${t("maint_no_drones", l)}</p>` : nothing}
      <div class="cards">${this.rows.map((r) => html`<dl-maintenance-card .hass=${this.hass} .row=${r}></dl-maintenance-card>`)}</div>`;
  }
}
customElements.define("dl-maintenance-view", MaintenanceView);
