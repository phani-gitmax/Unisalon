// schema.org structured data. Google reads this to show the salon in Maps,
// local results and rich snippets (hours, rating, prices, FAQs).

import { site, services, type Service } from "./site";
import type { GoogleReviews } from "./reviews";

const dayMap: Record<string, string> = {
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
  Sunday: "https://schema.org/Sunday",
};

export function businessSchema(reviews: GoogleReviews | null) {
  const { address: a } = site;
  return {
    "@context": "https://schema.org",
    "@type": ["HairSalon", "BeautySalon"],
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    image: `${site.url}/opengraph-image`,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: a.lat, longitude: a.lng },
    hasMap: site.google.mapsUrl,
    areaServed: site.areas.map((name) => ({ "@type": "Place", name: `${name}, Hyderabad` })),
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => dayMap[d]),
      opens: h.open,
      closes: h.close,
    })),
    sameAs: [site.social.instagram, site.social.facebook, site.google.mapsUrl].filter(Boolean),
    ...(reviews && reviews.count > 0
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: reviews.rating, reviewCount: reviews.count } }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Salon services",
      itemListElement: services.map((s) => ({
        "@type": "OfferCatalog",
        name: s.name,
        url: `${site.url}/services/${s.slug}`,
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/#book`, actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] },
      result: { "@type": "Reservation", name: "Salon appointment" },
    },
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
    provider: { "@id": `${site.url}/#business` },
    areaServed: site.areas.map((name) => `${name}, Hyderabad`),
    offers: s.items.map((i) => ({
      "@type": "Offer",
      name: i.name,
      price: i.price.replace(/[^\d.]/g, ""),
      priceCurrency: "INR",
    })),
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
