# Website automation

What runs on its own, and the exact checklists the scheduled Claude routines follow.
Edit the checklists below to change what the routines do — they read this file every run.

| What | When | How |
|---|---|---|
| **SEO blog posts** (2 per month) | 1st of every month, ~9 AM IST | Claude routine → commits to `main` → Vercel publishes |
| **Offer refresh** + Google Business Profile post draft | 1st of every month (same run) | Claude routine, using only approved offers from `content/offers-pool.json` |
| **Monthly SEO report** | 2nd of every month, ~10 AM IST | Claude routine → push + email notification |
| **Monthly lead report** | 1st of every month, 9 AM IST | Google Sheet script emails the owner (`scripts/google-apps-script.gs`) |
| **Live Google reviews** | Every day | Website refreshes rating + reviews from Google (needs API key) |

---

## Monthly content run

You are maintaining the website of **Unisalon by Shashi**, a unisex salon with two branches in Alkapur Township, Manikonda, Hyderabad. Follow every step. Never invent facts.

1. `npm ci`. Read `lib/site.ts` (services, prices, branches, hours), every file in `content/blog/`, `content/offer.json`, `content/offers-pool.json` and `content/gbp-posts/`.
2. **Write 2 new blog posts** as `content/blog/<slug>.md`, using the same front matter as existing posts (`title`, `description`, `date`, `keywords`, `service`).
   - `date`: today's date in IST (`YYYY-MM-DD`). Posts dated in the future stay hidden.
   - `title` ≤ 55 characters; `description` 120–155 characters; slug is short, lowercase, hyphenated.
   - Target real local searches (e.g. "<service> in Manikonda", "best salon near Gachibowli", "bridal makeup Hyderabad price"). Prefer the season: wedding season (Oct–Feb), summer heat (Mar–Jun), monsoon frizz (Jul–Sep), festivals (Sankranti, Ugadi, Bonalu, Dussehra, Diwali, Christmas).
   - Each post covers a different service from the last 4 posts, and never repeats an existing title or main keyword.
   - 600–900 words, helpful and practical, written as the salon's stylists. Use `##`/`###` headings, short paragraphs, a list or table.
   - Use **only** prices from `lib/site.ts`, and only for services where `verified: true`. Never invent reviews, statistics, awards, staff names, discounts or medical claims.
   - Link to the matching `/services/<slug>` page and end with a booking line linking to `/book?service=<slug>`. Set `service:` to that slug.
3. **Offer refresh**: from `content/offers-pool.json`, take only offers with `"approved": true`. Prefer ones whose `months` includes the current month (empty = any month), and don't reuse last month's offer if another fits. Write it to `content/offer.json` with `"month": "YYYY-MM"`. **If no offer is approved, leave `content/offer.json` unchanged** and say so in your summary.
4. **Google Business Profile drafts**: create `content/gbp-posts/YYYY-MM.md` containing ready-to-paste posts (each ≤ 1,200 characters, friendly, with a call to action and link):
   - one "Offer" post for this month's offer (skip if none), linking to `https://unisalon.in/book`;
   - one "Update" post per new blog article, linking to the article.
5. **Check**: `npm run build`, then `npx next start -p 3000 &`, wait for it, then `npm run seo-check`. Fix any errors your new content caused (only touch `content/`). The check must exit with code 0.
6. **Publish**: `git fetch origin main && git rebase origin/main`, commit with message `Monthly content: <Month YYYY>`, and push to `main`.
7. **Summary** (your final message): the new post titles and URLs (`https://unisalon.in/blog/<slug>`), the offer used, and the full text of the Google Business Profile posts to copy in.

## Monthly SEO report

You are reviewing the website of **Unisalon by Shashi** (two branches, Alkapur Township, Manikonda, Hyderabad). Report only; don't change code.

1. `npm ci && npm run build`, then `npx next start -p 3000 &`, wait for it, and run `npm run seo-check`.
2. Also run `node scripts/seo-check.mjs https://unisalon.in` if the live site responds (it may still be the old WordPress site until the move to Vercel; say so if `/sitemap.xml` isn't the Next.js one).
3. Content freshness: date of the newest post in `content/blog/`, and whether `content/offer.json` `month` is the current month.
4. Count and list the remaining `TODO` placeholders in `lib/site.ts`, `content/offers-pool.json` (offers with `"approved": false`) and `scripts/google-apps-script.gs`.
5. If the SEO check found errors in `content/` that are clear-cut to fix (e.g. a broken link or a too-long title), fix them, run the check again, commit `SEO fixes: <Month YYYY>` and push to `main`. Anything else: report it.
6. **Summary** (your final message, short and plain): SEO errors and warnings, pages checked, posts published in the last month, offer status, outstanding TODOs, and a reminder that the lead numbers come by email from the Google Sheet on the 1st.

---

## One-time setup (owner)

### 1. Lead sheet + monthly lead email (free)
1. Create a Google Sheet. **Extensions → Apps Script**, paste `scripts/google-apps-script.gs`, set `REPORT_TO` to your email, save.
2. **Deploy → New deployment → Web app** — "Execute as: Me", "Who has access: Anyone". Copy the URL.
3. In the script editor, run `setupMonthlyReport` once and allow the permissions it asks for.
4. Vercel → Project → Settings → Environment Variables: add `LEAD_WEBHOOK_URL` = the web app URL. Redeploy.

### 2. Live Google reviews
1. Find each branch's **Place ID** (https://developers.google.com/maps/documentation/places/web-service/place-id) and put it in `lib/site.ts` → `branches[].placeId`.
2. Create a Google Cloud API key with **Places API (New)** enabled (restrict it to that API).
3. Vercel → Environment Variables: add `GOOGLE_PLACES_API_KEY`. Redeploy.

### 3. Approve offers
Edit `content/offers-pool.json` and set `"approved": true` on offers the salon will honour (or ask Claude to add new ones).

### 4. Analytics and Search Console
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 ID. Mark `generate_lead` as a key event to count bookings.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — from Google Search Console; then submit `https://unisalon.in/sitemap.xml`.
