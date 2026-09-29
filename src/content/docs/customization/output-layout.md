---
title: Output layout
description: What generate writes into a Fuse app.
---

## Typical Fuse root

```text
my-app/
├── config/crudforge.config.yml      # embedded preferences
├── AGENT_README.md                  # agent/human map
├── docs/ai/                         # ARCHITECTURE, ENTITIES, ROUTES, …
├── .crudforge/
├── .cursor/agents/                  # optional team pack
├── public/images/logo/              # brand PNGs
└── src/app/
    ├── app.ts                       # fuseTheme
    ├── core/auth/                   # if Keycloak
    ├── core/user-management/        # if iam.enabled
    └── domains/admin/modules/apps/  # entities
```

## Entity module (responsibility layout)

```text
…/book/
├── book.model.ts
├── book.routes.ts
├── service/book.service.ts
└── components/
    ├── presentation/list|card|detail/
    ├── forms/form|form-page|update/
    └── interaction/actions|filter/
```

## Agent docs

When `output.aiDocs.enabled` (default on for Fuse):

- Root `AGENT_README.md`
- `docs/ai/ARCHITECTURE.md`, `ENTITIES.md`, `ROUTES.md`, `UI_CONTRACTS.md`, `PRESERVATION.md`

These are for coding agents inside the generated app — separate from this public docs site.
