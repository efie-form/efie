import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // TODO: Enable after fixing TypeScript setup
  clean: true,
  sourcemap: true,
  minify: false,
  external: [
    'vue',
    '@efie-form/core',
  ],
  outExtension({ format }: { format: string }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
});
