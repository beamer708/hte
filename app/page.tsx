import Link from "next/link";
import Image from "next/image";
import { NAV } from "@/lib/site-structure";
import { resources } from "@/lib/resources";
import { fetchOEmbed } from "@/lib/oembed";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";

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

// ── Stats data ────────────────────────────────────────────────────────────────

const stats = [
  { value: "ERLC focused", label: "Built for one community" },
  { value: "100% free", label: "No paywalls. No gimmicks." },
  { value: "Curated only", label: "We organize. We don't create." },
];

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
