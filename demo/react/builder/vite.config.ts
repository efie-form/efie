import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3076;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port,
  },
});
