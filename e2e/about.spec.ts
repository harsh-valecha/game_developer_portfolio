import { test } from './helpers';
import { checkPageHealth, checkLinksAndImages } from './helpers';

test('about page loads and is healthy', async ({ page }) => {
  await page.goto('/about');
  await checkPageHealth(page);
  await checkLinksAndImages(page);
});
