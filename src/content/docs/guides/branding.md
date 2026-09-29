---
title: Branding & theme
description: Logo assets and Fuse primary color.
---

## Brand colors

| Token | Hex | Use |
|-------|-----|-----|
| Primary violet | `#791EFF` | Buttons, accents, docs theme |
| Soft violet | `#9B5CFF` | Dark-theme highlights |
| Charcoal | `#1A1A1A` | “CRUD” wordmark ink |

## Fuse apps

Set only via root `fuseTheme` in `app.ts` / `fuse.theme` in config — **never** hardcode primary colors in entity templates.

```yaml
fuse:
  theme:
    primary: "#791EFF"
```

## Assets

Transparent PNGs:

- Wordmark → `public/images/logo/logo.png`
- Mark / favicon → `logo-mark.png`

This docs site uses the same assets under `/public`.
