/**
 * Rename the four Apache packages we ship as a fork:
 *   @docx-editor.dev/{core,react,fonts,i18n}
 * → @onsitesai/docx-editor-{core,react,fonts,i18n}
 *
 * Leaves @docx-editor.dev/fonts-cjk, vue, pro, editor-api, etc. untouched.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SKIP_DIR = new Set([
  'node_modules',
  'dist',
  'dist-types',
  '.git',
  '.cache',
  'coverage',
  'playwright-report',
  'test-results',
])

const EXT = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.mdx',
  '.css',
  '.yml',
  '.yaml',
  '.toml',
  '.html',
  '.txt',
  '.sh',
])

/** Longer / more-specific first. */
const REPLACEMENTS = [
  ['@docx-editor.dev/fonts-cjk', '@docx-editor.dev/fonts-cjk'],
  ['@onsitesai/docx-editor-core', '@onsitesai/docx-editor-core'],
  ['@onsitesai/docx-editor-react', '@onsitesai/docx-editor-react'],
  ['@onsitesai/docx-editor-fonts', '@onsitesai/docx-editor-fonts'],
  ['@onsitesai/docx-editor-i18n', '@onsitesai/docx-editor-i18n'],
  ['@docx-editor.dev/fonts-cjk', '@docx-editor.dev/fonts-cjk'],
]

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIR.has(ent.name)) continue
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, out)
    else if (EXT.has(path.extname(ent.name)) || ent.name === 'LICENSE') out.push(p)
  }
  return out
}

let filesChanged = 0
let replacements = 0
for (const file of walk(root)) {
  let text = fs.readFileSync(file, 'utf8')
  let next = text
  for (const [from, to] of REPLACEMENTS) {
    if (!next.includes(from)) continue
    const parts = next.split(from)
    replacements += parts.length - 1
    next = parts.join(to)
  }
  if (next !== text) {
    fs.writeFileSync(file, next)
    filesChanged += 1
  }
}

console.log(`[rename-zqmi-scope] files=${filesChanged} replacements=${replacements}`)
