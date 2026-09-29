# CRUDForge Docs

Deployable product documentation for **[@crudforge/cli](https://github.com/TeamCodeMe/crud-fordge)** — Astro **Starlight**, brand violet `#791EFF`.

## Quick start

```bash
cd crud-fordge-doc
npm install
npm run design:audit
npm run dev
```

Open [http://127.0.0.1:4321](http://127.0.0.1:4321).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local Starlight |
| `npm run build` | Static `dist/` |
| `npm run design:audit` | Logos + brand tokens |
| `npm run sync:readme` | Draft notes from sibling CLI README |

## Agent developer team

Cursor specialists under `.cursor/agents/`:

1. **docs-architect** — structure  
2. **content-writer** — pages  
3. **design-system** — visual brand  
4. **qa-docs** — verify build  
5. **deploy-engineer** — Vercel / CI  

See [AGENTS.md](./AGENTS.md) and the in-site [Agent team](/agents/overview/) section after `npm run dev`.

## Deploy

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Or connect the GitHub repo; workflow: `.github/workflows/docs.yml`.

## Layout

```text
src/content/docs/     # Starlight pages
src/styles/brand.css  # Theme tokens
public/logo*.png      # Brand assets
.cursor/agents/       # Specialist agents
scripts/              # sync + design audit
```
