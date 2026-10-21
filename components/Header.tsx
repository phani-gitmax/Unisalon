"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { track } from "./Analytics";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#prices", label: "Prices" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#team", label: "Team" },
  { href: "/#visit", label: "Visit us" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label={`${site.name} home`}>
          <span className="logo-mark">U</span>
          <span>
            uni<b>salon</b>
          </span>
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
        <div className="nav-actions">
          <a href={`tel:${site.contact.phone}`} className="nav-phone" onClick={() => track("click_call")}>
            {site.contact.phoneDisplay}
          </a>
          <Link href="/#book" className="btn btn-primary">Book now</Link>
        </div>
      </div>
    </header>
  );
}
