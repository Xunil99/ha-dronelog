"""Export eines Flugs als CSV, GPX oder KML (wie FlightExport.swift: Zahlen mit Punkt, Zeiten in UTC)."""

from __future__ import annotations

import math
from datetime import UTC, datetime, tzinfo

from .events import event_title
from .models import FlightDetail, Sample

FORMATS = {
    "csv": "text/csv",
    "gpx": "application/gpx+xml",
    "kml": "application/vnd.google-earth.kml+xml",
}
UNKNOWN = "unbekannt"


def _num(value: float, digits: int = 3) -> str:
    if not math.isfinite(value):
        return ""
    text = f"{value:.{digits}f}"
    if "." in text:
        text = text.rstrip("0").rstrip(".")
    return "0" if text == "-0" else text


def _opt(value: float | None, digits: int = 3, scale: float = 1.0) -> str:
    return "" if value is None else _num(value * scale, digits)


def _iso(moment: datetime) -> str:
    return moment.astimezone(UTC).strftime("%Y-%m-%dT%H:%M:%SZ")


def _at(detail: FlightDetail, t: float) -> str:
    """Startzeit plus t Sekunden, auf ganze Sekunden abgeschnitten."""
    return datetime.fromtimestamp(math.floor(detail.row.start.timestamp() + t), UTC).strftime("%Y-%m-%dT%H:%M:%SZ")


def _xml(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def _title(detail: FlightDetail) -> str:
    serial = detail.row.drone_serial
    drone = detail.row.drone_model or (UNKNOWN if serial == UNKNOWN else "…" + serial[-4:])
    return f"{drone} {_iso(detail.row.start)}"


def _positioned(detail: FlightDetail) -> list[tuple[Sample, float, float]]:
    return [(s, s.lat, s.lon) for s in detail.samples if s.lat is not None and s.lon is not None and math.isfinite(s.lat) and math.isfinite(s.lon)]


def has_positions(detail: FlightDetail) -> bool:
    return bool(_positioned(detail))


def file_name(detail: FlightDetail, ext: str, tz: tzinfo) -> str:
    return f"Flug_{detail.row.start.astimezone(tz):%Y-%m-%d_%H%M}.{ext}"


def to_csv(detail: FlightDetail) -> str:
    lines = ["t_s,time_utc,lat,lon,height_m,speed_ms,voltage_v,current_a,charge_pct,distance_m,downlink_pct,uplink_pct,flight_mode,"
             "battery_temp_c,cell_dev_mv,pitch_deg,roll_deg,yaw_deg"]
    for s in detail.samples:
        measured = s.voltage > 0
        fields = [
            _num(s.t), _at(detail, s.t), _opt(s.lat, 7), _opt(s.lon, 7), _num(s.height), _num(s.speed),
            _num(s.voltage) if measured else "", _num(s.current) if measured else "", str(s.charge),
            _opt(s.dist), "" if s.dl is None else str(s.dl), "" if s.ul is None else str(s.ul),
            "" if s.mode is None else str(s.mode), _opt(s.temp), _opt(s.cell_dev, 3, 1000.0),
            _opt(s.pitch), _opt(s.roll), _opt(s.yaw),
        ]
        lines.append(",".join(fields))
    return "\n".join(lines) + "\n"


def to_gpx(detail: FlightDetail) -> str:
    out = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<gpx version="1.1" creator="CopterInfo" xmlns="http://www.topografix.com/GPX/1/1">\n'
           f"<trk><name>{_xml(_title(detail))}</name><desc>{_xml('Höhe relativ zum Startpunkt')}</desc><trkseg>\n")
    for sample, lat, lon in _positioned(detail):
        out += f'<trkpt lat="{_num(lat, 7)}" lon="{_num(lon, 7)}"><ele>{_num(sample.height)}</ele><time>{_at(detail, sample.t)}</time></trkpt>\n'
    return out + "</trkseg></trk>\n</gpx>\n"


def to_kml(detail: FlightDetail) -> str:
    points = _positioned(detail)

    def coord(lat: float, lon: float, height: float) -> str:
        return f"{_num(lon, 7)},{_num(lat, 7)},{_num(height)}"

    def placemark(name: str, point: tuple[Sample, float, float]) -> str:
        sample, lat, lon = point
        return (f"<Placemark><name>{_xml(name)}</name><Point><altitudeMode>relativeToGround</altitudeMode>"
                f"<coordinates>{coord(lat, lon, sample.height)}</coordinates></Point></Placemark>\n")

    out = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<kml xmlns="http://www.opengis.net/kml/2.2"><Document>\n'
           f"<name>{_xml(_title(detail))}</name>\n")
    if points:
        out += (f"<Placemark><name>{_xml('Flugweg')}</name><Style><LineStyle><color>ff0080ff</color><width>3</width></LineStyle></Style>"
                "<LineString><altitudeMode>relativeToGround</altitudeMode><coordinates>\n")
        out += "\n".join(coord(lat, lon, sample.height) for sample, lat, lon in points)
        out += "\n</coordinates></LineString></Placemark>\n"
        out += placemark("Start", points[0]) + placemark("Ende", points[-1])
        for event in sorted(detail.extras.events if detail.extras else (), key=lambda e: e.t):
            nearest = min(points, key=lambda p: abs(p[0].t - event.t))
            out += placemark(event_title(event.kind), nearest)
    return out + "</Document></kml>\n"


RENDERERS = {"csv": to_csv, "gpx": to_gpx, "kml": to_kml}
