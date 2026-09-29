---
title: How agents work here
description: Automated developer team for the CRUDForge docs site.
---

This repository ships a **Cursor agent team** under `.cursor/agents/` plus rules and a sync skill.

## Goals

1. Keep docs accurate with the CLI (`../crud-fordge` or linked clone).
2. Preserve brand (violet `#791EFF`, logo assets).
3. Ship a static Starlight site to Vercel without hand-editing generated Fuse apps.

## Automation entry points

| Command | Purpose |
|---------|---------|
| `npm run sync:readme` | Pull high-signal sections from the CLI README into draft notes |
| `npm run design:audit` | Check brand CSS tokens + logo files exist |
| `npm run build` | Production static build |

## Handoff order (typical feature docs)

1. **docs-architect** — IA / sidebar / page outline  
2. **content-writer** — MD/MDX pages  
3. **design-system** — brand CSS / splash / logo  
4. **qa-docs** — links, build, broken refs  
5. **deploy-engineer** — Vercel / CI  

See [Roles & handoffs](/agents/roles/).
