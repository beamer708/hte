import Link from "next/link";

// ─── Sample resource rows pulled from actual guide/resource content ───────────
const RESOURCE_ROWS = [
  { category: "Discord Structure", title: "Setting Up a Discord Server for Your ERLC Community" },
  { category: "Server Management", title: "How to Structure Your ERLC Department Hierarchy" },
  { category: "Graphic Design",    title: "Logo Design Guide" },
  { category: "Server Management", title: "Building a Rank and Promotion System" },
  { category: "Graphic Design",    title: "Designing Server Branding" },
  { category: "Community Ops",     title: "Creating an Application and Tryout Process" },
];

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "100px",
          paddingBottom: "100px",
          borderBottom: "0.5px solid rgba(240,236,224,0.08)",
        }}
      >
        <div className="page-container">
          <div style={{ maxWidth: "520px" }}>

            {/* Label */}
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                marginBottom: "24px",
              }}
            >
              For ERLC Communities
            </p>

            {/* Headline */}
            <h1
              style={{
                fontSize: "38px",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "var(--foreground)",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontWeight: 300, display: "block" }}>
                Everything your community needs.
              </span>
              <span style={{ fontWeight: 500, display: "block" }}>
                Nothing in the way.
              </span>
            </h1>

            {/* Body copy */}
            <p
              style={{
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--muted-foreground)",
                maxWidth: "420px",
                marginBottom: "36px",
              }}
            >
              Unity curates guides, tools, and frameworks for ERLC server owners and community managers.
              Free, independent, and organized — no searching required.
            </p>

            {/* CTA row */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              <Link href="/resources" className="btn-primary">
                Browse Resources
              </Link>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "var(--muted-foreground)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  textDecorationColor: "rgba(240,236,224,0.25)",
                }}
              >
                No account required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ─────────────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "0.5px solid rgba(240,236,224,0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
          className="pillars-grid"
        >
          <Pillar
            num="01"
            title="Curated Resources"
            body="Guides, tools, and references organized for ERLC communities. No searching required."
            borderRight
          />
          <Pillar
            num="02"
            title="Community Growth"
            body="Frameworks for Discord structure, server management, branding, and team systems."
            borderRight
          />
          <Pillar
            num="03"
            title="Always Free"
            body="Unity does not sell anything. Every resource, guide, and tool on this platform is free."
          />
        </div>
      </section>

      {/* ── RESOURCE ROWS ─────────────────────────────────────────────────── */}
      <section>
        <div className="page-container">
          {/* Section label */}
          <div
            style={{
              padding: "32px 0 0",
              marginBottom: "0",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                paddingBottom: "24px",
                borderBottom: "0.5px solid rgba(240,236,224,0.08)",
              }}
            >
              From the platform
            </p>
          </div>

          {/* Rows */}
          {RESOURCE_ROWS.map((row, i) => (
            <ResourceRow
              key={i}
              category={row.category}
              title={row.title}
            />
          ))}

          {/* View all */}
          <div
            style={{
              borderTop: "0.5px solid rgba(240,236,224,0.08)",
              padding: "20px 0 40px",
            }}
          >
            <Link
              href="/resources"
              className="view-all-link"
            >
              View all resources →
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile pillar CSS */}
      <style>{`
        @media (max-width: 640px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .view-all-link {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: var(--muted-foreground);
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .view-all-link:hover { color: var(--foreground); }
        .view-guide-link {
          flex-shrink: 0;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.06em;
          color: var(--muted-foreground);
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.15s ease;
        }
        .view-guide-link:hover { color: var(--foreground); }
      `}</style>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function Pillar({
  num,
  title,
  body,
  borderRight,
}: {
  num: string;
  title: string;
  body: string;
  borderRight?: boolean;
}) {
  return (
    <div
      style={{
        padding: "32px",
        borderRight: borderRight ? "0.5px solid rgba(240,236,224,0.08)" : undefined,
      }}
    >
      <p
        style={{
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(240,236,224,0.18)",
          marginBottom: "14px",
        }}
      >
        {num}
      </p>
      <p
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--foreground)",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 300,
          lineHeight: 1.65,
          color: "var(--muted-foreground)",
        }}
      >
        {body}
      </p>
    </div>
  );
}

function ResourceRow({ category, title }: { category: string; title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        borderTop: "0.5px solid rgba(240,236,224,0.08)",
        padding: "22px 0",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,236,224,0.28)",
            marginBottom: "5px",
          }}
        >
          {category}
        </p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 400,
            color: "rgba(240,236,224,0.80)",
            lineHeight: 1.4,
          }}
        >
          {title}
        </p>
      </div>
      <Link
        href="/community-guides"
        className="view-guide-link"
      >
        View guide
      </Link>
    </div>
  );
}
