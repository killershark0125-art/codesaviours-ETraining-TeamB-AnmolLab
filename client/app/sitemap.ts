import type { MetadataRoute } from "next";

import { getPublicSiteUrl } from "@/lib/site-url";

const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tests", priority: 0.9, changeFrequency: "daily" },
  { path: "/packages", priority: 0.9, changeFrequency: "weekly" },
  { path: "/book", priority: 0.9, changeFrequency: "monthly" },
  { path: "/home-sampling", priority: 0.8, changeFrequency: "monthly" },
  { path: "/branches", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reports", priority: 0.7, changeFrequency: "monthly" },
  { path: "/doctors", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getPublicSiteUrl();

  // Do not publish localhost or a fabricated domain in the sitemap.
  if (!siteUrl) {
    return [];
  }

  return publicRoutes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}