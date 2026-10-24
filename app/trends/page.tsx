import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PostCard, TopicChips } from "@/components/PostCard";
import { Subscribe } from "@/components/LeadForms";

export const metadata: Metadata = pageMetadata({
  title: "Beauty Trends & Salon Tips – Hyderabad",
  description: `The latest hair, skin, bridal and grooming trends — and what suits you — from the stylists at ${site.brand}, Manikonda, Hyderabad.`,
  path: "/trends",
});

export default function TrendsIndex() {
  const posts = getPosts();
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Trends", url: `${site.url}/trends` }])} />
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Trends</p>
          <h1>What&apos;s new in beauty</h1>
          <p className="muted">Hair, skin, bridal and grooming trends — explained by our stylists in Manikonda.</p>
          <TopicChips />
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap">
          <div className="post-grid">
            {posts.map((p) => (
              <PostCard post={p} key={p.slug} />
            ))}
          </div>
          <Subscribe />
        </div>
      </section>
    </main>
  );
}
