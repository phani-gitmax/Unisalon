import type { Metadata } from "next";
import Link from "next/link";
import { site, services } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Salon Price List – Haircut, Spa, Colour, Facial",
  description: `Salon prices in Manikonda: men's haircut ₹220, women's cut & styling ₹800, L'Oréal hair spa from ₹800, plus colour, keratin, facials and bridal.`,
  alternates: { canonical: "/prices" },
};

export default function PricesPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Prices", url: `${site.url}/prices` }])} />
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Price list</p>
          <h1>Honest prices, shown upfront</h1>
          <p className="muted">Prices may vary with hair length and products. Your stylist confirms before starting.</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap price-cols">
          {services.map((s) => (
            <div className="price-block" key={s.slug}>
              <div className="price-head">
                <h2>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </h2>
                <Link href={`/book?service=${s.slug}`} className="link-arrow" prefetch={false}>Book →</Link>
              </div>
              {s.groups.map((g) => (
                <div key={g.title}>
                  {s.groups.length > 1 && <p className="price-group">{g.title}</p>}
                  <ul className="price-list">
                    {g.items.map((i) => (
                      <li key={i.name}>
                        <span>{i.name}</span>
                        <span className="dots" />
                        <span className="price">{i.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="member-band">
            <div>
              <p className="eyebrow">Membership</p>
              <h2>Prepaid packages from {site.memberships[0].price}</h2>
              <p className="muted">Save on regular visits with a prepaid membership. Ask us for the benefits included.</p>
            </div>
            <Link href="/about#membership" className="btn btn-line">View packages</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
