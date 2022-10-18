import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false,
      },
      includeAssets: ['**/*.{png}'],
      manifest: {
        name: 'Lucas Winkler | Front-End Developer',
        start_url: '/',
        id: '/',
        short_name: 'Lucas Winkler',
        description:
          'Lucas Winkler is a front-end developer based in Canada, Ontario who builds captivating web experiences. Come see my work!',
        theme_color: '#12022c',
        background_color: '#12022c',
        display: 'standalone',
        icons: [
          {
            src: '/images/icons/android-chrome-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/images/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/images/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
