import type { BatteriesDTO, FlightDetailDTO, FlightQuery, FlightsResult, FlightSummary, HassLike, HeatmapDTO, StatsDTO } from "./types";

function compact(message: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(message).filter(([, value]) => value !== undefined));
}

export class DroneLogApi {
  constructor(private readonly hass: HassLike) {}

  private call<T>(message: Record<string, unknown>): Promise<T> {
    return this.hass.callWS<T>(compact(message));
  }

  flights(query: FlightQuery = {}): Promise<FlightsResult> {
    return this.call({ type: "dronelog/flights", ...query });
  }
  flight(id: number): Promise<FlightDetailDTO> {
    return this.call({ type: "dronelog/flight", flight_id: id });
  }
  stats(drone?: string): Promise<StatsDTO> {
    return this.call({ type: "dronelog/stats", drone });
  }
  batteries(): Promise<BatteriesDTO> {
    return this.call({ type: "dronelog/batteries" });
  }
  heatmap(precisionM?: number): Promise<HeatmapDTO> {
    return this.call({ type: "dronelog/heatmap", precision_m: precisionM });
  }
  async cellFlights(lat: number, lon: number, precisionM?: number): Promise<FlightSummary[]> {
    const result = await this.call<{ flights: FlightSummary[] }>({ type: "dronelog/cell_flights", lat, lon, precision_m: precisionM });
    return result.flights;
  }
}
