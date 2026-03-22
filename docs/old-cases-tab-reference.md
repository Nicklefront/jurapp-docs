# Referenz: Alter (programmatischer) Tab "🎓 Cases" (jura-lm-app - Kopie)

Diese Datei ist als **allumfassende Referenz** für den bisherigen, vollständig **programmatisch** aufgebauten Tab **"🎓 Cases"** gedacht.

Ziel:
- **Schnelles Einordnen** beim späteren Wechsel zurück auf den neuen `src`-Stand mit FXML.
- **1:1-Übertragung** der UI-Struktur, Event-Wirings und Logik nach FXML (identisches Ergebnis).

---

## 1) Entry-Points / Einbettung in die App

### 1.1 MainController#createScene()
- Der Tab "🎓 Cases" wird in `de.jurapp.fx.MainController#createScene()` erzeugt.
- Die View wird gesetzt über:
  - `tab2.setContent(getCaseController().getView());`

### 1.2 Lazy-Init und DB-Reconnect
- Lazy-Init:
  - `getCaseController()` erstellt `new CaseLearningController(caseService, aiService)`.
- DB-Reconnect / Repo-Wechsel:
  - `MainController#onDbConnected(...)` erstellt `caseController` neu und setzt erneut `tab2.setContent(caseController.getView())`.
  - Danach `caseController.refreshBereiche()`.

**Implikation für FXML:**
- Beim Umstieg auf FXML musst du weiterhin:
  - Cases-Controller **neu laden oder refreshen** nach DB-Reconnect,
  - und die Bereich-ComboBox neu befüllen.

---

## 2) Zentrale Klassen (Cases-Tab Scope)

### 2.1 UI/Controller
- `de.jurapp.fx.CaseLearningController`
  - baut gesamte Cases-UI programmatisch
  - bindet Search-UI ein

- `de.jurapp.fx.SearchController`
  - liefert programmatisches Search-Panel via `createSearchPanel()`
  - wird als Node in den Cases-Tab eingebettet

### 2.2 Services/Infra
- `de.jurapp.service.CaseService`
  - Datenquelle für Bereich-Liste und "recommended cases" (als `Norm`)

- `de.jurapp.service.AIService`
  - optional im SearchController verwendet (AI-Query-Vorschläge)

- `de.jurapp.service.FileIndexService`
  - Index-Build für Dokumente (Pfad: `"src/main/resources/docs"`)

- `de.jurapp.service.FullTextSearchEngine`
  - Volltextsuche über Index

### 2.3 Domänenmodelle
- `de.jurapp.model.Norm`
  - wird in `caseListView` angezeigt und in `caseArea` detailliert gerendert

---

## 3) Programmatische UI-Struktur (exakter UI-Baum)

Die UI entsteht in `CaseLearningController#createView()`.

### 3.1 Root
- `BorderPane root`
  - `root.setPadding(new Insets(10))`

### 3.2 Left (Case Explorer)
- `ListView<Norm> caseListView`
  - `setPrefWidth(400)`, `setPrefHeight(400)`
  - **Listener:** `selectedItemProperty().addListener((s, oldv, newv) -> showCase(newv))`

### 3.3 Center (Case Viewer)
- `TextArea caseArea`
  - `setWrapText(true)`
  - `setEditable(false)`

### 3.4 Top (Suche + Status + Controls)
- `VBox topWrapper`
  - (optional) `searchController.createSearchPanel()`
  - (optional) `searchStatusLabel` (Index-Status)
  - `HBox topBar` mit:
    - `ComboBox<String> bereichCombo` (Bereich wählen)
    - Button `refreshBtn` ("🔄 Refresh")
    - Button `startQuizBtn` ("▶ Start Quick Quiz")

### 3.5 Right (Quiz/Feedback)
- `VBox quizBox`
  - initial: Label "Quiz: Keine Frage gestartet"
- `Label feedbackLabel`
- Right-Container: `new VBox(10, quizBox, feedbackLabel)`

---

## 4) Event-Wiring / UI-Interaktionen

### 4.1 Case-Auswahl
- Trigger: Auswahl im `caseListView`
- Handler: `showCase(Norm norm)`
- Effekt:
  - `caseArea.setText(...)` mit:
    - Paragraph + Titel
    - Schlagwörter
    - ValidationScore
    - Notizen

### 4.2 Refresh (Cases neu laden)
- Trigger: Button `refreshBtn`
- Handler: `loadRecommendedCases()`
- Effekt:
  - `caseListView.getItems().clear()`
  - `caseService.getRecommendedCases()`
  - Items setzen, wenn nicht leer: `selectFirst()` (triggert showCase)

### 4.3 Bereich-Liste
- Initial in `createView()`:
  - `loadBereiche()` wird aufgerufen
- Refresh öffentlich:
  - `public void refreshBereiche()`

### 4.4 Quiz
- Trigger: Button `startQuizBtn`
- Handler: `startQuiz()`
- Aktueller Zustand:
  - `quizBox.getChildren().clear()`
  - `feedbackLabel.setText("⚠️ Quiz-System wird derzeit überarbeitet. Bitte verwenden Sie den KI-Coach.")`

### 4.5 Search-Panel (eingebettet)
- Search-UI kommt aus `SearchController#createSearchPanel()` und wird in `topWrapper` eingefügt.

---

## 5) Daten-/Service-Logik

### 5.1 CaseService-Nutzung
- DB-Verfügbarkeit wird geprüft (Best-effort):
  - `caseService != null && caseService.hasRepository()`
- Wenn DB nicht verfügbar:
  - `caseArea.setText("Datenbank offline — eingeschränkte Funktionalität.")`
  - Buttons Refresh/Quiz werden disabled

### 5.2 Search-Initialisierung (wichtig für FXML-Migration)
In `CaseLearningController#initializeSearch()`:
- `fileIndexService = new FileIndexService("src/main/resources/docs")`
- `fileIndexService.buildIndex()`
- `searchEngine = new FullTextSearchEngine(fileIndexService)`
- `searchController = new SearchController(fileIndexService, searchEngine, aiService)`
- `searchStatusLabel` zeigt Index-Metriken:
  - doc count (`getLastIndexCount()`)
  - build duration (`getLastBuildDurationMs()`)

**Implikation für FXML:**
- Du brauchst einen **Platzhalter-Container** (z.B. `VBox searchHost`) in FXML, in den du das Search-Panel einhängst.

---

## 6) Threading / JavaFX-Thread Regeln (relevant bei Migration)

### 6.1 SearchController background workers
- `performSearch(query)` startet Thread: `"search-worker"`
  - Ergebnisse werden via `Platform.runLater(...)` auf UI geschrieben.

- `requestAiSuggestion(query)` startet Thread: `"ai-accentuate-worker"`
  - UI-Updates ebenfalls via `Platform.runLater(...)`

**Für FXML:**
- Die Threading-Regeln bleiben identisch.

---

## 7) Ressourcen / Pfade (häufige Blank-Ursache nach Umstellung)

### 7.1 Dokumentenpfad
- Index-Pfad ist im Code **fest**:
  - `"src/main/resources/docs"`

**Risiko:**
- In packaged Apps / nach Maven Build kann dieser Pfad abweichen.

**Wenn du später im neuen src merkst, dass Search "leer" ist:**
- Prüfe, ob `src/main/resources/docs` zur Laufzeit wirklich existiert.

---

## 8) 1:1 FXML Mapping Template (Vorlage für spätere FXML-Datei)

### 8.1 Empfohlen: FXML Root
- Root Node: `BorderPane`

### 8.2 FXML Placeholder Nodes (IDs)
Diese IDs decken die programmatischen Felder 1:1 ab:
- `BorderPane root`
- `ListView caseListView`
- `TextArea caseArea`
- `VBox topWrapper`
- `HBox topBar`
- `ComboBox bereichCombo`
- `Button refreshBtn`
- `Button startQuizBtn`
- `VBox quizBox`
- `Label feedbackLabel`
- `VBox searchHost`  (NEU: Slot für SearchController UI)
- `Label searchStatusLabel`

### 8.3 Controller-Felder (später @FXML)
- `@FXML private BorderPane root;`
- `@FXML private ListView<Norm> caseListView;`
- `@FXML private TextArea caseArea;`
- `@FXML private VBox topWrapper;`
- `@FXML private HBox topBar;`
- `@FXML private ComboBox<String> bereichCombo;`
- `@FXML private VBox quizBox;`
- `@FXML private Label feedbackLabel;`
- `@FXML private VBox searchHost;`
- `@FXML private Label searchStatusLabel;`

### 8.4 Event-Wiring (FXML onAction / initialize())
- `refreshBtn` -> ruft `loadRecommendedCases()`
- `startQuizBtn` -> ruft `startQuiz()`
- `caseListView` selection listener -> `showCase(norm)` (in `initialize()` setzen)
- `searchHost` wird in `initializeSearch()` gefüllt:
  - `searchHost.getChildren().setAll(searchController.createSearchPanel())`

---

## 9) Checkliste: "Identisches Ergebnis" nach FXML-Migration

- Layout identisch:
  - BorderPane Left/Top/Center/Right
- Gleiche Controls vorhanden:
  - ListView, TextArea, Bereich-Combo, Refresh/Quiz Buttons, QuizBox + FeedbackLabel
- Gleiche Default-Texte:
  - Offline-Text
  - Quiz-Überarbeitungstext
- Gleiche Interaktionen:
  - Case selection -> CaseArea
  - Refresh -> reload + selectFirst
  - Bereich-Fallback
- Search sichtbar:
  - SearchPanel hängt im Top-Bereich
  - Index-Status Label sichtbar (oder "Index: not available")

---

## 10) Was als nächstes gebraucht wird (wenn du den neuen src+FXML Stand wieder reinlädst)

Damit wir sofort generieren/zuordnen können:
- die neue `MainController`/Tab-Wiring-Stelle, wie Cases dort geladen wird
- die neue FXML-Struktur (falls vorhanden) oder gewünschte neue Struktur
- ob du `CaseLearningController` weiterverwenden willst (als "Logic"), oder ob wir einen neuen `CaseLearningFxmlController` bauen
- wie Services (CaseService/AIService) in FXML-Controller injected werden sollen (ControllerFactory vs. setter)
