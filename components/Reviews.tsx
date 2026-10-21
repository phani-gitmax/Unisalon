import { getGoogleReviews, writeReviewUrl } from "@/lib/reviews";
import { TrackedLink } from "./Analytics";

const stars = (n: number) => "★★★★★".slice(0, Math.round(n)) + "☆☆☆☆☆".slice(0, 5 - Math.round(n));

export async function Reviews() {
  const data = await getGoogleReviews();

  return (
    <section id="reviews" className="reviews">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Google reviews</p>
            <h2>Loved by Manikonda</h2>
          </div>
          {data?.live && data.count > 0 && (
            <div className="rating-badge" aria-label={`Rated ${data.rating} out of 5 from ${data.count} Google reviews`}>
              <strong>{data.rating.toFixed(1)}</strong>
              <span className="stars">{stars(data.rating)}</span>
              <span>{data.count} reviews on Google</span>
            </div>
          )}
        </div>

        {data && data.reviews.length > 0 ? (
          <div className="review-grid">
            {data.reviews.slice(0, 6).map((r, i) => (
              <figure className="review" key={i}>
                <div className="stars">{stars(r.rating)}</div>
                <blockquote>{r.text.length > 280 ? r.text.slice(0, 277) + "…" : r.text}</blockquote>
                <figcaption>
                  {r.author}
                  {r.when && <span> · {r.when}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="review-empty">
            <p>Visited us recently? Your review helps neighbours find a salon they can trust.</p>
          </div>
        )}

        <div className="review-actions">
          <TrackedLink event="click_write_review" className="btn btn-primary" href={writeReviewUrl()} target="_blank" rel="noopener noreferrer">
            ★ Write a Google review
          </TrackedLink>
          <a className="btn btn-ghost" href="/#book">Book your visit</a>
        </div>
      </div>
    </section>
  );
}
