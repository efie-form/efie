import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Testing DTS generation
  clean: true,
  sourcemap: true,
  minify: false,
  external: ['color-convert'],
  // Configure esbuild options for better dependency tracking
  esbuildOptions(options) {
    options.resolveExtensions = ['.ts', '.tsx', '.js', '.jsx'];
    options.bundle = true;
  },
  // Ensure proper dependency tracking
  treeshake: true,
  // Configure watch exclusions
  ignoreWatch: ['**/node_modules/**', '**/dist/**', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
  // Use onSuccess to provide feedback during watch
  onSuccess: async () => {
    console.log('📦 @efie-form/core: Build completed successfully');
  },
  outExtension({ format }: { format: string }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
});
