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
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#241916] text-[#e5e4e2] shadow-2xl flex flex-col border-l border-[#3e2b25]">
          {/* Header (Mocha Dark) */}
          <div className="px-6 py-5 border-b border-[#3e2b25] flex items-center justify-between bg-[#1c1412]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d8b4e2]" />
              <h2 className="text-base font-black text-[#f5f5f7]">Your Cart ({items.length})</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#b0afb2] hover:text-[#f5f5f7] hover:bg-[#2f211d] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (Pale Lavender Progress) */}
          <div className="px-6 py-3.5 bg-[#2f211d] border-b border-[#3e2b25] text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-[#b0afb2] font-medium mb-1.5">
                Add <strong className="text-[#d8b4e2]">${amountNeededForFreeShipping.toFixed(2)}</strong> more to get <span className="underline decoration-[#d8b4e2] font-bold text-[#f5f5f7]">Free Worldwide Shipping</span>!
              </p>
            ) : (
              <p className="text-[#d8b4e2] font-bold mb-1.5 flex items-center gap-1">
                🎉 You qualified for Free Express Shipping!
              </p>
            )}
            <div className="w-full bg-[#1c1412] h-1.5 rounded-full overflow-hidden border border-[#48342e]">
              <div
                className="h-full bg-[#d8b4e2] transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#2f211d] rounded-full flex items-center justify-center text-[#d8b4e2] border border-[#48342e]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#f5f5f7]">Your cart is empty</h3>
                  <p className="text-xs text-[#b0afb2] max-w-xs mx-auto">
                    Explore our curated collection of workspace tech, ergonomic accessories, and mechanical keyboards.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 text-xs font-black px-5 py-2.5 bg-[#d8b4e2] text-[#20132b] rounded-xl hover:bg-[#e0bfe8] transition-colors cursor-pointer shadow-md"
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
                  className="flex gap-4 p-3.5 bg-[#2f211d] border border-[#48342e] rounded-xl hover:border-[#d8b4e2]/50 transition-colors"
                >
                  <div className="relative w-18 h-18 bg-[#1c1412] rounded-lg overflow-hidden shrink-0 border border-[#3e2b25]">
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
                          className="text-xs font-bold text-[#f5f5f7] hover:text-[#d8b4e2] line-clamp-1 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8a898c] hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-extrabold text-[#f5f5f7] mt-0.5">${item.price}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#48342e] rounded-lg bg-[#241916] overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#382723] text-[#b0afb2] hover:text-[#f5f5f7] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#f5f5f7]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#382723] text-[#b0afb2] hover:text-[#f5f5f7] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#b0afb2]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-[#3e2b25] bg-[#1c1412] px-6 py-5 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8a898c]" />
                  <input
                    type="text"
                    placeholder="Promo code (DM15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-[#241916] border border-[#48342e] rounded-xl outline-none uppercase font-mono tracking-wider text-[#f5f5f7] placeholder-[#8a898c] focus:border-[#d8b4e2]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-black bg-[#f5f5f7] hover:bg-[#e5e4e2] text-[#1c1412] rounded-xl transition-colors cursor-pointer border border-[#d8b4e2]/50"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] font-semibold ${promoMessage.isError ? 'text-rose-400' : 'text-[#d8b4e2]'}`}>
                  {promoMessage.text}
                </p>
              )}

              {discount && (
                <div className="flex items-center justify-between text-xs bg-[#d8b4e2]/15 text-[#d8b4e2] px-3 py-2 rounded-xl border border-[#d8b4e2]/30">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold">{discount.code}</span>
                    <span>({discount.description})</span>
                  </div>
                  <button
                    onClick={removeDiscount}
                    className="text-[#f5f5f7] hover:underline text-[11px] cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown (Platinum Silver) */}
              <div className="space-y-1.5 text-xs text-[#b0afb2] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#f5f5f7]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#d8b4e2] font-semibold">
                    <span>Discount ({discount?.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-[#f5f5f7]">
                    {subtotal >= 80 || discount?.type === 'shipping' ? (
                      <span className="text-[#d8b4e2]">FREE</span>
                    ) : (
                      '$9.99'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8a898c]">
                  <span>Estimated Tax (8%)</span>
                  <span>${((Math.max(0, subtotal - discountAmount)) * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#f5f5f7] pt-2 border-t border-[#3e2b25]">
                  <span>Total</span>
                  <span className="text-base text-[#d8b4e2] font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button (Pale Lavender 10% Accent) */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#d8b4e2] hover:bg-[#e0bfe8] text-[#20132b] rounded-xl font-black text-sm shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#20132b]" />
                </Link>

                <div className="flex items-center justify-between text-[11px] text-[#8a898c] pt-1">
                  <span className="flex items-center gap-1 text-[#b0afb2]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d8b4e2]" /> 256-Bit SSL Checkout
                  </span>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="underline hover:text-[#f5f5f7] text-[#b0afb2] font-semibold"
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
