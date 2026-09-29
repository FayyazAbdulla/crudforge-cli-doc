# CRUDForge Docs — agent map

This is the **documentation site** for `@crudforge/cli` (Astro Starlight).  
Sibling product repo: `../crud-fordge` (override with `CRUDFORGE_CLI_PATH`).

## Commands

```bash
npm install
npm run dev          # http://127.0.0.1:4321
npm run build
npm run design:audit
npm run sync:readme  # → tmp/sync-notes.md
```

## Agent team (Cursor)

| File | Role |
|------|------|
| `.cursor/agents/docs-architect.md` | IA / sidebar |
| `.cursor/agents/content-writer.md` | MD/MDX |
| `.cursor/agents/design-system.md` | Brand / CSS / logos |
| `.cursor/agents/qa-docs.md` | Build & audits |
| `.cursor/agents/deploy-engineer.md` | Vercel / CI |

Always-on: `.cursor/rules/docs-site.mdc`  
Skill: `.cursor/skills/docs-sync/SKILL.md`

## Design

- Primary: `#791EFF`
- Logos: `public/logo.png`, `public/logo-mark.png`
- Theme CSS: `src/styles/brand.css`

## Deploy

Static Astro → Vercel (`vercel.json`). No server secrets required.
