import { LitElement, css, html, nothing } from "lit";
import { DroneLogApi } from "./api";
import { debounce, parseTags, tagsToText } from "./report-logic";
import { t } from "./i18n";
import { baseStyles } from "./styles";
import type { HassLike } from "./types";

type Status = "" | "saving" | "saved" | "failed";

/** Notiz und Tags eines Flugs; Änderungen werden entprellt gespeichert. */
export class FlightNote extends LitElement {
  static properties = {
    hass: { attribute: false },
    flightId: { type: Number },
    text: { state: true },
    tags: { state: true },
    loaded: { state: true },
    status: { state: true },
  };
  declare hass: HassLike;
  declare flightId: number | undefined;
  declare text: string;
  declare tags: string;
  declare loaded: boolean;
  declare status: Status;
  private token = 0;
  private running = false;
  private latest: { id: number; text: string; tags: string } | undefined;
  private readonly onHide = () => this.saver.flush();
  private readonly saver = debounce((id: number, text: string, tags: string) => void this.save(id, text, tags), 600);

  constructor() {
    super();
    this.text = "";
    this.tags = "";
    this.loaded = false;
    this.status = "";
  }

  static styles = [
    baseStyles,
    css`
      textarea, input { font: inherit; width: 100%; box-sizing: border-box; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); margin-bottom: 8px; }
      textarea { resize: vertical; min-height: 3.2em; }
      .status { font-size: 0.8rem; min-height: 1.2em; }
      .failed { color: var(--error-color, #c62828); }
    `,
  ];

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has("flightId")) {
      this.saver.flush();  // eine noch ausstehende Änderung gehört zum vorherigen Flug
      void this.load();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("pagehide", this.onHide);  // Seite wird verlassen: ausstehende Änderung noch senden
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("pagehide", this.onHide);
    this.saver.flush();
  }

  private async load() {
    const token = ++this.token;
    this.loaded = false;
    this.status = "";
    this.text = "";
    this.tags = "";
    if (this.flightId === undefined) return;
    try {
      const note = await new DroneLogApi(this.hass).noteGet(this.flightId);
      if (token !== this.token) return;
      this.text = note.text ?? "";
      this.tags = tagsToText(note.tags ?? []);
      this.loaded = true;
    } catch {
      if (token === this.token) this.status = "failed";
    }
  }

  /** Speichert nacheinander: läuft eine Anfrage, wird nur der neueste Stand danach gesendet (Reihenfolge bleibt erhalten). */
  private async save(id: number, text: string, tags: string) {
    this.latest = { id, text, tags };
    if (this.running) return;
    this.running = true;
    try {
      while (this.latest) {
        const job = this.latest;
        this.latest = undefined;
        this.status = "saving";
        try {
          await new DroneLogApi(this.hass).noteSet(job.id, job.text, parseTags(job.tags));
          if (!this.latest && this.flightId === job.id) this.status = "saved";
        } catch {
          this.status = "failed";
        }
      }
    } finally {
      this.running = false;
    }
  }

  private edit(field: "text" | "tags", value: string) {
    if (!this.loaded || this.flightId === undefined) return;
    this[field] = value;
    this.status = "";
    this.saver.call(this.flightId, this.text, this.tags);
  }

  render() {
    const l = this.hass?.language ?? "en";
    const statusText = this.status === "saving" ? t("note_saving", l) : this.status === "saved" ? t("note_saved", l) : this.status === "failed" ? t(this.loaded ? "note_failed" : "error", l) : "";
    return html`
      <textarea rows="3" aria-label=${t("note", l)} placeholder=${t("note_placeholder", l)} maxlength="2000" .value=${this.text} ?disabled=${!this.loaded}
        @input=${(e: Event) => this.edit("text", (e.target as HTMLTextAreaElement).value)}></textarea>
      <input type="text" aria-label=${t("tags", l)} placeholder=${t("tags_placeholder", l)} .value=${this.tags} ?disabled=${!this.loaded}
        @input=${(e: Event) => this.edit("tags", (e.target as HTMLInputElement).value)} />
      <div class="status muted ${this.status === "failed" ? "failed" : ""}" role="status" aria-live="polite">${statusText}
        ${!this.loaded && this.status === "failed" && this.flightId !== undefined ? html`<button id="retry" type="button" @click=${() => void this.load()}>${t("retry", l)}</button>` : nothing}
      </div>
    `;
  }
}
customElements.define("dl-flight-note", FlightNote);
