export type ResourceType = "video" | "guide" | "website" | "tool" | "document" | "font-library" | "color-tool" | "inspiration";
export type ResourceSection = "youtube" | "website" | "discord";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  category: string;
  creator: string;
  creatorUrl?: string;
  section: ResourceSection;
  channelName?: string; // For YouTube videos
  thumbnailUrl?: string; // For YouTube videos
  memberCount?: string; // For Discord communities
  isNew?: boolean;
}

// YouTube Resource Categories
export const youtubeCategories = [
  "Tutorial",
];

// Website Resource Categories
export const websiteCategories: string[] = [];

// Legacy categories for backward compatibility
export const resourceCategories = [
  ...youtubeCategories,
  ...websiteCategories,
];

// Resources — titles, channel names, and thumbnails are enriched server-side via oEmbed (see lib/oembed.ts)
export const resources: Resource[] = [
  {
    id: "r1",
    title: "ERLC Tutorial",
    description: "Curated — not owned by @howtoerlc",
    type: "video",
    url: "https://youtu.be/Ib8UBwu3yGA",
    category: "Tutorial",
    creator: "",
    section: "youtube",
    channelName: "",
    thumbnailUrl: "",
  },
  {
    id: "r2",
    title: "ERLC Tutorial",
    description: "Curated — not owned by @howtoerlc",
    type: "video",
    url: "https://youtu.be/LdPHurNaIec",
    category: "Tutorial",
    creator: "",
    section: "youtube",
    channelName: "",
    thumbnailUrl: "",
  },
];

export function getResourcesByCategory(category?: string, section?: ResourceSection): Resource[] {
  let filtered = resources;
  if (section) {
    filtered = filtered.filter((resource) => resource.section === section);
  }
  if (category) {
    filtered = filtered.filter((resource) => resource.category === category);
  }
  return filtered;
}

export function getResourcesBySection(section: ResourceSection): Resource[] {
  return resources.filter((resource) => resource.section === section);
}

export function searchResources(query: string, section?: ResourceSection): Resource[] {
  const lowerQuery = query.toLowerCase();
  let filtered = resources;
  if (section) {
    filtered = filtered.filter((resource) => resource.section === section);
  }
  return filtered.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowerQuery) ||
      resource.description.toLowerCase().includes(lowerQuery) ||
      resource.category.toLowerCase().includes(lowerQuery) ||
      (resource.channelName && resource.channelName.toLowerCase().includes(lowerQuery))
  );
}

// Helper to extract YouTube video ID for thumbnail
export function getYouTubeThumbnail(url: string): string {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  if (videoIdMatch) {
    return `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`;
  }
  return "";
}
