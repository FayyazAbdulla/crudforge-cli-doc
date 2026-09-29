---
name: docs-sync
description: Sync high-signal CRUDForge CLI README sections into docs drafts. Use when updating docs from the generator repo or when the user asks to refresh documentation from source.
---

# Docs sync skill

## When to use

- CLI README or config defaults changed in `crud-fordge`
- User asks to refresh / sync documentation

## Steps

1. Confirm path to CLI repo (default `../crud-fordge` or `$CRUDFORGE_CLI_PATH`).
2. Run `npm run sync:readme` from this docs repo.
3. Review `tmp/sync-notes.md` (generated).
4. Hand off to **content-writer** to merge into real Starlight pages (do not publish raw dump).
5. Run **qa-docs**: `npm run build`.

## Do not

- Overwrite finished guides blindly with README dumps
- Copy live hostnames as universal defaults without labeling QA
