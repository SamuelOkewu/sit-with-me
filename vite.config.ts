import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.VITE_SANITY_PROJECT_ID': JSON.stringify(env.VITE_SANITY_PROJECT_ID),
      'process.env.VITE_SANITY_DATASET': JSON.stringify(env.VITE_SANITY_DATASET),
      'process.env.VITE_SANITY_TOKEN': JSON.stringify(env.VITE_SANITY_TOKEN),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

  };
});
