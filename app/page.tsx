import Link from "next/link";
import Image from "next/image";
import { NAV } from "@/lib/site-structure";
import { resources, Resource } from "@/lib/resources";
import { fetchOEmbed } from "@/lib/oembed";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";
import { guides } from "@/lib/guides";
import { templates } from "@/lib/templates";
import { tools } from "@/lib/tools";

// ── SVG helpers ──────────────────────────────────────────────────────────────

function DiscordSVG({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        fill="#52D973"
        d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.132 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
      />
    </svg>
  );
}

// ── Outlined button style used throughout the homepage ───────────────────────

const outlinedGreenBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "1px solid #52D973",
  background: "transparent",
  color: "#F5F5F0",
  borderRadius: "8px",
  padding: "0 32px",
  height: "52px",
  fontSize: "14px",
  fontWeight: 500,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "background 0.2s",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const outlinedDarkBtn: React.CSSProperties = {
  ...outlinedGreenBtn,
  border: "1px solid #1f1f1f",
};

// ── Feature cards data ────────────────────────────────────────────────────────

const featureCards = [
  { title: "Curated resources", description: "Organized by category. No noise." },
  { title: "Community guides", description: "Structure and clarity for every server." },
  { title: "ERLC tools", description: "Everything your team needs in one place." },
  { title: "Discord integration", description: "Connected to where your community lives." },
];

// ── Template data lives in lib/templates.ts ───────────────────────────────────
// ── Tools data lives in lib/tools.ts ─────────────────────────────────────────

// ── Featured guide IDs (sourced from lib/guides.ts) ───────────────────────────

const featuredGuideIds = ["server-branding", "discord-server-setup", "department-hierarchy"];

// ── Featured resource IDs (sourced from lib/resources.ts) ─────────────────────

const featuredResourceIds = ["16", "31", "8", "41", "discord-erlc-hub"];

// ── Resource helpers ──────────────────────────────────────────────────────────

function getResourceIcon(r: Resource): string {
  if (r.section === "youtube") return "fi fi-br-play-circle";
  if (r.section === "discord") return "fi fi-br-comment-dots";
  return "fi fi-br-globe";
}

function getSourceLabel(r: Resource): string {
  if (r.section === "youtube") return `YouTube · ${r.channelName || r.creator}`;
  if (r.section === "discord") return `Discord · ${r.creator}`;
  try {
    const domain = new URL(r.url).hostname.replace("www.", "");
    return `Tool · ${domain}`;
  } catch {
    return `Tool · ${r.creator}`;
  }
}

// ── Shared section label ──────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#52D973",
        }}
      >
        {label}
      </span>
      <div
        style={{
          height: "1px",
          width: "40px",
          background: "#52D973",
          opacity: 0.4,
          flexShrink: 0,
        }}
      />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  // Fetch oEmbed data server-side for the resources section
  const enrichedResources = await Promise.all(
    resources.map(async (r) => {
      if (r.section === "youtube") {
        const oembed = await fetchOEmbed(r.url);
        if (oembed) {
          return {
            ...r,
            title: oembed.title,
            channelName: oembed.author_name,
            creator: oembed.author_name,
            thumbnailUrl: oembed.thumbnail_url,
          };
        }
      }
      return r;
    })
  );

  // Featured guides from lib/guides.ts
  const featuredGuides = featuredGuideIds
    .map((id) => guides.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => g !== undefined);

  // Featured resources from lib/resources.ts
  const featuredResources = featuredResourceIds
    .map((id) => resources.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => r !== undefined);

  const resourceTotal = resources.length;

  const stats = [
    { value: `${resources.length} Resources`, label: "Curated for ERLC communities" },
    { value: `${templates.length} Templates`, label: "Ready to download and use" },
    { value: `${tools.length} Tools`, label: "Design and build your server" },
  ];

  return (
    <div style={{ background: "#0A0A0A" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(82,217,115,0.07) 0%, transparent 65%)",
          padding: "120px 0 80px",
        }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[55fr_45fr] lg:gap-16 lg:items-center">

            {/* Left — heading */}
            <div>
              <h1
                style={{
                  fontWeight: 800,
                  lineHeight: 1.08,
                  color: "#F5F5F0",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(28px, 5vw, 64px)",
                }}
              >
                Everything your{" "}
                <span style={{ color: "#52D973" }}>ERLC</span>{" "}
                community needs.{" "}
                <br className="hidden sm:block" />
                Nothing in the way.
              </h1>
            </div>

            {/* Right — description + CTA */}
            <div className="flex flex-col gap-7">
              <p
                style={{
                  fontSize: "16px",
                  color: "#888888",
                  lineHeight: 1.75,
                  maxWidth: "440px",
                }}
              >
                @howtoerlc organizes curated resources, tools, and guidance for ERLC
                communities in one place — so your team can find what they need and move
                forward.
              </p>
              <div>
                <Link
                  href={NAV.resources.href}
                  style={{ ...outlinedGreenBtn, width: "100%", maxWidth: "260px" }}
                  className="hover:bg-[rgba(82,217,115,0.08)] block sm:inline-flex"
                >
                  Enter the Vault
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE CARD STRIP ───────────────────────────────────────────── */}
      <section
        style={{ padding: "0 0 80px" }}
        className="overflow-hidden"
      >
        <div
          className="flex gap-4"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingLeft: "max(16px, calc((100vw - 1200px) / 2 + 16px))",
            paddingRight: "max(16px, calc((100vw - 1200px) / 2 + 16px))",
            paddingBottom: "4px",
          }}
        >
          {featureCards.map((card) => (
            <div
              key={card.title}
              style={{
                width: "320px",
                flexShrink: 0,
                height: "240px",
                background: "#111111",
                border: "1px solid #1f1f1f",
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <p style={{ fontSize: "14px", color: "#F5F5F0", fontWeight: 600 }}>
                {card.title}
              </p>
              <p style={{ fontSize: "13px", color: "#888888", marginTop: "4px" }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ROW ────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderTop: "1px solid #1f1f1f", borderBottom: "1px solid #1f1f1f" }}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-0">
            {stats.map((stat, i) => (
              <div key={stat.value} className="flex items-center">
                <div className="text-center px-8 sm:px-14">
                  <p
                    style={{
                      fontSize: "clamp(20px, 3vw, 32px)",
                      fontWeight: 800,
                      color: "#F5F5F0",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ fontSize: "13px", color: "#888888", marginTop: "6px" }}>
                    {stat.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="hidden sm:block h-10 w-px"
                    style={{ background: "#1f1f1f" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES SHOWCASE (real data) ───────────────────────────────── */}
      <section style={{ background: "#0D0D0D", padding: "120px 48px" }} className="!px-5 sm:!px-12">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Left-aligned header */}
          <div style={{ marginBottom: "40px" }}>
            <SectionLabel label="Templates" />
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 800,
                color: "#F5F5F0",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Designer-made templates
              <br />for ERLC servers.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#888888",
                lineHeight: 1.7,
                marginTop: "12px",
                maxWidth: "480px",
              }}
            >
              Built for the ERLC community. Ready to download and use.
            </p>
          </div>

          {/* Two template cards */}
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}
            className="!grid-cols-1 sm:!grid-cols-2"
          >
            {templates.map((t) => (
              <div
                key={t.badge}
                style={{
                  background: "#111111",
                  border: "1px solid #1f1f1f",
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.2s",
                }}
                className="hover:!border-[rgba(82,217,115,0.25)]"
              >
                {/* Badge */}
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(82,217,115,0.08)",
                    border: "1px solid rgba(82,217,115,0.18)",
                    color: "#52D973",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    borderRadius: "4px",
                    padding: "3px 10px",
                    alignSelf: "flex-start",
                  }}
                >
                  {t.badge}
                </span>

                {/* Title */}
                <p
                  style={{
                    fontSize: "16px",
                    color: "#F5F5F0",
                    fontWeight: 700,
                    marginTop: "14px",
                    lineHeight: 1.3,
                  }}
                >
                  {t.title}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: "13px",
                    color: "#888888",
                    lineHeight: 1.65,
                    marginTop: "8px",
                    flex: 1,
                  }}
                >
                  {t.description}
                </p>

                {/* Button */}
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "24px",
                    height: "44px",
                    border: "1px solid #52D973",
                    background: "transparent",
                    color: "#F5F5F0",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  className="hover:bg-[rgba(82,217,115,0.08)]"
                >
                  {t.label}
                </a>
              </div>
            ))}
          </div>

          {/* Footer link */}
          <p style={{ marginTop: "24px" }}>
            <Link
              href="/templates"
              style={{ color: "#52D973", fontSize: "13px", textDecoration: "none" }}
            >
              View all templates →
            </Link>
          </p>
        </div>
      </section>

      {/* ── GUIDES SHOWCASE (real data from lib/guides.ts) ───────────────── */}
      <section style={{ background: "#0A0A0A", padding: "120px 48px" }} className="!px-5 sm:!px-12">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Centered header */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#52D973",
                }}
              >
                Guides
              </span>
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "#52D973",
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 800,
                color: "#F5F5F0",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Step-by-step guides for
              <br />your ERLC server.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#888888",
                maxWidth: "480px",
                lineHeight: 1.7,
                marginTop: "12px",
                margin: "12px auto 0",
              }}
            >
              Walk through real projects. Build structure. Stop guessing.
            </p>
          </div>

          {/* 3 guide cards */}
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
            className="!grid-cols-1 lg:!grid-cols-3"
          >
            {featuredGuides.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                style={{
                  background: "#111111",
                  border: "1px solid #1f1f1f",
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.2s",
                  textDecoration: "none",
                }}
                className="hover:!border-[rgba(82,217,115,0.25)]"
              >
                {/* Category badge */}
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(82,217,115,0.08)",
                    border: "1px solid rgba(82,217,115,0.18)",
                    color: "#52D973",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    borderRadius: "4px",
                    padding: "3px 10px",
                    alignSelf: "flex-start",
                  }}
                >
                  {guide.category}
                </span>

                {/* Title */}
                <p
                  style={{
                    fontSize: "16px",
                    color: "#F5F5F0",
                    fontWeight: 700,
                    marginTop: "14px",
                    lineHeight: 1.3,
                  }}
                >
                  {guide.title}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: "13px",
                    color: "#888888",
                    lineHeight: 1.65,
                    marginTop: "8px",
                    flex: 1,
                  }}
                >
                  {guide.description}
                </p>

                {/* Read link */}
                <span
                  style={{
                    color: "#52D973",
                    fontSize: "13px",
                    marginTop: "20px",
                  }}
                >
                  Read guide →
                </span>
              </Link>
            ))}
          </div>

          {/* Footer link */}
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            <Link
              href="/community-guides"
              style={{ color: "#52D973", fontSize: "13px", textDecoration: "none" }}
            >
              View all {guides.length} guides →
            </Link>
          </p>
        </div>
      </section>

      {/* ── RESOURCE VAULT SHOWCASE (real data from lib/resources.ts) ────── */}
      <section style={{ background: "#0D0D0D", padding: "120px 48px" }} className="!px-5 sm:!px-12">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              gap: "64px",
              alignItems: "center",
            }}
            className="!grid-cols-1 lg:!grid-cols-[3fr_2fr]"
          >
            {/* Left column — resource rows */}
            <div className="order-2 lg:order-1">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {featuredResources.map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "#111111",
                      border: "1px solid #1f1f1f",
                      borderRadius: "8px",
                      padding: "14px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      transition: "border-color 0.2s",
                      textDecoration: "none",
                    }}
                    className="hover:!border-[rgba(82,217,115,0.25)]"
                  >
                    <i
                      className={getResourceIcon(r)}
                      style={{ fontSize: "18px", color: "#52D973", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#F5F5F0",
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.title}
                      </p>
                      <p style={{ fontSize: "12px", color: "#888888", marginTop: "2px" }}>
                        {getSourceLabel(r)}
                      </p>
                    </div>
                    <span style={{ color: "#52D973", fontSize: "14px", flexShrink: 0 }}>→</span>
                  </a>
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "#888888", marginTop: "12px" }}>
                +{resourceTotal - featuredResourceIds.length} more resources in the vault.
              </p>
            </div>

            {/* Right column — header + CTA */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "20px" }}
                className="lg:!justify-start"
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#52D973",
                  }}
                >
                  Resource Vault
                </span>
                <div
                  style={{
                    height: "1px",
                    width: "40px",
                    background: "#52D973",
                    opacity: 0.4,
                    flexShrink: 0,
                  }}
                />
              </div>
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 42px)",
                  fontWeight: 800,
                  color: "#F5F5F0",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Every resource your
                <br />community needs.
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#888888",
                  lineHeight: 1.7,
                  marginTop: "12px",
                  maxWidth: "360px",
                  margin: "12px auto 0",
                }}
                className="lg:!mx-0"
              >
                YouTube tutorials. Design tools. Communities. Curated and organized.
              </p>
              <div style={{ marginTop: "32px" }}>
                <Link
                  href="/resources"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #52D973",
                    background: "transparent",
                    color: "#F5F5F0",
                    borderRadius: "8px",
                    padding: "0 28px",
                    height: "48px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  className="hover:bg-[rgba(82,217,115,0.08)]"
                >
                  Open the Vault
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI ASSISTANT SHOWCASE ────────────────────────────────────────── */}
      <section style={{ background: "#0A0A0A", padding: "120px 48px" }} className="!px-5 sm:!px-12">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Centered header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#52D973",
                }}
              >
                AI Assistant
              </span>
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "#52D973",
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 800,
                color: "#F5F5F0",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Ask anything about
              <br />ERLC communities.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#888888",
                maxWidth: "480px",
                lineHeight: 1.7,
                marginTop: "12px",
                margin: "12px auto 0",
              }}
            >
              Instant guidance on branding, Discord setup, roleplay structure, and more.
            </p>
          </div>

          {/* Static chat preview card */}
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                background: "#111111",
                border: "1px solid #1f1f1f",
                borderRadius: "16px",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {/* Card header bar */}
              <div
                style={{
                  background: "#0D0D0D",
                  borderBottom: "1px solid #1f1f1f",
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: "6px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2a2a2a" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2a2a2a" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2a2a2a" }} />
                </div>
                <span style={{ color: "#888888", fontSize: "13px" }}>@howtoerlc AI</span>
              </div>

              {/* Chat body */}
              <div
                style={{
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* User bubble */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      background: "rgba(82,217,115,0.1)",
                      border: "1px solid rgba(82,217,115,0.2)",
                      borderRadius: "12px 12px 2px 12px",
                      padding: "12px 16px",
                      maxWidth: "72%",
                      fontSize: "14px",
                      color: "#F5F5F0",
                    }}
                  >
                    How should I structure the ranks for my ERLC police department?
                  </div>
                </div>

                {/* Assistant bubble */}
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div
                    style={{
                      background: "#161616",
                      border: "1px solid #1f1f1f",
                      borderRadius: "12px 12px 12px 2px",
                      padding: "16px 18px",
                      maxWidth: "88%",
                    }}
                  >
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#52D973", marginBottom: "8px" }}>
                      @howtoerlc AI
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#888888",
                        lineHeight: 1.75,
                        margin: 0,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {`For a structured police department, start with three tiers:

Command — Chief, Deputy Chief, Captain
Supervision — Lieutenant, Sergeant
Officers — Corporal, Officer I, Officer II, Recruit

Keep ranks simple enough that members understand the chain of command on first read. Document each rank's responsibilities in a pinned channel before you promote anyone.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card footer bar */}
              <div
                style={{
                  background: "#0D0D0D",
                  borderTop: "1px solid #1f1f1f",
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: "#161616",
                    border: "1px solid #1f1f1f",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "#444444",
                    pointerEvents: "none",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Ask about ERLC branding, Discord, server structure...
                </div>
                <div
                  style={{
                    background: "#52D973",
                    borderRadius: "8px",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    pointerEvents: "none",
                  }}
                >
                  <i className="fi fi-br-paper-plane" style={{ fontSize: "14px", color: "#0A0A0A" }} />
                </div>
              </div>
            </div>

            {/* CTA below card */}
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <Link
                href="/assistant"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #52D973",
                  background: "transparent",
                  color: "#F5F5F0",
                  borderRadius: "8px",
                  padding: "0 28px",
                  height: "48px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                className="hover:bg-[rgba(82,217,115,0.08)]"
              >
                Try the Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESOURCES ────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 0" }}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-12">
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#52D973",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Resources
            </p>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 800,
                color: "#F5F5F0",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Curated for ERLC communities
            </h2>
            <p style={{ fontSize: "15px", color: "#888888", marginTop: "12px", maxWidth: "500px" }}>
              We organize what already exists and make it accessible.
            </p>
          </div>

          {/* Resource cards grid — show only the two featured New videos */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {enrichedResources
              .filter((r) => r.id === "new-1" || r.id === "new-2")
              .map((r) => (
                <YouTubeResourceCard key={r.id} resource={r} />
              ))}
          </div>

          <div className="mt-10">
            <Link href={NAV.resources.href} style={outlinedGreenBtn} className="hover:bg-[rgba(82,217,115,0.08)]">
              View all resources
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA / JOIN SECTION ───────────────────────────────────────────── */}
      <section
        style={{
          background: "#111111",
          borderTop: "1px solid #1f1f1f",
          borderBottom: "1px solid #1f1f1f",
          padding: "100px 0",
        }}
      >
        <div className="mx-auto max-w-[720px] px-4 sm:px-6 text-center">
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 800,
              color: "#F5F5F0",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Built for ERLC communities that mean business.
          </h2>
          <p style={{ fontSize: "15px", color: "#888888", marginTop: "16px" }}>
            Join the community. Access every resource. Free.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={NAV.resources.href}
              style={{ ...outlinedGreenBtn, width: "100%", maxWidth: "220px" }}
              className="hover:bg-[rgba(82,217,115,0.08)]"
            >
              Enter the Vault
            </Link>
            <a
              href="https://discord.gg/HjcqH2djjC"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...outlinedDarkBtn, width: "100%", maxWidth: "220px" }}
              className="hover:bg-white/5"
            >
              <DiscordSVG />
              Join Discord
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
