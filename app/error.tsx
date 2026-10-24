"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Storefront Application Error:", error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-18 h-18 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
          Something went wrong loading this page
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
          {error.message || "An unexpected error occurred while communicating with the storefront."}
        </p>
      </div>
      <div className="flex justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
