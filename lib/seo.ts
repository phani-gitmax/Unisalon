// Shared page metadata: canonical URL, Open Graph and Twitter card for every page.
// Next.js replaces (not merges) `openGraph` and `twitter` when a page sets them, so each page
// builds the full set here — otherwise pages would inherit the home page's og:url.

import type { Metadata } from "next";
import { site } from "./site";

export const SITE_TITLE = `${site.brand} | Best Unisex Salon in Manikonda, Hyderabad`;
export const TITLE_SUFFIX = ` | ${site.brand}`;

// Share banner in /public (1200×630) used when a page has no photo of its own.
export const OG_BANNER = {
  url: "/og-banner.jpg",
  width: 1200,
  height: 630,
  alt: `${site.brand} – unisex salon in Alkapur Township, Manikonda, Hyderabad`,
};

type Image = { url: string; width?: number; height?: number; alt?: string };

export function pageMetadata({
  title,
  description,
  path,
  image = OG_BANNER,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: Image;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  // Keep the full <title> within ~65 characters: drop the brand suffix on long titles.
  const fullTitle = title.length + TITLE_SUFFIX.length > 65 ? title : title + TITLE_SUFFIX;
  const images = [{ alt: title, ...image }];
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.brand,
      locale: "en_IN",
      title: fullTitle,
      description,
      images,
      ...(publishedTime && { publishedTime }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}
