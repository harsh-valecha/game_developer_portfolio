import { test } from './helpers';
import { checkPageHealth, checkLinksAndImages } from './helpers';

test('blog index page loads and is healthy', async ({ page }) => {
  await page.goto('/blog');
  await checkPageHealth(page);
  await checkLinksAndImages(page);
});
