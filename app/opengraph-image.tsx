import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.brand} – Unisex Salon in Manikonda, Hyderabad`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview image shown when the site is shared on WhatsApp, Instagram, Facebook etc.
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, background: "#f8f5f0", color: "#1a1a1a", fontFamily: "serif" }}>
        <div style={{ fontSize: 26, letterSpacing: 8, color: "#b08d57" }}>{`UNISEX SALON · SINCE ${site.since}`}</div>
        <div style={{ fontSize: 120, fontWeight: 300, marginTop: 16 }}>Unisalon</div>
        <div style={{ fontSize: 46, fontStyle: "italic", color: "#b08d57" }}>Your vibe. Your style.</div>
        <div style={{ fontSize: 32, marginTop: 40, color: "#6e6a64" }}>Alkapur Township, Manikonda, Hyderabad</div>
        <div style={{ display: "flex", marginTop: 40, background: "#1a1a1a", color: "#fff", padding: "16px 32px", fontSize: 24, letterSpacing: 4, alignSelf: "flex-start" }}>
          BOOK ONLINE · OPEN 9 AM – 9 PM
        </div>
      </div>
    ),
    size,
  );
}
