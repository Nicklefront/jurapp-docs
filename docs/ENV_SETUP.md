# Environment Setup for Production

## Overview
The `run-prod.ps1` launcher requires DB credentials from environment variables. **Never commit real secrets to Git.**

## Local Setup

1. Copy the example file:
   ```powershell
   Copy-Item .env.example.ps1 .env.ps1
   ```

2. Edit `.env.ps1` with your real credentials:
   ```powershell
   $env:DB_URL = "jdbc:postgresql://your-prod-host:5432/jura_lm_app"
   $env:DB_USER = "your_prod_user"
   $env:DB_PASSWORD = "your_prod_password"
   $env:PERPLEXITY_API_KEY = "your_key"
   ```

3. Load and run:
   ```powershell
   . .\.env.ps1
   .\run-prod.ps1
   ```

## CI/CD Setup

Set environment variables in your CI secret store:
- GitHub Actions: Repository Settings → Secrets → Actions
- GitLab CI: Settings → CI/CD → Variables
- Azure DevOps: Pipelines → Library → Variable groups

Required variables:
- `DB_URL`
- `DB_USER`
- `DB_PASSWORD`
- `PERPLEXITY_API_KEY` (optional)

## Demo vs Prod

- **`run-demo.ps1`**: Hardcoded local DB (safe to commit)
- **`run-prod.ps1`**: Env-driven (secrets from environment only)

Both display an environment tag in the GUI status bar.
