import { MetadataRoute } from "next";
import { getAllPostSummaries } from "@/lib/posts";
import { CATEGORIES, SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostSummaries();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE.url}/affiliate-disclosure`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE.url}/blog/category/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.updated ?? p.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
