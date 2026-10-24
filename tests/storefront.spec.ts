import { test, expect } from "@playwright/test";

test("Full purchase flow: home -> open product -> add to cart -> checkout -> see confirmation page", async ({
  page,
}) => {
  // 1. Visit Home Page
  await page.goto("/");
  await expect(page).toHaveTitle(/LUMINA/);

  // 2. Open a Product from the featured grid
  const productLink = page.locator("a[href^='/products/']").first();
  await productLink.waitFor({ state: "visible" });
  await productLink.click();

  // Verify we navigated to the product detail page
  await expect(page).toHaveURL(/\/products\/\d+/);
  await expect(page.locator("h1")).toBeVisible();

  // 3. Add to Cart with quantity
  const addToCartBtn = page.getByRole("button", { name: /Add to Cart/i });
  await expect(addToCartBtn).toBeVisible();
  await addToCartBtn.click();

  // Verify added confirmation state
  await expect(page.getByText(/Added to Your Cart!/i)).toBeVisible();

  // 4. Navigate to Checkout (via /cart or /checkout)
  await page.goto("/checkout");
  await expect(page.locator("h2").filter({ hasText: /Customer Information/i })).toBeVisible();

  // 5. Fill out checkout form details
  await page.locator("input[placeholder='e.g. Alex Johnson']").fill("Jordan Smith");
  await page.locator("input[placeholder='alex@example.com']").fill("jordan.smith@example.com");
  await page.locator("input[placeholder='+1 (555) 000-0000']").fill("+15559876543");
  await page.locator("input[placeholder='123 Workspace Way']").fill("100 Innovation Blvd");
  await page.locator("input[placeholder='San Francisco']").fill("Seattle");
  await page.locator("input[placeholder='California']").fill("WA");
  await page.locator("input[placeholder='94107']").fill("98101");

  // Fill payment card details
  await page.locator("input[placeholder='4242 4242 4242 4242']").fill("4242 4242 4242 4242");
  await page.locator("input[placeholder='12/28']").fill("10/29");
  await page.locator("input[placeholder='888']").fill("432");

  // Ensure failure simulation is unchecked for success flow
  const failureCheckbox = page.locator("input[type='checkbox']");
  if (await failureCheckbox.isChecked()) {
    await failureCheckbox.uncheck();
  }

  // 6. Click Place Order
  const placeOrderBtn = page.getByRole("button", { name: /Authorize & Place Order/i });
  await placeOrderBtn.click();

  // 7. Verify Order Confirmation page
  await expect(page).toHaveURL(/\/order-success\?orderId=ORD-/);
  await expect(page.getByText(/Payment Authorized & Order Confirmed/i)).toBeVisible();
  await expect(page.locator("strong").filter({ hasText: /^ORD-/ })).toBeVisible();
});
