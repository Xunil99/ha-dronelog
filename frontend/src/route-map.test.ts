import { beforeEach, describe, expect, it } from "vitest";
import L from "leaflet";
import "./route-map";
import { makePoints } from "./fixtures";
import type { Point } from "./types";

type MapEl = HTMLElement & { points: Point[]; start: unknown; end: unknown; tileUrl: string; lang: string; map?: L.Map; updateComplete: Promise<boolean> };

async function mount(props: Partial<MapEl>) {
  const el = document.createElement("dl-route-map") as MapEl;
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  return el;
}

const lines = (el: MapEl) => {
  const found: L.Layer[] = [];
  el.map?.eachLayer((l) => { if (l instanceof L.Polyline) found.push(l); });
  return found;
};

beforeEach(() => { document.body.innerHTML = ""; });

describe("route-map", () => {
  it("shows a note instead of a map when there is no position", async () => {
    const points = makePoints(5).map((p) => ({ ...p, lat: null, lon: null }));
    const el = await mount({ points, start: null, end: null, lang: "de" });
    expect(el.shadowRoot!.textContent).toContain("Keine Positionsdaten");
    expect(el.map).toBeUndefined();
  });

  it("draws one segment per pair of positioned points", async () => {
    const el = await mount({ points: makePoints(10), start: { lat: 47.5, lon: 11 }, end: { lat: 47.51, lon: 11.001 }, tileUrl: "", lang: "de" });
    expect(lines(el)).toHaveLength(9);
  });

  it("takes the tile address from the configuration", async () => {
    const tileUrl = "https://tiles.example/{z}/{x}/{y}.png";
    const el = await mount({ points: makePoints(5), start: { lat: 47.5, lon: 11 }, end: { lat: 47.51, lon: 11.001 }, tileUrl, lang: "de" });
    let found = "";
    el.map!.eachLayer((l) => { if (l instanceof L.TileLayer) found = (l as unknown as { _url: string })._url; });
    expect(found).toBe(tileUrl);
  });

  it("replaces the old route when another flight is shown", async () => {
    const el = await mount({ points: makePoints(10), start: { lat: 47.5, lon: 11 }, end: { lat: 47.51, lon: 11.001 }, tileUrl: "", lang: "de" });
    el.points = makePoints(4);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    expect(lines(el)).toHaveLength(3);
  });

  it("zooms to a single positioned point instead of showing the world map", async () => {
    const points = makePoints(5).map((p, i) => (i === 2 ? p : { ...p, lat: null, lon: null }));
    const el = await mount({ points, start: null, end: null, tileUrl: "", lang: "de" });
    expect(el.map).toBeDefined();
    expect(el.map!.getZoom()).toBeGreaterThan(10);
    expect(Math.abs(el.map!.getCenter().lat - points[2].lat!)).toBeLessThan(0.01);
  });

  it("draws the map from start and end position when the flight has no track", async () => {
    const el = await mount({ points: [], start: { lat: 47.5, lon: 11 }, end: { lat: 47.51, lon: 11.002 }, tileUrl: "", lang: "de" });
    expect(el.shadowRoot!.textContent).not.toContain("Keine Positionsdaten");
    expect(el.map).toBeDefined();
    expect(el.map!.getZoom()).toBeGreaterThan(8);
  });
});
