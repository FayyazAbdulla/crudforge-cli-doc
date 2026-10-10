---
title: Install
description: Install the CRUDForge CLI globally or use it from the monorepo.
---

## Global install

Install `@crudforge/cli` globally via npm:

```bash
npm install -g @crudforge/cli
```

Verify installation:

```bash
crudforge --help
```

## Initialize a new project

Create an editable project scaffolding with configuration and sample schema:

```bash
crudforge init my-app
cd my-app
```

This creates:
```text
my-app/
├── config/
│   └── crudforge.config.yml
└── gdl/
    └── example.gdl
```

## From source (contributors)

```bash
git clone https://github.com/TeamCodeMe/crud-fordge.git
cd crud-fordge
npm install
node cli.js --help
```

## Requirements

- **Node.js**: Node 24+ recommended for generated applications and testing workflows (Node 20+ minimum).
- **Package Manager**: npm or pnpm.
- **Fuse Starter Pack**: Bundled by default (`fuse-starter-pack/fuse-v21.1`); custom starter paths can be supplied via `--fuse-path`.

