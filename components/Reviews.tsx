import { getGoogleReviews, writeReviewUrl } from "@/lib/reviews";
import { TrackedLink } from "./Analytics";
import { ScriptHeading } from "./ScriptHeading";

const stars = (n: number) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

export async function Reviews() {
  const data = await getGoogleReviews();

  return (
    <section id="reviews" className="reviews dark">
      <div className="wrap">
        <div className="section-head">
          <ScriptHeading script="Loved" title="By Manikonda families" sub="Google reviews" />
          <div className="rating-badge">
            <span className="g">G</span>
            <div>
              {data.live ? (
                <>
                  <strong>{data.rating.toFixed(1)}</strong> <span className="stars">{stars(data.rating)}</span>
                </>
              ) : (
                <span className="stars">★★★★★</span>
              )}
              <span className="small-light">{data.count} reviews on Google</span>
            </div>
          </div>
        </div>

        <div className="review-grid">
          {data.reviews.slice(0, 6).map((r, i) => (
            <figure className="review" key={i}>
              <div className="stars">{stars(r.rating)}</div>
              <blockquote>{r.text.length > 260 ? r.text.slice(0, 257) + "…" : r.text}</blockquote>
              <figcaption>
                {r.author}
                {r.when && <span> · {r.when}</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="review-actions">
          <TrackedLink event="click_write_review" className="btn btn-gold" href={writeReviewUrl()} target="_blank" rel="noopener noreferrer">
            ★ Write a Google review
          </TrackedLink>
          <a className="btn btn-outline-light" href="/#book">Book your visit</a>
        </div>
      </div>
    </section>
  );
}
