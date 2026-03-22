# ❓ FAQ

**Wo liegt meine Datenbank?**  
Default unter `%USERPROFILE%/.jura-lm-app/database/jura.db` (SQLite). Für Postgres `DB_URL` setzen oder im Installer Option 2 wählen.

**Wie ändere ich den API-Key?**  
`%USERPROFILE%/.jura-lm-app/config/.env` bearbeiten (`PERPLEXITY_API_KEY`) und App neu starten.

**Wo finde ich Logs?**  
`%USERPROFILE%/.jura-lm-app/logs` (rollierend, 7 Tage). Log-Level per `LOG_LEVEL` in `.env`.

**Wie mache ich ein Backup?**  
`./scripts/utilities/app-backup.ps1` erstellt ein ZIP der gesamten User-Daten.

**Wie setze ich die Config zurück?**  
`./scripts/utilities/env-generator.ps1 -Force` erzeugt `.env` neu (fragt optional API-Key).

**Wie starte ich lokal?**  
`./scripts/run-demo.ps1` (nutzt SQLite, .env im User-Home). Für Postgres: `./scripts/run-prod.ps1` + passende `DB_URL`/Docker.
