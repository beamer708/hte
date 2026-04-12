import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

async function getIsShutdown(request: NextRequest): Promise<boolean> {
  // Fast path: env var override (set in Vercel project settings)
  if (process.env.SITE_SHUTDOWN === "true") return true;

  // Slow path: check DB via internal API route (supports runtime toggle from admin panel)
  try {
    const configUrl = new URL("/api/beta-config", request.url);
    const res = await fetch(configUrl.toString(), {
      signal: AbortSignal.timeout(300),
      // Bypass any cache so we always get fresh state
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow static assets and required auth paths
  const isAllowed = ALLOWED_PREFIXES.some((p) => pathname.startsWith(p));
  if (isAllowed) return NextResponse.next();

  const isShutdown = await getIsShutdown(request);
  if (!isShutdown) return NextResponse.next();

  // Check for valid beta session cookie
  const betaSession = request.cookies.get("beta_access");
  if (betaSession?.value === "granted") return NextResponse.next();

  // Admin routes remain accessible even during shutdown
  if (pathname.startsWith("/admin")) return NextResponse.next();

  return NextResponse.redirect(new URL("/shutdown", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
