"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site-structure";

const DiscordSVG = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path
      fill="#5865F2"
      d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.132 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
    />
  </svg>
);

const navLinkClass =
  "text-sm text-[#888888] hover:text-[#F5F5F0] transition-colors duration-200 bg-transparent border-0 cursor-pointer font-medium p-0";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const pathname = usePathname();

  const isStaffApplicationOpen =
    process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "true" ||
    process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "1";

  const resourceItems = [
    { href: "/resources", label: "Resource Vault" },
    { href: "/community-guides", label: "Helpful Guides" },
    { href: "/tools", label: "Tools" },
    { href: "/templates", label: "Templates" },
    { href: "/assistant", label: "AI Assistant" },
  ];

  const isResourcesActive = resourceItems.some((item) => pathname.startsWith(item.href));

  function closeAll() {
    setResourcesOpen(false);
    setCommunityOpen(false);
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#1f1f1f]"
      style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">

          {/* Left — logo + wordmark */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-85"
          >
            <Image src="/GreenLogo.png" alt="" width={28} height={28} className="shrink-0" />
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

          {/* Center — nav links (hidden below md) */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-7">

            {/* Resources dropdown */}
            <div className="relative">
              <button
                type="button"
                className={navLinkClass}
                style={{ color: isResourcesActive ? "#52D973" : undefined }}
                onClick={() => { setResourcesOpen((o) => !o); setCommunityOpen(false); }}
                aria-expanded={resourcesOpen}
                aria-haspopup="menu"
              >
                Resources
              </button>
              {resourcesOpen && (
                <div
                  className="absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-xl border border-[#1f1f1f] bg-[#111111] p-1.5 shadow-xl"
                  role="menu"
                >
                  {resourceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-[#888888] hover:bg-white/5 hover:text-[#F5F5F0] transition-colors"
                      style={{ color: pathname.startsWith(item.href) ? "#52D973" : undefined }}
                      role="menuitem"
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Community dropdown */}
            <div className="relative">
              <button
                type="button"
                className={navLinkClass}
                onClick={() => { setCommunityOpen((o) => !o); setResourcesOpen(false); }}
                aria-expanded={communityOpen}
                aria-haspopup="menu"
              >
                Community
              </button>
              {communityOpen && (
                <div
                  className="absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-xl border border-[#1f1f1f] bg-[#111111] p-1.5 shadow-xl"
                  role="menu"
                >
                  {isStaffApplicationOpen && (
                    <Link
                      href={NAV.staffApplication.href}
                      className="block rounded-lg px-3 py-2 text-sm text-[#888888] hover:bg-white/5 hover:text-[#F5F5F0] transition-colors"
                      role="menuitem"
                      onClick={closeAll}
                    >
                      Staff Application
                    </Link>
                  )}
                  <Link
                    href="/resource-suggestion"
                    className="block rounded-lg px-3 py-2 text-sm text-[#888888] hover:bg-white/5 hover:text-[#F5F5F0] transition-colors"
                    role="menuitem"
                    onClick={closeAll}
                  >
                    Submit a Suggestion
                  </Link>
                </div>
              )}
            </div>

            {/* Support */}
            <Link
              href={NAV.support.href}
              className={navLinkClass}
              style={{ color: pathname.startsWith(NAV.support.href) ? "#52D973" : undefined }}
            >
              Support
            </Link>

            {/* About */}
            <Link
              href={NAV.about.href}
              className={navLinkClass}
              style={{ color: pathname.startsWith(NAV.about.href) ? "#52D973" : undefined }}
            >
              About
            </Link>
          </div>

          {/* Right — Login with Discord (hidden below md) */}
          <div className="hidden md:flex shrink-0 items-center">
            <a
              href="/api/auth/signin/discord?callbackUrl=/api/beta-check"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[rgba(82,217,115,0.08)]"
              style={{ border: "1px solid #52D973", background: "transparent", color: "#F5F5F0" }}
            >
              <DiscordSVG />
              Login with Discord
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden ml-auto flex items-center justify-center w-9 h-9 rounded-lg border border-[#1f1f1f] text-[#888888] hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <i
              className={mobileOpen ? "fi fi-br-cross" : "fi fi-br-menu-burger"}
              style={{ fontSize: "16px" }}
              aria-hidden
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1f1f1f] bg-[#0A0A0A] animate-in-fade">
          <div className="mx-auto max-w-[1200px] px-4 py-3">

            {/* Resources items */}
            {resourceItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex w-full items-center border-b border-[#1f1f1f] px-4 py-4 text-base font-medium hover:bg-white/5 transition-colors"
                style={{ color: pathname.startsWith(item.href) ? "#52D973" : "#F5F5F0" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isStaffApplicationOpen && (
              <Link
                href={NAV.staffApplication.href}
                className="flex w-full items-center border-b border-[#1f1f1f] px-4 py-4 text-base font-medium text-[#F5F5F0] hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Staff Application
              </Link>
            )}

            <Link
              href="/resource-suggestion"
              className="flex w-full items-center border-b border-[#1f1f1f] px-4 py-4 text-base font-medium text-[#F5F5F0] hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Submit a Suggestion
            </Link>

            <Link
              href={NAV.support.href}
              className="flex w-full items-center border-b border-[#1f1f1f] px-4 py-4 text-base font-medium hover:bg-white/5 transition-colors"
              style={{ color: pathname.startsWith(NAV.support.href) ? "#52D973" : "#F5F5F0" }}
              onClick={() => setMobileOpen(false)}
            >
              Support
            </Link>

            <Link
              href={NAV.about.href}
              className="flex w-full items-center border-b border-[#1f1f1f] px-4 py-4 text-base font-medium hover:bg-white/5 transition-colors"
              style={{ color: pathname.startsWith(NAV.about.href) ? "#52D973" : "#F5F5F0" }}
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>

            <div className="px-4 py-4">
              <a
                href="/api/auth/signin/discord?callbackUrl=/api/beta-check"
                className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-[rgba(82,217,115,0.08)]"
                style={{ border: "1px solid #52D973", background: "transparent", color: "#F5F5F0" }}
                onClick={() => setMobileOpen(false)}
              >
                <DiscordSVG size={20} />
                Login with Discord
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
