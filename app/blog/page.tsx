import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getPosts, formatDate } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Hair & Beauty Journal – Tips from Manikonda's Stylists",
  description: `Hair care, styling, colour and skin tips from the stylists at ${site.brand}, Alkapur Township, Manikonda, Hyderabad.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Journal", url: `${site.url}/blog` }])} />
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Journal</p>
          <h1>Hair &amp; beauty notes</h1>
          <p className="muted">Practical tips from our stylists in Alkapur Township, Manikonda.</p>
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap narrow post-list">
          {posts.map((p) => (
            <Link href={`/blog/${p.slug}`} className="post-row" key={p.slug}>
              <span className="muted small">{formatDate(p.date)} · {p.readingMinutes} min read</span>
              <h2>{p.title}</h2>
              <p className="muted">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
