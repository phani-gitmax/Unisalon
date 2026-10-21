"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/prices", label: "Prices" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/#visit", label: "Visit" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label={`${site.brand} home`}>
          <Image src="/logo-dark.webp" alt={site.brand} width={130} height={43} priority />
        </Link>
        <nav aria-label="Main">
          <ul className={open ? "open" : undefined}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-right">
          <Link href="/book" className="btn btn-dark btn-sm">Book now</Link>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
