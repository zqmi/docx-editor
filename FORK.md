# onsitesai fork of docx-editor

Apache-2.0 fork of [eigenpal/docx-editor](https://github.com/eigenpal/docx-editor) maintained for Onsites Chat Office.

GitHub: https://github.com/zqmi/docx-editor  
npm scope: **`@onsitesai`**

## Published packages (npmjs)

| Package | Upstream name |
|---------|----------------|
| `@onsitesai/docx-editor-core` | `@docx-editor.dev/core` |
| `@onsitesai/docx-editor-react` | `@docx-editor.dev/react` |
| `@onsitesai/docx-editor-fonts` | `@docx-editor.dev/fonts` |
| `@onsitesai/docx-editor-i18n` | `@docx-editor.dev/i18n` |

Upstream `fonts-cjk` / `vue` / `pro` / `editor-api` stay under `@docx-editor.dev/*` in this monorepo and are **not** published by us.

## First-time npm setup

1. Create the **`@onsitesai` org** on npmjs (Free · public packages).
2. Locally: `npm login`
3. Publish: `bun run publish:onsitesai` (or `publish:onsitesai:dry` first)
4. CI: add repo secret `NPM_TOKEN`. Workflow: `.github/workflows/publish-onsitesai.yml` (manual or tag `onsitesai-v*`).

## Sync upstream

```bash
git fetch upstream
git merge upstream/main
bun install
bun run publish:onsitesai   # after bumping package versions
```

## Onsites-specific fixes

- CJK IME on empty / numbered paragraphs (`fix/cjk-ime-empty-list-item`, merged to `main`)
