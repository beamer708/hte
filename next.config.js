/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; connect-src 'self'; font-src 'self' data: https://cdn.jsdelivr.net; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
  },
  // DISCORD_WEBHOOK_URL is intentionally NOT listed here so it is never
  // exposed to the client. It is only read server-side from .env.local
  // (which is gitignored). Keep the webhook URL in .env.local only.
  //
  // Required server-side environment variables for Discord OAuth2 (never expose to client):
  //   DISCORD_CLIENT_ID
  //   DISCORD_CLIENT_SECRET
  //   DISCORD_GUILD_ID
  //   ADMIN_ROLE_ID
  //   NEXTAUTH_SECRET
  //   NEXTAUTH_URL   (set to your canonical deployment URL, e.g. https://yourdomain.com)
};

module.exports = nextConfig;
