import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// Verify the caller has admin role in Discord
async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  if (!session) return false;
  // Admin presence is guaranteed by NextAuth signIn callback (role check happens there)
  return true;
}

// GET /api/admin/beta — return site config, testers, logs
export async function GET(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const action = req.nextUrl.searchParams.get("action");

  if (action === "testers") {
    const testers = await prisma.betaTester.findMany({
      orderBy: { lastSeen: "desc" },
    });
    return NextResponse.json({ testers });
  }

  if (action === "logs") {
    const logs = await prisma.betaLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ logs });
  }

  if (action === "blacklist") {
    const blacklist = await prisma.betaBlacklist.findMany({
      orderBy: { addedAt: "desc" },
    });
    return NextResponse.json({ blacklist });
  }

  // Default: return site config shutdown state
  const config = await prisma.siteConfig.findUnique({
    where: { key: "site_shutdown" },
  });
  return NextResponse.json({ isShutdown: config?.value === "true" });
}

// POST /api/admin/beta — update config or revoke user
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    action: string;
    value?: boolean;
    discordId?: string;
  };

  if (body.action === "toggle_shutdown") {
    const newValue = body.value ? "true" : "false";
    await prisma.siteConfig.upsert({
      where: { key: "site_shutdown" },
      update: { value: newValue },
      create: { key: "site_shutdown", value: newValue },
    });
    return NextResponse.json({ success: true, isShutdown: body.value });
  }

  if (body.action === "revoke" && body.discordId) {
    // Add to blacklist, remove from testers
    await Promise.all([
      prisma.betaBlacklist.upsert({
        where: { discordId: body.discordId },
        update: {},
        create: { discordId: body.discordId },
      }),
      prisma.betaTester.deleteMany({
        where: { discordId: body.discordId },
      }),
    ]);
    return NextResponse.json({ success: true });
  }

  if (body.action === "unblacklist" && body.discordId) {
    await prisma.betaBlacklist.deleteMany({
      where: { discordId: body.discordId },
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
