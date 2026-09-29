# Screenshots

Product UI captures colocated under `src/content/docs/assets/screenshots/`
(Starlight resolves Markdown images relative to the content tree — keep them here,
not under `src/assets/`).

## Naming

| File | Shot |
|------|------|
| `01-sign-in.png` | Auth sign-in |
| `02-welcome.png` | Post-login welcome |
| `03-book-list.png` | Entity list + search |
| `04-form-sidebar-new.png` | New in drawer |
| `05-form-sidebar-edit.png` | Edit in drawer |
| `06-filter-drawer.png` | Advanced filters |
| `07-card-view.png` | Card layout |
| `08-detail.png` | Detail page |
| `09-delete-confirm.png` | Confirm dialog |
| `10-iam-users.png` | User Management users |
| `11-iam-roles.png` | Roles |
| `12-iam-role-matrix.png` | Role permission matrix |
| `15-disabled-account.png` | Disabled-account overlay |

## Capture

From the CLI repo (mock app on :4200):

```bash
# terminal 1
npm run e2e:serve

# terminal 2
cd ../crud-fordge-doc
npm run shots:capture
```

For IAM shots, prepare the mock IAM app first:

```bash
cd ../crud-fordge && npm run e2e:prepare:iam && npm run e2e:serve
```

## Rules

- Viewport ~1440×900
- Prefer light scheme for docs
- No secrets in the frame
- Replace placeholders when UI changes
