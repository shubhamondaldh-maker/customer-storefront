"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useState } from "react";

export default function CartDrawer() {
  const hasMounted = useHasMounted();
  const isOpen = useCartStore((state) => state.isOpen);
  const setIsOpen = useCartStore((state) => state.setIsOpen);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const getTotal = useCartStore((state) => state.getTotal);
  const discount = useCartStore((state) => state.discount);
  const applyDiscount = useCartStore((state) => state.applyDiscount);
  const removeDiscount = useCartStore((state) => state.removeDiscount);

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!hasMounted || !isOpen) return null;

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const total = getTotal();
  const freeShippingThreshold = 80;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscount(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              <h2 className="text-base font-bold text-stone-900">Your Cart ({items.length})</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-amber-50/70 border-b border-amber-100 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-stone-700 font-medium mb-1.5">
                Add <strong className="text-amber-700">${amountNeededForFreeShipping.toFixed(2)}</strong> more to get <span className="underline decoration-amber-400 font-bold">Free Worldwide Shipping</span>!
              </p>
            ) : (
              <p className="text-emerald-700 font-semibold mb-1.5 flex items-center gap-1">
                🎉 You qualified for Free Express Shipping!
              </p>
            )}
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${progressToFreeShipping >= 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-stone-800">Your cart is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Explore our curated collection of workspace tech, ergonomic accessories, and mechanical keyboards.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Link href="/products" onClick={() => setIsOpen(false)}>
                    Browse Products
                  </Link>
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-stone-50 border border-stone-200/80 rounded-xl hover:border-stone-300 transition-colors"
                >
                  <div className="relative w-18 h-18 bg-white rounded-lg overflow-hidden shrink-0 border border-stone-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.id}`}
                          onClick={() => setIsOpen(false)}
                          className="text-xs font-semibold text-stone-900 hover:text-amber-700 line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-stone-900 mt-0.5">${item.price}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-medium text-stone-500">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 bg-stone-50 px-6 py-4 space-y-3.5">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Discount code (try DM15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg outline-none uppercase font-mono tracking-wider focus:border-stone-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-600 font-medium'}`}>
                  {promoMessage.text}
                </p>
              )}

              {discount && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold">{discount.code}</span>
                    <span>({discount.description})</span>
                  </div>
                  <button
                    onClick={removeDiscount}
                    className="text-emerald-700 hover:text-emerald-900 text-[11px] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({discount?.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-stone-900">
                    {subtotal >= 80 || discount?.type === 'shipping' ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      '$9.99'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>Estimated Tax (8%)</span>
                  <span>${((Math.max(0, subtotal - discountAmount)) * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Secure SSL Checkout
                  </span>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="underline hover:text-stone-800 font-medium"
                  >
                    View Full Cart Page
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
