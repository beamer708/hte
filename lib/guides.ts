import { IconName, BrandIconName } from "@/components/Icon";

export interface Guide {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName | BrandIconName;
  category: string;
}

export const guides: Guide[] = [
  {
    id: "discord-emojis",
    title: "Create Discord Emojis",
    description:
      "Learn how to use icon sites, download SVG, recolor in an editor, size to 32x32, and upload to Discord.",
    href: "/community-guides/emojis",
    icon: "sparkles",
    category: "Discord",
  },
  {
    id: "logo-design",
    title: "Logo Design Guide",
    description:
      "A step-by-step guide to designing a logo for your ERLC server — from concept and typography to final export.",
    href: "/guides/logo-design",
    icon: "palette",
    category: "Branding",
  },
  {
    id: "department-hierarchy",
    title: "Department Hierarchy",
    description:
      "How to structure your ERLC department hierarchy for clarity, accountability, and scalable growth.",
    href: "/guides/department-hierarchy",
    icon: "layers",
    category: "Structure",
  },
  {
    id: "staff-moderation-team",
    title: "Staff and Moderation Team",
    description:
      "How to set up a staff and moderation team that is structured, consistent, and operationally sound.",
    href: "/guides/staff-moderation-team",
    icon: "users",
    category: "Management",
  },
  {
    id: "server-rules",
    title: "Server Rules and Regulations",
    description:
      "How to write clear, enforceable server rules and regulations that set consistent expectations.",
    href: "/guides/server-rules",
    icon: "document",
    category: "Policy",
  },
  {
    id: "rank-promotion-system",
    title: "Rank and Promotion System",
    description:
      "How to build a rank and promotion system that is transparent, merit-based, and easy to maintain.",
    href: "/guides/rank-promotion-system",
    icon: "arrow-trend-up",
    category: "Structure",
  },
  {
    id: "application-tryout-process",
    title: "Application and Tryout Process",
    description:
      "How to create a structured application and tryout process that filters for quality and commitment.",
    href: "/guides/application-tryout-process",
    icon: "checkbox",
    category: "Recruitment",
  },
  {
    id: "training-program",
    title: "Training Program for New Members",
    description:
      "How to set up a training program that onboards new members with consistency and operational clarity.",
    href: "/guides/training-program",
    icon: "book",
    category: "Operations",
  },
  {
    id: "server-branding",
    title: "Designing Server Branding",
    description:
      "How to design cohesive server branding — logo, colors, and uniform guide — for your ERLC community.",
    href: "/guides/server-branding",
    icon: "palette",
    category: "Branding",
  },
  {
    id: "radio-communication",
    title: "10-Codes and Radio Communication",
    description:
      "How to use 10-codes and radio communication standards for structured, professional in-game operations.",
    href: "/guides/radio-communication",
    icon: "message-sms",
    category: "Operations",
  },
  {
    id: "cad-system",
    title: "Setting Up a CAD System",
    description:
      "How to set up a Computer-Aided Dispatch system that supports organized, realistic ERLC operations.",
    href: "/guides/cad-system",
    icon: "computer",
    category: "Operations",
  },
  {
    id: "patrols-and-events",
    title: "Running Patrols and Events",
    description:
      "How to plan and run in-game patrols and events that are coordinated, purposeful, and engaging.",
    href: "/guides/patrols-and-events",
    icon: "navigation",
    category: "Operations",
  },
  {
    id: "partnerships-program",
    title: "Creating a Partnerships Program",
    description:
      "How to build a partnerships program that grows your network with aligned, well-managed community agreements.",
    href: "/guides/partnerships-program",
    icon: "users-alt",
    category: "Growth",
  },
  {
    id: "blacklists-discipline",
    title: "Blacklists and Disciplinary Action",
    description:
      "How to handle blacklists and disciplinary action with consistency, documentation, and fairness.",
    href: "/guides/blacklists-discipline",
    icon: "vault",
    category: "Management",
  },
  {
    id: "discord-server-setup",
    title: "Setting Up a Discord Server",
    description:
      "How to set up a Discord server for your ERLC community — channels, roles, permissions, and structure.",
    href: "/guides/discord-server-setup",
    icon: "discord",
    category: "Discord",
  },
  {
    id: "livery-vehicle-design",
    title: "Livery and Vehicle Design Basics",
    description:
      "How to design liveries and vehicle assets that are visually consistent and recognizable across your ERLC server.",
    href: "/guides/livery-vehicle-design",
    icon: "wrench",
    category: "Design",
  },
];
