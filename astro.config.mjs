import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [tailwind()],
  middleware: ['src/middleware/auth.ts'],
  output: 'server',
  compressHTML: true,
  adapter: netlify(),
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