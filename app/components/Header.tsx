"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Search, Menu, X, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const hasMounted = useHasMounted();
  const itemCount = useCartStore((state) => state.getItemCount());
  const toggleCart = useCartStore((state) => state.toggleCart);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              NEW STORE
            </span>
            <span>
              Moving from WhatsApp & Instagram! Use code <strong className="text-white bg-stone-800 px-1 py-0.5 rounded border border-stone-700">DM15</strong> for 15% off.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-stone-400 text-[11px]">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Free shipping on $80+
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> 30-Day Money Back
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-black text-lg tracking-tighter group-hover:bg-amber-600 transition-colors shadow-sm">
                  L
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-stone-900 leading-none">
                    LUMINA
                  </span>
                  <span className="text-[10px] font-medium tracking-widest text-stone-500 uppercase mt-0.5">
                    Studio & Workspace
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
                <Link
                  href="/"
                  className="hover:text-stone-900 transition-colors py-1 hover:border-b-2 hover:border-stone-900"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="hover:text-stone-900 transition-colors py-1 hover:border-b-2 hover:border-stone-900"
                >
                  All Products
                </Link>
                <Link
                  href="/products?category=Keyboards+%26+Typing"
                  className="hover:text-stone-900 transition-colors py-1 hover:border-b-2 hover:border-stone-900"
                >
                  Keyboards
                </Link>
                <Link
                  href="/products?category=Audio+%26+Sound"
                  className="hover:text-stone-900 transition-colors py-1 hover:border-b-2 hover:border-stone-900"
                >
                  Audio
                </Link>
                <Link
                  href="/products?category=Lighting+%26+Lamps"
                  className="hover:text-stone-900 transition-colors py-1 hover:border-b-2 hover:border-stone-900"
                >
                  Lighting
                </Link>
              </nav>
            </div>

            {/* Search Bar & Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Search Input */}
              <form onSubmit={handleSearchSubmit} className="hidden lg:flex relative items-center">
                <Search className="w-4 h-4 absolute left-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search 26+ products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 focus:w-72 transition-all duration-200 pl-9 pr-4 py-1.5 text-xs bg-stone-100 border border-transparent focus:border-stone-300 focus:bg-white rounded-full outline-none text-stone-800 placeholder-stone-400"
                />
              </form>

              {/* Cart Button */}
              <button
                type="button"
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold text-sm transition-all active:scale-95 cursor-pointer"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-stone-800" />
                <span className="hidden sm:inline text-xs font-bold">Cart</span>
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold text-white bg-stone-900 rounded-full">
                  {hasMounted ? itemCount : 0}
                </span>
              </button>

              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-stone-100 border border-stone-200 rounded-lg outline-none text-stone-900"
              />
            </form>
            <div className="flex flex-col space-y-2 text-sm font-medium text-stone-800">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center justify-between"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center justify-between"
              >
                <span>All Products (26 Items)</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </Link>
              <Link
                href="/products?category=Keyboards+%26+Typing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center justify-between"
              >
                <span>Keyboards & Typing</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </Link>
              <Link
                href="/products?category=Audio+%26+Sound"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center justify-between"
              >
                <span>Audio & Acoustics</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </Link>
              <Link
                href="/products?category=Lighting+%26+Lamps"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100 flex items-center justify-between"
              >
                <span>Lighting & Lamps</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-stone-900 text-white flex items-center justify-between mt-2"
              >
                <span>View My Cart ({hasMounted ? itemCount : 0})</span>
                <ShoppingBag className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}