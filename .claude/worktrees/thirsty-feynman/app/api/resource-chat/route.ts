import { NextResponse } from "next/server";
import { resources, Resource } from "@/lib/resources";

// Keyword map: user terms → resource categories/fields
const KEYWORD_MAP: Record<string, string[]> = {
  logo: ["Graphic Design Tools", "Design Inspiration", "logo", "branding", "brand"],
  font: ["Fonts and Typography", "font", "typography", "typeface"],
  typography: ["Fonts and Typography", "font", "typography"],
  color: ["Color Palette Tools", "color", "palette", "colour"],
  palette: ["Color Palette Tools", "color", "palette"],
  icon: ["Icons and Emojis", "icon", "emoji", "animated"],
  emoji: ["Icons and Emojis", "emoji", "icon"],
  animation: ["Animated Icons", "animation", "animated", "motion"],
  discord: ["Discord Utilities", "discord", "community", "server"],
  design: ["Graphic Design Tools", "Design Inspiration", "Graphic Design", "design"],
  inspiration: ["Design Inspiration", "inspiration", "reference", "mood board"],
  video: ["youtube", "video", "tutorial", "channel"],
  tutorial: ["youtube", "tutorial", "guide", "learn"],
  community: ["Community Building", "discord", "community", "server"],
  branding: ["branding", "brand", "logo", "identity", "Graphic Design"],
  template: ["template", "design", "Graphic Design Tools"],
  thumbnail: ["thumbnail", "youtube", "video", "design"],
  advertising: ["Advertising and Growth", "ads", "marketing", "promotion"],
  growth: ["Community Building", "Advertising and Growth", "growth", "marketing"],
  erlc: ["Emergency Response Liberty County", "ERLC", "roleplay"],
  roleplay: ["Roleplay Structure", "roleplay", "rp", "ERLC"],
  automation: ["Automation and Systems", "automation", "bot", "system"],
  bot: ["Automation and Systems", "bot", "discord"],
  ai: ["Discord Utilities", "ai", "AI", "assistant", "learning"],
  learn: ["youtube", "tutorial", "guide", "learn"],
  free: ["free", "Fonts and Typography", "font"],
  banner: ["design", "banner", "graphic", "Graphic Design Tools"],
  mockup: ["design", "mockup", "Graphic Design Tools"],
  gradient: ["Color Palette Tools", "color", "gradient"],
};

function scoreResource(resource: Resource, tokens: string[]): number {
  let score = 0;
  const searchableText = [
    resource.title,
    resource.description,
    resource.category,
    resource.creator,
    resource.channelName ?? "",
    resource.type,
    resource.section,
  ]
    .join(" ")
    .toLowerCase();

  for (const token of tokens) {
    // Direct text match
    if (searchableText.includes(token)) {
      score += token.length > 4 ? 3 : 2;
    }
    // Category keyword map match
    const mapped = KEYWORD_MAP[token];
    if (mapped) {
      for (const kw of mapped) {
        if (searchableText.includes(kw.toLowerCase())) {
          score += 2;
        }
      }
    }
  }

  // Boost new resources slightly
  if (resource.isNew) score += 0.5;

  return score;
}

function tokenize(message: string): string[] {
  return message
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !["the", "and", "for", "that", "with", "this", "can", "are", "how", "what", "some", "any", "about"].includes(t));
}

function buildResponse(message: string, matches: Resource[]): string {
  const q = message.toLowerCase();

  if (matches.length === 0) {
    return "I couldn't find anything that matches that exactly. Try searching for topics like fonts, colors, icons, design tools, Discord utilities, or ERLC tutorials.";
  }

  const count = matches.length;
  const intro =
    count === 1
      ? "Here's the best match I found:"
      : `Here are ${count} resources that should help:`;

  // Topic-specific openers
  if (q.includes("font") || q.includes("typ")) {
    return `${intro} These are some of the best typography and font resources in the vault.`;
  }
  if (q.includes("color") || q.includes("palette") || q.includes("colour")) {
    return `${intro} Great for building and exploring color palettes.`;
  }
  if (q.includes("icon") || q.includes("emoji")) {
    return `${intro} Perfect for icons and emoji assets.`;
  }
  if (q.includes("logo") || q.includes("brand")) {
    return `${intro} These should help with logo design and branding work.`;
  }
  if (q.includes("discord") || q.includes("community") || q.includes("server")) {
    return `${intro} Useful for Discord server building and community resources.`;
  }
  if (q.includes("video") || q.includes("tutorial") || q.includes("learn")) {
    return `${intro} These are video tutorials that cover what you're looking for.`;
  }
  if (q.includes("erlc") || q.includes("roleplay")) {
    return `${intro} Specifically relevant to ERLC and roleplay communities.`;
  }
  if (q.includes("ai") || q.includes("assistant")) {
    return `${intro} Here are some AI-powered tools in the vault.`;
  }

  return `${intro} Based on what you described, these should be the most useful.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { message?: string };
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: "message too long" }, { status: 400 });
    }

    const tokens = tokenize(message);

    if (tokens.length === 0) {
      return NextResponse.json({
        response: "Could you describe what you're looking for? For example: fonts, color tools, Discord resources, or ERLC tutorials.",
        resources: [],
      });
    }

    // Score all resources
    const scored = resources
      .map((r) => ({ resource: r, score: scoreResource(r, tokens) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((s) => s.resource);

    const response = buildResponse(message, scored);

    return NextResponse.json({ response, resources: scored });
  } catch {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
