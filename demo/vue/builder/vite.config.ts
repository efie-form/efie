import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port,
  },
});
