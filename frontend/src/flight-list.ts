import { LitElement, css, html, nothing } from "lit";
import { t } from "./i18n";
import { formatDateTime, formatDuration } from "./format";
import { eventInfo, eventTitle, flightBadges } from "./flight-logic";
import { baseStyles } from "./styles";
import type { FlightSummary } from "./types";

export class FlightList extends LitElement {
  static properties = {
    flights: { attribute: false },
    selectedId: { type: Number },
    lang: { type: String },
    timeZone: { type: String },
  };
  declare flights: FlightSummary[];
  declare selectedId: number | undefined;
  declare lang: string;
  declare timeZone: string;

  constructor() {
    super();
    this.flights = [];
    this.lang = "de";
    this.timeZone = "UTC";
  }

  static styles = [
    baseStyles,
    css`
      ul { list-style: none; margin: 0; padding: 0; }
      li { padding: 8px 12px; border-radius: 8px; cursor: pointer; outline: none; }
      li:hover, li:focus-visible { background: var(--secondary-background-color, #f3f3f3); }
      li.selected { background: var(--primary-color); color: var(--text-primary-color, #fff); }
      li .sub { font-size: 0.85rem; opacity: 0.8; }
      .badges { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 2px; font-size: 0.8rem; }
      .badge { display: inline-flex; align-items: center; gap: 2px; --mdc-icon-size: 16px; }
      .badge.event { background: var(--card-background-color, #fff); border-radius: 50%; padding: 2px; }
    `,
  ];

  private select(id: number) {
    this.dispatchEvent(new CustomEvent("select", { detail: id }));
  }

  private onKey(event: KeyboardEvent, index: number) {
    const target = event.key === "ArrowDown" ? index + 1 : event.key === "ArrowUp" ? index - 1 : event.key === "Enter" ? index : -1;
    const flight = this.flights[target];
    if (!flight) return;
    event.preventDefault();
    this.select(flight.id);
    if (event.key !== "Enter") (this.renderRoot.querySelectorAll("li")[target] as HTMLElement)?.focus();
  }

  private badges(f: FlightSummary) {
    const b = flightBadges(f);
    if (b.empty) return nothing;
    return html`<div class="badges">
      ${b.kinds.map((kind) => {
        const info = eventInfo(kind);
        const title = eventTitle(kind, this.lang);
        return html`<span class="badge event" data-kind=${kind} data-severity=${info.severity} title=${title} aria-label=${title}><ha-icon icon=${info.icon} style="color:${info.color}"></ha-icon></span>`;
      })}
      ${b.photos > 0 ? html`<span class="badge" data-badge="photos" title=${t("photos", this.lang)}><ha-icon icon="mdi:camera"></ha-icon>${b.photos}</span>` : nothing}
      ${b.videoS > 0 ? html`<span class="badge" data-badge="video" title=${t("video", this.lang)}><ha-icon icon="mdi:video"></ha-icon>${formatDuration(b.videoS)}</span>` : nothing}
    </div>`;
  }

  render() {
    return html`<ul role="listbox">
      ${this.flights.map(
        (f, index) => html`<li
          role="option"
          tabindex="0"
          aria-selected=${f.id === this.selectedId}
          class=${f.id === this.selectedId ? "selected" : ""}
          @click=${() => this.select(f.id)}
          @keydown=${(e: KeyboardEvent) => this.onKey(e, index)}
        >
          <div>${formatDateTime(f.start, this.timeZone, this.lang)}</div>
          <div class="sub">${formatDuration(f.duration_s)} · ${f.drone_model} · …${f.battery_suffix}</div>
          ${this.badges(f)}
        </li>`,
      )}
    </ul>`;
  }
}
customElements.define("dl-flight-list", FlightList);
