import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({   
 mode }) => {
  // Load environment variables based on the current environment
  process.env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
  };
});