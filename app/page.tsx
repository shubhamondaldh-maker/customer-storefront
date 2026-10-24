import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Star, CheckCircle2 } from "lucide-react";
import ProductCard from "./components/ProductCard";
import { getFeaturedProducts, CATEGORIES } from "@/data/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  const categoryHighlights = [
    {
      name: "Keyboards & Typing",
      count: "5 items",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
      href: "/products?category=Keyboards+%26+Typing"
    },
    {
      name: "Audio & Sound",
      count: "5 items",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      href: "/products?category=Audio+%26+Sound"
    },
    {
      name: "Lighting & Lamps",
      count: "4 items",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
      href: "/products?category=Lighting+%26+Lamps"
    },
    {
      name: "Workspaces & Desks",
      count: "4 items",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
      href: "/products?category=Workspaces+%26+Desks"
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=80"
            alt="Workspace Setup Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Online Store Launch</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Elevate Your Desk. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Deepen Your Focus.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-xl">
              From our viral Instagram & WhatsApp drops to our official digital storefront. Ergonomic mechanical keyboards, ambient task lighting, and studio-grade audio crafted for deep work.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <span>Shop All 26 Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products?category=Keyboards+%26+Typing"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-white font-semibold text-sm border border-stone-700 transition-colors"
              >
                <span>Explore Keyboards</span>
              </Link>
            </div>

            {/* Social proof counters */}
            <div className="pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-2xl font-black text-white">12,000+</p>
                <p className="text-xs text-stone-400 mt-0.5">Desks Upgraded</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">4.9 ★</p>
                <p className="text-xs text-stone-400 mt-0.5">Average Rating</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-400">100%</p>
                <p className="text-xs text-stone-400 mt-0.5">Satisfaction Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Badges Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-stone-200 rounded-2xl flex items-center gap-4 shadow-2xs">
            <div className="p-3 bg-amber-100 rounded-xl text-amber-700">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Free Express Shipping</h3>
              <p className="text-xs text-stone-500">On all orders exceeding $80</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-stone-200 rounded-2xl flex items-center gap-4 shadow-2xs">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">30-Day Hassle Free</h3>
              <p className="text-xs text-stone-500">Love your gear or full refund</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-stone-200 rounded-2xl flex items-center gap-4 shadow-2xs">
            <div className="p-3 bg-sky-100 rounded-xl text-sky-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">2-Year Solid Warranty</h3>
              <p className="text-xs text-stone-500">Premium build materials</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-stone-200 rounded-2xl flex items-center gap-4 shadow-2xs">
            <div className="p-3 bg-purple-100 rounded-xl text-purple-700">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">15% Welcome Discount</h3>
              <p className="text-xs text-stone-500">Use promo code <strong className="text-stone-900">DM15</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Curated Spaces</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-stone-700 hover:text-stone-950 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryHighlights.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-medium text-amber-300">{cat.count}</span>
                <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Community Favorites</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
              Featured Workspace Upgrades
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs transition-colors"
          >
            <span>See Full 26 Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      </section>

      {/* Founder's Story / DM Transition Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-stone-800 shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Direct from the Maker
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              We started selling over WhatsApp & Instagram DMs. Now we have an official storefront.
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              We know many of our early supporters loved ordering via direct message. You can still message us on WhatsApp anytime for custom desk advice — or enjoy instant live inventory, fast checkout, and order confirmation right here on our new website!
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-950 font-bold text-xs transition-colors"
              >
                Browse All Products
              </Link>
              <div className="text-xs text-stone-400 flex items-center gap-1.5">
                <span>Use coupon</span>
                <span className="font-mono bg-stone-800 px-2 py-0.5 rounded text-amber-300 border border-stone-700 font-bold">
                  DM15
                </span>
                <span>for 15% off at checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}