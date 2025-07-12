/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

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
