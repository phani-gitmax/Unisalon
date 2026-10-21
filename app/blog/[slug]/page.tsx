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
          { name: "Blog", url: `${site.url}/blog` },
          { name: p.title, url: `${site.url}/blog/${p.slug}` },
        ])}
      />
      <section className="page-hero dark">
        <div className="wrap narrow">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/blog">Blog</Link>
          </nav>
          <h1>{p.title}</h1>
          <p className="small-light">
            {formatDate(p.date)} · {p.readingMinutes} min read · {site.brand}
          </p>
        </div>
      </section>
      <article className="wrap narrow prose" dangerouslySetInnerHTML={{ __html: p.html }} />
      <section className="post-cta">
        <div className="wrap narrow cta-box">
          <h2>{service ? `Book ${service.name.toLowerCase()} in Manikonda` : "Ready for your next look?"}</h2>
          <p>Two branches in Alkapur Township · Open every day, 9 AM – 9 PM.</p>
          <div className="hero-actions">
            <Link href={service ? `/services/${service.slug}#book` : "/#book"} className="btn btn-gold">Book appointment</Link>
            {service && <Link href={`/services/${service.slug}`} className="btn btn-outline">See prices</Link>}
          </div>
        </div>
      </section>
    </main>
  );
}
