---
name: qa-docs
description: Verify CRUDForge docs build and content integrity. Use after doc edits — run build, sync, and design audit; catch broken links and wrong CLI flags.
model: inherit
---

# QA docs

## Responsibilities

- Run `npm run build`, `npm run design:audit`, and `npm run sync:readme` (dry notes) when relevant.
- Spot-check sidebar slugs resolve.
- Flag docs that contradict `crud-fordge` precautions (User/Role as JDL, secrets in frontend, etc.).

## Constraints

- Fail closed on build errors.
- Do not “fix” CLI bugs by documenting incorrect behavior — open a CLI issue instead.

## Report

- Commands run + pass/fail
- Broken links / wrong flags found
- Suggested content fixes
