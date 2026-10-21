import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} – ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview image shown when the site is shared on WhatsApp, Instagram, Facebook etc.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0f4c4a 0%, #1b6b67 60%, #c9a46a 100%)",
          color: "#fff",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700 }}>unisalon</div>
        <div style={{ fontSize: 44, marginTop: 16 }}>Unisex Salon in Manikonda, Hyderabad</div>
        <div style={{ fontSize: 30, marginTop: 32, opacity: 0.85 }}>Haircuts · Colour · Keratin · Facials · Nails · Bridal</div>
        <div style={{ fontSize: 30, marginTop: 48, background: "#fff", color: "#0f4c4a", padding: "14px 28px", borderRadius: 999, alignSelf: "flex-start" }}>
          Book online or on WhatsApp
        </div>
      </div>
    ),
    size,
  );
}
