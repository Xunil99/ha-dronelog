"""Konstanten der DroneLog-Integration."""

DOMAIN = "dronelog"
CONF_TOKEN = "token"

# Home Assistants HTTP-Server begrenzt Anfragekörper auf 16 MiB; Logdateien sind ein paar MB groß.
MAX_UPLOAD_BYTES = 16 * 1024 * 1024
TOKEN_BYTES = 32

# Mindestens so viel Platz muss nach dem Speichern frei bleiben, sonst 507.
MIN_FREE_BYTES = 1024**3
