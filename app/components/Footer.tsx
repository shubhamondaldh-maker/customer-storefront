"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Truck, RefreshCw, MessageCircle, Check, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#18100e] text-[#e5e4e2] pt-16 pb-12 border-t border-[#2f1f1a]">
      {/* Trust Highlights Section (Mocha + Platinum + Pale Lavender) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#2f1f1a]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#271c19] rounded-xl text-[#d8b4e2] border border-[#48342e]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#f5f5f7] text-sm">Free Express Shipping</h4>
              <p className="text-xs text-[#b0afb2] mt-1">Complimentary delivery on all orders over $80 worldwide.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#271c19] rounded-xl text-[#d8b4e2] border border-[#48342e]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#f5f5f7] text-sm">30-Day Trial</h4>
              <p className="text-xs text-[#b0afb2] mt-1">Love it or return it for a 100% full refund. No hassles.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#271c19] rounded-xl text-[#d8b4e2] border border-[#48342e]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#f5f5f7] text-sm">2-Year Warranty</h4>
              <p className="text-xs text-[#b0afb2] mt-1">Crafted from aerospace aluminum and sustainably sourced wood.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#271c19] rounded-xl text-[#d8b4e2] border border-[#48342e]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#f5f5f7] text-sm">Direct DM Support</h4>
              <p className="text-xs text-[#b0afb2] mt-1">Chat directly with our team on WhatsApp or Instagram anytime.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#d8b4e2] text-[#20132b] flex items-center justify-center font-black text-lg">
                L
              </div>
              <span className="text-xl font-bold tracking-tight text-[#f5f5f7]">LUMINA</span>
            </div>
            <p className="text-xs text-[#b0afb2] leading-relaxed max-w-sm">
              Born on WhatsApp and Instagram DMs, LUMINA curates ergonomic workspace essentials, mechanical typing gear, and mindful lighting for thoughtful creators and remote builders.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/?text=Hi%20Lumina%20Store!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 bg-[#d8b4e2]/15 text-[#d8b4e2] border border-[#d8b4e2]/30 rounded-xl hover:bg-[#d8b4e2]/25 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-[#d8b4e2]">Collections</h5>
            <ul className="space-y-2 text-xs text-[#b0afb2]">
              <li>
                <Link href="/products?category=Keyboards+%26+Typing" className="hover:text-[#f5f5f7] transition-colors">
                  Keyboards & Typing
                </Link>
              </li>
              <li>
                <Link href="/products?category=Audio+%26+Sound" className="hover:text-[#f5f5f7] transition-colors">
                  Audio & Acoustics
                </Link>
              </li>
              <li>
                <Link href="/products?category=Lighting+%26+Lamps" className="hover:text-[#f5f5f7] transition-colors">
                  Lighting & Lamps
                </Link>
              </li>
              <li>
                <Link href="/products?category=Workspaces+%26+Desks" className="hover:text-[#f5f5f7] transition-colors">
                  Workspaces & Desks
                </Link>
              </li>
              <li>
                <Link href="/products?category=Desk+Accessories" className="hover:text-[#f5f5f7] transition-colors">
                  Desk Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-[#d8b4e2]">Customer Care</h5>
            <ul className="space-y-2 text-xs text-[#b0afb2]">
              <li>
                <Link href="/cart" className="hover:text-[#f5f5f7] transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#f5f5f7] transition-colors">
                  Checkout
                </Link>
              </li>
              <li>
                <span className="text-[#8a898c] cursor-default">Order Tracking (Via WhatsApp)</span>
              </li>
              <li>
                <span className="text-[#8a898c] cursor-default">Shipping & Returns</span>
              </li>
              <li>
                <span className="text-[#8a898c] cursor-default">Privacy Policy & Terms</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-[#d8b4e2]">Exclusive Drops</h5>
            <p className="text-xs text-[#b0afb2]">
              Get notified of limited-run keyboard drops, discounts, and workspace tips.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-[#d8b4e2]/15 border border-[#d8b4e2]/30 text-[#d8b4e2] rounded-xl text-xs font-bold">
                <Check className="w-4 h-4 shrink-0" />
                <span>You are on the VIP drop list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#271c19] border border-[#48342e] rounded-xl text-xs text-[#f5f5f7] placeholder-[#8a898c] outline-none focus:border-[#d8b4e2]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 bg-[#d8b4e2] hover:bg-[#e0bfe8] text-[#20132b] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#20132b]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#2f1f1a] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8a898c] gap-4">
        <p>© {new Date().getFullYear()} LUMINA Workspace Store. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed with 60% Mocha Brown, 30% Platinum Silver, 10% Pale Lavender.
        </p>
      </div>
    </footer>
  );
}
