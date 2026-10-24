# Website automation

What runs on its own, and the exact checklists the scheduled Claude routines follow.
Edit the checklists below to change what the routines do — they read this file every run.

| What | When | How |
|---|---|---|
| **Trends articles** (2 per month, researched with sources) | 1st of every month, ~9 AM IST | Claude routine → commits to `main` → Vercel publishes |
| **Offer refresh** + Google Business Profile post draft | 1st of every month (same run) | Claude routine, using only approved offers from `content/offers-pool.json` |
| **Monthly SEO report** | 2nd of every month, ~10 AM IST | Claude routine → push + email notification |
| **Monthly lead report** | 1st of every month, 9 AM IST | Google Sheet script emails the owner (`scripts/google-apps-script.gs`) |
| **Live Google reviews** | Every day | Website refreshes rating + reviews from Google (needs API key) |

---

## Monthly content run

You are maintaining the website of **Unisalon by Shashi**, a unisex salon with two branches in Alkapur Township, Manikonda, Hyderabad. Follow every step. Never invent facts.

1. `npm ci`. Read `lib/site.ts` (services, prices, branches, hours), every file in `content/trends/`, `content/offer.json`, `content/offers-pool.json` and `content/gbp-posts/`.
2. **Write 2 new Trends articles** as `content/trends/<slug>.md`, using the same front matter as existing articles (`title`, `description`, `date`, `category`, `keywords`, `service`).
   - **Research first.** Search the web for beauty trends and industry news from the last ~60 days. Use reputable sources (Vogue/Elle/Harper's Bazaar/Grazia/Femina India, Esquire India, L'Oréal and brand newsrooms, Economic Times/Mint/Business Standard for industry data). Open every source you rely on; every statistic, quote and named trend must come from a source you actually read. Never invent sources, numbers or quotes.
   - Pick 2 **different** `category` values, one of: `hair-trends`, `hair-care`, `skin-care`, `bridal`, `mens-grooming`, `industry-news`. Rotate so every category gets an article over a few months. Prefer the season: wedding season (Oct–Feb), summer heat (Mar–Jun), monsoon frizz (Jul–Sep), festivals (Sankranti, Ugadi, Bonalu, Dussehra, Diwali, Christmas).
   - `date`: today's date in IST (`YYYY-MM-DD`). Articles dated in the future stay hidden.
   - `title` ≤ 60 characters; `description` 120–155 characters and mentions Manikonda or Hyderabad; slug is short, lowercase, hyphenated. Never repeat an existing title or main keyword.
   - 600–900 words in plain friendly Indian English: what the trend is, who it suits (Indian hair and skin tones, Hyderabad's climate), how to ask for it, care tips. `##` headings, short paragraphs, a list.
   - Use **only** prices from `lib/site.ts`, and only for services where `verified: true`. For other services say "ask us for a quote". Never invent reviews, awards, staff names, discounts, salon claims or medical claims.
   - Link to the matching `/services/<slug>` page and include a booking link `/book?service=<slug>`. Set `service:` to that slug (the article's "Book this look" button uses it).
   - End with `## Sources` — a bullet list of `[Publication – article title](url)` for every source (at least 3).
3. **Offer refresh**: from `content/offers-pool.json`, take only offers with `"approved": true`. Prefer ones whose `months` includes the current month (empty = any month), and don't reuse last month's offer if another fits. Write it to `content/offer.json` with `"month": "YYYY-MM"`. **If no offer is approved, leave `content/offer.json` unchanged** and say so in your summary.
4. **Google Business Profile drafts**: create `content/gbp-posts/YYYY-MM.md` containing ready-to-paste posts (each ≤ 1,200 characters, friendly, with a call to action and link):
   - one "Offer" post for this month's offer (skip if none), linking to `https://unisalon.in/book`;
   - one "Update" post per new Trends article, linking to the article.
5. **Check**: `npm run build`, then `npx next start -p 3000 &`, wait for it, then `npm run seo-check`. Fix any errors your new content caused (only touch `content/`). The check must exit with code 0.
6. **Publish**: `git fetch origin main && git rebase origin/main`, commit with message `Monthly content: <Month YYYY>`, and push to `main`.
7. **Summary** (your final message): the new post titles and URLs (`https://unisalon.in/trends/<slug>`) with their sources, the offer used, and the full text of the Google Business Profile posts to copy in.

## Monthly SEO report

You are reviewing the website of **Unisalon by Shashi** (two branches, Alkapur Township, Manikonda, Hyderabad). Report only; don't change code.

1. `npm ci && npm run build`, then `npx next start -p 3000 &`, wait for it, and run `npm run seo-check`.
2. Also run `node scripts/seo-check.mjs https://unisalon.in` if the live site responds (it may still be the old WordPress site until the move to Vercel; say so if `/sitemap.xml` isn't the Next.js one).
3. Content freshness: date of the newest article in `content/trends/`, and whether `content/offer.json` `month` is the current month.
4. Count and list the remaining `TODO` placeholders in `lib/site.ts`, `content/offers-pool.json` (offers with `"approved": false`) and `scripts/google-apps-script.gs`.
5. If the SEO check found errors in `content/` that are clear-cut to fix (e.g. a broken link or a too-long title), fix them, run the check again, commit `SEO fixes: <Month YYYY>` and push to `main`. Anything else: report it.
6. **Summary** (your final message, short and plain): SEO errors and warnings, pages checked, Trends articles published in the last month, offer status, outstanding TODOs, and a reminder that the lead numbers come by email from the Google Sheet on the 1st.

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
