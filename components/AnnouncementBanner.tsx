"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "unity-announcement-dismissed-v1";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable — dismiss is session-only
    }
  }

  if (!visible) return null;

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", borderBottom:"0.5px solid rgba(240,236,224,0.08)", backgroundColor:"#0a0a09", padding:"8px 24px" }}>
      <a
        href="https://unityvaultstatus.betteruptime.com/maintenance/868358"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize:"11px", fontWeight:300, letterSpacing:"0.04em", color:"var(--muted-foreground)", textDecoration:"none" }}
      >
        Some features may be temporarily unavailable.
      </a>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        style={{ marginLeft:"auto", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", width:"16px", height:"16px", background:"none", border:"none", cursor:"pointer", color:"var(--muted-foreground)", padding:0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
