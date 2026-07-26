import { test } from './helpers';
import { checkPageHealth, checkLinksAndImages } from './helpers';

test('blog post page loads and is healthy', async ({ page }) => {
  await page.goto('/blog/1');
  await checkPageHealth(page);
  await checkLinksAndImages(page);
});
