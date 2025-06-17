import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port,
  },
  resolve: {
    conditions: ['development'],
  },
});
