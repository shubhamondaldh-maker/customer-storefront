const { chromium } = require('@playwright/test');

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot_home.png', fullPage: true });
  console.log('Saved screenshot_home.png');

  console.log('Navigating to http://localhost:3000/products/26...');
  await page.goto('http://localhost:3000/products/26', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot_product26.png', fullPage: true });
  console.log('Saved screenshot_product26.png');

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
