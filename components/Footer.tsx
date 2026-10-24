import Image from "next/image";
import Link from "next/link";
import { site, services, branchAddress } from "@/lib/site";
import { hoursText } from "@/lib/format";
import { AreaLinks } from "./AreaLinks";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div>
          <Image src="/logo-dark.webp" alt={site.brand} width={130} height={43} className="logo-on-light" />
          <Image src="/logo.webp" alt="" width={130} height={43} className="logo-on-dark" />
          <p className="foot-about">
            A family unisex salon in Alkapur Township, Manikonda. Open {hoursText[0].days.toLowerCase()}, {hoursText[0].time}.
          </p>
          <Link href="/book" className="btn btn-dark btn-sm" prefetch={false}>Book an appointment</Link>
        </div>
        {/* Name, address and phone — keep identical to each Google Business Profile */}
        {site.branches.map((b) => (
          <div key={b.id}>
            <p className="foot-title">{b.name.replace(" Branch", "")}</p>
            <address>
              {branchAddress(b)}
              <br />
              <a href={`tel:${b.phone}`}>{b.phoneDisplay}</a>
              <br />
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
            </address>
          </div>
        ))}
        <div>
          <p className="foot-title">Explore</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
            <li><Link href="/prices">Price list</Link></li>
            <li><Link href="/about">About &amp; membership</Link></li>
            <li><Link href="/trends">Beauty trends</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {new Date().getFullYear()} {site.brand} · <a href={`mailto:${site.email}`}>{site.email}</a></span>
        <span>Serving <AreaLinks /></span>
      </div>
    </footer>
  );
}
