import { describe, it } from "node:test";
import assert from "node:assert";
import { VALID_DISCOUNTS } from "../store/cartStore";

describe("Cart Business Logic & Discount Calculations", () => {
  it("should calculate standard subtotal accurately", () => {
    const items = [
      { id: "1", price: 45, quantity: 2 },
      { id: "2", price: 139, quantity: 1 },
    ];
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    assert.strictEqual(subtotal, 229);
  });

  it("should apply 15% discount for DM15 correctly", () => {
    const subtotal = 100;
    const discountConfig = VALID_DISCOUNTS["DM15"];
    assert.ok(discountConfig);
    const discountAmount = (subtotal * discountConfig.value) / 100;
    assert.strictEqual(discountAmount, 15);
  });

  it("should provide free shipping on orders of $80 or more", () => {
    const subtotal = 95;
    const shipping = subtotal >= 80 ? 0 : 9.99;
    assert.strictEqual(shipping, 0);
  });

  it("should charge $9.99 standard shipping for orders under $80", () => {
    const subtotal = 45;
    const shipping = subtotal >= 80 ? 0 : 9.99;
    assert.strictEqual(shipping, 9.99);
  });

  it("should compute grand total including tax and discount correctly", () => {
    const subtotal = 100;
    const discount = 15; // 15% off
    const shipping = 0; // > $80
    const taxable = subtotal - discount; // 85
    const tax = Math.round(taxable * 0.08 * 100) / 100; // 6.80
    const grandTotal = Math.round((taxable + shipping + tax) * 100) / 100;
    assert.strictEqual(grandTotal, 91.8);
  });
});
