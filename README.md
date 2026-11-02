# DroneLog für Home Assistant

[Deutsch](#deutsch) · [English](#english)

Home-Assistant-Integration, die **Flugprotokolle von DJI-Drohnen** (DJI Fly) entgegennimmt, entschlüsselt und auswertet. Sie liefert ein eigenes Panel „Drohnenflüge“ mit Flugliste, Karte, Diagrammen, Akku-Auswertung, Logbuch, Flugbuch, Wartung und Berichten, dazu Sensoren und Benachrichtigungen. Die Logdateien kommen von der iOS-App **CopterInfo** (Sync, optional) oder lassen sich direkt hochladen.

> DroneLog ist ein unabhängiges Projekt und steht in keiner Verbindung zu DJI. DJI und DJI Fly sind Marken von SZ DJI Technology Co., Ltd.

---

## Deutsch

### Was die Integration kann

**Flugansicht**
- Flugliste mit Filtern nach Drohne und Akku und dem Filter „Nur mit Ereignissen“
- Karte mit Flugweg, einfärbbar nach Höhe oder Funksignal, Ereignis-Markern, Start und Landung
- Diagramme: Höhe und Tempo, Akkuspannung, Strom, Ladestand, Zellabweichung, Akkutemperatur, Nick und Roll, Entladekurve, Funksignal über Zeit und Entfernung, Flugmodus-Band
- Ereignisse und Warnungen: Rückkehr wegen Akku oder Verbindungsabbruch, Rückkehr per Taste, Spannungswarnung, schwaches Funksignal, GPS-Verlust, Propeller-Anlauf
- Karten für Energie (Wh, Wh/km), Funk, Kamera (Fotos, Videozeit), Flugphasen, Wetter (Open-Meteo) und einen Windhinweis aus der Fluglage
- Notizen und Tags je Flug, Export als CSV, GPX und KML

**Auswertung**
- Statistik nach Monat, Drohne und Akku, Heatmap der Startorte
- Akku-Verlauf je Akku: Gesundheit, Ladezyklen, Zellabweichung, Temperatur, Innenwiderstand (grobe Schätzung)
- Akku-Bericht mit Verlaufsdiagrammen, Gesamteinschätzung und State of Health, druckbar (A4, „Als PDF speichern“)
- Logbuch: Summen, Rekorde, Jahre, Orte (mit eigenen Namen), Tags
- Flugbuch zum Drucken: wann (von–bis), wo, mit welcher Drohne, mit Filtern für Drohne, Akku und Jahr
- Wartungs-Erinnerungen je Drohne nach Flugstunden oder Flügen

**Home-Assistant-Entitäten**
- Sensoren: Flüge, Flugzeit und Strecke gesamt, letzter Flug (Zeit, Dauer, Strecke, Maximalhöhe, Ladestand), Dateien in der Warteschlange und mit Fehler
- Ereignis „Neuer Flug“ für Automationen
- Je Drohne mit aktivem Wartungsplan: Binärsensor „Wartung fällig“ und Sensor „Flugstunden seit Wartung“; dazu einmalig je Wartungszyklus eine persistente Benachrichtigung
- Dienste `dronelog.reprocess` (Logs neu auswerten) und `dronelog.delete_flight`

### Voraussetzungen
- Home Assistant (entwickelt und getestet mit 2026.5)
- Für **verschlüsselte** DJI-Protokolle (ab Version 13, praktisch alle neueren Flüge) ein eigener, kostenloser **DJI-App-Key** aus dem [DJI-Entwicklerportal](https://developer.dji.com/user/apps) (App vom Typ „Open API“). Ohne Key sind nur ältere, unverschlüsselte Protokolle auswertbar.
- Optional die iOS-App **CopterInfo** für den automatischen Upload der Logs.

### Installation

**HACS (empfohlen):** HACS → Integrationen → ⋮ → „Benutzerdefinierte Repositories“ → `https://github.com/Xunil99/ha-dronelog`, Kategorie „Integration“ → „DroneLog“ installieren → Home Assistant neu starten.

**Manuell:** Den Ordner `custom_components/dronelog` in das Verzeichnis `custom_components` deiner Home-Assistant-Konfiguration kopieren und neu starten.

### Einrichtung
1. Einstellungen → Geräte & Dienste → Integration hinzufügen → **DroneLog**. Die Integration erzeugt einen **Pairing-Code** und zeigt ihn an (es ist nur eine Instanz möglich).
2. In der Integration unter „Konfigurieren“ trägst du deinen **DJI-App-Key** ein (wird nie wieder angezeigt; leer lassen = unverändert). Dort stellst du auch ein, ob Wetterdaten abgerufen werden, die Kachel-URL der Karte (Standard: OpenStreetMap) und ob ein neuer Pairing-Code erzeugt wird.
3. Das Panel **Drohnenflüge** erscheint in der Seitenleiste (nur für Administratoren).
4. In CopterInfo (Einstellungen → Home Assistant) trägst du die Adresse deines Home Assistant und den Pairing-Code ein. Die Vollversion der App schaltet den Sync frei.

### Logs hochladen
Die App lädt Logdateien per `POST /api/dronelog/upload` hoch (Header `Authorization: Bearer <Pairing-Code>`, `X-SHA256` mit dem SHA-256 der Datei, `X-Filename`; maximal 16 MiB). `GET /api/dronelog/ping` prüft Erreichbarkeit und Pairing-Code. Du kannst dieselbe Schnittstelle auch mit eigenen Skripten nutzen.

Die Rohdateien liegen unter `<Konfiguration>/dronelog/raw`, die Datenbank unter `<Konfiguration>/dronelog/dronelog.db`. Die Integration entschlüsselt mit dem DJI-Schlüsseldienst, speichert die erhaltenen Schlüssel je Flug und kann ältere Flüge später **offline** neu auswerten.

### Update-Hinweise
- Beim ersten Start nach einem Update mit neuer Auswertung (Analyse-Version 4) werden vorhandene Flüge einmalig im Hintergrund offline neu ausgewertet. Bei Fehlern bleibt der alte Flug unverändert; bei vielen Flügen dauert das einige Minuten.
- Die Datenbank wird automatisch erweitert. **Ein Downgrade auf eine ältere Version wird nicht unterstützt.**
- Nach einem Update das Panel im Browser hart neu laden.

### Datenschutz
- Alle Daten bleiben in deinem Home Assistant. Notizen, Ortsnamen und Wartungspläne liegen in der Datenbank der Integration.
- Nach außen verbindet sich die Integration nur mit dem DJI-Schlüsseldienst (dein App-Key und die verschlüsselten Schlüsselblöcke aus der Logdatei), optional mit Open-Meteo (gerundete Startposition für das Wetter) und im Browser mit dem Kartenkachel-Server, den du eingestellt hast.
- Der Upload-Endpunkt ist durch den Pairing-Code geschützt; verwende nach Möglichkeit HTTPS.

### Entwicklung
```bash
# Backend-Tests
pip install pytest-homeassistant-custom-component pydjirecord==1.3.0
pytest -q

# Frontend (Lit/TypeScript, Bundle nach custom_components/dronelog/frontend)
cd frontend
npm install
npm test
npm run build
```
Die Auswertungen (Ereignisse, Energie, Innenwiderstand, Flugphasen, Windhinweis) sind so definiert wie in der iOS-App CopterInfo; die Tests enthalten deren Referenzfälle.

### Lizenz
[MIT](LICENSE)

---

## English

### What it does

**Flight view**
- Flight list with filters for drone and battery and an "only with events" filter
- Map with flight path, colorable by height or radio signal, event markers, takeoff and landing
- Charts: height and speed, battery voltage, current, charge, cell deviation, battery temperature, pitch and roll, discharge curve, signal over time and distance, flight mode band
- Events and warnings: return to home due to battery or lost link, manual return, voltage warning, weak signal, GPS loss, propeller catapult
- Cards for energy (Wh, Wh/km), radio link, camera (photos, video time), flight phases, weather (Open-Meteo) and a wind hint from the aircraft's attitude
- Notes and tags per flight, export as CSV, GPX and KML

**Analysis**
- Statistics by month, drone and battery, heatmap of takeoff places
- Battery history per battery: health, charge cycles, cell deviation, temperature, internal resistance (rough estimate)
- Battery report with history charts, overall assessment and state of health, printable (A4, "Save as PDF")
- Logbook: totals, records, years, places (with your own names), tags
- Flight log book to print: when (from–to), where, with which drone, filters for drone, battery and year
- Maintenance reminders per drone by flight hours or flights

**Home Assistant entities**
- Sensors: flights, flight time and distance in total, last flight (time, duration, distance, max height, charge), files queued and in error
- "New flight" event for automations
- Per drone with an active maintenance plan: binary sensor "Maintenance due" and sensor "Flight hours since service", plus one persistent notification per maintenance cycle
- Services `dronelog.reprocess` and `dronelog.delete_flight`

### Requirements
- Home Assistant (developed and tested with 2026.5)
- For **encrypted** DJI logs (version 13 and up, practically all recent flights) your own free **DJI App Key** from the [DJI developer portal](https://developer.dji.com/user/apps) (app of type "Open API"). Without a key only older, unencrypted logs can be analyzed.
- Optionally the iOS app **CopterInfo** for automatic upload of the logs.

### Installation

**HACS (recommended):** HACS → Integrations → ⋮ → "Custom repositories" → `https://github.com/Xunil99/ha-dronelog`, category "Integration" → install "DroneLog" → restart Home Assistant.

**Manual:** copy the folder `custom_components/dronelog` into the `custom_components` directory of your Home Assistant configuration and restart.

### Setup
1. Settings → Devices & services → Add integration → **DroneLog**. The integration generates a **pairing code** and shows it (only one instance is possible).
2. Under "Configure" you enter your **DJI App Key** (never shown again; leave empty = unchanged). There you also choose whether weather is fetched, the map tile URL (default: OpenStreetMap) and whether a new pairing code is generated.
3. The **Drohnenflüge** panel appears in the sidebar (administrators only).
4. In CopterInfo (Settings → Home Assistant) enter the address of your Home Assistant and the pairing code. The app's full version unlocks the sync.

### Uploading logs
The app uploads log files with `POST /api/dronelog/upload` (header `Authorization: Bearer <pairing code>`, `X-SHA256` with the file's SHA-256, `X-Filename`; 16 MiB maximum). `GET /api/dronelog/ping` checks reachability and the pairing code. You can use the same interface with your own scripts.

Raw files are stored under `<config>/dronelog/raw`, the database under `<config>/dronelog/dronelog.db`. The integration decrypts via the DJI key service, stores the received keys per flight and can re-analyze older flights **offline** later.

### Update notes
- On the first start after an update with a new analysis (analysis version 4), existing flights are re-analyzed once in the background, offline. If something fails, the old flight stays unchanged; with many flights this takes a few minutes.
- The database is extended automatically. **Downgrading to an older version is not supported.**
- Hard-reload the panel in the browser after an update.

### Privacy
- All data stays in your Home Assistant. Notes, place names and maintenance plans are stored in the integration's database.
- Outbound, the integration only talks to the DJI key service (your App Key and the encrypted key blocks from the log file), optionally to Open-Meteo (rounded takeoff position for the weather) and, in your browser, to the map tile server you configured.
- The upload endpoint is protected by the pairing code; use HTTPS wherever possible.

### Development
```bash
# Backend tests
pip install pytest-homeassistant-custom-component pydjirecord==1.3.0
pytest -q

# Frontend (Lit/TypeScript, bundle goes to custom_components/dronelog/frontend)
cd frontend
npm install
npm test
npm run build
```
The analyses (events, energy, internal resistance, flight phases, wind hint) are defined as in the CopterInfo iOS app; the tests contain its reference cases.

### License
[MIT](LICENSE)
