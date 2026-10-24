import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, getService } from "@/lib/site";
import { getPosts, getPost, formatDate, categories } from "@/lib/content";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { Subscribe } from "@/components/LeadForms";

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
    alternates: { canonical: `/trends/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.description, url: `${site.url}/trends/${p.slug}`, publishedTime: p.date },
  };
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const service = p.service ? getService(p.service) : undefined;
  const more = getPosts().filter((x) => x.slug !== p.slug).slice(0, 3);
  const bookHref = service ? `/book?service=${service.slug}` : "/book";

  return (
    <main>
      <JsonLd data={articleSchema(p)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Trends", url: `${site.url}/trends` },
          { name: p.title, url: `${site.url}/trends/${p.slug}` },
        ])}
      />
      <section className="page-head">
        <div className="wrap narrow">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/trends">Trends</Link> /{" "}
            <Link href={`/trends/topic/${p.category}`}>{categories[p.category]}</Link>
          </nav>
          <h1>{p.title}</h1>
          <p className="muted small">{formatDate(p.date)} · {p.readingMinutes} min read · {site.brand}</p>
        </div>
      </section>
      <article className="wrap narrow prose" dangerouslySetInnerHTML={{ __html: p.html }} />
      <section className="section-tight">
        <div className="wrap narrow">
          <div className="cta-card glass">
            <p className="eyebrow">Love this look?</p>
            <h2>{service ? `Book this look — ${service.name.toLowerCase()} in Manikonda` : "Book this look in Manikonda"}</h2>
            <p className="muted">Two salons in Alkapur Township · Open every day, 9 AM – 9 PM.</p>
            <div className="hero-actions center-row">
              <Link href={bookHref} className="btn btn-dark" prefetch={false}>Book this look</Link>
              {service && <Link href={`/services/${service.slug}`} className="link-arrow">See prices →</Link>}
            </div>
          </div>
          <Subscribe compact />
        </div>
      </section>
      {more.length > 0 && (
        <section className="section-tight">
          <div className="wrap">
            <p className="eyebrow">More trends</p>
            <div className="post-grid">
              {more.map((m) => (
                <PostCard post={m} key={m.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
