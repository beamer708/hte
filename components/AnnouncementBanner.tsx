"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "howtoerlc-announcement-dismissed-v4";
// Monday April 20 2026 at 11:00am EST (UTC-5 = 16:00 UTC)
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

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "32px" }}>
      <span style={{
        display: "block",
        background: "rgba(82,217,115,0.08)",
        border: "1px solid rgba(82,217,115,0.18)",
        borderRadius: "6px",
        padding: "2px 7px",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: "#52D973",
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1.4,
      }}>
        {String(value).padStart(2, "0")}
      </span>
      <span style={{ fontSize: "9px", color: "#555", marginTop: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [visible]);

  function dismiss() {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* session-only */ }
  }

  if (!visible) return null;

  return (
    <div style={{
      borderBottom: "1px solid rgba(82,217,115,0.1)",
      background: "linear-gradient(180deg, rgba(82,217,115,0.04) 0%, transparent 100%)",
      padding: "10px 24px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", maxWidth: "960px", margin: "0 auto", position: "relative" }}>

        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(82,217,115,0.1)",
            border: "1px solid rgba(82,217,115,0.2)",
            borderRadius: "20px",
            padding: "2px 10px",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "#52D973",
            textTransform: "uppercase",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#52D973", display: "inline-block", animation: "pulse 2s infinite" }} />
            Launching
          </span>
          <span style={{ fontSize: "11px", color: "#888", letterSpacing: "0.03em", fontWeight: 300 }}>
            @howtoerlc goes live Monday, Apr 20 at 11:00am EST
          </span>
        </div>

        {/* Divider */}
        <span style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />

        {/* Countdown */}
        {time ? (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            {time.d > 0 && <TimeUnit value={time.d} label="days" />}
            <TimeUnit value={time.h} label="hrs" />
            <TimeUnit value={time.m} label="min" />
            <TimeUnit value={time.s} label="sec" />
          </div>
        ) : (
          <span style={{ fontSize: "11px", color: "#52D973", fontWeight: 500 }}>Live now</span>
        )}

        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{ position: "absolute", right: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", background: "none", border: "none", cursor: "pointer", color: "#444", padding: 0, borderRadius: "4px" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
