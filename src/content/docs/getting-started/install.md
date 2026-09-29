---
title: Install
description: Install the CRUDForge CLI globally or use it from the monorepo.
---

## Global install

```bash
npm install -g @crudforge/cli
```

## From source (developers)

```bash
git clone <crud-fordge-repo>
cd crud-fordge
npm install
node cli.js --help
```

## Init a project config

```bash
crudforge init-config
```

Creates `crudforge.config.yml` plus example JDL/GDL fixtures.

## Requirements

- Node.js 20+ recommended (generated Fuse apps target modern Angular)
- For Fuse generate: bundled starter under `fuse-starter-pack/fuse-v21.1` (or `--fuse-path`)
