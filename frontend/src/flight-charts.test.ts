import { beforeEach, describe, expect, it } from "vitest";
import "./flight-charts";
import { makePoints } from "./fixtures";
import type { Point } from "./types";

type ChartsEl = HTMLElement & { points: Point[]; lang: string; dark: boolean; updateComplete: Promise<boolean> };

async function mount(props: Partial<ChartsEl>) {
  const el = document.createElement("dl-flight-charts") as ChartsEl;
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

beforeEach(() => { document.body.innerHTML = ""; });

describe("flight-charts", () => {
  it("shows a note when there is no track (old logs without samples)", async () => {
    const el = await mount({ points: [], lang: "de" });
    expect(el.shadowRoot!.textContent).toContain("Kein Verlauf vorhanden");
    expect(el.shadowRoot!.querySelector(".chart")).toBeNull();
  });
  it("renders two chart containers when points exist", async () => {
    const el = await mount({ points: makePoints(20), lang: "de" });
    expect(el.shadowRoot!.querySelectorAll(".chart")).toHaveLength(2);
  });
  it("does not crash without canvas support", async () => {
    await expect(mount({ points: makePoints(5), lang: "en", dark: true })).resolves.toBeDefined();
  });
});
