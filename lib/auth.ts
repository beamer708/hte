/**
 * DISCORD OAUTH2 CONFIGURATION
 *
 * REDIRECT URI — the exact URI below MUST be registered in the Discord Developer Portal:
 *   Application → OAuth2 → Redirects
 *
 *   {NEXTAUTH_URL}/api/auth/callback/discord
 *
 * Example (production):  https://howtoerlc.com/api/auth/callback/discord
 * Example (development):  http://localhost:3000/api/auth/callback/discord
 *
 * Required environment variables (server-side only — never expose to client):
 *   DISCORD_CLIENT_ID          — OAuth2 application client ID
 *   DISCORD_CLIENT_SECRET      — OAuth2 application client secret
 *   DISCORD_GUILD_ID           — @howtoerlc Discord server ID
 *   DISCORD_ADMIN_ROLE_ID      — Role ID required to access the admin panel (1485445645270515825)
 *   DISCORD_BETA_TESTER_ID     — User ID always granted access (1485237738277175457)
 *   BETA_ROLE_ID               — Role ID that grants beta site access during shutdown
 *   NEXTAUTH_SECRET            — Random secret for signing NextAuth tokens
 *   NEXTAUTH_URL               — Canonical deployment URL (must match redirect URI base)
 */

import type { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Hard-coded beta tester — granted access regardless of guild role.
const BETA_TESTER_ID = process.env.DISCORD_BETA_TESTER_ID ?? "1485237738277175457";

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          // identify + guilds.members.read allows guild member role lookups via the user token.
          // Beta role verification uses the bot token in /api/beta-check instead.
          scope: "identify guilds.members.read",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      try {
        const userId = (profile as { id?: string })?.id ?? account?.providerAccountId ?? "";

        // Hard-coded bypass — always grant access regardless of role.
        if (userId === BETA_TESTER_ID) return true;

        const guildId = process.env.DISCORD_GUILD_ID;
        if (!guildId) return true; // Config not complete — let downstream routes gate access

        const guildMemberRes = await fetch(
          `https://discord.com/api/users/@me/guilds/${guildId}/member`,
          {
            headers: {
              Authorization: `Bearer ${account?.access_token}`,
            },
          }
        );

        if (!guildMemberRes.ok) {
          // Not in the guild — redirect based on what they were trying to do.
          // Admin panel: deny. Beta flow (callbackUrl=/api/beta-check): also deny at this step.
          return "/shutdown?error=not_in_guild";
        }

        const member = (await guildMemberRes.json()) as { roles: string[] };

        const adminRoleId =
          process.env.DISCORD_ADMIN_ROLE_ID ??
          process.env.ADMIN_ROLE_ID ?? // legacy fallback
          "1485445645270515825";

        const betaRoleId = process.env.BETA_ROLE_ID ?? "";

        const hasAdminRole = member.roles.includes(adminRoleId);
        const hasBetaRole = betaRoleId ? member.roles.includes(betaRoleId) : false;

        // Allow through if they have either role.
        // /api/beta-check will do the definitive bot-token verification for beta.
        // Admin panel pages check for admin role separately.
        if (hasAdminRole || hasBetaRole) return true;

        return "/shutdown?error=no_access";
      } catch (err) {
        console.error("Discord role check failed:", err);
        return "/shutdown?error=auth_error";
      }
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow relative redirects and same-origin redirects
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/shutdown",
    error: "/shutdown",
  },
};
