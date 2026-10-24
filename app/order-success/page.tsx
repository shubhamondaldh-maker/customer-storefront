import { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccessClient";

export const metadata = {
  title: "Order Confirmed | LUMINA Workspace Store",
  description: "Thank you for your order! Your workspace essentials are being prepared for dispatch.",
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessSkeleton />}>
      <OrderSuccessClient />
    </Suspense>
  );
}

function OrderSuccessSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 animate-pulse space-y-6">
      <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto" />
      <div className="h-8 bg-stone-200 rounded w-1/2 mx-auto" />
      <div className="h-64 bg-stone-200 rounded-3xl" />
    </div>
  );
}
