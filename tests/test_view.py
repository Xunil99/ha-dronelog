import hashlib

from custom_components.dronelog import const
from tests.conftest import TOKEN

DATA = b"logdaten" * 100
SHA = hashlib.sha256(DATA).hexdigest()


def headers(token=TOKEN, sha=SHA, name="FlightRecord_test.txt"):
    h = {"Content-Type": "application/octet-stream", "X-Filename": name}
    if token is not None:
        h["Authorization"] = f"Bearer {token}"
    if sha is not None:
        h["X-SHA256"] = sha
    return h


async def test_upload_valid_token_stores_file(hass_client_no_auth, setup_dronelog, tmp_path):
    client = await hass_client_no_auth()
    resp = await client.post("/api/dronelog/upload", data=DATA, headers=headers())
    assert resp.status == 200
    assert await resp.json() == {"status": "stored", "sha256": SHA}
    stored = tmp_path / "dronelog" / "raw" / f"{SHA}.txt"
    assert stored.read_bytes() == DATA


async def test_upload_same_file_twice_returns_duplicate(hass_client_no_auth, setup_dronelog):
    client = await hass_client_no_auth()
    await client.post("/api/dronelog/upload", data=DATA, headers=headers())
    resp = await client.post("/api/dronelog/upload", data=DATA, headers=headers())
    assert resp.status == 200
    assert (await resp.json())["status"] == "duplicate"


async def test_upload_wrong_token_returns_401_and_stores_nothing(hass_client_no_auth, setup_dronelog, tmp_path):
    client = await hass_client_no_auth()
    resp = await client.post("/api/dronelog/upload", data=DATA, headers=headers(token="falsch"))
    assert resp.status == 401
    assert not list((tmp_path / "dronelog" / "raw").glob("*"))


async def test_upload_missing_token_returns_401(hass_client_no_auth, setup_dronelog):
    client = await hass_client_no_auth()
    resp = await client.post("/api/dronelog/upload", data=DATA, headers=headers(token=None))
    assert resp.status == 401


async def test_upload_hash_mismatch_returns_400(hass_client_no_auth, setup_dronelog, tmp_path):
    client = await hass_client_no_auth()
    resp = await client.post("/api/dronelog/upload", data=DATA, headers=headers(sha="0" * 64))
    assert resp.status == 400
    assert not list((tmp_path / "dronelog" / "raw").glob("*.txt"))


async def test_upload_missing_hash_returns_400(hass_client_no_auth, setup_dronelog):
    client = await hass_client_no_auth()
    resp = await client.post("/api/dronelog/upload", data=DATA, headers=headers(sha=None))
    assert resp.status == 400


async def test_upload_over_limit_returns_413(hass_client_no_auth, setup_dronelog, monkeypatch):
    monkeypatch.setattr(const, "MAX_UPLOAD_BYTES", 100)
    client = await hass_client_no_auth()
    resp = await client.post("/api/dronelog/upload", data=DATA, headers=headers())
    assert resp.status == 413


async def test_ping_with_token_returns_ok(hass_client_no_auth, setup_dronelog):
    client = await hass_client_no_auth()
    resp = await client.get("/api/dronelog/ping", headers={"Authorization": f"Bearer {TOKEN}"})
    assert resp.status == 200
    assert await resp.json() == {"status": "ok"}


async def test_ping_wrong_token_returns_401(hass_client_no_auth, setup_dronelog):
    client = await hass_client_no_auth()
    resp = await client.get("/api/dronelog/ping", headers={"Authorization": "Bearer nope"})
    assert resp.status == 401
