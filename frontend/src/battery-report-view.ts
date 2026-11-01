import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { DroneLogApi } from "./api";
import { DOC_CSS, batteryReportDoc, printDocument } from "./print-doc";
import { assessmentView, reportCharts, reportContent } from "./report-logic";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { BatteryReportDTO, HassLike } from "./types";

/** Akku-Bericht eines Akkus (Kennzahlen, Verläufe, letzte Flüge, Gesamteinschätzung); druckbar auf A4. */
export class BatteryReportView extends LitElement {
  static properties = {
    hass: { attribute: false },
    serial: { type: String },
    report: { state: true },
    error: { state: true },
  };
  declare hass: HassLike;
  declare serial: string;
  declare report: BatteryReportDTO | undefined;
  declare error: boolean;
  private token = 0;

  constructor() {
    super();
    this.serial = "";
    this.error = false;
  }

  static styles = [
    baseStyles,
    unsafeCSS(DOC_CSS),
    css`
      .bar { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
      .paper { overflow-x: auto; }
    `,
  ];

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("serial") && this.serial) void this.load();
  }

  private get language() {
    return this.hass?.language ?? "en";
  }
  private get timeZone() {
    return this.hass?.config?.time_zone ?? "UTC";
  }

  private async load() {
    const token = ++this.token;
    this.report = undefined;
    this.error = false;
    try {
      const report = await new DroneLogApi(this.hass).batteryReport(this.serial);
      if (token === this.token) this.report = report;
    } catch {
      if (token === this.token) this.error = true;
    }
  }

  private content(r: BatteryReportDTO) {
    const l = this.language;
    return batteryReportDoc(reportContent(r, l, this.timeZone), reportCharts(r.history), assessmentView(r.assessment, l), l, this.timeZone);
  }

  render() {
    const l = this.language;
    const r = this.report;
    return html`
      <div class="bar">
        <button id="back" @click=${() => this.dispatchEvent(new CustomEvent("close"))}>← ${t("back", l)}</button>
        ${r ? html`<button class="primary" id="print" @click=${() => printDocument(this.content(r), reportContent(r, l, this.timeZone).title)}>${t("print", l)}</button>` : nothing}
      </div>
      ${this.error ? html`<p class="muted">${t("report_no_data", l)}</p>` : !r ? html`<p class="muted">${t("loading", l)}</p>` : html`<div class="card paper">${this.content(r)}</div>`}
    `;
  }
}
customElements.define("dl-battery-report", BatteryReportView);
