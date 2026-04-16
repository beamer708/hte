import Link from "next/link";
import Icon from "@/components/Icon";
import { guides } from "@/lib/guides";

// Set to false to re-enable the guides page
const COMING_SOON = true;

export default function CommunityGuidesPage() {
  if (COMING_SOON) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-10">
          <i className="fi fi-sr-rocket" style={{ fontSize: "48px", color: "#52D973" }} aria-hidden />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            Helpful Guides — Coming Soon
          </h1>
          <p className="mx-auto mt-3 leading-relaxed text-muted-foreground">
            We&apos;re still setting things up. Guides will be available when howtoerlc launches.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-5xl">
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon name="books" className="text-2xl" />
          </div>
          <h1 className="section-heading">Helpful Guides</h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Practical, structured guides for building and operating ERLC communities. Each guide is written for server owners and community managers.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={guide.href}
              className="group rounded-2xl border border-border bg-card/85 p-6 transition-all hover:border-primary/40 hover:bg-card-hover"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon name={guide.icon} className="text-xl" />
              </div>
              <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {guide.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open guide
                <Icon name="arrow-right" className="text-xs" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/resources" className="btn-primary">
            <Icon name="book" className="text-base" />
            Open Resource Vault
          </Link>
          <a
            href="https://discord.gg/HjcqH2djjC"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Icon name="discord" className="text-base" />
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
}
