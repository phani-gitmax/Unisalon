import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { TrackedLink } from "@/components/Analytics";

export const metadata: Metadata = {
  title: "About Shashi & Membership Packages",
  description: `The story of ${site.brand} — from Mumbai's salons in ${site.since} to two branches in Alkapur Township, Manikonda. Meet the team and see membership packages.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "About", url: `${site.url}/about` }])} />
      <JsonLd data={faqSchema(site.faqs)} />

      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Our story</p>
          <h1>From Mumbai to Manikonda</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap split-grid">
          <div className="split-img tall">
            <Image src={site.gallery[1]} alt="The salon floor" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
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

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">The team</p>
          <h2>People who listen first</h2>
          <div className="team-row">
            {site.team.map((t, i) => (
              <div className="team" key={i}>
                <div className="team-ph" aria-hidden="true">{t.name.charAt(0)}</div>
                <h3>{t.name}</h3>
                <p className="muted">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="membership" className="section ivory">
        <div className="wrap">
          <p className="eyebrow">Membership</p>
          <h2>Prepaid packages</h2>
          <div className="member-row">
            {site.memberships.map((m) => (
              <div className="member" key={m.name}>
                <p className="eyebrow">{m.name}</p>
                <p className="member-price">{m.price}</p>
                <p className="muted">{m.note}</p>
                <TrackedLink
                  event="click_membership"
                  className="link-arrow"
                  href={`https://wa.me/${site.branches[0].whatsapp}?text=${encodeURIComponent(`Hi ${site.name}! Please share details of the ${m.name} membership (${m.price}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask for details →
                </TrackedLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <p className="eyebrow">FAQs</p>
          <h2>Good to know</h2>
          <div className="faq">
            {site.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className="center-row" style={{ marginTop: 40 }}>
            <Link href="/book" className="btn btn-dark" prefetch={false}>Book an appointment</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
