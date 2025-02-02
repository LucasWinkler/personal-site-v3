import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.CI ? 4173 : 5173;
const IS_CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: IS_CI,
  retries: IS_CI ? 2 : 0,
  workers: IS_CI ? 2 : undefined,
  reporter: IS_CI ? [['html'], ['github']] : 'html',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: IS_CI ? 'on' : 'on-first-retry',
    screenshot: IS_CI ? 'on' : 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: process.env.CI
    ? undefined
    : {
        command: 'npm run dev',
        url: `http://localhost:${PORT}`,
        reuseExistingServer: true,
      },
});
