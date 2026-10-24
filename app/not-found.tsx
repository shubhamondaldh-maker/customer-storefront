import Link from "next/link";
import { ArrowLeft, Search, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-28 text-center space-y-6">
      <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
        <HelpCircle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          404 - Page or Product Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          We couldn&apos;t find that product
        </h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          The product you requested might have been discontinued, renamed, or moved. Explore our 26 available workspace essentials below.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-md"
        >
          <Search className="w-4 h-4" />
          <span>Browse All 26 Products</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
