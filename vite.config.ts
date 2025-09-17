import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    minify: 'terser',
    cssMinify: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});