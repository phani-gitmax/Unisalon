import Image from "next/image";
import Link from "next/link";
import { site, services, branchAddress } from "@/lib/site";
import { hoursText, fromPrice } from "@/lib/format";
import { organizationSchema, branchSchema } from "@/lib/schema";
import { getGoogleReviews } from "@/lib/reviews";
import { getOffer } from "@/lib/content";
import { Reviews } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { TrackedLink } from "@/components/Analytics";

export default async function Home() {
  const reviews = await getGoogleReviews();
  const offer = getOffer();
  const years = new Date().getFullYear() - site.since;

  return (
    <main>
      <JsonLd data={organizationSchema()} />
      {site.branches.map((b) => (
        <JsonLd key={b.id} data={branchSchema(b, reviews)} />
      ))}

      {/* Hero */}
      <section className="hero">
        <Image src={site.heroPhoto} alt="Inside a bright, modern Unisalon styling floor" fill priority sizes="100vw" className="hero-img" />
        <div className="wrap hero-inner">
          <p className="eyebrow">Unisex salon · Manikonda, Hyderabad</p>
          <h1>
            Your vibe.
            <br />
            <em>Your style.</em>
          </h1>
          <p className="hero-sub">
            Expert cuts, colour, spa and beauty for men, women and kids — at two salons in Alkapur Township, open every day.
          </p>
          <div className="hero-actions">
            <Link href="/book" className="btn btn-dark">Book an appointment</Link>
            <Link href="/prices" className="link-arrow">See prices →</Link>
          </div>
          <ul className="hero-facts">
            <li><span className="stars" aria-hidden="true">★★★★★</span> {reviews.count}+ Google reviews</li>
            <li>Since {site.since}</li>
            <li>{hoursText[0].time}, {hoursText[0].days.toLowerCase()}</li>
          </ul>
        </div>
      </section>

      {/* One-tap quick booking */}
      <section className="quick">
        <div className="wrap quick-inner">
          <p>What would you like today?</p>
          <div className="chips">
            {services.map((s) => (
              <Link key={s.slug} href={`/book?service=${s.slug}`} className="chip">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {offer && (
        <section className="offer">
          <div className="wrap offer-inner">
            <p>
              <span className="eyebrow">This month</span> {offer.title}. <span className="muted">{offer.text}</span>
            </p>
            <Link href="/book" className="link-arrow">{offer.cta} →</Link>
          </div>
        </section>
      )}

      {/* Services */}
      <section id="services" className="section">
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Everything you need, in one place</h2>
            </div>
            <Link href="/prices" className="link-arrow">Full price list →</Link>
          </div>
          <div className="svc-grid">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="svc">
                <div className="svc-img">
                  <Image src={s.photo} alt={s.name} fill sizes="(max-width: 760px) 80vw, 25vw" />
                </div>
                <h3>{s.name}</h3>
                <p>From {fromPrice(s)}</p>
              </Link>
            ))}
            <Link href="/book" className="svc svc-cta">
              <span className="eyebrow">Ready?</span>
              <h3>Book in under a minute</h3>
              <p>Pick a service, branch and time — we confirm on WhatsApp.</p>
              <span className="link-arrow">Book now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Story teaser */}
      <section className="section split">
        <div className="wrap split-grid">
          <div className="split-img">
            <Image src={site.gallery[0]} alt="Styling stations at the salon" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div>
            <p className="eyebrow">Since {site.since}</p>
            <h2>{years} years of craft, from Mumbai to Manikonda</h2>
            <p className="lead">
              Shashi began styling in Mumbai&apos;s best salons in {site.since}. Today his team brings the same care to
              families across Manikonda — honest advice, clean spaces and prices you can see upfront.
            </p>
            <Link href="/about" className="link-arrow">Our story &amp; memberships →</Link>
          </div>
        </div>
      </section>

      <Reviews />

      {/* Gallery */}
      <section className="gallery" aria-label="Gallery">
        {site.gallery.slice(1).map((g, i) => (
          <div className="g-item" key={g}>
            <Image src={g} alt={`Unisalon gallery photo ${i + 1}`} fill sizes="(max-width: 760px) 100vw, 33vw" />
          </div>
        ))}
      </section>

      {/* Visit */}
      <section id="visit" className="section">
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="eyebrow">Visit us</p>
              <h2>Two salons in Alkapur Township</h2>
            </div>
            <p className="muted">{hoursText[0].days}, {hoursText[0].time}</p>
          </div>
          <div className="branch-grid">
            {site.branches.map((b) => (
              <article className="branch" key={b.id}>
                <h3>{b.name.replace(" Branch", "")}</h3>
                <p className="muted">{branchAddress(b)}</p>
                <p>
                  <a href={`tel:${b.phone}`}>{b.phoneDisplay}</a>
                </p>
                <div className="branch-actions">
                  <Link href="/book" className="btn btn-dark btn-sm">Book here</Link>
                  <TrackedLink event="click_directions" className="link-arrow" href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                    Directions →
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap center">
          <h2>Ready for your next look?</h2>
          <p className="muted">Book online in under a minute, or message us on WhatsApp.</p>
          <div className="hero-actions center-row">
            <Link href="/book" className="btn btn-dark">Book an appointment</Link>
            <TrackedLink
              event="click_whatsapp"
              className="btn btn-line"
              href={`https://wa.me/${site.branches[0].whatsapp}?text=${encodeURIComponent(`Hi ${site.name}! I'd like to book an appointment.`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
