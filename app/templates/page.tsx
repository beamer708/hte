import { Download, ExternalLink } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="page-container max-w-3xl">

        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Templates
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Source file templates for designing in ERLC. Choose the option that fits your skill level and available software.
          </p>
        </div>

        <div className="flex flex-col gap-6">

          {/* Advanced Designers — Adobe Illustrator */}
          <div className="rounded-2xl border border-border/70 bg-card/75 p-7 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Download className="h-5 w-5 text-accent" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">ERLC Brand Template</h2>
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    Advanced
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A full Adobe Illustrator source file for experienced designers. Includes all brand elements, layers, and assets ready for customization.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/v4faygo-dot/UnityTemplates-/releases/download/v1.0.0/ERLC.Brand.Template.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    <Download className="h-4 w-4" strokeWidth={1.8} />
                    Download .ai File
                  </a>
                </div>

                {/* Affinity alternative */}
                <div className="mt-5 rounded-xl border border-border/50 bg-background/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Don&apos;t have Adobe Illustrator?
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    <a
                      href="https://www.affinity.studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      Affinity Designer
                    </a>{" "}
                    is a one-time purchase alternative to Adobe Illustrator that can open and edit <span className="font-medium text-foreground">.ai</span> files. No subscription required.
                  </p>
                  <a
                    href="https://www.affinity.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors focus:outline-none"
                  >
                    Visit Affinity Studio
                    <ExternalLink className="h-3 w-3" strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Beginner — Canva */}
          <div className="rounded-2xl border border-border/70 bg-card/75 p-7 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <ExternalLink className="h-5 w-5 text-accent" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">ERLC Brand Template</h2>
                  <span className="inline-flex items-center rounded-full bg-border/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    Canva
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A Canva-based template for designers who prefer a browser-based editor. No software installation needed — just open and start designing.
                </p>
                <div className="mt-5">
                  <a
                    href="https://www.canva.com/design/DAHE87sTIaQ/mx72VJV9Yq5czIGEygUcIw/edit?utm_content=DAHE87sTIaQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card focus:outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
                    Open in Canva
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
