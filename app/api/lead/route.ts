// Receives booking requests and enquiries from the website.
// If LEAD_WEBHOOK_URL is set, each lead is forwarded there as JSON — e.g. a Google Apps Script
// that appends a row to a Google Sheet (see README), a Zapier/Make hook, or a CRM.

import { NextResponse } from "next/server";

type Lead = {
  name?: string;
  phone?: string;
  service?: string;
  branch?: string;
  date?: string;
  time?: string;
  message?: string;
  page?: string;
  website?: string; // honeypot — real visitors never fill this
};

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Bots fill every field; pretend success so they don't retry.
  if (body.website) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 20).replace(/[^\d+]/g, "");
  if (!name || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ ok: false, error: "Please enter your name and a valid phone number." }, { status: 400 });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name,
    phone,
    branch: clean(body.branch, 100),
    service: clean(body.service, 100),
    date: clean(body.date, 20),
    time: clean(body.time, 20),
    message: clean(body.message, 1000),
    page: clean(body.page, 200),
    source: req.headers.get("referer") ?? "",
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.log("New lead (LEAD_WEBHOOK_URL not set):", lead);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("Failed to forward lead", err, lead);
    return NextResponse.json({ ok: true, stored: false });
  }
}
