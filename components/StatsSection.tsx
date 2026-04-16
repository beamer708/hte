"use client";

import { useEffect, useRef, useState } from "react";

// ── Animated counter ──────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  duration = 1200,
  onStart,
}: {
  target: number;
  duration?: number;
  onStart?: () => void;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          onStart?.();
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(ease * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, onStart]);

  return <span ref={ref}>{count}</span>;
}

// ── Single stat card ──────────────────────────────────────────────────────────

function StatCard({
  icon,
  target,
  duration,
  label,
  sublabel,
  barWidth,
  animDelay,
}: {
  icon: React.ReactNode;
  target: number;
  duration: number;
  label: string;
  sublabel: string;
  barWidth: string;
  animDelay: string;
}) {
  const [barActive, setBarActive] = useState(false);

  return (
    <div
      style={{
        background: "#111111",
        border: "1px solid #1f1f1f",
        borderRadius: "16px",
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transition: "border-color 0.2s ease",
        animation: "statsCardFadeUp 0.5s ease both",
        animationDelay: animDelay,
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(82,217,115,0.3)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = "#1f1f1f")
      }
    >
      {/* Icon badge */}
      <div
        style={{
          width: "36px",
          height: "36px",
          background: "rgba(82,217,115,0.1)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "4px",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Number */}
      <p
        style={{
          fontSize: "clamp(40px, 5vw, 56px)",
          fontWeight: 900,
          color: "#F5F5F0",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          margin: 0,
        }}
      >
        <AnimatedCounter
          target={target}
          duration={duration}
          onStart={() => setBarActive(true)}
        />
        <span style={{ color: "#52D973" }}>+</span>
      </p>

      {/* Label */}
      <p
        style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#F5F5F0",
          margin: 0,
        }}
      >
        {label}
      </p>

      {/* Sublabel */}
      <p
        style={{
          fontSize: "13px",
          color: "#888888",
          lineHeight: 1.5,
          margin: 0,
          marginTop: "4px",
        }}
      >
        {sublabel}
      </p>

      {/* Progress bar */}
      <div
        style={{
          height: "3px",
          background: "#1f1f1f",
          borderRadius: "2px",
          marginTop: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "#52D973",
            borderRadius: "2px",
            width: barActive ? barWidth : "0%",
            transition: "width 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const ResourcesIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="#52D973"
      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 11H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V7h2v2zm8 8h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V7h6v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"
    />
  </svg>
);

const TemplatesIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="#52D973"
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"
    />
  </svg>
);

const ToolsIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="#52D973"
      d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
    />
  </svg>
);

// ── Main export ───────────────────────────────────────────────────────────────

export default function StatsSection({
  resourceCount,
  templateCount,
  toolCount,
}: {
  resourceCount: number;
  templateCount: number;
  toolCount: number;
}) {
  return (
    <>
      <style>{`
        @keyframes statsCardFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        style={{
          background: "#0A0A0A",
          padding: "80px 48px",
          borderTop: "1px solid #1f1f1f",
          borderBottom: "1px solid #1f1f1f",
        }}
        className="!px-5 sm:!px-12"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
            className="!grid-cols-1 sm:!grid-cols-3"
          >
            <StatCard
              icon={ResourcesIcon}
              target={resourceCount}
              duration={1400}
              label="Resources"
              sublabel="Curated for ERLC communities"
              barWidth="100%"
              animDelay="0s"
            />
            <StatCard
              icon={TemplatesIcon}
              target={templateCount}
              duration={600}
              label="Templates"
              sublabel="Ready to download and use"
              barWidth="12%"
              animDelay="0.1s"
            />
            <StatCard
              icon={ToolsIcon}
              target={toolCount}
              duration={600}
              label="Tools"
              sublabel="Design and build your server"
              barWidth="12%"
              animDelay="0.2s"
            />
          </div>
        </div>
      </section>
    </>
  );
}
