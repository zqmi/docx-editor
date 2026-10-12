// `main.ts` imports the shaper's WebAssembly file only so that `bun build --compile` embeds
// it. The import has no value, and TypeScript checks side-effect imports, so it needs a
// declaration.
declare module '@zqmi/docx-editor-core/harfbuzz.wasm';
