import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "All Products (26 Items) | Mechanical Keyboards, Audio, Workspace Gear",
  description: "Browse our complete catalog of ergonomic mechanical keyboards, studio audio, desk lamps, and handcrafted organizers in rich mocha brown, platinum silver, and pale lavender accents.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsClient />
    </Suspense>
  );
}

function ProductsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      <div className="h-10 bg-[#271c19] border border-[#48342e] rounded-lg w-1/3" />
      <div className="flex gap-4">
        <div className="h-10 bg-[#271c19] border border-[#48342e] rounded-lg w-1/4" />
        <div className="h-10 bg-[#271c19] border border-[#48342e] rounded-lg w-1/4" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-[#271c19] border border-[#48342e] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
