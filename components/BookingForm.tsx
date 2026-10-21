"use client";

import { useState } from "react";
import { site, services } from "@/lib/site";
import { track } from "./Analytics";

export function BookingForm({ defaultService = "", compact = false }: { defaultService?: string; compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lead = Object.fromEntries(f.entries()) as Record<string, string>;

    if (lead.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");

    // Save the lead without waiting, so the WhatsApp window opens straight from the click
    // (browsers block pop-ups opened after an await).
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, page: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});

    const text = [
      `Hi ${site.name}! I'd like to book an appointment.`,
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      lead.service && `Service: ${lead.service}`,
      lead.date && `Date: ${lead.date}`,
      lead.time && `Time: ${lead.time}`,
      lead.message && `Note: ${lead.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    track("generate_lead", { service: lead.service || "unspecified", method: "booking_form" });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="booking-done" role="status">
        <div className="done-icon">✓</div>
        <h3>Request received!</h3>
        <p>We&apos;ve opened WhatsApp with your booking details — just tap send. We&apos;ll confirm your slot shortly.</p>
        <p className="small">
          WhatsApp didn&apos;t open? Call us on <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>.
        </p>
        <button className="btn btn-ghost" onClick={() => setSent(false)}>Book another</button>
      </div>
    );
  }

  return (
    <form className={`booking ${compact ? "compact" : ""}`} onSubmit={handleSubmit} noValidate={false}>
      <div className="row">
        <label>
          Your name
          <input name="name" required autoComplete="name" placeholder="Full name" />
        </label>
        <label>
          Phone / WhatsApp
          <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="10-digit mobile" />
        </label>
      </div>
      <label>
        Service
        <select name="service" defaultValue={defaultService}>
          <option value="">Choose a service</option>
          {services.map((s) => (
            <optgroup label={s.name} key={s.slug}>
              {s.items.map((i) => (
                <option key={i.name} value={i.name}>
                  {i.name} — {i.price}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <div className="row">
        <label>
          Date
          <input name="date" type="date" min={today} required />
        </label>
        <label>
          Time
          <select name="time" required defaultValue="">
            <option value="" disabled>Pick a time</option>
            {site.timeSlots.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      {!compact && (
        <label>
          Anything we should know? <span className="optional">(optional)</span>
          <textarea name="message" rows={2} placeholder="Preferred stylist, hair length, occasion…" />
        </label>
      )}
      {/* Honeypot for spam bots — hidden from people */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn btn-primary btn-block" type="submit">Book appointment</button>
      {site.bookingUrl && (
        <a className="btn btn-ghost btn-block" href={site.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("generate_lead", { method: "online_booking" })}>
          Or book online instantly
        </a>
      )}
      <p className="small center">Free cancellation · We confirm every booking on WhatsApp</p>
    </form>
  );
}
