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
      {/* Top Announcement Bar (60% Deep Mocha with 10% Pale Lavender Accents) */}
      <div className="bg-[#18100e] text-[#b0afb2] text-xs py-2 px-4 border-b border-[#2f1f1a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#d8b4e2]/15 text-[#d8b4e2] border border-[#d8b4e2]/30 tracking-wider">
              NEW STORE
            </span>
            <span className="text-[#e5e4e2]">
              Moving from WhatsApp & Instagram! Use code <strong className="text-[#20132b] bg-[#d8b4e2] px-1.5 py-0.5 rounded font-mono font-bold">DM15</strong> for 15% off.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#b0afb2] text-[11px]">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#d8b4e2]" /> Free shipping on $80+
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d8b4e2]" /> 30-Day Money Back
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header (60% Rich Mocha Surface, 30% Platinum Silver Structure, 10% Pale Lavender Accents) */}
      <header className="sticky top-0 z-40 bg-[#241916]/95 backdrop-blur-md border-b border-[#3e2b25] transition-shadow shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#d8b4e2] text-[#20132b] flex items-center justify-center font-black text-lg tracking-tighter shadow-md group-hover:scale-105 transition-transform">
                  L
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-[#f5f5f7] leading-none group-hover:text-[#d8b4e2] transition-colors">
                    LUMINA
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest text-[#b0afb2] uppercase mt-0.5">
                    Studio & Workspace
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links (Platinum Silver with Pale Lavender Hover) */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#b0afb2]">
                <Link
                  href="/"
                  className="hover:text-[#f5f5f7] hover:border-b-2 hover:border-[#d8b4e2] transition-colors py-1"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="hover:text-[#f5f5f7] hover:border-b-2 hover:border-[#d8b4e2] transition-colors py-1"
                >
                  All Products
                </Link>
                <Link
                  href="/products?category=Keyboards+%26+Typing"
                  className="hover:text-[#f5f5f7] hover:border-b-2 hover:border-[#d8b4e2] transition-colors py-1"
                >
                  Keyboards
                </Link>
                <Link
                  href="/products?category=Audio+%26+Sound"
                  className="hover:text-[#f5f5f7] hover:border-b-2 hover:border-[#d8b4e2] transition-colors py-1"
                >
                  Audio
                </Link>
                <Link
                  href="/products?category=Lighting+%26+Lamps"
                  className="hover:text-[#f5f5f7] hover:border-b-2 hover:border-[#d8b4e2] transition-colors py-1"
                >
                  Lighting
                </Link>
              </nav>
            </div>

            {/* Search Bar & Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Search Input (Platinum Silver on Mocha) */}
              <form onSubmit={handleSearchSubmit} className="hidden lg:flex relative items-center">
                <Search className="w-4 h-4 absolute left-3.5 text-[#b0afb2]" />
                <input
                  type="text"
                  placeholder="Search 26+ products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 focus:w-72 transition-all duration-200 pl-9 pr-4 py-2 text-xs bg-[#2f211d] border border-[#48342e] focus:border-[#d8b4e2] focus:bg-[#382723] rounded-full outline-none text-[#f5f5f7] placeholder-[#8a898c]"
                />
              </form>

              {/* Cart Button (Platinum Silver border, Pale Lavender Count Badge) */}
              <button
                type="button"
                onClick={toggleCart}
                className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#2f211d] hover:bg-[#3b2a25] border border-[#48342e] text-[#f5f5f7] font-semibold text-sm transition-all active:scale-95 cursor-pointer shadow-sm hover:border-[#d8b4e2]/60"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4.5 h-4.5 text-[#d8b4e2]" />
                <span className="hidden sm:inline text-xs font-bold text-[#e5e4e2]">Cart</span>
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-black text-[#20132b] bg-[#d8b4e2] rounded-full shadow-xs">
                  {hasMounted ? itemCount : 0}
                </span>
              </button>

              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[#b0afb2] hover:text-[#f5f5f7] hover:bg-[#2f211d]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#3e2b25] bg-[#241916] px-4 pt-3 pb-6 space-y-4 shadow-2xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#b0afb2]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#2f211d] border border-[#48342e] rounded-lg outline-none text-[#f5f5f7] placeholder-[#8a898c] focus:border-[#d8b4e2]"
              />
            </form>
            <div className="flex flex-col space-y-2 text-sm font-medium text-[#e5e4e2]">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#2f211d] flex items-center justify-between"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-[#d8b4e2]" />
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#2f211d] flex items-center justify-between"
              >
                <span>All Products (26 Items)</span>
                <ArrowRight className="w-4 h-4 text-[#d8b4e2]" />
              </Link>
              <Link
                href="/products?category=Keyboards+%26+Typing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#2f211d] flex items-center justify-between"
              >
                <span>Keyboards & Typing</span>
                <ArrowRight className="w-4 h-4 text-[#d8b4e2]" />
              </Link>
              <Link
                href="/products?category=Audio+%26+Sound"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#2f211d] flex items-center justify-between"
              >
                <span>Audio & Acoustics</span>
                <ArrowRight className="w-4 h-4 text-[#d8b4e2]" />
              </Link>
              <Link
                href="/products?category=Lighting+%26+Lamps"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#2f211d] flex items-center justify-between"
              >
                <span>Lighting & Lamps</span>
                <ArrowRight className="w-4 h-4 text-[#d8b4e2]" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-[#d8b4e2] text-[#20132b] font-bold flex items-center justify-between mt-2 shadow-md"
              >
                <span>View My Cart ({hasMounted ? itemCount : 0})</span>
                <ShoppingBag className="w-4 h-4 text-[#20132b]" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}