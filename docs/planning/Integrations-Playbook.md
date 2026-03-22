# Integrations-Playbook: Tutor-RAG-Architektur → jura-lm-app
## Konkrete File-Mappings, Packages, Änderungen

---

## Vorbemerkung

Basierend auf eurer Codebase-Struktur (`de.jurapp.fx`, `de.jurapp.model`, `de.jurapp.data`, `de.jurapp.service`) wird das ursprüngliche Refactoring-Dokument wie folgt konkretisiert:

**Annahmen (werden in Phase 2 verfeinert):**
- Tutor-Funktionalität bleibt in `Config.java` (aktuelles Setup)
- SQLite-Focus (Postgres-Migrations optional)
- `CaseLearningController` wird später als "Schüler-Sicht" erweitert (noch nicht Phase 1)

---

## Phase 1: Struktur-Schicht (Model + Repository + Migration)

### 1.1 Neue Domain-Models (Subpackages)

#### Neu: `src/main/java/de/jurapp/model/metadata/CaseMetadata.java`

```java
package de.jurapp.model.metadata;

import de.jurapp.domain.base.BaseModel;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Repräsentiert die Musterlösung für einen Fall:
 * - Primäre Anspruchskette (mit Reihenfolge)
 * - RAG-Kontext (Normen, Prinzipien, typische Fehler)
 * - Metadaten zur juristischen Analyse
 */
public class CaseMetadata extends BaseModel<Integer> {
    
    private int fallId;                              // Fremdschlüssel zu Fall.id
    private String title;                            // z.B. "Minderjähriger kauft Fahrrad"
    private String topic;                            // z.B. "Minderjährigenrecht"
    private String examFocus;                        // z.B. "Trennungs-/Abstraktionsprinzip"
    
    // === Musterlösung: Normenkette ===
    private List<ClaimSchema> primaryClaims;         // Hauptlösung (z.B. § 985 → § 812)
    private List<ClaimSchema> secondaryClaims;       // Optional: Nebenlösungen
    
    // === RAG-Kontext ===
    private List<String> keyNorms;                   // Alle relevanten Normen (hart: nicht KI-generiert)
    private List<String> importantPrinciples;        // Juristische Prinzipien (Trennungsprinzip, etc.)
    private List<String> commonPitfalls;             // Typische falsche Ansprüche oder Fehler
    
    // === Timestamps ===
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // === Konstruktoren ===
    public CaseMetadata() {
        this.primaryClaims = new ArrayList<>();
        this.secondaryClaims = new ArrayList<>();
        this.keyNorms = new ArrayList<>();
        this.importantPrinciples = new ArrayList<>();
        this.commonPitfalls = new ArrayList<>();
    }
    
    @Override
    public boolean validate() {
        return fallId > 0
            && title != null && !title.isBlank()
            && !primaryClaims.isEmpty();
    }
    
    // === Getters / Setters ===
    public int getFallId() { return fallId; }
    public void setFallId(int fallId) { this.fallId = fallId; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    
    public String getExamFocus() { return examFocus; }
    public void setExamFocus(String examFocus) { this.examFocus = examFocus; }
    
    public List<ClaimSchema> getPrimaryClaims() { return primaryClaims; }
    public void setPrimaryClaims(List<ClaimSchema> claims) { this.primaryClaims = claims; }
    
    public List<ClaimSchema> getSecondaryClaims() { return secondaryClaims; }
    public void setSecondaryClaims(List<ClaimSchema> claims) { this.secondaryClaims = claims; }
    
    public List<String> getKeyNorms() { return keyNorms; }
    public void setKeyNorms(List<String> norms) { this.keyNorms = norms; }
    
    public List<String> getImportantPrinciples() { return importantPrinciples; }
    public void setImportantPrinciples(List<String> principles) { this.importantPrinciples = principles; }
    
    public List<String> getCommonPitfalls() { return commonPitfalls; }
    public void setCommonPitfalls(List<String> pitfalls) { this.commonPitfalls = pitfalls; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
```

---

#### Neu: `src/main/java/de/jurapp/model/metadata/ClaimSchema.java`

```java
package de.jurapp.model.metadata;

import java.util.ArrayList;
import java.util.List;

/**
 * Definiert eine Anspruchsprüfung (claim) im Gutachtenstil-Aufbau:
 * - Welche Norm ist Hauptnorm (z.B. § 985 BGB)?
 * - Welche Nebennormen gehören dazu (z.B. § 929, § 106–110)?
 * - Was sind typische Subsumtions-Punkte und Fehler?
 * 
 * Wird in CaseMetadata.primaryClaims / .secondaryClaims gespeichert.
 */
public class ClaimSchema {
    
    private String label;                            // z.B. "Herausgabeanspruch nach § 985 BGB"
    private String mainNorm;                         // Hauptanspruchsgrundlage (z.B. "§ 985 BGB")
    private List<String> auxiliaryNorms;             // Hilfs-/Nebenormen (z.B. ["§ 929 BGB", "§ 106 BGB"])
    private int orderIndex;                          // Reihenfolge (1 = zuerst prüfen, 2 = danach, ...)
    private boolean isPrimaryRoute;                  // true = gehört zu Musterlösung
    
    // === Coaching-Hinweise ===
    private List<String> typicalSubsumptionPoints;   // z.B. bei § 110: ["Merkmal 'bewirkt'", "Ratenzahlung?"]
    private List<String> commonErrors;               // z.B. ["Verwechslung mit § 109 BGB (Widerruf)"]
    
    // === Konstruktor ===
    public ClaimSchema() {
        this.auxiliaryNorms = new ArrayList<>();
        this.typicalSubsumptionPoints = new ArrayList<>();
        this.commonErrors = new ArrayList<>();
    }
    
    // === Helper: Volles Normen-Chain-String ===
    public String getFullNormChain() {
        StringBuilder sb = new StringBuilder();
        sb.append(mainNorm);
        if (!auxiliaryNorms.isEmpty()) {
            sb.append(" (ggf. mit ").append(String.join(", ", auxiliaryNorms)).append(")");
        }
        return sb.toString();
    }
    
    // === Getters / Setters ===
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    
    public String getMainNorm() { return mainNorm; }
    public void setMainNorm(String mainNorm) { this.mainNorm = mainNorm; }
    
    public List<String> getAuxiliaryNorms() { return auxiliaryNorms; }
    public void setAuxiliaryNorms(List<String> norms) { this.auxiliaryNorms = norms; }
    
    public int getOrderIndex() { return orderIndex; }
    public void setOrderIndex(int index) { this.orderIndex = index; }
    
    public boolean isPrimaryRoute() { return isPrimaryRoute; }
    public void setPrimaryRoute(boolean value) { this.isPrimaryRoute = value; }
    
    public List<String> getTypicalSubsumptionPoints() { return typicalSubsumptionPoints; }
    public void setTypicalSubsumptionPoints(List<String> points) { this.typicalSubsumptionPoints = points; }
    
    public List<String> getCommonErrors() { return commonErrors; }
    public void setCommonErrors(List<String> errors) { this.commonErrors = errors; }
}
```

---

#### Neu: `src/main/java/de/jurapp/model/rag/NormContext.java`

```java
package de.jurapp.model.rag;

import de.jurapp.model.Fall;
import de.jurapp.model.metadata.CaseMetadata;
import de.jurapp.model.metadata.ClaimSchema;
import java.util.ArrayList;
import java.util.List;

/**
 * Kontext für eine RAG-Query:
 * - Aktuelle Fall-ID
 * - Aktuelle Anspruchsprüfung (Norm + Label)
 * - Harte Normenkette (aus CaseMetadata)
 * - Retrieval-Hints für KI-Prompt
 * 
 * Wird von NormRetrievalService genutzt, um strukturierte
 * RAG-Queries gegen AIService zu fahren.
 */
public class NormContext {
    
    private int fallId;
    private String fallTitle;
    
    private ClaimSchema currentClaim;                 // Aktuelle Anspruchsprüfung
    private List<String> suggestedNorms;              // Muster-Normkette (hauptNorm + auxiliaryNorms)
    private List<String> retrievalHints;              // Keywords / Prinzipien für RAG-Prompt
    private List<String> principlesContext;           // Juristische Prinzipien
    
    // === RAG-Output (gefüllt von NormRetrievalService) ===
    private String generatedParagraphTexts;           // Norm-Texte von AIService
    private String generatedNormChain;                // Schematische Darstellung
    
    // === Konstruktor: aus Fall + Claim + Metadata ===
    public NormContext(Fall fall, ClaimSchema claim, CaseMetadata metadata) {
        this.fallId = fall.getId();
        this.fallTitle = fall.getTitel();
        this.currentClaim = claim;
        
        // Harte Normenkette aus ClaimSchema
        this.suggestedNorms = new ArrayList<>();
        this.suggestedNorms.add(claim.getMainNorm());
        this.suggestedNorms.addAll(claim.getAuxiliaryNorms());
        
        // Hints aus Metadata
        this.retrievalHints = new ArrayList<>(metadata.getImportantPrinciples());
        this.principlesContext = new ArrayList<>(metadata.getImportantPrinciples());
    }
    
    // === Getters / Setters ===
    public int getFallId() { return fallId; }
    public void setFallId(int fallId) { this.fallId = fallId; }
    
    public String getFallTitle() { return fallTitle; }
    public void setFallTitle(String title) { this.fallTitle = title; }
    
    public ClaimSchema getCurrentClaim() { return currentClaim; }
    public void setCurrentClaim(ClaimSchema claim) { this.currentClaim = claim; }
    
    public List<String> getSuggestedNorms() { return suggestedNorms; }
    public void setSuggestedNorms(List<String> norms) { this.suggestedNorms = norms; }
    
    public List<String> getRetrievalHints() { return retrievalHints; }
    public void setRetrievalHints(List<String> hints) { this.retrievalHints = hints; }
    
    public List<String> getPrinciplesContext() { return principlesContext; }
    public void setPrinciplesContext(List<String> principles) { this.principlesContext = principles; }
    
    public String getGeneratedParagraphTexts() { return generatedParagraphTexts; }
    public void setGeneratedParagraphTexts(String texts) { this.generatedParagraphTexts = texts; }
    
    public String getGeneratedNormChain() { return generatedNormChain; }
    public void setGeneratedNormChain(String chain) { this.generatedNormChain = chain; }
}
```

---

### 1.2 Neue Repository: CaseMetadataRepository

#### Neu: `src/main/java/de/jurapp/data/CaseMetadataRepository.java`

```java
package de.jurapp.data;

import de.jurapp.model.metadata.CaseMetadata;
import de.jurapp.model.metadata.ClaimSchema;
import de.jurapp.repository.base.BaseRepository;
import de.jurapp.repository.base.RepositoryException;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Repository für CaseMetadata (Musterlösungen + RAG-Kontext).
 * 
 * Speichert pro Fall:
 * - Primäre/Sekundäre Anspruchsketten
 * - Harte Normen
 * - Juristische Prinzipien
 * - Typische Fehler
 */
public class CaseMetadataRepository extends BaseRepository {
    
    private static final Gson gson = new Gson();
    
    // === Tabelle anlegen ===
    public void createTableIfNotExists() {
        String sql = """
            CREATE TABLE IF NOT EXISTS case_metadata (
                fall_id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                topic TEXT,
                exam_focus TEXT,
                primary_claims_json TEXT NOT NULL,
                secondary_claims_json TEXT,
                key_norms_json TEXT NOT NULL,
                important_principles_json TEXT,
                common_pitfalls_json TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (fall_id) REFERENCES fall(id) ON DELETE CASCADE
            )
            """;
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.execute();
            LOGGER.info("CaseMetadata table created or already exists");
        } catch (SQLException e) {
            throw new RepositoryException("Failed to create case_metadata table", e);
        }
    }
    
    // === Speichern ===
    public void saveCaseMetadata(CaseMetadata meta) {
        if (!meta.validate()) {
            throw new RepositoryException("CaseMetadata validation failed: " + meta.getId());
        }
        
        String primaryJson = serializeClaimSchemas(meta.getPrimaryClaims());
        String secondaryJson = serializeClaimSchemas(meta.getSecondaryClaims());
        String normsJson = gson.toJson(meta.getKeyNorms());
        String principlesJson = gson.toJson(meta.getImportantPrinciples());
        String pitfallsJson = gson.toJson(meta.getCommonPitfalls());
        
        String sql = """
            INSERT OR REPLACE INTO case_metadata 
            (fall_id, title, topic, exam_focus, primary_claims_json, secondary_claims_json,
             key_norms_json, important_principles_json, common_pitfalls_json, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            """;
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, meta.getFallId());
            stmt.setString(2, meta.getTitle());
            stmt.setString(3, meta.getTopic());
            stmt.setString(4, meta.getExamFocus());
            stmt.setString(5, primaryJson);
            stmt.setString(6, secondaryJson);
            stmt.setString(7, normsJson);
            stmt.setString(8, principlesJson);
            stmt.setString(9, pitfallsJson);
            stmt.executeUpdate();
            LOGGER.info("CaseMetadata saved for fall_id=" + meta.getFallId());
        } catch (SQLException e) {
            throw new RepositoryException("Failed to save CaseMetadata", e);
        }
    }
    
    // === Laden ===
    public CaseMetadata findByFallId(int fallId) {
        String sql = "SELECT * FROM case_metadata WHERE fall_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, fallId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapResultSetToMetadata(rs);
            }
        } catch (SQLException e) {
            LOGGER.warn("Failed to load CaseMetadata for fall_id=" + fallId, e);
        }
        return null;
    }
    
    public List<CaseMetadata> findAll() {
        List<CaseMetadata> result = new ArrayList<>();
        String sql = "SELECT * FROM case_metadata ORDER BY fall_id";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                result.add(mapResultSetToMetadata(rs));
            }
        } catch (SQLException e) {
            throw new RepositoryException("Failed to load all CaseMetadata", e);
        }
        return result;
    }
    
    // === Delete ===
    public void deleteByFallId(int fallId) {
        String sql = "DELETE FROM case_metadata WHERE fall_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, fallId);
            int deleted = stmt.executeUpdate();
            LOGGER.info("Deleted CaseMetadata for fall_id=" + fallId + " (" + deleted + " rows)");
        } catch (SQLException e) {
            throw new RepositoryException("Failed to delete CaseMetadata", e);
        }
    }
    
    // === Helper: Mapping ===
    private CaseMetadata mapResultSetToMetadata(ResultSet rs) throws SQLException {
        CaseMetadata meta = new CaseMetadata();
        meta.setFallId(rs.getInt("fall_id"));
        meta.setTitle(rs.getString("title"));
        meta.setTopic(rs.getString("topic"));
        meta.setExamFocus(rs.getString("exam_focus"));
        
        // JSON deserialisieren
        meta.setPrimaryClaims(deserializeClaimSchemas(rs.getString("primary_claims_json")));
        meta.setSecondaryClaims(deserializeClaimSchemas(rs.getString("secondary_claims_json")));
        
        meta.setKeyNorms(gson.fromJson(rs.getString("key_norms_json"), 
            new TypeToken<List<String>>(){}.getType()));
        
        String principlesJson = rs.getString("important_principles_json");
        if (principlesJson != null) {
            meta.setImportantPrinciples(gson.fromJson(principlesJson, 
                new TypeToken<List<String>>(){}.getType()));
        }
        
        String pitfallsJson = rs.getString("common_pitfalls_json");
        if (pitfallsJson != null) {
            meta.setCommonPitfalls(gson.fromJson(pitfallsJson, 
                new TypeToken<List<String>>(){}.getType()));
        }
        
        meta.setCreatedAt(rs.getTimestamp("created_at") != null 
            ? rs.getTimestamp("created_at").toLocalDateTime() 
            : null);
        meta.setUpdatedAt(rs.getTimestamp("updated_at") != null 
            ? rs.getTimestamp("updated_at").toLocalDateTime() 
            : null);
        
        return meta;
    }
    
    // === Helper: JSON-Serialisierung ===
    public static String serializeClaimSchemas(List<ClaimSchema> claims) {
        if (claims == null || claims.isEmpty()) {
            return "[]";
        }
        return gson.toJson(claims);
    }
    
    public static List<ClaimSchema> deserializeClaimSchemas(String json) {
        if (json == null || json.isEmpty() || "[]".equals(json)) {
            return new ArrayList<>();
        }
        return gson.fromJson(json, new TypeToken<List<ClaimSchema>>(){}.getType());
    }
}
```

---

### 1.3 Database-Migration

#### Neu: `src/main/resources/db/migration/sqlite/V19__case_metadata.sql`

```sql
-- Case Metadata: Musterlösungen und RAG-Kontext
CREATE TABLE IF NOT EXISTS case_metadata (
    fall_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    topic TEXT,                           -- z.B. "Minderjährigenrecht"
    exam_focus TEXT,                      -- z.B. "Trennungs-/Abstraktionsprinzip"
    primary_claims_json TEXT NOT NULL,    -- JSON-Array von ClaimSchema
    secondary_claims_json TEXT,
    key_norms_json TEXT NOT NULL,         -- JSON-Array: ["§ 985 BGB", "§ 812 I 1 Alt. 1 BGB", ...]
    important_principles_json TEXT,       -- JSON-Array: ["Trennungsprinzip", "Abstraktionsprinzip", ...]
    common_pitfalls_json TEXT,            -- JSON-Array: ["Lösung über § 280", "Verwechslung § 107 / § 110", ...]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fall_id) REFERENCES fall(id) ON DELETE CASCADE
);

-- Index für Abfragen nach Topic (z.B. alle "Minderjährigenrecht"-Fälle)
CREATE INDEX IF NOT EXISTS idx_case_metadata_topic ON case_metadata(topic);

-- ===== Seed-Daten: Minderjähriger kauft Fahrrad =====
-- (Beispiel: wird später durch SQL-Script oder Java-Seeder gefüllt)
-- INSERT INTO case_metadata ...
```

---

## Phase 2: Service-Schicht (Coaching + RAG-Integration)

### 2.1 CaseCoachingService

#### Neu: `src/main/java/de/jurapp/service/CaseCoachingService.java`

```java
package de.jurapp.service;

import de.jurapp.data.CaseMetadataRepository;
import de.jurapp.data.NormRepository;
import de.jurapp.model.Fall;
import de.jurapp.model.metadata.CaseMetadata;
import de.jurapp.model.metadata.ClaimSchema;
import de.jurapp.service.base.BaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.ArrayList;
import java.util.List;

/**
 * Service für Coaching und Evaluierung von User-Anspruchsantworten.
 * 
 * Prüft:
 * - Ist die Normwahl korrekt (vs. Musterlösung)?
 * - Typische juristische Fehler?
 * - Subsumtion-Struktur?
 */
public class CaseCoachingService extends BaseService {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(CaseCoachingService.class);
    
    private final CaseMetadataRepository caseMetadataRepository;
    private final NormRepository normRepository;
    
    public CaseCoachingService(CaseMetadataRepository metaRepo, NormRepository normRepo) {
        this.caseMetadataRepository = metaRepo;
        this.normRepository = normRepo;
    }
    
    /**
     * Evaluiert eine User-Anspruchsantwort gegen die Musterlösung.
     * 
     * @return Map mit:
     *   - isCorrectNorm: Norm-Wahl korrekt?
     *   - feedbackMessages: Liste von Hinweisen/Korrektionen
     */
    public CoachingResult evaluateClaim(Fall fall,
                                        ClaimSchema targetSchema,
                                        String userNorm) {
        CoachingResult result = new CoachingResult();
        result.setTargetNorm(targetSchema.getMainNorm());
        result.setUserNorm(userNorm);
        result.setFeedbackMessages(new ArrayList<>());
        
        // 1. === NORMWAHL PRÜFEN ===
        boolean normCorrect = this.normalizeNorm(userNorm)
            .equals(this.normalizeNorm(targetSchema.getMainNorm()));
        result.setCorrectNorm(normCorrect);
        
        if (normCorrect) {
            result.getFeedbackMessages().add("✔ Richtige Anspruchsgrundlage: " + targetSchema.getMainNorm());
        } else {
            result.getFeedbackMessages().add("✘ Anspruchsgrundlage weicht ab.");
            result.getFeedbackMessages().add("Musterlösung: " + targetSchema.getMainNorm());
            if (!targetSchema.getAuxiliaryNorms().isEmpty()) {
                result.getFeedbackMessages().add("Ggf. in Verbindung mit: " + 
                    String.join(", ", targetSchema.getAuxiliaryNorms()));
            }
            
            // 2. === TYPISCHE FEHLER PRÜFEN ===
            result.getFeedbackMessages().addAll(this.checkCommonErrors(userNorm, fall, targetSchema));
        }
        
        // 3. === SUBSUMTION-HINWEISE (optional) ===
        result.getFeedbackMessages().addAll(this.getSubsumptionHints(targetSchema));
        
        LOGGER.info("Evaluated claim for fall_id=" + fall.getId() + 
                   ", userNorm=" + userNorm + ", correct=" + normCorrect);
        
        return result;
    }
    
    /**
     * Prüft auf typische juristische Fehler
     */
    private List<String> checkCommonErrors(String userNorm, Fall fall, ClaimSchema targetSchema) {
        List<String> errors = new ArrayList<>();
        String normalized = this.normalizeNorm(userNorm);
        
        // Heuristik: Minderjährigenrecht-Fälle
        if (fall.getThemenfelder() != null && fall.getThemenfelder().toLowerCase().contains("minderjährig")) {
            if (normalized.contains("280")) {
                errors.add("⚠ Hinweis: § 280 BGB (Schadensersatz) ist bei Minderjährigenrecht typischerweise " +
                          "nur Nebenanspruch oder gar nicht relevant. Prüfe zuerst Unwirksamkeit (§§ 106–110 BGB) " +
                          "→ Rückabwicklung (§ 812 BGB).");
            }
            if (normalized.contains("109") && !normalized.contains("108")) {
                errors.add("⚠ § 109 BGB (Widerruf) ist hier typischerweise nicht der Hauptanspruch. " +
                          "Fokus: Genehmigung verweigert (§ 108 BGB) → Rückabwicklung (§ 812 BGB).");
            }
        }
        
        // Weitere Heuristiken...
        
        return errors;
    }
    
    /**
     * Gibt Hinweise zur Subsumtion basierend auf ClaimSchema
     */
    private List<String> getSubsumptionHints(ClaimSchema schema) {
        List<String> hints = new ArrayList<>();
        
        if (schema.getTypicalSubsumptionPoints() != null && !schema.getTypicalSubsumptionPoints().isEmpty()) {
            hints.add("💡 Typische Subsumtions-Punkte:");
            for (String point : schema.getTypicalSubsumptionPoints()) {
                hints.add("  - " + point);
            }
        }
        
        return hints;
    }
    
    /**
     * Normalisiert Normadressen für Vergleiche.
     * z.B. "§ 812 I 1 BGB" → "81211bgb"
     */
    private String normalizeNorm(String raw) {
        if (raw == null) return "";
        return raw.trim()
                  .replaceAll("\\s+", "")
                  .replace(".", "")
                  .replace("§", "")
                  .replace("Abs", "")
                  .replace("Alt", "")
                  .toLowerCase();
    }
    
    // === Hilfsklasse ===
    public static class CoachingResult {
        private String targetNorm;
        private String userNorm;
        private boolean isCorrectNorm;
        private List<String> feedbackMessages;
        
        // Getters / Setters
        public String getTargetNorm() { return targetNorm; }
        public void setTargetNorm(String norm) { this.targetNorm = norm; }
        
        public String getUserNorm() { return userNorm; }
        public void setUserNorm(String norm) { this.userNorm = norm; }
        
        public boolean isCorrectNorm() { return isCorrectNorm; }
        public void setCorrectNorm(boolean correct) { this.isCorrectNorm = correct; }
        
        public List<String> getFeedbackMessages() { return feedbackMessages; }
        public void setFeedbackMessages(List<String> messages) { this.feedbackMessages = messages; }
    }
}
```

---

### 2.2 NormRetrievalService (RAG-Integration)

#### Neu: `src/main/java/de/jurapp/service/NormRetrievalService.java`

```java
package de.jurapp.service;

import de.jurapp.data.CaseMetadataRepository;
import de.jurapp.data.NormRepository;
import de.jurapp.model.Fall;
import de.jurapp.model.Norm;
import de.jurapp.model.metadata.CaseMetadata;
import de.jurapp.model.metadata.ClaimSchema;
import de.jurapp.model.rag.NormContext;
import de.jurapp.service.base.BaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Service für RAG-Query-Konstruktion und Normtext-Retrieval.
 * 
 * Nutzt:
 * - Harte Normenketten aus CaseMetadata (nicht frei vom KI generiert)
 * - NormRepository für echte Norm-Texte
 * - AIService für die finale KI-Generierung
 */
public class NormRetrievalService extends BaseService {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(NormRetrievalService.class);
    
    private final NormRepository normRepository;
    private final CaseMetadataRepository caseMetadataRepository;
    private final AIService aiService;
    
    public NormRetrievalService(NormRepository normRepo,
                                CaseMetadataRepository metaRepo,
                                AIService aiService) {
        this.normRepository = normRepo;
        this.caseMetadataRepository = metaRepo;
        this.aiService = aiService;
    }
    
    /**
     * Konstruiert einen RAG-Kontext aus Fall + Claim + Metadata.
     * Dies ist die zentrale Stelle, wo "harte" Normketten mit KI kombiniert werden.
     */
    public NormContext buildNormContext(Fall fall, ClaimSchema claim) {
        CaseMetadata meta = caseMetadataRepository.findByFallId(fall.getId());
        if (meta == null) {
            meta = this.generateMetadataFallback(fall);
            LOGGER.warn("No CaseMetadata found for fall_id=" + fall.getId() + 
                       ", using fallback heuristics");
        }
        return new NormContext(fall, claim, meta);
    }
    
    /**
     * Führt eine strukturierte RAG-Query durch:
     * 1. Harte Normenkette aus CaseMetadata
     * 2. Wichtige Prinzipien
     * 3. Normtexte aus NormRepository
     * 4. KI-Generierung mit strengem Context
     */
    public String executeRAGQuery(NormContext context) {
        StringBuilder ragPrompt = new StringBuilder();
        
        // === Hard Context: Musterlösung-Normenkette ===
        ragPrompt.append("=== MUSTERLÖSUNG NORMENKETTE ===\n");
        ragPrompt.append("Hauptnorm: ").append(context.getCurrentClaim().getMainNorm()).append("\n");
        if (!context.getCurrentClaim().getAuxiliaryNorms().isEmpty()) {
            ragPrompt.append("Hilfs-/Nebennormen: ")
                .append(String.join(", ", context.getCurrentClaim().getAuxiliaryNorms())).append("\n");
        }
        ragPrompt.append("\n");
        
        // === Hard Context: Wichtige Prinzipien ===
        if (context.getPrinciplesContext() != null && !context.getPrinciplesContext().isEmpty()) {
            ragPrompt.append("=== JURISTISCHE PRINZIPIEN ===\n");
            for (String principle : context.getPrinciplesContext()) {
                ragPrompt.append("- ").append(principle).append("\n");
            }
            ragPrompt.append("\n");
        }
        
        // === Retrieval: Normtexte aus NormRepository ===
        ragPrompt.append("=== NORMTEXTE (AUSREPOSITORY) ===\n");
        for (String normSpec : context.getSuggestedNorms()) {
            String normText = this.retrieveNormText(normSpec);
            ragPrompt.append(normSpec).append(":\n")
                     .append(normText).append("\n\n");
        }
        
        // === KI-Query mit hartem Context ===
        String aiResponse = this.aiService.callAIWithHardContext(
            ragPrompt.toString(),
            context.getPrinciplesContext()
        );
        
        context.setGeneratedParagraphTexts(aiResponse);
        context.setGeneratedNormChain(context.getCurrentClaim().getFullNormChain());
        
        LOGGER.info("RAG query executed for fall_id=" + context.getFallId() + 
                   ", claim=" + context.getCurrentClaim().getLabel());
        
        return aiResponse;
    }
    
    /**
     * Ruft Normtext aus NormRepository ab.
     * Format: "§ 812 I 1 Alt. 1 BGB" → "BGB", "812", ...
     */
    private String retrieveNormText(String normSpec) {
        // Einfaches Parsing (ggf. erweitern)
        String[] parts = normSpec.split("\\s+");
        if (parts.length < 2) {
            return "(Normtext nicht gefunden: ungültiges Format)";
        }
        
        String paragraph = parts[0].replace("§", "").trim();
        String gesetz = parts[parts.length - 1];  // letztes Wort ist normalerweise "BGB"
        
        // Lookup in NormRepository
        Norm norm = normRepository.findByParagraph(gesetz, paragraph);
        if (norm != null) {
            return norm.getTitelKurz() + "\n" + (norm.getNotizen() != null ? norm.getNotizen() : "");
        }
        return "(Normtext im Repository nicht gefunden)";
    }
    
    /**
     * Fallback: Generiert CaseMetadata aus Fall-Daten (Heuristiken).
     * Dies ist nur für Fälle ohne explizite Musterlösung.
     */
    private CaseMetadata generateMetadataFallback(Fall fall) {
        CaseMetadata meta = new CaseMetadata();
        meta.setFallId(fall.getId());
        meta.setTitle(fall.getTitel());
        meta.setTopic(fall.getBereich());
        
        // Einfache Heuristik: Bereich → Standard-Normketten
        String bereich = fall.getBereich();
        if (bereich != null && bereich.toLowerCase().contains("kauf")) {
            ClaimSchema schema = new ClaimSchema();
            schema.setLabel("Kaufpreisanspruch");
            schema.setMainNorm("§ 433 Abs. 2 BGB");
            schema.setAuxiliaryNorms(Arrays.asList("§ 929 BGB", "§ 930 BGB"));
            schema.setOrderIndex(1);
            schema.setPrimaryRoute(true);
            meta.setPrimaryClaims(Arrays.asList(schema));
            meta.setKeyNorms(Arrays.asList("§ 433 BGB", "§ 929 BGB", "§ 930 BGB"));
        }
        // ... weitere Heuristiken
        
        return meta;
    }
}
```

---

### 2.3 AIService: Erweiterung (nicht Umschreiben!)

#### Erweiterung: `src/main/java/de/jurapp/service/AIService.java`

Füge diese neue Methode hinzu (nicht ersetzen, nur ergänzen):

```java
/**
 * NEUE METHODE (Phase 2): Nutzt RAG-Kontext mit harter Normenkette + Prinzipien.
 * 
 * @param hardContext   StringBuilder mit Musterlösung + Normtexten
 * @param principles    Juristische Prinzipien (z.B. "Trennungsprinzip")
 * @return              KI-generierter Text im Gutachtenstil
 */
public String callAIWithHardContext(String hardContext, List<String> principles) {
    StringBuilder prompt = new StringBuilder();
    
    prompt.append("Du bist ein erfahrener Jura-Tutor für Anfänger.\n");
    prompt.append("Antworte IMMER im Gutachtenstil (Obersatz, Definition, Subsumtion, Ergebnis).\n\n");
    
    // === Hard Context ===
    prompt.append(hardContext);
    prompt.append("\n");
    
    // === Prinzipien einbinden ===
    if (principles != null && !principles.isEmpty()) {
        prompt.append("=== WICHTIGE PRINZIPIEN (BEACHTE DIESE!) ===\n");
        for (String p : principles) {
            prompt.append("- ").append(p).append("\n");
        }
        prompt.append("\n");
    }
    
    // === Task definieren ===
    prompt.append("=== AUFGABE ===\n");
    prompt.append("Erläutere die obige Normenkette im Gutachtenstil.\n");
    prompt.append("Nutze AUSSCHLIESSLICH die Normen und Prinzipien oben – keine Abweichungen.\n");
    
    // === KI aufrufen (bestehende Logik) ===
    return this.callAI(prompt.toString(), "rag_with_hard_context");
}
```

---

## Phase 3: Controller-Integrationen

### 3.1 Config.java (Tutor-Tab): Minimal-Anpassung

#### Erweiterung: `src/main/java/de/jurapp/fx/Config.java`

In der `startUnterstuetztModus()`-Methode:

```java
// VORHER (aktueller Code):
// List<Anspruch> suggestions = aiService.suggestAnspruecheForCase(fallSachverhalt, themenfelder);

// NACHHER: Mit CaseMetadata-Bindung
@FXML
private void startUnterstuetztModus() {
    Fall selectedFall = ... // (aus UI-Selection)
    
    // NEU: Lade Musterlösung
    CaseMetadata metadata = caseMetadataRepository.findByFallId(selectedFall.getId());
    if (metadata == null) {
        // Fallback oder Warnung
        showTransientNotification("⚠ Keine Musterlösung für diesen Fall konfiguriert. " +
                                 "Nutze Heuristiken...");
        metadata = generateMetadataFallback(selectedFall);
    }
    
    // KI-Generierung an Musterlösung gebunden
    List<Anspruch> suggestions = aiService.suggestAnspruecheForCaseWithMetadata(
        selectedFall, 
        metadata
    );
    
    // UI aktualisieren (bestehender Code)
    setAiSuggestionsForUI(suggestions);
}
```

---

## Zusammenfassung: Dateistruktur nach Phase 1+2

```
src/main/java/de/jurapp/
├── model/
│   ├── Fall.java (existierend)
│   ├── Anspruch.java (existierend)
│   ├── Norm.java (existierend)
│   ├── TutorSessionEntry.java (existierend)
│   ├── metadata/                    ← NEU
│   │   ├── CaseMetadata.java
│   │   └── ClaimSchema.java
│   └── rag/                         ← NEU
│       └── NormContext.java
├── data/
│   ├── FallRepository.java (existierend)
│   ├── NormRepository.java (existierend)
│   ├── TutorSessionRepository.java (existierend)
│   └── CaseMetadataRepository.java  ← NEU
├── service/
│   ├── AIService.java (erweitert mit callAIWithHardContext)
│   ├── CaseService.java (existierend)
│   ├── CaseCoachingService.java     ← NEU (Phase 2)
│   └── NormRetrievalService.java    ← NEU (Phase 2)
└── fx/
    ├── Config.java (minimal erweitert)
    └── CaseLearningController.java (später in Phase 3)

src/main/resources/
├── db/migration/sqlite/
│   ├── V1__initial_schema.sql (existierend)
│   ├── ...
│   └── V19__case_metadata.sql       ← NEU
└── fxml/
    └── case_coach.fxml (existierend, nutzt Config.java)
```

---

## Integrations-Schritte (Woche für Woche)

### Woche 1: Struktur
1. [ ] Erstelle Packages: `model/metadata`, `model/rag`
2. [ ] Implementiere: `CaseMetadata.java`, `ClaimSchema.java`, `NormContext.java`
3. [ ] Implementiere: `CaseMetadataRepository.java`
4. [ ] Erstelle Migration: `V19__case_metadata.sql`
5. [ ] Run Migration + Test mit leerer Tabelle

**Unit Tests:**
- [ ] `CaseMetadataRepository.saveCaseMetadata()` + `findByFallId()`
- [ ] `ClaimSchema.getFullNormChain()`
- [ ] JSON Serialisierung (ClaimSchema ↔ JSON)

### Woche 2: Services
1. [ ] Implementiere: `CaseCoachingService.java` (mit `evaluateClaim()`)
2. [ ] Implementiere: `NormRetrievalService.java` (mit `buildNormContext()`, `executeRAGQuery()`)
3. [ ] Erweitere: `AIService.java` (neue Methode `callAIWithHardContext()`)

**Unit Tests:**
- [ ] `CaseCoachingService.evaluateClaim()` (verschiedene Fehlerszenarien)
- [ ] `CaseCoachingService.normalizeNorm()` (Edge Cases)
- [ ] `NormRetrievalService.retrieveNormText()` (mit Mock-Norms)
- [ ] `NormRetrievalService.buildNormContext()`

### Woche 3: Controller + Integration
1. [ ] Erweitere: `Config.java` (startUnterstuetztModus mit CaseMetadata)
2. [ ] Test: E2E-Szenario (Fall wählen → KI-Modus starten → Feedback erhalten)
3. [ ] Seed-Daten: konfiguriere 3–5 Fälle in `CaseMetadata`

**Integration Tests:**
- [ ] MainController → Config → CaseCoachingService → DB
- [ ] RAG-Query-Flow

### Woche 4: Daten + Dokumentation
1. [ ] Seed-Script für `CaseMetadata` der Top-10 Fälle
2. [ ] Dokumentation: "Wie konfiguriere ich eine neue CaseMetadata?"
3. [ ] UI-Polish (Feedback-Styling, Error Handling)

---

## Nächste Schritte von dir

**Schreib mir kurz:**
1. Welches ist der "authoritative" Tutor-Tab? (`Config` oder `CaseLearningController`?)
2. Nur SQLite oder auch Postgres?

Dann ich schreib dir ein noch mehr detailliertes **Phase-1-Implementierungs-Script** (exakte Code-Snippets, Testablauf, etc.).