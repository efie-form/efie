import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Testing DTS generation
  clean: true,
  sourcemap: true,
  minify: false,
  external: ['color-convert'],
  outExtension({ format }: { format: string }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
});
