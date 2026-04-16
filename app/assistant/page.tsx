"use client";

import Icon from "@/components/Icon";

export default function AssistantPage() {
  return (
    <div className="flex min-h-screen flex-col py-10 sm:py-14">
      <div className="page-container flex max-w-3xl flex-1 flex-col">
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Icon name="chatbot" className="text-2xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">@howtoerlc Assistant</h1>
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Structured guidance for ERLC community building.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-xs text-muted-foreground">
            Scoped to: Discord server setup · Graphic design · Web design · Server management
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 flex-col rounded-3xl border border-border/70 bg-card/75">
          {/* Empty state — coming soon */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon name="chatbot" className="text-3xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">The assistant is coming soon.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  We&apos;re still building this. Check back when howtoerlc launches.
                </p>
              </div>
            </div>
          </div>

          {/* Input — permanently disabled */}
          <div className="border-t border-border/60 p-3 sm:p-4">
            <div className="flex items-end gap-2">
              <textarea
                placeholder="Coming soon…"
                rows={1}
                disabled
                className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
                style={{ minHeight: "44px", maxHeight: "160px" }}
              />
              <button
                disabled
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-background disabled:pointer-events-none disabled:opacity-40"
                aria-label="Send"
              >
                <i className="fi fi-br-paper-plane" style={{ fontSize: "16px", color: "currentColor" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
