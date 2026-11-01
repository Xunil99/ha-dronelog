import { beforeEach, describe, expect, it, vi } from "vitest";
import "./battery-history";
import { makeBattery } from "./fixtures";

type El = HTMLElement & { hass: unknown; rebuilds: number; drone?: string; battery?: string; updateComplete: Promise<boolean> };

const TWO = [makeBattery({ serial: "B1", suffix: "AAA1", flights: 3 }), makeBattery({ serial: "B2", suffix: "BBB2", flights: 5 })];

async function mount(props: Partial<El> = {}, batteries = TWO) {
  const hass = { language: "de", callWS: vi.fn(async (m: Record<string, unknown>) => ({ batteries: batteries.filter(() => true) , _asked: m })) };
  const el = document.createElement("dl-battery-history") as El;
  el.hass = hass;
  Object.assign(el, props);
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


  it("asks the server for the history of the selected drone's flights", async () => {
    const { hass } = await mount({ drone: "D1" });
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/batteries", drone: "D1" });
  });

  it("reloads when the drone filter changes", async () => {
    const { el, hass } = await mount();
    hass.callWS.mockClear();
    el.drone = "D2";
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(hass.callWS).toHaveBeenCalledWith({ type: "dronelog/batteries", drone: "D2" });
  });

  it("shows only the selected battery and a summary for it", async () => {
    const { el } = await mount({ battery: "B2" });
    const legend = el.shadowRoot!.querySelector(".legend")!.textContent!;
    expect(legend).toContain("BBB2");
    expect(legend).not.toContain("AAA1");
    expect(el.shadowRoot!.querySelector(".summary")).not.toBeNull();
    expect(el.shadowRoot!.querySelector(".summary")!.textContent).toContain("Ladezyklen");
  });

  it("shows all batteries for comparison without a summary when no battery is selected", async () => {
    const { el } = await mount();
    const legend = el.shadowRoot!.querySelector(".legend")!.textContent!;
    expect(legend).toContain("AAA1");
    expect(legend).toContain("BBB2");
    expect(el.shadowRoot!.querySelector(".summary")).toBeNull();
  });
});
