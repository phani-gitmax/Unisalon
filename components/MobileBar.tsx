import Link from "next/link";
import { BranchPicker } from "./BranchPicker";

// Sticky Call / WhatsApp / Book bar on phones — always one tap from a booking.
// Call and WhatsApp ask which branch first, since each branch has its own number.
export function MobileBar() {
  return (
    <nav className="mobile-bar glass-strong" aria-label="Quick contact">
      <BranchPicker action="call">Call</BranchPicker>
      <BranchPicker action="whatsapp">WhatsApp</BranchPicker>
      <Link href="/book" className="primary" prefetch={false}>Book appointment</Link>
    </nav>
  );
}
