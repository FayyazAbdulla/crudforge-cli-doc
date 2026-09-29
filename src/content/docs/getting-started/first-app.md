---
title: Generate your first app
description: Scaffold a Fuse Angular CRUD app from JDL with clean layout.
---

## Minimal generate

```bash
crudforge generate ./example.jdl ./my-app --fuse --clean-layout
```

Useful flags:

| Flag | Purpose |
|------|---------|
| `--fuse` | Scaffold into Fuse starter |
| `--clean-layout` | Minimal shell (no Fuse demo chrome) |
| `-p, --preferences` | YAML/JSON config overrides |
| `-d, --dry-run` | Preview without writing |
| `-w, --overwrite-policy` | `overwrite` \| `skip` \| `fail` \| `ask` \| `merge` |

## What gets written

- Entity modules: list / card / form / detail / filter / service
- Shared UI under `apps/shared/` when using centralized shared pack
- Optional Keycloak auth + IAM when `auth.provider: keycloak`
- Embedded `config/crudforge.config.yml`, `AGENT_README.md`, `docs/ai/*`

## Form & search defaults

- `ui.formMode: sidebar` — **new and edit share the same mode** (drawer or page)
- `ui.searchMode: field` — JHipster-style `field.contains` (not Elasticsearch `query` unless you set `global`)

## Run the app

```bash
cd my-app
npm install
npm start
```

Sign-in behavior depends on auth config (`none` vs Keycloak mock/live).
