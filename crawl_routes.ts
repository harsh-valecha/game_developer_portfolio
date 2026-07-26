import { chromium } from '@playwright/test';
import fs from 'fs';

async function crawl() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  const links = await page.locator('a[href]').all();
  const routes = new Set<string>();
  
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (href && (href.startsWith('/') || href.includes('http://localhost:3000'))) {
      const absolute = new URL(href, 'http://localhost:3000').pathname;
      if (absolute !== '/favicon.ico') {
        routes.add(absolute);
      }
    }
  }
  
  console.log(JSON.stringify([...routes]));
  await browser.close();
}

crawl().catch(console.error);
