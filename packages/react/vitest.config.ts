/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./lib/__tests__/setup-tests.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@efie-form/core': '../core/lib',
    },
  },
});
