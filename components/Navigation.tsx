"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site-structure";

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

          </div>
        </div>
      )}
    </nav>
  );
}
