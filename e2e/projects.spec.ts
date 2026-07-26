import { test } from './helpers';
import { checkPageHealth, checkLinksAndImages } from './helpers';

test('projects page loads and is healthy', async ({ page }) => {
  await page.goto('/projects');
  await checkPageHealth(page);
  await checkLinksAndImages(page);
});
