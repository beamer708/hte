import Link from "next/link";
import Icon from "@/components/Icon";
import { STATUS_URL } from "@/lib/site-structure";

export default function SupportPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-12">
          <h1 className="section-heading">Support</h1>
          <p className="section-subheading mt-3">
            Get help, join the community, or find guides and legal information.
          </p>
        </div>

        <div className="space-y-6">
          <a
            href="https://discord.gg/HjcqH2djjC"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card/80 p-6 transition-all hover:border-primary/35 hover:bg-card-hover"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" aria-label="Discord" aria-hidden="true">
                <path fill="#5865F2" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.132 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Discord</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Join the @howtoerlc Discord for community support, updates, and discussion.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Join server
                <Icon name="up-right-from-square" className="text-xs" />
              </span>
            </div>
          </a>

          <Link
            href="/community-guides"
            className="group block rounded-2xl border border-border bg-card/80 p-6 transition-all hover:border-primary/35 hover:bg-card-hover flex items-start gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon name="book" className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Community Guides</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                High-level guidance and frameworks for building ERLC communities.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                View guides
                <Icon name="arrow-right" className="text-xs" />
              </span>
            </div>
          </Link>

          <Link
            href="/staff-application"
            className="group block rounded-2xl border border-border bg-card/80 p-6 transition-all hover:border-primary/35 hover:bg-card-hover flex items-start gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon name="users" className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Staff Application</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Interested in helping run @howtoerlc? Apply to join the team.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Apply
                <Icon name="arrow-right" className="text-xs" />
              </span>
            </div>
          </Link>

          <Link
            href="/resource-suggestion"
            className="group block rounded-2xl border border-border bg-card/80 p-6 transition-all hover:border-primary/35 hover:bg-card-hover flex items-start gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon name="sparkles" className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Suggest a Resource</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Recommend a resource to add to @howtoerlc. Suggestions go to Discord for discussion and approval.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Submit suggestion
                <Icon name="arrow-right" className="text-xs" />
              </span>
            </div>
          </Link>

          <Link
            href="/legal"
            className="group block rounded-2xl border border-border bg-card/80 p-6 transition-all hover:border-primary/35 hover:bg-card-hover flex items-start gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon name="document" className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Legal</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Terms of use, privacy, and other legal information.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read
                <Icon name="arrow-right" className="text-xs" />
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-12 rounded-xl border border-border/60 bg-card/80 p-6">
          <h3 className="font-semibold text-foreground">Status and uptime</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Check service status and incident history on our status page.
          </p>
          <a
            href={STATUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
          >
            Open status page
            <Icon name="up-right-from-square" className="text-sm" />
          </a>
        </div>
      </div>
    </div>
  );
}
