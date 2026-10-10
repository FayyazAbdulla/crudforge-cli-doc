---
title: QA & Playwright
description: Mock and live Keycloak verification loops, unit suites, and UI regression tests.
---

CRUDForge provides comprehensive test commands covering generator logic, authentication, UI state, per-field formatting, performance, and Playwright end-to-end tests.

## Test Commands (CLI Repository)

```bash
# Core generator test suite
npm test

# Specialized Node 24+ test suites
npm run test:auth               # Auth retry, refresh, and session error behavior
npm run test:ui-state           # List / card / form drawer state regressions
npm run test:field-preferences  # Per-field uppercase/lowercase & profile hydration
npm run test:performance        # Generation benchmarks & performance regressions
```

## End-to-End Testing

### Mock Mode (Deterministic & Offline)

```bash
# Runs generator & Playwright against deterministic mock identity provider
./test-run.sh mock

# Or run individual E2E steps:
npm run e2e:prepare && npm run test:e2e
npm run e2e:prepare:iam && npm run test:e2e:iam
```

### Live Keycloak Mode

Requires a `.env.qa` file (copy from `.env.qa.example`) containing live operator credentials.

```bash
# Runs against live Keycloak Admin Service gateway
./test-run.sh live

# Or run individual live E2E steps:
npm run e2e:prepare:iam:live
npm run test:e2e:iam:live
```

## Shared Sandbox Architecture

By default, `test-run.sh` and `e2e:prepare` generate a single Fuse application into the external testing sandbox:

```text
/Users/abdulla/Work/CRUD-FORDGE-SETUP/crud-fordge-testing-area/crudforge-app
```

- Override with `CRUDFORGE_TESTING_AREA` or `CRUDFORGE_E2E_APP_DIR`.
- For CI environments without an external folder, set `CRUDFORGE_USE_IN_REPO_E2E=1` to generate into `e2e/.app`.

## Best Practices for Contributors

1. **Modify Generator Templates**: Edit source templates under `src/templates/` and re-run `e2e:prepare` — never hand-patch files inside the generated test app.
2. **Deterministic Locators**: Use accessible roles and visible text locators rather than brittle CSS class selectors in Playwright specs.
3. **Use Mock Mode First**: Always verify changes locally using `./test-run.sh mock` before triggering live Keycloak workflows.
