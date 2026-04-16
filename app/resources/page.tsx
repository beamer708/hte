import { resources, Resource } from "@/lib/resources";
import { fetchOEmbed } from "@/lib/oembed";
import ResourcesClient from "./ResourcesClient";

// Set to false to re-enable the resources page
const COMING_SOON = true;

export default async function ResourcesPage() {
  if (COMING_SOON) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-10">
          <i className="fi fi-sr-rocket" style={{ fontSize: "48px", color: "#52D973" }} aria-hidden />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            Resources — Coming Soon
          </h1>
          <p className="mx-auto mt-3 leading-relaxed text-muted-foreground">
            We&apos;re still setting things up. The full resource vault will be available when howtoerlc launches.
          </p>
        </div>
      </div>
    );
  }

  // Enrich YouTube resources with oEmbed metadata server-side
  const enriched: Resource[] = await Promise.all(
    resources.map(async (r) => {
      if (r.section === "youtube") {
        const oembed = await fetchOEmbed(r.url);
        if (oembed) {
          return {
            ...r,
            title: oembed.title,
            channelName: oembed.author_name,
            creator: oembed.author_name,
            thumbnailUrl: oembed.thumbnail_url,
          };
        }
      }
      return r;
    })
  );

  return <ResourcesClient resources={enriched} />;
}
