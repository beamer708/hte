"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Resource } from "@/lib/resources";
import WebsiteResourceCard from "@/components/WebsiteResourceCard";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";
import DiscordCommunityCard from "@/components/DiscordCommunityCard";

interface Message {
  role: "user" | "assistant";
  content: string;
  resources?: Resource[];
}

const SUGGESTIONS = [
  "I need fonts for my Discord server",
  "What are good color palette tools?",
  "Show me logo design resources",
  "I'm looking for icon packs",
  "ERLC roleplay tutorials",
  "Discord community building tips",
];

export default function ResourceChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! Tell me what you're working on or what kind of resource you need — I'll find the best matches from the vault for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(message: string) {
    if (!message.trim() || loading) return;

    const userMsg: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/resource-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json() as { response?: string; resources?: Resource[]; error?: string };

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response ?? "Something went wrong. Please try again.",
          resources: data.resources ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 80px)" }}>
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="page-container max-w-[900px] py-6">
          <Link
            href="/resources"
            className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={1.8} />
            Back to Resource Vault
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-card">
              <Sparkles className="h-4 w-4 text-accent" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Resource Assistant</h1>
              <p className="text-xs text-muted-foreground">Describe what you need — I&apos;ll find it in the vault</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="page-container max-w-[900px] py-8 space-y-8">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={msg.role === "user" ? "max-w-lg" : "w-full"}>
                {msg.role === "assistant" && (
                  <div className="mb-1 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-card">
                      <Sparkles className="h-3 w-3 text-accent" strokeWidth={1.8} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Assistant</span>
                  </div>
                )}
                <div
                  className={
                    msg.role === "user"
                      ? "rounded-2xl rounded-tr-sm bg-accent/10 border border-accent/20 px-4 py-3 text-sm text-foreground"
                      : "text-sm text-foreground leading-relaxed"
                  }
                >
                  {msg.content}
                </div>

                {/* Resource cards */}
                {msg.resources && msg.resources.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {msg.resources.map((r) =>
                      r.section === "youtube" ? (
                        <YouTubeResourceCard key={r.id} resource={r} />
                      ) : r.section === "discord" ? (
                        <DiscordCommunityCard key={r.id} resource={r} />
                      ) : (
                        <WebsiteResourceCard key={r.id} resource={r} />
                      )
                    )}
                  </div>
                )}

                {msg.resources && msg.resources.length === 0 && msg.role === "assistant" && i > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Try browsing the{" "}
                    <Link href="/resources" className="text-accent hover:underline">
                      full vault
                    </Link>{" "}
                    to explore everything.
                  </p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-card">
                  <Sparkles className="h-3 w-3 text-accent" strokeWidth={1.8} />
                </div>
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions — only shown at start */}
      {messages.length === 1 && (
        <div className="border-t border-border/40 bg-background/50">
          <div className="page-container max-w-[900px] py-4">
            <p className="mb-3 text-xs text-muted-foreground">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-white/5"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-background">
        <div className="page-container max-w-[900px] py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What kind of resource are you looking for?"
              disabled={loading}
              className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-border focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-50 transition-colors"
              aria-label="Chat input"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-white/5 disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
