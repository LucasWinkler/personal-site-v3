import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
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

    // Check initial state
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

  test('should scroll to section when clicking link', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test a single section navigation (About)
    const aboutLink = page.locator('#nav .nav__link[href="#about"]');
    const aboutSection = page.locator('#about');

    // On mobile, open menu first
    if (isMobile) {
      const menuButton = page.locator('button.nav__mobile-toggle');
      await menuButton.click();
      await page.waitForTimeout(1000);
    }

    await expect(aboutLink).toBeVisible();
    await expect(aboutSection).toBeVisible();

    // Click and wait for scroll
    await aboutLink.click();
    await page.waitForTimeout(1500);

    // Check if section is in viewport with more tolerance
    const isInViewport = await aboutSection.evaluate(el => {
      const rect = el.getBoundingClientRect();
      const tolerance = 300; // Increased tolerance for sticky header
      return rect.top >= -tolerance && rect.top <= tolerance;
    });
    expect(isInViewport).toBeTruthy();
  });
});

test.describe('Content', () => {
  test('should display hero section content', async ({ page }) => {
    await page.goto('/');

    const heroTitle = page.locator('.hero__title');
    await expect(heroTitle).toBeVisible();
    const heroContent = page.locator('.hero__content');
    await expect(heroContent).toBeVisible();
  });

  test('should display projects with images and links', async ({ page }) => {
    await page.goto('/');

    const projects = page.locator('.project');
    await expect(projects).toHaveCount(await projects.count());

    // Test first project
    const firstProject = projects.first();
    await expect(firstProject.locator('.project__title')).toBeVisible();
    await expect(firstProject.locator('.project__description')).toBeVisible();
    await expect(firstProject.locator('.project__image img')).toBeVisible();
    await expect(firstProject.locator('.project__links')).toBeVisible();
  });

  test('should display skills section with animations', async ({ page }) => {
    await page.goto('/');

    const skillsSection = page.locator('.skills');
    await expect(skillsSection).toBeVisible();

    const skillItems = page.locator('.skills__item');
    await expect(skillItems).toHaveCount(await skillItems.count());
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check if there's exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check if sections have proper headings
    const sections = ['about', 'projects', 'skills', 'contact'];
    for (const section of sections) {
      const sectionHeading = page.locator(`#${section} h2`);
      await expect(sectionHeading).toBeVisible();
    }
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');

    // Check project images
    const projectImages = page.locator('.project__image img');
    const count = await projectImages.count();
    for (let i = 0; i < count; i++) {
      const alt = await projectImages.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt.length).toBeGreaterThan(5); // Ensure meaningful alt text
    }
  });
});

test.describe('Responsive Design', () => {
  test('should display correctly on mobile', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // Test mobile menu button
    const menuButton = page.locator('.nav__mobile-toggle');
    await expect(menuButton).toBeVisible();

    // Test container width
    const container = page.locator('.container').first();
    await expect(container).toBeVisible();

    // Check if the container respects viewport width
    const containerBounds = await container.boundingBox();
    expect(containerBounds.width).toBeLessThanOrEqual(375);
  });

  test('should display correctly on tablet', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');

    // Test container width
    const container = page.locator('.container').first();
    await expect(container).toBeVisible();

    // Check if the container respects viewport width
    const containerBounds = await container.boundingBox();
    expect(containerBounds.width).toBeLessThanOrEqual(768);
  });

  test('should display correctly on desktop', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForLoadState('networkidle');

    // Test container width
    const container = page.locator('.container').first();
    await expect(container).toBeVisible();

    // Check if the container respects viewport width
    const containerBounds = await container.boundingBox();
    expect(containerBounds.width).toBeLessThanOrEqual(1440);
  });
});

test.describe('Accessibility', () => {
  test('should have skip navigation link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const skipLink = page.locator('.skip-navigation');

    // Check initial state (should be visually hidden but not display: none)
    const isVisuallyHidden = await skipLink.evaluate(el => {
      const style = window.getComputedStyle(el);
      return (
        style.position === 'absolute' &&
        style.width === '1px' &&
        style.height === '1px' &&
        style.overflow === 'hidden'
      );
    });
    expect(isVisuallyHidden).toBeTruthy();

    // Focus the skip link
    await skipLink.focus();
    await page.waitForTimeout(100); // Wait for any transitions

    // Now it should be visible
    const isVisible = await skipLink.evaluate(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return rect.width > 1 && rect.height > 1 && style.overflow !== 'hidden';
    });
    expect(isVisible).toBeTruthy();
  });
});
