import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const BASE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("/shutdown?error=not_logged_in", BASE_URL));
  }

  const discordId = (session.user as { id?: string })?.id ?? "";
  const username = session.user?.name ?? "Unknown";
  const avatarUrl = session.user?.image ?? null;

  if (!discordId) {
    return NextResponse.redirect(new URL("/shutdown?error=no_discord_id", BASE_URL));
  }

  // Check blacklist first
  const blacklisted = await prisma.betaBlacklist.findUnique({
    where: { discordId },
  });

  if (blacklisted) {
    await prisma.betaLog.create({
      data: { discordId, username, accessGranted: false, reason: "blacklisted" },
    });
    return NextResponse.redirect(new URL("/shutdown?error=blacklisted", BASE_URL));
  }

  // Check guild membership and beta role via bot token
  const guildId = process.env.DISCORD_GUILD_ID;
  const betaRoleId = process.env.BETA_ROLE_ID;
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!guildId || !betaRoleId || !botToken) {
    // Config not complete — deny access
    await prisma.betaLog.create({
      data: { discordId, username, accessGranted: false, reason: "server_config_incomplete" },
    });
    return NextResponse.redirect(new URL("/shutdown?error=config_error", BASE_URL));
  }

  let hasRole = false;
  try {
    const memberRes = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/${discordId}`,
      {
        headers: { Authorization: `Bot ${botToken}` },
      }
    );

    if (memberRes.ok) {
      const member = (await memberRes.json()) as { roles: string[] };
      hasRole = member.roles.includes(betaRoleId);
    } else if (memberRes.status === 404) {
      // User is not in the guild
      hasRole = false;
    } else {
      console.error("Discord API error:", memberRes.status, await memberRes.text());
    }
  } catch (err) {
    console.error("Beta role check failed:", err);
    await prisma.betaLog.create({
      data: { discordId, username, accessGranted: false, reason: "discord_api_error" },
    });
    return NextResponse.redirect(new URL("/shutdown?error=discord_error", BASE_URL));
  }

  if (!hasRole) {
    await prisma.betaLog.create({
      data: { discordId, username, accessGranted: false, reason: "no_beta_role" },
    });
    return NextResponse.redirect(new URL("/shutdown?error=no_access", BASE_URL));
  }

  // Grant access — log the tester and set the cookie
  await Promise.all([
    prisma.betaLog.create({
      data: { discordId, username, accessGranted: true },
    }),
    prisma.betaTester.upsert({
      where: { discordId },
      update: { username, avatarUrl, lastSeen: new Date() },
      create: { discordId, username, avatarUrl },
    }),
  ]);

  const response = NextResponse.redirect(
    new URL(req.nextUrl.searchParams.get("callbackUrl") ?? "/", BASE_URL)
  );

  response.cookies.set("beta_access", "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
