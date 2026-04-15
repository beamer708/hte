import { NextRequest, NextResponse } from "next/server";

// Paths that bypass the shutdown gate entirely
const ALLOWED_PREFIXES = [
  "/shutdown",
  "/api/site-auth",
  "/api/auth",
  "/api/beta-check",
  "/api/beta-logout",
  "/api/beta-config",
  "/_next",
  "/favicon.ico",
  "/GreenLogo.png",
  "/opengraph-image",
  "/Media",
];

function unauthorizedResponse(): NextResponse {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Dashboard"' },
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Forward pathname as a header so server-component layouts can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Static / auth paths always pass through
  const isAllowed = ALLOWED_PREFIXES.some((p) => pathname.startsWith(p));
  if (isAllowed) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Admin routes — apply Basic Auth in production
  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (isAdmin) {
    if (process.env.NODE_ENV === "production") {
      const username = process.env.ADMIN_DASHBOARD_USERNAME;
      const password = process.env.ADMIN_DASHBOARD_PASSWORD;
      if (username && password) {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Basic ")) return unauthorizedResponse();
        let decoded = "";
        try {
          decoded = atob(authHeader.slice("Basic ".length));
        } catch {
          return unauthorizedResponse();
        }
        const sep = decoded.indexOf(":");
        if (sep < 0) return unauthorizedResponse();
        if (decoded.slice(0, sep) !== username || decoded.slice(sep + 1) !== password) {
          return unauthorizedResponse();
        }
      }
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // If site is not in coming-soon/shutdown mode, pass through normally
  if (process.env.SITE_SHUTDOWN !== "true") {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Check for valid password access cookie
  const siteAccess = request.cookies.get("site_access");
  if (siteAccess?.value === "granted") {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // No access — rewrite to show the coming soon / password page without changing the URL
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = "/shutdown";
  return NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
