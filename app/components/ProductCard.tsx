"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const setIsOpen = useCartStore((state) => state.setIsOpen);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      category: product.category,
    }, 1);

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const badgeColorMap: Record<string, string> = {
    Bestseller: "bg-amber-500 text-white",
    New: "bg-emerald-600 text-white",
    Sale: "bg-rose-500 text-white",
    "Staff Pick": "bg-indigo-600 text-white",
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Product Image Section */}
      <Link href={`/products/${product.id}`} className="relative aspect-square w-full bg-stone-100 overflow-hidden block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badge Overlay */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10 ${
              badgeColorMap[product.badge] || "bg-stone-900 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Stock warning if low stock */}
        {product.stock <= 6 && (
          <span className="absolute bottom-3 left-3 text-[10px] font-semibold bg-stone-900/80 backdrop-blur-xs text-amber-300 px-2 py-0.5 rounded-md">
            Only {product.stock} left
          </span>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-medium text-stone-400">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-stone-800 text-[11px]">{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-stone-900 text-sm md:text-base leading-snug line-clamp-1 group-hover:text-amber-800 transition-colors">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-stone-900">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
              product.stock === 0
                ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                : isAdded
                ? "bg-emerald-600 text-white"
                : "bg-stone-900 hover:bg-stone-800 text-white shadow-sm"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {product.stock === 0 ? (
              <span>Sold out</span>
            ) : isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
