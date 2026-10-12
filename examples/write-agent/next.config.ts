import type { NextConfig } from 'next';
import path from 'path';

const workspaceRoot = path.resolve(__dirname, '../..');
const packageDist = (packageName: string, entry: string) =>
  path.join(workspaceRoot, 'packages', packageName, 'dist', entry);
const workspaceAliases = {
  '@onsitesai/docx-editor-core$': packageDist('core', 'index.js'),
  '@onsitesai/docx-editor-core/automation$': packageDist('core', 'automation.js'),
  '@onsitesai/docx-editor-core/binding$': packageDist('core', 'binding.js'),
  '@onsitesai/docx-editor-core/contracts/document$': packageDist('core', 'contracts/document.js'),
  '@onsitesai/docx-editor-core/contracts/editor$': packageDist('core', 'contracts/editor.js'),
  '@onsitesai/docx-editor-core/contracts/interaction$': packageDist('core', 'contracts/interaction.js'),
  '@onsitesai/docx-editor-core/contracts/modules$': packageDist('core', 'contracts/modules.js'),
  '@onsitesai/docx-editor-core/contracts/types$': packageDist('core', 'contracts/types.js'),
  '@onsitesai/docx-editor-core/editor$': packageDist('core', 'editor.js'),
  '@onsitesai/docx-editor-core/layout$': packageDist('core', 'layout.js'),
  '@onsitesai/docx-editor-core/output$': packageDist('core', 'output.js'),
  '@onsitesai/docx-editor-core/store$': packageDist('core', 'store.js'),
  '@docx-editor.dev/editor-api$': packageDist('editor-api', 'index.mjs'),
  '@docx-editor.dev/editor-api/browser$': packageDist('editor-api', 'browser.mjs'),
  '@docx-editor.dev/pro$': packageDist('pro', 'index.js'),
  '@docx-editor.dev/pro/react$': packageDist('pro', 'react/index.js'),
  '@onsitesai/docx-editor-react$': packageDist('react', 'index.mjs'),
};

const nextConfig: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  typescript: {
    tsconfigPath: 'tsconfig.next.json',
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...workspaceAliases,
    };
    return config;
  },
};

export default nextConfig;
