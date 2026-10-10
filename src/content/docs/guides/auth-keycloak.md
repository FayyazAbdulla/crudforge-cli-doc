---
title: Keycloak & IAM
description: Auth overlay, Admin Service middleware, bootstrap provisioning, and environment proxies.
---

Defaults keep `auth.provider: none` and `auth.provision.enabled: false`. Turn Keycloak on only when the app needs real identity.

> [!WARNING]
> **Do not** model User or Role as JDL/GDL schema entities. IAM is an overlay (`iam.enabled`).

## Configuration Architecture

```yaml
auth:
  provider: keycloak
  serverUrl: http://62.84.188.166:31740   # Admin Service gateway (not Keycloak :30080)
  realm: CRUD-FORDGE
  clientId: crudforge-client-QA
  useMockAuth: false
  forwardedProto: https
  adminRoles: [ROLE_ADMIN, ADMIN, ROLE_SUPER_ADMIN]
  signInPrefill:
    username: crud
    password: crud
  provision:
    enabled: false                        # true only for `crudforge bootstrap`
    adapter: admin-service                # or keycloak-admin-rest
    adminServiceUrl: http://62.84.188.166:31740/
    adminUsernameEnv: KEYCLOAK_ADMIN_USERNAME
    adminPasswordEnv: KEYCLOAK_ADMIN_PASSWORD

api:
  microservice: book-service
  services:
    identityaccessmodule: http://62.84.188.166:30084

proxy:
  write: both                             # both (proxy.conf.json & proxy.dev.conf.json) | prod | dev

iam:
  enabled: true
```

## Generated Authentication Packs

- `src/app/core/auth/` — sign-in, token storage, interceptor, `AccessControlService`, ACL pipes, and `AGENT_README.md`.
- `src/app/core/user-management/` — Users, Roles, role/user permission matrices, and `AGENT_README.md`.

For operating IAM screens, see [Users, roles & screen access](/guides/iam-access/). For full product capabilities, see [IAM overlay](/features/iam/).

## Secrets Management & Browser Security

1. **No Secrets in Bundles**: Operator passwords stay in the CLI process via `.env` environment variables referenced by `adminUsernameEnv` / `adminPasswordEnv`. They are **never** written into Angular `environment.ts` or browser code.
2. **Public Client**: Generated SPAs use a **public** Keycloak client with standard PKCE flows. No confidential `clientSecret` is exposed.
3. **API Console Link vs Base**: The Keycloak admin console URL (`…/admin/master/console/#/…`) is for human administration only — use the base gateway URL for API communication.

## Proxy Configuration

Live Fuse applications proxy authentication and middleware endpoints:

- `/realms` (OIDC tokens & discovery) → Admin Service / Keycloak gateway.
- `/services/keycloak-admin` (`/api/v1/*`) → Keycloak Admin Service middleware.
- Broader `/auth` and `/admin` routes are **not** proxied to ensure Angular frontend routing remains intact.
- `environment.kcAdminServiceUrl` is configured as `/services/keycloak-admin`.
