import Link from "next/link";
import { ArrowLeft, Search, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-28 text-center space-y-6">
      <div className="w-20 h-20 bg-[#d8b4e2]/20 text-[#d8b4e2] border border-[#d8b4e2]/40 rounded-full flex items-center justify-center mx-auto shadow-md">
        <HelpCircle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#d8b4e2]">
          404 - Page or Product Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#f5f5f7] tracking-tight">
          We couldn&apos;t find that product
        </h1>
        <p className="text-sm text-[#b0afb2] max-w-md mx-auto">
          The product you requested might have been discontinued, renamed, or moved. Explore our 26 available workspace essentials below.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#d8b4e2] hover:bg-[#e0bfe8] text-[#20132b] rounded-xl text-xs font-black transition-all shadow-lg"
        >
          <Search className="w-4 h-4 text-[#20132b]" />
          <span>Browse All 26 Products</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#271c19] hover:bg-[#382723] text-[#f5f5f7] border border-[#48342e] rounded-xl text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#d8b4e2]" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
