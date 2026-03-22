# User Testing Plan — JURA-LM-APP

Created: 2025-12-03
Branch: `feature/paragraph-suffixes`

This document contains the user testing plan to recruit law students, run sessions, collect feedback and prioritize improvements.

(Trimmed version of the plan — full details in repo or in the project management tracker.)

## Phase 1: Pre-Testing Setup
- Build distributable JAR: `./mvnw clean package -DskipTests` → `target/jura-lm-app-1.0-SNAPSHOT-shaded.jar`
- Prepare `INSTALL.md` (included in repo)
- Prepare test accounts & 5-10 sample cases
- Verify JAR runs on Windows and macOS

## Phase 2: Recruit Test Users
- Target: Law students (1st–4th semester)
- Minimum: 3 users, Ideal: 5–8
- Channels: Hochschule contacts, Reddit, Discord, study groups
- Incentives: early access, credits, snacks (for in-person)

## Phase 3: Test Scenarios (per user)
- Scenario A: First-Time Discovery (10 min)
- Scenario B: Search Functionality (10 min)
- Scenario C: Case Learning (15 min)
- Scenario D: Progress Tracking (5 min)

## Post-Test Questionnaire
- Rates (1-5), open feedback, bugs, feature requests
- Google Form recommended for easy aggregation

## Execution Options
- Remote moderated (Zoom) — recommended
- In-person — optional
- Unmoderated remote — flexible, less insight

## Analysis & Reporting
- Collect notes, quotes, bug list, feature requests
- Aggregate success rates and produce priority matrix

## Logistics Checklist
(see full plan provided earlier in the conversation — include recruitment email templates, session note template, etc.)

---

For the full plan and templates, see the original plan provided in the conversation or `test-run-log.md` and `test-output.txt` for run logs.
