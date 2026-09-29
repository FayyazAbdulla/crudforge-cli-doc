---
title: Session & disabled account
description: Stay signed in by default; optional idle timeout and disabled-account overlay.
---

## Session defaults

```yaml
auth:
  session:
    idleTimeoutMs: 0              # 0 = stay signed in until logout
    persistAcrossReload: true
    crossTabSync: true
    refreshOnFocus: true
    statusProbeIntervalMs: 60000
```

- Resilient refresh: only terminal auth errors clear the session (not network/5xx).
- Single-flight refresh avoids 401 stampedes.
- Cross-tab sync signs out when another tab clears tokens.

## Disabled-account overlay

```yaml
auth:
  disabledAccount:
    enabled: false                # true for live Keycloak apps
    countdownSeconds: 20
    message: "Your account has been disabled. Please contact your administrator."
    sound: false
```

When enabled, explicit Keycloak “account disabled” grant errors freeze the shell (root `app.ts` overlay) and sign out after the countdown — never on generic `invalid_grant` alone.
