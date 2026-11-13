---
title: CLI commands
description: Comprehensive reference for crudforge init, generate, preset, validate, and bootstrap.
---

CRUDForge provides commands to initialize projects, manage presets, validate schemas, generate Angular code, and bootstrap Keycloak IAM resources.

## `crudforge init`

Initializes a new project directory with editable configuration and sample schema without generating the full codebase immediately.

```bash
crudforge init <directory>
```

### With Preset

Imports settings from an existing Angular project (such as PMB) into a reusable preset:

```bash
crudforge init <directory> --preset pmb-test --source /path/to/PMB/pmb-admin
```

## `crudforge generate`

Generates the Angular application according to the discovered configuration and schema.

### Project-owned generate (recommended)

When run inside an initialized project directory, `generate` automatically discovers the configuration:

```bash
cd my-app
crudforge generate [options]
```

### Re-generating existing projects

When updating schemas or re-running generation, use `--overwrite-policy merge` to preserve developer modifications and protect other microservices:

```bash
# Safe incremental regeneration
crudforge generate --overwrite-policy merge

# Target only a specific microservice from multi-source schemas
crudforge generate --service procurement-module --overwrite-policy merge
crudforge generate -s procurement-module -w merge

# Dry-run preview before applying changes
crudforge generate --dry-run
```

### Positional generate (legacy)

Explicitly specifies schema and target directory:

```bash
crudforge generate <path-to-schema> <target-output-folder> [options]
```

### Discovery Order

When resolving configuration without an explicit `--preferences` flag, the CLI checks:
1. `config/crudforge.config.yml`
2. `config/crudforge.config.yaml`
3. `crudforge.config.yml`
4. `crudforge.config.yaml`
5. `config/config.yml`
6. `crudforge.config.json`

## `crudforge preset refresh`

Refreshes a saved preset when upstream source settings change, maintaining a timestamped backup of the previous configuration:

```bash
crudforge preset refresh <preset-name> --source /path/to/source-app
```

## `crudforge validate`

Validates a schema file against generation rules without writing any files to disk:

```bash
crudforge validate <path-to-schema.gdl|jdl>
```

## `crudforge bootstrap` (Keycloak only)

Provisions Keycloak resources (realm client, roles, seed users) via Admin API/Service. **Does not run automatically during `generate`.**

```bash
# Provision resources
crudforge bootstrap --preferences ./crudforge.config.yml --env-file ./.env.qa

# Dry-run preview
crudforge bootstrap --dry-run --preferences ./crudforge.config.yml --env-file ./.env.qa

# Cleanup only tracked resources from state file
crudforge bootstrap --cleanup --preferences ./crudforge.config.yml --env-file ./.env.qa
```

## `crudforge doctor`

Runs read-only project and environment diagnostics without modifying files:

```bash
# Standard local diagnostics
crudforge doctor

# Include live network probe checks
crudforge doctor --live

# Output machine-readable JSON results
crudforge doctor --json
```

## `crudforge init-config`

Creates `crudforge.config.yml`, `example.jdl`, and `example.gdl` in the current directory (skipping existing files).

```bash
crudforge init-config
```

---

## CLI Options & Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--preferences <path>` | `-p` | Path to a custom config file (YAML/JSON) overriding defaults. |
| `--service <name>` | `-s` | Target only the specified service from `input.sources` during generation. |
| `--microservice <name>` | `-m` | Explicit microservice name for API route prefixes (`/services/<name>`). |
| `--dry-run` | `-d` | Preview files to be created and diff modifications without writing to disk. |
| `--overwrite-policy <policy>` | `-w` | Conflict policy: `fail` (default), `overwrite`, `skip`, `ask`, `merge`. |
| `--json` | | Output JSON outcome/diagnostics on stdout; progress on stderr. |
| `--fuse` | | Scaffold and generate entities into Fuse Angular starter layout. |
| `--fuse-path <path>` | | Path to a local Fuse starter pack directory. |
| `--clean-layout` | | Hide all pre-built Fuse UI demo components for a minimal dashboard. |
| `--sidebar-theme <theme>` | | Sidebar navigation theme style (`white` or `dark`). |
| `--folder-type <type>` | | Folder mapping for admin app modules (`microservice` or `micro-functions`). |
| `--keycloak` | | Enable Keycloak when config `auth.provider` is set to `none`. |
| `--kc-*` | | Overrides for Keycloak server URL, middleware URL, client ID, realm, credentials. |
| `--proxy-write <mode>` | | Which Fuse proxy file(s) to update (`both`, `prod`, `dev`). |
| `--yes` | `-y` | Skip interactive prompts (e.g. proxy-write selection). |
| `--env-file <path>` | | (`bootstrap`) Load a gitignored env file for admin/seed credentials. |
| `--cleanup` | | (`bootstrap`) Delete only resources tracked in the provision state file. |

