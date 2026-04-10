"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@/components/Icon";

// Beta window: April 13, 2025 at 11:00am (UTC−5 = 16:00 UTC, assuming Eastern)
// Using exact UTC timestamp: 2025-04-13T16:00:00Z
const BETA_END = new Date("2025-04-13T16:00:00Z");

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBeta, setIsBeta] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Determine beta state on mount and keep it accurate
  useEffect(() => {
    function check() {
      setIsBeta(new Date() < BETA_END);
    }
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { content?: string; error?: string };
      if (!res.ok || data.error) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setMessages([...next, { role: "assistant", content: data.content ?? "" }]);
      }
    } catch {
      setError("Connection failed. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex min-h-screen flex-col py-10 sm:py-14">
      <div className="page-container flex max-w-3xl flex-1 flex-col">
        {/* Header */}
        <div className="mb-6 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Icon name="chatbot" className="text-2xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">Unity Assistant</h1>
                  {isBeta && (
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary">
                      Beta
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Structured guidance for ERLC community building.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-xs text-muted-foreground">
            Scoped to: Discord server setup · Graphic design · Web design · Server management
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-1 flex-col rounded-3xl border border-border/70 bg-card/75">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {isEmpty && (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon name="chatbot" className="text-3xl" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Ask about Discord structure, graphic design, web design, or server management.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-background"
                        : "border border-border bg-card text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <AssistantMessage content={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border/60 p-3 sm:p-4">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Discord setup, design, or server management…"
                rows={1}
                disabled={loading}
                className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none disabled:opacity-50"
                style={{ minHeight: "44px", maxHeight: "160px" }}
                onInput={(e) => {
                  const t = e.currentTarget;
                  t.style.height = "auto";
                  t.style.height = `${Math.min(t.scrollHeight, 160)}px`;
                }}
              />
              <button
                onClick={() => void send()}
                disabled={loading || !input.trim()}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-background transition-opacity hover:opacity-80 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Send"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders assistant message text with basic markdown-style formatting.
 * Bolds "Next step:" labels and preserves line breaks.
 */
function AssistantMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (line.startsWith("Next step:")) {
          return (
            <p key={i}>
              <span className="font-semibold text-primary">Next step:</span>
              {line.slice("Next step:".length)}
            </p>
          );
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="font-semibold">
              {line.slice(2, -2)}
            </p>
          );
        }
        if (line === "") return <br key={i} />;
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}
