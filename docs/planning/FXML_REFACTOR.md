# FXML Refactoring Guide für CaseCoachController

## Step 1: Controller anpassen (CaseCoachController.java)

### ALTE CODE (Programmtisch):
```java
private Parent getView() {
    return root;  // root wurde mit createView() aufgebaut
}

private BorderPane createView() {
    BorderPane pane = new BorderPane();
    // ... 500 Zeilen Code zum Bauen der UI
    return pane;
}
```

### NEUE CODE (FXML):
```java
private BorderPane root;

@Override
public void initialize(URL location, ResourceBundle resources) {
    logger.info("CaseCoachController initialized via FXML");
    // All @FXML fields werden automatisch injiziert!
    loadFaelle();
}

public Parent getView() {
    return root;
}
```

---

## Step 2: @FXML Annotations hinzufügen

Deine Klassenvariablen sind **SCHON** definiert, aber mit `@FXML` Annotation markieren:

```java
@FXML
private BorderPane root;

@FXML
private ListView<Fall> fallListView;

@FXML
private TextArea sachverhaltArea;

@FXML
private Label themenfeldLabel;

@FXML
private Accordion anspruchAccordion;

@FXML
private TextArea newFallInput;

@FXML
private Button deleteFallButton;

@FXML
private TextField fallTitleField;

@FXML
private Button saveTitleBtn;

@FXML
private Button unterstuetztBtn;

@FXML
private ProgressBar kiProgress;

@FXML
private Label kiStatusLabel;

@FXML
private ToggleButton kiModeToggle;

@FXML
private Button parallelExplorerButton;

@FXML
private VBox aiComparisonPanel;  // Changed type from AIComparisonPanel
```

---

## Step 3: createView() Methode LÖSCHEN

```java
// ❌ DELETE DIESE METHODE KOMPLETT:
private BorderPane createView() {
    // alle 500+ Zeilen Code → DELETE
}

// ❌ DELETE DIESE METHODEN:
private VBox createFallListPanel() { }
private VBox createCenterPanel() { }
private VBox createLeftInputPanel() { }
private HBox createModiButtons() { }
```

---

## Step 4: FXML File laden im Constructor

```java
public CaseCoachController(
    AIService aiService, 
    FallRepository fallRepository,
    TutorSessionRepository tutorSessionRepository,
    NormRepository normRepository,
    javax.sql.DataSource dataSource
) {
    this.aiService = aiService;
    this.fallRepository = fallRepository;
    this.tutorSessionRepository = tutorSessionRepository;
    this.normRepository = normRepository;
    
    // ... andere Initialisierung ...
    
    // FXML laden:
    try {
        FXMLLoader loader = new FXMLLoader(
            getClass().getResource("/fxml/case_coach.fxml")
        );
        loader.setController(this);
        this.root = loader.load();
    } catch (IOException e) {
        logger.error("Failed to load case_coach.fxml", e);
        this.root = new BorderPane();
    }
}
```

---

## Step 5: AIComparisonPanel Handling

In der FXML wurde `aiComparisonPanel` als `VBox` definiert.

Du musst es in der initialize() Methode ersetzen:

```java
@Override
public void initialize(URL location, ResourceBundle resources) {
    // Erstelle AIComparisonPanel und ersetze VBox
    this.aiComparisonPanel = new AIComparisonPanel();
    
    // Oder wenn du den FXML VBox verwenden willst:
    // VBox aiPanelContainer = (VBox) root.lookup("#aiComparisonPanel");
    // aiPanelContainer kann als Container verwendet werden
    
    loadFaelle();
}
```

---

## Step 6: Handler-Methoden bereits vorhanden

Alle deine Handler sind **SCHON definiert**:
- `onNeuenFallSpeichern()` - wird vom FXML Button aufgerufen
- `saveCurrentFallTitle()` - wird vom "Titel speichern" Button aufgerufen
- `launchParallelExplorer()` - wird vom "KI-Recherche starten" Button aufgerufen
- `startUnterstuetztModus()` - wird vom "Mit KI-Unterstützung" Button aufgerufen
- `startFreiModus()` - wird vom "Eigenständig bearbeiten" Button aufgerufen
- `addManualAnspruch()` - wird vom "Neue Prüfung" Button aufgerufen

✅ Kein zusätzlicher Code nötig!

---

## Step 7: Resources Ordner Struktur

Du brauchst diese Ordnerstruktur:

```
src/main/resources/
└── fxml/
    └── case_coach.fxml
```

Falls du noch keine `resources` Ordner hast:
1. Erstelle: `src/main/resources/fxml/`
2. Kopiere `case_coach.fxml` dort rein
3. Maven wird das automatisch in den Classpath laden

---

## Step 8: CSS Binding (optional)

Falls du externe CSS verwenden möchtest:

```java
// In CaseCoachController Constructor oder initialize():
if (root != null) {
    String cssPath = getClass().getResource("/css/case_coach.css").toExternalForm();
    root.getStylesheets().add(cssPath);
}
```

---

## VORHER vs NACHHER

### VORHER (Programmtisch - BAD):
```
CaseCoachController.java
├─ 1500+ Zeilen
├─ createView() (500 Zeilen)
├─ createCenterPanel() (300 Zeilen)
├─ createLeftInputPanel() (400 Zeilen)
├─ createModiButtons() (150 Zeilen)
└─ Hard zu maintainen, keine Designgrafik möglich
```

### NACHHER (FXML - GOOD):
```
CaseCoachController.java (nur ~500 Zeilen Logic)
case_coach.fxml (UI Structure)
├─ Lesbar & wartbar
├─ Mit Scene Builder editierbar
├─ Keine doppelten Buttons!
└─ Klare Separation: UI ↔ Logic
```

---

## MIGRATION CHECKLIST

- [ ] FXML Datei erstellt: `src/main/resources/fxml/case_coach.fxml`
- [ ] @FXML Annotations zu allen Feldern hinzugefügt
- [ ] `createView()` Methode GELÖSCHT
- [ ] `createCenterPanel()` Methode GELÖSCHT
- [ ] `createLeftInputPanel()` Methode GELÖSCHT
- [ ] `createModiButtons()` Methode GELÖSCHT
- [ ] FXMLLoader Code im Constructor hinzugefügt
- [ ] `initialize()` Methode implementiert
- [ ] Kompilieren: `mvn clean compile`
- [ ] Test: `mvn javafx:run`
- [ ] ✅ Keine doppelten Buttons mehr!

---

## BENEFITS

1. ✅ **Doppelte Buttons weg** - Buttons nur 1× in FXML definiert
2. ✅ **Wartbar** - UI in einer Datei
3. ✅ **Scene Builder** - Kann visuell editiert werden
4. ✅ **Lesbar** - Code ist viel kürzer
5. ✅ **Designbar** - Designer kann FXML editieren ohne Java
6. ✅ **Refactoring-safe** - Keine versehentlichen Duplikate

---

## HÄUFIGE FEHLER

| Fehler | Ursache | Lösung |
|--------|--------|--------|
| "Cannot find /fxml/case_coach.fxml" | Falscher Pfad | Check: `src/main/resources/fxml/case_coach.fxml` exists |
| "root is null after loading" | FXMLLoader fehlgeschlagen | Check: Exception Logs |
| "@FXML fields are null" | `fx:controller` fehlt in FXML | Add: `fx:controller="de.jurapp.fx.CaseCoachController"` |
| Button Clicks funktionieren nicht | Handler-Methode fehlt | Check: Methode muss public sein + @FXML? Nein, nicht nötig |
| Duplicate buttons NOCH IMMER! | Noch alte Methods aufgerufen | Delete `createView()` und Co komplett! |
