# Three-Way Repository Setup Guide

This guide walks you through setting up the three-way repository split for maximum security and public access.

## Overview

The three-way repository split consists of:
1. **Private Repository**: `jurapp-dev` (development)
2. **Public Documentation**: `jurapp-docs` (documentation website)
3. **Public Releases**: `jurapp-releases` (application distribution)

## Prerequisites

- GitHub account with admin permissions
- Git installed locally
- Maven for building
- Java 21 for development

## Step 1: Create Public Repositories

### Create Documentation Repository
```bash
# 1. Go to GitHub and create new repository
# Repository name: jurapp-docs
# Visibility: Public
# Initialize with: README.md, CNAME

# 2. Clone locally
git clone https://github.com/Nicklefront/jurapp-docs.git
cd jurapp-docs

# 3. Create basic structure
mkdir -p docs
echo "jurapp.de" > CNAME

# 4. Create basic README
cat > README.md << EOF
# JuraApp Documentation

Public documentation repository for JuraApp.

## Website

Visit [jurapp.de](https://jurapp.de) for the full documentation.

## Repository Structure

- \`docs/\`: Documentation files served by GitHub Pages
- \`CNAME\`: Custom domain configuration
- \`.github/workflows/\`: GitHub Pages deployment

---

This repository contains only public documentation and is automatically synced from the private development repository.
EOF

# 5. Commit and push
git add .
git commit -m "Initial documentation repository setup"
git push origin main
```

### Create Releases Repository
```bash
# 1. Go to GitHub and create new repository
# Repository name: jurapp-releases
# Visibility: Public
# Initialize with: README.md

# 2. Clone locally
git clone https://github.com/Nicklefront/jurapp-releases.git
cd jurapp-releases

# 3. Create basic structure
mkdir -p releases _data

# 4. Create basic README
cat > README.md << EOF
# JuraApp Releases

Public release repository for JuraApp installers.

## Downloads

Visit our [Releases page](https://github.com/Nicklefront/jurapp-releases/releases) to download the latest version of JuraApp.

## Available Platforms

- **Windows**: .msi installer
- **macOS**: .dmg disk image
- **Linux**: .deb package

## Repository Structure

- \`releases/\`: Version-specific installer files
- \`.github/workflows/\`: Release automation
- \`_data/\`: Release metadata

---

This repository contains only public releases and is automatically synced from the private development repository.
EOF

# 5. Create initial metadata
cat > _data/releases.yml << EOF
latest: "v1.0.0"
versions:
  - version: "v1.0.0"
    date: "2024-01-01"
    assets: []
EOF

# 6. Commit and push
git add .
git commit -m "Initial releases repository setup"
git push origin main
```

## Step 2: Configure GitHub Pages

### Enable GitHub Pages for Documentation
```bash
# In the jurapp-docs repository on GitHub:
# 1. Go to Settings → Pages
# 2. Source: Deploy from a branch
# 3. Branch: main
# 4. Folder: /docs
# 5. Custom domain: jurapp.de
# 6. Save

# Wait a few minutes for GitHub Pages to activate
```

### Configure Custom Domain
```bash
# In the jurapp-docs repository:
# 1. CNAME file already exists with "jurapp.de"
# 2. Go to your DNS provider
# 3. Add CNAME record: jurapp.de → nicklefront.github.io
# 4. Wait for DNS propagation (usually 24-48 hours)
```

## Step 3: Set Up Personal Access Tokens

### Create Documentation Sync PAT
```bash
# 1. Go to https://github.com/settings/tokens/new
# 2. Name: jurapp-docs-sync
# 3. Expiration: 30 days
# 4. Scopes: repo (full control of private repos)
# 5. Click "Generate token"
# 6. Copy the token immediately
```

### Create Releases Sync PAT
```bash
# 1. Go to https://github.com/settings/tokens/new
# 2. Name: jurapp-releases-sync
# 3. Expiration: 30 days
# 4. Scopes: repo (full control of private repos)
# 5. Click "Generate token"
# 6. Copy the token immediately
```

## Step 4: Configure Private Repository Secrets

### Add Secrets to Private Repository
```bash
# In the jurapp-dev repository on GitHub:
# 1. Go to Settings → Secrets and variables → Actions
# 2. Click "New repository secret"

# Add these secrets:
# DOCS_SYNC_PAT: [Documentation sync PAT from Step 3]
# RELEASES_SYNC_PAT: [Releases sync PAT from Step 3]
```

## Step 5: Update Repository Configuration

### Update Remote Configuration
```bash
# In your private repository (jurapp-dev):
git remote -v
# Should show: origin https://github.com/Nicklefront/jura-lm-app.git

# Rename to jurapp-dev if needed:
git remote set-url origin https://github.com/Nicklefront/jurapp-dev.git
```

### Make Repository Private
```bash
# On GitHub for the jurapp-dev repository:
# 1. Go to Settings → General
# 2. Scroll to "Danger Zone"
# 3. Click "Change visibility"
# 4. Select "Private"
# 5. Confirm the change
```

## Step 6: Test Workflows

### Test Documentation Sync
```bash
# In jurapp-dev repository:
# 1. Make a change to docs/ folder
echo "# Test Change" >> docs/test.md
git add docs/test.md
git commit -m "Test documentation sync"
git push origin main

# 2. Monitor the Actions tab for sync-docs workflow
# 3. Check jurapp-docs repository for the change
```

### Test Release Sync
```bash
# In jurapp-dev repository:
# 1. Create a test release
git tag -a v1.0.0-test -m "Test release"
git push origin v1.0.0-test

# 2. Monitor the Actions tab for sync-releases workflow
# 3. Check jurapp-releases repository for the release
```

### Test Health Monitoring
```bash
# In jurapp-dev repository:
# 1. Go to Actions tab
# 2. Find "Repository Orchestrator" workflow
# 3. Click "Run workflow"
# 4. Check the results
```

## Step 7: Update Documentation

### Update Download Links
```javascript
// In jurapp-docs/docs/js/config.js:
const GITHUB_USER = "Nicklefront";
const GITHUB_REPO = "jurapp-releases";  // Point to releases repo
```

### Update Repository References
```markdown
// In documentation files:
// Update any links to point to the correct repositories
// - Source code references → jurapp-dev (private)
// - Documentation references → jurapp-docs (public)
// - Download references → jurapp-releases (public)
```

## Step 8: Configure Access Management

### Set Up Collaborators
```bash
# Private Repository (jurapp-dev):
# - Add trusted developers as collaborators
# - Set up branch protection rules
# - Configure required reviews

# Public Repositories (jurapp-docs, jurapp-releases):
# - You maintain write access
# - Public gets read access automatically
# - Consider enabling issues for public feedback
```

### Configure Branch Protection
```bash
# In jurapp-dev repository:
# 1. Go to Settings → Branches
# 2. Add branch protection rule for main
# 3. Require pull request reviews
# 4. Require status checks to pass
# 5. Include administrators
# 6. Save changes
```

## Step 9: Final Verification

### Test Complete Workflow
```bash
# 1. Make a documentation change
# 2. Commit and push to jurapp-dev
# 3. Verify sync to jurapp-docs
# 4. Check GitHub Pages at jurapp.de
# 5. Create a release
# 6. Verify sync to jurapp-releases
# 7. Test download from releases page
# 8. Run health monitoring
```

### Check Security
```bash
# Verify:
# - Private repo is not accessible publicly
# - Public repos are accessible
# - GitHub Pages is working
# - Download links work correctly
# - Workflows are functioning
```

## Troubleshooting

### Common Issues

#### PAT Authentication Failures
```bash
# Symptoms: Sync workflows fail with 401/403 errors
# Solutions:
# 1. Check PAT expiration
# 2. Verify PAT scopes
# 3. Update repository secrets
# 4. Regenerate PAT if needed
```

#### GitHub Pages Not Working
```bash
# Symptoms: jurapp.de doesn't load
# Solutions:
# 1. Check CNAME file
# 2. Verify DNS configuration
# 3. Check GitHub Pages status
# 4. Wait for DNS propagation
```

#### Sync Workflows Not Running
```bash
# Symptoms: Changes not syncing to public repos
# Solutions:
# 1. Check workflow permissions
# 2. Verify PAT permissions
# 3. Check workflow logs
# 4. Manually trigger workflows
```

### Health Monitoring
```bash
# Check daily health reports:
# 1. Go to Actions tab in jurapp-dev
# 2. Find "Repository Orchestrator" workflow
# 3. Check latest run results
# 4. Review health report artifacts
```

## Maintenance

### Monthly Tasks
```bash
# 1. Rotate PATs (every 30 days)
# 2. Review repository access
# 3. Check workflow performance
# 4. Update documentation
# 5. Backup critical configurations
```

### Quarterly Tasks
```bash
# 1. Security audit
# 2. Access review
# 3. Performance optimization
# 4. Documentation updates
# 5. Backup verification
```

## Success Criteria

Your setup is complete when:
- ✅ Private repository is secure and not publicly accessible
- ✅ Documentation website works at jurapp.de
- ✅ Download page works in jurapp-releases repository
- ✅ All workflows are functioning correctly
- ✅ Health monitoring passes all checks
- ✅ Security best practices are implemented

## Support

For issues with:
- **Private Repository**: Check GitHub repository settings
- **Documentation**: Check GitHub Pages configuration
- **Releases**: Check workflow permissions and PATs
- **Sync Issues**: Review workflow logs and PAT configuration

---

This setup provides maximum security while maintaining excellent public access to documentation and downloads.
## Testing Sync Workflow

Sun Mar 22 18:53:19 CET 2026: Testing sync-docs workflow functionality.
