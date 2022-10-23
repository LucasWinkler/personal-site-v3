import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  plugins: [
    VitePWA({
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,pdf,webp,svg,png,jpg,jpeg}',
          'sitemap.xml',
          'robots.txt',
        ],
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
      },
      includeAssets: ['favicon.ico', '**/*.{png,svg,webp,jpg,jpeg}'],
      manifest: {
        name: 'Lucas Winkler | Front-End Dev',
        start_url: '/',
        id: '/',
        short_name: 'Lucas Winkler',
        description:
          'Lucas Winkler is a front-end developer based in Canada, Ontario who builds captivating web experiences.',
        theme_color: '#12022c',
        background_color: '#12022c',
        display: 'standalone',
        icons: [
          {
            src: 'android-chrome-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
