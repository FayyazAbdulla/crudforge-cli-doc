---
title: Roles & handoffs
description: Specialist agents for architecture, content, design, QA, and deploy.
---

| Agent | Owns |
|-------|------|
| `docs-architect` | Information architecture, sidebar, page contracts |
| `content-writer` | Markdown/MDX accuracy vs CLI behavior |
| `design-system` | Brand CSS, logos, splash, accessibility of chrome |
| `qa-docs` | `astro build`, link sanity, sync script checks |
| `deploy-engineer` | `vercel.json`, GitHub Actions, env/domain |

Agents live in `.cursor/agents/*.md`. Always-on rules live in `.cursor/rules/`.

When a user asks to “update docs for X”, start with **docs-architect**, then content, then QA.
