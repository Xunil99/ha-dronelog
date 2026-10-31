"""Ablage der unveränderten Logdateien, benannt nach ihrem SHA-256."""

from __future__ import annotations

import hashlib
import json
import os
import tempfile
from datetime import UTC, datetime
from pathlib import Path
from typing import Literal

MAX_NAME_LENGTH = 200


def sanitize_name(name: str) -> str:
    """Nur den Dateinamen ohne Pfadanteile behalten."""
    cleaned = os.path.basename(name.replace("\\", "/")).strip()
    return cleaned[:MAX_NAME_LENGTH] or "unbenannt.txt"


def _fsync_directory(path: Path) -> None:
    fd = os.open(path, os.O_RDONLY)
    try:
        os.fsync(fd)
    finally:
        os.close(fd)


class RawLogStore:
    """Legt Rohdateien unter <base>/<sha256>.txt ab (blockierend, im Executor aufrufen)."""

    def __init__(self, base: Path) -> None:
        self._base = base

    @property
    def base(self) -> Path:
        return self._base

    def save(self, sha256: str, name: str, data: bytes) -> Literal["stored", "duplicate"]:
        self._base.mkdir(parents=True, exist_ok=True)
        target = self._base / f"{sha256}.txt"
        # "duplicate" gilt nur, wenn die vorhandene Datei wirklich intakt ist (Hash passt).
        if target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() == sha256:
            return "duplicate"
        fd, temporary = tempfile.mkstemp(dir=self._base, prefix=".upload-", suffix=".tmp")
        try:
            with os.fdopen(fd, "wb") as handle:
                handle.write(data)
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(temporary, target)
        except BaseException:
            Path(temporary).unlink(missing_ok=True)
            raise
        sidecar = {"name": sanitize_name(name), "received": datetime.now(UTC).isoformat()}
        (self._base / f"{sha256}.json").write_text(json.dumps(sidecar), encoding="utf-8")
        _fsync_directory(self._base)
        return "stored"
