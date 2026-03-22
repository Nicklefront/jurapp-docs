# Repository Architecture Guide

## Overview

This project uses a three-way repository split to maximize security while providing excellent public access to documentation and downloads.

## Repository Structure

### 🔒 Private Repository: `jurapp-dev`
**Purpose:** Development, source code, backend deployment
**Access:** Private (you + selected collaborators)

**Contents:**
- All source code (`src/`, `jurapp-backend/`)
- Build configurations (`pom.xml`, `src_pom.xml`)
- CI/CD workflows (`.github/workflows/`)
- Infrastructure files (`docker-compose.yml`, `Dockerfile`)
- Package resources for installers
- Scripts and deployment configurations

**Security Features:**
- No public access to source code
- Protected backend logic
- Secure API keys and configurations
- Controlled development environment

---

### 📚 Public Repository: `jurapp-docs`
**Purpose:** Documentation website and information hub
**Access:** Public (everyone can read, you can write)

**Contents:**
- Documentation files (`docs/`)
- GitHub Pages configuration
- User guides and tutorials
- API documentation
- Contribution guidelines

**Features:**
- Served at `https://jurapp.de`
- Automatic sync from private repository
- Public contributions via Pull Requests
- Professional documentation site

---

### 📦 Public Repository: `jurapp-releases`
**Purpose:** Application distribution with custom download page
**Access:** Public (everyone can read, you can write)

**Contents:**
- Installer files (DMG, MSI, DEB)
- Custom download page
- Release metadata and checksums
- Version history
- System requirements

**Features:**
- Platform-specific downloads
- Security checksums for verification
- Automated release synchronization
- Professional download experience

---

## CI/CD Orchestration

### Cross-Repository Workflows

#### 1. Documentation Sync (`sync-docs.yml`)
```yaml
Trigger: Push to main with docs/ changes
Action: Sync docs/ to jurapp-docs repository
Authentication: PAT with write access
```

#### 2. Release Sync (`sync-releases.yml`)
```yaml
Trigger: New release published
Action: Copy installers to jurapp-releases repository
Features: Checksum generation, metadata updates
```

#### 3. Health Monitoring (`orchestrator.yml`)
```yaml
Schedule: Daily at 2 AM UTC
Actions: 
- Repository connectivity checks
- CI/CD pipeline health
- GitHub Pages status
- Download functionality verification
```

### Security Features

#### Authentication
- **Personal Access Tokens (PATs):** 30-day rotation
- **Least Privilege:** Minimal permissions per workflow
- **Encrypted Secrets:** All credentials stored securely

#### Monitoring
- **Health Checks:** Daily automated verification
- **Alert System:** Automatic issue creation on failures
- **Audit Trail:** Complete operation logging
- **Rollback Capability:** Automated rollback procedures

---

## Development Workflow

### 1. Local Development
```bash
# Work in private repository
git clone https://github.com/Nicklefront/jurapp-dev.git
cd jurapp-dev
# Develop and test locally
```

### 2. Commit and Push
```bash
git add .
git commit -m "Your changes"
git push origin main
```

### 3. Automated Processes
- **Documentation changes:** Auto-sync to `jurapp-docs`
- **Release creation:** Auto-sync to `jurapp-releases`
- **Health monitoring:** Daily checks and alerts

### 4. Public Access
- **Documentation:** Visit `https://jurapp.de`
- **Downloads:** Visit `https://github.com/Nicklefront/jurapp-releases`
- **Issues:** Report in respective public repositories

---

## Package Organization

### Source Code Structure
```
src/main/java/de/jurapp/
├── app/                    # Application entry point
├── config/                 # Configuration classes
├── domain/                 # Domain models and logic
│   └── base/              # Base domain classes
├── model/                  # Data models
├── data/                   # Data access layer
├── repository/             # Repository layer
│   └── base/              # Repository base classes
├── service/                # Business logic
│   └── base/              # Service base classes
├── fx/                     # JavaFX presentation
│   ├── dialogs/           # Modal dialogs
│   ├── tools/             # Developer tools
│   ├── components/        # Reusable UI components
│   ├── styles/            # Theme and styling
│   └── windows/           # Secondary windows
├── caseframe/              # DDD bounded context
├── util/                   # Utility classes
└── tools/                  # CLI tools
```

### Resource Organization
```
src/main/resources/
├── fxml/                   # JavaFX layouts
│   ├── dialogs/           # Dialog FXML files
│   ├── tools/             # Tool FXML files
│   ├── components/        # Component FXML files
│   └── windows/           # Window FXML files
├── css/                    # Stylesheets
├── db/migration/           # Database migrations
└── data/                   # Data files
```

---

## Security Best Practices

### Repository Security
1. **Private Repository:** Never expose source code publicly
2. **Access Control:** Minimal collaborators, regular reviews
3. **Branch Protection:** Protected main branch
4. **Code Review:** Required for all changes

### CI/CD Security
1. **Credential Rotation:** 30-day PAT rotation
2. **Least Privilege:** Minimal permissions per workflow
3. **Secret Management:** Encrypted GitHub secrets
4. **Audit Logging:** Complete operation tracking

### Data Protection
1. **No Secrets in Code:** All secrets in environment/secrets
2. **Environment Separation:** Different configs per environment
3. **Backup Strategy:** Regular repository backups
4. **Disaster Recovery:** Documented rollback procedures

---

## User Experience Flow

### Documentation Access
```
User → jurapp.de → GitHub Pages → Public documentation
```

### Application Download
```
User → jurapp.de → Download link → jurapp-releases → GitHub Releases → Download installer
```

### Development Access
```
Developer → jurapp-dev → Source code → CI/CD → Installers → Public release
```

---

## Migration Benefits

### Before (Single Repository)
- ❌ Source code exposed publicly
- ❌ Mixed concerns in single repo
- ❌ Complex access management
- ❌ Limited public contribution opportunities

### After (Three-Way Split)
- ✅ Maximum source code security
- ✅ Clear separation of concerns
- ✅ Professional public presence
- ✅ Controlled development environment
- ✅ Public documentation contributions
- ✅ Professional distribution channel
- ✅ Automated synchronization
- ✅ Comprehensive monitoring

---

## Troubleshooting

### Common Issues

#### Sync Failures
1. **Check PAT expiration:** Rotate tokens if needed
2. **Verify repository permissions:** Ensure proper access
3. **Check workflow logs:** Review GitHub Actions logs
4. **Manual sync:** Use workflow_dispatch trigger

#### Build Failures
1. **Check dependencies:** Verify Maven dependencies
2. **Test locally:** Run `mvn clean compile`
3. **Check Java version:** Ensure Java 21
4. **Review recent changes:** Check for breaking changes

#### Access Issues
1. **Verify repository access:** Check GitHub permissions
2. **Check token scopes:** Ensure proper PAT permissions
3. **Review collaborator list:** Add/remove as needed
4. **Check branch protection:** Verify branch rules

### Health Monitoring
- **Daily reports:** Automated health checks
- **Alert system:** Issues created on failures
- **Manual triggers:** Run health checks on demand
- **Status dashboard:** Monitor all repositories

---

## Future Enhancements

### Planned Improvements
1. **Automated Testing:** Enhanced test coverage
2. **Performance Monitoring:** CI/CD performance tracking
3. **Security Scanning**: Automated vulnerability scanning
4. **Backup Automation**: Automated repository backups

### Scalability Considerations
1. **Team Growth:** Access management for larger teams
2. **Feature Branches**: Enhanced branch management
3. **Release Automation**: More sophisticated release pipelines
4. **Documentation**: Enhanced documentation generation

---

This architecture provides maximum security while maintaining excellent public access and professional distribution channels.
## Testing Sync

This line added to test documentation sync workflow.

Sun Mar 22 18:50:12 CET 2026: Sync test successful!
## Testing Fixed Sync

Sun Mar 22 18:55:09 CET 2026: Testing the fixed sync-docs workflow.
