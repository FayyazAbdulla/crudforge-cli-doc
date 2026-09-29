---
title: Generate toggles
description: Turn components on/off and control overwrite behavior.
---

## Component switches

```yaml
generate:
  models: true
  services: true
  routes: true
  relationships: true
  components:
    list: true
    card: true
    detail: true
  forms:
    form: true
    formPage: true
  interaction:
    actions: true
    filter: true
```

Disable what you don’t need before first generate to keep the app lean.

## Overwrite policy

```yaml
output:
  overwritePolicy: overwrite  # skip | fail | ask | merge
```

| Policy | Behavior |
|--------|----------|
| `overwrite` | Replace generated files |
| `skip` | Keep existing |
| `fail` | Abort on conflict |
| `ask` | Report conflicts |
| `merge` | Preserve `// cforge-` custom zones |

Never strip custom `// cforge-` merge zones when using merge.

## Fuse layout flags

```yaml
fuse:
  enabled: true
  cleanLayout: true
  includePrebuilt: false
  sidebarTheme: white   # or dark
  folderType: ""        # microservice | micro-functions when grouping
```

## Output structure

```yaml
output:
  structure: entity-folder   # or shared-central
```

See [Output layout](/customization/output-layout/).
