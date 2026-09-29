---
title: Keycloak & IAM
description: Auth overlay, bootstrap, and Admin Service middleware.
---

Defaults keep `auth.provider: none`. Turn Keycloak on only when the app needs real identity.

**Do not** model User or Role as JDL entities. IAM is an overlay (`iam.enabled`).

## Config sketch

```yaml
auth:
  provider: keycloak
  serverUrl: http://host:31740   # Admin Service gateway preferred
  realm: CRUD-FORDGE
  clientId: crudforge-client-QA
  useMockAuth: false
  forwardedProto: https
  provision:
    enabled: false               # true only for `crudforge bootstrap`
    adapter: admin-service
    adminServiceUrl: http://host:31740/
    adminUsernameEnv: KEYCLOAK_ADMIN_USERNAME
    adminPasswordEnv: KEYCLOAK_ADMIN_PASSWORD

iam:
  enabled: true
```

## Generated packs

- `src/app/core/auth/` — sign-in, interceptor, guards, `AccessControlService`, ACL pipes
- `src/app/core/user-management/` — Users, Roles, role/user permission matrices

Operate those screens day-to-day: [Users, roles & screen access](/guides/iam-access/). Product overview: [IAM overlay](/features/iam/).

## Secrets

Passwords stay in `.env` via env refs. They are **never** written into Angular `environment.ts` or browser bundles. SPA clients are public (no confidential `clientSecret` in the browser).

## Live proxies

Live Fuse apps proxy `/realms` (OIDC) and `/services/keycloak-admin` → Admin Service middleware — **not** native Keycloak `:30080`. Broader `/auth` and `/admin` prefixes are not proxied so Angular routes stay intact.
