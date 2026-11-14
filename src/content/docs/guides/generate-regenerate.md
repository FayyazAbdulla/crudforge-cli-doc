---
title: "Generate & Regenerate: Quick Start"
description: Practical guide to generating, importing, and regenerating Angular CRUD code with CRUDForge CLI.
---

Whether you are scaffolding a fresh Angular admin application or updating schemas in a mature, heavily customized Fuse project, CRUDForge provides safe, predictable, and non-destructive code generation.

## Command Reference: What I Want → Command → What Changes

| What I Want | Command | What Changes |
| :--- | :--- | :--- |
| **Start fresh project** | `crudforge init my-app` | Creates editable `config/crudforge.config.yml` and `gdl/example.gdl`. |
| **Scaffold complete Fuse SPA** | `crudforge generate --mode full --yes` | Scaffolds the Fuse Angular shell, generates all entities, routes, navigation, and XML changelogs. |
| **Preview changes safely** | `crudforge generate --dry-run` | Inspects proposed additions and diffs in the terminal. Modifies **0** files on disk. |
| **Update schema & preserve code** | `crudforge generate --overwrite-policy merge --yes` | Applies new schema fields, preserves custom code in merge zones, and skips unchanged files. |
| **Generate only one service** | `crudforge generate --service shipping-service --overwrite-policy merge --yes` | Only generates entities belonging to `shipping-service`. Leaves all other services untouched. |
| **Generate only one entity** | `crudforge generate --entity Product --overwrite-policy merge --yes` | Generates only `Product`, automatically discovering referenced enums and related models. |
| **Entity code only (no shell)** | `crudforge generate schema.gdl ./out --mode entity-only --yes` | Generates models, services, presentation components, forms, and shared base classes without starter scaffolding. |
| **Entity code into existing app** | `crudforge generate --mode entity-only --overwrite-policy merge --yes` | Adds entity files to an existing app without touching application layouts, shells, or configurations. |
| **Manual route integration** | `crudforge generate --entity Product --skip-registration --yes` | Generates code, leaves `routes.ts` and `navigation.ts` untouched, and prints integration snippets. |
| **Accept schema deletions** | `crudforge generate --allow-destructive --overwrite-policy merge --yes` | Explicitly authorizes removing entities from disk that were deleted from the schema. |

---

## 1. Create a New Full Fuse Application

Use this workflow to scaffold a complete Angular 21 Fuse application:

```bash
# 1. Initialize project directory with editable inputs
crudforge init my-admin-portal
cd my-admin-portal

# 2. Edit your schema (gdl/example.gdl) and preferences (config/crudforge.config.yml)
# 3. Generate full Fuse application
crudforge generate --mode full --yes

# 4. Install dependencies and start the dev server
npm install
npm run dev -- --port 4200
```

Open `http://localhost:4200` to view your running application, complete with authentication, layout navigation, and entity CRUD tables.

---

## 2. Add Entities to an Existing Application

When your application is already partially or fully developed, you can add new entities without overwriting custom styles, auth configurations, or custom layouts:

```bash
# Add your new entity to the schema file (e.g. gdl/inventory.gdl)
# Then generate using merge policy:
crudforge generate --mode entity-only --overwrite-policy merge --yes
```

- **Output Location:** Placed under `src/app/domains/admin/modules/apps/micro-functions/<service>/entities/<entity>/`.
- **Automatic Registration:** Routes are appended inside the `// cforge-routes-start` ... `// cforge-routes-end` zone in `src/app/domains/admin/routes.ts`, and navigation entries are added to `navigation.ts`. Custom routes outside this block are never touched.

---

## 3. Add a New Microservice

In multi-service applications, each backend service has its own schema and API microservice path:

1. Create the schema file (e.g. `gdl/shipping.gdl`):
   ```text
   enum ShipmentStatus { PENDING, DISPATCHED, DELIVERED }
   entity Carrier { string carrierName required, string trackingUrl }
   entity Shipment { string trackingNumber required, date shippedDate required, ShipmentStatus status }
   relationship ManyToOne { Shipment{carrier} to Carrier }
   ```

2. Register the service under `input.sources` in `config/crudforge.config.yml`:
   ```yaml
   input:
     type: gdl
     sources:
       - name: inventory-service
         file: ./gdl/inventory.gdl
         microservice: inventory-service
       - name: shipping-service
         file: ./gdl/shipping.gdl
         microservice: shipping-service
   ```

3. Generate **only** the new service:
   ```bash
   crudforge generate --service shipping-service --overwrite-policy merge --yes
   ```
- Pre-existing services (`inventory-service`) and custom files remain completely untouched.

---

## 4. Regenerate After Schema Changes

When you update your domain schema (such as adding a field, modifying a type, or altering a relationship):

### Step 1: Preview with `--dry-run`
Always preview proposed modifications before writing changes:
```bash
crudforge generate --dry-run
```
The CLI prints proposed new files, colorized line diffs for modified files, and list of preserved files. Modifies **0** files on disk.

### Step 2: Apply with `--overwrite-policy merge`
```bash
crudforge generate --overwrite-policy merge --yes
```

### How Custom Code Is Preserved:
1. **Merge Zones:** Place custom TypeScript or HTML inside designated markers. These zones are preserved across generations:
   ```typescript
   // cforge-custom-code-start
   applySpecialDiscount(productId: number, discount: number) {
     return this.http.patch(`/api/products/${productId}/discount`, { discount });
   }
   // cforge-custom-code-end
   ```
2. **Custom Files & Utilities:** Files created outside generated folders (such as `src/app/domains/admin/modules/apps/shared/custom-rules.ts`) are never modified or removed.
3. **Custom Screens & Routes:** Custom components and routes placed outside `// cforge-routes-start` in `routes.ts` are retained.

---

## 5. Generate Entity Code Only (No Fuse Shell)

### Scenario A: Standalone Output for Any Angular App
Generate models, services, presentation components, forms, and shared UI primitives without any Fuse application scaffolding:
```bash
crudforge generate ./gdl/inventory.gdl ./custom-angular-app/src/app/inventory --mode entity-only --yes
```
- **Generated:** `entities/`, `enums/`, `shared/` (base components, resizable table directives, filter types).
- **Omitted:** No `angular.json`, `package.json`, `Dockerfile`, `src/app` shell, or deployment files.

### Scenario B: Inside an Existing Fuse Application
Add entity code directly to your project without re-scaffolding or upgrading the starter pack:
```bash
crudforge generate --mode entity-only --overwrite-policy merge --yes
```

---

## 6. Generate Selected Entities

When working with large schemas, generate only the entities currently under active development:

```bash
# Single entity
crudforge generate --entity Product --overwrite-policy merge --yes

# Multiple entities (comma-separated)
crudforge generate --entities Product,Category --overwrite-policy merge --yes
```

- **Dependency Tracing:** CRUDForge automatically discovers referenced enums (e.g. `ProductStatus`) and relationship partner models (e.g. `Category`), resolving them without generating unrelated entities.
- **Removal Protection:** Unselected entities are **never** treated as deleted.

---

## 7. Control Route & Navigation Registration

By default, CRUDForge automatically updates `routes.ts` and `navigation.ts`. You can disable automatic registration when you want manual integration control:

```bash
crudforge generate --entity Product --skip-registration --overwrite-policy merge --yes
```
- `src/app/domains/admin/routes.ts` and `navigation.ts` are left **completely untouched**.
- The CLI outputs copy-pasteable TypeScript integration snippets directly to the terminal:
  ```text
  📋 Manual Integration Steps (registration disabled):
    [ROUTE] Product:
      {
        path: 'product',
        loadChildren: () => import('./modules/apps/micro-functions/inventory-service/entities/product/product.routes'),
      }
    [NAVIGATION] Product:
      {
        id: 'micro-functions/inventory-service/entities/product',
        label: 'Products',
        icon: 'database',
        route: '/admin/product'
      }
  ```

---

## Overwrite Policies Reference

Configure via `--overwrite-policy <policy>` (or `-w <policy>`) or `output.overwritePolicy` in `config/crudforge.config.yml`:

| Policy | Behavior | Best Used For |
| :--- | :--- | :--- |
| `merge` | **Recommended.** Performs a 3-way merge against stored baselines. Preserves custom code in merge zones, applies new schema fields, and skips identical files. | Everyday development and iterative regeneration. |
| `skip` | Keeps all existing files intact on disk. Generates only newly added files. | Protecting custom code when adding brand-new entities. |
| `ask` | Prompts interactively in the terminal for each differing file (`skip`, `merge`, or `overwrite`). Fails in non-interactive CI. | Careful manual file-by-file review. |
| `fail` | Aborts immediately with exit code 1 if any generated file differs from disk. Guarantees zero writes. | CI verification pipelines to catch drift. |
| `overwrite` | Replaces generated files with pristine generator templates. | Resetting templates or discarding local edits. |

> [!WARNING]
> **Merge Boundaries:** `merge` safely patches code inside `// cforge-custom-code-start` zones. Arbitrary changes made outside marked zones in generated files cannot be reliably merged and will be protected or flagged as conflicts. Place business extensions inside marked zones or in separate developer-owned files.

---

## Under the Hood: Safety & Changelog Architecture

CRUDForge adopts a JHipster/Liquibase-style incremental changelog architecture stored in `.crudforge/`:

1. **Incremental XML Changelogs (`.crudforge/changelog/master.xml`):**  
   Tracks every generation run. Each entity addition or schema modification produces a discrete timestamped changelog (e.g. `20261114_added_entity_Product.xml` or `20261114_updated_entity_Product.xml`) referenced in `master.xml`.
2. **3-Way Baselines (`.crudforge/baselines/`):**  
   Stores pristine copies of generator output so the merge engine can distinguish developer customizations from generator template updates.
3. **Smart Idempotency:**  
   If schemas and templates have not changed, generation executes with `Files Written: 0` in milliseconds without touching file timestamps or duplicating routes.
4. **Destructive Change Protection (`--allow-destructive`):**  
   If an entity is deleted from a schema, CRUDForge refuses to delete files on disk unless you explicitly pass `--allow-destructive`.
