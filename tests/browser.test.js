import { test } from '@playwright/test';

test('test browser', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.pause();
});
