import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { hoursText } from "@/lib/format";
import { BookingFlow } from "@/components/BookingFlow";
import { TrackedLink } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Book an Appointment – Manikonda Salon",
  description: `Book a haircut, hair spa, colour, facial or bridal makeover at ${site.brand}, Alkapur Township, Manikonda. Pick a branch and time in under a minute.`,
  path: "/book",
});

type Props = { searchParams: Promise<{ service?: string }> };

export default async function BookPage({ searchParams }: Props) {
  const { service } = await searchParams;

  return (
    <main className="book-page">
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Book an appointment", url: `${site.url}/book` }])} />
      <div className="wrap book-grid">
        <div>
          <p className="eyebrow">Appointments</p>
          <h1>Book your visit</h1>
          <p className="muted">Four quick steps. We&apos;ll confirm your slot on WhatsApp.</p>
          <BookingFlow initialService={service} />
        </div>
        <aside className="book-aside">
          <h2>Prefer to talk?</h2>
          {site.branches.map((b) => (
            <div key={b.id} className="aside-branch">
              <p className="aside-name">{b.name.replace(" Branch", "")}</p>
              <TrackedLink event="click_call" href={`tel:${b.phone}`}>{b.phoneDisplay}</TrackedLink>
            </div>
          ))}
          <TrackedLink
            event="click_whatsapp"
            className="btn btn-line btn-block"
            href={`https://wa.me/${site.branches[0].whatsapp}?text=${encodeURIComponent(`Hi ${site.name}! I'd like to book an appointment.`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </TrackedLink>
          <p className="muted small">
            Open {hoursText[0].days.toLowerCase()}, {hoursText[0].time}. Walk-ins welcome — booking guarantees your slot.
          </p>
        </aside>
      </div>
    </main>
  );
}
