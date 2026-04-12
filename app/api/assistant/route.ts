import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the @howtoerlc AI Assistant. @howtoerlc is a curated resource platform for ERLC (Emergency Response: Liberty County) communities.

Your role is to assist server owners, designers, and community managers with structured guidance across four categories only:
1. Discord server setup and structure
2. Graphic design for ERLC communities
3. Web design for ERLC communities
4. Server management and operations

If a user asks about anything outside these four categories, respond with: "This assistant is scoped to ERLC community building. I can help with Discord setup, graphic design, web design, or server management."

Tone: calm, structured, professional, minimal. No hype. No slang. No gaming language.

After each response, suggest one concrete next step relevant to the user's ERLC server or project. Label it clearly as "Next step:".

@howtoerlc does not create tutorials. It curates resources and provides structured guidance. Do not imply otherwise.`;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = body.messages as Message[] | undefined;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
  }

  // Validate message structure
  const valid = messages.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string"
  );
  if (!valid) {
    return NextResponse.json({ error: "Invalid message format." }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    return NextResponse.json({ content: text });
  } catch (err) {
    console.error("Anthropic API error:", err);
    return NextResponse.json(
      { error: "Assistant unavailable. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
