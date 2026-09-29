---
title: Users, roles & screen access
description: Operate User Management — assign roles, grant screens, and understand ACL filtering.
---

This guide walks the **User Management** overlay after generate with `auth.provider: keycloak` and `iam.enabled: true`.

For product screenshots see [IAM overlay](/features/iam/). For bootstrap secrets and Admin Service proxies see [Keycloak & IAM](/guides/auth-keycloak/).

## Prerequisites

```yaml
auth:
  provider: keycloak
  useMockAuth: true    # or false + live gateway
iam:
  enabled: true
```

Mock QA: `npm run e2e:prepare:iam` / `npm run e2e:serve:iam` in the CLI repo (port **4201**).

Sign in as an admin (`demo@crudforge.com` / `admin` in mock). The sidebar shows **User Management** → Users, Roles, Role permissions.

## 1. Manage users

Open **Users** (`/admin/user-management`).

| Task | How |
|------|-----|
| Create | **New** → fill username, email, names, temporary password → Save |
| Edit / view | Row edit or view (drawer / detail) |
| Password | Key / “Change password” action |
| Delete | Trash — confirm dialog |

Users are Keycloak users (via Admin Service or mock), not JDL entities.

## 2. Manage roles

Open **Roles** (`/admin/user-management/roles`).

1. **Create Role** — name like `ROLE_OFFICER`, optional description  
2. Select a role in the master list  
3. Assign users from the detail pane  

Convention: prefix with `ROLE_` so they match realm/client role claims in the token.

## 3. Grant screen access to a role

Open **Role permissions** (`/admin/user-management/role-permissions`).

1. Find the screen row (Books, Authors, User Management, …)  
2. Toggle the column for the target role  
3. Grants persist on **role attributes** and sync to assigned users when the backend supports it  

Screens come from:

- Admin navigation route ids  
- Built-in IAM ids (`user-management`, `role-management`, `role-permissions`)  
- Optional `iam.screens: […]` extras in config  

## 4. Per-user role and screen matrices

From **Users**, pick a row:

| Button | Opens | Use when |
|--------|-------|----------|
| Roles / access | `…/:id/access` | Assign which roles the user holds |
| Screens / permissions | `…/:id/permissions` | Direct screen (and component) grants for that user |

Prefer role-based grants for most staff; use user matrix for exceptions.

## 5. What the signed-in user experiences

| Mechanism | Behavior |
|-----------|----------|
| `AccessControlService` | Loads attributes from the user (or merged from roles); `adminRoles` bypass |
| Sidebar | Hides nav entries without screen access |
| `LandingGuard` | After sign-in, routes to the first allowed admin screen; else `/admin/no-access` |
| `accessCtrl` pipe | Hides New / Edit / Delete / … when the component grant is missing |

Entity lists also emit `data-screen-id` / `data-component-id` so custom CSS or tooling can target ACL chrome.

## 6. Feature flags

Disable unused IAM surfaces before generate:

```yaml
iam:
  enabled: true
  roles: true
  rolePermissions: true
  userAccess: true      # :id/access
  userPermissions: true # :id/permissions
```

## Limits

- Overlay assumes Keycloak (or mock) — not a built-in user table in your domain API  
- UI ACL ≠ API security  
- Live attribute write paths need Admin Service APIs; mock IAM is deterministic for Playwright  

## Related

- [IAM feature gallery](/features/iam/)  
- [Keycloak config & bootstrap](/guides/auth-keycloak/)  
- [Auth UX / session](/features/auth-ux/)
