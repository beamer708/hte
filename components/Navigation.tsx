"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        borderBottom: "0.5px solid rgba(240,236,224,0.08)",
        backgroundColor: "#0a0a09",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="page-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "52px" }}>

          {/* Wordmark */}
          <Link
            href="/"
            style={{
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--foreground)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Unity
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hidden lg:flex">
            <NavLink href="/resources">Resources</NavLink>
            <NavLink href="/community-guides">Guides</NavLink>
            <NavLink href="/assistant">Assistant</NavLink>
            <FreeBadge />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden"
            style={{
              background: "none",
              border: "none",
              padding: "6px",
              cursor: "pointer",
              color: "var(--muted-foreground)",
            }}
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden"
          style={{
            borderTop: "0.5px solid rgba(240,236,224,0.08)",
            backgroundColor: "#0a0a09",
            padding: "20px 24px 24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <MobileNavLink href="/resources" onClick={() => setOpen(false)}>Resources</MobileNavLink>
            <MobileNavLink href="/community-guides" onClick={() => setOpen(false)}>Guides</MobileNavLink>
            <MobileNavLink href="/assistant" onClick={() => setOpen(false)}>Assistant</MobileNavLink>
            <div style={{ paddingTop: "4px" }}>
              <FreeBadge />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: "13px",
        fontWeight: 300,
        letterSpacing: "0.03em",
        color: "var(--muted-foreground)",
        textDecoration: "none",
        transition: "color 0.15s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-foreground)"; }}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        fontSize: "14px",
        fontWeight: 300,
        letterSpacing: "0.03em",
        color: "var(--muted-foreground)",
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );
}

function FreeBadge() {
  return (
    <span
      style={{
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--foreground)",
        backgroundColor: "var(--card)",
        border: "0.5px solid rgba(240,236,224,0.12)",
        borderRadius: "2px",
        padding: "3px 7px",
        display: "inline-block",
      }}
    >
      Free
    </span>
  );
}
