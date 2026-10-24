"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Printer, ArrowRight, MessageCircle, Truck, Calendar, MapPin } from "lucide-react";
import { Order } from "@/data/orders";

export default function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (err) {
        console.error("Could not fetch order data:", err);
      }
    }

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const deliveryDate = order?.estimatedDelivery || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Success Hero Header (Pale Lavender Checkmark + Platinum Title) */}
      <div className="text-center space-y-4 relative">
        {/* Celebration Ambient Radiant Glow */}
        <div className="pointer-events-none absolute left-1/2 -top-12 -translate-x-1/2 w-64 h-64 bg-[#d8b4e2]/20 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative w-20 h-20 bg-[#d8b4e2]/20 text-[#d8b4e2] border-2 border-[#d8b4e2]/60 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pop">
          <CheckCircle2 className="w-11 h-11 text-[#d8b4e2] stroke-[2.5]" />
          <span className="absolute inset-0 rounded-full border border-[#d8b4e2] animate-beacon opacity-75" />
        </div>
        <div className="space-y-1 relative z-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#d8b4e2]">
            Payment Authorized & Order Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#f5f5f7] tracking-tight">
            Thank you for your order!
          </h1>
          <p className="text-xs sm:text-sm text-[#b0afb2] max-w-md mx-auto">
            Your receipt and live tracking updates have been recorded. We are carefully packaging your workspace gear.
          </p>
        </div>
        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 bg-[#271c19] rounded-xl border border-[#48342e] shadow-md hover:border-[#d8b4e2]/50 transition-colors">
          <span className="text-xs text-[#b0afb2] font-semibold">Order Reference:</span>
          <strong className="font-mono text-sm text-[#d8b4e2] font-black">{orderId}</strong>
        </div>
      </div>

      {/* Order Status Cards (Mocha Surface + Platinum Text + Pale Lavender Icons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-[#271c19] border border-[#48342e] rounded-2xl flex items-start gap-3.5 shadow-sm">
          <div className="p-2.5 bg-[#1c1412] border border-[#48342e] rounded-xl text-[#d8b4e2]">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#b0afb2] uppercase tracking-wider block">
              Estimated Delivery
            </span>
            <strong className="text-sm font-bold text-[#f5f5f7] block mt-0.5">{deliveryDate}</strong>
            <span className="text-xs text-[#8a898c]">Tracked Express Courier</span>
          </div>
        </div>

        <div className="p-5 bg-[#271c19] border border-[#48342e] rounded-2xl flex items-start gap-3.5 shadow-sm">
          <div className="p-2.5 bg-[#1c1412] border border-[#48342e] rounded-xl text-[#d8b4e2]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#b0afb2] uppercase tracking-wider block">
              Order Status
            </span>
            <strong className="text-sm font-bold text-[#d8b4e2] block mt-0.5">Processing in Warehouse</strong>
            <span className="text-xs text-[#8a898c]">Packaging with eco-friendly padding</span>
          </div>
        </div>
      </div>

      {/* Itemized Order Receipt Card */}
      <div className="bg-[#271c19] border border-[#48342e] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#3e2b25] pb-4">
          <h2 className="text-base font-black text-[#f5f5f7]">Receipt Details</h2>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-[#48342e] bg-[#1c1412] text-[#f5f5f7] hover:border-[#d8b4e2] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#d8b4e2]" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Shipping address recipient */}
        {order?.customer && (
          <div className="text-xs text-[#b0afb2] bg-[#1c1412] p-4 rounded-xl border border-[#48342e] space-y-1">
            <div className="flex items-center gap-1 text-[#d8b4e2] font-bold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Shipping To:</span>
            </div>
            <p className="font-bold text-[#f5f5f7]">{order.customer.name}</p>
            <p>{order.customer.address.street}</p>
            <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.postalCode}</p>
            <p className="text-[#8a898c]">{order.customer.email} • {order.customer.phone}</p>
          </div>
        )}

        {/* Purchased Items */}
        {order?.items && order.items.length > 0 && (
          <div className="space-y-3 divide-y divide-[#3e2b25]">
            {order.items.map((item) => (
              <div key={item.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-[#1c1412] rounded-lg overflow-hidden shrink-0 border border-[#48342e]">
                    <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <strong className="block text-[#f5f5f7] font-bold">{item.name}</strong>
                    <span className="text-[#b0afb2]">Qty: {item.quantity} × ${item.price}</span>
                  </div>
                </div>
                <span className="font-bold text-[#f5f5f7]">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Totals Recap */}
        {order && (
          <div className="border-t border-[#3e2b25] pt-4 space-y-2 text-xs text-[#b0afb2]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#f5f5f7]">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#d8b4e2] font-bold">
                <span>Discount ({order.discountCode || "Promo"})</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold text-[#f5f5f7]">
                {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-bold text-[#f5f5f7]">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline text-base font-black text-[#f5f5f7] pt-3 border-t border-[#3e2b25]">
              <span>Total Paid</span>
              <span className="text-xl text-[#d8b4e2]">${order.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Help Banner (Mocha Surface + Pale Lavender accents) */}
      <div className="bg-[#271c19] border border-[#48342e] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#d8b4e2] text-[#20132b] rounded-xl">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-[#f5f5f7]">Want WhatsApp Status Alerts?</h4>
            <p className="text-[#b0afb2]">Tap below to ping us with your Order ID for direct WhatsApp updates.</p>
          </div>
        </div>
        <a
          href={`https://wa.me/?text=Hi%20Lumina!%20My%20order%20is%20${encodeURIComponent(orderId)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-[#d8b4e2] hover:bg-[#e0bfe8] text-[#20132b] rounded-xl font-black whitespace-nowrap transition-colors shadow-md"
        >
          WhatsApp Us
        </a>
      </div>

      {/* Continue shopping button */}
      <div className="text-center pt-2">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f5f5f7] hover:bg-[#e5e4e2] text-[#1c1412] rounded-xl text-xs font-black transition-all shadow-md border border-[#d8b4e2]/40"
        >
          <span>Continue Exploring Catalog</span>
          <ArrowRight className="w-4 h-4 text-[#1c1412]" />
        </Link>
      </div>
    </div>
  );
}
