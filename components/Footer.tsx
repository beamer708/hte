import Link from "next/link";
import Image from "next/image";
import { NAV, STATUS_URL } from "@/lib/site-structure";

function DiscordSVG() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-label="Discord" style={{ flexShrink: 0 }}>
      <path
        fill="#52D973"
        d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.132 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid #1f1f1f",
      }}
    >
      <div
        className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
        style={{ padding: "48px 32px" }}
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">

          {/* Left — brand + tagline + copyright */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2 transition-opacity hover:opacity-80">
              <Image src="/GreenLogo.png" alt="" width={24} height={24} />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  color: "#F5F5F0",
                  textTransform: "uppercase",
                }}
              >
                @howtoerlc
              </span>
            </Link>
            <p style={{ fontSize: "13px", color: "#888888", marginTop: "12px", lineHeight: 1.6 }}>
              Built for ERLC communities that mean business.
            </p>
            <p style={{ fontSize: "12px", color: "#555555", marginTop: "16px", lineHeight: 1.6 }}>
              © 2025 @howtoerlc. Independent. Not affiliated with Roblox or ERLC developers.
            </p>
          </div>

          {/* Right — links + Discord */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-16">

            {/* Page links */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 sm:flex-col sm:gap-3">
              <Link
                href={NAV.resources.href}
                style={{ fontSize: "13px", color: "#888888" }}
                className="hover:text-[#F5F5F0] transition-colors"
              >
                Resources
              </Link>
              <Link
                href="/community-guides"
                style={{ fontSize: "13px", color: "#888888" }}
                className="hover:text-[#F5F5F0] transition-colors"
              >
                Community
              </Link>
              <Link
                href={NAV.support.href}
                style={{ fontSize: "13px", color: "#888888" }}
                className="hover:text-[#F5F5F0] transition-colors"
              >
                Support
              </Link>
              <Link
                href={NAV.about.href}
                style={{ fontSize: "13px", color: "#888888" }}
                className="hover:text-[#F5F5F0] transition-colors"
              >
                About
              </Link>
            </div>

            {/* Discord */}
            <div>
              <a
                href="https://discord.gg/HjcqH2djjC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
                style={{ fontSize: "13px", color: "#888888" }}
              >
                <DiscordSVG />
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
