# Unisalon by Shashi — unisalon.in

Website for Unisalon, a unisex salon with two branches in Alkapur Township, Manikonda, Hyderabad. Built with Next.js around three goals: **appointment bookings**, **monthly leads** and **local SEO** — with monthly content and reporting automated (see [AUTOMATION.md](AUTOMATION.md)).

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run seo-check    # SEO health check (run against a running server)
```

## Where things live

| What | File |
|---|---|
| Branches, phones, hours, services & prices, team, FAQs, memberships | `lib/site.ts` |
| This month's offer (written by automation) | `content/offer.json` |
| Offers the automation is allowed to use | `content/offers-pool.json` |
| Trends articles (Markdown) | `content/trends/*.md` |
| Google Business Profile post drafts | `content/gbp-posts/` |
| Colours (light + dark), glass and fonts | top of `app/globals.css`, `app/layout.tsx` |

Items marked `TODO` are placeholders. Prices for colour, keratin, beauty and bridal (`verified: false`) are samples until replaced.

## Bookings and leads

1. On `/book`, a visitor picks a service, a **branch**, a day and a time (4 taps), then enters name and phone.
2. The lead goes to `/api/lead` → `LEAD_WEBHOOK_URL` (the Google Sheet).
3. WhatsApp opens with the booking filled in, addressed to **that branch's** number.
4. Two quicker lead boxes also post to `/api/lead`: **"Call me back"** on the home page (`type: callback`, emailed to you instantly by the sheet script) and **"Monthly offers & trends on WhatsApp"** on the home and Trends pages (`type: subscribe`).
5. GA4 events: `generate_lead` (with `method`: booking_flow / callback / subscribe), `click_call`, `click_whatsapp`, `click_directions`, `click_membership`, `click_write_review`.

## SEO built in

- A page per service ("<service> in Manikonda") and a Trends section (beauty trends & industry news, with topic pages), all in `sitemap.xml`.
- Structured data: Organization + a `HairSalon` for **each branch** (address, map, hours, services, rating, booking action), plus Service, FAQ, Article and Breadcrumb data.
- `scripts/seo-check.mjs` checks titles, descriptions, headings, canonicals, structured data, alt text and broken links.

## Environment variables

| Variable | Purpose |
|---|---|
| `LEAD_WEBHOOK_URL` | Google Sheet web app URL that stores leads |
| `GOOGLE_PLACES_API_KEY` | Live Google rating and reviews |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console |

Setup steps: [AUTOMATION.md → One-time setup](AUTOMATION.md#one-time-setup-owner).

## Photos

The photos in `public/photos/` are licensed stock photos of Indian clients and stylists from Magnific (Freepik), downloaded under the owner's Premium+ plan, which covers commercial use on this website. Keep the faces Indian when swapping photos. Replace them with real photos of the salon, team and work by saving new files with the same names, or by changing the paths in `lib/site.ts` (`heroPhoto`, `gallery`, and each service's `photo`).
