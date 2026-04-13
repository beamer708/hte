"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { NAV } from "@/lib/site-structure";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const pathname = usePathname();

  const isStaffApplicationOpen =
    process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "true" ||
    process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "1";

  const mainLinks = [
    { ...NAV.support },
    { ...NAV.about },
  ];

  // Dropdown sub-items for Resources
  const resourceItems = [
    { href: "/resources", label: "Resource Vault" },
    { href: "/community-guides", label: "Helpful Guides" },
    { href: "/tools", label: "Tools" },
    { href: "/templates", label: "Templates" },
    { href: "/assistant", label: "AI Assistant" },
  ];

  const isResourcesActive = resourceItems.some((item) => pathname.startsWith(item.href));
  const isAboutActive = pathname.startsWith("/about");
  const isSupportActive = pathname.startsWith("/support");

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="page-container">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <Image
              src="/GreenLogo.png"
              alt=""
              width={34}
              height={34}
              className="shrink-0"
            />
            <span className="text-lg font-medium tracking-[0.14em] text-foreground uppercase">
              @howtoerlc
            </span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-1.5">
            {/* Resources dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setResourcesOpen((open) => !open);
                  setCommunityOpen(false);
                }}
                className="btn-ghost rounded-lg py-2"
                aria-expanded={resourcesOpen}
                aria-haspopup="menu"
              >
                {NAV.resources.label}
              </button>
              {resourcesOpen && (
                <div
                  className="absolute left-0 top-full mt-3 w-60 rounded-lg border border-border bg-card p-2"
                  role="menu"
                >
                  {resourceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/15"
                      style={{ color: pathname.startsWith(item.href) ? "#52D973" : undefined }}
                      role="menuitem"
                      onClick={() => setResourcesOpen(false)}
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
                onClick={() => {
                  setCommunityOpen((open) => !open);
                  setResourcesOpen(false);
                }}
                className="btn-ghost rounded-lg py-2"
                aria-expanded={communityOpen}
                aria-haspopup="menu"
              >
                Community
              </button>
              {communityOpen && (
                <div
                  className="absolute left-0 top-full mt-3 w-60 rounded-lg border border-border bg-card p-2"
                  role="menu"
                >
                  {isStaffApplicationOpen && (
                    <Link
                      href={NAV.staffApplication.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-white/15"
                      role="menuitem"
                      onClick={() => setCommunityOpen(false)}
                    >
                      Staff Application
                    </Link>
                  )}
                  <Link
                    href="/resource-suggestion"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-white/15"
                    role="menuitem"
                    onClick={() => setCommunityOpen(false)}
                  >
                    Submit a Suggestion
                  </Link>
                </div>
              )}
            </div>

            {/* Main links */}
            {mainLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="btn-ghost rounded-lg py-2"
                  style={isActive ? { color: "#52D973" } : undefined}
                >
                  {link.label}
                </Link>
              );
            })}

            <span className="ml-1 inline-flex items-center rounded-full border border-border/60 px-2 py-0.5 text-xs font-medium text-muted-foreground">
              Free
            </span>
            <Link
              href={NAV.resources.href}
              className="ml-2 btn-primary px-5 py-2.5"
            >
              Enter Vault
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-border/60 text-foreground hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <i
              className={mobileOpen ? "fi fi-br-cross" : "fi fi-br-menu-burger"}
              style={{ fontSize: "18px", color: "#888888" }}
              aria-hidden
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#1f1f1f] bg-[#0A0A0A] animate-in-fade">
          <div className="page-container py-3">
            {resourceItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex w-full items-center border-b border-[#1f1f1f] px-4 py-4 text-base font-medium hover:bg-white/5"
                style={{ color: pathname.startsWith(item.href) ? "#52D973" : "var(--foreground)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isStaffApplicationOpen && (
              <Link
                href={NAV.staffApplication.href}
                className="flex w-full items-center border-b border-[#1f1f1f] px-4 py-4 text-base font-medium text-foreground hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Staff Application
              </Link>
            )}
            <Link
              href="/resource-suggestion"
              className="flex w-full items-center border-b border-[#1f1f1f] px-4 py-4 text-base font-medium text-foreground hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              Submit a Suggestion
            </Link>
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex w-full items-center border-b border-[#1f1f1f] px-4 py-4 text-base font-medium hover:bg-white/5"
                style={{ color: pathname.startsWith(link.href) ? "#52D973" : "var(--foreground)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-2">
              <Link
                href={NAV.resources.href}
                className="flex w-full items-center justify-center rounded-lg border border-border bg-primary px-4 py-3 text-center text-base font-medium text-background"
                onClick={() => setMobileOpen(false)}
              >
                Enter Vault
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
