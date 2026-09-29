---
title: CLI commands
description: generate, init-config, validate, and bootstrap.
---

## generate

```bash
crudforge generate <schema.jdl> <output-dir> [options]
```

## init-config

```bash
crudforge init-config
```

## validate

```bash
crudforge validate <schema.jdl>
```

## bootstrap (Keycloak only)

Does **not** run during `generate`. Mutates a realm when `auth.provision.enabled: true`.

```bash
crudforge bootstrap --preferences ./crudforge.config.yml --env-file ./.env.qa
crudforge bootstrap --dry-run --preferences ./crudforge.config.yml --env-file ./.env.qa
crudforge bootstrap --cleanup --preferences ./crudforge.config.yml --env-file ./.env.qa
```

### Common options

- `-m, --microservice` — API route prefix
- `-p, --preferences` — config file
- `--keycloak` / `--kc-*` — Keycloak overrides
- `--proxy-write` — `both` \| `prod` \| `dev`
- `--env-file` / `--cleanup` — bootstrap credentials & state cleanup
