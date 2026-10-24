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
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      {/* Trust Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-800 rounded-xl text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Free Express Shipping</h4>
              <p className="text-xs text-stone-400 mt-1">Complimentary delivery on all orders over $80 worldwide.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-800 rounded-xl text-emerald-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">30-Day Trial</h4>
              <p className="text-xs text-stone-400 mt-1">Love it or return it for a 100% full refund. No hassles.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-800 rounded-xl text-sky-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">2-Year Warranty</h4>
              <p className="text-xs text-stone-400 mt-1">Crafted from aerospace aluminum and sustainably sourced wood.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-800 rounded-xl text-emerald-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Direct DM Support</h4>
              <p className="text-xs text-stone-400 mt-1">Chat directly with our team on WhatsApp or Instagram anytime.</p>
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
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-black text-lg">
                L
              </div>
              <span className="text-xl font-bold tracking-tight text-white">LUMINA</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Born on WhatsApp and Instagram DMs, LUMINA curates ergonomic workspace essentials, mechanical typing gear, and mindful lighting for thoughtful creators and remote builders.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/?text=Hi%20Lumina%20Store!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Collections</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/products?category=Keyboards+%26+Typing" className="hover:text-white transition-colors">
                  Keyboards & Typing
                </Link>
              </li>
              <li>
                <Link href="/products?category=Audio+%26+Sound" className="hover:text-white transition-colors">
                  Audio & Acoustics
                </Link>
              </li>
              <li>
                <Link href="/products?category=Lighting+%26+Lamps" className="hover:text-white transition-colors">
                  Lighting & Lamps
                </Link>
              </li>
              <li>
                <Link href="/products?category=Workspaces+%26+Desks" className="hover:text-white transition-colors">
                  Workspaces & Desks
                </Link>
              </li>
              <li>
                <Link href="/products?category=Desk+Accessories" className="hover:text-white transition-colors">
                  Desk Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Customer Care</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  Checkout
                </Link>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">Order Tracking (Via WhatsApp)</span>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">Shipping & Returns</span>
              </li>
              <li>
                <span className="text-stone-500 cursor-default">Privacy Policy & Terms</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Exclusive Drops</h5>
            <p className="text-xs text-stone-400">
              Get notified of limited-run keyboard drops, discounts, and workspace tips.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-emerald-950/60 border border-emerald-800 text-emerald-400 rounded-lg text-xs">
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
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <p>© {new Date().getFullYear()} LUMINA Workspace Store. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the 7-Day Challenge.
        </p>
      </div>
    </footer>
  );
}
