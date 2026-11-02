import { LitElement, css, html, unsafeCSS } from "lit";
import { DOC_CSS, SCREEN_PRINT_CSS, flightbookDoc, printDocument } from "./print-doc";
import { flightbookView } from "./report-logic";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { FlightbookDTO } from "./types";

/** Flugbuch als druckbare Tabelle; „Drucken“ öffnet den Druckdialog (A4, auch „Als PDF sichern“). */
export class FlightbookView extends LitElement {
  static properties = {
    book: { attribute: false },
    filterText: { type: String },
    lang: { type: String },
  };
  declare book: FlightbookDTO | undefined;
  declare filterText: string;
  declare lang: string;

  constructor() {
    super();
    this.filterText = "";
    this.lang = "de";
  }

  static styles = [
    baseStyles,
    unsafeCSS(DOC_CSS),
    unsafeCSS(SCREEN_PRINT_CSS),
    css`
      .bar { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
      .paper { overflow-x: auto; }
    `,
  ];

  private get content() {
    return flightbookDoc(flightbookView(this.book ?? { rows: [], summary: { flights: 0, duration_s: 0, distance_m: 0 } }, this.lang), this.filterText, this.lang);
  }

  private print() {
    printDocument(this.content, `${t("flightbook", this.lang)} ${this.filterText}`.trim());
  }

  render() {
    return html`
      <div class="bar">
        <button @click=${() => this.dispatchEvent(new CustomEvent("close"))}>← ${t("back", this.lang)}</button>
        <button class="primary" id="print" @click=${this.print}>${t("print", this.lang)}</button>
      </div>
      <div class="card paper">${this.content}</div>
    `;
  }
}
customElements.define("dl-flightbook-view", FlightbookView);
