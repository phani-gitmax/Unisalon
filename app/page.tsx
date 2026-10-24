import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, services, branchAddress } from "@/lib/site";
import { hoursText, fromPrice } from "@/lib/format";
import { homeGraphSchema } from "@/lib/schema";
import { SITE_TITLE } from "@/lib/seo";
import { getGoogleReviews } from "@/lib/reviews";
import { getOffer, getPosts } from "@/lib/content";
import { Reviews } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { TrackedLink } from "@/components/Analytics";
import { Callback, Subscribe } from "@/components/LeadForms";
import { PostCard } from "@/components/PostCard";
import { BranchPicker } from "@/components/BranchPicker";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: site.description,
  alternates: { canonical: "/" },
};

export default async function Home() {
  const reviews = await getGoogleReviews();
  const offer = getOffer();
  const posts = getPosts().slice(0, 3);
  const years = new Date().getFullYear() - site.since;

  return (
    <main>
      <JsonLd data={homeGraphSchema(reviews)} />

      {/* Hero */}
      <section className="hero">
        <Image src={site.heroPhoto} alt="Stylist brushing a client's long black hair at Unisalon" fill priority sizes="100vw" quality={60} className="hero-img" />
        <div className="wrap hero-inner">
          <div className="hero-card glass-strong">
            {/* The H1 carries the search keywords; the big tagline below is display text only. */}
            <h1 className="eyebrow hero-h1">Premium Unisex Hair Salon &amp; Spa in Manikonda, Hyderabad</h1>
            <p className="hero-display">
              Your vibe.
              <br />
              <em>Your style.</em>
            </p>
            <p className="hero-sub">
              Expert cuts, colour, spa and beauty for men, women and kids — at two salons in Alkapur Township, open every day.
            </p>
            <div className="hero-actions">
              <Link href="/book" className="btn btn-dark" prefetch={false}>Book an appointment</Link>
              <a href="#callback" className="link-arrow">Or get a call back →</a>
            </div>
            <ul className="hero-facts">
              <li><span className="stars" aria-hidden="true">★★★★★</span> {reviews.count}+ Google reviews</li>
              <li>Since {site.since}</li>
              <li>{hoursText[0].time}, {hoursText[0].days.toLowerCase()}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* One-tap quick booking */}
      <section className="quick">
        <div className="wrap quick-inner">
          <p>What would you like today?</p>
          <div className="chips">
            {services.map((s) => (
              <Link key={s.slug} href={`/book?service=${s.slug}`} className="chip" prefetch={false}>
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call-back lead box */}
      <section id="callback" className="section-tight callback-sec">
        <div className="wrap">
          <div className="callback glass">
            <div>
              <p className="eyebrow">Short on time?</p>
              <h2>We&apos;ll call you back</h2>
              <p className="muted small">Leave your number — we&apos;ll help you pick a service and a time that suits you.</p>
            </div>
            <Callback />
          </div>
        </div>
      </section>

      {offer && (
        <section className="offer">
          <div className="wrap offer-inner">
            <p>
              <span className="eyebrow">This month</span> {offer.title}. <span className="muted">{offer.text}</span>
            </p>
            <Link href="/book" className="link-arrow" prefetch={false}>{offer.cta} →</Link>
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
                  <Image src={s.photo} alt={s.name} fill sizes="(max-width: 760px) 50vw, 25vw" quality={60} />
                </div>
                <h3>{s.name}</h3>
                <p>From {fromPrice(s)}</p>
              </Link>
            ))}
            <Link href="/book" className="svc svc-cta glass" prefetch={false}>
              <span className="eyebrow">Ready?</span>
              <h3>Book in under a minute</h3>
              <p>Pick a service, branch and time — we confirm on WhatsApp.</p>
              <span className="link-arrow">Book now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest trends */}
      {posts.length > 0 && (
        <section className="section trends-sec">
          <div className="wrap">
            <div className="head-row">
              <div>
                <p className="eyebrow">Beauty trends</p>
                <h2>What&apos;s new this season</h2>
              </div>
              <Link href="/trends" className="link-arrow">All trends →</Link>
            </div>
            <div className="post-grid">
              {posts.map((p) => (
                <PostCard post={p} key={p.slug} />
              ))}
            </div>
            <Subscribe />
          </div>
        </section>
      )}

      {/* Story teaser */}
      <section className="section split">
        <div className="wrap split-grid">
          <div className="split-img">
            <Image src={site.gallery[0]} alt="Smiling client getting a haircut at the salon" fill sizes="(max-width: 900px) 100vw, 50vw" quality={60} />
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
              <article className="branch glass" key={b.id}>
                <h3>{b.name.replace(" Branch", "")}</h3>
                <p className="muted">{branchAddress(b)}</p>
                <p>
                  <a href={`tel:${b.phone}`}>{b.phoneDisplay}</a>
                </p>
                <div className="branch-actions">
                  <Link href="/book" className="btn btn-dark btn-sm" prefetch={false}>Book here</Link>
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
            <Link href="/book" className="btn btn-dark" prefetch={false}>Book an appointment</Link>
            <BranchPicker action="whatsapp" className="btn btn-line">WhatsApp us</BranchPicker>
          </div>
        </div>
      </section>
    </main>
  );
}
