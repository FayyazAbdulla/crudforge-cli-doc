---
title: Configuration
description: crudforge.config.yml keys that matter for Fuse generate.
---

Prefer a project `crudforge.config.yml` (or `--preferences`) over one-off CLI prompts.

## Fuse

```yaml
fuse:
  enabled: true
  cleanLayout: true
  includePrebuilt: false
  theme:
    scheme: system
    primary: "#791EFF"
    error: "#dc2626"
```

## UI

```yaml
ui:
  formMode: sidebar   # or page — applies to both new and edit
  searchMode: field   # field.contains; use global only if API accepts query
  viewMode: table
```

## Output

```yaml
output:
  overwritePolicy: overwrite  # skip | fail | ask | merge
  embedConfig: true
  teamPack:
    enabled: true
```

## API / proxy

```yaml
api:
  baseUrl: /api
  microservice: book-service
  services:
    identityaccessmodule: http://host:30084

proxy:
  write: both
```

See also [Keycloak & IAM](/guides/auth-keycloak/) and [Session](/guides/session/).
