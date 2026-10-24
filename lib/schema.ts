// schema.org structured data. Google reads this to show each branch in Maps,
// local results and rich snippets (hours, rating, prices, FAQs, articles).

import { site, services, allItems, type Service, type Branch } from "./site";
import type { GoogleReviews } from "./reviews";
import type { Post } from "./content";

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.brand,
    alternateName: [site.name, site.googleName],
    url: site.url,
    logo: `${site.url}/logo.webp`,
    email: site.email,
    foundingDate: String(site.since),
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
    subOrganization: site.branches.map((b) => ({ "@id": `${site.url}/#${b.id}` })),
  };
}

export function branchSchema(b: Branch, reviews: GoogleReviews | null) {
  return {
    "@context": "https://schema.org",
    "@type": ["HairSalon", "BeautySalon"],
    "@id": `${site.url}/#${b.id}`,
    name: `${site.brand} - ${b.name.replace(/ Branch$/, "")}`,
    description: site.description,
    url: site.url,
    telephone: b.phone,
    email: site.email,
    image: `${site.url}${site.heroPhoto}`,
    logo: `${site.url}/logo.webp`,
    priceRange: "₹₹",
    parentOrganization: { "@id": orgId },
    address: {
      "@type": "PostalAddress",
      streetAddress: b.street,
      addressLocality: `${b.locality}, ${b.city}`,
      addressRegion: b.region,
      postalCode: b.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    hasMap: b.mapsUrl,
    areaServed: site.areas.map((name) => ({ "@type": "Place", name: `${name}, Hyderabad` })),
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    ...(reviews?.live && reviews.count > 0
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: reviews.rating, reviewCount: reviews.count } }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Salon services",
      itemListElement: services.map((s) => ({ "@type": "OfferCatalog", name: s.name, url: `${site.url}/services/${s.slug}` })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/book` },
      result: { "@type": "Reservation", name: "Salon appointment" },
    },
  };
}

// Home page: the business and both branches as one connected graph.
export function homeGraphSchema(reviews: GoogleReviews | null) {
  const strip = ({ "@context": _, ...node }: Record<string, unknown>) => node;
  return {
    "@context": "https://schema.org",
    "@graph": [strip(organizationSchema()), ...site.branches.map((b) => strip(branchSchema(b, reviews)))],
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.intro,
    url: `${site.url}/services/${s.slug}`,
    provider: site.branches.map((b) => ({ "@id": `${site.url}/#${b.id}` })),
    areaServed: site.areas.map((name) => `${name}, Hyderabad`),
    offers: allItems(s).map((i) => ({
      "@type": "Offer",
      name: i.name,
      price: i.price.replace(/[^\d]/g, ""),
      priceCurrency: "INR",
    })),
  };
}

export function articleSchema(p: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    keywords: p.keywords.join(", "),
    url: `${site.url}/trends/${p.slug}`,
    mainEntityOfPage: `${site.url}/trends/${p.slug}`,
    image: p.image ? `${site.url}${p.image}` : `${site.url}/opengraph-image`,
    author: { "@type": "Organization", name: site.brand, url: site.url },
    publisher: { "@id": orgId },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}
