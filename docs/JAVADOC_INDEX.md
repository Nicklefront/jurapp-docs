# JURA-LM-APP Javadoc Index

**Generated:** December 15, 2025  
**Build:** SUCCESS (5.750s)  
**Warnings:** 100 (documentation completeness)

## 📍 Quick Access

- **Full Javadoc:** `target/reports/apidocs/index.html`
- **Package Overview:** `target/reports/apidocs/overview-summary.html`
- **All Classes:** `target/reports/apidocs/allclasses-index.html`

## 📦 Package Structure

### `de.jurapp.app`
- **JuraAssistant** - Main application class

### `de.jurapp.config`
- **AppSettings** - Application configuration and settings management
- **Config** - Legacy configuration class
- **Env** - Environment variable management
- **EnvironmentProfile** - Profile-based configuration (dev/prod)

### `de.jurapp.controller`
- **SearchController** - Search functionality controller

### `de.jurapp.data`
- **AnspruchRepository** - Database repository for Anspruch entities
- **BgbXmlParser** - BGB XML paragraph parser
- **CoachingExampleRepository** - Repository for coaching examples
- **DatabaseManager** - Database connection and management
- **FallbereichRepository** - Repository for Fallbereich entities
- **FallRepository** - Repository for Fall (case) entities
- **LearningProgressRepository** - Repository for learning progress tracking
- **NormDataInitializer** - Initializes norm data from XML
- **NormRepository** - Repository for legal norms (paragraphs)
- **NormRepositoryInterface** - Interface for norm repositories
- **SimpleDataSource** - Simple DataSource implementation
- **ThemenfelderParser** - Parser for Themenfelder data
- **TutorSessionRepository** - Repository for tutor session data
- **TutorSessionSettingsRepository** - Repository for tutor session settings

#### `de.jurapp.data.import_services`
- **FallImportService** - Service for importing cases
- **SyncQueueService** - Service for synchronization queue management

#### `de.jurapp.data.repositories`
- **DraftSolutionRepository** - Repository for draft solutions

### `de.jurapp.debug`
- **DebugDataImport** - Debug utilities for data import

### `de.jurapp.fx` (JavaFX Controllers & UI)
- **CaseCoachController** - Main controller for case coaching interface (1576 LOC)
- **CaseLearningController** - Controller for case learning interface
- **Config** - FX configuration class
- **DbExplorerController** - Database explorer controller
- **FallReviewDialog** - Dialog for reviewing cases
- **JuraFxApp** - Main JavaFX application entry point
- **MainController** - Main application controller
- **MarkdownEditorPopup** - Popup editor for Markdown content
- **ParagraphSearchController** - Controller for paragraph search
- **ProgressViewController** - Controller for progress view
- **SearchController** - Search interface controller
- **SettingsController** - Settings interface controller

#### `de.jurapp.fx.components` (UI Components)
- **AIComparisonPanel** - Panel for AI comparison view
- **AIExplorerLauncher** - Launcher for AI explorer
- **AIGhostPanelComponent** - ✅ TASK 2: AI ghost panel with dual-pane comparison (170 LOC)
- **AnspruchPaneBuilder** - Builder for Anspruch panes (150 LOC)
- **CaseStatusIndicators** - ✅ TASK 1: Status indicators (👤🤖⭐) (190 LOC)
- **DragAndDropAnspruchPane** - ✅ TASK 3: Drag & drop with animation (220 LOC)
- **DraggableAnspruchContainer** - Container for draggable Anspruch items
- **InlineTitleEditor** - ✅ TASK 4: Inline title editor (200 LOC)
- **ParagraphHighlighter** - Highlighter for legal paragraphs (130 LOC)
- **PhaseEditorComponent** - Component for phase editing

#### `de.jurapp.fx.styles`
- **HighContrastTheme** - High contrast theme for accessibility

#### `de.jurapp.fx.window`
- **CasesExplorerWindow** - ✅ TASK 5: Multi-window paragraph explorer (200 LOC)

### `de.jurapp.model` (Domain Models)
- **Anspruch** - Legal claim/demand model
- **Bereich** - Legal area/domain model
- **CaseSession** - Case session model
- **CoachingExample** - Coaching example model
- **Fall** - Legal case model
- **LearningStatistics** - Learning statistics model
- **Norm** - Legal norm/paragraph model
- **Phase** - Case analysis phase model
- **TutorSessionEntry** - Tutor session entry model

### `de.jurapp.service` (Business Logic)
- **AIFunctionTooltipService** - ✅ TASK 6: Smart tooltips for AI functions (130 LOC)
- **AIPersistenceService** - Service for persisting AI data
- **AIPromptLibrary** - Library of AI prompts
- **AIService** - Main AI service integration (469+ LOC)
- **BereichLoader** - Service for loading Bereich data
- **BereichNormMapper** - Service for mapping Bereich to Norm
- **BGBXMLLoader** - Service for loading BGB XML data
- **CaseAnalyzer** - Service for analyzing legal cases
- **CaseImportService** - Service for importing cases
- **CaseService** - Main case business logic service
- **CaseValidationService** - Service for validating cases
- **ColorSchemeService** - ✅ TASK 7: Unified color palette service (120 LOC)
- **DataConsolidationService** - Service for data consolidation
- **FallbereichService** - Service for Fallbereich operations
- **FallInitService** - Service for initializing Fall data
- **FallReviewCallback** - Callback for case review
- **FeedbackService** - Service for user feedback
- **FileIndexService** - Service for file indexing
- **FullTextSearchEngine** - Full-text search engine
- **MarkdownParagraphExtractor** - Extracts paragraphs from Markdown
- **PerplexityService** - Integration with Perplexity AI

### `de.jurapp.tools` (Utilities & Tools)
- **DatabaseHealthCheck** - Database health check tool
- **ImportCoachingExamples** - Tool for importing coaching examples
- **RunMigrations** - Database migration runner

### `de.jurapp.util` (Utilities)
- **FlywayRepair** - Flyway repair utility
- **ParagraphExtractor** - Utility for extracting paragraphs
- **ParagraphFrequency** - Utility for paragraph frequency analysis
- **ParagraphValidator** - Validator for paragraphs
- **RangeExpander** - Utility for expanding ranges
- **ThemenfeldParser** - Parser for Themenfeld data
- **ValidationReport** - Validation report generator

## 🎯 Key Implementation Tasks

### ✅ Completed (TASK 6 & 7)
1. **AIFunctionTooltipService** (130 LOC) - Smart tooltips with function-specific help
2. **ColorSchemeService** (120 LOC) - Unified green color palette (#F1F8E9)

### 🔧 Advanced Components (Ready for Integration)
3. **CaseStatusIndicators** (190 LOC) - Status icons (👤🤖⭐)
4. **AIGhostPanelComponent** (170 LOC) - Dual-pane comparison view
5. **DragAndDropAnspruchPane** (220 LOC) - Drag & drop with animation
6. **InlineTitleEditor** (200 LOC) - Double-click title editing
7. **CasesExplorerWindow** (200 LOC) - Multi-window paragraph lookup
8. **AnspruchPaneBuilder** (150 LOC) - 4-phase editor builder
9. **ParagraphHighlighter** (130 LOC) - Legal reference highlighting

## 📊 Statistics

### Source Files
- **Total Java Files:** 192
- **Main Source Files:** ~90
- **Test Files:** ~15
- **Backups:** ~80

### Core Controllers
- **CaseCoachController:** 1,576 LOC (largest controller)
- **MainController:** Main application orchestration
- **CaseLearningController:** Case learning interface

### Database Repositories
- **12 Repository Classes** for data access layer
- **Connection Pooling:** NormRepositoryPoolingTest
- **Migration Support:** Flyway integration

### AI Integration
- **AIService:** Main AI orchestration
- **PerplexityService:** Perplexity AI integration
- **AIPromptLibrary:** Structured prompt templates
- **AIPersistenceService:** AI data persistence

## ⚠️ Documentation Warnings (100)

Most warnings relate to:
- Missing `@param` tags (45 warnings)
- Missing `@return` tags (30 warnings)
- Missing constructor comments (15 warnings)
- Missing class comments (10 warnings)

### Priority Files for Documentation Improvement
1. `CaseCoachController.java` (6 warnings)
2. `AIService.java` (5 warnings)
3. `CaseAnalyzer.java` (16 warnings)
4. `BgbXmlParser.java` (11 warnings)
5. `AppSettings.java` (8 warnings)

## 🔍 Navigation Tips

### By Feature
- **AI Integration:** `de.jurapp.service.AIService`, `PerplexityService`
- **Case Coaching:** `de.jurapp.fx.CaseCoachController`
- **Database Access:** `de.jurapp.data.*Repository`
- **UI Components:** `de.jurapp.fx.components.*`
- **Utilities:** `de.jurapp.util.*`

### By Layer
- **Presentation:** `de.jurapp.fx.*`
- **Business Logic:** `de.jurapp.service.*`
- **Data Access:** `de.jurapp.data.*`
- **Domain Models:** `de.jurapp.model.*`
- **Configuration:** `de.jurapp.config.*`

## 🚀 Usage

### View Javadoc in Browser
```powershell
# Open in default browser
Start-Process "target/reports/apidocs/index.html"

# Or navigate to specific class
Start-Process "target/reports/apidocs/de/jurapp/fx/CaseCoachController.html"
```

### Regenerate Javadoc
```powershell
# Full regeneration
.\mvnw.cmd javadoc:javadoc

# With source code
.\mvnw.cmd javadoc:javadoc -Dshow=private
```

## 📝 Recent Changes

### December 15, 2025
- ✅ Fixed HTML entity error in `DragAndDropAnspruchPane.java`
- ✅ Generated comprehensive Javadoc (100 warnings, 0 errors)
- ✅ Integrated TASK 6 (Tooltips) + TASK 7 (Colors) into CaseCoachController
- ✅ Created 8 advanced UI components ready for integration

## 🔗 Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [DIRECTORY-STRUCTURE.md](DIRECTORY-STRUCTURE.md) - Directory structure
- [QUICK-REFERENCE.md](QUICK-REFERENCE.md) - Quick reference guide
- [TESTING_PLAN.md](TESTING_PLAN.md) - Testing strategy

---

**Note:** Javadoc is automatically generated in `target/reports/apidocs/` during `mvn javadoc:javadoc` command.
