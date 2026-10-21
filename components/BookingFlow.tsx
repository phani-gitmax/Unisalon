"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { site, services, allItems, branchAddress } from "@/lib/site";
import { track } from "./Analytics";

type Picked = { name: string; price: string; category: string };

const toMinutes = (slot: string) => {
  const [, h, m, ap] = slot.match(/(\d+):(\d+)\s*(AM|PM)/i)!;
  return ((Number(h) % 12) + (ap.toUpperCase() === "PM" ? 12 : 0)) * 60 + Number(m);
};

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function findInitial(initial?: string): { category: string; item?: Picked } {
  if (!initial) return { category: services[0].slug };
  const bySlug = services.find((s) => s.slug === initial);
  if (bySlug) return { category: bySlug.slug };
  for (const s of services) {
    const i = allItems(s).find((x) => x.name === initial);
    if (i) return { category: s.slug, item: { ...i, category: s.name } };
  }
  return { category: services[0].slug };
}

function Step({
  n,
  current,
  onEdit,
  title,
  summary,
  children,
}: {
  n: number;
  current: number;
  onEdit: (n: number) => void;
  title: string;
  summary?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`bf-step ${current === n ? "open" : ""} ${current > n ? "complete" : ""}`} aria-current={current === n ? "step" : undefined}>
      <header>
        <span className="bf-num">{current > n ? "✓" : n}</span>
        <div>
          <h2>{title}</h2>
          {current !== n && summary && <p>{summary}</p>}
        </div>
        {current > n && (
          <button type="button" className="bf-change" onClick={() => onEdit(n)}>
            Change
          </button>
        )}
      </header>
      {current === n && <div className="bf-body">{children}</div>}
    </section>
  );
}

export function BookingFlow({ initialService }: { initialService?: string }) {
  const start = useMemo(() => findInitial(initialService), [initialService]);
  const [category, setCategory] = useState(start.category);
  const [item, setItem] = useState<Picked | undefined>(start.item);
  const [branchId, setBranchId] = useState<string>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();
  const [step, setStep] = useState(start.item ? 2 : 1);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const branch = site.branches.find((b) => b.id === branchId);
  const days = useMemo(() => {
    const out: { iso: string; top: string; day: string }[] = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      out.push({
        iso: iso(d),
        top: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" }),
        day: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      });
    }
    return out;
  }, []);
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const isToday = date === iso(now);
  const dateLabel = days.find((d) => d.iso === date);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (!f.name.trim()) return setError("Please enter your name.");
    if (f.phone.replace(/\D/g, "").length < 10) return setError("Please enter a valid 10-digit mobile number.");
    if (!item || !branch || !date || !time) return setError("Please complete all steps.");
    setError("");

    const lead = { name: f.name, phone: f.phone, message: f.message, website: f.website, service: item.name, branch: branch.name, date, time };
    // Save the lead without waiting, so WhatsApp opens straight from the tap
    // (browsers block pop-ups opened after an await).
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, page: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});

    const text = [
      `Hi ${site.name}! I'd like to book:`,
      `• ${item.name} (${item.price})`,
      `• ${branch.name}`,
      `• ${dateLabel?.top} ${dateLabel?.day}, ${time}`,
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      f.message && `Note: ${f.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    track("generate_lead", { service: item.name, branch: branch.id, method: "booking_flow" });
    setDone(true);
  }

  if (done && item && branch) {
    return (
      <div className="bf-done" role="status">
        <div className="bf-check">✓</div>
        <h2>Almost done — tap send on WhatsApp</h2>
        <p>We&apos;ve opened WhatsApp with your booking. Send the message and we&apos;ll confirm your slot shortly.</p>
        <div className="bf-summary">
          <div><span>Service</span>{item.name} · {item.price}</div>
          <div><span>Branch</span>{branch.name}</div>
          <div><span>When</span>{dateLabel?.top} {dateLabel?.day}, {time}</div>
        </div>
        <p className="small">
          WhatsApp didn&apos;t open? Call <a href={`tel:${branch.phone}`}>{branch.phoneDisplay}</a>.
        </p>
        <Link href="/" className="btn btn-line">Back to home</Link>
      </div>
    );
  }

  const current = services.find((s) => s.slug === category)!;

  return (
    <div className="bf">
      <p className="bf-progress">Step {step} of 4</p>

      <Step n={1} current={step} onEdit={setStep} title="Choose a service" summary={item && `${item.name} · ${item.price}`}>
        <div className="bf-tabs" role="tablist">
          {services.map((s) => (
            <button key={s.slug} type="button" role="tab" aria-selected={s.slug === category} className={s.slug === category ? "active" : ""} onClick={() => setCategory(s.slug)}>
              {s.name}
            </button>
          ))}
        </div>
        <ul className="bf-list">
          {allItems(current).map((i) => (
            <li key={i.name}>
              <button
                type="button"
                className={item?.name === i.name ? "selected" : ""}
                onClick={() => {
                  setItem({ ...i, category: current.name });
                  setStep(2);
                }}
              >
                <span>{i.name}</span>
                <strong>{i.price}</strong>
              </button>
            </li>
          ))}
        </ul>
      </Step>

      <Step n={2} current={step} onEdit={setStep} title="Choose a branch" summary={branch?.name}>
        <div className="bf-branches">
          {site.branches.map((b) => (
            <button
              key={b.id}
              type="button"
              className={branchId === b.id ? "selected" : ""}
              onClick={() => {
                setBranchId(b.id);
                setStep(3);
              }}
            >
              <strong>{b.name}</strong>
              <span>{branchAddress(b)}</span>
            </button>
          ))}
        </div>
      </Step>

      <Step n={3} current={step} onEdit={setStep} title="Pick a day & time" summary={date && time ? `${dateLabel?.top} ${dateLabel?.day}, ${time}` : undefined}>
        <div className="bf-days">
          {days.map((d) => (
            <button
              key={d.iso}
              type="button"
              className={date === d.iso ? "selected" : ""}
              onClick={() => {
                setDate(d.iso);
                setTime(undefined);
              }}
            >
              <span>{d.top}</span>
              <strong>{d.day}</strong>
            </button>
          ))}
        </div>
        {date ? (
          <div className="bf-times">
            {site.timeSlots.map((t) => {
              const past = isToday && toMinutes(t) < nowMinutes + 30;
              return (
                <button
                  key={t}
                  type="button"
                  disabled={past}
                  className={time === t ? "selected" : ""}
                  onClick={() => {
                    setTime(t);
                    setStep(4);
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="small">Choose a day to see available times.</p>
        )}
      </Step>

      <Step n={4} current={step} onEdit={setStep} title="Your details">
        <form onSubmit={submit} className="bf-form">
          <label>
            Name
            <input name="name" autoComplete="name" placeholder="Your name" />
          </label>
          <label>
            Mobile / WhatsApp
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" />
          </label>
          <label>
            <span>
              Note <span className="optional">(optional)</span>
            </span>
            <input name="message" placeholder="Preferred stylist, occasion…" />
          </label>
          {/* Honeypot for spam bots — hidden from people */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-gold btn-block">Confirm on WhatsApp</button>
          <p className="small center">No payment now · Free to change or cancel</p>
        </form>
      </Step>
    </div>
  );
}
