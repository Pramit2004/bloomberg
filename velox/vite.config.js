import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  server: {
    port: 5173,
    host: true,          // expose on 0.0.0.0 for Codespace port forwarding
    allowedHosts: 'all', // allow any host — required for Render, Codespace, Railway etc.
    hmr: {
      overlay: true,
    },
  },

  preview: {
    port: 4173,
    host: true,
    allowedHosts: 'all',
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Code-split by route for faster initial load
        manualChunks: {
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion', 'gsap', '@gsap/react'],
          'ui-vendor':     ['lenis', 'react-hot-toast', 'zustand'],
        },
      },
    },
    // Warn if chunk > 600kb
    chunkSizeWarningLimit: 600,
  },

  // Optimise deps ahead-of-time
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'gsap', 'lenis'],
  },
})
