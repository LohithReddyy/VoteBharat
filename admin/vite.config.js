import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: "dist", // Ensure this line exists
    chunkSizeWarningLimit: 1000,
    
  },
  server: {
    historyApiFallback: true, // Ensures correct routing on refresh
  },
});
