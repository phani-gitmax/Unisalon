# Project notes — decisions & pending items

Read this before changing the site. It records decisions the owner already made, so they
aren't re-done or undone by a later session, developer or automated audit.

Live test site: https://unisalon.vercel.app (pushes to `main` deploy automatically).
Production domain `unisalon.in` still points to the old WordPress site.

## Decisions (don't reverse without asking the owner)

### Pages & SEO
- **One page per nearby area** (`/salon-near/<area>`, data in `lib/areas.ts`) — **not** 56/70
  "service × locality" pages (`/services/haircut-in-puppalaguda` …). The owner chose this twice
  to avoid Google's doorway-page penalty. The sitemap lists only pages that exist.
- Area drive times/routes come from **Google Maps directions** (measured Oct 2026). Re-measure
  if a branch moves; never estimate by hand.
- Home `<h1>`: "Premium Unisex Hair Salon & Spa in Manikonda, Hyderabad" (styled as the eyebrow);
  "Your vibe. Your style." is display text in a `<p>`.
- Every page builds its own canonical / Open Graph / Twitter tags via `pageMetadata()` in `lib/seo.ts`.
- `*.vercel.app` sends `X-Robots-Tag: noindex, nofollow` (`next.config.ts`); only `unisalon.in` is indexable.
- `app/sitemap.ts` is automatic (services, areas, trends articles & topics) — don't replace it with a hard-coded list.

### Branch data (`lib/site.ts`)
- Map pins are from each branch's own Google Maps link — **do not** use the coordinates that
  keep appearing in audit prompts (17.3916, 78.3752 / 17.3940, 78.3775; ~800 m off):
  - Aryamitra Trenton Park: **17.3913713, 78.3678677** — https://maps.app.goo.gl/CqtsmSVbngG98Lg9A
  - Challas Myspace: **17.3935067, 78.3683203** — https://maps.app.goo.gl/e3EGs4J9U4u3bUKg9
- Visitors choose the branch for Call / WhatsApp (`components/BranchPicker.tsx`), in the booking
  flow, on area pages and in the call-back form.
- The floating glass bar (Call · WhatsApp · Book appointment, `components/MobileBar.tsx`) is on the
  **home page only**, phones only, and fades in once the visitor scrolls to the second block (owner's choice).

### Content
- **Photos: Indian people only** (licensed Magnific/Freepik stock, owner's Premium+ plan). Check
  every preview before using it. New files get new names so caches never show old photos.
- Service durations, highlights and FAQs are **confirmed by the owner**, including the guarantees
  ("Zero brassiness guarantee", "Tames 95% of frizz", "Keratin results last 4–6 months").
- Prices for colour, keratin, facial and bridal are still **samples** (`verified: false`).
  Automation and articles may quote only `verified: true` prices; never invent prices, offers or reviews.
- Trends articles must cite real sources (see `AUTOMATION.md`).

### "Issues" from the external audit tool that are NOT site bugs
The tool reads sanitized HTML, so it reports `href="about:invalid#zCSafez"` phone links, "no JSON-LD"
and robots.txt/sitemap.xml 404s. The raw site is fine: `tel:+919704760328` / `tel:+917670826262`,
one `@graph` JSON-LD on the home page, and both robots.txt and sitemap.xml return 200.
Verify with Google's Rich Results Test or "View page source", not that tool.

## Pending (needs the owner)
- [ ] Google Sheet for leads: paste `scripts/google-apps-script.gs`, set `REPORT_TO`, deploy as web
      app, run `setupMonthlyReport`, add `LEAD_WEBHOOK_URL` in Vercel and redeploy (steps in `AUTOMATION.md`).
- [ ] Point `unisalon.in` at Vercel (Vercel → Settings → Domains). Until then Google indexes none of this site.
- [ ] Real prices for colour, keratin, facial and bridal → set `verified: true`.
- [ ] Google Place IDs for both branches (`placeId`) + `GOOGLE_PLACES_API_KEY` for live reviews.
- [ ] Same naming on both Google listings (now "Shashi's Unisex Salon" and "Unisalon"); add "B Block"
      to the Challas Myspace address if it should match Google.
- [ ] Confirm both numbers are on WhatsApp; membership benefits, team details, social links.
- [ ] Real salon/team photos to replace stock photos.
- [ ] Approve offers in `content/offers-pool.json` (none approved yet, so no offer banner shows).
