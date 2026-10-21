import Link from "next/link";
import { site, services, allItems, branchAddress } from "@/lib/site";
import { hoursText, fromPrice } from "@/lib/format";
import { organizationSchema, branchSchema, faqSchema } from "@/lib/schema";
import { getGoogleReviews } from "@/lib/reviews";
import { getOffer, getPosts, formatDate } from "@/lib/content";
import { BookingForm } from "@/components/BookingForm";
import { Reviews } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { TrackedLink } from "@/components/Analytics";
import { ScriptHeading } from "@/components/ScriptHeading";

// The four signature tiles from the original theme, now linking to real service pages.
const tiles = [
  { script: "Trendy", title: "Hairstyle", sub: "Inspirations", href: "/services/haircut-in-manikonda" },
  { script: "Pro", title: "Colour", sub: "Specialists", href: "/services/hair-colour-in-manikonda" },
  { script: "Perfect", title: "Beauty", sub: "Experience", href: "/services/facial-in-manikonda" },
  { script: "Serene", title: "Spa", sub: "Journey", href: "/services/hair-spa-in-manikonda" },
];

export default async function Home() {
  const reviews = await getGoogleReviews();
  const offer = getOffer();
  const posts = getPosts().slice(0, 3);
  const years = new Date().getFullYear() - site.since;

  return (
    <main>
      <JsonLd data={organizationSchema()} />
      {site.branches.map((b) => (
        <JsonLd key={b.id} data={branchSchema(b, reviews)} />
      ))}
      <JsonLd data={faqSchema(site.faqs)} />

      {/* Hero + booking */}
      <section className="hero dark">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker">Unisex salon · Alkapur Township, Manikonda</p>
            <h1>
              <span className="script hero-script" aria-hidden="true">Your Vibe</span>
              Your style, <br />done right.
            </h1>
            <p className="lead">
              Haircuts, styling, L&apos;Oréal hair spa, colour, skin and bridal makeovers for men, women and kids.
              {" "}{years}+ years of experience, two branches, open every day.
            </p>
            <ul className="trust">
              <li><strong>{years}+</strong> years</li>
              <li><strong>2</strong> branches</li>
              <li><strong>{reviews.count}+</strong> Google reviews</li>
              <li><strong>9–9</strong> all days</li>
            </ul>
            <div className="hero-actions">
              <TrackedLink
                event="click_whatsapp"
                className="btn btn-whatsapp"
                href={`https://wa.me/${site.branches[0].whatsapp}?text=${encodeURIComponent(`Hi ${site.name}! I'd like to book an appointment.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp us
              </TrackedLink>
              <Link href="/#prices" className="btn btn-outline-light">View prices</Link>
            </div>
          </div>
          <div className="booking-card" id="book">
            <h2>Book an appointment</h2>
            <p className="small">Pick a branch, service and time — we&apos;ll confirm on WhatsApp.</p>
            <BookingForm compact />
          </div>
        </div>
      </section>

      <section className="tiles" aria-label="Our specialities">
        {tiles.map((t, i) => (
          <Link key={t.title} href={t.href} className={`tile ${i % 2 ? "tile-dark" : ""}`}>
            <ScriptHeading script={t.script} title={t.title} sub={t.sub} as="h3" align="center" />
          </Link>
        ))}
      </section>

      {offer && (
        <section className="offer" aria-label="This month's offer">
          <div className="wrap offer-inner">
            <p>
              <span className="offer-tag">Offer of the month</span>
              <strong>{offer.title}</strong> <span>{offer.text}</span>
            </p>
            <Link href="/#book" className="btn btn-dark">{offer.cta}</Link>
          </div>
        </section>
      )}

      {/* Services */}
      <section id="services">
        <div className="wrap">
          <div className="section-head">
            <ScriptHeading script="Make it" title="Our services" sub="Hair · Colour · Beauty · Spa" />
            <p className="lead">Everything for men, women and kids — under one roof, at two branches in Alkapur Township.</p>
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <Link href={`/services/${s.slug}`} className="service-card" key={s.slug}>
                <span className="script small-script" aria-hidden="true">{s.script}</span>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <span className="from">From {fromPrice(s)} →</span>
              </Link>
            ))}
            <TrackedLink
              event="click_whatsapp"
              className="service-card ask"
              href={`https://wa.me/${site.branches[0].whatsapp}?text=${encodeURIComponent(`Hi ${site.name}! Can you help me choose a service?`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="script small-script" aria-hidden="true">Unsure?</span>
              <h3>Ask a stylist</h3>
              <p>Tell us your hair or skin concern on WhatsApp and we&apos;ll suggest the right service.</p>
              <span className="from">Chat now →</span>
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Prices */}
      <section id="prices" className="prices">
        <div className="wrap">
          <div className="section-head">
            <ScriptHeading script="Honest" title="Price list" sub="No surprises at the counter" />
            <p className="lead">Prices may vary with hair length and products chosen — your stylist confirms before starting.</p>
          </div>
          <div className="price-grid">
            {services.map((s) => (
              <div className="price-card" key={s.slug}>
                <h3>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </h3>
                <ul>
                  {allItems(s).map((i) => (
                    <li key={i.name}>
                      <span>{i.name}</span>
                      <span className="dots" />
                      <strong>{i.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="story dark">
        <div className="wrap story-grid">
          <ScriptHeading script={`Since ${site.since}`} title="The Shashi story" sub="From Mumbai to Manikonda" />
          <ol className="timeline">
            {site.story.map((s) => (
              <li key={s.year}>
                <span className="year">{s.year}</span>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Membership */}
      <section id="membership">
        <div className="wrap">
          <ScriptHeading script="Premium" title="Membership packages" sub="Prepay and save on every visit" align="center" />
          <div className="member-grid">
            {site.memberships.map((m, i) => (
              <div className={`member-card ${i === 1 ? "featured" : ""}`} key={m.name}>
                <p className="kicker">{m.name}</p>
                <p className="member-price">{m.price}</p>
                <p className="small">{m.note}</p>
                <TrackedLink
                  event="click_membership"
                  className={`btn ${i === 1 ? "btn-gold" : "btn-outline"} btn-block`}
                  href={`https://wa.me/${site.branches[0].whatsapp}?text=${encodeURIComponent(`Hi ${site.name}! Please share details of the ${m.name} membership (${m.price}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask for details
                </TrackedLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      {/* Team */}
      <section id="team">
        <div className="wrap">
          <ScriptHeading script="Meet" title="The team" sub="Stylists who listen" />
          <div className="team-grid">
            {site.team.map((t, i) => (
              <div className="team-card" key={i}>
                <div className="team-photo" aria-hidden="true">{t.name.charAt(0)}</div>
                <h3>{t.name}</h3>
                <p>{t.role}</p>
                {t.years && <span className="small">{t.years}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="blog-teaser">
          <div className="wrap">
            <div className="section-head">
              <ScriptHeading script="Tips" title="Hair & beauty journal" sub="From our stylists" />
              <Link href="/blog" className="btn btn-outline">All articles</Link>
            </div>
            <div className="post-grid">
              {posts.map((p) => (
                <Link href={`/blog/${p.slug}`} className="post-card" key={p.slug}>
                  <span className="small">{formatDate(p.date)} · {p.readingMinutes} min read</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span className="from">Read more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="faq">
        <div className="wrap narrow">
          <ScriptHeading script="Good" title="To know" sub="FAQs" align="center" />
          {site.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Branches */}
      <section id="branches" className="branches">
        <div className="wrap">
          <ScriptHeading script="Visit" title="Our branches" sub={`Alkapur Township, Manikonda · ${hoursText[0].days}, ${hoursText[0].time}`} align="center" />
          <div className="branch-grid">
            {site.branches.map((b) => (
              <article className="branch" key={b.id}>
                <iframe
                  className="map"
                  title={`Map of ${site.name} ${b.name}`}
                  src={`https://maps.google.com/maps?q=${b.lat},${b.lng}&z=16&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="branch-body">
                  <h3>{b.name}</h3>
                  <p>{branchAddress(b)}</p>
                  <p>
                    <a href={`tel:${b.phone}`}>{b.phoneDisplay}</a> · <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                  <div className="hero-actions">
                    <TrackedLink event="click_directions" className="btn btn-dark" href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                      📍 Directions
                    </TrackedLink>
                    <TrackedLink event="click_call" className="btn btn-outline" href={`tel:${b.phone}`}>
                      📞 Call
                    </TrackedLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="center small areas">
            Clients visit us from {site.areas.slice(2).join(", ")} and across west Hyderabad.
          </p>
        </div>
      </section>
    </main>
  );
}
