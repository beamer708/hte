import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import ShutdownNotice from "@/components/ShutdownNotice";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import LoadingScreen from "@/components/LoadingScreen";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export const metadata: Metadata = {
  title: "Unity — Everything your community needs.",
  description: "Unity is a free, independent resource platform for ERLC communities. Curated guides, tools, and frameworks. No account required.",
  keywords: ["ERLC", "Roblox", "roleplay", "community", "resources", "guides", "Discord"],
  icons: {
    icon: "/ULogo.svg",
    shortcut: "/ULogo.svg",
    apple: "/ULogo.svg",
    other: [{ rel: "icon", url: "/ULogo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Unity — Everything your community needs.",
    description: "Free, independent resources for ERLC communities. Guides, tools, and frameworks. Nothing in the way.",
    type: "website",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;500&display=swap" />
      </head>
      <body className="antialiased">
        {!isShutdown && <LoadingScreen />}
        <AnnouncementBanner />
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
