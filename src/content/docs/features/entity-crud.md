---
title: Entity CRUD
description: List, search, filter, sidebar forms, card view, and detail — generated from JDL.
---

Every entity module is generated under a responsibility-based layout: presentation (list/card/detail), forms, interaction (actions/filter), and service.

## List

![Book list with search](../assets/screenshots/03-book-list.png)

Includes:

- Server-driven pagination (mock or real API)
- Field search (`title.contains`-style) when `ui.searchMode: field`
- Pin / flag / export affordances on the list chrome
- ACL stamps (`data-screen-id`, `accessCtrl`) when Keycloak IAM is on

## Create & edit (same formMode)

![Sidebar create](../assets/screenshots/04-form-sidebar-new.png)

![Sidebar edit](../assets/screenshots/05-form-sidebar-edit.png)

| `ui.formMode` | New | Edit |
|---------------|-----|------|
| `sidebar` | Opens list drawer | Opens same drawer |
| `page` | Routes to `…/new` | Routes to `…/:id/edit` |

Never leave edit on a full page while new uses the sidebar.

## Filters

![Filter drawer](../assets/screenshots/06-filter-drawer.png)

Advanced filter panel per entity — operators depend on field types.

## Card view

![Cards](../assets/screenshots/07-card-view.png)

Toggle when `ui.viewMode` / list chrome allows card layout. Grid breakpoints via `ui.gridCols` and `ui.cardBreakpointPx`.

## Detail

![Detail](../assets/screenshots/08-detail.png)

Read-only property sheet with relationship links when JDL relationships are generated.

## Delete

![Delete confirm](../assets/screenshots/09-delete-confirm.png)

Shared confirmation (and typed-confirm for destructive IAM/entity deletes) under `apps/shared/`.

## Related customization

See [UI modes](/customization/ui-modes/) and [generate toggles](/customization/generate-toggles/).
