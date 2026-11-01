import type { BatteriesDTO, BatteryReportDTO, FlightbookDTO, LogbookDTO, MaintenanceRowDTO, NoteDTO, FlightDetailDTO, FlightQuery, FlightsResult, FlightSummary, HassLike, HeatmapDTO, StatsDTO } from "./types";

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
  logbook(drone?: string, battery?: string): Promise<LogbookDTO> {
    return this.call({ type: "dronelog/logbook", drone, battery });
  }
  flightbook(drone?: string, battery?: string, year?: number): Promise<FlightbookDTO> {
    return this.call({ type: "dronelog/flightbook", drone, battery, year });
  }
  batteryReport(serial: string): Promise<BatteryReportDTO> {
    return this.call({ type: "dronelog/battery_report", battery_serial: serial });
  }
  noteGet(flightId: number): Promise<NoteDTO> {
    return this.call({ type: "dronelog/note_get", flight_id: flightId });
  }
  noteSet(flightId: number, text: string, tags: string[]): Promise<NoteDTO> {
    return this.call({ type: "dronelog/note_set", flight_id: flightId, text, tags: tags.join(", ") });
  }
  placeNameSet(key: string, name: string): Promise<{ key: string; name: string | null }> {
    return this.call({ type: "dronelog/place_name_set", key, name });
  }
  async maintenance(): Promise<MaintenanceRowDTO[]> {
    return (await this.call<{ drones: MaintenanceRowDTO[] }>({ type: "dronelog/maintenance_get" })).drones;
  }
  maintenanceSet(drone: string, hours: number | null, flights: number | null): Promise<MaintenanceRowDTO> {
    return this.call({ type: "dronelog/maintenance_set", drone, interval_hours: hours, interval_flights: flights });
  }
  maintenanceServiced(drone: string): Promise<MaintenanceRowDTO> {
    return this.call({ type: "dronelog/maintenance_serviced", drone });
  }
}
