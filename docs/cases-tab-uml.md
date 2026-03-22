# Cases Tab – UML-Klassendiagramm

## Mermaid-Diagramm (copy-paste-fähig)

```mermaid
classDiagram
    class CaseLearningController {
        -caseService: CaseService
        -aiService: AIService
        -view: BorderPane
        -fileIndexService: FileIndexService
        -searchEngine: FullTextSearchEngine
        -searchController: SearchController
        -searchStatusLabel: Label
        -bereichCombo: ComboBox~String~
        -caseListView: ListView~Norm~
        -caseArea: TextArea
        -quizBox: VBox
        -feedbackLabel: Label
        -logger: Logger
        +CaseLearningController(CaseService, AIService)
        -initializeSearch()
        -createView() BorderPane
        -loadRecommendedCases()
        -showCase(Norm)
        -startQuiz()
        -loadBereiche()
        +refreshBereiche()
        +getView() BorderPane
    }

    class CaseService {
        -normRepository: NormRepository
        -logger: Logger
        +CaseService()
        +CaseService(NormRepository)
        +setRepository(NormRepository)
        +listBereichKurzname() List~String~
        +getRecommendedCases() List~Norm~
        +hasRepository() boolean
    }

    class AIService {
        -httpClient: HttpClient
        -objectMapper: ObjectMapper
        -promptLibrary: AIPromptLibrary
        -aiPersistenceService: AIPersistenceService
        -fallbereichService: FallbereichService
        -LEGAL_SYSTEM_PROMPT: String
        +AIService()
        +setPersistenceServices(AIPersistenceService, FallbereichService)
        +suggestAnspruecheForCase(String, List~String~) List~Anspruch~
        +isConfigured() boolean
    }

    class SearchController {
        -fileIndexService: FileIndexService
        -searchEngine: FullTextSearchEngine
        -aiService: AIService
        -searchField: TextField
        -resultsListView: ListView~SearchResult~
        -resultCountLabel: Label
        -aiSuggestionLabel: Label
        -aiApplyButton: Button
        -detailPanel: VBox
        -LEGAL_REF_PATTERN: Pattern
        +SearchController(FileIndexService, FullTextSearchEngine, AIService)
        +createSearchPanel() VBox
        -executeSearch(String)
        -showResultDetail(SearchResult)
    }

    class FileIndexService {
        -indexPath: Path
        -lastIndexCount: int
        -lastBuildDurationMs: long
        +FileIndexService(String)
        +buildIndex()
        +search(String) List~SearchResult~
        +getLastIndexCount() int
        +getLastBuildDurationMs() long
    }

    class FullTextSearchEngine {
        -indexService: FileIndexService
        +FullTextSearchEngine(FileIndexService)
        +search(String) List~SearchResult~
    }

    class Norm {
        -id: Long
        -paragraph: String
        -titelKurz: String
        -schlagwort: String
        -validationScore: int
        -notizen: String
        +getId() Long
        +getParagraph() String
        +getTitelKurz() String
        +getSchlagwort() String
        +getValidationScore() int
        +getNotizen() String
    }

    class NormRepository {
        -dataSource: DataSource
        +NormRepository(DataSource)
        +getAllBereiche() List~Bereich~
        +findByBereichKurzname(String) List~Norm~
        +findById(Long) Norm
        +close()
    }

    class Bereich {
        -id: Long
        -kurzname: String
        -langname: String
        +getId() Long
        +getKurzname() String
        +getLangname() String
    }

    CaseLearningController --> CaseService : uses
    CaseLearningController --> AIService : uses
    CaseLearningController --> SearchController : creates
    CaseLearningController --> Norm : displays
    SearchController --> FileIndexService : uses
    SearchController --> FullTextSearchEngine : uses
    SearchController --> AIService : optional AI
    CaseService --> NormRepository : uses
    CaseService --> Norm : returns
    NormRepository --> Norm : loads
    NormRepository --> Bereich : loads
    FullTextSearchEngine --> FileIndexService : uses
```

---

## PlantUML-Diagramm (copy-paste-fähig)

```plantuml
@startuml CasesTabUML

skinparam classAttributeIconSize 0
skinparam monochrome true
hide empty members

class CaseLearningController {
  - caseService: CaseService
  - aiService: AIService
  - view: BorderPane
  - fileIndexService: FileIndexService
  - searchEngine: FullTextSearchEngine
  - searchController: SearchController
  - searchStatusLabel: Label
  - bereichCombo: ComboBox<String>
  - caseListView: ListView<Norm>
  - caseArea: TextArea
  - quizBox: VBox
  - feedbackLabel: Label
  - logger: Logger
  --
  + CaseLearningController(CaseService, AIService)
  - initializeSearch()
  - createView(): BorderPane
  - loadRecommendedCases()
  - showCase(Norm)
  - startQuiz()
  - loadBereiche()
  + refreshBereiche()
  + getView(): BorderPane
}

class CaseService {
  - normRepository: NormRepository
  - logger: Logger
  --
  + CaseService()
  + CaseService(NormRepository)
  + setRepository(NormRepository)
  + listBereichKurzname(): List<String>
  + getRecommendedCases(): List<Norm>
  + hasRepository(): boolean
}

class AIService {
  - httpClient: HttpClient
  - objectMapper: ObjectMapper
  - promptLibrary: AIPromptLibrary
  - aiPersistenceService: AIPersistenceService
  - fallbereichService: FallbereichService
  - LEGAL_SYSTEM_PROMPT: String
  --
  + AIService()
  + setPersistenceServices(AIPersistenceService, FallbereichService)
  + suggestAnspruecheForCase(String, List<String>): List<Anspruch>
  + isConfigured(): boolean
}

class SearchController {
  - fileIndexService: FileIndexService
  - searchEngine: FullTextSearchEngine
  - aiService: AIService
  - searchField: TextField
  - resultsListView: ListView<SearchResult>
  - resultCountLabel: Label
  - aiSuggestionLabel: Label
  - aiApplyButton: Button
  - detailPanel: VBox
  - LEGAL_REF_PATTERN: Pattern
  --
  + SearchController(FileIndexService, FullTextSearchEngine, AIService)
  + createSearchPanel(): VBox
  - executeSearch(String)
  - showResultDetail(SearchResult)
}

class FileIndexService {
  - indexPath: Path
  - lastIndexCount: int
  - lastBuildDurationMs: long
  --
  + FileIndexService(String)
  + buildIndex()
  + search(String): List<SearchResult>
  + getLastIndexCount(): int
  + getLastBuildDurationMs(): long
}

class FullTextSearchEngine {
  - indexService: FileIndexService
  --
  + FullTextSearchEngine(FileIndexService)
  + search(String): List<SearchResult>
}

class Norm {
  - id: Long
  - paragraph: String
  - titelKurz: String
  - schlagwort: String
  - validationScore: int
  - notizen: String
  --
  + getId(): Long
  + getParagraph(): String
  + getTitelKurz(): String
  + getSchlagwort(): String
  + getValidationScore(): int
  + getNotizen(): String
}

class NormRepository {
  - dataSource: DataSource
  --
  + NormRepository(DataSource)
  + getAllBereiche(): List<Bereich>
  + findByBereichKurzname(String): List<Norm>
  + findById(Long): Norm
  + close()
}

class Bereich {
  - id: Long
  - kurzname: String
  - langname: String
  --
  + getId(): Long
  + getKurzname(): String
  + getLangname(): String
}

CaseLearningController --> CaseService : uses
CaseLearningController --> AIService : uses
CaseLearningController --> SearchController : creates
CaseLearningController --> Norm : displays
SearchController --> FileIndexService : uses
SearchController --> FullTextSearchEngine : uses
SearchController --> AIService : optional AI
CaseService --> NormRepository : uses
CaseService --> Norm : returns
NormRepository --> Norm : loads
NormRepository --> Bereich : loads
FullTextSearchEngine --> FileIndexService : uses

@enduml
```

---

## Erläuterungen

- **CaseLearningController** ist der Haupt-Controller für den Tab “Cases”. Er baut die UI programmatisch (BorderPane), lädt Fälle über `CaseService`, und bindet eine `SearchController`-Komponente ein.
- **CaseService** bietet eine Abstraktion über `NormRepository`. Er liefert Listen von Normen/Fällen und Bereiche (für die ComboBox).
- **AIService** wird optional an `SearchController` übergeben. Er kann für KI-gestützte Query-Verbesserungen genutzt werden.
- **SearchController** rendert eine Volltextsuche über `FileIndexService`/`FullTextSearchEngine`. Er kann in beliebige UIs (hier Cases Tab) eingebettet werden.
- **FileIndexService** & **FullTextSearchEngine** bilden die Such-Infrastruktur (Index + Volltextsuche).
- **Norm**, **NormRepository**, **Bereich** sind die Domänen-Modelle und Repositories, die von `CaseService` genutzt werden.

---

## Hinweise zur Visualisierung

- **Mermaid** kann direkt in GitHub/GitLab Markdown, VS Code, oder Tools wie Mermaid Live Editor gerendert werden.
- **PlantUML** kann mit IntelliJ, Eclipse, VS Code (Extension), oder Online-PlantUML-Server gerendert werden.
- Beide Diagramme sind **copy-paste-fähig** und können bei Bedarf leicht erweitert werden (z.B. um weitere UI-Komponenten oder Service-Methoden).
