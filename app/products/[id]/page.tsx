import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Star, Truck, ShieldCheck, RotateCcw, CheckCircle2, ChevronRight } from "lucide-react";
import { PRODUCTS, getProductById, getProductBySlug } from "@/data/products";
import AddToCartButton from "@/app/components/AddToCartButton";
import ProductCard from "@/app/components/ProductCard";

interface Props {
  params: Promise<{ id: string }>;
}

// SSG / ISR Strategy: Pre-generate all static pages at build time for max SEO & Core Web Vitals
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

// ISR Revalidation frequency: 60 seconds
export const revalidate = 60;

// Dynamic SEO & OpenGraph tags ("Found on Google" requirement)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id) || getProductBySlug(id);

  if (!product) {
    return {
      title: "Product Not Found | LUMINA",
      description: "The requested product does not exist in our catalog.",
    };
  }

  const title = `${product.name} | LUMINA Workspace Store`;
  const description = `${product.description} Available for $${product.price}. In stock with free shipping on qualifying orders.`;

  return {
    title,
    description,
    keywords: [product.name, product.category, "workspace gear", "ergonomic", "desk accessories"],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id) || getProductBySlug(id);

  if (!product) {
    notFound();
  }

  // Related products from the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // JSON-LD schema for Google rich search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    sku: `LUM-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "LUMINA",
    },
    offers: {
      "@type": "Offer",
      url: `https://lumina-storefront.example.com/products/${product.id}`,
      priceCurrency: "USD",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs (Platinum Silver text) */}
      <nav className="flex items-center gap-2 text-xs text-[#b0afb2] overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-[#f5f5f7] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#8a898c]" />
        <Link href="/products" className="hover:text-[#f5f5f7] transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#8a898c]" />
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#f5f5f7] transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#8a898c]" />
        <span className="font-bold text-[#d8b4e2] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Product Media Gallery (Mocha container + Pale Lavender badge) */}
        <div className="space-y-4 lg:sticky lg:top-24">
          <div className="relative aspect-square w-full bg-[#271c19] rounded-3xl overflow-hidden border border-[#48342e] shadow-2xl group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#d8b4e2] text-[#20132b] font-black text-xs uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                {product.badge}
              </span>
            )}
          </div>

          {/* Quality Proof Bar */}
          <div className="flex items-center justify-between text-xs text-[#b0afb2] px-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#d8b4e2]" /> 100% Genuine Hand-Inspected Quality
            </span>
            <span className="text-[#8a898c] font-mono">SKU: LUM-00{product.id}</span>
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#d8b4e2] bg-[#d8b4e2]/15 px-2.5 py-1 rounded-md border border-[#d8b4e2]/30">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-[#d8b4e2]">
                <Star className="w-4 h-4 fill-[#d8b4e2]" />
                <span className="font-bold text-[#f5f5f7] text-sm">{product.rating}</span>
                <span className="text-[#b0afb2] text-xs">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#f5f5f7] tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price & Discount */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-black text-[#f5f5f7]">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-[#8a898c] line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-xs font-black bg-[#d8b4e2]/20 text-[#d8b4e2] border border-[#d8b4e2]/30 px-2.5 py-0.5 rounded-full">
                    Save ${product.originalPrice - product.price} (
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status Badge */}
          <div className="pt-2">
            {product.stock > 10 ? (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#271c19] text-[#d8b4e2] border border-[#48342e] text-xs font-bold shadow-xs">
                <div className="w-2 h-2 rounded-full bg-[#d8b4e2] animate-pulse" />
                <span>In Stock ({product.stock} units available) — Ready to ship today</span>
              </div>
            ) : product.stock > 0 ? (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#271c19] text-[#e0bfe8] border border-[#d8b4e2]/50 text-xs font-bold shadow-xs">
                <div className="w-2 h-2 rounded-full bg-[#d8b4e2] animate-pulse" />
                <span>Low Stock: Only {product.stock} units left in stock!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#271c19] text-rose-400 border border-rose-500/30 text-xs font-bold">
                <span>Currently Sold Out</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3 text-[#e5e4e2] text-sm leading-relaxed border-t border-b border-[#3e2b25] py-6">
            <p className="font-bold text-[#f5f5f7]">{product.description}</p>
            <p className="text-[#b0afb2]">{product.longDescription}</p>
          </div>

          {/* Key Features List */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#d8b4e2]">
              Key Highlights & Specs
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#e5e4e2]">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d8b4e2] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Purchase Actions (Quantity Picker + Add to Cart + Buy Now) */}
          <div className="pt-2">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                stock: product.stock,
                category: product.category,
              }}
            />
          </div>

          {/* Store Perks & Assurances (Mocha surface + Platinum text + Pale Lavender icons) */}
          <div className="bg-[#271c19] rounded-2xl p-5 space-y-3.5 border border-[#48342e] text-xs">
            <div className="flex items-center gap-3 text-[#e5e4e2]">
              <Truck className="w-5 h-5 text-[#d8b4e2] shrink-0" />
              <div>
                <strong className="block text-[#f5f5f7]">Fast Express Delivery</strong>
                <span className="text-[#b0afb2]">Free shipping on all orders over $80. Delivered in 2-4 business days.</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[#e5e4e2] border-t border-[#3e2b25] pt-3">
              <RotateCcw className="w-5 h-5 text-[#d8b4e2] shrink-0" />
              <div>
                <strong className="block text-[#f5f5f7]">30-Day Money-Back Guarantee</strong>
                <span className="text-[#b0afb2]">Try it in your setup. If you don&apos;t love it, return it for a complete refund.</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[#e5e4e2] border-t border-[#3e2b25] pt-3">
              <ShieldCheck className="w-5 h-5 text-[#d8b4e2] shrink-0" />
              <div>
                <strong className="block text-[#f5f5f7]">2-Year Structural Warranty</strong>
                <span className="text-[#b0afb2]">Covers manufacturing defects and premium hardware integrity.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#3e2b25] space-y-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#d8b4e2]">
              Recommended Pairings
            </span>
            <h2 className="text-2xl font-black text-[#f5f5f7] tracking-tight mt-1">
              More from {product.category}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
