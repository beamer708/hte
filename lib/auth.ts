/**
 * DISCORD OAUTH2 CONFIGURATION
 *
 * REDIRECT URI — the exact URI below MUST be registered in the Discord Developer Portal:
 *   Application → OAuth2 → Redirects
 *
 *   {NEXTAUTH_URL}/api/auth/callback/discord
 *
 * Example (production):  https://unityvault.xyz/api/auth/callback/discord
 * Example (development):  http://localhost:3000/api/auth/callback/discord
 *
 * Required environment variables (server-side only — never expose to client):
 *   DISCORD_CLIENT_ID          — OAuth2 application client ID
 *   DISCORD_CLIENT_SECRET      — OAuth2 application client secret
 *   DISCORD_GUILD_ID           — Unity Discord server ID
 *   DISCORD_ADMIN_ROLE_ID      — Role ID required to access the admin panel (1485445645270515825)
 *   DISCORD_BETA_TESTER_ID     — User ID always granted access (1485237738277175457)
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

        // Beta tester bypass — always grant access regardless of role.
        if (userId === BETA_TESTER_ID) return true;

        const guildMemberRes = await fetch(
          `https://discord.com/api/users/@me/guilds/${process.env.DISCORD_GUILD_ID}/member`,
          {
            headers: {
              Authorization: `Bearer ${account?.access_token}`,
            },
          }
        );

        if (!guildMemberRes.ok) return "/admin/analytics?error=no_permission";

        const member = (await guildMemberRes.json()) as { roles: string[] };
        const adminRoleId =
          process.env.DISCORD_ADMIN_ROLE_ID ??
          process.env.ADMIN_ROLE_ID ?? // legacy fallback
          "1485445645270515825";
        const hasRole = member.roles.includes(adminRoleId);

        if (!hasRole) return "/admin/analytics?error=no_permission";

        return true;
      } catch (err) {
        console.error("Discord role check failed:", err);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/analytics",
    error: "/admin/analytics",
  },
};
