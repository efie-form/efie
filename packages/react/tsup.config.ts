import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Testing DTS generation
  clean: true,
  sourcemap: true,
  minify: false,
  external: ['react', 'react-dom', '@efie-form/core'],
  banner: {
    js: '"use client";',
  },
  // Configure esbuild options for better dependency tracking
  esbuildOptions(options) {
    // Ensure all TypeScript files are considered
    options.resolveExtensions = ['.ts', '.tsx', '.js', '.jsx'];
    // Enable better tree shaking and dependency tracking
    options.bundle = true;
  },
  // Ensure proper dependency tracking and watching
  treeshake: true,
  // Configure watch options to be more inclusive
  ignoreWatch: ['**/node_modules/**', '**/dist/**', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
  // Use onSuccess to provide feedback during watch
  onSuccess: async () => {
    console.log('📦 @efie-form/react: Build completed successfully');
  },
  outExtension({ format }: { format: string }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
});
