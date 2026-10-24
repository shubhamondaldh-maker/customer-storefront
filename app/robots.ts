import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://lumina-storefront.example.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/order-success"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
