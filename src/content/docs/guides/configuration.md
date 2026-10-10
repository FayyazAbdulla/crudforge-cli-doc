---
title: Configuration
description: Complete reference for crudforge.config.yml keys and structure.
---

CRUDForge uses `config/crudforge.config.yml` (or `--preferences`) to drive code generation, UI behavior, proxy targets, rendering, and authentication.

## Full Configuration Template

```yaml
# Input & Output
input:
  file: ./gdl/example.gdl
  type: gdl                 # gdl or jdl

output:
  directory: .
  overwritePolicy: fail     # fail | overwrite | skip | ask | merge
  structure: shared-central # shared-central (unified) or entity-folder (isolated)
  embedConfig: true         # Embeds config/crudforge.config.yml in generated app
  aiDocs:
    enabled: true           # Seeds AGENT_README.md & docs/ai/*
  teamPack:
    enabled: true           # Seeds .cursor/agents/, .codex/agents/, .vscode/

# Fuse Shell & Rendering
fuse:
  enabled: true
  rendering: spa            # spa (default) or ssr
  ssrAllowedHosts:          # Only when rendering is ssr
    - localhost
    - 127.0.0.1
    - admin.example.com
  cleanLayout: true         # Strips Fuse demo apps & promo banners
  includePrebuilt: false
  sidebarTheme: white       # white or dark
  folderType: ""            # microservice or micro-functions
  theme:
    scheme: system          # system | light | dark
    primary: "#791EFF"      # Brand violet
    error: "#dc2626"

# Per-Field Formatting & Audit Controls
fields:
  entities:
    Province:
      fields:
        provinceCode: { inputFormat: uppercase } # uppercase | lowercase | none
        provinceName: { inputFormat: lowercase }
        index: { inputFormat: none }
  audit:
    hideInForms: true       # Hide createdBy/createdDate/etc in forms
    hideInFilters: true     # Hide in filter drawers
    hideInSearch: true      # Hide from search field selector
    hideInLists: false      # Initial state in Column Preferences

# UI & Layout Modes
ui:
  viewMode: table           # Default view (table or cards)
  formMode: sidebar         # sidebar (mat-drawer) or page — shared by new & edit
  searchMode: field         # field (field.contains) or global (Elasticsearch query)
  cardBreakpointPx: 640     # Below this width, lists switch to cards
  gridCols:
    mobile: 1
    tablet: 2
    desktop: 3

# Development Server
devServer:
  port: 4200

# Backend API & Proxies
api:
  baseUrl: /api
  microservice: book-service
  services:
    identityaccessmodule: http://62.84.188.166:30084
    # Per-environment targets:
    # book-service:
    #   prod: http://host:30084
    #   dev: http://host:31704
    #   pathRewrite: /book-service

proxy:
  write: both               # both (proxy.conf.json & proxy.dev.conf.json) | prod | dev
  routes:                   # Explicit proxy overrides
    - context: /api/custom
      target: http://localhost:8080
      secure: false
      changeOrigin: true

# Keycloak Authentication & Session
auth:
  provider: none            # none or keycloak
  serverUrl: http://62.84.188.166:31740 # Base URL or Admin Service gateway
  realm: CRUD-FORDGE
  clientId: crudforge-client-QA
  useMockAuth: false        # true for offline demos / deterministic Playwright
  forwardedProto: https     # X-Forwarded-Proto header
  adminRoles: [ROLE_ADMIN, ADMIN, ROLE_SUPER_ADMIN]
  signInPrefill:            # Pre-binds login form for QA workflows
    username: crud
    password: crud
  session:
    idleTimeoutMs: 0        # 0 = stay signed in until logout
    persistAcrossReload: true
    crossTabSync: true
    refreshOnFocus: true
    statusProbeIntervalMs: 60000
  disabledAccount:
    enabled: false          # Shell freeze + countdown on disabled account grant
    countdownSeconds: 20
    message: "Your account has been disabled. Please contact your administrator."
    sound: false
  provision:
    enabled: false          # true only for `crudforge bootstrap`
    adapter: admin-service  # admin-service or keycloak-admin-rest
    adminServiceUrl: http://62.84.188.166:31740/
    adminUsernameEnv: KEYCLOAK_ADMIN_USERNAME
    adminPasswordEnv: KEYCLOAK_ADMIN_PASSWORD

# IAM Overlay
iam:
  enabled: false            # Enable User Management & Permission Matrices
  roles: true
  rolePermissions: true
  userAccess: true
  userPermissions: true
  screens: []

# Optional Git Project Integration
project:
  repositoryUrl: "https://github.com/org/my-app.git"
```

## Related Guides

- [Keycloak & IAM setup](/guides/auth-keycloak/)
- [Session & disabled account overlay](/guides/session/)
- [UI modes customization](/customization/ui-modes/)
- [Config keys reference](/reference/config-keys/)

