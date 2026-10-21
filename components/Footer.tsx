import Link from "next/link";
import { site, services, fullAddress } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div>
          <p className="foot-brand">uni<b>salon</b></p>
          <p>{site.tagline}</p>
          {/* Name, address and phone — keep identical to your Google Business Profile */}
          <address>
            {fullAddress}
            <br />
            <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a> ·{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </address>
        </div>
        <div>
          <p className="foot-title">Services</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.seoTitle.split(" in ")[0]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="foot-title">Areas we serve</p>
          <p>{site.areas.join(" · ")}</p>
          <p className="foot-title">Follow us</p>
          <p className="socials">
            {site.social.instagram && <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
            {site.social.facebook && <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
            <a href={site.google.mapsUrl} target="_blank" rel="noopener noreferrer">Google Maps</a>
          </p>
        </div>
      </div>
      <div className="wrap foot-bottom">
        © {new Date().getFullYear()} {site.legalName}, Manikonda, Hyderabad.
      </div>
    </footer>
  );
}
