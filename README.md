# Unisalon — www.unisalon.in

Website for Unisalon, a unisex salon in Manikonda, Hyderabad. Built with Next.js and designed around three goals: **appointment bookings**, **monthly leads** and **local SEO**.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

Everything lives in **`lib/site.ts`**: phone, WhatsApp, address, hours, offer banner, services and prices, team, FAQs and nearby areas. Edit it and push; Vercel redeploys automatically. Items marked `TODO` are placeholders.

- **Prices / services:** edit `services`. Each service gets its own SEO page at `/services/<slug>`.
- **Monthly offer:** edit `offer`, or set it to `null` to hide the banner.
- **Colours:** change the tokens at the top of `app/globals.css`.

## How bookings and leads work

1. A visitor fills in the booking form (home page or any service page).
2. The lead is sent to `/api/lead` and forwarded to `LEAD_WEBHOOK_URL` (your Google Sheet).
3. WhatsApp opens with the booking details filled in, addressed to the salon's number.
4. A `generate_lead` event is sent to Google Analytics.

Call, WhatsApp, directions and review clicks are tracked too (`click_call`, `click_whatsapp`, `click_directions`, `click_write_review`).

### Save every lead to a Google Sheet (free)

1. Create a Google Sheet with headers in row 1: `receivedAt, name, phone, service, date, time, message, page, source`.
2. **Extensions → Apps Script**, paste this and save:
   ```js
   function doPost(e) {
     const lead = JSON.parse(e.postData.contents);
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
     sheet.appendRow(headers.map((h) => lead[h] ?? ""));
     return ContentService.createTextOutput("ok");
   }
   ```
3. **Deploy → New deployment → Web app**, "Execute as: Me", "Who has access: Anyone". Copy the URL.
4. In Vercel → Project → Settings → Environment Variables, add `LEAD_WEBHOOK_URL` = that URL and redeploy.

Filter the sheet by month for your monthly lead report.

## Environment variables (Vercel → Settings → Environment Variables)

| Variable | Purpose |
|---|---|
| `LEAD_WEBHOOK_URL` | Where booking leads are sent (Google Sheet script, Zapier, CRM) |
| `GOOGLE_PLACES_API_KEY` | Shows live Google rating and reviews (also set `google.placeId` in `lib/site.ts`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID, e.g. `G-XXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |

## Google Business Profile checklist

- Put **www.unisalon.in** as the website and **www.unisalon.in/#book** as the appointment link.
- Keep the name, address and phone **exactly** the same as in `lib/site.ts`.
- Add every service with its price, matching the site's price list.
- Post the monthly offer on the profile (Updates → Offer) when you change it on the site.
- Ask happy clients to use the site's "Write a Google review" button; reviews show on the site once the Places API key is set.

## SEO built in

- A page for each service targeting "<service> in Manikonda" searches.
- `HairSalon` / `BeautySalon` structured data with address, map, hours, services, Google rating and booking action.
- FAQ and breadcrumb structured data; `sitemap.xml` and `robots.txt`.
- Social share image (`/opengraph-image`).

After launch, add the site to **Google Search Console** and submit `https://www.unisalon.in/sitemap.xml`.
