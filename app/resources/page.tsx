import { resources, Resource } from "@/lib/resources";
import { fetchOEmbed } from "@/lib/oembed";
import ResourcesClient from "./ResourcesClient";

export default async function ResourcesPage() {
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
