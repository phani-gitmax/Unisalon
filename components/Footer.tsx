import Image from "next/image";
import Link from "next/link";
import { site, services, branchAddress } from "@/lib/site";
import { hoursText } from "@/lib/format";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div>
          <Image src="/logo.webp" alt={site.brand} width={166} height={55} />
          <p className="foot-about">
            A family unisex salon in Alkapur Township, Manikonda — personalised hair, skin and beauty services by a
            team trained since {site.since}.
          </p>
          <p>
            {hoursText.map((h) => (
              <span key={h.days}>
                {h.days}: {h.time}
              </span>
            ))}
          </p>
        </div>
        {/* Name, address and phone — keep identical to each Google Business Profile */}
        {site.branches.map((b) => (
          <div key={b.id}>
            <p className="foot-title">{b.name}</p>
            <address>
              {branchAddress(b)}
              <br />
              <a href={`tel:${b.phone}`}>{b.phoneDisplay}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">Directions →</a>
            </address>
          </div>
        ))}
        <div>
          <p className="foot-title">Services</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/blog">Hair &amp; beauty blog</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {new Date().getFullYear()} {site.brand}, Manikonda, Hyderabad.</span>
        <span>Serving {site.areas.join(" · ")}</span>
      </div>
    </footer>
  );
}
