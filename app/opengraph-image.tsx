import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.brand} – Unisex Salon in Manikonda, Hyderabad`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview image shown when the site is shared on WhatsApp, Instagram, Facebook etc.
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0b0b0b", color: "#fff" }}>
        <div style={{ fontSize: 30, letterSpacing: 8, color: "#c59d5f" }}>{`SINCE ${site.since}`}</div>
        <div style={{ fontSize: 110, fontWeight: 700, letterSpacing: 4, marginTop: 10 }}>UNISALON</div>
        <div style={{ fontSize: 30, letterSpacing: 10, color: "#c59d5f" }}>BY SHASHI</div>
        <div style={{ fontSize: 40, marginTop: 40 }}>Unisex Salon · Alkapur Township, Manikonda</div>
        <div style={{ fontSize: 28, marginTop: 16, opacity: 0.75 }}>Haircuts · Styling · Hair Spa · Colour · Beauty · Bridal</div>
        <div style={{ display: "flex", marginTop: 44, background: "#c59d5f", color: "#0b0b0b", padding: "14px 30px", fontSize: 28, fontWeight: 700, alignSelf: "flex-start" }}>
          BOOK ONLINE · OPEN 9 AM – 9 PM
        </div>
      </div>
    ),
    size,
  );
}
