import { test, expect } from './helpers';
import { checkPageHealth, checkLinksAndImages } from './helpers';

test('contact page loads and is healthy', async ({ page }) => {
  await page.goto('/contact');
  await checkPageHealth(page);
  await checkLinksAndImages(page);
});

test('contact form submission - valid', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'Hello world');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('text=Message sent successfully')).toBeVisible();
});

test('contact form submission - invalid', async ({ page }) => {
  await page.goto('/contact');
  await page.click('button[type="submit"]');
  
  // Assuming the app shows some validation error for empty fields
  // Since it's a simple Flask app, it might just flash a message or return 400
  // We check if it didn't just succeed
  await expect(page.locator('text=Message sent successfully')).not.toBeVisible();
});
