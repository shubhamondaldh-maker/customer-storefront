"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Package, Printer, ArrowRight, MessageCircle, Truck, Calendar, MapPin } from "lucide-react";
import { Order } from "@/data/orders";

export default function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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
      {/* Success Hero Header */}
      <div className="text-center space-y-4">
        <div className="w-18 h-18 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm animate-in zoom-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Payment Authorized & Order Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Thank you for your order!
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Your receipt and live tracking updates have been recorded. We are carefully packaging your workspace gear.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-xl border border-stone-200">
          <span className="text-xs text-stone-500 font-medium">Order Reference:</span>
          <strong className="font-mono text-sm text-stone-900 font-bold">{orderId}</strong>
        </div>
      </div>

      {/* Order Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-white border border-stone-200 rounded-2xl flex items-start gap-3.5 shadow-2xs">
          <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              Estimated Delivery
            </span>
            <strong className="text-sm font-bold text-stone-900 block mt-0.5">{deliveryDate}</strong>
            <span className="text-xs text-stone-500">Tracked Express Courier</span>
          </div>
        </div>

        <div className="p-5 bg-white border border-stone-200 rounded-2xl flex items-start gap-3.5 shadow-2xs">
          <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-700">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              Order Status
            </span>
            <strong className="text-sm font-bold text-emerald-700 block mt-0.5">Processing in Warehouse</strong>
            <span className="text-xs text-stone-500">Packaging with eco-friendly padding</span>
          </div>
        </div>
      </div>

      {/* Itemized Order Receipt Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <h2 className="text-base font-bold text-stone-900">Receipt Details</h2>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Shipping address recipient */}
        {order?.customer && (
          <div className="text-xs text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1">
            <div className="flex items-center gap-1 text-stone-800 font-bold mb-1">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              <span>Shipping To:</span>
            </div>
            <p className="font-semibold text-stone-900">{order.customer.name}</p>
            <p>{order.customer.address.street}</p>
            <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.postalCode}</p>
            <p className="text-stone-500">{order.customer.email} • {order.customer.phone}</p>
          </div>
        )}

        {/* Purchased Items */}
        {order?.items && order.items.length > 0 && (
          <div className="space-y-3 divide-y divide-stone-100">
            {order.items.map((item) => (
              <div key={item.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                    <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-bold">{item.name}</strong>
                    <span className="text-stone-500">Qty: {item.quantity} × ${item.price}</span>
                  </div>
                </div>
                <span className="font-bold text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Totals Recap */}
        {order && (
          <div className="border-t border-stone-200 pt-4 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({order.discountCode || "Promo"})</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-stone-900">
                {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-semibold text-stone-900">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline text-base font-black text-stone-900 pt-3 border-t border-stone-200">
              <span>Total Paid</span>
              <span className="text-xl text-emerald-700">${order.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Help Banner */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-950">Want WhatsApp Status Alerts?</h4>
            <p className="text-emerald-800">Tap below to ping us with your Order ID for direct WhatsApp updates.</p>
          </div>
        </div>
        <a
          href={`https://wa.me/?text=Hi%20Lumina!%20My%20order%20is%20${encodeURIComponent(orderId)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold whitespace-nowrap transition-colors"
        >
          WhatsApp Us
        </a>
      </div>

      {/* Continue shopping button */}
      <div className="text-center pt-2">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-md"
        >
          <span>Continue Exploring Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
