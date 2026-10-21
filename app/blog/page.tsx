import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getPosts, formatDate } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Hair & Beauty Blog – Tips from Manikonda's Stylists",
  description: `Hair care, styling, colour and skin tips from the stylists at ${site.brand}, Alkapur Township, Manikonda, Hyderabad.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Blog", url: `${site.url}/blog` }])} />
      <section className="page-hero dark">
        <div className="wrap">
          <span className="script hero-script" aria-hidden="true">Journal</span>
          <h1>Hair &amp; beauty blog</h1>
          <p className="lead">Tips and trends from our stylists in Alkapur Township, Manikonda.</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="post-grid">
            {posts.map((p) => (
              <Link href={`/blog/${p.slug}`} className="post-card" key={p.slug}>
                <span className="small">{formatDate(p.date)} · {p.readingMinutes} min read</span>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <span className="from">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
