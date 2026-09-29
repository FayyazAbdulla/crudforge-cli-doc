---
title: QA & Playwright
description: Mock and live Keycloak verification loops.
---

From the **CRUDForge CLI** repo:

```bash
# Mock (deterministic)
./test-run.sh mock
npm test
npm run e2e:prepare && npm run test:e2e

# Live Keycloak (gitignored .env.qa)
./test-run.sh live
npm run e2e:prepare:iam:live
```

## Rules of thumb

- Edit generator sources in `crud-fordge/src/`, then re-run `e2e:prepare` — do not hand-patch the testing-area app.
- Demo sign-in is prefilled for mock/live configs.
- Prefer role/text locators over brittle CSS in Playwright.

Generated Fuse apps for QA live under `$CRUDFORGE_TESTING_AREA/crudforge-app` (default external testing area).
