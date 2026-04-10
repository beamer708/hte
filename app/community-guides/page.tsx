import Link from "next/link";
import Icon from "@/components/Icon";
import { guides } from "@/lib/guides";

export default function CommunityGuidesPage() {
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
