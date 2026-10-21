import Link from "next/link";
import { site, services, fullAddress } from "@/lib/site";
import { hoursText, fromPrice } from "@/lib/format";
import { businessSchema, faqSchema } from "@/lib/schema";
import { getGoogleReviews } from "@/lib/reviews";
import { BookingForm } from "@/components/BookingForm";
import { Reviews } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { TrackedLink } from "@/components/Analytics";

const reasons = [
  { icon: "🧼", title: "Hygiene first", text: "Sterilised tools, fresh towels and disposable kits for every client." },
  { icon: "💇", title: "Trained stylists", text: "Experienced team who keep up with the latest cuts, colours and techniques." },
  { icon: "🏷️", title: "Clear pricing", text: "Prices listed upfront — no surprises at the counter." },
  { icon: "⏱️", title: "On-time slots", text: "Book ahead and get seated on time, even on busy weekends." },
];

export default async function Home() {
  const reviews = await getGoogleReviews();
  const { lat, lng } = site.address;

  return (
    <main>
      <JsonLd data={businessSchema(reviews)} />
      <JsonLd data={faqSchema(site.faqs)} />

      {/* Hero + booking */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Unisex salon · Manikonda, Hyderabad</p>
            <h1>Look sharp. Feel fresh. Right here in Manikonda.</h1>
            <p className="lead">
              Haircuts, colour, keratin, facials, nails and bridal makeup for men, women and kids — by stylists who
              listen. Book in 30 seconds and we&apos;ll confirm on WhatsApp.
            </p>
            <ul className="trust">
              <li>✓ Men · Women · Kids</li>
              <li>✓ Prices upfront</li>
              <li>✓ Walk-ins welcome</li>
            </ul>
            <div className="hero-actions">
              <TrackedLink
                event="click_whatsapp"
                className="btn btn-whatsapp"
                href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}! I'd like to book an appointment.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Chat on WhatsApp
              </TrackedLink>
              <TrackedLink event="click_call" className="btn btn-ghost" href={`tel:${site.contact.phone}`}>
                📞 {site.contact.phoneDisplay}
              </TrackedLink>
            </div>
          </div>
          <div className="booking-card" id="book">
            <h2>Book an appointment</h2>
            <p className="small">Pick a service and time — we&apos;ll confirm your slot.</p>
            <BookingForm compact />
          </div>
        </div>
      </section>

      {site.offer && (
        <section className="offer" aria-label="Current offer">
          <div className="wrap offer-inner">
            <p>
              <strong>🎉 {site.offer.title}</strong> <span>{site.offer.text}</span>
            </p>
            <Link href="/#book" className="btn btn-light">Claim offer</Link>
          </div>
        </section>
      )}

      {/* Services */}
      <section id="services">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Our services</p>
              <h2>Everything you need, under one roof</h2>
            </div>
            <p className="lead">Expert hair, skin and beauty services for the whole family in Manikonda.</p>
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <Link href={`/services/${s.slug}`} className="service-card" key={s.slug}>
                <span className="service-icon" aria-hidden="true">{s.icon}</span>
                <span className="tag">{s.for}</span>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <span className="from">From {fromPrice(s.items)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Prices */}
      <section id="prices" className="prices">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Price list</p>
              <h2>Honest prices, no surprises</h2>
            </div>
            <p className="lead">Final price may vary with hair length and products chosen — your stylist will confirm before starting.</p>
          </div>
          <div className="price-grid">
            {services.map((s) => (
              <div className="price-card" key={s.slug}>
                <h3>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </h3>
                <ul>
                  {s.items.map((i) => (
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

      {/* Why us */}
      <section className="why">
        <div className="wrap">
          <p className="eyebrow center">Why Unisalon</p>
          <h2 className="center">Your neighbourhood salon, done right</h2>
          <div className="why-grid">
            {reasons.map((r) => (
              <div className="why-item" key={r.title}>
                <span aria-hidden="true">{r.icon}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      {/* Team */}
      <section id="team">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Meet the team</p>
              <h2>Stylists who listen</h2>
            </div>
          </div>
          <div className="team-grid">
            {site.team.map((t, i) => (
              <div className="team-card" key={i}>
                <div className="team-photo" aria-hidden="true">{t.name.charAt(0)}</div>
                <h3>{t.name}</h3>
                <p>{t.role}</p>
                <span className="small">{t.years}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="wrap narrow">
          <p className="eyebrow center">FAQs</p>
          <h2 className="center">Good to know</h2>
          {site.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="visit">
        <div className="wrap visit-grid">
          <div>
            <p className="eyebrow">Visit us</p>
            <h2>Find us in Manikonda</h2>
            <p className="lead">
              Conveniently located for clients from {site.areas.slice(1, -1).join(", ")} and {site.areas[site.areas.length - 1]}.
            </p>
            <dl className="info">
              <dt>Address</dt>
              <dd>{fullAddress}</dd>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>
              </dd>
              <dt>Hours</dt>
              <dd>
                {hoursText.map((h) => (
                  <span key={h.days} className="hours-row">
                    <span>{h.days}</span> <span>{h.time}</span>
                  </span>
                ))}
              </dd>
            </dl>
            <div className="hero-actions">
              <TrackedLink event="click_directions" className="btn btn-primary" href={site.google.mapsUrl} target="_blank" rel="noopener noreferrer">
                📍 Get directions
              </TrackedLink>
              <Link className="btn btn-ghost" href="/#book">Book a slot</Link>
            </div>
          </div>
          <iframe
            className="map"
            title={`Map showing ${site.name}, Manikonda`}
            src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
