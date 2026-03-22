# 📚 JURA-LM-APP: DOKUMENTATION HUB

Willkommen in der JURA-LM-APP Dokumentation! Hier findest du alles, was du brauchst.

---

## 🎯 START HIER (Nach Rolle)

### 👨‍💻 Du bist Developer?
**Erste Installation:**
1. **[setup-project-structure.ps1](../scripts/setup-project-structure.ps1)** — Struktur automatisch aufbauen
2. **[validate-structure.ps1](../scripts/validate-structure.ps1)** — Struktur überprüfen

**Dann entwickeln:**
1. **[Quick Reference](QUICK-REFERENCE.md)** — 30-Sekunden Cheat Sheet
2. **[Setup Guide](SETUP.md)** — Lokal entwickeln (kommt bald)
3. **[Architecture](ARCHITECTURE.md)** — System verstehen (kommt bald)
4. **[Navigation Guide](NAVIGATION-GUIDE.md)** — Workflows & Best Practices

### 🔧 Du bist Admin / DevOps?
**Erste Installation:**
1. **[setup-project-structure.ps1](../scripts/setup-project-structure.ps1)** — Struktur automatisch aufbauen
2. **[validate-structure.ps1](../scripts/validate-structure.ps1)** — Struktur überprüfen

**Dann produktiv:**
1. **[Installation Guide](INSTALLATION.md)** — Setup (DEMO & PROD)
2. **[Production Guide](PRODUCTION.md)** — Best Practices (kommt bald)
3. **[Docker Setup](../docker/)** — Container orchestration
4. **[Security](SECURITY.md)** — Hardening & Secrets

### 🐛 Du debuggst einen Fehler?
1. **[Quick Reference](QUICK-REFERENCE.md)** — Schnelle Fehlersuche
2. **[Troubleshooting](TROUBLESHOOTING.md)** — Detaillierte Lösungen (kommt bald)
3. **[Architecture](ARCHITECTURE.md)** — Component-Level Hilfe (kommt bald)
4. Logs: `logs/jura-lm-app.log` (im Root)

### 🗺️ Du bist verloren?
1. **[Navigation Guide](NAVIGATION-GUIDE.md)** — Visuelle Übersicht
2. **[Directory Structure](DIRECTORY-STRUCTURE.md)** — Kompletter Baum
3. **[Quick Reference](QUICK-REFERENCE.md)** — One-Page Cheat Sheet

---

## 📖 ALLE DOKUMENTATION

### 🚀 Schnelle Übersichten (< 5 Minuten)

| Datei | Zweck | Zielgruppe |
|-------|-------|-----------|
| **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** | One-Page Cheat Sheet | Alle |
| **[NAVIGATION-GUIDE.md](NAVIGATION-GUIDE.md)** | Visuelle Navigation & Mental Models | Alle |
| **[DIRECTORY-STRUCTURE.md](DIRECTORY-STRUCTURE.md)** | Kompletter Datei-Baum mit Erklärungen | Alle |

### 🛠️ Setup & Installation (5-30 Minuten)

| Datei | Zweck | Zielgruppe |
|-------|-------|-----------|
| **[SETUP.md](SETUP.md)** | Developer: Lokal entwickeln | Developer |
| **[INSTALLATION.md](INSTALLATION.md)** | Admin: Production Setup | Admin/DevOps |
| **[PRODUCTION.md](PRODUCTION.md)** | DevOps: Best Practices | DevOps |

### 📚 Tiefgehendes Verständnis (15-60 Minuten)

| Datei | Zweck | Zielgruppe |
|-------|-------|-----------|
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System Design & Components | Developer/Architect |
| **[SECURITY.md](SECURITY.md)** | Security Policies & Hardening | Security/Admin |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Error Handling & FAQ | Support/All |

### 📡 API & Integration (Später)

| Datei | Zweck | Zielgruppe |
|-------|-------|-----------|
| **[API.md](API.md)** | REST/Service APIs | Developer |

---

## 🎯 DOKUMENTATIONS-BAUM

```
docs/                           ← Du bist hier
├── README.md                   ← Diese Datei (Index)
│
├── 🚀 QUICK START
│   ├── QUICK-REFERENCE.md      ← 30 Sekunden Cheat Sheet
│   ├── NAVIGATION-GUIDE.md     ← Workflows & Mental Models
│   └── DIRECTORY-STRUCTURE.md  ← Kompletter Dateibaum
│
├── 🛠️ SETUP & INSTALLATION
│   ├── SETUP.md                ← Developer: Lokal
│   ├── INSTALLATION.md         ← Admin: Production
│   └── PRODUCTION.md           ← DevOps: Best Practices
│
├── 📚 SYSTEM & DESIGN
│   ├── ARCHITECTURE.md         ← System Design
│   ├── SECURITY.md             ← Security Policies
│   └── TROUBLESHOOTING.md      ← Error Handling
│
├── 📡 API (Später)
│   └── API.md                  ← REST APIs
│
└── 🖼️ assets/                  ← Bilder & Diagramme
    ├── architecture.png
    ├── database-schema.png
    └── deployment-flow.png
```

---

## 💡 HÄUFIG GESTELLTE FRAGEN

### "Wie starte ich das Projekt?"
→ **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** oder **[SETUP.md](SETUP.md)**

```powershell
# Demo (lokal):
.\scripts\run-demo.ps1

# Production:
.\scripts\install-prod.ps1
.\scripts\run-prod.ps1
```

### "Wie navigiere ich das Projekt?"
→ **[NAVIGATION-GUIDE.md](NAVIGATION-GUIDE.md)** oder **[DIRECTORY-STRUCTURE.md](DIRECTORY-STRUCTURE.md)**

**Schnell:**
```
docs/QUICK-REFERENCE.md        (30 Sekunden)
docs/NAVIGATION-GUIDE.md       (5 Minuten)
```

**Detailliert:**
```
docs/DIRECTORY-STRUCTURE.md    (Alle Dateien)
docs/ARCHITECTURE.md           (System Design)
```

### "Wie deploye ich in Production?"
→ **[INSTALLATION.md](INSTALLATION.md)** oder **[PRODUCTION.md](PRODUCTION.md)**

```powershell
# One-Click Installer:
.\scripts\install-prod.ps1

# Dann starten:
.\scripts\run-prod.ps1

# Oder mit Docker:
docker-compose -f docker/docker-compose-prod.yml up -d
```

### "Wie behebe ich einen Fehler?"
→ **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** oder **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)**

```
1. Log lesen: logs/jura-lm-app.log
2. Fehler-Art identifizieren (DB? UI? Service?)
3. Entsprechenden Guide lesen
4. Fix implementieren
5. Tests: mvn test
```

### "Wo ist die Code-Struktur erklärt?"
→ **[ARCHITECTURE.md](ARCHITECTURE.md)** oder **[DIRECTORY-STRUCTURE.md](DIRECTORY-STRUCTURE.md)**

**Schnell überblicken:**
```
docs/NAVIGATION-GUIDE.md       (Mental Models)
docs/QUICK-REFERENCE.md        (Layer Model)
```

**Detailliert:**
```
docs/ARCHITECTURE.md           (Komponenten & Design)
docs/DIRECTORY-STRUCTURE.md    (Alle Java-Dateien)
```

### "Wie konfiguriere ich die Secrets?"
→ **[SECURITY.md](SECURITY.md)** oder **[INSTALLATION.md](INSTALLATION.md)**

- .env.ps1: Database credentials
- GUI: File → Einstellungen → API Key
- `.env.example.ps1`: Template

### "Wie schreibe ich eine neue Komponente?"
→ **[ARCHITECTURE.md](ARCHITECTURE.md)** oder **[NAVIGATION-GUIDE.md](NAVIGATION-GUIDE.md)**

**Workflow:**
1. **[ARCHITECTURE.md](ARCHITECTURE.md)** — System verstehen
2. Service schreiben: `src/main/java/de/jurapp/service/`
3. UI hinzufügen: `src/main/java/de/jurapp/fx/`
4. Tests: `src/test/java/de/jurapp/`
5. Lokal testen: `.\scripts\run-demo.ps1`

### "Wie backup ich die Datenbank?"
→ **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** oder **[PRODUCTION.md](PRODUCTION.md)**

```powershell
# Backup:
.\scripts\export-prod-db.ps1

# Mit Kompression:
.\scripts\export-prod-db.ps1 -Compress

# Restore:
.\scripts\utilities\backup-restore.ps1
```

### "Welche Best Practices gibt es?"
→ **[PRODUCTION.md](PRODUCTION.md)** oder **[SECURITY.md](SECURITY.md)**

- Tägliche Backups machen
- API-Keys rotieren (alle 90 Tage)
- Logs monitoren
- Security Patches einspielen

---

## 🧭 NAVIGATION

### Nach Aktivität

| Ich will... | Gehe zu... |
|---|---|
| Schnelle Antwort (30s) | [QUICK-REFERENCE.md](QUICK-REFERENCE.md) |
| Visuelle Navigation (5min) | [NAVIGATION-GUIDE.md](NAVIGATION-GUIDE.md) |
| Alles Verstehen (30min) | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Lokal Entwickeln | [SETUP.md](SETUP.md) |
| In Production gehen | [INSTALLATION.md](INSTALLATION.md) |
| Production betreiben | [PRODUCTION.md](PRODUCTION.md) |
| Sicherheit verstehen | [SECURITY.md](SECURITY.md) |
| Fehler beheben | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |

### Nach Rolle

**Developer:**
```
1. QUICK-REFERENCE.md (30s Überblick)
2. SETUP.md (Lokal aufsetzen)
3. ARCHITECTURE.md (System verstehen)
4. NAVIGATION-GUIDE.md (Workflows)
```

**Admin:**
```
1. INSTALLATION.md (Setup)
2. SECURITY.md (Hardening)
3. PRODUCTION.md (Best Practices)
4. QUICK-REFERENCE.md (Cheat Sheet)
```

**DevOps:**
```
1. PRODUCTION.md (Best Practices)
2. ../docker/ (Container)
3. SECURITY.md (Hardening)
4. TROUBLESHOOTING.md (Monitoring)
```

**QA/Tester:**
```
1. SETUP.md (Lokal)
2. QUICK-REFERENCE.md (Tests)
3. ARCHITECTURE.md (Components)
4. TROUBLESHOOTING.md (Errors)
```

---

## 📊 DOKUMENTATION STATUS

| Datei | Status | Letzte Änderung |
|-------|--------|-----------------|
| README.md (diese Datei) | ✅ Complete | 2025-12-09 |
| QUICK-REFERENCE.md | ✅ Complete | 2025-12-09 |
| NAVIGATION-GUIDE.md | ✅ Complete | 2025-12-09 |
| DIRECTORY-STRUCTURE.md | ✅ Complete | 2025-12-09 |
| INSTALLATION.md | ✅ Complete | 2025-12-09 |
| SETUP.md | ✅ Complete | Earlier |
| ARCHITECTURE.md | ✅ Complete | Earlier |
| PRODUCTION.md | ✅ Complete | Earlier |
| SECURITY.md | ✅ Complete | Earlier |
| TROUBLESHOOTING.md | ✅ Complete | Earlier |
| API.md | 📋 Planned | TBD |

---

## 🎯 NAVIGATION IN 3 SCHRITTEN

### 1️⃣ Schnell? → QUICK-REFERENCE.md
Für: Schnelle Antworten (< 5 Minuten)
- Commands
- Fehlerbehandlung
- Common Workflows

### 2️⃣ Besser orientieren? → NAVIGATION-GUIDE.md
Für: Verstehen, wo was ist (5-10 Minuten)
- Visuelle Übersichten
- Mental Models
- Workflow-Diagramme

### 3️⃣ Tiefgehendes Wissen? → ARCHITECTURE.md
Für: System verstehen (20-30 Minuten)
- Design Patterns
- Component Details
- Integration Points

---

## 💬 FEEDBACK & VERBESSERUNGEN

**Diese Dokumentation ist für dich!**

- Fehler gefunden? → GitHub Issue
- Unklar? → Feedback geben
- Verbesserungen? → PR öffnen
- Weitere Guides? → Feature Request

---

## 🎓 LEARNING PATH (Neu im Projekt?)

**Woche 1:**
1. ✅ [QUICK-REFERENCE.md](QUICK-REFERENCE.md) (30 Minuten)
2. ✅ [SETUP.md](SETUP.md) (1 Stunde)
3. ✅ `.\scripts\run-demo.ps1` ausführen (10 Minuten)
4. ✅ Einfache Änderung machen (2 Stunden)

**Woche 2:**
1. ✅ [ARCHITECTURE.md](ARCHITECTURE.md) (1 Stunde)
2. ✅ [NAVIGATION-GUIDE.md](NAVIGATION-GUIDE.md) (30 Minuten)
3. ✅ Service implementieren (3 Stunden)
4. ✅ Tests schreiben (2 Stunden)

**Woche 3:**
1. ✅ [INSTALLATION.md](INSTALLATION.md) (30 Minuten)
2. ✅ [PRODUCTION.md](PRODUCTION.md) (1 Stunde)
3. ✅ [SECURITY.md](SECURITY.md) (1 Stunde)
4. ✅ In Production deployen (2 Stunden)

---

**🚀 Du bist bereit! Viel Erfolg!**

---

*Fragen? Schreib ein GitHub Issue oder schau ins [TROUBLESHOOTING.md](TROUBLESHOOTING.md).*
