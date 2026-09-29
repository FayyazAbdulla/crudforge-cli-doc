---
title: Introduction
description: What CRUDForge is and how this docs site relates to the CLI.
---

**CRUDForge** (`@crudforge/cli`) maps JDL or GDL schemas into high-fidelity standalone Angular components, services, and routes — optionally scaffolded into a **Fuse** admin shell.

This site is the **deployable product documentation**. It is separate from:

- Generated in-app Fuse Help Center / Documentation demos (stripped when `includePrebuilt: false`)
- Per-app `AGENT_README.md` / `docs/ai/*` (agent orientation inside a generated project)

## Principles

1. **Generator is source of truth** — edit `crud-fordge` templates; regenerate apps.
2. **Secrets stay out of the browser** — Keycloak passwords only via env refs in CLI/bootstrap.
3. **IAM is an overlay** — do not JDL-model User or Role.
4. **Theme from root** — Fuse `fuseTheme` / `fuse.theme.primary` (brand violet `#791EFF`).

## Next

- [Install](/getting-started/install/)
- [Generate your first app](/getting-started/first-app/)
- [Keycloak & IAM](/guides/auth-keycloak/)
