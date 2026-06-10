import type { Metadata, Viewport } from "next";
import { Sora, Hanken_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import SiteShell from "@/components/SiteShell";
import QuickActions from "@/components/QuickActions";
import AmbientGlow from "@/components/AmbientGlow";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.category}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "inquiry system",
    "lead qualification",
    "lead tracking",
    "follow-up system",
    "Nepal",
  ],
  authors: [{ name: site.name }],
  // Static assets from /public (no dynamic image/icon routes).
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    title: `${site.name} · ${site.category}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.category}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#04050A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${hanken.variable}`}>
      <body>
        <JsonLd />
        <SiteShell>{children}</SiteShell>
        {/* Painted above the opaque section backgrounds (corner-only, ultra-low
            opacity) but below the navbar / floating button (higher z-index). */}
        <AmbientGlow />
        {/* Single floating assistant button — opens audit / demo / WhatsApp. */}
        <QuickActions />
      </body>
    </html>
  );
}
