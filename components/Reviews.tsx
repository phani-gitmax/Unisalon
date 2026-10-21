import { getGoogleReviews, writeReviewUrl } from "@/lib/reviews";
import { TrackedLink } from "./Analytics";

export async function Reviews() {
  const data = await getGoogleReviews();

  return (
    <section id="reviews" className="reviews">
      <div className="wrap">
        <div className="head-row">
          <div>
            <p className="eyebrow">Google reviews</p>
            <h2>Kind words from our clients</h2>
          </div>
          <p className="rating">
            {data.live ? <strong>{data.rating.toFixed(1)}</strong> : null}
            <span className="stars" aria-hidden="true">★★★★★</span>
            <span>{data.count} reviews on Google</span>
          </p>
        </div>
        <div className="review-row">
          {data.reviews.slice(0, 3).map((r, i) => (
            <figure className="review" key={i}>
              <blockquote>&ldquo;{r.text.length > 220 ? r.text.slice(0, 217) + "…" : r.text}&rdquo;</blockquote>
              <figcaption>— {r.author}</figcaption>
            </figure>
          ))}
        </div>
        <TrackedLink event="click_write_review" className="link-arrow" href={writeReviewUrl()} target="_blank" rel="noopener noreferrer">
          Leave us a review on Google →
        </TrackedLink>
      </div>
    </section>
  );
}
