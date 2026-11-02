"""Grobe Schätzung des Innenwiderstands des Gesamtpacks (identisch zu InternalResistance.swift).

Regression V = a + k·Ladung − R·I auf den Frames, in denen Spannung oder Strom neu gemessen wurden (der Akku meldet nur
etwa 1 Hz). Enthält den Polarisationsanteil. None, wenn die Daten das Qualitätstor nicht erfüllen.
"""

from __future__ import annotations

import math

MINIMUM_UPDATES = 150
MINIMUM_CURRENT_SPAN_A = 3.0
MINIMUM_R2 = 0.8
MAXIMUM_STANDARD_ERROR_MOHM = 3.0
PLAUSIBLE_RANGE_MOHM = (15.0, 150.0)


def _solve3(a: list[list[float]], b: list[float]) -> list[float] | None:
    m = [row[:] + [b[i]] for i, row in enumerate(a)]
    for col in range(3):
        pivot = max(range(col, 3), key=lambda r: abs(m[r][col]))
        if abs(m[pivot][col]) <= 1e-12:
            return None
        m[col], m[pivot] = m[pivot], m[col]
        for r in range(3):
            if r != col:
                factor = m[r][col] / m[col][col]
                for c in range(col, 4):
                    m[r][c] -= factor * m[col][c]
    return [m[i][3] / m[i][i] for i in range(3)]


def estimate_internal_resistance(frames) -> float | None:
    xs: list[tuple[float, float, float]] = []  # (Spannung, |Strom|, Ladung)
    last: tuple[float, float] | None = None
    for f in frames:
        b = f.battery
        if not (b.voltage > 0 and math.isfinite(b.voltage) and math.isfinite(b.current) and b.charge_level > 0):
            continue
        amps = abs(b.current)
        if last is not None and last == (b.voltage, amps):
            continue  # kein neuer Messwert
        last = (b.voltage, amps)
        xs.append((b.voltage, amps, float(b.charge_level)))
    if len(xs) < MINIMUM_UPDATES:
        return None
    currents = sorted(x[1] for x in xs)
    span = currents[int((len(currents) - 1) * 0.95)] - currents[int((len(currents) - 1) * 0.05)]
    if span < MINIMUM_CURRENT_SPAN_A:
        return None

    n = float(len(xs))
    s = [[0.0] * 3 for _ in range(3)]
    rhs = [0.0] * 3
    for v, i, c in xs:
        row = (1.0, c, i)
        for r in range(3):
            for k in range(3):
                s[r][k] += row[r] * row[k]
            rhs[r] += row[r] * v
    beta = _solve3(s, rhs)
    if beta is None:
        return None
    ss_res = ss_tot = 0.0
    mean = sum(x[0] for x in xs) / n
    for v, i, c in xs:
        pred = beta[0] + beta[1] * c + beta[2] * i
        ss_res += (v - pred) ** 2
        ss_tot += (v - mean) ** 2
    if not (ss_tot > 0 and 1 - ss_res / ss_tot >= MINIMUM_R2):
        return None
    # R² beschreibt das ganze Modell; ein starker Ladezustandsterm kann es erfüllen, obwohl der Strom-Koeffizient unsicher ist.
    inverse = _solve3(s, [0.0, 0.0, 1.0])
    if len(xs) <= 3 or inverse is None:
        return None
    variance = ss_res / (n - 3) * inverse[2]
    if variance < 0:
        return None  # numerisch entartet (in Swift: NaN, fällt durch das Tor)
    if math.sqrt(variance) * 1000 > MAXIMUM_STANDARD_ERROR_MOHM:
        return None
    r = -beta[2] * 1000
    return r if PLAUSIBLE_RANGE_MOHM[0] <= r <= PLAUSIBLE_RANGE_MOHM[1] else None
