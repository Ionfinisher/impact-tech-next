import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "../globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cookies } from "next/headers";
import { AppSidebar } from "@/components/AppSidebar";
import { RouteGuard } from "@/components/RouteGuard";
import { SiteHeader } from "@/components/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.impacttechfrica.com/admin"),
  title: {
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
    description: "Impact Tech Management App",
    url: "https://www.impacttechfrica.com.com/app",
    siteName: "Impact Tech - App",
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
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <RouteGuard redirectTo="/login">
      <TooltipProvider>
        <SidebarProvider
          defaultOpen={defaultOpen}
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors />
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </RouteGuard>
  );
}
