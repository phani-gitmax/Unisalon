import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Unisex Salon in Manikonda, Hyderabad | Haircut, Facial, Keratin, Bridal`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "salon in Manikonda",
    "unisex salon Manikonda",
    "beauty parlour Manikonda",
    "haircut Manikonda",
    "keratin treatment Manikonda",
    "bridal makeup Manikonda",
    "salon near Gachibowli",
    "salon Hyderabad",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} – Unisex Salon in Manikonda, Hyderabad`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // TODO: paste the verification code from Google Search Console (HTML tag method)
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: "#0f4c4a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <MobileBar />
        <Analytics />
      </body>
    </html>
  );
}
