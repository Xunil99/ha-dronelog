import { describe, expect, it, vi } from "vitest";
import { DroneLogApi } from "./api";

function hass(result: unknown = {}) {
  return { callWS: vi.fn().mockResolvedValue(result) };
}

describe("DroneLogApi", () => {
  it("flights sends the right message and omits undefined filters", async () => {
    const h = hass({ flights: [], total: 0 });
    await new DroneLogApi(h).flights({ limit: 50, offset: 0, drone: undefined, battery: "B1" });
    expect(h.callWS).toHaveBeenCalledWith({ type: "dronelog/flights", limit: 50, offset: 0, battery: "B1" });
  });
  it("flight, stats, batteries, heatmap and cellFlights use their command names", async () => {
    const h = hass({ cells: [], flights: [] });
    const api = new DroneLogApi(h);
    await api.flight(7);
    await api.stats("D1");
    await api.batteries();
    await api.heatmap(1000);
    await api.cellFlights(48.75, 12.4, 300);
    expect(h.callWS.mock.calls.map((c) => c[0])).toEqual([
      { type: "dronelog/flight", flight_id: 7 },
      { type: "dronelog/stats", drone: "D1" },
      { type: "dronelog/batteries" },
      { type: "dronelog/heatmap", precision_m: 1000 },
      { type: "dronelog/cell_flights", lat: 48.75, lon: 12.4, precision_m: 300 },
    ]);
  });
  it("cellFlights returns the list of flights", async () => {
    const api = new DroneLogApi(hass({ flights: [{ id: 1 }] }));
    expect(await api.cellFlights(1, 2)).toEqual([{ id: 1 }]);
  });
  it("passes errors on", async () => {
    const h = { callWS: vi.fn().mockRejectedValue({ code: "unauthorized", message: "nein" }) };
    await expect(new DroneLogApi(h).stats()).rejects.toMatchObject({ code: "unauthorized" });
  });
});
