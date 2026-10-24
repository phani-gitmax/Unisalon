import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, services, branchAddress } from "@/lib/site";
import { hoursText, fromPrice } from "@/lib/format";
import { areas, getArea, closestBranch, directionsUrl } from "@/lib/areas";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { TrackedLink } from "@/components/Analytics";
import { Reviews } from "@/components/Reviews";

type Props = { params: Promise<{ area: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

const branchLabel = (name: string) => name.replace(/ Branch$/, "");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArea((await params).area);
  if (!a) return {};
  const near = closestBranch(a);
  const r = a.routes[near.id];
  return pageMetadata({
    title: `Unisex Salon ${a.inArea ? "in" : "near"} ${a.name}, Hyderabad`,
    description: `${site.brand} is ${r.time} (${r.distance}) from ${a.name}. Haircuts from ₹220, L'Oréal hair spa, colour, keratin & bridal. Open daily, 9 AM–9 PM.`,
    path: `/salon-near/${a.slug}`,
  });
}

export default async function AreaPage({ params }: Props) {
  const a = getArea((await params).area);
  if (!a) notFound();
  const near = closestBranch(a);
  const r = a.routes[near.id];
  // Closest branch first.
  const both = [near, ...site.branches.filter((b) => b.id !== near.id)].map((b) => ({ b, r: a.routes[b.id] }));
  const hours = `${hoursText[0].days.toLowerCase()}, ${hoursText[0].time}`;

  const faqs = [
    {
      q: `Which Unisalon branch is closest to ${a.name}?`,
      a: `${branchLabel(near.name)} — about ${r.time} (${r.distance}) by car via ${r.via}. ${both
        .filter((x) => x.b.id !== near.id)
        .map((x) => `${branchLabel(x.b.name)} is ${x.r.time} (${x.r.distance}) away.`)
        .join(" ")}`,
    },
    {
      q: `Is the salon open on Sundays?`,
      a: `Yes. Both branches are open ${hours}, including Sundays and holidays.`,
    },
    {
      q: `How much is a haircut near ${a.name}?`,
      a: `A men's haircut is ₹220 (₹400 with a senior stylist) and a women's cut, wash and styling is ₹800 (₹1,000 with a senior stylist).`,
    },
    {
      q: `Can I book online?`,
      a: `Yes — pick a service, branch and time on our booking page and we confirm your slot on WhatsApp. Walk-ins are welcome too.`,
    },
  ];

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: `Salon ${a.inArea ? "in" : "near"} ${a.name}`, url: `${site.url}/salon-near/${a.slug}` },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/#visit">Visit</Link> / <span>{a.name}</span>
          </nav>
          <p className="eyebrow">{a.inArea ? `In ${a.name}` : `${r.time} from ${a.name}`}</p>
          <h1>Unisex salon {a.inArea ? "in" : "near"} {a.name}</h1>
          <p className="lead">
            {a.inArea
              ? `Both ${site.brand} branches are in Alkapur Township, Manikonda.`
              : `Our two salons in Alkapur Township, Manikonda are a short drive from ${a.name}.`}{" "}
            The quickest to reach is <strong>{branchLabel(near.name)}</strong> — about {r.time} ({r.distance}) by car via {r.via}.
          </p>
          <div className="hero-actions">
            <Link href="/book" className="btn btn-dark" prefetch={false}>Book an appointment</Link>
            <a href="#branches" className="link-arrow">Directions ↓</a>
          </div>
        </div>
      </section>

      <section id="branches" className="section-tight">
        <div className="wrap">
          <div className="branch-grid">
            {both.map(({ b, r: route }) => (
              <article className="branch glass" key={b.id}>
                {b.id === near.id && <p className="eyebrow">Closest to {a.name}</p>}
                <h2 className="area-branch-name">{branchLabel(b.name)}</h2>
                <p className="area-route">
                  <strong>{route.time}</strong> · {route.distance} from {a.name} · via {route.via}
                </p>
                <p className="muted">{branchAddress(b)}</p>
                <p>
                  <TrackedLink event="click_call" href={`tel:${b.phone}`}>{b.phoneDisplay}</TrackedLink>
                </p>
                <div className="branch-actions">
                  <Link href="/book" className="btn btn-dark btn-sm" prefetch={false}>Book here</Link>
                  <TrackedLink event="click_directions" className="link-arrow" href={directionsUrl(a, b)} target="_blank" rel="noopener noreferrer">
                    Directions from {a.name} →
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
          <p className="muted small">Drive times from Google Maps; they vary with traffic. Open {hours}.</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="head-row">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Popular with clients from {a.name}</h2>
            </div>
            <Link href="/prices" className="link-arrow">Full price list →</Link>
          </div>
          <ul className="area-services">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>
                  <strong>{s.name}</strong>
                  <span>From {fromPrice(s)} · {s.duration}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reviews />

      <section className="section-tight">
        <div className="wrap narrow faq">
          <h2>Questions from {a.name}</h2>
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <p className="small muted area-others">
            Also serving:{" "}
            {areas
              .filter((x) => x.slug !== a.slug)
              .map((x, i) => (
                <span key={x.slug}>
                  {i > 0 && " · "}
                  <Link href={`/salon-near/${x.slug}`}>{x.name}</Link>
                </span>
              ))}
          </p>
        </div>
      </section>
    </main>
  );
}
