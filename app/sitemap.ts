import type { MetadataRoute } from "next";
import { site, services } from "@/lib/site";
import { getPosts, categories } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getPosts();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/prices`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/trends`, lastModified: posts[0] ? new Date(posts[0].date) : now, changeFrequency: "weekly", priority: 0.7 },
    ...Object.keys(categories)
      .filter((c) => posts.some((p) => p.category === c))
      .map((c) => ({ url: `${site.url}/trends/topic/${c}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.5 })),
    ...posts.map((p) => ({ url: `${site.url}/trends/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
