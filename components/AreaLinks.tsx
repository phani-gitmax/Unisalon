import Link from "next/link";
import { areas } from "@/lib/areas";

// "Manikonda, Alkapur Township, …" with each area linking to its /salon-near page.
export function AreaLinks() {
  return (
    <span className="area-links">
      {areas.map((a, i) => (
        <span key={a.slug}>
          {i > 0 && ", "}
          <Link href={`/salon-near/${a.slug}`} prefetch={false}>{a.name}</Link>
        </span>
      ))}
    </span>
  );
}
