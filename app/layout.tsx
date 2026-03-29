import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Truthcore AI — Fact-check any viral video in seconds",
  description:
    "Paste a TikTok, Instagram, or YouTube link. Truthcore extracts every claim and verifies each one with real sources. Launching April 28, 2026.",
  openGraph: {
    title: "Truthcore AI — Stop sharing lies you didn't check.",
    description:
      "AI-powered fact-checking for viral videos. Launching April 28, 2026. Join the waitlist for 30 days Pro free.",
    url: "https://truthcore.ai",
    siteName: "Truthcore AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Truthcore AI — Stop sharing lies you didn't check.",
    description:
      "AI fact-checking for TikTok, Instagram & YouTube. Launching April 28.",
    creator: "@TruthcoreAI",
  },
  metadataBase: new URL("https://truthcore.ai"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
