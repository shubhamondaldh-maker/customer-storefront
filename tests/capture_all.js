const { chromium } = require('@playwright/test');

async function captureAll() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Capturing home page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot_home.png', fullPage: true });

  console.log('Capturing /products...');
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot_products.png', fullPage: true });

  console.log('Capturing /checkout with item...');
  // Add item 1
  await page.goto('http://localhost:3000/products/1', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Add to Cart/i }).click();
  await page.waitForTimeout(500);

  await page.goto('http://localhost:3000/cart', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot_cart.png', fullPage: true });

  await page.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot_checkout.png', fullPage: true });

  await browser.close();
  console.log('All screenshots captured!');
}

captureAll().catch(console.error);
