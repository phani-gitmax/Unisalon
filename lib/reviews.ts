// Live Google reviews from your Google Business Profile, via the Google Places API.
// Needs GOOGLE_PLACES_API_KEY (env var) and site.google.placeId. Refreshed once a day.

import { site } from "./site";

export type GoogleReview = { author: string; authorUrl?: string; photo?: string; rating: number; text: string; when?: string };
export type GoogleReviews = { rating: number; count: number; reviews: GoogleReview[]; live: boolean };

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating: number;
    text?: { text: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName: string; uri?: string; photoUri?: string };
  }[];
};

export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = site.google.placeId;

  if (key && placeId) {
    try {
      const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
        headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews" },
        next: { revalidate: 86400 },
      });
      if (res.ok) {
        const data = (await res.json()) as PlacesResponse;
        return {
          rating: data.rating ?? 0,
          count: data.userRatingCount ?? 0,
          live: true,
          reviews: (data.reviews ?? [])
            .filter((r) => r.rating >= 4 && r.text?.text)
            .map((r) => ({
              author: r.authorAttribution?.displayName ?? "Google user",
              authorUrl: r.authorAttribution?.uri,
              photo: r.authorAttribution?.photoUri,
              rating: r.rating,
              text: r.text!.text,
              when: r.relativePublishTimeDescription,
            })),
        };
      }
      console.error("Google Places API error", res.status, await res.text());
    } catch (err) {
      console.error("Google Places API request failed", err);
    }
  }

  if (site.fallbackReviews.length === 0) return null;
  return { rating: 0, count: 0, live: false, reviews: site.fallbackReviews };
}

export function writeReviewUrl() {
  return site.google.placeId
    ? `https://search.google.com/local/writereview?placeid=${site.google.placeId}`
    : site.google.mapsUrl;
}
