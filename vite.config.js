import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'  // 👈 IMPORTANTE: precisa importar

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),  // DevTools para Vue
    VitePWA({
      registerType: 'autoUpdate', // atualiza automaticamente o Service Worker
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Roma Beauty',
        short_name: 'Roma',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // caminho simplificado para src
    }
  },
  server: {
    port: 5173, // porta padrão
    open: true  // abre o navegador automaticamente
  }
})
