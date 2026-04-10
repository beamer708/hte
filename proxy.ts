import { NextRequest, NextResponse } from "next/server";

function unauthorizedResponse(): NextResponse {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Dashboard"',
    },
  });
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Attach pathname as a header so server-component layouts can read it
  // (e.g. to bypass the shutdown notice for /admin routes).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // HTTP Basic Auth guard for /admin routes in production
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
