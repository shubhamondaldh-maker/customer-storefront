"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  AlertCircle,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  HelpCircle,
  Truck,
  Sparkles
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useHasMounted } from "@/hooks/useHasMounted";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const hasMounted = useHasMounted();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const getShippingFee = useCartStore((state) => state.getShippingFee);
  const getEstimatedTax = useCartStore((state) => state.getEstimatedTax);
  const getTotal = useCartStore((state) => state.getTotal);
  const discount = useCartStore((state) => state.discount);

  // Form State
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 234-5678",
    street: "742 Evergreen Terrace",
    apartment: "Apt 4B",
    city: "Springfield",
    state: "OR",
    postalCode: "97477",
    country: "United States",
    cardNumber: "4242 4242 4242 4242",
    cardExpiry: "12/28",
    cardCvc: "888",
    simulateFailure: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!hasMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse space-y-6">
        <div className="h-8 bg-stone-200 rounded w-1/4" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 h-96 bg-stone-200 rounded-2xl" />
          <div className="lg:col-span-5 h-96 bg-stone-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const shipping = getShippingFee();
  const tax = getEstimatedTax();
  const total = getTotal();

  // If cart is empty, redirect or prompt user
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-stone-900">Your Cart is Empty</h1>
        <p className="text-stone-500 text-sm">
          You cannot checkout without items. Please add some products to your cart first.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-stone-800"
        >
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const validateClientSide = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    const phoneClean = formData.phone.replace(/\D/g, "");
    if (!phoneClean || phoneClean.length < 8) {
      errs.phone = "Enter a valid phone number (at least 8 digits).";
    }

    if (!formData.street.trim()) {
      errs.street = "Street address is required.";
    }
    if (!formData.city.trim()) {
      errs.city = "City is required.";
    }
    if (!formData.state.trim()) {
      errs.state = "State / Province is required.";
    }
    if (!formData.postalCode.trim() || formData.postalCode.trim().length < 3) {
      errs.postalCode = "Valid postal code is required.";
    }

    const cardClean = formData.cardNumber.replace(/\s+/g, "");
    if (cardClean.length < 12) {
      errs.cardNumber = "Enter a valid 16-digit card number.";
    }

    if (!formData.cardExpiry.includes("/") || formData.cardExpiry.length < 4) {
      errs.cardExpiry = "MM/YY format required.";
    }

    if (formData.cardCvc.trim().length < 3) {
      errs.cardCvc = "3-4 digit CVC required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setServerError(null);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // 1. Client-side validation check
    const isValid = validateClientSide();
    if (!isValid) {
      setServerError("Please fix the highlighted validation errors below.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Submit to backend API with server-side validation & payment gateway simulation
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: {
              street: formData.apartment ? `${formData.street}, ${formData.apartment}` : formData.street,
              city: formData.city,
              state: formData.state,
              postalCode: formData.postalCode,
              country: formData.country,
            },
          },
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          discountCode: discount?.code,
          payment: {
            cardNumber: formData.cardNumber,
            cardExpiry: formData.cardExpiry,
            cardCvc: formData.cardCvc,
            simulateFailure: formData.simulateFailure,
            paymentMethod: "Visa ending in " + formData.cardNumber.slice(-4),
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Failed: display clear server error, keep cart intact so user can retry
        setServerError(data.error || "Payment authorization declined by issuing bank. Please retry.");
        setIsSubmitting(false);
        return;
      }

      // Success: Clear cart and redirect to order confirmation page
      clearCart();
      router.push(`/order-success?orderId=${encodeURIComponent(data.orderId)}`);
    } catch {
      setServerError("Network connection issue while communicating with payment server. Please retry.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-5">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping Cart</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      {/* Main Grid: Form Left, Order Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Server Error Alert Banner */}
            {serverError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-800 text-xs sm:text-sm animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block font-bold">Transaction Failed</strong>
                  <p>{serverError}</p>
                  <p className="text-xs text-rose-600 pt-1">
                    Your cart items have been saved. You can modify your information or click &quot;Place Order&quot; to retry.
                  </p>
                </div>
              </div>
            )}

            {/* Section 1: Customer Contact */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-black">
                  1
                </div>
                <h2 className="text-lg font-black text-stone-900 tracking-tight">Customer Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-700">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none text-stone-900 ${
                      errors.name ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                    }`}
                    placeholder="e.g. Alex Johnson"
                  />
                  {errors.name && <p className="text-rose-600 text-[11px] font-medium">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Email Address (Order Confirmation) *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none text-stone-900 ${
                      errors.email ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                    }`}
                    placeholder="alex@example.com"
                  />
                  {errors.email && <p className="text-rose-600 text-[11px] font-medium">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none text-stone-900 ${
                      errors.phone ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                    }`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && <p className="text-rose-600 text-[11px] font-medium">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Shipping Address */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-black">
                  2
                </div>
                <h2 className="text-lg font-black text-stone-900 tracking-tight">Shipping Destination</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-700">Street Address *</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleInputChange("street", e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none text-stone-900 ${
                      errors.street ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                    }`}
                    placeholder="123 Workspace Way"
                  />
                  {errors.street && <p className="text-rose-600 text-[11px] font-medium">{errors.street}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Apt, Suite, Unit (Optional)</label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={(e) => handleInputChange("apartment", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-stone-900 text-stone-900"
                    placeholder="Suite 400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none text-stone-900 ${
                      errors.city ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                    }`}
                    placeholder="San Francisco"
                  />
                  {errors.city && <p className="text-rose-600 text-[11px] font-medium">{errors.city}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">State / Region *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none text-stone-900 ${
                      errors.state ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                    }`}
                    placeholder="California"
                  />
                  {errors.state && <p className="text-rose-600 text-[11px] font-medium">{errors.state}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Postal / ZIP Code *</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none text-stone-900 ${
                      errors.postalCode ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                    }`}
                    placeholder="94107"
                  />
                  {errors.postalCode && <p className="text-rose-600 text-[11px] font-medium">{errors.postalCode}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Payment Step (Simulated Gateway) */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-black">
                    3
                  </div>
                  <h2 className="text-lg font-black text-stone-900 tracking-tight">Payment Method</h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <CreditCard className="w-4 h-4" />
                  <span>Sandbox Gateway</span>
                </div>
              </div>

              {/* Card Form */}
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Card Number *</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none font-mono text-stone-900 ${
                        errors.cardNumber ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                      }`}
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  {errors.cardNumber && <p className="text-rose-600 text-[11px] font-medium">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Expiry (MM/YY) *</label>
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none font-mono text-stone-900 ${
                        errors.cardExpiry ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                      }`}
                      placeholder="12/28"
                    />
                    {errors.cardExpiry && <p className="text-rose-600 text-[11px] font-medium">{errors.cardExpiry}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">CVC / Security Code *</label>
                    <input
                      type="text"
                      value={formData.cardCvc}
                      onChange={(e) => handleInputChange("cardCvc", e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl outline-none font-mono text-stone-900 ${
                        errors.cardCvc ? "border-rose-500 bg-rose-50/30" : "border-stone-300 focus:border-stone-900"
                      }`}
                      placeholder="888"
                    />
                    {errors.cardCvc && <p className="text-rose-600 text-[11px] font-medium">{errors.cardCvc}</p>}
                  </div>
                </div>

                {/* Simulated Decline Toggle for Testing Requirements */}
                <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.simulateFailure}
                      onChange={(e) => handleInputChange("simulateFailure", e.target.checked)}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-stone-900 text-xs block">
                        Simulate Payment Decline (Challenge Requirement)
                      </span>
                      <span className="text-[11px] text-stone-600">
                        Check this box (or enter a card number ending in <strong>0000</strong>) to test how our checkout catches bank errors, retains the user&apos;s cart, and allows retry without losing items.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white rounded-2xl font-bold text-sm shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authorizing Payment via Bank Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize & Place Order • ${total.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <h3 className="font-black text-stone-900 text-base tracking-tight">Order Summary</h3>
            <span className="text-xs font-bold text-stone-500">{items.length} items</span>
          </div>

          {/* Items mini list */}
          <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <div className="relative w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                  <span className="absolute bottom-0 right-0 bg-stone-900 text-white text-[9px] font-bold px-1 rounded-tl">
                    x{item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 truncate">{item.name}</p>
                  <p className="text-stone-400 text-[11px]">${item.price} each</p>
                </div>
                <div className="text-right font-bold text-stone-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="space-y-2.5 text-xs text-stone-600 border-t border-stone-200 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({discount?.code})</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span className="font-semibold text-stone-900">
                {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-semibold text-stone-900">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-baseline text-lg font-black text-stone-900 pt-3 border-t border-stone-200">
              <span>Total Due</span>
              <span className="text-2xl">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-2 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Ships within 24 hours from California warehouse</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>30-Day Money Back Guarantee included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
