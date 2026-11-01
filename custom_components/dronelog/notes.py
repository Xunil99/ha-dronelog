"""Notizen und Tags je Flug (wie FlightNote in der iOS-App)."""

from __future__ import annotations

from dataclasses import dataclass, field

MAX_NOTE_LENGTH = 2000
MAX_TAG_LENGTH = 40
MAX_PLACE_NAME_LENGTH = 100


def parse_tags(text: str) -> list[str]:
    """„Urlaub, #Alpen, urlaub“ → ["Urlaub", "Alpen"]: getrimmt, ohne Raute, ohne Doppelte (Groß-/Kleinschreibung egal)."""
    seen: set[str] = set()
    tags: list[str] = []
    for part in text.split(","):
        tag = part.strip().strip("#").strip()
        if tag and tag.lower() not in seen:
            seen.add(tag.lower())
            tags.append(tag[:MAX_TAG_LENGTH])
    return tags


@dataclass
class FlightNote:
    text: str = ""
    tags: list[str] = field(default_factory=list)

    @property
    def is_empty(self) -> bool:
        return not self.text.strip() and not self.tags

    @property
    def display(self) -> str:
        """Text gefolgt von den Tags als #Tag (Flugbuch-Spalte „Notiz“)."""
        parts = [self.text.strip()] if self.text.strip() else []
        return " ".join(parts + [f"#{t}" for t in self.tags])
