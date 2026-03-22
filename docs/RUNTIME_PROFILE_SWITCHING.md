# Runtime Environment Profile Switching

## Overview
The application now supports **runtime switching** between DEMO and PROD database environments without restarting.

## Features Integrated

### 1. **EnvironmentProfile Enum**
Type-safe profile representation with defaults:
- **DEMO**: Local Docker PostgreSQL (`localhost:55432`)
- **PROD**: Production database (credentials from env vars)

### 2. **Profile-Aware Configuration**
`Config.java` now supports profile-specific environment variables with fallback chain:
```
DB_URL_DEMO → DB_URL → Profile Default
DB_USER_DEMO → DB_USER → Profile Default
DB_PASSWORD_DEMO → DB_PASSWORD → Profile Default
```

Same pattern for PROD: `DB_URL_PROD`, `DB_USER_PROD`, `DB_PASSWORD_PROD`

### 3. **DatabaseManager Profile Switching**
```java
dbManager.switchProfile(EnvironmentProfile.PROD);
```
- Closes old connection
- Updates Config profile
- Reconnects with new credentials
- Notifies all listeners

### 4. **GUI ComboBox Toggle**
- **Location**: Top menu bar, between Menu and Reconnect button
- **Action**: Select DEMO or PROD from dropdown
- **Confirmation**: Dialog asks for confirmation before switching
- **Auto-refresh**: All tabs reload data from new DB after switch
- **Visual feedback**: Toast notification confirms switch success/failure

### 5. **Enhanced Listener Pattern**
```java
public interface DatabaseStateListener {
    void onConnected(NormRepository repo);
    void onDisconnected();
    void onConnectionFailed(String reason);
    void onProfileChanged(EnvironmentProfile newProfile);
}
```

## Usage

### Command-Line Launch (Recommended for Safety)
```powershell
# Demo (local)
.\run-demo.ps1

# Prod (requires .env.ps1)
. .\.env.ps1
.\run-prod.ps1
```

### Runtime Switching (Power Users)
1. Launch with any profile
2. Click **Profile ComboBox** in menu bar
3. Select **Demo** or **Production**
4. Confirm dialog
5. App reconnects and refreshes all views

## Profile-Specific Environment Variables

### Demo
```powershell
$env:DB_URL_DEMO = "jdbc:postgresql://localhost:55432/jura_lm_app"
$env:DB_USER_DEMO = "postgres"
$env:DB_PASSWORD_DEMO = "postgres"
```

### Production
```powershell
$env:DB_URL_PROD = "jdbc:postgresql://prod-host:5432/jura_lm_app"
$env:DB_USER_PROD = "jurapp"
$env:DB_PASSWORD_PROD = "secure-password"
```

### Generic Fallbacks (still supported)
```powershell
$env:DB_URL = "..."
$env:DB_USER = "..."
$env:DB_PASSWORD = "..."
```

## Safety Features

1. **Confirmation Dialog**: Prevents accidental switches
2. **Separate Scripts**: CI/CD uses profile-specific launchers (no accidental prod)
3. **No Secrets in Git**: `.env.ps1` excluded, template provided
4. **Fallback Chain**: Profile → Generic → Default (graceful degradation)
5. **Connection Validation**: Failed switches revert ComboBox selection

## Architecture Benefits

✅ **Type Safety**: Enum-based profiles instead of strings  
✅ **Flexibility**: Runtime switching for local dev, separate scripts for deploy  
✅ **Visibility**: GUI shows current profile and environment tag  
✅ **Isolation**: Profile-specific env vars prevent credential leakage  
✅ **Backward Compatible**: Generic env vars still work as fallback

## Migration Notes

- Existing `run-demo.ps1` / `run-prod.ps1` scripts **unchanged** (still set generic env vars)
- Optional: Add profile-specific vars to `.env.ps1` for multi-profile local testing
- GUI ComboBox auto-detects profile from `APP_ENV` / `ENV_NAME` / `DB_ENV_NAME`

**No breaking changes—pure enhancement.**
