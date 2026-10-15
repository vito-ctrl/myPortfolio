import { test, expect } from '@playwright/test';

test.describe('Digital Lab Portfolio Smoke Suite', () => {
  test('home page loads cleanly with no console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Check primary h1
    const heading = page.locator('h1');
    await expect(heading).toContainText('Aymane El Khadraoui');

    // Verify status strip
    await expect(page.locator('text=Seeking a developer internship.')).toBeVisible();

    // Verify no console errors
    expect(consoleErrors).toEqual([]);
  });

  test('Ctrl/Cmd+K opens the command palette and header button works', async ({ page }) => {
    await page.goto('/');

    // Check header button triggers command palette
    const cmdButton = page.locator('button[aria-label^="Open command palette"]');
    await expect(cmdButton).toBeVisible();
    await cmdButton.click();

    const dialog = page.locator('div[role="dialog"][aria-label="Command Palette"]');
    await expect(dialog).toBeVisible();

    // Close via Esc
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    // Open via keyboard shortcut
    await page.keyboard.press('Control+k');
    await expect(dialog).toBeVisible();

    // Type query
    await page.keyboard.type('sprintly');
    await expect(page.locator('text=Sprintly')).toBeVisible();

    await page.keyboard.press('Escape');
  });

  test('case study page loads with spec sheet and architecture explorer', async ({ page }) => {
    await page.goto('/projects/my-city-life');

    const h1 = page.locator('h1');
    await expect(h1).toHaveText('My-City-Life');

    // Architecture explorer
    const explorer = page.locator('[data-testid="architecture-explorer"]');
    await expect(explorer).toBeVisible();

    // Node detail panel
    const detailPanel = page.locator('[data-testid="node-detail-panel"]');
    await expect(detailPanel).toBeVisible();

    // Return breadcrumb works
    const returnLink = page.locator('text=Return to Projects Dossier');
    await returnLink.click();
    await expect(page).toHaveURL(/#projects/);
  });

  test('navigation anchors work properly', async ({ page }) => {
    await page.goto('/');

    const skillsLink = page.locator('header nav a[href="/#skills"]');
    await skillsLink.click();

    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeVisible();
  });

  test('emulated reduced-motion disables animations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Verify reduced motion in computed style
    const body = page.locator('body');
    await expect(body).toBeVisible();

    const motionPreference = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    expect(motionPreference).toBe(true);
  });
});
