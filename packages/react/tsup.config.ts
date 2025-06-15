import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Testing DTS generation
  clean: true,
  sourcemap: true,
  minify: false,
  external: [
    'react',
    'react-dom',
    '@efie-form/core',
    '@radix-ui/react-use-controllable-state',
  ],
  banner: {
    js: '"use client";',
  },
  outExtension({ format }: { format: string }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
});
