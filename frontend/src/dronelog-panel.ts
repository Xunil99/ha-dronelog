import { LitElement, css, html } from "lit";
import "./flights-view";
import "./analysis-view";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { HassLike } from "./types";

type Tab = "flights" | "stats";

export class DroneLogPanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    panel: { attribute: false },
    tab: { state: true },
    jumpId: { state: true },
    reportSerial: { state: true },
  };
  declare hass: HassLike;
  declare narrow: boolean;
  declare panel: { config?: { tile_url?: string } } | undefined;
  declare tab: Tab;
  declare jumpId: number | undefined;
  declare reportSerial: string | undefined;

  constructor() {
    super();
    this.narrow = false;
    this.tab = "flights";
  }

  static styles = [
    baseStyles,
    css`
      :host { display: block; min-height: 100vh; background: var(--primary-background-color); }
      header { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); }
      header h1 { margin: 0; font-size: 1.25rem; font-weight: 400; flex: 1; }
      header button { background: transparent; border: none; color: inherit; font-size: 1.4rem; padding: 4px 8px; }
      nav { display: flex; gap: 4px; padding: 8px 16px 0; border-bottom: 1px solid var(--divider-color, #ddd); }
      nav button { border: none; border-bottom: 3px solid transparent; border-radius: 0; background: none; padding: 8px 14px; }
      nav button[aria-selected="true"] { border-bottom-color: var(--primary-color); font-weight: 500; }
      main { padding: 16px; max-width: 1400px; margin: 0 auto; }
    `,
  ];

  private show(tab: Tab) {
    this.jumpId = undefined;
    this.reportSerial = undefined;
    this.tab = tab;
  }

  private onOpenFlight(event: Event) {
    this.jumpId = (event as CustomEvent<number>).detail;
    this.tab = "flights";
  }

  /** Aus Flugdetail oder Akku-Auswertung: Akku-Bericht im Reiter „Auswertung“ öffnen. */
  private onOpenReport(event: Event) {
    this.reportSerial = (event as CustomEvent<string>).detail;
    this.tab = "stats";
  }

  private toggleMenu() {
    this.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  render() {
    const lang = this.hass?.language ?? "en";
    return html`
      <header>
        ${this.narrow ? html`<button aria-label="Menu" @click=${this.toggleMenu}>☰</button>` : ""}
        <h1>${t("title", lang)}</h1>
      </header>
      <nav role="tablist">
        <button role="tab" aria-selected=${this.tab === "flights"} @click=${() => this.show("flights")}>${t("tab_flights", lang)}</button>
        <button role="tab" aria-selected=${this.tab === "stats"} @click=${() => this.show("stats")}>${t("tab_stats", lang)}</button>
      </nav>
      <main @open-flight=${this.onOpenFlight} @open-battery-report=${this.onOpenReport}>
        ${this.tab === "flights"
          ? html`<dl-flights-view .hass=${this.hass} .narrow=${this.narrow} .tileUrl=${this.panel?.config?.tile_url ?? ""} .initialId=${this.jumpId}></dl-flights-view>`
          : html`<dl-analysis-view .hass=${this.hass} .tileUrl=${this.panel?.config?.tile_url ?? ""} .openReport=${this.reportSerial}></dl-analysis-view>`}
      </main>
    `;
  }
}
customElements.define("dronelog-panel", DroneLogPanel);
