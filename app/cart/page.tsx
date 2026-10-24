"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, ArrowLeft, RotateCcw } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useHasMounted } from "@/hooks/useHasMounted";

export default function CartPage() {
  const hasMounted = useHasMounted();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const getShippingFee = useCartStore((state) => state.getShippingFee);
  const getEstimatedTax = useCartStore((state) => state.getEstimatedTax);
  const getTotal = useCartStore((state) => state.getTotal);
  const discount = useCartStore((state) => state.discount);
  const applyDiscount = useCartStore((state) => state.applyDiscount);
  const removeDiscount = useCartStore((state) => state.removeDiscount);

  const [promoCode, setPromoCode] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  if (!hasMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse space-y-6">
        <div className="h-10 bg-[#271c19] border border-[#48342e] rounded-lg w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-[#271c19] border border-[#48342e] rounded-2xl" />
          <div className="h-80 bg-[#271c19] border border-[#48342e] rounded-2xl" />
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const shipping = getShippingFee();
  const tax = getEstimatedTax();
  const total = getTotal();

  const freeShippingThreshold = 80;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const res = applyDiscount(promoCode);
    setPromoFeedback({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoCode("");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#271c19] border border-[#48342e] rounded-full flex items-center justify-center mx-auto text-[#d8b4e2]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#f5f5f7]">Your Cart is Empty</h1>
          <p className="text-sm text-[#b0afb2] max-w-md mx-auto">
            You haven&apos;t added any workspace gear yet. Browse our curated keyboards, audio, and desk accessories to get started.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#d8b4e2] text-[#20132b] rounded-xl font-black text-sm hover:bg-[#e0bfe8] transition-colors shadow-lg"
          >
            <span>Start Shopping Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#20132b]" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3e2b25] pb-6">
        <div>
          <h1 className="text-3xl font-black text-[#f5f5f7] tracking-tight">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-[#b0afb2] mt-1">
            Review your selected items and configure delivery before checking out.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-[#8a898c] hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
          <Link
            href="/products"
            className="text-xs font-bold text-[#d8b4e2] hover:text-[#e0bfe8] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      {/* Free Shipping Progress (Mocha Container + Pale Lavender Progress Bar) */}
      <div className="bg-[#271c19] border border-[#48342e] rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center text-xs mb-2">
          {neededForFreeShipping > 0 ? (
            <span className="text-[#b0afb2] font-medium">
              Add <strong className="text-[#d8b4e2]">${neededForFreeShipping.toFixed(2)}</strong> more to your order for <strong className="text-[#f5f5f7]">Free Worldwide Shipping</strong>!
            </span>
          ) : (
            <span className="text-[#d8b4e2] font-bold flex items-center gap-1.5">
              🎉 Congratulations! You have unlocked Free Express Shipping.
            </span>
          )}
          <span className="font-bold text-[#f5f5f7]">{progressPercent}%</span>
        </div>
        <div className="w-full bg-[#1c1412] h-2 rounded-full overflow-hidden border border-[#3e2b25]">
          <div
            className="h-full bg-[#d8b4e2] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Content: Items & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Item Rows (60% Mocha Surface) */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-5 p-5 bg-[#271c19] border border-[#48342e] rounded-2xl shadow-sm hover:border-[#d8b4e2]/50 transition-colors"
            >
              {/* Product Thumbnail */}
              <div className="relative w-full sm:w-28 h-28 bg-[#1c1412] rounded-xl overflow-hidden shrink-0 border border-[#3e2b25]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 112px"
                  className="object-cover"
                />
              </div>

              {/* Product Info & Controls */}
              <div className="flex-1 flex flex-col justify-between space-y-4 sm:space-y-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {item.category && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#d8b4e2]">
                        {item.category}
                      </span>
                    )}
                    <h3 className="font-bold text-[#f5f5f7] text-sm sm:text-base hover:text-[#d8b4e2] transition-colors">
                      <Link href={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="text-xs text-[#b0afb2] mt-0.5">
                      Item Price: ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-[#8a898c] hover:text-rose-400 hover:bg-[#382723] rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#3e2b25]">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#48342e] rounded-xl bg-[#1c1412] overflow-hidden shadow-xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 sm:p-2 text-[#b0afb2] hover:text-[#f5f5f7] hover:bg-[#2f211d] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-black text-[#f5f5f7]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 sm:p-2 text-[#b0afb2] hover:text-[#f5f5f7] hover:bg-[#2f211d] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal per item */}
                  <div className="text-right">
                    <span className="text-xs text-[#8a898c] block">Total</span>
                    <span className="text-base font-black text-[#f5f5f7]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary Sidebar (Mocha Card + Platinum Text + Pale Lavender CTA) */}
        <div className="bg-[#271c19] border border-[#48342e] rounded-3xl p-6 shadow-xl space-y-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-black text-[#f5f5f7] tracking-tight">Order Summary</h2>

          {/* Promo code field */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#b0afb2] block">
              Promo or Discount Code
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 absolute left-3 top-2.5 text-[#8a898c]" />
                <input
                  type="text"
                  placeholder="e.g. DM15, SAVE10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#1c1412] border border-[#48342e] rounded-xl outline-none uppercase font-mono tracking-wider text-[#f5f5f7] placeholder-[#8a898c] focus:border-[#d8b4e2]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#f5f5f7] hover:bg-[#e5e4e2] text-[#1c1412] rounded-xl text-xs font-black transition-colors cursor-pointer border border-[#d8b4e2]/40"
              >
                Apply
              </button>
            </div>
            {promoFeedback && (
              <p
                className={`text-xs ${
                  promoFeedback.isError ? "text-rose-400" : "text-[#d8b4e2] font-semibold"
                }`}
              >
                {promoFeedback.text}
              </p>
            )}
            {discount && (
              <div className="flex items-center justify-between text-xs bg-[#d8b4e2]/15 text-[#d8b4e2] p-2.5 rounded-xl border border-[#d8b4e2]/30">
                <span className="font-mono font-bold">{discount.code} applied</span>
                <button
                  type="button"
                  onClick={removeDiscount}
                  className="text-[#f5f5f7] hover:underline text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </form>

          {/* Cost Line Items (30% Platinum Silver text) */}
          <div className="space-y-3 text-xs sm:text-sm text-[#b0afb2] border-t border-[#3e2b25] pt-4">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-[#f5f5f7]">${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#d8b4e2] font-bold">
                <span>Discount ({discount?.code})</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-bold text-[#f5f5f7]">
                {shipping === 0 ? <span className="text-[#d8b4e2] font-black">FREE</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-bold text-[#f5f5f7]">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-baseline text-base sm:text-lg font-black text-[#f5f5f7] pt-4 border-t border-[#3e2b25]">
              <span>Estimated Total</span>
              <span className="text-xl sm:text-2xl text-[#d8b4e2]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout CTA (10% Pale Lavender Highlight) */}
          <div className="space-y-3">
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-[#d8b4e2] hover:bg-[#e0bfe8] text-[#20132b] rounded-2xl font-black text-sm shadow-xl transition-all active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#20132b]" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-[#8a898c] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#d8b4e2]" />
              <span className="text-[#b0afb2]">Encrypted 256-bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
