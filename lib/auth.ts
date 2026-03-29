import type { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

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
    async signIn({ account }) {
      try {
        const guildMemberRes = await fetch(
          `https://discord.com/api/users/@me/guilds/${process.env.DISCORD_GUILD_ID}/member`,
          {
            headers: {
              Authorization: `Bearer ${account?.access_token}`,
            },
          }
        );

        if (!guildMemberRes.ok) return "/admin/analytics?error=no_permission";

        const member = await guildMemberRes.json() as { roles: string[] };
        const hasRole = member.roles.includes(process.env.ADMIN_ROLE_ID!);

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
