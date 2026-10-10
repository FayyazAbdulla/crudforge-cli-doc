---
title: Introduction
description: What CRUDForge is and how this docs site relates to the CLI.
---

**CRUDForge** (`@crudforge/cli`) is a developer-configurable Angular Material CRUD code generator. It maps **GDL** or **JDL** (JHipster Domain Language) schemas directly into high-fidelity standalone Angular 17+ components, types, services, and routes — scaffolded into a **Fuse** admin shell with SPA or SSR rendering.

This site is the **deployable product documentation**. It is separate from:

- Generated in-app Fuse Help Center / Documentation demos (stripped when `includePrebuilt: false`)
- Per-app `AGENT_README.md` and `docs/ai/*` (agent orientation seeded inside generated projects)

## Core Principles

1. **Project-Owned Inputs** — Initialize project-level configs (`config/crudforge.config.yml`) and schemas (`gdl/example.gdl`), edit them, and generate directly into the project root without nested folders.
2. **Generator is Source of Truth** — Edit `crud-fordge` templates and re-run generation with granular overwrite policies (`merge`, `ask`, `skip`, `overwrite`, `fail`).
3. **Secrets Stay Out of the Browser** — Keycloak admin operator passwords stay in `.env` via environment variable references (`adminUsernameEnv` / `adminPasswordEnv`). Generated apps use a public OIDC client.
4. **IAM is an Overlay** — Do not model `User` or `Role` as schema entities; enable `iam.enabled` as an overlay on top of Keycloak.
5. **Clean Shell & Root Theming** — Theme via root `fuseTheme` / `fuse.theme.primary` (brand violet `#791EFF`). Unused Fuse stock assets are stripped.

## Next Steps

- [Install](/getting-started/install/)
- [Generate your first app](/getting-started/first-app/)
- [CLI commands](/guides/cli/)
- [Keycloak & IAM](/guides/auth-keycloak/)

