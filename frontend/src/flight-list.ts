import { LitElement, css, html } from "lit";
import { formatDateTime, formatDuration } from "./format";
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
        </li>`,
      )}
    </ul>`;
  }
}
customElements.define("dl-flight-list", FlightList);
