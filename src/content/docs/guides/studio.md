---
title: Schema & Config Studio
description: Interactive visual editor for JDL/GDL entity diagrams and terminal configuration builder.
---

import { LinkButton } from '@astrojs/starlight/components';

<LinkButton href="/studio" variant="primary" icon="rocket" target="_blank">
  Launch Interactive Studio
</LinkButton>

CRUDForge Studio is a standalone Angular app with an in-browser suite of developer tools featuring:

1. **Schema Studio**: Live interactive ERD diagram visualizer and code editor for **JDL** and **GDL** domain schemas.
2. **Terminal Config Studio**: Terminal-themed visual configuration inspector and CLI simulator for `crudforge.config.yml`.

---

## 1. Schema Studio (JDL & GDL Visualizer)

Inspired by JDL-Studio, this split-pane environment allows you to write schemas on the left and see interactive entity-relationship diagrams update in real-time on the right.

### Capabilities

- **Bidirectional Format Support**: Seamlessly toggle between JDL (`fieldName FieldType required`) and GDL (`fieldType fieldName required`).
- **Entity & Enum UML Boxes**: Renders structured entity boxes with attribute types, required indicators, and dashed `<<enum>>` stereotype nodes.
- **Relationship Connectors & Multiplicity**: Automatic SVG curved paths showing cardinality tags:
  - `(1..1)` One-to-One
  - `(1..*)` One-to-Many
  - `(*..1)` Many-to-One
  - `(*..*)` Many-to-Many
- **Interactive Canvas**: Drag boxes to customize layout, pan the canvas, zoom in/out, and auto-layout nodes.
- **Export & Download**: Export high-resolution SVG diagrams or download `.jdl` / `.gdl` schema files.
- **Built-in Templates**: Preloaded with domain models:
  - *HR & Employees* (Regions, Countries, Locations, Departments, Employees, Jobs)
  - *Library & Books* (Books, Authors, Publishers)
  - *E-Commerce & Orders* (Customers, Orders, OrderItems, Products)
  - *PMB Administrative Units* (Provinces, Districts)

---

## 2. Terminal Config Studio (CLI & TUI Visualizer)

The Terminal Config Studio provides a terminal aesthetic with visual configuration toggles that synchronize in real-time with `config/crudforge.config.yml`.

### Key Features

- **TUI Form Inspector**:
  - Configure input schema files and output directories.
  - Choose overwrite policies (`fail`, `merge`, `overwrite`, `skip`, `ask`).
  - Toggle Fuse shell options, clean layout, and SPA vs SSR universal rendering.
  - Set UI modes (`formMode: sidebar | page`, `searchMode: field | global`).
  - Configure Keycloak server endpoints, realms, mock authentication, and IAM overlays.
- **Two-Way YAML Synchronization**: View or edit the generated `crudforge.config.yml` directly with instant syntax highlighting.
- **Simulated CLI Terminal Sandbox**:
  - Execute test commands (`crudforge init`, `crudforge generate`, `crudforge validate`).
  - View animated console outputs, spinners, and directory scaffold previews.
  - Copy ready-to-run shell scripts or CLI generation commands directly to your clipboard.

<LinkButton href="/studio" variant="secondary" icon="external">
  Open Studio in Full Screen
</LinkButton>

## Run Studio independently

Studio now lives in the sibling `crudforge-studio` project and has its own dependencies and build.

```sh
cd ../crudforge-studio
npm install
npm start
```

Open `http://127.0.0.1:4200`. The terminal simulates CLI commands in your browser; it does not run commands on your computer.

The documentation site's `/studio` entry point opens the separate app. Production opens [crudforge-studio.teamcodeme.com](https://crudforge-studio.teamcodeme.com). To override it, set `PUBLIC_STUDIO_URL` before building the docs. During local development it opens port 4200.
