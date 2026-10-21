import type { Metadata, Viewport } from "next";
import { Montserrat, Mrs_Saint_Delafield } from "next/font/google";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const body = Montserrat({ subsets: ["latin"], variable: "--font-body" });
const script = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-script" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} – Unisex Salon in Manikonda, Hyderabad`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "salon in Manikonda",
    "unisex salon Manikonda",
    "salon in Alkapur Township",
    "beauty parlour Manikonda",
    "haircut Manikonda",
    "hair spa Manikonda",
    "Shashi's Unisex Salon",
    "salon near Gachibowli",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.brand,
    title: `${site.brand} – Unisex Salon in Manikonda, Hyderabad`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = { themeColor: "#0b0b0b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${body.variable} ${script.variable}`}>
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
