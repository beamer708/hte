import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import "./globals.css";
// Flaticon UIcons — served from node_modules (no CSP issues, no external CDN dependency)
import "@flaticon/flaticon-uicons/css/bold/rounded.css";
import "@flaticon/flaticon-uicons/css/solid/rounded.css";
import "@flaticon/flaticon-uicons/css/regular/rounded.css";
import MainLayout from "@/components/MainLayout";
import ShutdownNotice from "@/components/ShutdownNotice";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "howtoerlc — Coming Soon",
  description: "A completely free course showing everyone how to design, run a server, and more. Coming soon.",
  keywords: ["ERLC", "Roblox", "roleplay", "community", "resources", "guides"],
  icons: {
    icon: "/GreenLogo.png",
    shortcut: "/GreenLogo.png",
    apple: "/GreenLogo.png",
  },
  openGraph: {
    title: "@howtoerlc",
    siteName: "@howtoerlc",
    description: "Coming soon — a completely free course showing everyone how to design, run a server, and more.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "@howtoerlc",
    description: "Coming soon — a completely free course showing everyone how to design, run a server, and more.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  // /admin routes remain accessible even when the main site is shut down
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/auth");
  const isShutdown =
    !isAdminRoute &&
    (process.env.NEXT_PUBLIC_SITE_SHUTDOWN === "true" ||
      process.env.NEXT_PUBLIC_SITE_SHUTDOWN === "1");
  const shouldTrackAnalytics = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,500&display=swap" />
      </head>
      <body className="antialiased">
        {!isShutdown && <LoadingScreen />}
        {isShutdown ? <ShutdownNotice /> : <MainLayout>{children}</MainLayout>}
        {!isShutdown && shouldTrackAnalytics ? (
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
        ) : null}
      </body>
    </html>
  );
}
