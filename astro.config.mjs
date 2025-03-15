import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
    minify: true,
    format: 'file'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'aos': ['aos']
          }
        }
      }
    },
    ssr: {
      noExternal: ['aos']
    }
  }
});