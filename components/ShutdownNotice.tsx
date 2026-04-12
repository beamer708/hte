import Image from "next/image";

export default function ShutdownNotice() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center py-14">
        <div className="relative w-full rounded-3xl border border-border bg-card p-8 sm:p-10">
          <div className="text-center">
            {/* Brand */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Image
                src="/GreenLogo.png"
                alt="@howtoerlc"
                width={24}
                height={24}
                className="opacity-90"
              />
              <span className="text-sm font-medium tracking-[0.14em] uppercase text-muted-foreground">
                @howtoerlc
              </span>
            </div>

            {/* Status badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <i className="fi fi-sr-lock" style={{ fontSize: "11px" }} aria-hidden />
              Scheduled maintenance
            </span>

            {/* Main lock icon */}
            <div className="flex justify-center mt-6 mb-2">
              <i
                className="fi fi-sr-lock"
                style={{ fontSize: "64px", color: "#52D973" }}
                aria-hidden
              />
            </div>

            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Website Temporarily Unavailable
            </h1>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
              @howtoerlc is temporarily offline while scheduled maintenance and platform improvements
              are completed. Access will be restored as soon as updates are finalized.
            </p>
          </div>

          <div className="mt-7 rounded-2xl border border-border/70 bg-background/55 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              For live maintenance progress and announcements, use the links below.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://discord.gg/HjcqH2djjC"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <i className="fi fi-br-comment-alt" style={{ fontSize: "18px" }} aria-hidden />
              Join Discord
            </a>
            <a
              href="https://howtoerlcstatus.betteruptime.com/maintenance"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              View status
              <i className="fi fi-br-arrow-up-right" style={{ fontSize: "14px" }} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
