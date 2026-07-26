import { test, expect } from '@playwright/test';

export { test, expect };

export async function checkPageHealth(page) {
  // Check if page has a title
  const title = await page.title();
  expect(title).not.toBe('');
  
  // Check for console errors
  const logs = [];
  page.on('console', msg => {
    if (msg.type() === 'error') logs.push(msg.text());
  });
  
  // Give it a moment to load and log errors
  await page.waitForLoadState('networkidle');
  
  expect(logs).toHaveLength(0);
}

export async function checkLinksAndImages(page) {
  const links = await page.locator('a[href]').all();
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (href && (href.startsWith('/') || href.includes(page.url()))) {
      const response = await page.request.get(href);
      expect(response.status(), `Link ${href} should be successful`).toBeLessThan(400);
    }
  }

  const images = await page.locator('img[src]').all();
  for (const img of images) {
    const src = await img.getAttribute('src');
    if (src) {
      const response = await page.request.get(src);
      expect(response.status(), `Image ${src} should be successful`).toBeLessThan(400);
    }
  }
}
