import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  outputDir: 'test-artifacts/results',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
  },
  reporter: [
    ['html', { outputFolder: 'test-artifacts/html', open: 'never' }],
    ['json', { outputFile: 'test-artifacts/report.json' }],
  ],
});
