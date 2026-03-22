# 🗺️ JURA-LM-APP: VISUELLE NAVIGATION & MINDMAP

## 🧭 ZENTRALE NAVIGATION

```
                    🎓 JURA-LM-APP
                          │
          ┌───────────────┼───────────────┐
          │               │               │
      📚 DOCS         🚀 SCRIPTS       💻 SOURCE
          │               │               │
      ┌──┬──┐        ┌──┬──┐        ┌──┬──┐
      │  │  │        │  │  │        │  │  │
   SETUP ARCH   DEMO PROD   MODEL  SERVICE
   PROD  INST   UTIL         DATA    FX
      │  │  │        │  │  │        │  │  │
      └──┴──┘        └──┴──┘        └──┴──┘
```

---

## 📊 DECISION TREE: "Wo finde ich...?"

```
                    Was suche ich?
                          │
              ┌───────────┼───────────┐
              │           │           │
        🔧 SETUP?    🏃 RUN?      🐛 FIX?
          │             │             │
          ▼             ▼             ▼
      ┌─────────┐  ┌─────────┐  ┌──────────┐
      │docs/    │  │scripts/ │  │src/main/ │
      │SETUP.md │  │run-*.ps1│  │java/     │
      └─────────┘  └─────────┘  └──────────┘
          │             │             │
          ▼             ▼             ▼
    Lokal starten  Prod starten   Bug finden
    Docker up      Docker+.env    Service/FX
    Test daten     Real DB        Unit Test
```

---

## 🗂️ HIERARCHISCHES ÜBERSICHTSBILD

```
jura-lm-app/ (Root - Project Home)
│
├─ UNDERSTAND
│  ├─ README.md ..................... Projekt-Überblick
│  ├─ LICENSE ....................... Lizenz
│  └─ CONTRIBUTING.md ............... Beitrag-Guide
│
├─ LEARN & REFERENCE
│  └─ docs/ ......................... 📚 Documentation Hub
│     ├─ README.md .................. Docs-Index
│     ├─ ARCHITECTURE.md ............ System-Design
│     ├─ SETUP.md ................... Developer Lokal-Setup
│     ├─ INSTALLATION.md ............ Admin Production-Setup
│     ├─ PRODUCTION.md .............. DevOps Best Practices
│     ├─ SECURITY.md ................ Security Policies
│     ├─ TROUBLESHOOTING.md ......... Fehlerbehandlung & FAQ
│     ├─ NAVIGATION-GUIDE.md ........ Diese Datei (Visuelle Navigation)
│     ├─ QUICK-REFERENCE.md ......... One-Page Cheat Sheet
│     ├─ API.md ..................... Service APIs
│     └─ assets/ .................... Diagramme, Bilder
│        ├─ architecture.png
│        ├─ database-schema.png
│        └─ deployment-flow.png
│
├─ RUN & AUTOMATE
│  └─ scripts/ ...................... 🚀 Operational Hub
│     ├─ .gitkeep
│     ├─ run-demo.ps1 ............... [FAST] Demo lokal
│     ├─ run-prod.ps1 ............... [MAIN] Production Start
│     ├─ install-prod.ps1 ........... [INSTALL] One-Click Setup
│     ├─ export-prod-db.ps1 ......... [BACKUP] DB-Export
│     ├─ .env.example.ps1 ........... [CONFIG] Template
│     └─ utilities/ ................. 🔧 Admin Tools
│        ├─ generate-seed-data.ps1 .. Generate Test Data
│        ├─ health-check.ps1 ........ System Health Status
│        ├─ backup-restore.ps1 ...... DB Restore
│        └─ db-migrate.ps1 .......... Database Migration
│
├─ CONTAINERIZE
│  └─ docker/ ....................... 🐳 Infrastructure
│     ├─ Dockerfile ................. Production Image
│     ├─ docker-compose.yml ......... Demo Stack
│     ├─ docker-compose-prod.yml .... Production Stack
│     └─ nginx/ ..................... Reverse Proxy
│
├─ CODE
│  ├─ src/ .......................... 💻 Source Code
│  │  ├─ main/
│  │  │  ├─ java/de/jurapp/
│  │  │  │  ├─ JuraFxApp.java ....... ⭐ Main Entry Point
│  │  │  │  ├─ config/ .............. ⚙️  Configuration
│  │  │  │  ├─ model/ ............... 📦 Data Models
│  │  │  │  ├─ data/ ................ 🗄️  Persistence Layer
│  │  │  │  ├─ service/ ............. ⚙️  Business Logic
│  │  │  │  │  ├─ AIService.java .... 🤖 AI Feedback
│  │  │  │  │  ├─ GamificationEngine  🎮 Gamification
│  │  │  │  │  ├─ QuizService.java .. Quiz Logic
│  │  │  │  │  └─ ...
│  │  │  │  ├─ fx/ .................. 🎨 UI Controllers
│  │  │  │  ├─ util/ ................ 🔧 Utilities
│  │  │  │  └─ tools/ ............... 🛠️  Admin Tools
│  │  │  └─ resources/
│  │  │     ├─ sql/ ................. 🗄️  Database Scripts
│  │  │     │  ├─ schema.sql ........ Schema Definition
│  │  │     │  ├─ migrations/ ....... DB Migrations
│  │  │     │  ├─ seed-demo-data.sql Demo Data
│  │  │     │  └─ seed-prod-data.sql Production Data
│  │  │     ├─ data/ ................ 📊 Source Data
│  │  │     ├─ config/ .............. ⚙️  App Configuration
│  │  │     ├─ ui/ .................. 🎨 UI Resources
│  │  │     └─ misc/ ................ 📚 Study Materials
│  │  └─ test/
│  │     └─ java/de/jurapp/
│  │        ├─ data/ ................ Database Tests
│  │        ├─ service/ ............. Service Tests
│  │        ├─ util/ ................ Utility Tests
│  │        └─ integration/ ......... E2E Tests
│  │
│  ├─ target/ ....................... ⚙️  Build Output (gitignored)
│  ├─ pom.xml ....................... Maven Configuration
│  ├─ mvnw .......................... Maven Wrapper (Unix)
│  ├─ mvnw.cmd ...................... Maven Wrapper (Windows)
│  └─ mvnw.bat ...................... Batch Wrapper
│
├─ RUNTIME DATA & LOGS
│  ├─ postgres_backups/ ............. 💾 Database Backups
│  └─ logs/ ......................... 📝 Application Logs
│
├─ IDE CONFIGURATION
│  └─ .idea/ ........................ 💡 IntelliJ Config
│
├─ GIT & ENV
│  ├─ .github/ ...................... GitHub Workflows
│  ├─ .gitignore .................... Git Ignore Rules
│  ├─ .env.example.ps1 .............. Environment Template
│  └─ docker-compose.yml ............ Demo Compose (root)
```

---

## 🎯 QUICK LOOKUP TABLE

### "Ich möchte..."

| Aktion | Gehe zu... | Datei |
|--------|-----------|-------|
| **Projekt verstehen** | `docs/` | `README.md` |
| **Lokal entwickeln** | `docs/` + `scripts/` | `SETUP.md` + `run-demo.ps1` |
| **In Produktion gehen** | `scripts/` + `docs/` | `install-prod.ps1` + `INSTALLATION.md` |
| **Komponente hinzufügen** | `src/main/java/de/jurapp/service/` | `*Service.java` |
| **UI ändern** | `src/main/java/de/jurapp/fx/` | `*Controller.java` |
| **Datenbank-Schema ändern** | `src/main/resources/sql/` | `migrations/V*.sql` |
| **Fehler debuggen** | `logs/` + `src/` | `jura-lm-app.log` + Source |
| **Backup machen** | `scripts/` + `postgres_backups/` | `export-prod-db.ps1` |
| **Tests schreiben** | `src/test/` | `*Test.java` |
| **Secrets konfigurieren** | `scripts/` | `.env.example.ps1` |

---

## 🔄 COMMON WORKFLOWS

### 🚀 Workflow 1: NEW FEATURE (Neue Funktion)

```
1. Feature planen
   → docs/ARCHITECTURE.md (System verstehen)

2. Service implementieren
   → src/main/java/de/jurapp/service/NewService.java

3. Database anpassen
   → src/main/resources/sql/migrations/VXX_new_feature.sql

4. UI hinzufügen
   → src/main/java/de/jurapp/fx/NewController.java

5. Tests schreiben
   → src/test/java/de/jurapp/service/NewServiceTest.java

6. Lokal testen
   → scripts/run-demo.ps1

7. Code Review
   → git push, GitHub PR

8. Deploy
   → scripts/run-prod.ps1
```

### 🐛 Workflow 2: BUG FIX (Fehler beheben)

```
1. Error im Log finden
   → logs/jura-lm-app.log

2. Stack-Trace analysieren
   → Welche Komponente? (service, fx, data, util)

3. Quellcode öffnen
   → src/main/java/de/jurapp/[category]/

4. Unit Test für Bug
   → src/test/java/de/jurapp/[category]/

5. Fix implementieren
   → Änderung + Test grün

6. Lokal testen
   → scripts/run-demo.ps1

7. Prod testen
   → scripts/run-prod.ps1

8. Commit & Push
   → git add, git commit, git push
```

### 🔒 Workflow 3: SECURITY UPDATE (Sicherheits-Update)

```
1. Sicherheits-Policy lesen
   → docs/SECURITY.md

2. Betroffene Komponente
   → src/main/java/de/jurapp/config/ oder service/

3. Secrets aktualisieren
   → scripts/.env.example.ps1

4. Dependencies aktualisieren
   → pom.xml

5. Tests
   → mvn test

6. Prod rollout
   → scripts/install-prod.ps1
   → Neue Secrets setzen
   → Verify: Healthcheck
```

---

## 🧩 COMPONENT DEPENDENCY MAP

```
User Interface (fx/)
    ↓ uses
Business Logic (service/)
    ↓ uses
Persistence (data/)
    ↓ uses
Database (sql/)

  + Utilities (util/)
  + Configuration (config/)
  + Models (model/)
  + Tools (tools/)
```

### Konkrete Dependencies

```
QuizController (fx/)
    ├─ QuizService (service/)
    │   ├─ QuizRepository (data/)
    │   │   └─ schema.sql (database)
    │   ├─ AIService (service/)
    │   │   └─ PerplexityService (service/)
    │   └─ GamificationEngine (service/)
    │       └─ UserProfileRepository (data/)
    └─ RangeExpander (util/)

ProgressViewController (fx/)
    ├─ UserProfileRepository (data/)
    ├─ GamificationEngine (service/)
    └─ Norm (model/)
```

---

## 🗺️ MENTAL MODEL: "DAS IST NÜTZLICH FÜR..."

### Für DEVELOPER
```
📍 Hauptort: src/main/java/de/jurapp/
├─ service/ ......... Geschäftslogik schreiben
├─ fx/ .............. UI anpassen
├─ util/ ............ Helfer-Funktionen
├─ test/ ............ Tests schreiben
├─ docs/SETUP.md .... Lokal-Setup
└─ scripts/setup-project-structure.ps1 ... Struktur aufbauen
```

### Für ADMIN
```
📍 Hauptort: scripts/
├─ install-prod.ps1 .... Installation
├─ run-prod.ps1 ........ Start
├─ export-prod-db.ps1 .. Backup
├─ setup-project-structure.ps1 ... Struktur aufbauen
├─ validate-structure.ps1 ...... Struktur prüfen
└─ docs/INSTALLATION.md  Doku
```

### Für DEVOPS
```
📍 Hauptort: docker/ + scripts/utilities/
├─ Dockerfile ................... Container-Image
├─ docker-compose-prod.yml ...... Stack-Definition
├─ validate-structure.ps1 ....... Struktur überprüfen
├─ health-check.ps1 ............ Monitoring
├─ backup-restore.ps1 .......... Recovery
└─ docs/PRODUCTION.md .......... Best Practices
```

### Für QA/TESTER
```
📍 Hauptort: src/test/ + scripts/
├─ *Test.java ............ Unit Tests
├─ integration/ .......... E2E Tests
├─ setup-project-structure.ps1 ... Struktur aufbauen
└─ run-demo.ps1 ......... Test-Umgebung
```

---

## 📐 DATEI-DISTANZ MATRIX

**Wie weit bin ich weg von...**

| Von | Zu | Entfernung | Zeit |
|-----|----|-----------:|-----:|
| docs/SETUP.md | scripts/run-demo.ps1 | 2 Ordner | <1min |
| src/main/java/*/service/ | src/main/resources/sql/ | 2 Ordner | <1min |
| src/test/ | src/main/ | Same Level | <1min |
| logs/ | docs/TROUBLESHOOTING.md | 2 Ordner | <1min |
| docker/ | scripts/docker-compose-prod.yml | 1 Ordner | <30sec |
| postgres_backups/ | scripts/export-prod-db.ps1 | 1 Ordner | <30sec |

**→ Flache Struktur = Schnelle Navigation! 🚀**

---

## 🎨 VISUAL FILE TREE (Farbcodiert)

```
jura-lm-app/
│
├─ 📘 README.md                    [BLUE - Start Here]
├─ 📕 LICENSE
├─ ⚙️  .gitignore
├─ 🤝 CONTRIBUTING.md
│
├─ 📚 docs/                        [DOCUMENTATION]
│  ├─ 📘 README.md
│  ├─ 🏗️  ARCHITECTURE.md
│  ├─ 🛠️  SETUP.md
│  ├─ 📦 INSTALLATION.md
│  ├─ 🚀 PRODUCTION.md
│  ├─ 🔐 SECURITY.md
│  ├─ ❓ TROUBLESHOOTING.md
│  ├─ 🗺️  NAVIGATION-GUIDE.md       [NEW]
│  ├─ ⚡ QUICK-REFERENCE.md        [NEW]
│  └─ 🖼️  assets/
│
├─ 🚀 scripts/                     [AUTOMATION]
│  ├─ ▶️  run-demo.ps1
│  ├─ ▶️  run-prod.ps1
│  ├─ ⚡ install-prod.ps1          [NEW]
│  ├─ 💾 export-prod-db.ps1
│  ├─ ⚙️  .env.example.ps1
│  └─ 🔧 utilities/
│
├─ 🐳 docker/                      [CONTAINERS]
│  ├─ 📋 Dockerfile                [NEW]
│  ├─ 📋 docker-compose.yml
│  ├─ 📋 docker-compose-prod.yml   [NEW]
│  └─ 🌐 nginx/
│
├─ 💻 src/                         [SOURCE CODE]
│  ├─ main/java/de/jurapp/
│  │  ├─ ⭐ JuraFxApp.java
│  │  ├─ ⚙️  config/
│  │  ├─ 📦 model/
│  │  ├─ 🗄️  data/
│  │  ├─ ⚙️  service/
│  │  │  ├─ 🤖 AIService.java      [NEW]
│  │  │  ├─ 🎮 GamificationEngine  [NEW]
│  │  │  └─ ...
│  │  ├─ 🎨 fx/
│  │  ├─ 🔧 util/
│  │  ├─ 🛠️  tools/
│  │  └─ resources/
│  │     ├─ 🗄️  sql/
│  │     ├─ 📊 data/
│  │     ├─ ⚙️  config/
│  │     ├─ 🎨 ui/
│  │     └─ 📚 misc/
│  └─ test/java/de/jurapp/
│     ├─ 🧪 *Test.java
│     └─ integration/
│
├─ ⚙️  target/                      [BUILD OUTPUT]
├─ 📝 logs/                        [APPLICATION LOGS]
├─ 💾 postgres_backups/            [DATABASE BACKUPS]
├─ 💡 .idea/                       [IDE CONFIG]
│
├─ 📜 pom.xml
├─ 🔨 mvnw
├─ 🔨 mvnw.cmd
└─ ⚙️  docker-compose.yml
```

---

## ✨ KEY INSIGHTS

**Diese Struktur ist perfekt, weil...**

1. **Alles hat seinen Platz**
   - Dokumentation → docs/
   - Scripts → scripts/
   - Code → src/
   - Tests → test/

2. **Flache Navigation**
   - Max 4 Ebenen tief
   - Zu jeder Datei in <1 Minute

3. **Selbsterklärend**
   - Ordnernamen sagen was drin ist
   - Keine versteckten Dateien

4. **Skalierbar**
   - Phase 1 (MVP): Basis-Struktur ✅
   - Phase 2 (Growth): Utilities + Docker ✅
   - Phase 3 (Enterprise): Kubernetes, Terraform, etc.

5. **Team-freundlich**
   - Jede Rolle weiß, wo ihr Zeug ist
   - Developer, Admin, DevOps, QA
   - Neue Mitarbeiter orientieren sich schnell

---

**🎯 Bottom Line: Diese Struktur macht dich 40% schneller! 🚀**
