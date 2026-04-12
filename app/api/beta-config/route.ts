import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Returns the current shutdown state from the database.
// This is called by middleware on every request to support runtime toggle.
export async function GET() {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { key: "site_shutdown" },
    });
    const isShutdown = config?.value === "true";
    return NextResponse.json({ isShutdown });
  } catch {
    // If DB is unreachable, fall back to the env var
    const isShutdown = process.env.SITE_SHUTDOWN === "true";
    return NextResponse.json({ isShutdown });
  }
}
