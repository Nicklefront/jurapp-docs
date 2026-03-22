# ⚡ JURA-LM-APP: QUICK REFERENCE SHEET

## 🎯 ONE-PAGE CHEAT SHEET

### 📍 Wo finde ich was? (30 Sekunden)

```
Ich will...                          Gehe zu...                   Datei
─────────────────────────────────────────────────────────────────────────────
Projekt verstehen                    Root                         README.md
Lokal entwickeln starten            docs/ + scripts/             SETUP.md + run-demo.ps1
In Produktion gehen                 scripts/ + docs/             install-prod.ps1 + INSTALLATION.md
Systeem-Architektur lernen          docs/                        ARCHITECTURE.md
Feature/Service hinzufügen          src/main/java/.../service/   *Service.java
UI ändern                           src/main/java/.../fx/        *Controller.java
Datenbank-Schema ändern             src/main/resources/sql/      migrations/V*.sql
Fehler debuggen                     logs/ + src/main/java        jura-lm-app.log + Source
Test schreiben                      src/test/java                *Test.java
Backup machen                       scripts/ + postgres_backups/ export-prod-db.ps1
Secrets konfigurieren               scripts/                     .env.example.ps1
Performance-Probleme                docs/                        PRODUCTION.md
Sicherheits-Frage                   docs/                        SECURITY.md
Fehlerbehandlung                    docs/                        TROUBLESHOOTING.md
Visuelle Navigation                 docs/                        NAVIGATION-GUIDE.md
```

---

## 🚀 HÄUFIGSTE BEFEHLE (1-2 Sekunden)

### Erste Installation
```powershell
# Projektstruktur automatisch aufbauen
.\scripts\setup-project-structure.ps1

# Struktur validieren
.\scripts\validate-structure.ps1

# Mit Auto-Fix
.\scripts\validate-structure.ps1 -Fix
```

### Normale Arbeit
```powershell
# Demo starten (lokal)
.\scripts\run-demo.ps1

# Production starten
.\scripts\run-prod.ps1

# Production installieren (Wizard)
.\scripts\install-prod.ps1

# Database backup
.\scripts\export-prod-db.ps1

# Tests ausführen
mvn test

# App bauen
mvn clean package

# Docker Stack (Demo)
docker-compose up -d

# Docker Stack (Prod)
docker-compose -f docker/docker-compose-prod.yml up -d
```

---

## 📊 DATEIBAUM (Ultra-Kurz)

```
jura-lm-app/
├─ docs/                    ← Lesen
│  ├─ README.md
│  ├─ SETUP.md
│  ├─ INSTALLATION.md
│  ├─ ARCHITECTURE.md
│  ├─ NAVIGATION-GUIDE.md
│  ├─ QUICK-REFERENCE.md
│  └─ ...
├─ scripts/                 ← Ausführen
│  ├─ run-demo.ps1
│  ├─ run-prod.ps1
│  ├─ install-prod.ps1
│  ├─ export-prod-db.ps1
│  └─ ...
├─ docker/                  ← Bauen
│  ├─ Dockerfile
│  ├─ docker-compose.yml
│  └─ docker-compose-prod.yml
├─ src/main/java/           ← Code schreiben
│  ├─ service/              ← Geschäftslogik
│  ├─ fx/                   ← UI
│  ├─ data/                 ← Datenbank
│  └─ ...
├─ src/test/java/           ← Tests schreiben
├─ src/main/resources/sql/   ← DB-Migrationen
├─ logs/                     ← Fehler debuggen
└─ postgres_backups/         ← Backups
```

---

## 🎨 LAYER-MODELL (Visualisiert)

```
┌──────────────────────────┐
│  🎨 Presentation Layer   │  ← fx/         (UI Controllers)
├──────────────────────────┤
│  ⚙️  Service Layer       │  ← service/    (Geschäftslogik)
├──────────────────────────┤
│  🗄️  Data Layer         │  ← data/       (DB-Zugriff)
├──────────────────────────┤
│  📦 Domain Models        │  ← model/      (Datentypen)
├──────────────────────────┤
│  🔧 Utilities            │  ← util/, config/, tools/
└──────────────────────────┘
```

---

## 🔐 SECURITY CHECKLIST (Must-Do)

```
✅ Before Production:
  □ .env.ps1 erstellt (nicht committed)
  □ Database-Password stark (>12 chars)
  □ API-Key konfiguriert (falls genutzt)
  □ Logs auf ERROR überprüft
  □ Health-Check erfolgreich
  □ Backup funktioniert

✅ Regular:
  □ API-Keys rotieren (alle 90 Tage)
  □ Database-Backups machen (täglich)
  □ Logs archivieren (>30 Tage alte löschen)
  □ Dependency-Updates prüfen (monatlich)
```

---

## 🐛 SCHNELLE FEHLERBEHANDLUNG

| Problem | Lösung |
|---------|--------|
| App startet nicht | `logs/jura-lm-app.log` lesen |
| DB-Verbindung fehlt | `.env.ps1` prüfen (HOST, PORT, USER, PASS) |
| Port bereits in use | `netstat -ano \| findstr :8080` |
| Maven-Fehler | `mvn clean` + Cache clearen |
| UI nicht sichtbar | Browser-Cache leeren, localhost:8080 |
| Datenbank-Fehler | `schema.sql` re-apply, Backups prüfen |

---

## 📈 HÄUFIGSTE WORKFLOWS (30 Sekunden)

### 🆕 Neue Feature

```
1. Service: src/main/java/.../service/NewService.java
2. DB: src/main/resources/sql/migrations/VXX_*.sql
3. UI: src/main/java/.../fx/NewController.java
4. Test: src/test/java/.../NewServiceTest.java
5. Run: mvn clean test + .\scripts\run-demo.ps1
```

### 🐛 Bug Fix

```
1. Log lesen: logs/jura-lm-app.log
2. Source finden: src/main/java/.../
3. Fix + Test: Änderung + mvn test
4. Verify: .\scripts\run-demo.ps1
```

### 🚀 Deployment

```
1. Build: mvn clean package -DskipTests
2. Backup: .\scripts\export-prod-db.ps1
3. Install: .\scripts\install-prod.ps1
4. Verify: Health-Check + Logs prüfen
```

### 🐳 Docker Deployment

```
1. Build: docker build -f docker/Dockerfile -t jura-lm-app:latest .
2. Compose: docker-compose -f docker/docker-compose-prod.yml up -d
3. Verify: docker ps + docker logs <container>
4. Backup: .\scripts\export-prod-db.ps1
```

---

## 🎯 QUICK NAVIGATION HOTKEYS (IDE)

**IntelliJ IDEA:**
- `Ctrl+Shift+N` → Neue Klasse
- `Ctrl+N` → Neue Datei
- `Ctrl+Shift+F` → In Dateien suchen
- `Ctrl+Alt+L` → Code formatieren
- `Alt+F7` → Usages finden
- `Ctrl+Shift+O` → Import optimieren

**VS Code:**
- `Ctrl+Shift+P` → Command Palette
- `Ctrl+K Ctrl+O` → Folder öffnen
- `Ctrl+Shift+F` → In Dateien suchen
- `F5` → Debug starten

---

## 🔄 ENVIRONMENT SWITCHING

```powershell
# Demo-Umgebung
.\scripts\run-demo.ps1
# → Docker startet
# → Seed-Daten geladen (postgres/postgres)
# → App auf localhost:8080

# Production-Umgebung
# Erst: .\scripts\install-prod.ps1
# Dann: .env.ps1 mit echten Credentials
.\scripts\run-prod.ps1
# → Echte DB-Verbindung
# → Production-Logs
# → App auf konfiguriertem Port
```

---

## 📊 KEY METRICS (Was ist wichtig?)

| Metrik | Soll | Messung |
|--------|------|---------|
| App Startup Zeit | <30s | `time .\scripts\run-demo.ps1` |
| Test Coverage | >80% | `mvn jacoco:report` |
| DB Response Zeit | <100ms | Logs analysieren |
| Error Rate | <0.1% | Logs überprüfen |
| Backup-Alter | <24h | Cron/Task Scheduler |

---

## 🧠 MENTAL MODELS

### Model 1: "Wo ist was?"
```
FRAGE                ANTWORT
─────────────────────────────────────
Was ist mit Docs?   → docs/
Wie starte ich?     → scripts/
Was wird containerisiert? → docker/
Wo ist der Code?    → src/
Wo debugge ich?     → logs/
Visuelle Navigation → docs/NAVIGATION-GUIDE.md
```

### Model 2: "Was mache ich zuerst?"
```
1. Lesen    → docs/README.md oder SETUP.md oder INSTALLATION.md
2. Runnen   → scripts/run-*.ps1
3. Fixen    → src/main/java/
4. Testen   → src/test/java/ oder mvn test
5. Deployen → scripts/install-prod.ps1 oder docker-compose
```

### Model 3: "Welche Ebene betrifft mich?"
```
Problem          Ebene           Datei
─────────────────────────────────────────
UI-Bug           fx/             *Controller.java
Business-Logic   service/        *Service.java
DB-Fehler        data/           *Repository.java
Datentyp         model/          *.java
Performance      util/ + config/ *.java
Infra            docker/         Dockerfile oder docker-compose
```

---

## 💡 PRO TIPS

### Tipp 1: Schnelle Suche
```powershell
# In IDE: Ctrl+Shift+F (suche im Projekt)
# In PowerShell: Get-ChildItem -Recurse -Filter "*.java" -Name "AIService"
```

### Tipp 2: Schnelle Logs
```powershell
# Letzte 100 Zeilen:
Get-Content logs/jura-lm-app.log -Tail 100

# Mit Suche (nur ERROR):
Get-Content logs/jura-lm-app.log | Select-String "ERROR"

# Live watching:
Get-Content logs/jura-lm-app.log -Wait -Tail 50
```

### Tipp 3: Schnelles Build
```powershell
# Ohne Tests (schneller):
mvn clean package -DskipTests

# Nur Tests:
mvn test

# Mit Coverage:
mvn test jacoco:report
```

### Tipp 4: Docker Shortcuts
```powershell
# Status prüfen:
docker ps

# Logs ansehen:
docker logs -f <container-name>

# Container stoppen:
docker-compose down

# Production Stack:
docker-compose -f docker/docker-compose-prod.yml down
```

### Tipp 5: Database Backup
```powershell
# Vollständiger Backup:
.\scripts\export-prod-db.ps1

# Backup mit Kompression:
.\scripts\export-prod-db.ps1 -Compress

# Restore:
.\scripts\utilities\backup-restore.ps1
```

---

## 🎓 LEARNING PATH (Optimal)

**Woche 1:**
1. docs/README.md lesen
2. docs/SETUP.md folgen
3. .\scripts\run-demo.ps1 ausführen
4. docs/ARCHITECTURE.md lesen

**Woche 2:**
1. src/main/java/de/jurapp/service/ studieren
2. Kleine Änderung machen
3. Tests schreiben
4. docs/PRODUCTION.md lesen

**Woche 3:**
1. Production installieren (.\scripts\install-prod.ps1)
2. Docker mit docker-compose-prod.yml
3. docs/TROUBLESHOOTING.md durcharbeiten
4. Monitoring & Backup setup

---

## 📞 HELP & SUPPORT

| Frage | Antwort |
|-------|---------|
| Ich bin neu, wo fange ich an? | docs/README.md + docs/SETUP.md |
| Wie starte ich lokal? | .\scripts\run-demo.ps1 |
| Wie gehe ich in Prod? | .\scripts\install-prod.ps1 |
| Wo debugge ich? | logs/jura-lm-app.log |
| Wie schreibe ich Tests? | src/test/java/ + docs/ARCHITECTURE.md |
| Was ist mit Security? | docs/SECURITY.md |
| Wie backup ich? | .\scripts\export-prod-db.ps1 |
| Visuelle Navigation? | docs/NAVIGATION-GUIDE.md |
| Docker verwenden? | docker-compose.yml + Dockerfile |

---

## ⚠️ WICHTIGSTE REGELN

```
1. NEVER commit .env.ps1 (Secrets!)
2. NEVER commit logs/ oder postgres_backups/ (gitignore)
3. ALWAYS test lokal vor Prod-Deploy
4. ALWAYS backup DB vor Änderungen
5. READ logs wenn etwas fehlschlägt
6. UPDATE docs wenn du Architektur änderst
7. RUN mvn test vor jedem Commit
8. BACKUP täglich automatisieren
9. MONITOR Logs in Produktion
10. VERIFY Health-Check nach jedem Deploy
```

---

**🚀 Dieses Sheet sollte 80% deiner Fragen beantworten!**

**Wenn nicht:**
- → docs/ lesen (alle Guides dort)
- → logs/jura-lm-app.log prüfen (Fehlersuche)
- → GitHub Issues erstellen (Bugs)
