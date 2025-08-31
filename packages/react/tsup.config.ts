import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  external: ['react', 'react-dom', '@efie-form/core'],
  banner: {
    js: '"use client";',
  },
  // Configure esbuild for better module resolution
  esbuildOptions(options) {
    options.resolveExtensions = ['.ts', '.tsx', '.js', '.jsx'];
  },
  treeshake: true,
  ignoreWatch: ['**/node_modules/**', '**/dist/**', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
  onSuccess: async () => {
    console.log('📦 @efie-form/react: Build completed successfully');
  },
  outExtension({ format }: { format: string }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
});
