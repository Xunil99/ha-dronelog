"""Konstanten der DroneLog-Integration."""

DOMAIN = "dronelog"
CONF_TOKEN = "token"

# Home Assistants HTTP-Server begrenzt Anfragekörper auf 16 MiB; Logdateien sind ein paar MB groß.
MAX_UPLOAD_BYTES = 16 * 1024 * 1024
TOKEN_BYTES = 32
