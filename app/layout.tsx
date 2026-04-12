import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import ShutdownNotice from "@/components/ShutdownNotice";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "howtoerlc",
  description: "A curated resource vault built for ERLC communities that mean business.",
  keywords: ["ERLC", "Roblox", "roleplay", "community", "resources", "guides"],
  icons: {
    icon: "/GreenLogo.png",
    shortcut: "/GreenLogo.png",
    apple: "/GreenLogo.png",
  },
  openGraph: {
    title: "howtoerlc",
    siteName: "@howtoerlc",
    description: "A curated resource vault built for ERLC communities that mean business.",
    type: "website",
    images: ["/GreenLogo.png"],
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
        {/* Flaticon UIcons — Bold Rounded (UI elements, nav, buttons) */}
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css"
        />
        {/* Flaticon UIcons — Solid Rounded (active states, status, emphasis) */}
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
        />
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
