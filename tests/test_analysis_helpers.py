import pytest

from custom_components.dronelog.cell_levels import CellDeviationLevel, cell_deviation_level
from custom_components.dronelog.events import event_severity, flight_badges
from custom_components.dronelog.flight_modes import (
    FlightModeCategory,
    flight_mode_category,
    flight_mode_durations,
    flight_mode_segments,
)
from custom_components.dronelog.flight_phases import FlightPhase, flight_phase_durations
from custom_components.dronelog.hover_wind import WindClass, hover_wind, wind_class, wind_from_attitude
from custom_components.dronelog.models import FlightEvent, FlightExtras, Sample


def s(t, h=10.0, v=0.1, **kw):
    return Sample(t=t, lat=None, lon=None, height=h, speed=v, voltage=15.0, current=-2.0, charge=80, **kw)


# --- Flugphasen (LogbookTests.test_phaseDurations) ---

def test_phase_durations():
    samples = [s(0, 0, 0), s(2, 4, 0.1), s(4, 4, 0.1), s(6, 4, 5), s(8, 0.4 + 1.6, 5), s(10, 2, 5)]
    p = flight_phase_durations(samples)
    assert p[FlightPhase.CLIMB] == pytest.approx(2)
    assert p[FlightPhase.HOVER] == pytest.approx(2)
    assert p[FlightPhase.CRUISE] == pytest.approx(4)
    assert p[FlightPhase.DESCENT] == pytest.approx(2)


def test_phases_ignore_huge_gaps_and_empty_input():
    assert flight_phase_durations([]) == {}
    assert flight_phase_durations([s(0, 10, 0)]) == {}
    assert flight_phase_durations([s(0, 10, 0), s(600, 10, 0)]).get(FlightPhase.HOVER, 0) == 0


# --- Wind (Plan5ITests) ---

def test_wind_direction_and_tilt_from_attitude():
    tilt, bearing = wind_from_attitude(roll_deg=0, pitch_deg=-5, yaw_deg=90)
    assert tilt == pytest.approx(5) and bearing == pytest.approx(90)
    tilt, bearing = wind_from_attitude(roll_deg=-4, pitch_deg=-3, yaw_deg=180)
    assert tilt == pytest.approx(5) and bearing == pytest.approx(126.87, abs=0.01)


def test_wind_classes():
    assert wind_class(1.9) is WindClass.CALM
    assert wind_class(2) is WindClass.MODERATE
    assert wind_class(5) is WindClass.MODERATE
    assert wind_class(5.1) is WindClass.WINDY


def hs(t, pitch=-4.0, roll=0.0, yaw=90.0, h=10.0, speed=0.1):
    return s(t, h, speed, pitch=pitch, roll=roll, yaw=yaw)


def test_hover_wind_needs_five_seconds_of_calm_flight():
    assert hover_wind([hs(float(t)) for t in range(4)]) is None  # 3 s
    w = hover_wind([hs(float(t)) for t in range(7)])  # 6 s
    assert w.tilt_deg == pytest.approx(4) and w.bearing_deg == pytest.approx(90)
    assert w.seconds == pytest.approx(6) and w.wind_class is WindClass.MODERATE


def test_hover_wind_ignores_moving_flight_and_ground():
    assert hover_wind([hs(float(t), speed=3) for t in range(9)]) is None
    assert hover_wind([hs(float(t), h=1) for t in range(9)]) is None
    assert hover_wind([hs(float(t), h=10 + t * 1.5) for t in range(9)]) is None


def test_hover_wind_needs_attitude_channels():
    assert hover_wind([s(float(t), 10, 0) for t in range(9)]) is None


def test_circular_mean_of_bearing_across_north():
    samples = [hs(float(t), yaw=350) for t in range(7)] + [hs(float(t), yaw=10) for t in range(7, 13)]
    w = hover_wind(samples)
    assert min(abs(w.bearing_deg), abs(w.bearing_deg - 360)) < 1


def test_hover_wind_runs_are_separated_by_interruptions():
    # zwei Abschnitte mit je 3 s: keiner erreicht 5 s -> kein Ergebnis
    a = [hs(float(t)) for t in range(4)]
    b = [hs(float(t), h=0.5) for t in range(4, 6)]
    c = [hs(float(t)) for t in range(6, 10)]
    assert hover_wind(a + b + c) is None


# --- Zellabweichung ---

@pytest.mark.parametrize("volts,level", [(0.0, "ok"), (0.020, "ok"), (0.0201, "minor"), (0.050, "minor"), (0.0501, "major"), (0.3, "major")])
def test_cell_deviation_levels(volts, level):
    assert cell_deviation_level(volts) == CellDeviationLevel(level)


def test_cell_deviation_texts():
    assert CellDeviationLevel.OK.text == "in Ordnung"
    assert CellDeviationLevel.MINOR.text == "auffällig"
    assert CellDeviationLevel.MAJOR.text == "kritisch"


# --- Flugmodi (FlightModes.swift) ---

@pytest.mark.parametrize("modes,category", [
    ((4, 5, 6, 7, 8, 32, 43), "normal"), ((31,), "sport"), ((19, 38), "cine"), ((0, 30), "manual"),
    ((10, 11, 12, 33, 35, 37, 41), "automatic"), ((15, 36), "goHome"), ((1, 2, 3, 13, 23), "attitude"),
    ((9, 14, 16, 17, 18, 24, 25, 26, 27, 28, 39), "smart"), ((20, 21, 22, 29, 34, 40, 99, -1), "other")])
def test_flight_mode_categories(modes, category):
    for mode in modes:
        assert flight_mode_category(mode) == FlightModeCategory(category)


def test_flight_mode_segments_and_durations():
    samples = [s(0, mode=10), s(2, mode=6), s(4, mode=5), s(6, mode=None), s(8, mode=15), s(10, mode=15)]
    segments = flight_mode_segments(samples)
    assert [(g.category, g.start, g.end) for g in segments] == [
        (FlightModeCategory.AUTOMATIC, 0, 2), (FlightModeCategory.NORMAL, 2, 8), (FlightModeCategory.GO_HOME, 8, 10)]
    d = flight_mode_durations(segments)
    assert d == {FlightModeCategory.AUTOMATIC: 2, FlightModeCategory.NORMAL: 6, FlightModeCategory.GO_HOME: 2}
    assert flight_mode_segments([s(0), s(2)]) == []


# --- Ereignis-Schweregrade / Badges ---

def test_event_severity_and_badges_order():
    extras = FlightExtras(events=(
        FlightEvent(1, "propellerCatapult", 0), FlightEvent(5, "weakSignal", 4), FlightEvent(9, "weakSignal", 4),
        FlightEvent(12, "signalLossGoHome", 0), FlightEvent(14, "batteryGoHome", 0)), photo_count=3, video_s=12.0)
    assert event_severity("signalLossGoHome") == "critical"
    assert event_severity("manualGoHome") == "info"
    badges = flight_badges(extras)
    assert badges["kinds"] == ["signalLossGoHome", "batteryGoHome", "weakSignal", "propellerCatapult"]  # schwerste zuerst, dann Reihenfolge
    assert badges["worst"] == "critical" and badges["photo_count"] == 3 and badges["video_s"] == 12.0
    assert flight_badges(None) == {"kinds": [], "worst": None, "photo_count": 0, "video_s": 0.0}
