import { test } from './helpers';
import { checkPageHealth, checkLinksAndImages } from './helpers';

test('homepage loads and is healthy', async ({ page }) => {
  await page.goto('/');
  await checkPageHealth(page);
  await checkLinksAndImages(page);
});
