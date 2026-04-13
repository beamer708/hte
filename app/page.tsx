import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { NAV } from "@/lib/site-structure";

import ScrollAnimator from "@/components/ScrollAnimator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <ScrollAnimator />

      {/* ── HERO — visible on load, no animate-on-scroll ──────────────────── */}
      <section className="relative overflow-hidden gradient-bg-hero section-grid-overlay pt-10 pb-14 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32">
        <div className="page-container relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex items-center justify-center gap-4">
              <Image
                src="/GreenLogo.png"
                alt=""
                width={64}
                height={64}
                className="opacity-95"
              />
            </div>
            <span className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              Free and independent.
            </span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
              Everything your community needs. Nothing in the way.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              @howtoerlc organizes curated resources, tools, and guidance for ERLC communities in one place — so your team can find what they need and move forward.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href={NAV.resources.href} className="btn-primary">
                <Icon name="book" className="text-lg" />
                Enter Vault
              </Link>
              <Link
                href={NAV.resources.href}
                className="btn-secondary"
              >
                Get resource suggestions
                <Icon name="arrow-right" className="text-base" />
              </Link>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["Curated Library", "Tools, guides, and references in one place"],
                ["Fast Discovery", "Find the right resource stack in minutes"],
                ["Execution Focused", "Built for owners and management teams"],
              ].map((item) => (
                <div key={item[0]} className="surface-panel rounded-xl px-4 py-3 text-left">
                  <p className="text-sm font-semibold text-foreground">{item[0]}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: How It Works ───────────────────────────────────────── */}
      <section className="section-spacing" aria-labelledby="how-it-works-heading">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2
              id="how-it-works-heading"
              className="section-heading animate-on-scroll"
            >
              How It Works
            </h2>
            <p className="section-subheading mx-auto animate-on-scroll">
              Three steps. No guesswork.
            </p>
          </div>
          <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "Browse the Vault",
                body: "Explore curated resources organized by category, ready to use immediately.",
              },
              {
                num: "02",
                title: "Apply It to Your Server",
                body: "Take what fits your structure and implement it with confidence.",
              },
              {
                num: "03",
                title: "Grow With Clarity",
                body: "Build consistently using proven organization and presentation principles.",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="animate-on-scroll rounded-2xl border border-border bg-card p-8"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <span className="step-num block text-5xl font-bold leading-none">
                  {step.num}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Inside the Vault ──────────────────────────────────── */}
      <section className="section-spacing" aria-labelledby="inside-vault-heading">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2
              id="inside-vault-heading"
              className="section-heading animate-on-scroll"
            >
              Inside the Vault
            </h2>
            <p className="section-subheading mx-auto animate-on-scroll">
              A curated look at what @howtoerlc organizes for you.
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Branding",
                body: "Fonts, color systems, and visual identity frameworks.",
              },
              {
                title: "Discord Structure",
                body: "Channel layouts, role hierarchies, and server organization templates.",
              },
              {
                title: "Server Growth",
                body: "Consistency guides, presentation principles, and community systems.",
              },
              {
                title: "Design Tools",
                body: "Curated professional tools used by leading ERLC communities.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="animate-on-scroll rounded-xl border border-border bg-card p-6"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="text-base font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={NAV.resources.href} className="btn-primary animate-on-scroll">
              <Icon name="book" className="text-lg" />
              Enter Vault
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXISTING: A cleaner way to run your resource stack ────────────── */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading animate-on-scroll">
              A cleaner way to run your resource stack
            </h2>
            <p className="section-subheading mx-auto animate-on-scroll">
              The Resource Vault is a curated library of ERLC tools, guides, and references organized by category. One place for your team to find what they need and execute.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3">
            {[
              {
                title: "Curated Intelligence",
                description: "Server setup, branding, management, and growth resources sorted by real operational needs.",
                icon: "book" as const,
              },
              {
                title: "Assistant Workflow",
                description: "Describe your target outcome and get a tailored stack of resources you can use immediately.",
                icon: "sparkles" as const,
              },
              {
                title: "Team-Ready Structure",
                description: "Built for owners, staff, and creators with a structure that reduces guesswork and overlap.",
                icon: "users" as const,
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="gradient-border gradient-card card-hover-lift rounded-2xl p-8 animate-in-fade"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon name={card.icon} className="text-2xl" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-foreground/70 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXISTING: What big communities do differently ─────────────────── */}
      <section className="section-spacing">
        <div className="page-container relative">
          <div className="surface-panel mx-auto max-w-5xl rounded-3xl px-8 py-10 sm:px-12 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr] lg:items-center">
              <div>
                <h2 className="section-heading animate-on-scroll">
                  What big communities do differently
                </h2>
                <p className="section-subheading animate-on-scroll">
                  They do not rely on hidden secrets. They rely on systems. @howtoerlc helps you access the same public resources through a clear, organized structure.
                </p>
                <Link
                  href={NAV.resources.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors animate-on-scroll"
                >
                  Start exploring
                  <Icon name="arrow-right" className="text-base" />
                </Link>
              </div>
              <div className="grid gap-3">
                {[
                  "One source of truth for your team",
                  "Reduced decision fatigue and duplicate effort",
                  "Faster onboarding for staff and creators",
                ].map((line, i) => (
                  <div
                    key={line}
                    className="animate-on-scroll rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-sm text-muted-foreground"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXISTING: Support and status ──────────────────────────────────── */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="mx-auto max-w-6xl rounded-3xl border border-border/70 bg-card/75 p-8 sm:p-12">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl animate-on-scroll">
                  Support and status
                </h2>
                <p className="mt-2 max-w-md text-muted-foreground animate-on-scroll">
                  Join our Discord for help, check status and updates, or read community guides.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link href={NAV.support.href} className="btn-secondary animate-on-scroll">
                  Support
                </Link>
                <Link href={NAV.status.href} className="btn-ghost animate-on-scroll" style={{ transitionDelay: "60ms" }}>
                  Status
                </Link>
                <a
                  href="https://discord.gg/HjcqH2djjC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary animate-on-scroll"
                  style={{ transitionDelay: "120ms", display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-label="Discord" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path fill="#5865F2" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.132 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Community Stats ────────────────────────────────────── */}
      <section className="section-spacing" aria-labelledby="stats-heading">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 id="stats-heading" className="section-heading animate-on-scroll">
              Built for the Community
            </h2>
          </div>
          <div className="mx-auto max-w-3xl grid gap-10 sm:grid-cols-3 text-center">
            {[
              { number: "500+", label: "Resources Curated", delay: 0 },
              { number: "120+", label: "Servers Helped", delay: 120 },
              { number: "1", label: "Community. Zero Chaos.", delay: 240 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="animate-on-scroll is-scale"
                style={{ transitionDelay: `${stat.delay}ms` }}
              >
                <p className="text-6xl font-bold tracking-tight text-foreground">
                  {stat.number}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXISTING: Ready to build your community? ──────────────────────── */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,217,115,0.06),transparent_55%)]" aria-hidden />
            <h2 className="relative text-2xl font-bold tracking-tight text-foreground sm:text-3xl animate-on-scroll">
              Ready to build your community?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground animate-on-scroll">
              Explore the vault and get the resources that help successful ERLC servers grow.
            </p>
            <div className="relative mt-8">
              <Link href={NAV.resources.href} className="btn-primary animate-on-scroll">
                <Icon name="book" className="text-lg" />
                Enter Vault
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
