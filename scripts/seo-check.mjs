#!/usr/bin/env node
// SEO health check. Crawls every page in the sitemap and reports problems as Markdown.
// Usage: npm run build && npm start &  then  node scripts/seo-check.mjs [baseUrl]
// Exits with code 1 if any errors are found (warnings don't fail).

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const errors = [];
const warnings = [];
const linkStatus = new Map();

async function get(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { status: res.status, text: res.ok ? await res.text() : "" };
}

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1];
const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").trim();

async function checkLink(path) {
  if (!linkStatus.has(path)) {
    linkStatus.set(path, fetch(base + path, { method: "GET", redirect: "follow" }).then((r) => r.status).catch(() => 0));
  }
  return linkStatus.get(path);
}

async function checkPage(url) {
  const path = new URL(url).pathname;
  const { status, text: html } = await get(base + path);
  if (status !== 200) return errors.push(`\`${path}\` returned HTTP ${status}`);

  const title = strip(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  if (!title) errors.push(`\`${path}\` has no <title>`);
  else if (title.length > 70) warnings.push(`\`${path}\` title is ${title.length} chars (aim for ≤ 65): "${title}"`);
  else if (title.length < 25) warnings.push(`\`${path}\` title is short (${title.length} chars): "${title}"`);

  const desc = attr(html.match(/<meta[^>]+name="description"[^>]*>/i)?.[0] ?? "", "content") ?? "";
  if (!desc) errors.push(`\`${path}\` has no meta description`);
  else if (desc.length > 170) warnings.push(`\`${path}\` description is ${desc.length} chars (aim for ≤ 160)`);
  else if (desc.length < 70) warnings.push(`\`${path}\` description is short (${desc.length} chars)`);

  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  if (h1s.length !== 1) errors.push(`\`${path}\` has ${h1s.length} <h1> tags (should be exactly 1)`);

  if (!/<link[^>]+rel="canonical"/i.test(html)) errors.push(`\`${path}\` has no canonical URL`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (blocks.length === 0) warnings.push(`\`${path}\` has no structured data`);
  for (const b of blocks) {
    try {
      JSON.parse(b[1]);
    } catch {
      errors.push(`\`${path}\` has invalid JSON-LD`);
    }
  }

  for (const img of html.match(/<img[^>]*>/gi) ?? []) {
    if (!/\salt="[^"]+"/i.test(img)) warnings.push(`\`${path}\` has an image without alt text: ${attr(img, "src")}`);
  }

  const hrefs = [...html.matchAll(/<a[^>]+href="([^"]+)"/gi)].map((m) => m[1]);
  for (const href of new Set(hrefs)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = href.split("#")[0] || "/";
    const s = await checkLink(target);
    if (s !== 200) errors.push(`\`${path}\` links to \`${href}\` which returns HTTP ${s}`);
  }

  if (/TODO|lorem ipsum/i.test(strip(html.replace(/<script[\s\S]*?<\/script>/gi, "")))) {
    warnings.push(`\`${path}\` contains placeholder text (TODO / lorem ipsum)`);
  }

  return { path, title, words: strip(html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")).split(/\s+/).length };
}

const sitemap = await get(`${base}/sitemap.xml`);
if (sitemap.status !== 200) {
  console.log(`# SEO check failed\n\nsitemap.xml returned HTTP ${sitemap.status}`);
  process.exit(1);
}
const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const robots = await get(`${base}/robots.txt`);
if (robots.status !== 200 || !/Sitemap:/i.test(robots.text)) errors.push("robots.txt is missing or doesn't list the sitemap");

const pages = [];
for (const u of urls) {
  const r = await checkPage(u);
  if (r && typeof r === "object") pages.push(r);
}

console.log(`# SEO check — ${new Date().toISOString().slice(0, 10)}\n`);
console.log(`Checked **${pages.length}** pages from the sitemap and **${linkStatus.size}** internal links.\n`);
console.log(`## Errors (${errors.length})\n${errors.length ? errors.map((e) => `- ${e}`).join("\n") : "None 🎉"}\n`);
console.log(`## Warnings (${warnings.length})\n${warnings.length ? warnings.map((w) => `- ${w}`).join("\n") : "None"}\n`);
console.log(`## Pages\n| Page | Words | Title |\n|---|---|---|\n${pages.map((p) => `| ${p.path} | ${p.words} | ${p.title} |`).join("\n")}`);

process.exit(errors.length ? 1 : 0);
