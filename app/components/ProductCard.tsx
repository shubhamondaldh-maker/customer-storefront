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
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        category: product.category,
      },
      1
    );

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div className="group relative flex flex-col bg-[#271c19] rounded-2xl border border-[#48342e] overflow-hidden hover:border-[#d8b4e2]/70 hover:shadow-2xl hover:shadow-[#140c0a]/80 transition-all duration-300 hover:-translate-y-1">
      {/* Product Image Section */}
      <Link href={`/products/${product.id}`} className="relative aspect-square w-full bg-[#1c1412] overflow-hidden block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Pale Lavender Badge Overlay */}
        {product.badge && (
          <span className="absolute top-3 left-3 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md z-10 bg-[#d8b4e2] text-[#20132b]">
            {product.badge}
          </span>
        )}

        {/* Low Stock Indicator */}
        {product.stock <= 6 && (
          <span className="absolute bottom-3 left-3 text-[10px] font-semibold bg-[#18100e]/90 backdrop-blur-xs text-[#d8b4e2] border border-[#d8b4e2]/30 px-2 py-0.5 rounded-md">
            Only {product.stock} left
          </span>
        )}
      </Link>

      {/* Content Section (Mocha surface + Platinum Silver typography + Pale Lavender accents) */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#b0afb2] uppercase text-[10px] tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#d8b4e2]">
              <Star className="w-3.5 h-3.5 fill-[#d8b4e2]" />
              <span className="font-bold text-[#f5f5f7] text-[11px]">{product.rating}</span>
              <span className="text-[#8a898c] text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title (Platinum Silver) */}
          <h3 className="font-bold text-[#f5f5f7] text-sm md:text-base leading-snug line-clamp-1 group-hover:text-[#d8b4e2] transition-colors">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Description snippet (Muted Platinum) */}
          <p className="text-xs text-[#b0afb2] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-4 border-t border-[#3e2b25] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-[#f5f5f7]">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#8a898c] line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Quick Add Button (10% Pale Lavender Highlight) */}
          <button
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer shadow-sm ${
              product.stock === 0
                ? "bg-[#382723] text-[#8a898c] cursor-not-allowed"
                : isAdded
                ? "bg-emerald-600 text-white"
                : "bg-[#d8b4e2] hover:bg-[#e0bfe8] text-[#20132b]"
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
