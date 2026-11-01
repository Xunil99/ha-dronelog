import math

import pytest
from pydjirecord import Frame
from pydjirecord.frame.battery import FrameBattery
from pydjirecord.frame.osd import FrameOSD

from custom_components.dronelog.resistance import estimate_internal_resistance


def load_frames(n, r, charge0=90, span=6.0):
    """V = 8,2 - R*I - 0,002*(100 - Ladung); I wechselt zwischen 2 und 2+span, 1-Hz-Updates (wie im Swift-Test)."""
    frames = []
    for i in range(n):
        amps = 2 + span * (0.5 + 0.5 * math.sin(i * 0.9))
        charge = charge0 - i // 12
        frames.append(Frame(osd=FrameOSD(fly_time=float(i)),
                            battery=FrameBattery(charge_level=charge, current=-amps,
                                                 voltage=8.2 - r * amps - 0.002 * (100 - charge))))
    return frames


def test_recovers_synthetic_value():
    assert estimate_internal_resistance(load_frames(400, 0.050)) == pytest.approx(50.0, abs=1.0)


def test_none_when_current_span_too_small():
    assert estimate_internal_resistance(load_frames(400, 0.050, span=0.5)) is None


def test_none_with_too_few_updates():
    assert estimate_internal_resistance(load_frames(100, 0.050)) is None


def test_none_when_implausible():
    assert estimate_internal_resistance(load_frames(400, 0.400)) is None  # 400 mOhm: ausserhalb jedes realen Akkus
    assert estimate_internal_resistance(load_frames(400, 0.005)) is None  # 5 mOhm: unter 15


def test_none_when_current_coefficient_is_poorly_determined():
    frames = []
    for i in range(400):
        amps = 2 + 6 * (0.5 + 0.5 * math.sin(i * 0.9))
        charge = 95 - i // 5
        frames.append(Frame(osd=FrameOSD(fly_time=float(i)),
                            battery=FrameBattery(charge_level=charge, current=-amps,
                                                 voltage=8.2 - 0.05 * amps - 0.04 * (100 - charge) + 0.25 * math.sin(i * 7.3))))
    assert estimate_internal_resistance(frames) is None


def test_repeated_values_are_not_counted_as_updates():
    # 400 Frames, aber nur jeder vierte Frame bringt einen neuen Messwert -> 100 Updates < 150
    frames = load_frames(400, 0.050)
    held = [frames[(i // 4) * 4] for i in range(400)]
    assert estimate_internal_resistance(held) is None


def test_ignores_non_finite_and_missing_values():
    frames = load_frames(400, 0.050)
    frames[10].battery.voltage = math.nan
    frames[11].battery.current = math.inf
    frames[12].battery.charge_level = 0
    assert estimate_internal_resistance(frames) == pytest.approx(50.0, abs=1.0)


def test_empty_is_none():
    assert estimate_internal_resistance([]) is None
