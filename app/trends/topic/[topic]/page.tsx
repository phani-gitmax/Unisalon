import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getPosts, categories, type Category } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PostCard, TopicChips } from "@/components/PostCard";
import { Subscribe } from "@/components/LeadForms";

type Props = { params: Promise<{ topic: string }> };

const isCategory = (t: string): t is Category => t in categories;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(categories).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  if (!isCategory(topic)) return {};
  const label = categories[topic];
  const empty = !getPosts().some((p) => p.category === topic);
  return {
    ...pageMetadata({
      title: `${label} – Trends & Tips from Manikonda`,
      description: `${label} trends and advice from the stylists at ${site.brand}, Alkapur Township, Manikonda, Hyderabad.`,
      path: `/trends/topic/${topic}`,
    }),
    // Topics without articles yet stay out of Google until the first one is published.
    robots: empty ? { index: false, follow: true } : undefined,
  };
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  if (!isCategory(topic)) notFound();
  const label = categories[topic];
  const posts = getPosts().filter((p) => p.category === topic);

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Trends", url: `${site.url}/trends` },
          { name: label, url: `${site.url}/trends/topic/${topic}` },
        ])}
      />
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/trends">Trends</Link>
          </nav>
          <h1>{label}</h1>
          <TopicChips current={topic} />
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap">
          {posts.length ? (
            <div className="post-grid">
              {posts.map((p) => (
                <PostCard post={p} key={p.slug} />
              ))}
            </div>
          ) : (
            <p className="muted">New {label.toLowerCase()} articles are coming soon — join below to get them on WhatsApp.</p>
          )}
          <Subscribe />
        </div>
      </section>
    </main>
  );
}
