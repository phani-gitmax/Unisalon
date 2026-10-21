import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, getService } from "@/lib/site";
import { getPosts, getPost, formatDate } from "@/lib/content";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.description, url: `${site.url}/blog/${p.slug}`, publishedTime: p.date },
  };
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const service = p.service ? getService(p.service) : undefined;

  return (
    <main>
      <JsonLd data={articleSchema(p)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Journal", url: `${site.url}/blog` },
          { name: p.title, url: `${site.url}/blog/${p.slug}` },
        ])}
      />
      <section className="page-head">
        <div className="wrap narrow">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/blog">Journal</Link>
          </nav>
          <h1>{p.title}</h1>
          <p className="muted small">{formatDate(p.date)} · {p.readingMinutes} min read · {site.brand}</p>
        </div>
      </section>
      <article className="wrap narrow prose" dangerouslySetInnerHTML={{ __html: p.html }} />
      <section className="section-tight">
        <div className="wrap narrow">
          <div className="cta-card">
            <h2>{service ? `Book ${service.name.toLowerCase()} in Manikonda` : "Ready for your next look?"}</h2>
            <p className="muted">Two salons in Alkapur Township · Open every day, 9 AM – 9 PM.</p>
            <div className="hero-actions center-row">
              <Link href={service ? `/book?service=${service.slug}` : "/book"} className="btn btn-dark">Book an appointment</Link>
              {service && <Link href={`/services/${service.slug}`} className="link-arrow">See prices →</Link>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
