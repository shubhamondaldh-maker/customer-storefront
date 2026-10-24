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
  const setIsOpen = useCartStore((state) => state.setIsOpen);

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
          <div className="flex items-center justify-between sm:justify-center border-2 border-stone-300 rounded-xl bg-white px-3 py-2 w-full sm:w-36 shadow-2xs">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:hover:text-stone-500 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-stone-900 text-sm">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={quantity >= maxStock}
              className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:hover:text-stone-500 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-md ${
            isOutOfStock
              ? "bg-stone-200 text-stone-400 cursor-not-allowed"
              : isAdded
              ? "bg-emerald-600 text-white"
              : "bg-stone-900 hover:bg-stone-800 text-white"
          }`}
        >
          {isOutOfStock ? (
            <span>Currently Out of Stock</span>
          ) : isAdded ? (
            <>
              <Check className="w-5 h-5" />
              <span>Added to Your Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
            </>
          )}
        </button>
      </div>

      {/* Express Buy Now Button */}
      {!isOutOfStock && (
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-stone-950 transition-all active:scale-[0.99] cursor-pointer shadow-sm"
        >
          <Zap className="w-4 h-4 fill-stone-950" />
          <span>Buy Now (Instant Checkout)</span>
        </button>
      )}
    </div>
  );
}