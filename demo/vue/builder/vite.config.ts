import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port,
  },
});
