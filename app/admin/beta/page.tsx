"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface BetaTester {
  id: string;
  discordId: string;
  username: string;
  avatarUrl: string | null;
  firstAccess: string;
  lastSeen: string;
}

interface BetaLog {
  id: string;
  discordId: string;
  username: string;
  accessGranted: boolean;
  reason: string | null;
  createdAt: string;
}

interface Blacklisted {
  id: string;
  discordId: string;
  addedAt: string;
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminBetaPage() {
  const { status } = useSession({ required: true });

  const [isShutdown, setIsShutdown] = useState<boolean | null>(null);
  const [toggling, setToggling] = useState(false);
  const [testers, setTesters] = useState<BetaTester[]>([]);
  const [logs, setLogs] = useState<BetaLog[]>([]);
  const [blacklist, setBlacklist] = useState<Blacklisted[]>([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [configRes, testersRes, logsRes, blacklistRes] = await Promise.all([
        fetch("/api/admin/beta"),
        fetch("/api/admin/beta?action=testers"),
        fetch("/api/admin/beta?action=logs"),
        fetch("/api/admin/beta?action=blacklist"),
      ]);

      const config = (await configRes.json()) as { isShutdown: boolean };
      const testersData = (await testersRes.json()) as { testers: BetaTester[] };
      const logsData = (await logsRes.json()) as { logs: BetaLog[] };
      const blacklistData = (await blacklistRes.json()) as { blacklist: Blacklisted[] };

      setIsShutdown(config.isShutdown);
      setTesters(testersData.testers ?? []);
      setLogs(logsData.logs ?? []);
      setBlacklist(blacklistData.blacklist ?? []);
    } catch (err) {
      console.error("Failed to load beta data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") void loadData();
  }, [status, loadData]);

  async function toggleShutdown() {
    if (isShutdown === null) return;
    setToggling(true);
    try {
      const res = await fetch("/api/admin/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_shutdown", value: !isShutdown }),
      });
      if (res.ok) setIsShutdown(!isShutdown);
    } finally {
      setToggling(false);
    }
  }

  async function revokeUser(discordId: string) {
    setRevoking(discordId);
    try {
      const res = await fetch("/api/admin/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "revoke", discordId }),
      });
      if (res.ok) {
        setTesters((prev) => prev.filter((t) => t.discordId !== discordId));
        void loadData(); // refresh blacklist
      }
    } finally {
      setRevoking(null);
    }
  }

  async function unblacklist(discordId: string) {
    const res = await fetch("/api/admin/beta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "unblacklist", discordId }),
    });
    if (res.ok) setBlacklist((prev) => prev.filter((b) => b.discordId !== discordId));
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14">
      <div className="page-container max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <i className="fi fi-br-test-tube" style={{ fontSize: "16px" }} />
            <span className="text-sm uppercase tracking-widest">Admin</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Beta Access Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Control site shutdown, manage beta testers, and review access logs.
          </p>
        </div>

        {/* ── Beta Toggle ─────────────────────────────────────────── */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <i
              className="fi fi-br-settings"
              style={{ fontSize: "20px", color: "var(--muted-foreground)" }}
            />
            <h2 className="text-base font-semibold text-foreground">Site Shutdown</h2>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-foreground">
                {isShutdown
                  ? "Site is currently in shutdown / beta-only mode."
                  : "Site is publicly accessible."}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                This writes to the database. The middleware checks this value on every request.
              </p>
            </div>
            <button
              onClick={() => void toggleShutdown()}
              disabled={toggling || isShutdown === null}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-card-hover disabled:opacity-50"
            >
              <i
                className={isShutdown ? "fi fi-sr-toggle-on" : "fi fi-sr-toggle-off"}
                style={{
                  fontSize: "20px",
                  color: isShutdown ? "#52D973" : "var(--muted-foreground)",
                }}
              />
              {isShutdown ? "Shutdown ON" : "Shutdown OFF"}
            </button>
          </div>
        </section>

        {/* ── Active Beta Testers ──────────────────────────────────── */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <i
              className="fi fi-br-users"
              style={{ fontSize: "20px", color: "var(--muted-foreground)" }}
            />
            <h2 className="text-base font-semibold text-foreground">
              Active Beta Testers
              <span className="ml-2 rounded-full border border-border/60 px-2 py-0.5 text-xs font-normal text-muted-foreground">
                {testers.length}
              </span>
            </h2>
          </div>

          {testers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No testers have logged in yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="pb-2 pr-4 font-medium">User</th>
                    <th className="pb-2 pr-4 font-medium">Discord ID</th>
                    <th className="pb-2 pr-4 font-medium">First Access</th>
                    <th className="pb-2 pr-4 font-medium">Last Seen</th>
                    <th className="pb-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {testers.map((tester) => (
                    <tr key={tester.id}>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          {tester.avatarUrl ? (
                            <Image
                              src={tester.avatarUrl}
                              alt=""
                              width={28}
                              height={28}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-card-hover">
                              <i
                                className="fi fi-br-user"
                                style={{ fontSize: "12px", color: "var(--muted-foreground)" }}
                              />
                            </div>
                          )}
                          <span className="text-foreground">{tester.username}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                        {tester.discordId}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">{fmt(tester.firstAccess)}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{fmt(tester.lastSeen)}</td>
                      <td className="py-3">
                        <button
                          onClick={() => void revokeUser(tester.discordId)}
                          disabled={revoking === tester.discordId}
                          className="flex items-center gap-1.5 rounded-lg border border-red-900/40 bg-red-950/20 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-950/40 disabled:opacity-50"
                        >
                          <i className="fi fi-br-ban" style={{ fontSize: "11px" }} />
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Blacklist ────────────────────────────────────────────── */}
        {blacklist.length > 0 && (
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <i
                className="fi fi-sr-shield-exclamation"
                style={{ fontSize: "20px", color: "#E24B4A" }}
              />
              <h2 className="text-base font-semibold text-foreground">
                Blacklist
                <span className="ml-2 rounded-full border border-border/60 px-2 py-0.5 text-xs font-normal text-muted-foreground">
                  {blacklist.length}
                </span>
              </h2>
            </div>

            <div className="space-y-2">
              {blacklist.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border/60 px-4 py-3"
                >
                  <div>
                    <span className="font-mono text-xs text-muted-foreground">{entry.discordId}</span>
                    <span className="ml-3 text-xs text-muted-foreground">
                      Added {fmt(entry.addedAt)}
                    </span>
                  </div>
                  <button
                    onClick={() => void unblacklist(entry.discordId)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card-hover"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Session Log ──────────────────────────────────────────── */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <i
              className="fi fi-br-clock"
              style={{ fontSize: "20px", color: "var(--muted-foreground)" }}
            />
            <h2 className="text-base font-semibold text-foreground">Session Log</h2>
          </div>

          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No login attempts recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="pb-2 pr-4 font-medium">User</th>
                    <th className="pb-2 pr-4 font-medium">Discord ID</th>
                    <th className="pb-2 pr-4 font-medium">Result</th>
                    <th className="pb-2 pr-4 font-medium">Reason</th>
                    <th className="pb-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="py-3 pr-4 text-foreground">{log.username}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                        {log.discordId}
                      </td>
                      <td className="py-3 pr-4">
                        {log.accessGranted ? (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-green-400">
                            <i className="fi fi-sr-check-circle" style={{ fontSize: "12px", color: "#52D973" }} />
                            Granted
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                            <i className="fi fi-sr-cross-circle" style={{ fontSize: "12px", color: "#E24B4A" }} />
                            Denied
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-xs text-muted-foreground">
                        {log.reason ?? "—"}
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{fmt(log.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
