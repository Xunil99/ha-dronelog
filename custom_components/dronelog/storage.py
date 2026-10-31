"""Ablage der unveränderten Logdateien, benannt nach ihrem SHA-256."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Literal


class RawLogStore:
    """Legt Rohdateien unter <base>/<sha256>.txt ab (blockierend, im Executor aufrufen)."""

    def __init__(self, base: Path) -> None:
        self._base = base

    def save(self, sha256: str, data: bytes) -> Literal["stored", "duplicate"]:
        self._base.mkdir(parents=True, exist_ok=True)
        target = self._base / f"{sha256}.txt"
        if target.exists():
            return "duplicate"
        temporary = self._base / f".{sha256}.tmp"
        temporary.write_bytes(data)
        os.replace(temporary, target)
        return "stored"
