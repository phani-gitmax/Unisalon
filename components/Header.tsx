"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { track } from "./Analytics";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#prices", label: "Prices" },
  { href: "/#membership", label: "Membership" },
  { href: "/blog", label: "Blog" },
  { href: "/#branches", label: "Branches" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span>Open all days · 9 AM – 9 PM</span>
          <span className="topbar-phones">
            {site.branches.map((b) => (
              <a key={b.id} href={`tel:${b.phone}`} onClick={() => track("click_call", { branch: b.id })}>
                {b.name.replace("Aryamitra ", "").replace(" Branch", "")}: {b.phoneDisplay}
              </a>
            ))}
          </span>
        </div>
      </div>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label={`${site.brand} home`}>
          <Image src="/logo.webp" alt={site.brand} width={166} height={55} priority />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
        <ul className={open ? "open" : undefined}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/#book" className="btn btn-gold nav-cta">
          Book appointment
        </Link>
      </div>
    </header>
  );
}
