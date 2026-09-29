---
title: Auth UX
description: Sign-in, session stay-signed-in, and disabled-account overlay.
---

## Sign-in

![Sign-in](../assets/screenshots/01-sign-in.png)

Generated Fuse sign-in uses CRUDForge branding. Prefill comes from `auth.signInPrefill` or Keycloak admin env refs for live QA.

## Session (default: stay signed in)

```yaml
auth:
  session:
    idleTimeoutMs: 0        # 0 = no idle logout
    crossTabSync: true
    refreshOnFocus: true
```

Resilient refresh keeps the session on network/5xx; only terminal auth errors clear tokens.

Full guide: [Session & disabled account](/guides/session/).

## Disabled-account overlay

![Disabled account overlay](../assets/screenshots/15-disabled-account.png)

When `auth.disabledAccount.enabled: true`, an explicit Keycloak “account disabled” grant freezes the shell and counts down to sign-out.

## Theme on auth chrome

Primary buttons follow root `fuseTheme` (brand violet `#791EFF`) — see [Theme & branding](/customization/theme-branding/).
