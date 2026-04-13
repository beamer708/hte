"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Resource } from "@/lib/resources";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="section-rule-label">{label}</span>
      <div className="h-px flex-1 bg-border/60" />
    </div>
  );
}

function matchesQuery(query: string, ...fields: (string | undefined)[]): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return fields.some((f) => f && f.toLowerCase().includes(q));
}

interface ResourcesClientProps {
  resources: Resource[];
}

export default function ResourcesClient({ resources }: ResourcesClientProps) {
  const [query, setQuery] = useState("");

  const filteredResources = useMemo(
    () =>
      resources.filter((r) =>
        matchesQuery(query, r.title, r.description, r.category, r.channelName)
      ),
    [query, resources]
  );

  const isFiltering = query.trim().length > 0;

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-[1200px]">

        {/* Page header */}
        <div className="mb-14 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Resource Vault
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A curated collection of ERLC resources organized by type.
          </p>
        </div>

        {/* AI Chat CTA */}
        <div className="mb-10 flex items-center gap-4 rounded-lg border border-border/60 bg-card px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background">
            <i className="fi fi-br-magic-wand" style={{ fontSize: "16px", color: "var(--accent)" }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">Not sure where to start?</p>
            <p className="text-xs text-muted-foreground">Describe what you need and our AI assistant will suggest the right resources.</p>
          </div>
          <Link
            href="/resource-chat"
            className="shrink-0 rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-white/5"
          >
            Ask AI
          </Link>
        </div>

        {/* Search bar */}
        <div className="mb-14 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <i
              className="fi fi-br-search absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ fontSize: "16px", color: "var(--muted-foreground)" }}
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-border focus:outline-none focus:ring-2 focus:ring-accent/25 transition-colors"
              aria-label="Search resources"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30"
                aria-label="Clear search"
              >
                <i className="fi fi-br-cross" style={{ fontSize: "14px", color: "currentColor" }} aria-hidden />
              </button>
            )}
          </div>
          {isFiltering && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {filteredResources.length} result{filteredResources.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* No results */}
        {isFiltering && filteredResources.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-base text-muted-foreground">
              No resources matched{" "}
              <span className="text-foreground">&ldquo;{query}&rdquo;</span>.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-sm text-accent hover:text-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 rounded"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Video Resources */}
        {filteredResources.length > 0 && (
          <section aria-labelledby="section-video">
            <SectionHeader label="Video Resources" />
            <div
              id="section-video"
              className="grid gap-5 sm:grid-cols-2"
            >
              {filteredResources.map((resource) => (
                <YouTubeResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
