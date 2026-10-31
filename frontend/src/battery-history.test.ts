import { beforeEach, describe, expect, it, vi } from "vitest";
import "./battery-history";
import { makeBattery } from "./fixtures";

type El = HTMLElement & { hass: unknown; rebuilds: number; updateComplete: Promise<boolean> };

async function mount() {
  const hass = { language: "de", callWS: vi.fn(async () => ({ batteries: [makeBattery()] })) };
  const el = document.createElement("dl-battery-history") as El;
  el.hass = hass;
  document.body.appendChild(el);
  for (let i = 0; i < 6; i++) { await new Promise((r) => setTimeout(r, 0)); await el.updateComplete; }
  return { el, hass };
}

beforeEach(() => { document.body.innerHTML = ""; });

describe("battery-history", () => {
  it("does not rebuild the chart when Home Assistant sets a new hass object", async () => {
    const { el, hass } = await mount();
    const before = el.rebuilds;
    for (let i = 0; i < 3; i++) {
      el.hass = { ...hass };
      await el.updateComplete;
    }
    expect(el.rebuilds).toBe(before);
    expect(hass.callWS).toHaveBeenCalledTimes(1);
  });

  it("rebuilds when the metric changes", async () => {
    const { el } = await mount();
    const before = el.rebuilds;
    (el.shadowRoot!.querySelector("button[data-metric=cycles]") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.rebuilds).toBe(before + 1);
  });
});
