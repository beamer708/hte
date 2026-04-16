import ScrollAnimator from "@/components/ScrollAnimator";

const DESIGN_TOOLS = [
  {
    name: "Adobe Illustrator",
    category: "Vector Design",
    label: "Paid" as const,
    description:
      "The industry standard for vector based design. Ideal for creating logos, icons, server banners, and any graphic that needs to scale cleanly at any size. Vectors stay sharp whether displayed at 16px or 1600px making Illustrator the right tool for brand identity work.",
    href: "https://adobe.com/products/illustrator",
  },
  {
    name: "Adobe Photoshop",
    category: "Photo Editing and Raster Design",
    label: "Paid" as const,
    description:
      "The go-to tool for livery design, texture work, and any design that involves photo manipulation or raster based artwork. If you are building ERLC liveries, custom overlays, or detailed scene compositions, Photoshop is where that work gets done.",
    href: "https://adobe.com/products/photoshop",
  },
];

export default function ToolsPage() {
  if (COMING_SOON) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-10">
          <i className="fi fi-sr-rocket" style={{ fontSize: "48px", color: "#52D973" }} aria-hidden />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            Tools — Coming Soon
          </h1>
          <p className="mx-auto mt-3 leading-relaxed text-muted-foreground">
            We&apos;re still setting things up. Tools will be available when howtoerlc launches.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-20">
      <ScrollAnimator />
      <div className="page-container max-w-4xl">

        {/* Page header */}
        <div className="mb-14 animate-on-scroll">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tools
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The best tools for designing, developing, and building your ERLC server or project.
            Curated by @howtoerlc.
          </p>
        </div>

        {/* Design section */}
        <section className="mb-10">
          <h2
            className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground animate-on-scroll"
            style={{ transitionDelay: "50ms" }}
          >
            Design
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {DESIGN_TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                className="relative rounded-2xl border border-border/70 bg-card/75 p-7 animate-on-scroll"
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                {/* Free / Paid badge */}
                <span
                  className={
                    tool.label === "Paid"
                      ? "absolute right-5 top-5 rounded-full border border-border/60 bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      : "absolute right-5 top-5 rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                  }
                >
                  {tool.label}
                </span>

                <div className="pr-14">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70">
                    {tool.category}
                  </p>
                  <h3 className="text-base font-semibold text-foreground">{tool.name}</h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>

                <div className="mt-6">
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card focus:outline-none focus:ring-2 focus:ring-accent/25"
                  >
                    Visit
                    <i className="fi fi-br-arrow-up-right" style={{ fontSize: "14px", color: "currentColor" }} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coming soon */}
        <div
          className="animate-on-scroll rounded-xl border border-border/50 bg-card/40 px-7 py-6"
          style={{ transitionDelay: "300ms" }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground">More Coming Soon</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground/70">
            Development tools, server management resources, and community building guides are
            being added to this page.
          </p>
        </div>

      </div>
    </div>
  );
}
