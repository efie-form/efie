import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBase(),
});

function getBase() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.unpkg.com/' + packageJson.name + '@' + packageJson.version + '/dist/';
  }
}
