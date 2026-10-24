// Sends a lead to /api/lead (which forwards it to the Google Sheet). `keepalive` lets the
// request finish even if the visitor leaves the page straight after tapping.
export type LeadType = "booking" | "callback" | "subscribe";

export function sendLead(type: LeadType, fields: Record<string, string | undefined>) {
  return fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, ...fields, page: window.location.pathname }),
    keepalive: true,
  })
    // stored: false means the lead never reached the Sheet — say so instead of a false "thank you".
    .then(async (r) => r.ok && (await r.json().catch(() => ({}))).stored !== false)
    .catch(() => false);
}

export const validPhone = (phone: string) => phone.replace(/\D/g, "").length >= 10;
