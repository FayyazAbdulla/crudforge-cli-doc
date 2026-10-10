---
title: Generate your first app
description: Scaffold a Fuse Angular CRUD app from GDL or JDL with clean layout.
---

## Initialize → Edit → Generate

The recommended workflow starts with editable project inputs before generating Angular:

```bash
crudforge init crudforge-app
cd crudforge-app
# 1. Edit config/crudforge.config.yml and gdl/example.gdl
# 2. Run generate
crudforge generate
# 3. Install & run
npm install
npm run dev
```

### 1. Project-Owned Scaffolding

`crudforge init <dir>` creates only two editable files in a new or empty directory:

```text
crudforge-app/
├── config/
│   └── crudforge.config.yml
└── gdl/
    └── example.gdl
```

The sample schema uses supported GDL syntax (type before field name):

```text
entity Book {
  string title required
  bigDecimal price
}
```

The initialized `config/crudforge.config.yml` provides project defaults:

```yaml
input:
  file: ./gdl/example.gdl
  type: gdl
output:
  directory: .
  overwritePolicy: fail
fuse:
  enabled: true
  rendering: spa
  cleanLayout: true
  includePrebuilt: false
api:
  microservice: book-service
auth:
  provider: none
```

### 2. Generate Application

Running `crudforge generate` inside the project folder discovers `config/crudforge.config.yml`, validates the schema, and generates the Fuse Angular application directly into the same directory:

```text
crudforge-app/
├── config/
│   └── crudforge.config.yml
├── gdl/
│   └── example.gdl
├── src/
├── angular.json
├── package.json
└── ...
```

There is **no nested application folder**. The source schema and configuration files remain unchanged. Moving the initialized project folder requires no path changes because `input.file` and `output.directory` resolve relative to the project root.

## Regeneration & Overwrite Policies

When regenerating an existing project, the CLI honors `output.overwritePolicy` (or `--overwrite-policy` / `-w`):

```bash
crudforge generate --dry-run                     # Preview without writing changes
crudforge generate --overwrite-policy ask        # Resolve conflicts interactively
crudforge generate --overwrite-policy skip       # Keep existing differing files
crudforge generate --overwrite-policy merge      # Preserve matching // cforge- custom-code zones
crudforge generate --overwrite-policy overwrite  # Explicitly replace generated files
```

> [!NOTE]
> Source configuration (`config/crudforge.config.yml`) and schema files (`gdl/*`) are protected and never overwritten.

## Testing with PMB Development Presets

For testing against PMB backends, use the built-in preset importer:

```bash
crudforge init crudforge-app --preset pmb-test --source /path/to/PMB/pmb-admin
cd crudforge-app
crudforge generate
npm install
npm run dev -- --port 4200
```

Sign in with your PMB credentials at `http://localhost:4200/auth/sign-in`.

To refresh the saved preset when PMB source code changes:

```bash
crudforge preset refresh pmb-test --source /path/to/PMB/pmb-admin
```

## Legacy Positional Command

Scaffolding directly from an explicit schema and target path remains supported:

```bash
crudforge generate ./example.jdl ./my-app --fuse --clean-layout
```

## Next Steps

- [CLI commands guide](/guides/cli/)
- [Configuration options reference](/guides/configuration/)
- [Keycloak & IAM setup](/guides/auth-keycloak/)

