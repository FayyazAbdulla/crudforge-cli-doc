---
title: Precautions
description: Hard architectural rules and operational precautions for developers and contributors.
---

1. **Source of Truth**: Always edit generator sources (`src/templates/`, `src/generator/`, `src/config/`) in the CLI repo — never manually patch generated application files in testing directories.
2. **Unified formMode**: Always treat **new** and **edit** as sharing the same `ui.formMode` (`sidebar` or `page`). Never mix drawer and full-page modes within an entity.
3. **Root Theming Only**: Change Angular Material & Fuse colors exclusively through root `fuseTheme` (`fuse.theme.primary`) — do not hardcode primary colors in generated entity styles.
4. **Search Defaults**: Use `ui.searchMode: field` (`field.contains`) unless the backend microservice explicitly implements Elasticsearch-style `query` search endpoints.
5. **Preserve Custom Code**: When regenerating existing applications, always respect `output.overwritePolicy` and never delete custom code inside `// cforge-` preservation zones.
6. **No Committed Secrets**: Never commit `.env` files, Keycloak operator credentials, or confidential client secrets. SPAs must use public OIDC client configurations.
7. **No JDL User/Role Entities**: Never model `User` or `Role` as schema entities; IAM is managed through the Keycloak IAM overlay pack (`iam.enabled: true`).
8. **Field Formatting Scope**: Apply `inputFormat` (`uppercase` / `lowercase`) only to editable `String` and `TextBlob` fields. Number, date, enum, and audit fields are rejected.
9. **SSR Session Constraints**: Angular Universal SSR does not acquire the user's browser-stored auth tokens during server-side pre-rendering; authentication remains a client-side flow.
