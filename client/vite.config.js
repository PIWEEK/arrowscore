import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-plugin-svelte-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'ArrowScore',
        short_name: 'ArrowScore',
        description: 'ArrowScore',
        display: 'fullscreen',
        orientation: 'portrait',
        start_url: '/index.html',
        scope: '/',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
          {
            src: 'images/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'images/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'images/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'images/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'images/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: 'images/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'images/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    svgLoader({
      // svgo: boolean;
      // svgoConfig?: OptimizeOptions;
      defaultImport: 'url' // 'url' | 'raw' | 'component';
    })
  ]
})
