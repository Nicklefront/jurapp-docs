# 🚀 INSTALLATION GUIDE - JURA-LM-APP (Production)

## 📋 Inhaltsverzeichnis
1. [Systemanforderungen](#systemanforderungen)
2. [One-Click Installation](#one-click-installation)
3. [Manuelle Installation](#manuelle-installation)
4. [Konfiguration](#konfiguration)
5. [Backup & Recovery](#backup--recovery)
6. [Troubleshooting](#troubleshooting)
7. [Security Best Practices](#security-best-practices)

---

## 🖥️ Systemanforderungen

### Betriebssystem
- **Windows 10/11** (mit PowerShell 5.1+)
- **Linux** (Ubuntu 20.04+, CentOS 8+)
- **macOS** (10.15+)

### Software
- **Java 21+** (LTS recommended)
  ```bash
  java -version
  ```
  [Download](https://www.oracle.com/java/technologies/downloads/)

- **PostgreSQL 16+** (oder Docker)
  ```bash
  psql --version
  ```
  [Download](https://www.postgresql.org/download/)

- **Git 2.30+**
  ```bash
  git --version
  ```
  [Download](https://git-scm.com/)

### Hardware
| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 Cores | 4+ Cores |
| RAM | 4 GB | 8+ GB |
| Disk | 5 GB | 20+ GB |

---

## ⚡ One-Click Installation

### Schritt 1: Repository klonen
```powershell
git clone https://github.com/your-org/jura-lm-app.git
cd jura-lm-app
```

### Schritt 2: Installer ausführen
```powershell
\.\scripts\install.ps1
```

- Legt User-Verzeichnisse unter `%USERPROFILE%\.jura-lm-app` an (config, database, logs, cache, exports)
- Fragt EINMAL nach dem Perplexity API Key (optional)
- Erstellt `.env` in `%USERPROFILE%\.jura-lm-app\config\`
- Baut die Anwendung mit Maven
- SQLite ist Default (lokal); PostgreSQL kann ausgewählt werden (docker-compose-prod.yml)

### Schritt 3: Anwendung starten
```powershell
\.\scripts\run-demo.ps1   # lokal (SQLite)
# oder
\.\scripts\run-prod.ps1   # mit PostgreSQL/docker
```

App ist verfügbar unter: **http://localhost:8080**

---

## 🔧 Manuelle Installation

Falls der One-Click Installer nicht funktioniert:

### 1. `.env.ps1` erstellen
```powershell
cp .env.example.ps1 .env.ps1
# Editiere .env.ps1 mit deinen Daten
```

### 2. Datenbank initialisieren
```bash
# Mit psql:
psql -h localhost -U postgres -d juradb_prod -f src/main/resources/sql/schema.sql
psql -h localhost -U postgres -d juradb_prod -f src/main/resources/sql/seed-prod-data.sql

# Oder mit Docker:
docker-compose -f docker/docker-compose-prod.yml up -d
```

### 3. Anwendung bauen
```bash
./mvnw clean package -DskipTests -q
```

### 4. Anwendung starten
```bash
# Option A: Mit Script
.\run-prod.ps1

# Option B: Direkt mit Java
java -jar target/jura-lm-app-shaded.jar

# Option C: Mit Docker
docker-compose -f docker/docker-compose-prod.yml up
```

---

## ⚙️ Konfiguration

### `.env` (wird in `%USERPROFILE%\.jura-lm-app\config\` erstellt)

```properties
# Perplexity (optional)
PERPLEXITY_API_KEY=sk-proj-xxxxx
PERPLEXITY_API_URL=https://api.perplexity.ai/chat/completions
PERPLEXITY_MODEL=gpt-4o-mini
PERPLEXITY_TIMEOUT_SECONDS=30

# Database (Default SQLite)
DB_URL=jdbc:sqlite:%USERPROFILE%/.jura-lm-app/database/jura.db
DB_DRIVER=org.sqlite.JDBC
DB_USER=
DB_PASSWORD=
APP_ENV=LOCAL
ENV_NAME=LOCAL

# Paths
APP_HOME=%USERPROFILE%/.jura-lm-app
LOG_DIR=%USERPROFILE%/.jura-lm-app/logs
CACHE_DIR=%USERPROFILE%/.jura-lm-app/cache
EXPORT_DIR=%USERPROFILE%/.jura-lm-app/exports
LOG_LEVEL=INFO
```
# BACKUP
$env:BACKUP_PATH = "postgres_backups"
$env:BACKUP_RETENTION_DAYS = "30"
```

### In der App konfigurieren (GUI)
```
File → ⚙️ Einstellungen
├── AI Integration Tab
│   ├── API Key eingeben
│   ├── API URL (optional)
│   ├── Model wählen
│   └── Verbindung testen
└── UI Settings Tab
    ├── Theme (Light/Dark)
    └── Language (DE/EN)
```

---

## 💾 Backup & Recovery

### Backup exportieren
```powershell
# Manuell
.\export-prod-db.ps1 -Compress

# Automatisch (Task Scheduler/Cron)
# Windows: Task Scheduler → New Task
# Linux: crontab -e
# 0 2 * * * /opt/jura-lm-app/scripts/export-prod-db.ps1
```

### Wiederherstellung
```bash
# Mit psql
psql -h localhost -U postgres -d juradb_prod < postgres_backups/backup.sql

# Mit import-prod-db.ps1 (automatisch generiert)
.\import-prod-db.ps1
```

---

## 🐛 Troubleshooting

### Problem: "Java not found"
```powershell
java -version
# Falls nicht installiert: Download & Install
# https://www.oracle.com/java/technologies/downloads/
```

### Problem: "PostgreSQL connection refused"
```bash
# Check if running:
psql -U postgres -c "SELECT 1"

# Windows: net start postgresql
# Linux: sudo systemctl start postgresql
# macOS: brew services start postgresql
```

### Problem: "Maven build failed"
```bash
mvn clean
mvn package -DskipTests -X  # -X für verbose output
```

### Problem: "Port already in use"
```bash
# Find process:
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # Linux/macOS

# Kill process:
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # Linux/macOS

# Oder Port ändern:
$env:APP_PORT = "9090"
```

---

## 🔐 Security Best Practices

### 1. Environment Secrets
```powershell
# ✅ RICHTIG: Verschlüsselt speichern
# ❌ FALSCH: $password = "plaintext" in git commit
```

### 2. Database User
```sql
-- Erstelle limitierter DB-User:
CREATE USER juradb_app WITH PASSWORD 'strong_password_123!@#';
GRANT CONNECT ON DATABASE juradb_prod TO juradb_app;
GRANT USAGE ON SCHEMA public TO juradb_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO juradb_app;
```

### 3. API Keys Rotation
```bash
# Generiere neue Keys alle 90 Tage:
# 1. Neue API Key bei Perplexity/OpenAI erstellen
# 2. .env.ps1 updaten
# 3. App neustarten
# 4. Alte Key löschen
```

### 4. Firewall
```bash
# Nur Localhost (initial):
$env:APP_HOST = "127.0.0.1"

# Mit TLS/SSL (Production):
$env:SSL_ENABLED = "true"
$env:SSL_CERT_PATH = "/etc/ssl/certs/jura-lm.crt"
$env:SSL_KEY_PATH = "/etc/ssl/private/jura-lm.key"
```

---

## ✅ Verifikation der Installation

```powershell
# 1. App läuft?
curl http://localhost:8080

# 2. Datenbank verbunden?
psql -U postgres -d juradb_prod -c "SELECT COUNT(*) FROM norm;"

# 3. Logs sauber?
Get-Content logs/jura-lm-app.log | tail -20

# 4. Web-UI erreichbar?
Start-Process "http://localhost:8080"
```

---

## 📞 Support

- **Dokumentation**: `/docs/ARCHITECTURE.md`
- **Issues**: GitHub Issues
- **Contact**: admin@jura-lm-app.de

---

**Status: Production Ready! 🚀**

Last Updated: 2025-12-09
