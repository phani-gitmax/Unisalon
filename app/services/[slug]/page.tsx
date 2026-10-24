import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, services, getService } from "@/lib/site";
import { fromPrice } from "@/lib/format";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { getPosts } from "@/lib/content";
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
    openGraph: { title: `${s.seoTitle} | ${site.name}`, description, url: `${site.url}/services/${s.slug}`, images: [s.photo] },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const others = services.filter((o) => o.slug !== s.slug).slice(0, 4);
  const related = getPosts().filter((p) => p.service === s.slug).slice(0, 3);
  const faqs = [
    ...s.faqs,
    { q: `How much does ${s.name.toLowerCase()} cost in Manikonda?`, a: `At ${site.name}, ${s.name.toLowerCase()} starts from ${fromPrice(s)}. See the full list of prices on this page.` },
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

      <section className="svc-hero">
        <div className="wrap svc-hero-grid">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / <Link href="/#services">Services</Link> / <span>{s.name}</span>
            </nav>
            <p className="eyebrow">{s.for === "Unisex" ? "For men & women" : `For ${s.for.toLowerCase()}`} · From {fromPrice(s)}</p>
            <h1>{s.seoTitle}</h1>
            <p className="lead">{s.intro}</p>
            <div className="hero-actions">
              <Link href={`/book?service=${s.slug}`} className="btn btn-dark" prefetch={false}>Book {s.name.toLowerCase()}</Link>
              <a href="#prices" className="link-arrow">See prices ↓</a>
            </div>
          </div>
          <div className="svc-hero-img">
            <Image src={s.photo} alt={s.name} fill priority sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <section id="prices" className="section-tight">
        <div className="wrap narrow">
          {s.groups.map((g) => (
            <div className="price-block" key={g.title}>
              <h2 className="price-group-h">{g.title}</h2>
              <ul className="price-list">
                {g.items.map((i) => (
                  <li key={i.name}>
                    <span>{i.name}</span>
                    <span className="dots" />
                    <span className="price">{i.price}</span>
                    <Link href={`/book?service=${encodeURIComponent(i.name)}`} className="price-book" prefetch={false} aria-label={`Book ${i.name}`}>Book</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="muted small">Available at both branches in Alkapur Township · Serving {site.areas.join(", ")}.</p>

          <div className="faq">
            <h2>Questions</h2>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          {related.length > 0 && (
            <div className="related">
              <p className="eyebrow">Trends &amp; tips</p>
              {related.map((p) => (
                <Link key={p.slug} href={`/trends/${p.slug}`} className="link-arrow block">{p.title} →</Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section ivory">
        <div className="wrap">
          <div className="head-row">
            <h2>You might also like</h2>
            <Link href="/prices" className="link-arrow">All prices →</Link>
          </div>
          <div className="svc-grid four">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="svc">
                <div className="svc-img">
                  <Image src={o.photo} alt={o.name} fill sizes="(max-width: 760px) 80vw, 25vw" />
                </div>
                <h3>{o.name}</h3>
                <p>From {fromPrice(o)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
