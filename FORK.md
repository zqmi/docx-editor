# zqmi fork of docx-editor

Apache-2.0 fork of [eigenpal/docx-editor](https://github.com/eigenpal/docx-editor) maintained for Onsites Chat Office.

## Published packages (npmjs)

| Package | Upstream name |
|---------|----------------|
| `@zqmi/docx-editor-core` | `@docx-editor.dev/core` |
| `@zqmi/docx-editor-react` | `@docx-editor.dev/react` |
| `@zqmi/docx-editor-fonts` | `@docx-editor.dev/fonts` |
| `@zqmi/docx-editor-i18n` | `@docx-editor.dev/i18n` |

Upstream `fonts-cjk` / `vue` / `pro` / `editor-api` stay under `@docx-editor.dev/*` in this monorepo and are **not** published by us.

## First-time npm setup

1. Create an npm user and the **`@zqmi` org** (or grant this user publish rights on `@zqmi`).
2. Locally: `npm login`
3. Publish: `bun run publish:zqmi` (or `--dry-run` first)
4. CI: add repo secret `NPM_TOKEN` (Automation token with publish). Workflow: `.github/workflows/publish-zqmi.yml` (manual or tag `zqmi-v*`).

## Sync upstream

```bash
git fetch upstream
git merge upstream/main
# resolve conflicts, re-run rename only if upstream reintroduced old names
bun install
bun run publish:zqmi   # after bumping package versions
```

## Onsites-specific fixes

- CJK IME on empty / numbered paragraphs (`fix/cjk-ime-empty-list-item`, merged to `main`)
