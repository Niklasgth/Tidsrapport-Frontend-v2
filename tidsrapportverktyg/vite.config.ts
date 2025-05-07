// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@utils':      path.resolve(__dirname, 'src/utils'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@services':   path.resolve(__dirname, 'src/services'),
      '@pages':      path.resolve(__dirname, 'src/pages'),
      '@assets':     path.resolve(__dirname, 'src/assets'),
      '@store':      path.resolve(__dirname, 'src/store'),
      '@hooks':      path.resolve(__dirname, 'src/hooks'),
      '@models':     path.resolve(__dirname, 'src/models'),
      '@styles':     path.resolve(__dirname, 'src/styles'),
      '@routes':     path.resolve(__dirname, 'src/routes')
      
    },
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
});
