import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Icon from "@/components/Icon";
import ScrollAnimator from "@/components/ScrollAnimator";
import { resources, getYouTubeThumbnail } from "@/lib/resources";

const SECTIONS = [
  {
    title: "Logo Design Fundamentals",
    description: "Core principles every logo designer should know.",
    ids: ["16", "17"],
  },
  {
    title: "Branding & Visual Identity",
    description: "Understand how your logo fits into a broader brand system.",
    ids: ["19", "21", "22"],
  },
  {
    title: "ERLC & Roleplay Server Logos",
    description: "Hands-on tutorials made specifically for ERLC and roleplay server logos.",
    ids: ["23", "24", "27"],
  },
];

const DESIGN_TOOLS = [
  {
    name: "Adobe Illustrator",
    useCase: "Vector logo construction",
    label: "Paid" as const,
    description:
      "The primary tool for professional logo design. Every element you build in Illustrator is vector based meaning your logo will scale to any size without losing quality. Use this for your final logo file.",
    href: "https://adobe.com/products/illustrator",
  },
  {
    name: "Adobe Photoshop",
    useCase: "Logo mockups and texture overlays",
    label: "Paid" as const,
    description:
      "While not a vector tool, Photoshop is useful for presenting your logo in context. Use it to place your logo onto server banners, liveries, or mockup templates to see how it reads in a real setting.",
    href: "https://adobe.com/products/photoshop",
  },
  {
    name: "Figma",
    useCase: "Logo concepting and layout",
    label: "Free" as const,
    description:
      "A strong starting point for sketching logo concepts and testing layout before moving to Illustrator. Figma's vector tools are capable enough for early stage logo work and the free plan covers everything you need.",
    href: "https://figma.com",
  },
  {
    name: "Canva",
    useCase: "Quick logo concepts and font pairing",
    label: "Free" as const,
    description:
      "Useful for exploring font combinations and basic mark ideas quickly. Not recommended for final logo production but a solid tool for testing visual directions before committing to a full build.",
    href: "https://canva.com",
  },
  {
    name: "Google Fonts",
    useCase: "Free typography for logo wordmarks",
    label: "Free" as const,
    description:
      "A library of free, high quality fonts suitable for logo wordmarks. Search for geometric sans-serif fonts as a starting point. Every font on Google Fonts is free for commercial use.",
    href: "https://fonts.google.com",
  },
  {
    name: "Coolors",
    useCase: "Logo color palette building",
    label: "Free" as const,
    description:
      "Generate and lock color palettes for your logo in seconds. Use it to find your primary color and neutral combination before starting any design work. Exporting hex codes directly into Illustrator or Figma takes seconds.",
    href: "https://coolors.co",
  },
];

// Resource IDs pulled from the vault that directly apply to logo design and brand identity.
// Excludes IDs already shown in the video sections above (16, 17, 19, 21, 22, 23, 24, 27).
const CURATED_RESOURCE_IDS = [
  "1",   // Minimal Logo Design playlist
  "20",  // How to build a brand in 7mins
  "26",  // How to make a Logo animated
  "30",  // How Brands Use Design & Marketing to Control Your Mind
  "36",  // Logo Lab - Logo Testing Tool
  "33",  // Font Joy - Font Pairing
  "34",  // Fonts In Use - Typography Inspiration
  "7",   // DaFont Free - Fonts and Typography
  "8",   // ColorHunt - Color Palettes
  "9",   // Picular - Color Tools
  "11",  // Behance - Design Inspiration
  "32",  // Designercize - Design Brief Generator
  "47",  // Cosmos - Visual Moodboard
];

const CURATED_DESCRIPTIONS: Record<string, string> = {
  "1": "A playlist covering minimal logo design principles and clean, professional logo creation techniques.",
  "20": "A fast-paced walkthrough on brand building fundamentals and what makes a brand stick.",
  "26": "Tutorial covering how to create an animated logo for FiveM, Discord, and roleplay servers.",
  "30": "An in-depth look at how design, psychology, and visual strategy shape brand perception.",
  "36": "Test your logo against real-world conditions including scalability, contrast, and legibility.",
  "33": "AI-powered font pairing tool for finding complementary typefaces for logos and branding.",
  "34": "Curated archive of real-world font usage across branding and print for typography reference.",
  "7": "Font library and typography resource for logos, branding, and server visuals.",
  "8": "Curated color palette tool for building cohesive brand color systems.",
  "9": "Color discovery tool for finding palette directions based on words and concepts.",
  "11": "Professional design portfolio platform for logo, brand, and visual identity inspiration.",
  "32": "Random design brief generator for practicing logo and branding design skills.",
  "47": "Visual moodboarding tool for collecting and organizing brand references and inspiration.",
};

function getResourceTypeLabel(type: string, section: string): string {
  if (section === "youtube" || type === "video") return "Video";
  if (type === "tool") return "Tool";
  if (type === "guide") return "Guide";
  return "Website";
}

function getVideoIdFromUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : "";
}

function VideoCard({ id }: { id: string }) {
  const r = resources.find((res) => res.id === id);
  if (!r) return null;
  const thumbnail = r.thumbnailUrl || getYouTubeThumbnail(r.url);

  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card-hover"
    >
      {thumbnail && (
        <div className="shrink-0 w-28 sm:w-36 overflow-hidden rounded-lg bg-[#0d0d0d]">
          <img
            src={thumbnail}
            alt={r.title}
            className="h-full w-full object-cover aspect-video"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {r.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{r.channelName || r.creator}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
          Watch
          <Icon name="up-right-from-square" className="text-xs" />
        </span>
      </div>
    </a>
  );
}

export default function LogoDesignGuidePage() {
  const curatedResources = CURATED_RESOURCE_IDS
    .map((id) => resources.find((r) => r.id === id))
    .filter(Boolean);

  return (
    <div className="py-12 sm:py-16">
      <ScrollAnimator />
      <div className="page-container max-w-4xl">
        {/* Header */}
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon name="palette" className="text-2xl" />
          </div>
          <h1 className="section-heading">Guide: Logo Design</h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Resources to help you design a professional logo for your ERLC server — from design
            fundamentals to hands-on tutorials.
          </p>
        </div>

        {/* Quick steps */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/85 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="book" className="text-base" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">1. Learn the basics</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Understand logo principles, shapes, and composition.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/85 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="sparkles" className="text-base" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">2. Build your brand</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Learn how logos fit into a broader visual identity.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/85 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="video-camera" className="text-base" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">3. Make your logo</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Follow ERLC-specific tutorials to create your design.
            </p>
          </div>
        </div>

        {/* Video sections */}
        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-6 rounded-2xl border border-border bg-card/85 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
            <div className="mt-4 grid gap-3">
              {section.ids.map((id) => (
                <VideoCard key={id} id={id} />
              ))}
            </div>
          </div>
        ))}

        {/* Tip */}
        <div className="mb-12 rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm text-foreground/80">
          <p className="inline-flex items-center gap-2 font-medium text-foreground">
            <Icon name="info" className="text-sm text-primary" />
            Design tip
          </p>
          <p className="mt-1">
            Start simple — a strong logo works in black and white before adding color. Once your
            shape is solid, layer in your server&apos;s color palette.
          </p>
        </div>

        {/* ── TOOLS FOR LOGO DESIGN ──────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="mb-6 animate-on-scroll">
            <h2 className="text-2xl font-semibold text-foreground">Tools for Logo Design</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Every tool listed here serves a specific purpose in the logo design process.
              Use the right tool for the right job.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {DESIGN_TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                className="relative rounded-2xl border border-border/70 bg-card/75 p-6 animate-on-scroll"
                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
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
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70">
                    {tool.useCase}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-foreground">{tool.name}</h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>

                <div className="mt-5">
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card focus:outline-none focus:ring-2 focus:ring-accent/25"
                  >
                    Visit
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CURATED RESOURCES ─────────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="mb-6 animate-on-scroll">
            <h2 className="text-2xl font-semibold text-foreground">Curated Resources</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Resources from the Unity library that apply directly to logo design
              and brand identity work.
            </p>
          </div>

          {curatedResources.length === 0 ? (
            /* Placeholder if no resources found */
            <div className="rounded-xl border border-border/50 bg-card/40 px-6 py-8 text-center animate-on-scroll">
              <p className="text-sm text-muted-foreground">
                More curated resources coming soon. Check the{" "}
                <Link href="/resources" className="text-accent hover:underline">
                  full resource library
                </Link>{" "}
                for the latest additions.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {curatedResources.map((r, i) => {
                if (!r) return null;
                const videoId = getVideoIdFromUrl(r.url);
                const thumbnail = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : null;
                const typeLabel = getResourceTypeLabel(r.type, r.section);
                const description = CURATED_DESCRIPTIONS[r.id] || r.description;
                const isVideo = r.section === "youtube";

                return (
                  <div
                    key={r.id}
                    className="flex flex-col rounded-2xl border border-border/70 bg-card/75 overflow-hidden animate-on-scroll"
                    style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                  >
                    {/* Thumbnail for videos */}
                    {isVideo && thumbnail && (
                      <div className="aspect-video w-full overflow-hidden bg-[#0d0d0d]">
                        <img
                          src={thumbnail}
                          alt={r.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-5">
                      {/* Badges */}
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        <span className="rounded-full border border-border/60 bg-background px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                          {typeLabel}
                        </span>
                        <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                          Curated Resource
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold leading-snug text-foreground">
                        {r.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                        {description}
                      </p>

                      <div className="mt-4">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card focus:outline-none focus:ring-2 focus:ring-accent/25"
                        >
                          {isVideo ? "Watch" : "Visit"}
                          <ExternalLink className="h-3 w-3" strokeWidth={1.8} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── KEY PRINCIPLES ────────────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="mb-6 animate-on-scroll">
            <h2 className="text-2xl font-semibold text-foreground">Key Principles</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              What separates a strong logo from a weak one.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Simplicity",
                body: "The strongest logos work at any size and in any context. If your logo breaks at small sizes, it needs to be simplified.",
              },
              {
                title: "Scalability",
                body: "Design in vectors from the start. A logo that only works at one size is not a logo, it is an illustration.",
              },
              {
                title: "Legibility",
                body: "Your wordmark must be readable at a glance. Test it at 32 pixels before calling it done.",
              },
              {
                title: "Color Discipline",
                body: "Limit your logo to two colors maximum. It must also work in full black and full white before color is applied.",
              },
              {
                title: "Consistency",
                body: "A logo only works when it is used consistently. One version, one set of colors, one set of sizes applied everywhere.",
              },
            ].map((principle, i) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-border/70 bg-card/75 p-5 animate-on-scroll"
                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
              >
                <h3 className="text-sm font-semibold text-foreground">{principle.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link href="/community-guides" className="btn-ghost">
            <Icon name="arrow-right" className="text-base" />
            Back to guides
          </Link>
          <Link href="/resources" className="btn-primary">
            <Icon name="book" className="text-base" />
            Open Resource Vault
          </Link>
        </div>
      </div>
    </div>
  );
}
