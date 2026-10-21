import Link from "next/link";
import { site } from "@/lib/site";
import { TrackedLink } from "./Analytics";

// Sticky Call / WhatsApp / Book bar on phones — the main way local customers get in touch.
export function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick contact">
      <TrackedLink event="click_call" href={`tel:${site.contact.phone}`}>
        <span aria-hidden="true">📞</span>Call
      </TrackedLink>
      <TrackedLink
        event="click_whatsapp"
        href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}! I'd like to book an appointment.`)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span aria-hidden="true">💬</span>WhatsApp
      </TrackedLink>
      <Link href="/#book" className="primary">
        <span aria-hidden="true">📅</span>Book
      </Link>
    </nav>
  );
}
