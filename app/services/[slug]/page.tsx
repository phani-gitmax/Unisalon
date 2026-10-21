import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, services, getService } from "@/lib/site";
import { fromPrice } from "@/lib/format";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  const description = `${s.intro} Prices from ${fromPrice(s.items)}. Book at ${site.name}, ${site.address.locality}, ${site.address.city}.`;
  return {
    title: s.seoTitle,
    description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.seoTitle} | ${site.name}`, description, url: `${site.url}/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const others = services.filter((o) => o.slug !== s.slug);
  const faqs = [
    ...s.faqs,
    { q: `How much does ${s.name.toLowerCase()} cost in Manikonda?`, a: `At ${site.name}, ${s.name.toLowerCase()} starts from ${fromPrice(s.items)}. See the full price list above.` },
    { q: `How do I book ${s.name.toLowerCase()} at ${site.name}?`, a: `Use the booking form on this page, message us on WhatsApp or call ${site.contact.phoneDisplay}. We confirm every booking.` },
  ];

  return (
    <main>
      <JsonLd data={serviceSchema(s)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Services", url: `${site.url}/#services` },
          { name: s.name, url: `${site.url}/services/${s.slug}` },
        ])}
      />

      <section className="service-hero">
        <div className="wrap hero-grid">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / <Link href="/#services">Services</Link> / <span>{s.name}</span>
            </nav>
            <p className="eyebrow">{s.for === "Unisex" ? "For men & women" : `For ${s.for.toLowerCase()}`}</p>
            <h1>{s.seoTitle}</h1>
            <p className="lead">{s.intro}</p>

            <div className="price-card wide">
              <h2>{s.name} prices</h2>
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

            <p className="small">
              Serving {site.areas.join(", ")} and nearby areas of Hyderabad.
            </p>
          </div>
          <div className="booking-card sticky" id="book">
            <h2>Book {s.name.toLowerCase()}</h2>
            <p className="small">Choose a time — we&apos;ll confirm on WhatsApp.</p>
            <BookingForm defaultService={s.items[0].name} />
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="wrap narrow">
          <h2 className="center">{s.name} — FAQs</h2>
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>More services at {site.name}</h2>
          <div className="service-grid">
            {others.map((o) => (
              <Link href={`/services/${o.slug}`} className="service-card" key={o.slug}>
                <span className="service-icon" aria-hidden="true">{o.icon}</span>
                <h3>{o.name}</h3>
                <span className="from">From {fromPrice(o.items)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
