---
title: UI modes
description: Customize formMode, searchMode, and viewMode for generated entities.
---

These knobs live under `ui` in `crudforge.config.yml` (or `--preferences`).

## formMode — new and edit together

```yaml
ui:
  formMode: sidebar   # or page
```

| Value | Behavior |
|-------|----------|
| `sidebar` | New and edit open the list `mat-drawer` / `.cforge-form-drawer` |
| `page` | New → `…/new`, edit → `…/:id/edit` |

![Sidebar form](../assets/screenshots/04-form-sidebar-new.png)

**Rule:** never mix modes (edit as page while new is sidebar).

## searchMode

```yaml
ui:
  searchMode: field   # default — JHipster field.contains
  # searchMode: global  # only if API accepts `query` (Elasticsearch-style)
```

![Field search on list](../assets/screenshots/03-book-list.png)

## viewMode & cards

```yaml
ui:
  viewMode: table
  cardBreakpointPx: 640
  gridCols:
    mobile: 1
    tablet: 2
    desktop: 3
```

![Card layout](../assets/screenshots/07-card-view.png)

## Related

- [Theme & branding](/customization/theme-branding/)
- [Generate toggles](/customization/generate-toggles/)
