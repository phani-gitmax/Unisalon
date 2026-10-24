"use client";

import { useState } from "react";
import { site, services, mainBranch } from "@/lib/site";
import { sendLead, validPhone } from "@/lib/lead";
import { track } from "./Analytics";

type Status = "idle" | "sending" | "done";

const formData = (e: React.FormEvent<HTMLFormElement>) =>
  Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

// For visitors who won't go through the booking steps: leave a number, the salon calls back.
export function Callback() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formData(e);
    if (!f.name.trim()) return setError("Please enter your name.");
    if (!validPhone(f.phone)) return setError("Please enter a valid 10-digit mobile number.");
    setError("");
    setStatus("sending");
    const ok = await sendLead("callback", { name: f.name, phone: f.phone, service: f.service, website: f.website });
    if (!ok) {
      setStatus("idle");
      return setError(`Couldn't send — please call ${mainBranch.phoneDisplay} instead.`);
    }
    track("generate_lead", { service: f.service, method: "callback" });
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="lead-done" role="status">
        <p className="lead-title">Thank you — we&apos;ll call you shortly.</p>
        <p className="muted small">We call back during opening hours, 9 AM – 9 PM every day.</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <label>
        <span className="sr-only">Name</span>
        <input name="name" autoComplete="name" placeholder="Your name" />
      </label>
      <label>
        <span className="sr-only">Mobile number</span>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Mobile number" />
      </label>
      <label>
        <span className="sr-only">Service</span>
        <select name="service" defaultValue="">
          <option value="">Any service / not sure</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
        </select>
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Call me back"}
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}

// Builds a WhatsApp list the salon can send its monthly offer and trend posts to.
export function Subscribe({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = formData(e);
    if (!validPhone(f.phone)) return setError("Please enter a valid 10-digit WhatsApp number.");
    setError("");
    setStatus("sending");
    const ok = await sendLead("subscribe", { name: f.name, phone: f.phone, website: f.website });
    if (!ok) {
      setStatus("idle");
      return setError("Couldn't sign you up — please try again.");
    }
    track("generate_lead", { method: "subscribe" });
    setStatus("done");
  }

  return (
    <div className={`subscribe glass${compact ? " compact" : ""}`}>
      <div>
        <p className="eyebrow">On WhatsApp</p>
        <h3>Monthly offers &amp; beauty trends</h3>
        <p className="muted small">
          One message a month from {site.name} — this month&apos;s offer and the latest trends. Reply STOP anytime.
        </p>
      </div>
      {status === "done" ? (
        <p className="lead-title" role="status">You&apos;re in! Watch for our next message on WhatsApp.</p>
      ) : (
        <form className="lead-form" onSubmit={submit} noValidate>
          <label>
            <span className="sr-only">Name</span>
            <input name="name" autoComplete="name" placeholder="Name (optional)" />
          </label>
          <label>
            <span className="sr-only">WhatsApp number</span>
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="WhatsApp number" />
          </label>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
          <button type="submit" className="btn btn-dark" disabled={status === "sending"}>
            {status === "sending" ? "Joining…" : "Join"}
          </button>
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>
      )}
    </div>
  );
}
