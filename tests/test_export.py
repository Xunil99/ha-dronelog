from unittest.mock import patch
from dataclasses import replace
from datetime import UTC, datetime
from zoneinfo import ZoneInfo

from custom_components.dronelog.const import DOMAIN
from custom_components.dronelog.export import file_name, to_csv, to_gpx, to_kml, has_positions
from custom_components.dronelog.models import BatterySummary, FlightDetail, FlightEvent, FlightExtras, FlightRow, Sample
from tests.factories import make_battery, make_flight

START = datetime(2026, 10, 27, 13, 30, tzinfo=UTC)


def detail(samples, extras=None, model="Mini <3> & Co") -> FlightDetail:
    row = FlightRow(id=1, sha256="x" * 64, start=START, duration_s=6, distance_m=100, max_height_m=20, max_speed_ms=5, drone_serial="S1",
                    drone_model=model, battery_serial="B1", source_name="a.txt", temperature_c=None, wind_10m_ms=None)
    return FlightDetail(row=row, start_lat=47.25, start_lon=11.5, end_lat=None, end_lon=None, battery=make_battery(), weather=None,
                        samples=tuple(samples), extras=extras)


def s(t, lat=47.25, lon=11.5, h=10.0, mode=None, temp=None, dev=None, att=None, voltage=15.2, current=-2.25):
    pitch, roll, yaw = att or (None, None, None)
    return Sample(t=t, lat=lat, lon=lon, height=h, speed=3.5, voltage=voltage, current=current, charge=80, dist=12.5, dl=70, ul=90,
                  mode=mode, temp=temp, cell_dev=dev, pitch=pitch, roll=roll, yaw=yaw)


def test_csv_has_header_and_rows_with_dot_decimals():
    lines = to_csv(detail([s(0), s(2, lat=None, lon=None, h=11.5, temp=21.4, dev=0.012, att=(-3.5, 1.2, 181.5))])).split("\n")
    assert lines[0] == ("t_s,time_utc,lat,lon,height_m,speed_ms,voltage_v,current_a,charge_pct,distance_m,downlink_pct,uplink_pct,"
                        "flight_mode,battery_temp_c,cell_dev_mv,pitch_deg,roll_deg,yaw_deg")
    assert lines[1] == "0,2026-10-27T13:30:00Z,47.25,11.5,10,3.5,15.2,-2.25,80,12.5,70,90,,,,,,"
    assert lines[2] == "2,2026-10-27T13:30:02Z,,,11.5,3.5,15.2,-2.25,80,12.5,70,90,,21.4,12,-3.5,1.2,181.5"
    assert lines[3] == "" and len(lines) == 4                        # endet mit genau einem Zeilenumbruch


def test_csv_leaves_voltage_and_current_empty_for_measurement_gaps():
    gap = Sample(t=1, lat=None, lon=None, height=5, speed=1, voltage=0, current=0, charge=80)
    assert ",5,1,,,80," in to_csv(detail([gap])).split("\n")[1]


def test_csv_number_format_trims_zeros_and_negative_zero():
    line = to_csv(detail([s(0.5, lat=47.123456789, h=-0.0004, att=(0.0, -0.0001, 10.10))])).split("\n")[1]
    assert line.startswith("0.5,2026-10-27T13:30:00Z,47.1234568,11.5,0,")    # Zeit wird abgeschnitten, -0 wird 0
    assert line.endswith(",0,0,10.1")


def test_gpx_contains_only_positioned_points_with_times():
    gpx = to_gpx(detail([s(0), s(2, lat=None, lon=None), s(4, lat=47.251)]))
    assert gpx.startswith("<?xml")
    assert gpx.count("<trkpt") == 2
    assert '<trkpt lat="47.251" lon="11.5">' in gpx
    assert "<time>2026-10-27T13:30:04Z</time>" in gpx
    assert "Mini &lt;3&gt; &amp; Co" in gpx
    assert gpx.endswith("</trkseg></trk>\n</gpx>\n")
    assert '<gpx version="1.1" creator="CopterInfo" xmlns="http://www.topografix.com/GPX/1/1">\n' in gpx
    assert "<desc>Höhe relativ zum Startpunkt</desc><trkseg>\n" in gpx


def test_kml_has_linestring_and_placemarks_for_start_end_and_events():
    extras = FlightExtras(events=(FlightEvent(t=2.0, kind="voltageWarning", value=1.0),))
    kml = to_kml(detail([s(0), s(2, lat=47.2505), s(4, lat=47.251)], extras))
    assert "<LineString>" in kml and "<altitudeMode>relativeToGround</altitudeMode>" in kml
    assert "11.5,47.251,10" in kml                                    # KML: Länge,Breite,Höhe
    for name in ("Start", "Ende", "Spannungswarnung", "Flugweg"):
        assert f"<name>{name}</name>" in kml
    assert "<Placemark><name>Spannungswarnung</name><Point><altitudeMode>relativeToGround</altitudeMode><coordinates>11.5,47.2505,10</coordinates>" in kml
    assert "Mini &lt;3&gt; &amp; Co" in kml
    assert kml.endswith("</Document></kml>\n")


def test_exports_without_positions_are_empty_but_valid():
    none = detail([s(0, lat=None, lon=None)])
    assert "<trkpt" not in to_gpx(none) and "<LineString>" not in to_kml(none)
    assert not has_positions(none) and has_positions(detail([s(0)]))


def test_file_name_is_filesystem_safe_and_local():
    assert file_name(detail([]), "csv", UTC) == "Flug_2026-10-27_1330.csv"
    assert file_name(detail([]), "gpx", ZoneInfo("Europe/Berlin")) == "Flug_2026-10-27_1430.gpx"


# --- HTTP ---------------------------------------------------------------------------------------------------------------

async def test_http_export_downloads(hass, hass_client, setup_dronelog):
    await hass.config.async_set_time_zone("Europe/Berlin")
    flight = make_flight(sha="1" * 64, start=START)
    await hass.async_add_executor_job(hass.data[DOMAIN]["db"].add_flight, flight, None, "x")
    client = await hass_client()
    csv = await client.get("/api/dronelog/export/1/csv")
    assert csv.status == 200 and csv.headers["Content-Type"].startswith("text/csv")
    assert 'filename="Flug_2026-10-27_1430.csv"' in csv.headers["Content-Disposition"]
    assert (await csv.text()).startswith("t_s,time_utc,")
    gpx = await client.get("/api/dronelog/export/1/gpx")
    assert gpx.status == 200 and "gpx" in gpx.headers["Content-Type"] and "<trkpt" in await gpx.text()
    kml = await client.get("/api/dronelog/export/1/kml")
    assert kml.status == 200 and "kml" in kml.headers["Content-Type"] and "<LineString>" in await kml.text()


async def test_http_export_errors(hass, hass_client, setup_dronelog):
    no_position = replace(make_flight(sha="1" * 64, start=START, samples=()), start_lat=None, start_lon=None)
    await hass.async_add_executor_job(hass.data[DOMAIN]["db"].add_flight, no_position, None, "x")
    client = await hass_client()
    assert (await client.get("/api/dronelog/export/99/csv")).status == 404
    assert (await client.get("/api/dronelog/export/1/pdf")).status == 400
    assert (await client.get("/api/dronelog/export/1/gpx")).status == 404       # keine Positionen
    assert (await client.get("/api/dronelog/export/1/csv")).status == 200       # CSV enthält auch ohne Positionen die Kopfzeile


async def test_http_export_requires_login_and_admin(hass, hass_client_no_auth, hass_client, hass_read_only_access_token, setup_dronelog):
    await hass.async_add_executor_job(hass.data[DOMAIN]["db"].add_flight, make_flight(sha="1" * 64), None, "x")
    assert (await (await hass_client_no_auth()).get("/api/dronelog/export/1/csv")).status == 401
    assert (await (await hass_client(hass_read_only_access_token)).get("/api/dronelog/export/1/csv")).status == 403


async def test_http_export_rejects_overlong_ids_and_renders_in_executor(hass, hass_client, setup_dronelog):
    client = await hass_client()
    assert (await client.get("/api/dronelog/export/" + "9" * 40 + "/csv")).status == 404
    assert (await client.get("/api/dronelog/export/1234567890123/csv")).status == 404
    await hass.async_add_executor_job(hass.data[DOMAIN]["db"].add_flight, make_flight(sha="1" * 64, start=START), None, "x")
    import threading
    from custom_components.dronelog import view

    seen = []
    original = view.RENDERERS["csv"]

    def spy(detail):
        seen.append(threading.current_thread() is threading.main_thread())
        return original(detail)

    with patch.dict(view.RENDERERS, {"csv": spy}):
        assert (await client.get("/api/dronelog/export/1/csv")).status == 200
    assert seen == [False]
