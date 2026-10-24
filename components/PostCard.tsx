import Image from "next/image";
import Link from "next/link";
import { getService } from "@/lib/site";
import { categories, formatDate, type Post } from "@/lib/content";

// Trend article card: the article's own `image`, or the related service's photo if it has none.
export function PostCard({ post }: { post: Post }) {
  const service = post.service ? getService(post.service) : undefined;
  const photo = post.image ?? service?.photo;
  return (
    <Link href={`/trends/${post.slug}`} className="post-card glass">
      {photo && (
        <div className="post-card-img">
          <Image src={photo} alt={post.title} fill sizes="(max-width: 760px) 100vw, 33vw" quality={60} />
        </div>
      )}
      <div className="post-card-body">
        <span className="tag">{categories[post.category]}</span>
        <h3>{post.title}</h3>
        <p className="muted small">{formatDate(post.date)} · {post.readingMinutes} min read</p>
      </div>
    </Link>
  );
}

export function TopicChips({ current }: { current?: string }) {
  return (
    <nav className="chips topic-chips" aria-label="Topics">
      <Link href="/trends" className={`chip${current ? "" : " active"}`} prefetch={false}>All</Link>
      {Object.entries(categories).map(([key, label]) => (
        <Link key={key} href={`/trends/topic/${key}`} className={`chip${current === key ? " active" : ""}`} prefetch={false}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
