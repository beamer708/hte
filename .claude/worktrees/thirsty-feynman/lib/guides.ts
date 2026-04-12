import { IconName } from "@/components/Icon";

export interface Guide {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
}

export const guides: Guide[] = [
  {
    id: "discord-emojis",
    title: "Create Discord Emojis",
    description:
      "Learn how to use icon sites, download SVG, recolor in an editor, size to 32x32, and upload to Discord.",
    href: "/community-guides/emojis",
    icon: "sparkles",
  },
  {
    id: "logo-design",
    title: "Logo Design Guide",
    description:
      "A step-by-step guide to designing a logo for your ERLC server — from concept and typography to final export.",
    href: "/guides/logo-design",
    icon: "palette",
  },
];
