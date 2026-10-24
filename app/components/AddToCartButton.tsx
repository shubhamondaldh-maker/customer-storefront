"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Check, Zap, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    category?: string;
  };
  showQuantityPicker?: boolean;
}

export default function AddToCartButton({ product, showQuantityPicker = true }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  const addToCart = useCartStore((state) => state.addToCart);

  const isOutOfStock = product.stock <= 0;
  const maxStock = product.stock;

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="space-y-4">
      {/* Quantity Picker & Main Add Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        {showQuantityPicker && !isOutOfStock && (
          <div className="flex items-center justify-between sm:justify-center border border-[#48342e] rounded-xl bg-[#2f211d] px-3 py-2 w-full sm:w-36 shadow-xs">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="p-1 text-[#b0afb2] hover:text-[#f5f5f7] disabled:opacity-30 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-black text-[#f5f5f7] text-sm">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={quantity >= maxStock}
              className="p-1 text-[#b0afb2] hover:text-[#f5f5f7] disabled:opacity-30 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Add to Cart (10% Pale Lavender primary highlight) */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black text-sm transition-all duration-300 active:scale-95 cursor-pointer shadow-lg hover:shadow-[#d8b4e2]/30 ${
            isOutOfStock
              ? "bg-[#382723] text-[#8a898c] cursor-not-allowed"
              : isAdded
              ? "bg-emerald-600 text-white animate-pop shadow-[0_0_20px_rgba(16,185,129,0.5)]"
              : "bg-[#d8b4e2] hover:bg-[#e0bfe8] text-[#20132b] shadow-[#d8b4e2]/20 hover:scale-[1.02]"
          }`}
        >
          {isOutOfStock ? (
            <span>Currently Out of Stock</span>
          ) : isAdded ? (
            <>
              <Check className="w-5 h-5 text-white stroke-[3]" />
              <span>Added to Your Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 text-[#20132b]" />
              <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
            </>
          )}
        </button>
      </div>

      {/* Express Buy Now Button (30% Platinum Silver button with Pale Lavender spark) */}
      {!isOutOfStock && (
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black text-sm bg-[#f5f5f7] hover:bg-[#e5e4e2] text-[#1c1412] transition-all active:scale-[0.99] cursor-pointer shadow-md border border-[#d8b4e2]/40"
        >
          <Zap className="w-4 h-4 fill-[#d8b4e2] text-[#d8b4e2]" />
          <span>Buy Now (Instant Checkout)</span>
        </button>
      )}
    </div>
  );
}