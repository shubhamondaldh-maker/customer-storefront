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
      {/* Header Title */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
          Full Catalog
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Workspace Collection
          </h1>
          <p className="text-sm font-semibold text-stone-500">
            Showing <span className="text-stone-900">{filteredProducts.length}</span> of {PRODUCTS.length} products
          </p>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search products by name or tag..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-900 focus:bg-white text-stone-900 transition-colors"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  updateParams({ q: null });
                }}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-600 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort By:</span>
            </div>
            <select
              value={currentSort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 outline-none focus:border-stone-900 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 shrink-0 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Categories:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = currentCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateParams({ category: cat === "All Categories" ? null : cat })}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
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
          <span className="text-stone-500 font-medium">Active filters:</span>
          {currentCategory !== "All Categories" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-200 text-stone-800 font-semibold">
              Category: {currentCategory}
              <button
                onClick={() => updateParams({ category: null })}
                className="hover:text-stone-950 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {currentQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-200 text-stone-800 font-semibold">
              Search: &quot;{currentQuery}&quot;
              <button
                onClick={() => {
                  setSearchInput("");
                  updateParams({ q: null });
                }}
                className="hover:text-stone-950 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {currentSort !== "featured" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-200 text-stone-800 font-semibold">
              Sort: {currentSort}
              <button
                onClick={() => updateParams({ sort: null })}
                className="hover:text-stone-950 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 ml-2 underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-stone-900">No products match your criteria</h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
              We couldn&apos;t find any items matching &quot;{currentQuery || currentCategory}&quot;. Try adjusting your keywords or clearing category filters.
            </p>
          </div>
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
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
