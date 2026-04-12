import Image from "next/image";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

const errorMessages: Record<string, string> = {
  no_access: "You don't have the required beta role in the Discord server.",
  not_in_guild: "Your account is not a member of the @howtoerlc Discord server.",
  blacklisted: "Your account has been removed from the beta program.",
  not_logged_in: "Please log in with Discord to request access.",
  discord_error: "Could not verify your Discord roles. Please try again.",
  config_error: "Beta access is not configured yet. Contact an admin.",
  auth_error: "Authentication failed. Please try again.",
  no_discord_id: "Could not retrieve your Discord ID. Please try again.",
};

export default async function ShutdownPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const errorMessage = error ? (errorMessages[error] ?? "Access denied.") : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 text-foreground">
      {/* Background grid — matches global body::before */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,240,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,245,240,0.03) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center py-14">
        <div className="relative w-full rounded-3xl border border-border bg-card p-8 sm:p-10">
          {/* Badge */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <i className="fi fi-sr-lock" style={{ fontSize: "11px" }} />
              Private Beta
            </span>

            <Image
              src="/GreenLogo.png"
              alt="@howtoerlc"
              width={86}
              height={86}
              className="mx-auto mt-5 opacity-95"
              priority
            />

            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Site Under Maintenance
            </h1>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
              @howtoerlc is currently in a private beta. The site is only accessible to approved
              testers. Log in with Discord to check your access.
            </p>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
              <i className="fi fi-sr-cross-circle mt-0.5 shrink-0" style={{ fontSize: "14px", color: "#E24B4A" }} />
              {errorMessage}
            </div>
          )}

          {/* Info panel */}
          <div className="mt-7 rounded-2xl border border-border/70 bg-background/55 p-4">
            <p className="text-center text-sm text-muted-foreground">
              Beta access requires the designated role in the @howtoerlc Discord server.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* Discord OAuth sign-in — redirects to beta-check after auth */}
            <a
              href="/api/auth/signin/discord?callbackUrl=/api/beta-check"
              className="btn-primary w-full sm:w-auto"
            >
              <i className="fi fi-br-user" style={{ fontSize: "14px" }} />
              Login with Discord
            </a>

            <a
              href="https://discord.gg/HjcqH2djjC"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              Join Discord
              <i className="fi fi-br-arrow-up-right" style={{ fontSize: "12px" }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
