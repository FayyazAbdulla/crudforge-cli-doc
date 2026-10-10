---
title: Generate toggles
description: Turn components on/off and control rendering and overwrite behavior.
---

## Component Switches

```yaml
generate:
  models: true
  services: true
  formServices: true
  routes: true
  enums: true
  relationships: true
  components:
    list: true
    card: true
    detail: true
  forms:
    form: true
    formPage: true
    update: true
    validators: true
    mappers: true
  interaction:
    actions: true
    filter: true
  globals:
    constants: true
    tests: false
    sharedAssets: true
  registrations:
    navigation: true
    routes: true
```

Disable what you do not need before first generate to keep the app lean.

## Overwrite Policy

```yaml
output:
  overwritePolicy: fail  # fail | overwrite | skip | ask | merge
```

| Policy | Behavior |
|--------|----------|
| `fail` | Aborts generation immediately if any existing file differs (default). |
| `overwrite` | Explicitly replaces generated files. |
| `skip` | Keeps existing differing files. |
| `ask` | Prompts interactively on conflicts (fails in non-interactive CI). |
| `merge` | Preserves matching `// cforge-` custom-code zones. |

> [!NOTE]
> Source configuration (`config/crudforge.config.yml`) and schema files (`gdl/*`) are protected and never overwritten, even with `overwritePolicy: overwrite`.

## Fuse Shell & Rendering

```yaml
fuse:
  enabled: true
  rendering: spa        # spa (default client-side) or ssr (Node SSR)
  ssrAllowedHosts:      # Required when rendering: ssr
    - localhost
    - 127.0.0.1
    - admin.example.com
  cleanLayout: true     # Strips promo banners & demo chrome
  includePrebuilt: false
  sidebarTheme: white   # white or dark
  folderType: ""        # microservice | micro-functions when grouping
```

## Per-Field Formatting & Audit Controls

```yaml
fields:
  entities:
    Province:
      fields:
        provinceCode: { inputFormat: uppercase } # uppercase | lowercase | none
        provinceName: { inputFormat: lowercase }
        index: { inputFormat: none }
  audit:
    hideInForms: true
    hideInFilters: true
    hideInSearch: true
    hideInLists: false
```

- `inputFormat`: `uppercase`, `lowercase`, or `none`. Applies to editable `String` and `TextBlob` fields.
- `audit.*`: Controls whether audit metadata (`createdBy`, `createdDate`, `lastModifiedBy`, `lastModifiedDate`) appear in forms, filter drawers, search selectors, or initial list column preferences.

## Output Structure

```yaml
output:
  structure: shared-central  # shared-central (unified) or entity-folder (isolated)
```

See [Output layout](/customization/output-layout/).

