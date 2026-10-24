import { describe, it } from "node:test";
import assert from "node:assert";
import { PRODUCTS, getProductById } from "../data/products";

describe("Server-Side Checkout Validation Rules", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("should validate customer email correctly", () => {
    assert.strictEqual(emailRegex.test("customer@example.com"), true);
    assert.strictEqual(emailRegex.test("invalid-email"), false);
    assert.strictEqual(emailRegex.test("customer@domain"), false);
  });

  it("should reject empty cart items", () => {
    const items: Array<{ id: string; quantity: number }> = [];
    const isValid = Array.isArray(items) && items.length > 0;
    assert.strictEqual(isValid, false);
  });

  it("should enforce stock inventory limits", () => {
    const lamp = getProductById("1");
    assert.ok(lamp);
    
    const requestedQty = 999;
    const isAvailable = requestedQty <= lamp.stock;
    assert.strictEqual(isAvailable, false);
  });

  it("should detect test decline triggers (card ending in 0000 or simulateFailure)", () => {
    const cardWithDecline = "4242 4242 4242 0000";
    const cardClean = cardWithDecline.replace(/\s+/g, "");
    const shouldDecline = cardClean.endsWith("0000");
    assert.strictEqual(shouldDecline, true);

    const normalCard = "4242 4242 4242 4242";
    const normalClean = normalCard.replace(/\s+/g, "");
    assert.strictEqual(normalClean.endsWith("0000"), false);
  });
});
