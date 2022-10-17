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
          'Lucas Winkler is a front-end developer who builds captivating web experiences.',
        theme_color: '#181920',
        background_color: '#181920',
        icons: [
          {
            src: '/images/icons/maskable-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/images/icons/maskable-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
