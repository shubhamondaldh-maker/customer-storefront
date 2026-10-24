"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useMemo, useTransition } from "react";
import { Search, SlidersHorizontal, X, RotateCcw, ArrowUpDown } from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import ProductCard from "../components/ProductCard";

export default function ProductsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Read state directly from URL query parameters
  const currentCategory = searchParams.get("category") || "All Categories";
  const currentSort = searchParams.get("sort") || "featured";
  const currentQuery = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(currentQuery);

  // Sync parameters to URL
  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "" || value === "All Categories" || value === "featured") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput.trim() || null });
  };

  const clearAllFilters = () => {
    setSearchInput("");
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by query
    if (currentQuery) {
      const q = currentQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (currentCategory && currentCategory !== "All Categories") {
      result = result.filter((p) => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Sort
    if (currentSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (currentSort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // "featured" default
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [currentQuery, currentCategory, currentSort]);

  const hasActiveFilters = currentCategory !== "All Categories" || Boolean(currentQuery) || currentSort !== "featured";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title (Mocha + Platinum + Pale Lavender) */}
      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#d8b4e2]">
          Full Catalog
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-black text-[#f5f5f7] tracking-tight">
            Workspace Collection
          </h1>
          <p className="text-sm font-bold text-[#b0afb2]">
            Showing <span className="text-[#d8b4e2]">{filteredProducts.length}</span> of {PRODUCTS.length} products
          </p>
        </div>
      </div>

      {/* Filter and Search Bar Controls (60% Mocha Surface, 30% Platinum Inputs, 10% Pale Lavender Pills) */}
      <div className="bg-[#271c19] p-4 sm:p-5 rounded-2xl border border-[#48342e] shadow-lg space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#b0afb2]" />
            <input
              type="text"
              placeholder="Search products by name or tag..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-[#1c1412] border border-[#48342e] rounded-xl outline-none focus:border-[#d8b4e2] text-[#f5f5f7] placeholder-[#8a898c] transition-colors"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  updateParams({ q: null });
                }}
                className="absolute right-3 top-3 text-[#b0afb2] hover:text-[#f5f5f7] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#b0afb2] shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#d8b4e2]" />
              <span>Sort By:</span>
            </div>
            <select
              value={currentSort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="bg-[#1c1412] border border-[#48342e] text-[#f5f5f7] text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 outline-none focus:border-[#d8b4e2] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Pale Lavender highlight on selected) */}
        <div className="pt-2 border-t border-[#3e2b25] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-[#8a898c] shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-[#d8b4e2]" /> Categories:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = currentCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateParams({ category: cat === "All Categories" ? null : cat })}
                className={`text-xs font-black px-4 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#d8b4e2] text-[#20132b] shadow-md shadow-[#d8b4e2]/20"
                    : "bg-[#2f211d] hover:bg-[#382723] text-[#e5e4e2] border border-[#48342e]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#b0afb2] font-semibold">Active filters:</span>
          {currentCategory !== "All Categories" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#d8b4e2]/15 text-[#d8b4e2] border border-[#d8b4e2]/30 font-bold">
              Category: {currentCategory}
              <button
                onClick={() => updateParams({ category: null })}
                className="hover:text-white cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {currentQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#d8b4e2]/15 text-[#d8b4e2] border border-[#d8b4e2]/30 font-bold">
              Search: &quot;{currentQuery}&quot;
              <button
                onClick={() => {
                  setSearchInput("");
                  updateParams({ q: null });
                }}
                className="hover:text-white cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {currentSort !== "featured" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#d8b4e2]/15 text-[#d8b4e2] border border-[#d8b4e2]/30 font-bold">
              Sort: {currentSort}
              <button
                onClick={() => updateParams({ sort: null })}
                className="hover:text-white cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-[#d8b4e2] hover:text-[#e0bfe8] font-black flex items-center gap-1 ml-2 underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#271c19] rounded-3xl border border-[#48342e] p-12 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 bg-[#1c1412] border border-[#48342e] rounded-full flex items-center justify-center mx-auto text-[#d8b4e2]">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-[#f5f5f7]">No products match your criteria</h3>
            <p className="text-xs sm:text-sm text-[#b0afb2] max-w-sm mx-auto">
              We couldn&apos;t find any items matching &quot;{currentQuery || currentCategory}&quot;. Try adjusting your keywords or clearing category filters.
            </p>
          </div>
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d8b4e2] text-[#20132b] rounded-xl text-xs font-black hover:bg-[#e0bfe8] transition-colors cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
