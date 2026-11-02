"""Raster für Heatmap und Orte (wie heatCell / heatCellCenter der iOS-App): Zellhöhe `precision_m`, Zellbreite breitenabhängig."""

from __future__ import annotations

import math

PLACE_PRECISION_M = 500  # Raster der Logbuch-Orte; der Orts-Schlüssel "<Breite-Index>,<Länge-Index>" ist daher auch der der Heatmap(500)


def _lat_step(precision_m: int) -> float:
    return precision_m / 111_320


def heat_cell(lat: float, lon: float, precision_m: int) -> tuple[int, int]:
    step = _lat_step(precision_m)
    lat_i = round(lat / step)
    lon_step = step / max(math.cos(math.radians(lat_i * step)), 0.01)  # Zellbreite aus der Zellmitte
    return lat_i, round(lon / lon_step)


def heat_cell_center(cell: tuple[int, int], precision_m: int) -> tuple[float, float]:
    step = _lat_step(precision_m)
    lat = cell[0] * step
    return lat, cell[1] * step / max(math.cos(math.radians(lat)), 0.01)


def place_key(lat: float, lon: float) -> str:
    cell = heat_cell(lat, lon, PLACE_PRECISION_M)
    return f"{cell[0]},{cell[1]}"


def valid_coordinate(lat: float | None, lon: float | None) -> bool:
    return lat is not None and lon is not None and math.isfinite(lat) and math.isfinite(lon) and abs(lat) <= 90 and abs(lon) <= 180
