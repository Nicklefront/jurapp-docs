# Input → Output → Architecture Map

> **Purpose:** Single-reference document mapping every directory and key file to its produced artifact, runtime behavior, and architectural role. Use this for onboarding, documentation audits, and understanding the build/deploy pipeline end-to-end.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Source Code — `src/main/java/`](#source-code--srcmainjava)
3. [Resources — `src/main/resources/`](#resources--srcmainresources)
4. [Backend Module — `jurapp-backend/`](#backend-module--jurapp-backend)
5. [CI/CD Pipelines — `.github/workflows/`](#cicd-pipelines--githubworkflows)
6. [Container Orchestration — Docker Compose](#container-orchestration--docker-compose)
7. [Infrastructure — `nginx/`, `keycloak/`, `deploy/`](#infrastructure--nginx-keycloak-deploy)
8. [Build Configuration — `pom.xml` / `src_pom.xml`](#build-configuration--pomxml--src_pomxml)
9. [Scripts — `scripts/`](#scripts--scripts)
10. [Documentation — `docs/`](#documentation--docs)
11. [Aggregate Pipeline Summary](#aggregate-pipeline-summary)
12. [Key Artifacts Table](#key-artifacts-table)

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                        DEVELOPER / CI                                │
│  src/main/java/  ──┐                                                 │
│  src/main/resources/ ─┤ Maven build ──→ JAR artifacts               │
│  jurapp-backend/ ──┘          │                                      │
│                               │                                      │
│  .github/workflows/ ──────────┼──→ CI (test) → Docker image → VPS  │
│                               │           └──→ Native installers    │
│                               │           └──→ GitHub Pages         │
└───────────────────────────────┼──────────────────────────────────────┘
                                │
          ┌─────────────────────┴────────────────────────┐
          │               RUNTIME TIERS                  │
          │                                              │
          │  Desktop (local)          Production         │
          │  ───────────────          ──────────         │
          │  JavaFX GUI               nginx (TLS)        │
          │  SQLite DB                 └─ backend:8080   │
          │  Perplexity AI ◄──────────  └─ keycloak:8180 │
          │                            └─ PostgreSQL     │
          └──────────────────────────────────────────────┘
```

---

## Source Code — `src/main/java/`

### Package Map

| Package | Key Files | Produces at Runtime | Pipeline Role |
|---------|-----------|---------------------|---------------|
| `de.jurapp.app` | `JuraAssistant.java` | Application bootstrap; launches JavaFX stage | Entry point for desktop JAR |
| `de.jurapp.config` | `Config.java`, `AppSettings.java`, `Env.java`, `EnvironmentProfile.java`, `AppPaths.java` | Runtime configuration object; DB URL, API keys, profile detection | Consumed by every layer; read from `application*.properties` |
| `de.jurapp.fx` | `JuraFxApp.java`, `MainLayoutController.java`, `MainWorkbenchController.java` | Main application window, tab layout, scene graph | Presentation tier; loads FXML from resources; owns `RepositoryFactory` static field |
| `de.jurapp.fx` — controllers | `CaseLearningController.java`, `CaseCoachController.java`, `SearchController.java`, `FulltextSearchController.java`, `LoginController.java`, `ParagraphSearchController.java`, `SettingsController.java` | Individual screen controllers bound to FXML | Each controller ↔ one FXML file; manages UI events & service calls |
| `de.jurapp.fx` — legacy | `MainController.java`, `LegacyCaseLearningController.java`, `LegacyCaseLearningFxmlController.java`, `LegacySearchController.java`, `MarkdownEditorPopup.java`, `FallReviewDialog.java` | Deprecated/legacy controllers kept for reference | Not part of active navigation; superseded by fx.dialogs / sub-package versions |
| `de.jurapp.fx.base` | `InitializableWithServices.java` | DI contract interface | Implemented by tool controllers to receive `DatabaseManager` injection |
| `de.jurapp.fx.components` | `AIComparisonPanel.java`, `AIComparisonPanelController.java`, `AIExplorerLauncher.java`, `AIGhostPanelComponent.java`, `AnspruchCardController.java`, `AnspruchPaneBuilder.java`, `CaseStatusIndicators.java`, `DragAndDropAnspruchPane.java`, `DraggableAnspruchContainer.java`, `InlineTitleEditor.java`, `ParagraphHighlighter.java`, `PhaseEditorComponent.java`, `PhaseEditorController.java`, `StatusBarController.java` | Reusable UI widgets embedded in larger screens | Sub-components; injected into parent FXML or instantiated programmatically |
| `de.jurapp.fx.dialogs` | `FallReviewDialogController.java`, `ManageCoursesDialogController.java`, `MarkdownEditorController.java`, `SettingsDialogController.java` | Modal dialogs bound to `fxml/dialogs/*.fxml` | Pop-up utilities; do not navigate; close on confirm/cancel |
| `de.jurapp.fx.tools` | `CaseLearningViewController.java`, `DbExplorerController.java`, `ProgressViewController.java` | Developer/admin tool screens bound to `fxml/tools/*.fxml` | Admin UI; not part of production user flow; launched via developer menu |
| `de.jurapp.fx.window` | `CasesExplorerWindow.java` | Secondary window host | Wraps `CasesExplorerController` in a Stage; opened on demand |
| `de.jurapp.fx.windows` | `CasesExplorerController.java` | Secondary window controller for browsing all cases | Bound to `fxml/windows/cases_explorer.fxml`; reads `FallRepository` |
| `de.jurapp.fx.styles` | `CourseThemeUtil.java`, `HighContrastTheme.java`, `TooltipAutoInstaller.java` | Theme application and styling utilities | Consumed by controllers; applies CSS themes and configures tooltips |
| `de.jurapp.model` | `Norm.java`, `Fall.java`, `Bereich.java`, `Anspruch.java`, `Phase.java`, `TutorSessionEntry.java`, `CaseSession.java`, `LearningStatistics.java`, `CoachingExample.java`, `Course.java`, `UserCourse.java`, `UserNormAnnotation.java` | Plain domain objects (POJOs) passed between layers | No direct DB access; serialized to/from JSON and SQLite |
| `de.jurapp.model.metadata` | Case metadata domain objects | Case tagging, classification metadata | Used by `CaseMetadataRepository` and categorization features |
| `de.jurapp.model.rag` | RAG domain objects | Context packets sent to AI service | Input to `AIService`; output of norm retrieval |
| `de.jurapp.data` | `DatabaseManager.java`, `NormRepository.java`, `NormRepositoryInterface.java`, `FallRepository.java`, `FallbereichRepository.java`, `AnspruchRepository.java`, `ClaimBasisRepository.java`, `ClaimStepRepository.java`, `ClaimStepBlockRepository.java`, `ClaimStepNormRefRepository.java`, `ClaimNormChainRepository.java`, `UserNormChainRepository.java`, `UserNormAnnotationRepository.java`, `CaseMetadataRepository.java`, `CoachingExampleRepository.java`, `CourseRepository.java`, `CourseRelevanceRepository.java`, `UserCourseRepository.java`, `FallAiRunRepository.java`, `LearningProgressRepository.java`, `TutorSessionRepository.java`, `TutorSessionSettingsRepository.java`, `NormDataInitializer.java`, `SimpleDataSource.java`, `BgbXmlParser.java`, `ThemenfelderParser.java` | SQL queries via HikariCP; returns domain model objects | Data access layer; talks to SQLite (desktop) or PostgreSQL (prod) |
| `de.jurapp.data` — remote repos | `ClaimStepUnitRepository.java`, `ClaimStepUnitBlockRepository.java`, `FallRepositoryInterface.java`, `HttpFallRepository.java`, `RepositoryFactory.java` | Repository abstraction; factory selects local vs. HTTP impl | `RepositoryFactory.local(dataSource)` used at LOCAL startup; `RepositoryFactory.remote(apiClient)` created after login — both exposed via `JuraFxApp.getRepositoryFactory()` |
| `de.jurapp.data.import_services` | `FallImportService.java`, `MarkdownFallImporter.java`, `SyncQueueService.java` | Case import pipeline from markdown files; offline sync queue | Used during case file import and offline-to-online sync |
| `de.jurapp.data.repositories` | `DraftSolutionRepository.java` | Draft solution persistence | Stores user draft solutions before submission |
| `de.jurapp.service` | `AIService.java`, `PerplexityService.java`, `AIPersistenceService.java`, `AIPromptLibrary.java`, `AIFunctionTooltipService.java` | Perplexity API HTTP calls; stores AI results in DB; function tooltip registration | AI integration tier; called from coaching controllers |
| `de.jurapp.service` — case | `CaseService.java`, `CaseCoachingService.java`, `CaseValidationService.java`, `CaseAnalyzer.java`, `CaseImportService.java`, `CaseApiService.java`, `ClaimApiService.java`, `FallbereichService.java`, `DataConsolidationService.java`, `FeedbackService.java`, `FallInitService.java`, `FallReviewCallback.java` | Case CRUD, validation rules, import pipeline, REST client, feedback | Business logic; bridges controllers ↔ repositories |
| `de.jurapp.service` — data loading | `BGBXMLLoader.java`, `BereichLoader.java`, `BereichNormMapper.java`, `NormXmlImportService.java`, `NormRetrievalService.java`, `FullTextSearchEngine.java` | Parses BGB XML → inserts `Norm` rows into DB; full-text search engine | Import pipeline and search tier |
| `de.jurapp.service` — file I/O | `FallFileImportService.java`, `FileIndexService.java`, `ImportArchiveService.java`, `MarkdownParagraphExtractor.java` | Reads markdown/zip case files; indexes for full-text search | Populates `fall_file_index` table; enables keyword search |
| `de.jurapp.service` — auth | `AuthService.java`, `TokenStore.java`, `ApiClient.java` | JWT acquisition from backend (`POST /api/auth/login`); in-memory + file token storage; HTTP client with auto Bearer attach and 401 retry | Auth tier; `AuthService` called from `LoginController`; `ApiClient` passed to `RepositoryFactory.remote()` |
| `de.jurapp.service` — UI support | `ColorSchemeService.java` | Applies CSS color scheme / high-contrast theme at runtime | Called from startup and settings change; swaps stylesheets on scene |
| `de.jurapp.service.base` | `BaseService.java`, `ServiceException.java` | Common service base class and typed exception | Inherited by services that need consistent error handling |
| `de.jurapp.util` | `TextNormalizer.java`, `ParagraphValidator.java`, `ParagraphExtractor.java`, `RangeExpander.java`, `ThemenfeldParser.java` | Stateless helper functions for text and data processing | Utility layer; no DB, no network |
| `de.jurapp.tools` | `DatabaseHealthCheck.java`, `RunMigrations.java`, `CheckDatabase.java`, `DbIntegrityChecker.java`, `NativeDbChecker.java`, `SimpleDbChecker.java`, `BgbDataImporter.java`, `YamlThemenfelderImporter.java`, `ImportCoachingExamples.java` | Admin CLI programs; run standalone | DevOps tooling; not part of production runtime |
| `de.jurapp.caseframe` | `domain/`, `application/`, `infrastructure/` sub-packages | DDD-style bounded context for case-frame analysis | Emerging architecture layer; isolates case analysis from legacy code |

---

## Resources — `src/main/resources/`

### FXML Files

> Every FXML file is **input to the JavaFX SceneBuilder pipeline**. The `FXMLLoader` reads the file at runtime and binds it to the matching controller class.

| File | Controller | Produces | Used By |
|------|-----------|---------|---------|
| `fxml/login.fxml` | `LoginController` | Login dialog (JWT form) | Startup; shown before main window in REMOTE mode |
| `fxml/layouts/main_layout.fxml` | `MainLayoutController` | Main window chrome, menu bar, tab container | Root scene graph |
| `fxml/workbench/case_workbench.fxml` | `MainWorkbenchController` | Workbench tab area with case tabs | Loaded inside `main_layout.fxml` |
| `fxml/case_learning.fxml` | `CaseLearningController` | Full case-learning screen with phases | Opened per case in workbench |
| `fxml/case_coach.fxml` | `CaseCoachController` | AI coaching panel alongside case | Sub-tab within case learning |
| `fxml/paragraph_search.fxml` | `ParagraphSearchController` | Norm/paragraph search popover | Invoked from case editor |
| `fxml/search_results.fxml` | `SearchController` / `FulltextSearchController` | Full-text search results list | From search bar in main layout |
| `fxml/legacy_case_learning.fxml` | `LegacyCaseLearningController` | Legacy case-learning screen | Deprecated; kept for reference — not loaded in production flow |
| `fxml/components/anspruch_card.fxml` | `AnspruchCardController` | Claim card tile UI element | Rendered in claim list |
| `fxml/components/ai_comparison_panel.fxml` | `AIComparisonPanel` / `AIComparisonPanelController` | Side-by-side AI vs. student comparison | Coach screen |
| `fxml/components/status_bar.fxml` | `StatusBarController` | Status/progress bar at window bottom | Always visible in main layout |
| `fxml/components/phase_editor.fxml` | `PhaseEditorController` | Inline phase step editor widget | Embedded within case-learning phase list |
| `fxml/dialogs/markdown_editor.fxml` | `MarkdownEditorController` | Markdown editor dialog | Note-taking, solution editing |
| `fxml/dialogs/settings_dialog.fxml` | `SettingsDialogController` | Settings screen | Menu → Settings |
| `fxml/dialogs/fall_review_dialog.fxml` | `FallReviewDialogController` | Case review / scoring dialog | Opened from workbench case menu |
| `fxml/dialogs/manage_courses_dialog.fxml` | `ManageCoursesDialogController` | Course management dialog | Menu → Manage Courses |
| `fxml/tools/db_explorer.fxml` | `DbExplorerController` (fx.tools) | Database schema & row explorer | Developer tools tab; requires `DatabaseManager` |
| `fxml/tools/progress_view.fxml` | `ProgressViewController` (fx.tools) | Learning progress charts | Developer tools tab |
| `fxml/tools/case_learning_view.fxml` | `CaseLearningViewController` | Case-learning view in tools context | Developer tools tab |
| `fxml/windows/cases_explorer.fxml` | `CasesExplorerController` | All-cases browser window | Opened as secondary window from main menu |

### CSS Files

| File | Produces | Contributes To |
|------|---------|----------------|
| `css/application-highcontrast.css` | High-contrast visual theme (v1) | Accessibility; swapped in by `ColorSchemeService` |
| `css/application-highcontrast-v2.css` | Enhanced high-contrast theme (21 KB) | Replaces v1; improved contrast ratios |
| `css/case_workbench.css` | Workbench-specific styles | Applied to `case_workbench.fxml` scene only |

### Database Migrations (`db/migration/sqlite/`)

> Flyway scans this directory at startup, applies any unapplied `V*.sql` files in version order, and records applied versions in `flyway_schema_history`.

| Version File | Schema Change | Enables |
|-------------|--------------|---------|
| `V1__initial_schema.sql` | Base tables: `norms`, `bereiche`, `users`, `sessions` | Core data model |
| `V3__create_tutor_sessions.sql` | `tutor_sessions` table | Session tracking |
| `V5__coaching_examples.sql` | `coaching_examples` table | AI coaching data |
| `V8__norm_schema_and_seed.sql` | Norm detail columns + seed data | BGB norm browsing |
| `V12__juristische_faelle_table.sql` | `juristische_faelle` (legal cases) table | Case storage |
| `V15__ai_enhancements.sql` | AI result columns, prompt history | AI feedback persistence |
| `V18__AI_Infrastructure_And_Fallbereich.sql` | Case framework tables, fall-bereich links | Claim analysis |
| `V19__case_metadata.sql` | `case_metadata` table | Case tagging & categorization |
| `V22__user_annotations.sql` | `user_norm_annotations` table | Per-user norm notes |
| `V23__norm_dedup_unique_identity.sql` | Unique constraint on norm identity | Prevents duplicate norm imports |
| `V27__claim_basis_and_steps.sql` | `claim_basis`, `claim_steps`, `claim_step_norm_refs` tables | Structured claim analysis |
| `V28__claim_step_units.sql` | `claim_step_units`, `claim_step_unit_blocks` tables | Sub-step decomposition |

**Also:** `db/migration/postgresql/` — equivalent migrations for the production PostgreSQL database (run by backend Spring Boot app on startup).

### Data Files

| File | Input Type | Produces | Pipeline Stage |
|------|-----------|---------|----------------|
| `data/raw/bgb.xml` | Official BGB XML (German civil code) | Rows in `norms` table via `BGBXMLLoader` | One-time import on setup |
| `data/raw/BJNR001950896.xml` | Secondary norm XML | Additional `norms` rows | Same import pipeline |
| `data/processed/bereiche.csv` | Processed CSV | Rows in `bereiche` table via `BereichLoader` | One-time import on setup |

### Configuration Properties

| File | Active Profile | Key Settings | Consumed By |
|------|---------------|-------------|-------------|
| `application.properties` | Default | SQLite path `~/.jura-lm-app/jura.db`, Perplexity API URL, log level INFO | `Config.java` at startup |
| `application-demo.properties` | `demo` | DEBUG logging, demo SQLite database | Dev/demo runs |
| `application-prod.properties` | `prod` | PostgreSQL URL, production log level | Docker container |
| `logback.xml` | All | Log appenders, log format, file rolling | SLF4J/Logback |

---

## Backend Module — `jurapp-backend/`

### Sub-directories

| Directory | Contents | Produces | Architectural Role |
|-----------|---------|---------|-------------------|
| `src/main/java/de/jurapp/backend/controller/` | `AiProxyController`, `AuthController`, `ClaimBasisController`, `FallController` | REST endpoints at `/api/*` | HTTP API layer; receives requests from desktop client or web |
| `src/main/java/de/jurapp/backend/service/` | `AiProxyService`, `AuthService`, `FallService` | Business logic results | Orchestration layer; calls repositories and external APIs |
| `src/main/java/de/jurapp/backend/repository/` | Spring Data JPA repositories | Hibernate queries to PostgreSQL | Data access; replaces raw JDBC for backend |
| `src/main/java/de/jurapp/backend/entity/` | JPA `@Entity` classes | ORM-mapped database tables | Domain model for backend (parallel to `de.jurapp.model`) |
| `src/main/java/de/jurapp/backend/dto/` | Request/response DTOs | JSON payloads (Jackson serialization) | API contract; decouples entity from wire format |
| `src/main/java/de/jurapp/backend/security/` | JWT filter, OAuth2 config, Keycloak integration | Authenticated security context | All `/api/*` endpoints protected; public: `/api/auth/**` |
| `src/main/java/de/jurapp/backend/config/` | Spring `@Configuration` classes | Beans: DataSource, JPA, CORS, Web | Wires the application context |
| `src/main/resources/application.yml` | YAML config | Spring Boot config: DB, JPA, JWT, Perplexity | Resolved at startup; secrets from environment/`.env` |
| `src/main/resources/db/migration/postgresql/` | Flyway SQL files | PostgreSQL schema via Flyway on startup | Schema lifecycle management in production |
| `Dockerfile` | Multi-stage Docker build | `eclipse-temurin:21-jre-alpine` image ~300 MB | Containerization; output pushed to GHCR |

### Backend API Surface (high-level)

| Endpoint Prefix | Controller | Purpose |
|----------------|-----------|---------|
| `POST /api/auth/login` | `AuthController` | Keycloak token exchange → JWT |
| `GET /api/faelle/**` | `FallController` | Case CRUD for desktop HTTP client |
| `POST /api/ai/**` | `AiProxyController` | Proxies AI requests to Perplexity |
| `GET/POST /api/claims/**` | `ClaimBasisController` | Claim analysis CRUD |

---

## CI/CD Pipelines — `.github/workflows/`

| Workflow File | Trigger | Input | Output | Architectural Stage |
|--------------|---------|-------|--------|---------------------|
| `ci.yml` | Push to `main`/`feature/**`; PR to `main` | Source code + pom.xml | Test results, JaCoCo coverage report | Quality gate; blocks merge on failure |
| `deploy.yml` | Push to `main` (after CI) | `jurapp-backend/` source + GitHub Secrets | Docker image in GHCR; running container on Hetzner | Continuous deployment; zero-downtime via `--no-deps` |
| `release-desktop.yml` | Push `v*` tag (e.g. `v1.0.0`) | Source + `src_pom.xml` + platform matrix | `JuraApp.dmg`, `JuraApp.msi`, `jurapp.deb` attached to GitHub Release | Desktop distribution; triggered manually per release |
| `deploy-pages.yml` | Push to `main` with `docs/**` changes; manual dispatch | `docs/` directory | Static site at `https://jurapp.de` (via GitHub Pages) | Public website / download page |

### `ci.yml` — Detailed Step Chain

```
Push / PR
  └─ actions/checkout
  └─ setup-java (JDK 21 Temurin)
  └─ cache Maven repo (~/.m2)
  └─ mvn -B verify
        ├─ Compile classes
        ├─ Run JUnit 5 tests
        │    └─ Testcontainers auto-spins PostgreSQL in Docker
        └─ JaCoCo coverage report → target/site/jacoco/
  └─ Upload jacoco artifact
  └─ Assert NormRepositoryTest + BereichLoaderIntegrationTest ran
```

### `deploy.yml` — Detailed Step Chain

```
Push to main
  └─ Stage 1: Build Docker image
        ├─ docker buildx build → jurapp-backend/Dockerfile
        └─ docker push → ghcr.io/<owner>/jurapp-backend:<sha>
  └─ Stage 2: SSH deploy to Hetzner
        ├─ Write .env from GitHub Secrets (DB, Keycloak passwords)
        ├─ docker compose pull
        ├─ docker compose up -d --no-deps backend
        └─ Health check (12 × 5s) via /actuator/health
```

### `release-desktop.yml` — Matrix Build

```
Push v* tag
  └─ macOS runner (macos-latest)
  │    ├─ Liberica JDK 21 + JavaFX
  │    ├─ mvn -f src_pom.xml package → jura-lm-app-shaded.jar
  │    └─ jpackage → JuraApp.dmg
  └─ Windows runner (windows-latest)
  │    ├─ WiX Toolset installed
  │    └─ jpackage → JuraApp.msi
  └─ Ubuntu runner (ubuntu-latest)
       └─ jpackage → jurapp.deb
  └─ Collect all 3 artifacts
  └─ gh release create v* --generate-notes
       ├─ Attach JuraApp.dmg
       ├─ Attach JuraApp.msi
       └─ Attach jurapp.deb
```

---

## Container Orchestration — Docker Compose

### `docker-compose.yml` (Development)

| Service | Base Image | Port | Produces | Role |
|---------|-----------|------|---------|------|
| `postgres` | `postgres:16-alpine` | 5432 | Running PostgreSQL, volume `postgres_data` | Dev database |
| `keycloak` | `quay.io/keycloak:24` | 8180 | Running Keycloak; imports realm from `./keycloak/` | Identity provider |
| `backend` | Built from `./jurapp-backend/Dockerfile` | 8080 | Running Spring Boot REST API | API server |

**Network:** `jurapp_net` (bridge) — all services communicate by service name.

### `docker-compose.prod.yml` (Production Overrides)

| Service | Change vs. dev | Produces |
|---------|---------------|---------|
| `postgres` | Not started (uses Hetzner Managed PostgreSQL) | n/a |
| `keycloak` | `start --optimized`; Let's Encrypt TLS; 768 MB limit; hostname `auth.jurapp.de` | Production-hardened IdP |
| `backend` | Pre-built GHCR image; hostname `api.jurapp.de`; 768 MB limit; external DB from `.env` | Production API server |

**Run command on Hetzner VPS:**
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env up -d --no-deps backend
```

---

## Infrastructure — `nginx/`, `keycloak/`, `deploy/`

| Directory / File | Input | Produces | Architectural Role |
|-----------------|-------|---------|-------------------|
| `nginx/jurapp.conf` | nginx config + Let's Encrypt certificates | TLS-terminated reverse proxy: `api.jurapp.de:443 → :8080`, `auth.jurapp.de:443 → :8180` | Public HTTPS entry point; security headers (HSTS, no-sniff, no-frame) |
| `keycloak/jurapp-realm-export.json` | Keycloak realm definition JSON | Realm `jurapp` with clients, roles, default users; auto-imported on `--import-realm` flag | Identity configuration; defines who can log in and what scopes are granted |
| `deploy/README-deployment.md` | Documentation | Step-by-step Hetzner setup guide | Runbook for first-time deployment and disaster recovery |

---

## Build Configuration — `pom.xml` / `src_pom.xml`

### `pom.xml` (Parent / Backend)

| Section | Input | Produces | Role |
|---------|-------|---------|------|
| `<modules>` | Lists `jurapp-backend` | Multi-module reactor build | Coordinates sub-module builds in order |
| `<dependencyManagement>` | BOM imports (Spring Boot, JavaFX) | Consistent dependency versions across modules | Prevents version drift |
| `<dependencies>` | Spring Boot, JavaFX, SQLite, Flyway, HikariCP, OkHttp, PDFBox, JUnit | Classpath for compile + runtime | All application dependencies |
| `spring-boot-maven-plugin` | `jurapp-backend/src/` | `jurapp-backend-*.jar` (fat JAR with embedded Tomcat) | Backend artifact; deployed to Hetzner via Docker |
| `maven-surefire-plugin` | Test classes | Surefire XML reports; JaCoCo coverage data | CI test execution |

### `src_pom.xml` (Desktop Standalone Build)

| Section | Input | Produces | Role |
|---------|-------|---------|------|
| `maven-shade-plugin` | All `src/main/java/` + resources + all deps | `target/jura-lm-app-shaded.jar` (self-contained fat JAR) | Desktop distribution artifact; fed into `jpackage` |
| `jpackage` (via workflow) | Shaded JAR + platform icons | `JuraApp.dmg` / `.msi` / `.deb` | Native OS installer |

---

## Scripts — `scripts/`

| Script | Input | Produces | Used In |
|--------|-------|---------|---------|
| `build.sh` | Source tree | Invokes `mvn package`; outputs shaded JAR | Manual build on dev machine |
| `build-installer.ps1` | Source tree + JDK with jpackage | Native installer for current platform | Local installer build (Windows) |
| `run-gui.ps1` | Config args (DB path, API URL) | Launches JavaFX GUI process | Developer testing |
| `run-demo.ps1` | `docker-compose.yml` | Running Docker demo stack + seeded DB | Demos / screenshots |
| `run-prod.ps1` | `.env`, prod compose files | Running production stack | Production management |
| `install-prod.ps1` | Hetzner SSH credentials | Fully configured VPS (Docker, nginx, certs, stack) | Initial production deployment |
| `setup-project-structure.ps1` | Directory spec | Correct directory tree | Project scaffolding / repair |
| `validate-structure.ps1` | Current directory tree | Validation report + auto-fix | CI structural checks |
| `export-prod-db.ps1` | PostgreSQL credentials | SQL dump `backup_YYYYMMDD.sql` | Backup routine |
| `rebuild-db.ps1` | DB path | Empty schema (migrations re-applied) | Development reset |
| `check_db.py` | DB connection string | Connectivity OK/FAIL + schema version | Health check |
| `test_perplexity.ps1` | `PERPLEXITY_API_KEY` env var | API response sample | Integration smoke test |

---

## Documentation — `docs/`

> `docs/` is served as a **static GitHub Pages site** at `https://jurapp.de` (CNAME configured). Every file here is publicly accessible.

| File / Directory | Input Source | Produces / Serves | Audience |
|-----------------|-------------|-------------------|---------|
| `index.html` + `styles.css` + `js/` | GitHub Releases API | Download page with DMG/MSI/DEB buttons | End users downloading the app |
| `CNAME` | Domain config | GitHub Pages maps `jurapp.de` → this repo | Infrastructure |
| `README.md` | Manual | Project overview, quick start | All |
| `ARCHITECTURE.md` | Manual | System design, component diagram | Developers |
| `INSTALLATION.md` | Manual | Setup guide (desktop + server) | Admins / developers |
| `DIRECTORY-STRUCTURE.md` | Manual | Full directory tree with descriptions | Developers |
| `NAVIGATION-GUIDE.md` | Manual | How to find things in the codebase | New contributors |
| `QUICK-REFERENCE.md` | Manual | One-page cheat sheet | Developers |
| `INPUT-OUTPUT-PIPELINE-MAP.md` | **This file** | Input→Output→Architecture map | All |
| `ENV_SETUP.md` | Manual | Required environment variables | Developers |
| `RUNTIME_PROFILE_SWITCHING.md` | Manual | How to switch between `demo`/`prod` profiles | Developers |
| `TESTING_PLAN.md` | Manual | Test strategy and coverage goals | QA / developers |
| `FAQ.md` | Manual | Common issues | Users |
| `planning/` | Design docs | Feature specs, architecture decisions | Team |
| `release/` | Release process | Checklist and release suite guide | Release manager |
| `deployment/` | Deployment docs | Hetzner runbook | DevOps |
| `guides/` | How-to guides | Student guide, private repo setup, go-live checklist | Various |
| `assets/` | Diagrams, screenshots | Images embedded in docs | Documentation |
| `history/` | Changelog | Release notes, version history | All |

---

## Aggregate Pipeline Summary

```
INPUT                       TRANSFORM                    OUTPUT / DESTINATION
─────────────────────────────────────────────────────────────────────────────

src/main/java/              Maven compile (pom.xml)      target/classes/
src/main/resources/         ──────────────────────────►  target/classes/ (copied)

target/classes/             maven-shade-plugin           target/jura-lm-app-shaded.jar
                            (src_pom.xml)                ── jpackage ──► JuraApp.dmg
                                                         ── jpackage ──► JuraApp.msi
                                                         ── jpackage ──► jurapp.deb
                                                         ── GitHub Release assets

jurapp-backend/src/         spring-boot-maven-plugin     jurapp-backend-*.jar
                            ──────────────────────────►  ── Docker build ──► ghcr.io/…/jurapp-backend
                                                         ── SSH deploy ──► Hetzner :8080

data/raw/bgb.xml            BGBXMLLoader (one-time)      norms table (SQLite / PostgreSQL)
data/processed/bereiche.csv BereichLoader (one-time)     bereiche table

db/migration/sqlite/V*.sql  Flyway (on app startup)      SQLite schema (desktop)
db/migration/postgresql/    Flyway (on backend startup)  PostgreSQL schema (production)

fxml/*.fxml                 FXMLLoader (at runtime)      JavaFX Scene graph nodes
css/*.css                   JavaFX CSS engine             Visual appearance of GUI

.github/workflows/ci.yml    GitHub Actions (on push)     Test results + JaCoCo report
.github/workflows/deploy.yml GitHub Actions (on main)    Container on Hetzner VPS
.github/workflows/release-desktop.yml  (on v* tag)       Native installers + GitHub Release
.github/workflows/deploy-pages.yml     (docs/** changed) jurapp.de static website

nginx/jurapp.conf           nginx (runtime)              HTTPS proxy: jurapp.de → containers
keycloak/jurapp-realm.json  Keycloak --import-realm      OAuth2 realm configuration

docs/                       GitHub Pages                 https://jurapp.de (public website)
docs/js/releases.js         GitHub Releases API (live)   Download buttons for latest release
```

---

## Key Artifacts Table

| Artifact | Produced By | Location | Consumed By |
|----------|-------------|----------|-------------|
| `jura-lm-app-shaded.jar` | `src_pom.xml` + maven-shade | `target/` | `jpackage` (installer build) |
| `JuraApp.dmg` | `release-desktop.yml` on macOS | GitHub Release | macOS end users |
| `JuraApp.msi` | `release-desktop.yml` on Windows | GitHub Release | Windows end users |
| `jurapp.deb` | `release-desktop.yml` on Ubuntu | GitHub Release | Linux end users |
| `jurapp-backend-*.jar` | `pom.xml` + spring-boot-plugin | `jurapp-backend/target/` | `Dockerfile` (Docker build) |
| `ghcr.io/.../jurapp-backend` | `Dockerfile` + `deploy.yml` | GitHub Container Registry | Hetzner Docker Compose |
| SQLite DB (`jura.db`) | Flyway migrations + data import | `~/.jura-lm-app/` (desktop) | JavaFX desktop app |
| PostgreSQL DB | Flyway migrations (backend startup) | Hetzner Managed PostgreSQL | Spring Boot backend |
| Static site (`docs/`) | Manual + `deploy-pages.yml` | GitHub Pages / `jurapp.de` | End users, documentation readers |
| JaCoCo coverage report | `ci.yml` + JaCoCo plugin | `target/site/jacoco/` | CI quality gate, developers |
| Surefire test report | `ci.yml` + maven-surefire | `target/surefire-reports/` | CI failure analysis |

---

*Last updated: 2026-03-22 (full audit: all fx sub-packages, FXML tools/windows/dialogs, data sub-packages, service sub-packages added). Maintained by the JuraApp team.*
