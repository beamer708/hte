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
              <i className="fi fi-sr-rocket" style={{ fontSize: "11px" }} aria-hidden />
              Coming Soon
            </span>

            {/* Main icon */}
            <div className="flex justify-center mt-6 mb-2">
              <i
                className="fi fi-sr-rocket"
                style={{ fontSize: "64px", color: "#52D973" }}
                aria-hidden
              />
            </div>

            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              howtoerlc — Coming Soon
            </h1>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
              We&apos;re currently building a team to make this project happen. howtoerlc will be a
              completely free course showing everyone how to design, run a server, and more.
            </p>
          </div>

          <div className="mt-7 rounded-2xl border border-border/70 bg-background/55 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Join our Discord to stay up to date and be the first to know when we launch.
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
              <svg viewBox="0 0 24 24" width="20" height="20" aria-label="Discord" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path fill="#52D973" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.132 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
