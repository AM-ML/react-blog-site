import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Faster refresh in development
      fastRefresh: true,
      // Babel options for production builds
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    // Split chunks for better caching
    splitVendorChunkPlugin(),
    // Analyze bundle size (generates stats.html)
    visualizer({ 
      open: false, 
      gzipSize: true, 
      brotliSize: true,
      filename: 'stats.html'
    })
  ],
  build: {
    // Enable minification for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs in production build
        drop_console: true,
        drop_debugger: true
      }
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Generate sourcemaps for debugging in production
    sourcemap: false,
    // Chunk size warnings at 1000kb instead of 500kb
    chunkSizeWarningLimit: 1000,
    // Customize rollup build options
    rollupOptions: {
      output: {
        // Chunk naming pattern
        manualChunks: {
          // Split React and related libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split UI libraries
          'ui-vendor': ['framer-motion', 'react-hot-toast', 'react-slick', 'slick-carousel'],
          // Split utility libraries
          'utils-vendor': ['axios', 'js-cookie', 'marked', 'dompurify']
        }
      }
    }
  },
  // Optimize CSS
  css: {
    // Enable process of CSS imports
    preprocessorOptions: {
      // Add any CSS preprocessor options here if needed
    },
    // Minimize CSS in production
    devSourcemap: true
  },
  // Enable faster builds and hot module replacement
  server: {
    hmr: {
      // Fix HMR reconnects
      overlay: true
    },
    // Optimize for faster builds
    fs: {
      strict: true
    }
  }
})
