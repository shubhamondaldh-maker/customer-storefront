"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isChunkError =
    error.message?.includes("Failed to load chunk") ||
    error.message?.includes("Loading chunk") ||
    error.name === "ChunkLoadError";

  useEffect(() => {
    console.error("Storefront Application Error:", error);
    // If chunk hashes changed due to rebuild or deployment, automatically reload page to fetch fresh bundle
    if (isChunkError) {
      const hasReloaded = sessionStorage.getItem("chunk_reload");
      if (!hasReloaded) {
        sessionStorage.setItem("chunk_reload", "true");
        window.location.reload();
      }
    }
  }, [error, isChunkError]);

  const handleAction = () => {
    if (isChunkError) {
      sessionStorage.removeItem("chunk_reload");
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-18 h-18 bg-rose-950/60 border border-rose-800 text-rose-400 rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#f5f5f7]">
          {isChunkError ? "New Storefront Version Available" : "Something went wrong loading this page"}
        </h1>
        <p className="text-[#b0afb2] text-xs sm:text-sm max-w-md mx-auto">
          {isChunkError
            ? "The storefront bundle was updated while your session was active. Please refresh to load the latest catalog."
            : error.message || "An unexpected error occurred while communicating with the storefront."}
        </p>
      </div>
      <div className="flex justify-center gap-3 pt-2">
        <button
          onClick={handleAction}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#d8b4e2] hover:bg-[#e0bfe8] text-[#20132b] rounded-xl text-xs font-black transition-colors cursor-pointer shadow-md"
        >
          {isChunkError ? <RefreshCw className="w-4 h-4 text-[#20132b]" /> : <RotateCcw className="w-4 h-4 text-[#20132b]" />}
          <span>{isChunkError ? "Refresh Page" : "Try Again"}</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#271c19] hover:bg-[#382723] text-[#f5f5f7] border border-[#48342e] rounded-xl text-xs font-bold transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
