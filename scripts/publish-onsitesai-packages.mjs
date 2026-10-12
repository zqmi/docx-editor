/**
 * Build + publish the four @onsitesai/docx-editor-* packages to npmjs.
 *
 * Requires: npm login (or NPM_TOKEN in env), and membership of the @zqmi org.
 *
 *   bun run scripts/publish-zqmi-packages.mjs
 *   bun run scripts/publish-zqmi-packages.mjs --dry-run
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dryRun = process.argv.includes('--dry-run')

const PACKAGES = [
  'packages/i18n',
  'packages/core',
  'packages/fonts',
  'packages/react',
]

function run(cmd, args, opts = {}) {
  console.log(`\n> ${cmd} ${args.join(' ')}`)
  const res = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env: process.env,
    ...opts,
  })
  if (res.status !== 0) process.exit(res.status ?? 1)
}

const env = { ...process.env }
if (process.env.NPM_TOKEN) {
  const npmrc = path.join(root, '.npmrc.publish')
  fs.writeFileSync(
    npmrc,
    `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\naccess=public\n`
  )
  env.NPM_CONFIG_USERCONFIG = npmrc
}

run('bun', ['run', '--filter', '@onsitesai/docx-editor-i18n', 'build'], { env })
run('bun', ['run', '--filter', '@onsitesai/docx-editor-core', 'build'], { env })
run('bun', ['run', '--filter', '@onsitesai/docx-editor-fonts', 'build'], { env })
run('bun', ['run', '--filter', '@onsitesai/docx-editor-react', 'build'], { env })

for (const rel of PACKAGES) {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, rel, 'package.json'), 'utf8'))
  console.log(`\nPublishing ${pkg.name}@${pkg.version} from ${rel}`)
  const args = ['publish', '--access', 'public']
  if (dryRun) args.push('--dry-run')
  run('npm', args, { cwd: path.join(root, rel), env })
}

console.log('\n[publish-zqmi-packages] done')
