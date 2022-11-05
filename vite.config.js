import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

const rewriteSlashToIndexHtml = () => {
  return {
    name: 'rewrite-slash-to-index-html',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      // rewrite / as index.html
      server.middlewares.use('/', (req, _, next) => {
        if (req.url === '/') {
          req.url = '/index.html';
        }
        next();
      });
    },
  };
};

export default defineConfig({
  appType: 'mpa',
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        success: resolve(__dirname, 'success.html'),
        pageNotFound: resolve(__dirname, '404.html'),
      },
    },
  },
  plugins: [
    rewriteSlashToIndexHtml(),
    VitePWA({
      selfDestroying: true,
      devOptions: {
        enabled: false,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        globPatterns: [
          '**/*.{js,css,html,webp,svg,png,jpg,jpeg,ico}',
          'sitemap.xml',
          'robots.txt',
          'manifest.webmanifest',
          'lucas-winklers-resume.pdf',
        ],
      },
      registerType: 'autoUpdate',
      includeAssets: [
        '**/*.{png,svg,webp,jpg,jpeg,ico}',
        'lucas-winklers-resume.pdf',
        'manifest.webmanifest',
      ],
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
            src: 'favicon.ico',
            sizes: '48x48',
            type: 'image/x-icon',
          },
          {
            src: 'android-chrome-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
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
