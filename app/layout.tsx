import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { site } from "@/lib/site";
import { SITE_TITLE, OG_BANNER } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

// Two font files only: one light serif weight for headings and the variable Jost for text.
const display = Cormorant_Garamond({ subsets: ["latin"], weight: "300", variable: "--font-display" });
const body = Jost({ subsets: ["latin"], variable: "--font-body" });

// Applies a saved light/dark choice before the first paint (no flash of the wrong theme).
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: SITE_TITLE,
    template: `%s | ${site.brand}`,
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
    title: SITE_TITLE,
    description: site.description,
    images: [OG_BANNER],
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: site.description, images: [OG_BANNER] },
  robots: { index: true, follow: true },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#141216" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
