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
| `npm run shots:capture` | CRUD screenshots from mock e2e app (:4200) |
| `npm run shots:capture:iam` | IAM screenshots (`e2e:serve:iam` on :4201) |

## Screenshots

Product UI lives in `src/content/docs/assets/screenshots/` (colocated for Starlight). Capture from the CLI repo:

```bash
# terminal 1 — mock CRUD
cd ../crud-fordge && npm run e2e:prepare && npm run e2e:serve

# terminal 2
cd ../crud-fordge-doc && npm run shots:capture

# IAM shots
cd ../crud-fordge && npm run e2e:prepare:iam && npm run e2e:serve:iam
cd ../crud-fordge-doc && npm run shots:capture:iam
```

## Layout

```text
src/content/docs/
  getting-started/    # install + first app
  features/           # product gallery (CRUD, IAM, auth UX)
  customization/      # formMode, theme, generate toggles
  guides/             # CLI, config, Keycloak, QA
  reference/          # sync’d reference
  agents/             # docs-site agent team
src/content/docs/assets/screenshots/  # Playwright captures (colocated)
src/styles/brand.css
scripts/                 # sync, audit, capture
```

## Agent developer team

Cursor specialists under `.cursor/agents/`: docs-architect, content-writer, design-system, qa-docs, deploy-engineer. See [AGENTS.md](./AGENTS.md).

## Deploy

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Or connect the GitHub repo; workflow: `.github/workflows/docs.yml`.
