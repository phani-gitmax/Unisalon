"use client";

import Script from "next/script";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Sends an event to Google Analytics 4 (if configured). Use GA4 → Reports → Engagement → Events
// to count monthly leads: generate_lead, click_call, click_whatsapp, click_directions.
export function track(event: string, params: Record<string, string> = {}) {
  window.gtag?.("event", event, params);
}

export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}

// A link that records a GA event when clicked (calls, WhatsApp, directions).
export function TrackedLink({ event, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { event: string }) {
  return <a {...props} onClick={() => track(event)} />;
}
