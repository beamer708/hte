"use client";

import { useState } from "react";

export default function PasswordForm() {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-8 border-t border-border/40 pt-7">
      <p className="text-center text-xs text-muted-foreground/60 mb-4 uppercase tracking-widest">
        Have access?
      </p>
      <form action="/api/site-auth" method="POST" className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              background: "#1a1a1a",
              color: "#f5f5f0",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "12px",
              padding: "12px 44px 12px 16px",
              fontSize: "16px",
              outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#52D973")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            {show ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        <button
          type="submit"
          style={{
            background: "#52D973",
            color: "#0a0a0a",
            border: "none",
            borderRadius: "12px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Enter site
        </button>
      </form>
    </div>
  );
}
