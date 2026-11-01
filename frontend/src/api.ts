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
  stats(drone?: string, battery?: string): Promise<StatsDTO> {
    return this.call({ type: "dronelog/stats", drone, battery });
  }
  batteries(drone?: string): Promise<BatteriesDTO> {
    return this.call({ type: "dronelog/batteries", drone });
  }
  heatmap(precisionM?: number, drone?: string, battery?: string): Promise<HeatmapDTO> {
    return this.call({ type: "dronelog/heatmap", precision_m: precisionM, drone, battery });
  }
  async cellFlights(lat: number, lon: number, precisionM?: number, drone?: string, battery?: string): Promise<FlightSummary[]> {
    const result = await this.call<{ flights: FlightSummary[] }>({ type: "dronelog/cell_flights", lat, lon, precision_m: precisionM, drone, battery });
    return result.flights;
  }
}
