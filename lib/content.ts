// Reads the monthly offer and blog posts from /content. These files are written by the
// monthly automation (see AUTOMATION.md), so the site updates without touching code.

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const root = path.join(process.cwd(), "content");

export type Offer = { month: string; title: string; text: string; cta: string };

export function getOffer(): Offer | null {
  try {
    const offer = JSON.parse(fs.readFileSync(path.join(root, "offer.json"), "utf8")) as Offer;
    return offer.title ? offer : null;
  } catch {
    return null;
  }
}

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  service?: string;
  html: string;
  readingMinutes: number;
};

// Minimal front matter parser: `key: value` lines between --- markers.
function parse(file: string): { meta: Record<string, string>; body: string } {
  const m = file.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: file };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: m[2] };
}

export function getPosts(): Post[] {
  const dir = path.join(root, "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { meta, body } = parse(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: meta.title ?? f,
        description: meta.description ?? "",
        date: meta.date ?? "",
        keywords: (meta.keywords ?? "").split(",").map((k) => k.trim()).filter(Boolean),
        service: meta.service || undefined,
        html: marked.parse(body, { async: false }) as string,
        readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
      };
    })
    .filter((p) => p.date && p.date <= new Date().toISOString().slice(0, 10))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

export const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
