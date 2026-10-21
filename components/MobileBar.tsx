import Link from "next/link";
import { site, mainBranch } from "@/lib/site";
import { TrackedLink } from "./Analytics";

// Sticky Call / WhatsApp / Book bar on phones — always one tap from a booking.
export function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick contact">
      <TrackedLink event="click_call" href={`tel:${mainBranch.phone}`}>Call</TrackedLink>
      <TrackedLink
        event="click_whatsapp"
        href={`https://wa.me/${mainBranch.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}! I'd like to book an appointment.`)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </TrackedLink>
      <Link href="/book" className="primary">Book appointment</Link>
    </nav>
  );
}
