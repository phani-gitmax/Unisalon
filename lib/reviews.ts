// Live Google reviews from your Google Business Profiles, via the Google Places API.
// Needs GOOGLE_PLACES_API_KEY (env var) and each branch's placeId in lib/site.ts.
// Refreshed automatically once a day.

import { site } from "./site";

export type GoogleReview = { author: string; rating: number; text: string; when?: string; branch?: string };
export type GoogleReviews = { rating: number; count: number; reviews: GoogleReview[]; live: boolean };

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating: number;
    text?: { text: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName: string };
  }[];
};

async function fetchPlace(placeId: string, key: string): Promise<PlacesResponse | null> {
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews" },
      next: { revalidate: 86400 },
    });
    if (res.ok) return (await res.json()) as PlacesResponse;
    console.error("Google Places API error", res.status, await res.text());
  } catch (err) {
    console.error("Google Places API request failed", err);
  }
  return null;
}

export async function getGoogleReviews(): Promise<GoogleReviews> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const branches = site.branches.filter((b) => b.placeId);

  if (key && branches.length > 0) {
    const results = await Promise.all(branches.map((b) => fetchPlace(b.placeId, key)));
    let count = 0;
    let weighted = 0;
    const reviews: GoogleReview[] = [];
    results.forEach((data, i) => {
      if (!data) return;
      count += data.userRatingCount ?? 0;
      weighted += (data.rating ?? 0) * (data.userRatingCount ?? 0);
      for (const r of data.reviews ?? []) {
        if (r.rating >= 4 && r.text?.text) {
          reviews.push({
            author: r.authorAttribution?.displayName ?? "Google user",
            rating: r.rating,
            text: r.text.text,
            when: r.relativePublishTimeDescription,
            branch: branches[i].name,
          });
        }
      }
    });
    if (count > 0) return { rating: Math.round((weighted / count) * 10) / 10, count, reviews, live: true };
  }

  return { rating: 0, count: site.fallbackReviewCount, reviews: site.fallbackReviews, live: false };
}

export function writeReviewUrl(placeId = site.branches[0].placeId) {
  return placeId ? `https://search.google.com/local/writereview?placeid=${placeId}` : site.branches[0].mapsUrl;
}
