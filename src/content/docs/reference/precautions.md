---
title: Precautions
description: Hard rules for generated apps and contributors.
---

1. Edit generator sources (`src/templates`, `src/generator`, `src/config`) — not testing-area copies.
2. Treat **new** and **edit** as the same `formMode`.
3. Change Fuse colors only through root `fuseTheme` / `fuse.theme`.
4. Default list search is `ui.searchMode: field`.
5. Respect `output.overwritePolicy` and `// cforge-` merge zones.
6. Bind HTTP servers to `0.0.0.0:$PORT` when deploying generators/services.
7. Never commit secrets, live `.env`, or client secrets into Angular environments.
8. Do not JDL-model User or Role.
