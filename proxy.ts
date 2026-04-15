import { NextRequest, NextResponse } from "next/server";

// Paths that are always allowed through, even during shutdown
const ALLOWED_PREFIXES = [
  "/shutdown",
  "/api/auth",
  "/api/beta-check",
  "/api/beta-logout",
  "/api/beta-config",
  "/_next",
  "/favicon.ico",
  "/Media",
  "/GreenLogo.png",
];

function unauthorizedResponse(): NextResponse {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Dashboard"',
    },
  });
}

async function getIsShutdown(request: NextRequest): Promise<boolean> {
  // Fast path: env var override (set in Vercel project settings)
  if (process.env.SITE_SHUTDOWN === "true") return true;

  // Slow path: check DB via internal API route (supports runtime toggle from admin panel)
  try {
    const configUrl = new URL("/api/beta-config", request.url);
    const res = await fetch(configUrl.toString(), {
      signal: AbortSignal.timeout(300),
      headers: { "Cache-Control": "no-store" },
    });
    if (res.ok) {
      const data = (await res.json()) as { isShutdown?: boolean };
      return data.isShutdown === true;
    }
  } catch {
    // Fall back to env var only if API is unreachable
  }

  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Attach pathname as a header so server-component layouts can read it
  // (e.g. to bypass the shutdown notice for /admin routes).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // ── Shutdown gate ───────────────────────────────────────────────────────────
  // Always allow static assets, auth, and beta-flow paths through
  const isAllowed = ALLOWED_PREFIXES.some((p) => pathname.startsWith(p));

  if (!isAllowed) {
    const isShutdown = await getIsShutdown(request);

    if (isShutdown) {
      // Admin routes remain accessible even during shutdown (guarded by Basic Auth below)
      const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

      if (!isAdmin) {
        // Check for valid beta session cookie
        const betaSession = request.cookies.get("beta_access");
        if (betaSession?.value !== "granted") {
          return NextResponse.rewrite(new URL("/shutdown", request.url));
        }
      }
    }
  }

  // ── HTTP Basic Auth guard for admin routes in production ───────────────────
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    const username = process.env.ADMIN_DASHBOARD_USERNAME;
    const password = process.env.ADMIN_DASHBOARD_PASSWORD;

    if (!username || !password) {
      // Credentials not configured — fall through to client-side login form.
      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Basic ")) {
      return unauthorizedResponse();
    }

    const encoded = authHeader.slice("Basic ".length);
    let decoded = "";
    try {
      decoded = atob(encoded);
    } catch {
      return unauthorizedResponse();
    }
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex < 0) {
      return unauthorizedResponse();
    }

    const providedUser = decoded.slice(0, separatorIndex);
    const providedPass = decoded.slice(separatorIndex + 1);

    if (providedUser !== username || providedPass !== password) {
      return unauthorizedResponse();
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Run on all routes so every layout can read x-pathname
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
