# Installation Guide - JURA-LM-APP

## System Requirements
- Java 21+ (Download: https://adoptium.net/)
- Windows 10/11 or macOS
- ~200MB free disk space

## Installation Steps
1. Build the standalone shaded JAR (or download the release):

```powershell
cd C:\Users\Tugay\IdeaProjects\jura-lm-app
.\mvnw clean package -DskipTests
```

Output: `target/jura-lm-app-1.0-SNAPSHOT-shaded.jar` (or `jura-lm-app-shaded.jar` depending on packaging)

2. Run the JAR:

```powershell
java -jar target\jura-lm-app-1.0-SNAPSHOT-shaded.jar
```

Or double-click the JAR file on Windows if Java is associated.

## First Launch
- App opens with 3 tabs: Search, Cases, Progress
- No DB setup required for the packaged app (tests use Testcontainers/test DB)
- If you want to run with an external DB, set the following system properties or environment variables before starting:
  - `DB_URL`, `DB_USER`, `DB_PASSWORD`

## Troubleshooting
- If the app fails to start: ensure Java 21+ is installed and on your `PATH`.
- For Windows long-path or permission issues, run PowerShell as Administrator.

## Contact
If you find issues during installation, open an issue on the repository: https://github.com/Nicklefront/jura-lm-app/issues
