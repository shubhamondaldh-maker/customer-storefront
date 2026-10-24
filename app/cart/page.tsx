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
        <div className="h-10 bg-stone-200 rounded-lg w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-stone-200 rounded-2xl" />
          <div className="h-80 bg-stone-200 rounded-2xl" />
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
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">Your Cart is Empty</h1>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            You haven&apos;t added any workspace gear yet. Browse our curated keyboards, audio, and desk accessories to get started.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 text-white rounded-xl font-bold text-sm hover:bg-stone-800 transition-colors shadow-md"
          >
            <span>Start Shopping Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review your selected items and configure delivery before checking out.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-stone-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
          <Link
            href="/products"
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      {/* Free Shipping Progress */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
        <div className="flex justify-between items-center text-xs mb-2">
          {neededForFreeShipping > 0 ? (
            <span className="text-stone-800 font-medium">
              Add <strong className="text-amber-800">${neededForFreeShipping.toFixed(2)}</strong> more to your order for <strong className="text-stone-900">Free Worldwide Shipping</strong>!
            </span>
          ) : (
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              🎉 Congratulations! You have unlocked Free Express Shipping.
            </span>
          )}
          <span className="font-bold text-stone-700">{progressPercent}%</span>
        </div>
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              progressPercent >= 100 ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Content: Items & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Item Rows */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-5 p-5 bg-white border border-stone-200 rounded-2xl shadow-2xs hover:border-stone-300 transition-colors"
            >
              {/* Product Thumbnail */}
              <div className="relative w-full sm:w-28 h-28 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200">
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
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        {item.category}
                      </span>
                    )}
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base hover:text-amber-800 transition-colors">
                      <Link href={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Item Price: ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden shadow-2xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 sm:p-2 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 sm:p-2 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal per item */}
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block">Total</span>
                    <span className="text-base font-extrabold text-stone-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-black text-stone-900 tracking-tight">Order Summary</h2>

          {/* Promo code field */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Promo or Discount Code
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="e.g. DM15, SAVE10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none uppercase font-mono tracking-wider focus:border-stone-900 focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoFeedback && (
              <p
                className={`text-xs ${
                  promoFeedback.isError ? "text-rose-600" : "text-emerald-600 font-semibold"
                }`}
              >
                {promoFeedback.text}
              </p>
            )}
            {discount && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200">
                <span className="font-mono font-bold">{discount.code} applied</span>
                <button
                  type="button"
                  onClick={removeDiscount}
                  className="text-emerald-700 hover:text-emerald-900 underline text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </form>

          {/* Cost Line Items */}
          <div className="space-y-3 text-xs sm:text-sm text-stone-600 border-t border-stone-200 pt-4">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({discount?.code})</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-stone-900">
                {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-semibold text-stone-900">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-baseline text-base sm:text-lg font-black text-stone-900 pt-4 border-t border-stone-200">
              <span>Estimated Total</span>
              <span className="text-xl sm:text-2xl">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="space-y-3">
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-bold text-sm shadow-md transition-all active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Encrypted 256-bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
