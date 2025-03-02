import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'EfieFormVue',
      fileName: (format) => `efie-form-vue.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@efie-form/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@efie-form/core': 'EfieFormCore',
        },
      },
    },
  },
});
