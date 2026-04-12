import { NextResponse } from "next/server";

export const maxDuration = 10;

/**
 * Sends a suggestion as a Discord embed to DISCORD_SUGGESTION_WEBHOOK.
 * Falls back to forwarding to the bot API if the webhook is not configured.
 *
 * Webhook URL must be stored in the environment variable:
 *   DISCORD_SUGGESTION_WEBHOOK=https://discord.com/api/webhooks/...
 * Never hardcode the URL here.
 */
async function sendToDiscordWebhook(
  webhookUrl: string,
  data: {
    username: string;
    discordId: string;
    category: string;
    title: string;
    details: string;
  }
): Promise<{ ok: boolean; error?: string }> {
  const payload = {
    embeds: [
      {
        title: "New Suggestion",
        color: 0xf5f0e8,
        fields: [
          { name: "Form Type", value: "Suggestion", inline: true },
          { name: "Category", value: data.category, inline: true },
          { name: "Suggestion Title", value: data.title, inline: false },
          { name: "Details", value: data.details.slice(0, 1024), inline: false },
          { name: "Discord Username", value: data.username, inline: true },
          { name: "Discord ID", value: data.discordId, inline: true },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "@howtoerlc · Suggestion Form" },
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`Discord webhook error ${res.status}:`, text);
      return { ok: false, error: `Webhook responded with ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("Discord webhook request failed:", err);
    return { ok: false, error: "Network error reaching webhook" };
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { username, discordId, category, title, details } = body as Record<string, string>;

  if (!username || !discordId || !category || !title || !details) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.DISCORD_SUGGESTION_WEBHOOK;

  // Primary: send directly to Discord webhook
  if (webhookUrl) {
    const result = await sendToDiscordWebhook(webhookUrl, {
      username,
      discordId,
      category,
      title,
      details,
    });
    if (!result.ok) {
      console.error("Suggestion webhook failed:", result.error);
      return NextResponse.json(
        { success: false, error: "Failed to send suggestion. Please try again." },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true });
  }

  // Fallback: forward to bot API
  const botUrl = process.env.BOT_API_URL;
  const secret = process.env.API_SECRET;

  if (!botUrl || !secret) {
    console.error("Neither DISCORD_SUGGESTION_WEBHOOK nor BOT_API_URL is configured.");
    return NextResponse.json(
      { success: false, error: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${botUrl}/api/suggestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": secret,
      },
      body: JSON.stringify({ username, discordId, category, title, details }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to reach bot." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to reach bot." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
