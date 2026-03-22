# 🏗️ Architektur & Datenablage

## Ziele
- Trennung von Quellcode (Git) und Nutzerdaten (Home-Verzeichnis)
- Einfache Neuinstallation: nur `scripts/install.ps1` + API-Key
- Klare Pfade für Logs, Cache, Exporte und Backups

## Pfadübersicht
```
Repo (Git)
├─ src/                   # Code & Ressourcen
├─ docs/                  # Doku
├─ scripts/               # Utilities & Installer
└─ docker/                # Docker-Konfiguration

User Home (%USERPROFILE%/.jura-lm-app)
├─ config/.env            # Secrets & Laufzeit-Config
├─ database/              # SQLite-DB (Default)
├─ logs/                  # Rollierende Logs (7 Tage)
├─ cache/                 # Temporäre Dateien
├─ exports/               # Nutzer-Exporte
└─ user-profile/          # Einstellungen/Progress
```

## Konfiguration
- `.env` wird beim Installer erzeugt und via `Config.loadUserEnv()` geladen
- `Env` unterstützt Override-Map für .env Werte vor System-ENV
- Default DB: SQLite unter `%USERPROFILE%/.jura-lm-app/database/jura.db`
- Postgres via `DB_URL` / Auswahl im Installer

## Datenbank
- Connection Pool: HikariCP (Poolname `jurapp-ds`)
- Migrations: Flyway
  - Postgres: `classpath:db/migration/postgres`
  - SQLite: `classpath:db/migration/sqlite`
- Defaults: SQLite ohne Credentials; Postgres nutzt ENV/Profil

## Logging
- Logback schreibt nach `%USERPROFILE%/.jura-lm-app/logs`
- Rolling: täglich + 10MB, maxHistory=7
- Level via `LOG_LEVEL` (Default INFO)

## Installer Flow
1) Checks (Java, Maven)
2) Legt User-Verzeichnisse an
3) Fragt API-Key (optional) + DB-Wahl (SQLite/PG)
4) Schreibt `.env` in User-Home
5) Maven Build

## Cleanup & Backups
- `scripts/utilities/log-cleaner.ps1` (Log-Retention)
- `scripts/utilities/app-backup.ps1` (Zip der User-Home-Daten)
- `scripts/utilities/env-generator.ps1` (erneut .env anlegen)

## Sicherheit
- Secrets nur in `%USERPROFILE%/.jura-lm-app/config/.env`
- `.gitignore` schützt Logs, Dumps, Struktur-Exports, temp Files
- Keine Secrets im Repo
