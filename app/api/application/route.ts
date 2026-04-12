import { NextResponse } from "next/server";

export const maxDuration = 10;

/**
 * Sends a staff application as a Discord embed to DISCORD_APPLICATION_WEBHOOK.
 * Falls back to forwarding to the bot API if the webhook is not configured.
 *
 * Webhook URL must be stored in the environment variable:
 *   DISCORD_APPLICATION_WEBHOOK=https://discord.com/api/webhooks/...
 * Never hardcode the URL here.
 */
async function sendToDiscordWebhook(
  webhookUrl: string,
  data: {
    username: string;
    discordId: string;
    age: string;
    timezone: string;
    reason: string;
    experience: string;
    roleApplying: string;
  }
): Promise<{ ok: boolean; error?: string }> {
  const payload = {
    embeds: [
      {
        title: "New Staff Application",
        color: 0xf5f0e8,
        fields: [
          { name: "Form Type", value: "Staff Application", inline: true },
          { name: "Applying For", value: data.roleApplying, inline: true },
          { name: "Discord Username", value: data.username, inline: true },
          { name: "Discord ID", value: data.discordId, inline: true },
          { name: "Age", value: data.age, inline: true },
          { name: "Timezone", value: data.timezone, inline: true },
          { name: "Why do you want to join?", value: data.reason.slice(0, 1024), inline: false },
          ...(data.experience
            ? [{ name: "Previous Experience", value: data.experience.slice(0, 1024), inline: false }]
            : []),
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "@howtoerlc · Staff Application Form" },
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

  const { username, discordId, age, timezone, reason, experience, roleApplying } =
    body as Record<string, string>;

  if (!username || !discordId || !age || !timezone || !reason || !roleApplying) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.DISCORD_APPLICATION_WEBHOOK;

  // Primary: send directly to Discord webhook
  if (webhookUrl) {
    const result = await sendToDiscordWebhook(webhookUrl, {
      username,
      discordId,
      age,
      timezone,
      reason,
      experience: experience ?? "",
      roleApplying,
    });
    if (!result.ok) {
      console.error("Application webhook failed:", result.error);
      return NextResponse.json(
        { success: false, error: "Failed to send application. Please try again." },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true });
  }

  // Fallback: forward to bot API
  const botUrl = process.env.BOT_API_URL;
  const secret = process.env.API_SECRET;

  if (!botUrl || !secret) {
    console.error("Neither DISCORD_APPLICATION_WEBHOOK nor BOT_API_URL is configured.");
    return NextResponse.json(
      { success: false, error: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${botUrl}/api/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": secret,
      },
      body: JSON.stringify({
        username,
        discordId,
        age,
        timezone,
        reason,
        experience: experience ?? "",
        roleApplying,
      }),
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
