import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import sitemap from 'vite-plugin-sitemap';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.moinnaik.in',
      outDir: 'dist',
      urls: [
        { url: '/', changefreq: 'weekly', priority: 1.0 },
        { url: '/post-testimonial', changefreq: 'monthly', priority: 0.8 },
        { url: '/admin', changefreq: 'monthly', priority: 0.5 },
        { url: '/admin/dashboard', changefreq: 'weekly', priority: 0.6 },
      ],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
