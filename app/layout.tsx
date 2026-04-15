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
  metadataBase: new URL("https://howtoerlc.xyz"),
  title: {
    default: "howtoerlc — Free ERLC Tutorials & Courses",
    template: "%s | howtoerlc",
  },
  description:
    "howtoerlc is the free learning resource for Emergency Response: Liberty County (ERLC) on Roblox. Learn how to design, run, and grow an ERLC server — completely free.",
  keywords: [
    "howtoerlc",
    "ERLC",
    "Emergency Response Liberty County",
    "ERLC tutorial",
    "ERLC guide",
    "ERLC server",
    "ERLC course",
    "ERLC free course",
    "how to ERLC",
    "ERLC Roblox",
    "ERLC roleplay",
    "ERLC server design",
    "ERLC server setup",
    "learn ERLC",
    "Roblox ERLC guide",
    "Liberty County Roblox",
    "ERLC tips",
    "ERLC community",
  ],
  icons: {
    icon: "/GreenLogo.png",
    shortcut: "/GreenLogo.png",
    apple: "/GreenLogo.png",
  },
  openGraph: {
    title: "howtoerlc — Free ERLC Tutorials & Courses",
    siteName: "howtoerlc",
    description:
      "The free learning resource for Emergency Response: Liberty County (ERLC). Courses on server design, roleplay, and more. Coming soon.",
    type: "website",
    url: "https://howtoerlc.xyz",
  },
  twitter: {
    card: "summary",
    title: "howtoerlc — Free ERLC Tutorials & Courses",
    description:
      "The free learning resource for Emergency Response: Liberty County (ERLC). Courses on server design, roleplay, and more. Coming soon.",
  },
  alternates: {
    canonical: "https://howtoerlc.xyz",
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
