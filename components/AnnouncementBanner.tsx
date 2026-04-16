"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "howtoerlc-announcement-dismissed-v3";
// Monday April 20 2026 at 11:00am EST (UTC-5 = 16:00 UTC)
const TARGET = new Date("2026-04-20T16:00:00Z");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return null;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return { d, h, m, s };
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", borderBottom: "0.5px solid rgba(240,236,224,0.08)", backgroundColor: "#0a0a09", padding: "8px 24px" }}>
      <span style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.04em", color: "var(--muted-foreground)" }}>
        @howtoerlc will finalize at 11:00am Monday EST
        {time && (
          <span style={{ marginLeft: "10px", fontVariantNumeric: "tabular-nums", color: "#52D973" }}>
            {time.d > 0 && `${time.d}d `}{String(time.h).padStart(2, "0")}h {String(time.m).padStart(2, "0")}m {String(time.s).padStart(2, "0")}s
          </span>
        )}
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        style={{ marginLeft: "auto", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "16px", height: "16px", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 0 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
