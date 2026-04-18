"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const TARGET = new Date("2026-04-20T16:00:00Z");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1_000),
  };
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div
        style={{
          background: "rgba(82,217,115,0.07)",
          border: "1px solid rgba(82,217,115,0.2)",
          borderRadius: "10px",
          padding: "12px 18px",
          minWidth: "64px",
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
          fontSize: "28px",
          fontWeight: 600,
          color: "#52D973",
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span
        style={{
          fontSize: "10px",
          color: "#555",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function AnnouncementModal({ onDismiss }: { onDismiss: () => void }) {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @keyframes am-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes am-fadein {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes am-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .am-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: am-overlay-in 0.25s ease;
        }
        .am-card {
          position: relative;
          width: 100%;
          max-width: 500px;
          background: #111111;
          border: 1px solid rgba(82,217,115,0.18);
          border-radius: 24px;
          padding: 40px 36px 36px;
          box-shadow: 0 0 60px rgba(82,217,115,0.08), 0 24px 80px rgba(0,0,0,0.6);
          animation: am-fadein 0.3s ease;
        }
        .am-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }
        .am-close:hover {
          color: #aaa;
          background: rgba(255,255,255,0.08);
        }
        .am-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(82,217,115,0.1);
          border: 1px solid rgba(82,217,115,0.25);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #52D973;
          text-transform: uppercase;
        }
        .am-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #52D973;
          animation: am-pulse 2s infinite;
        }
        .am-countdown {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .am-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 28px 0;
        }
        .am-discord-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px 20px;
          background: rgba(82,217,115,0.1);
          border: 1px solid rgba(82,217,115,0.25);
          border-radius: 12px;
          color: #52D973;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s;
        }
        .am-discord-btn:hover {
          background: rgba(82,217,115,0.16);
          border-color: rgba(82,217,115,0.4);
        }
        @media (max-width: 480px) {
          .am-card {
            padding: 32px 22px 28px;
            border-radius: 20px;
          }
        }
      `}</style>

      <div className="am-overlay" onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}>
        <div className="am-card" role="dialog" aria-modal="true" aria-label="Launch announcement">

          <button className="am-close" onClick={onDismiss} aria-label="Close announcement">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <Image src="/GreenLogo.png" alt="" width={18} height={18} style={{ opacity: 0.85 }} />
            <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", color: "#666", textTransform: "uppercase" }}>
              @howtoerlc
            </span>
          </div>

          {/* Pill */}
          <div style={{ marginBottom: "16px" }}>
            <span className="am-pill">
              <span className="am-dot" />
              Launching
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: "clamp(20px, 4vw, 26px)",
              fontWeight: 700,
              color: "#F5F5F0",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            @howtoerlc goes live Monday, Apr 20 at 11:00am EST
          </h2>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, marginBottom: "0" }}>
            Other servers charge for this. We don&apos;t. Free resources, tools, and guides for every ERLC community.
          </p>

          <div className="am-divider" />

          {/* Countdown */}
          {time ? (
            <div className="am-countdown">
              {time.d > 0 && <CountdownBox value={time.d} label="days" />}
              <CountdownBox value={time.h} label="hours" />
              <CountdownBox value={time.m} label="min" />
              <CountdownBox value={time.s} label="sec" />
            </div>
          ) : (
            <p style={{ textAlign: "center", fontSize: "16px", color: "#52D973", fontWeight: 600 }}>
              We&apos;re live. Welcome.
            </p>
          )}

          <div className="am-divider" />

          {/* CTA */}
          <a
            href="https://discord.gg/HjcqH2djjC"
            target="_blank"
            rel="noopener noreferrer"
            className="am-discord-btn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path
                fill="#52D973"
                d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.132 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
              />
            </svg>
            Join Discord to stay updated
          </a>

          <button
            onClick={onDismiss}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              background: "none",
              border: "none",
              color: "#555",
              fontSize: "12px",
              cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            Continue to site
          </button>
        </div>
      </div>
    </>
  );
}
