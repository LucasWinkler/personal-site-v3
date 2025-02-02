import { test, expect } from '@playwright/test';

test.describe('Navigation & Accessibility', () => {
  test('should have all navigation links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const sections = ['home', 'projects', 'about', 'contact'];
    for (const section of sections) {
      const link = page.locator(
        `#nav .nav__link[href="#${section === 'home' ? '' : section}"]`
      );
      await expect(link).toBeAttached();
      const text = await link.textContent();
      expect(text.toLowerCase()).toContain(section);
    }
  });

  test('should show/hide mobile menu', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile menu test only runs on mobile');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.locator('button.nav__mobile-toggle');
    const navList = page.locator('.nav__list');
    await expect(menuButton).toBeVisible();

    // Open menu and wait for animation
    await menuButton.click();
    await page.waitForTimeout(1000);
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(navList).toBeVisible();

    // Close menu and wait for animation
    await menuButton.click();
    await page.waitForTimeout(1000);
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should scroll to section and handle skip link', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test skip navigation
    const skipLink = page.locator('.skip-navigation');
    await skipLink.focus();
    await page.waitForTimeout(100);
    const isVisible = await skipLink.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 1 && rect.height > 1;
    });
    expect(isVisible).toBeTruthy();

    // Test section navigation
    const aboutLink = page.locator('#nav .nav__link[href="#about"]');
    const aboutSection = page.locator('#about');

    if (isMobile) {
      const menuButton = page.locator('button.nav__mobile-toggle');
      await menuButton.click();
      await page.waitForTimeout(1000);
    }

    await expect(aboutLink).toBeVisible();
    await expect(aboutSection).toBeVisible();

    await aboutLink.click();
    await page.waitForTimeout(1500);

    const isInViewport = await aboutSection.evaluate(el => {
      const rect = el.getBoundingClientRect();
      const tolerance = 300;
      return rect.top >= -tolerance && rect.top <= tolerance;
    });
    expect(isInViewport).toBeTruthy();
  });
});

test.describe('Responsive Design', () => {
  test('should adapt layout for mobile', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // Mobile menu should be visible
    await expect(page.locator('.nav__mobile-toggle')).toBeVisible();

    // Container should respect viewport
    const container = page.locator('.container').first();
    const containerBounds = await container.boundingBox();
    expect(containerBounds.width).toBeLessThanOrEqual(375);
  });

  test('should adapt layout for desktop', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForLoadState('networkidle');

    // Mobile menu should be hidden
    await expect(page.locator('.nav__mobile-toggle')).toBeHidden();

    // Navigation should be visible
    await expect(page.locator('.nav__list')).toBeVisible();

    // Container should be centered
    const container = page.locator('.container').first();
    const containerBounds = await container.boundingBox();
    expect(containerBounds.width).toBeLessThanOrEqual(1440);
  });
});
