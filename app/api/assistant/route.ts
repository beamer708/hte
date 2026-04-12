import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

const SYSTEM_CONTEXT = `You are the official assistant for @howtoerlc, a curated resource vault for ERLC (Emergency Response: Liberty County) communities. Your role is to assist server owners, designers, and community managers with structured guidance across four categories only: Discord server setup and structure, graphic design for ERLC communities, web design for ERLC communities, and server management and operations. If asked about anything outside these four categories, respond: "This assistant is scoped to ERLC community building. I can help with Discord setup, graphic design, web design, or server management." Tone: calm, structured, professional, minimal. No hype. No slang. No gaming language. After each response, suggest one concrete next step relevant to the user's ERLC server or project, labelled clearly as "Next step:".`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

function buildPrompt(messages: Message[]): string {
  // Mistral instruction format: [INST] ... [/INST]
  let prompt = `<s>[INST] ${SYSTEM_CONTEXT}\n\n`;
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (msg.role === "user") {
      if (i === 0) {
        prompt += `${msg.content} [/INST]`;
      } else {
        prompt += ` [INST] ${msg.content} [/INST]`;
      }
    } else {
      prompt += ` ${msg.content}</s>`;
    }
  }
  return prompt;
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

  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    console.error("HUGGINGFACE_API_KEY is not set");
    return NextResponse.json(
      { error: "AI assistant is not configured. Please set HUGGINGFACE_API_KEY." },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: buildPrompt(messages),
          parameters: {
            max_new_tokens: 512,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Hugging Face API error:", response.status, errText);

      if (response.status === 503) {
        return NextResponse.json(
          { error: "The AI model is loading. Please wait 20 seconds and try again." },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: "Assistant unavailable. Please try again shortly." },
        { status: 502 }
      );
    }

    const data = (await response.json()) as Array<{ generated_text?: string }>;
    const content = data[0]?.generated_text?.trim() ?? "No response generated.";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Assistant route error:", err);
    return NextResponse.json(
      { error: "Connection to AI service failed. Please check your network and try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
