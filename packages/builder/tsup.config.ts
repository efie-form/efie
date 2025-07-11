import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true, // Testing DTS generation
  clean: true,
  sourcemap: true,
  minify: false,
  external: [
    'react',
    'react-dom',
    '@efie-form/core',
    '@dnd-kit/core',
    '@dnd-kit/sortable',
    '@dnd-kit/utilities',
    '@radix-ui/react-accordion',
    '@radix-ui/react-collapsible',
    '@radix-ui/react-popover',
    '@radix-ui/react-portal',
    '@radix-ui/react-tabs',
    '@radix-ui/react-tooltip',
    'zustand',
    'framer-motion',
  ],
  banner: {
    js: '"use client";',
  },
  // Configure esbuild options for better dependency tracking
  esbuildOptions(options) {
    options.resolveExtensions = ['.ts', '.tsx', '.js', '.jsx'];
    options.bundle = true;
  },
  // Ensure proper dependency tracking
  treeshake: true,
  // Configure watch exclusions
  ignoreWatch: [
    '**/node_modules/**',
    '**/dist/**',
    '**/*.test.{ts,tsx}',
    '**/*.spec.{ts,tsx}',
  ],
  // Use onSuccess to provide feedback during watch
  onSuccess: async () => {
    console.log('📦 @efie-form/builder: Build completed successfully');
  },
  outExtension({ format }: { format: string }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    };
  },
});
