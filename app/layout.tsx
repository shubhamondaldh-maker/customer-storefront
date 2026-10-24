import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export const metadata: Metadata = {
  title: {
    template: "%s | LUMINA Workspace Store",
    default: "LUMINA | Modern Workspace Tech & Ergonomic Essentials",
  },
  description: "Curated mechanical keyboards, ambient lighting, studio audio, and ergonomic desk accessories in rich mocha brown, platinum silver, and pale lavender accents.",
  keywords: ["workspace", "mechanical keyboards", "desk setup", "ergonomic mice", "monitor lightbar", "studio audio"],
  authors: [{ name: "LUMINA Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumina-storefront.example.com",
    siteName: "LUMINA Workspace Store",
    title: "LUMINA | Modern Workspace Tech & Ergonomic Essentials",
    description: "Curated mechanical keyboards, ambient lighting, studio audio, and ergonomic desk accessories.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "LUMINA Workspace Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMINA | Modern Workspace Tech & Ergonomic Essentials",
    description: "Curated mechanical keyboards, ambient lighting, and workspace gear.",
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-[#1c1412] text-[#e5e4e2] selection:bg-[#d8b4e2] selection:text-[#1c1412]">
        <Header />
        <CartDrawer />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}