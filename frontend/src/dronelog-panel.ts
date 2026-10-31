import { LitElement, css, html } from "lit";
import "./flights-view";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { HassLike } from "./types";

type Tab = "flights";

export class DroneLogPanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    panel: { attribute: false },
    tab: { state: true },
  };
  declare hass: HassLike;
  declare narrow: boolean;
  declare panel: { config?: { tile_url?: string } } | undefined;
  declare tab: Tab;

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
        <button role="tab" aria-selected=${this.tab === "flights"} @click=${() => (this.tab = "flights")}>${t("tab_flights", lang)}</button>
      </nav>
      <main>
        <dl-flights-view .hass=${this.hass} .narrow=${this.narrow} .tileUrl=${this.panel?.config?.tile_url ?? ""}></dl-flights-view>
      </main>
    `;
  }
}
customElements.define("dronelog-panel", DroneLogPanel);
