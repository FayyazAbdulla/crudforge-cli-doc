---
title: Features overview
description: What a generated Fuse CRUD app includes — with screenshots.
---

CRUDForge turns a JDL domain into a Fuse admin app: entity CRUD, optional Keycloak auth, and an IAM overlay. Below is the product surface you’ll ship — not Fuse demo chrome.

## At a glance

| Area | What you get |
|------|----------------|
| Entity CRUD | List, card, form (sidebar or page), detail, filter, actions |
| Search | Field `contains` by default (`ui.searchMode: field`) |
| Auth | Optional Keycloak pack — mock or live |
| IAM | Users, roles, matrices, ACL-filtered nav |
| Session | Stay signed in by default; optional disabled-account overlay |
| Branding | Root `fuseTheme` / `#791EFF` violet |

## Gallery

### Sign-in

![Sign-in page](../assets/screenshots/01-sign-in.png)

Clean split layout: wordmark + credentials on the left, welcome copy on the right. No social login or Fuse demo banners.

### Entity list

![Book list](../assets/screenshots/03-book-list.png)

Paginated table, field search, New / filter / export / pin / flag actions.

### Sidebar form (new & edit)

![New book drawer](../assets/screenshots/04-form-sidebar-new.png)

![Edit book drawer](../assets/screenshots/05-form-sidebar-edit.png)

`ui.formMode: sidebar` — **new and edit share the same drawer**. Page mode routes both to full pages instead.

### Filters

![Advanced filters](../assets/screenshots/06-filter-drawer.png)

### Card view

![Card view](../assets/screenshots/07-card-view.png)

### Detail

![Book detail](../assets/screenshots/08-detail.png)

### User Management (IAM)

![Users](../assets/screenshots/10-iam-users.png)

![Roles](../assets/screenshots/11-iam-roles.png)

## Dig deeper

- [Entity CRUD](/features/entity-crud/)
- [IAM overlay](/features/iam/)
- [Auth UX](/features/auth-ux/)
- [UI modes customization](/customization/ui-modes/)
