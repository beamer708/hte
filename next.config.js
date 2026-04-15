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
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://api.fontshare.com; img-src 'self' data: https:; connect-src 'self'; font-src 'self' data: https://api.fontshare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
  },
  // Server-side environment variables — NEVER listed in publicRuntimeConfig
  // or NEXT_PUBLIC_ so they are never exposed to the browser bundle.
  //
  // Required variables (see .env.example for full list):
  //   DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET
  //   DISCORD_GUILD_ID, DISCORD_ADMIN_ROLE_ID, DISCORD_BETA_TESTER_ID
  //   DISCORD_SUGGESTION_WEBHOOK, DISCORD_APPLICATION_WEBHOOK, DISCORD_WEBHOOK_URL
  //   ANTHROPIC_API_KEY
  //   NEXTAUTH_SECRET
  //   NEXTAUTH_URL   (must match the base URL of the Discord redirect URI)
};

module.exports = nextConfig;
