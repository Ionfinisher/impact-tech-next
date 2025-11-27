import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.impacttechfrica.com.com"),
  title: {
    title: "Impact Tech",
    default: "Impact Tech",
    template: "%s | Impact Tech",
  },
  icons: {
    icon: "/favicons/android-chrome-192x192.png",
    shortcut: "/favicons/android-chrome-192x192.png",
    apple: "/favicons/android-chrome-192x192.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicons/apple-touch-icon.png",
    },
  },
  authors: [
    {
      name: "Teddy ASSIH",
      url: "https://www.linkedin.com/in/teddy-assih-b4204b254/",
    },
  ],
  description:
    "Simplifiez vos projets de construction, d'architecture, d'électricité et du numérique avec Impact Tech ✅.",
  keywords: [
    "architecture",
    "BTC",
    "construction",
    "technologie",
    "életricité",
    "bâtiment",
    "application",
    "web",
    "mobile",
    "logiciel",
  ],
  openGraph: {
    title: "Impact Tech",
    description:
      "Simplifiez vos projets de construction, d'architecture, d'électricité et du numérique avec Impact Tech ✅.",
    url: "https://www.impacttechfrica.com.com",
    siteName: "Impact Tech",
    images: [
      {
        url: "/images/og_image.png",
        width: 2530,
        height: 1148,
      },
    ],
    locale: "fr-FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Impact Tech",
    card: "summary_large_image",
    description:
      "Simplifiez vos projets de construction, d'architecture, d'électricité et du numérique avec Impact Tech ✅.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${bricolage.variable}`}>{children}</body>
    </html>
  );
}
