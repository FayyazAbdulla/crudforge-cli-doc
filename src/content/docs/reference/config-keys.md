---
title: Config keys
description: Complete reference table of all CRUDForge configuration properties.
---

Below is the full matrix of configuration keys supported in `config/crudforge.config.yml`.

## Input & Output

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `input.file` | `string` | `./gdl/example.gdl` | Path to the schema file (relative to project root). |
| `input.type` | `string` | `gdl` | Schema format: `gdl` or `jdl`. |
| `output.directory` | `string` | `.` | Target output directory (relative to project root). |
| `output.overwritePolicy` | `string` | `fail` | Overwrite policy: `fail`, `overwrite`, `skip`, `ask`, `merge`. |
| `output.structure` | `string` | `shared-central` | Module structure: `shared-central` (unified) or `entity-folder` (isolated). |
| `output.embedConfig` | `boolean` | `true` | Embeds `config/crudforge.config.yml` in generated project. |
| `output.aiDocs.enabled` | `boolean` | `true` | Generates root `AGENT_README.md` and `docs/ai/*` agent orientation packs. |
| `output.teamPack.enabled` | `boolean` | `true` | Seeds `.cursor/agents/`, `.codex/agents/`, and `.vscode/` configurations. |

## Fuse & Rendering

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `fuse.enabled` | `boolean` | `true` | Generates full Fuse Angular admin layout. |
| `fuse.rendering` | `string` | `spa` | Rendering strategy: `spa` (client-side) or `ssr` (Angular Universal SSR). |
| `fuse.ssrAllowedHosts` | `string[]` | `[]` | Allowed host names for Node SSR server (e.g. `[localhost, 127.0.0.1]`). |
| `fuse.cleanLayout` | `boolean` | `true` | Strips pre-built Fuse demo apps, banners, and promotional UI. |
| `fuse.includePrebuilt` | `boolean` | `false` | Includes Fuse stock pages (cards, photos, demo apps). |
| `fuse.sidebarTheme` | `string` | `white` | Sidebar theme style: `white` or `dark`. |
| `fuse.folderType` | `string` | `""` | Module subfolder grouping: `microservice` or `micro-functions`. |
| `fuse.theme.scheme` | `string` | `system` | Color scheme: `system`, `light`, or `dark`. |
| `fuse.theme.primary` | `string` | `#791EFF` | Primary brand color (Hex). |
| `fuse.theme.error` | `string` | `#dc2626` | Error state color (Hex). |

## Fields & Formatting

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `fields.entities.<Entity>.fields.<Field>.inputFormat` | `string` | `none` | Real-time text formatting: `uppercase`, `lowercase`, `none`. Supported on String/TextBlob. |
| `fields.audit.hideInForms` | `boolean` | `true` | Hides audit fields (`createdBy`, `createdDate`, etc.) in create/edit forms. |
| `fields.audit.hideInFilters` | `boolean` | `true` | Hides audit fields from advanced filter drawer. |
| `fields.audit.hideInSearch` | `boolean` | `true` | Hides audit fields from list search dropdown. |
| `fields.audit.hideInLists` | `boolean` | `false` | Initial visibility of audit fields in column preferences. |

## UI & Layout Modes

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `ui.viewMode` | `string` | `table` | Default entity list view: `table` or `card`. |
| `ui.formMode` | `string` | `sidebar` | Drawer or page mode (`sidebar` or `page`). Shared across new and edit. |
| `ui.searchMode` | `string` | `field` | Search mode: `field` (`field.contains`) or `global` (`query` endpoint). |
| `ui.cardBreakpointPx` | `number` | `640` | Viewport width threshold in px to automatically switch from table to cards. |
| `ui.gridCols.desktop` | `number` | `3` | Card columns for desktop view. |
| `ui.gridCols.tablet` | `number` | `2` | Card columns for tablet view. |
| `ui.gridCols.mobile` | `number` | `1` | Card columns for mobile view. |

## Server, API & Proxy

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `devServer.port` | `number` | `4200` | Port for `npm run dev`. |
| `api.baseUrl` | `string` | `/api` | Base prefix for API clients. |
| `api.microservice` | `string` | `""` | Microservice identifier for route prefixes (`/services/<name>`). |
| `api.services` | `object` | `{}` | Map of backend microservice endpoints and path rewrites. |
| `proxy.write` | `string` | `both` | Which proxy configs to update: `both`, `prod`, `dev`. |
| `proxy.routes` | `array` | `[]` | Explicit proxy route configurations. |

## Authentication & Session (Keycloak)

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `auth.provider` | `string` | `none` | Auth provider: `none` or `keycloak`. |
| `auth.serverUrl` | `string` | `""` | Keycloak server base URL or Admin Service gateway URL. |
| `auth.realm` | `string` | `""` | Keycloak realm name. |
| `auth.clientId` | `string` | `""` | Keycloak public client ID. |
| `auth.useMockAuth` | `boolean` | `false` | True for deterministic offline demos and mock Playwright tests. |
| `auth.forwardedProto` | `string` | `https` | `X-Forwarded-Proto` header for reverse proxies. |
| `auth.adminRoles` | `string[]` | `[ROLE_ADMIN, ADMIN, ...]` | Roles that bypass client-side ACL checks. |
| `auth.signInPrefill.username` | `string` | `""` | Optional prefilled login username for QA. |
| `auth.signInPrefill.password` | `string` | `""` | Optional prefilled login password for QA. |
| `auth.session.idleTimeoutMs` | `number` | `0` | Inactivity logout timeout (0 = stay signed in). |
| `auth.session.persistAcrossReload` | `boolean` | `true` | Preserves auth session across browser page reloads. |
| `auth.session.crossTabSync` | `boolean` | `true` | Automatically signs out tab if another tab logs out. |
| `auth.session.refreshOnFocus` | `boolean` | `true` | Triggers token refresh when browser tab receives focus. |
| `auth.session.statusProbeIntervalMs` | `number` | `60000` | Background probe interval for account status checks. |
| `auth.disabledAccount.enabled` | `boolean` | `false` | Enables full shell freeze and countdown on disabled account. |
| `auth.disabledAccount.countdownSeconds` | `number` | `20` | Countdown seconds before forced sign-out. |
| `auth.provision.enabled` | `boolean` | `false` | Must be `true` for `crudforge bootstrap` provisioning. |
| `auth.provision.adapter` | `string` | `keycloak-admin-rest` | Provision adapter: `admin-service` or `keycloak-admin-rest`. |
| `auth.provision.adminServiceUrl` | `string` | `""` | URL of Keycloak admin service gateway. |
| `auth.provision.adminUsernameEnv` | `string` | `KEYCLOAK_ADMIN_USERNAME` | Env var name holding admin operator username. |
| `auth.provision.adminPasswordEnv` | `string` | `KEYCLOAK_ADMIN_PASSWORD` | Env var name holding admin operator password. |

## IAM Overlay

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `iam.enabled` | `boolean` | `false` | Enables User Management and Screen Access matrices. |
| `iam.roles` | `boolean` | `true` | Enables Role Management view (`/admin/user-management/roles`). |
| `iam.rolePermissions` | `boolean` | `true` | Enables Role Permissions matrix (`/admin/user-management/role-permissions`). |
| `iam.userAccess` | `boolean` | `true` | Enables User-to-Roles assignment (`/admin/user-management/:id/access`). |
| `iam.userPermissions` | `boolean` | `true` | Enables User-to-Screens permission matrix (`/admin/user-management/:id/permissions`). |
| `iam.screens` | `string[]` | `[]` | Additional screen IDs to include in ACL matrices beyond nav items. |

## Project Integration

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `project.repositoryUrl` | `string` | `""` | Remote git repository URL (initializes git and sets origin). |

