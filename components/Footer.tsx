import Link from "next/link";
import Image from "next/image";
import { NAV, STATUS_URL } from "@/lib/site-structure";


export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border/60 bg-background">
      <div className="page-container py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/GreenLogo.png" alt="" width={24} height={24} />
            <span className="text-base font-medium tracking-[0.14em] text-foreground uppercase">@howtoerlc</span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={NAV.resources.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Resources
            </Link>
            <Link href={NAV.support.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Support
            </Link>
            <Link href={NAV.about.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <a href={STATUS_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Status
            </a>
            <a
              href="https://discord.gg/HjcqH2djjC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-label="Discord" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path fill="#5865F2" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.132 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord
            </a>
          </div>
        </div>

        <p className="mt-6 border-t border-border/60 pt-5 text-xs text-muted-foreground">
          @howtoerlc is free, independent, and not affiliated with Roblox or the ERLC development team. All external resources belong to their creators. Created by{" "}
          <a
            href="https://discord.com/users/527166312095678475"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground transition-colors hover:text-primary"
          >
            b3amerr
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
