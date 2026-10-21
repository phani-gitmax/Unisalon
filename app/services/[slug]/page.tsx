import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, services, getService } from "@/lib/site";
import { fromPrice } from "@/lib/format";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { getPosts } from "@/lib/content";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  const description = `${s.name} in Manikonda from ${fromPrice(s)}. ${s.short} 2 branches in Alkapur Township, open 9 AM–9 PM daily.`;
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
  const related = getPosts().filter((p) => p.service === s.slug).slice(0, 3);
  const faqs = [
    ...s.faqs,
    { q: `How much does ${s.name.toLowerCase()} cost in Manikonda?`, a: `At ${site.name}, ${s.name.toLowerCase()} starts from ${fromPrice(s)}. See the full price list on this page.` },
    { q: `Where can I get ${s.name.toLowerCase()} near Alkapur Township?`, a: `${site.brand} has two branches in Alkapur Township, Manikonda: ${site.branches.map((b) => b.name).join(" and ")}. Both are open every day, 9 AM to 9 PM.` },
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

      <section className="page-hero dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/#services">Services</Link> / <span>{s.name}</span>
          </nav>
          <span className="script hero-script" aria-hidden="true">{s.script}</span>
          <h1>{s.seoTitle}</h1>
          <p className="lead">{s.intro}</p>
        </div>
      </section>

      <section>
        <div className="wrap hero-grid">
          <div>
            {s.groups.map((g) => (
              <div className="price-card wide" key={g.title}>
                <h2>{g.title}</h2>
                <ul>
                  {g.items.map((i) => (
                    <li key={i.name}>
                      <span>{i.name}</span>
                      <span className="dots" />
                      <strong>{i.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="small">Available at both branches in Alkapur Township · Serving {site.areas.join(", ")}.</p>

            <div className="faq inline">
              <h2>{s.name} — FAQs</h2>
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>

            {related.length > 0 && (
              <div className="related">
                <h2>Read more</h2>
                <ul>
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="booking-card sticky" id="book">
            <h2>Book {s.name.toLowerCase()}</h2>
            <p className="small">Choose a branch and time — we&apos;ll confirm on WhatsApp.</p>
            <BookingForm defaultService={s.groups[0].items[0].name} />
          </div>
        </div>
      </section>

      <section className="prices">
        <div className="wrap">
          <h2>More at {site.name}</h2>
          <div className="service-grid">
            {others.map((o) => (
              <Link href={`/services/${o.slug}`} className="service-card" key={o.slug}>
                <span className="script small-script" aria-hidden="true">{o.script}</span>
                <h3>{o.name}</h3>
                <span className="from">From {fromPrice(o)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
