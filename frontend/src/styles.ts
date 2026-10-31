import { css } from "lit";

export const baseStyles = css`
  :host { display: block; color: var(--primary-text-color); font-family: var(--paper-font-body1_-_font-family, inherit); }
  .card { background: var(--card-background-color, #fff); border: 1px solid var(--divider-color, #ddd); border-radius: 12px; padding: 12px 16px; }
  .card h3 { margin: 0 0 8px; font-size: 1rem; font-weight: 500; }
  .kv { display: flex; justify-content: space-between; gap: 12px; padding: 2px 0; }
  .kv span { color: var(--secondary-text-color); }
  .muted { color: var(--secondary-text-color); }
  button { font: inherit; cursor: pointer; border: 1px solid var(--divider-color, #ccc); border-radius: 8px; background: var(--card-background-color, #fff); color: var(--primary-text-color); padding: 6px 12px; }
  button.primary { background: var(--primary-color); color: var(--text-primary-color, #fff); border-color: var(--primary-color); }
  select { font: inherit; padding: 6px; border-radius: 8px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }
`;
