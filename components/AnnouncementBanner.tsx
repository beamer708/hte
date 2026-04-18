"use client";

import { useState, useEffect } from "react";

// Monday April 20 2026 at 11:00am EST (UTC-5 = 16:00 UTC)
const TARGET = new Date("2026-04-20T16:00:00Z");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1_000),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="ab-unit">
      <span className="ab-unit-val">{String(value).padStart(2, "0")}</span>
      <span className="ab-unit-label">{label}</span>
    </div>
  );
}

export default function AnnouncementBanner({ onDismiss }: { onDismiss: () => void }) {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        .ab-root {
          position: relative;
          border-bottom: 1px solid rgba(82,217,115,0.1);
          background: linear-gradient(180deg, rgba(82,217,115,0.04) 0%, transparent 100%);
          padding: 10px 40px 10px 16px;
        }
        .ab-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          max-width: 960px;
          margin: 0 auto;
        }
        .ab-label-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .ab-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(82,217,115,0.1);
          border: 1px solid rgba(82,217,115,0.2);
          border-radius: 20px;
          padding: 2px 10px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #52D973;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .ab-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #52D973;
          display: inline-block;
          animation: ab-pulse 2s infinite;
        }
        .ab-text {
          font-size: 11px;
          color: #888;
          letter-spacing: 0.03em;
          font-weight: 300;
          white-space: nowrap;
        }
        .ab-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        .ab-countdown {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          flex-shrink: 0;
        }
        .ab-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 32px;
        }
        .ab-unit-val {
          display: block;
          background: rgba(82,217,115,0.08);
          border: 1px solid rgba(82,217,115,0.18);
          border-radius: 6px;
          padding: 2px 7px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #52D973;
          font-variant-numeric: tabular-nums;
          line-height: 1.4;
        }
        .ab-unit-label {
          font-size: 9px;
          color: #555;
          margin-top: 2px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .ab-dismiss {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: none;
          border: none;
          cursor: pointer;
          color: #444;
          padding: 0;
          border-radius: 4px;
        }
        @keyframes ab-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 600px) {
          .ab-root {
            padding: 10px 36px 10px 12px;
          }
          .ab-inner {
            flex-direction: column;
            gap: 8px;
            align-items: center;
          }
          .ab-divider { display: none; }
          .ab-text { font-size: 10px; white-space: normal; text-align: center; }
          .ab-label-group { flex-wrap: wrap; justify-content: center; }
          .ab-unit-val { font-size: 12px; padding: 2px 6px; }
          .ab-dismiss { top: 10px; transform: none; }
        }
      `}</style>

      <div className="ab-root">
        <div className="ab-inner">
          <div className="ab-label-group">
            <span className="ab-pill">
              <span className="ab-dot" />
              Launching
            </span>
            <span className="ab-text">
              @howtoerlc goes live Monday, Apr 20 at 11:00am EST
            </span>
          </div>

          <div className="ab-divider" />

          {time ? (
            <div className="ab-countdown">
              {time.d > 0 && <TimeUnit value={time.d} label="days" />}
              <TimeUnit value={time.h} label="hrs" />
              <TimeUnit value={time.m} label="min" />
              <TimeUnit value={time.s} label="sec" />
            </div>
          ) : (
            <span style={{ fontSize: "11px", color: "#52D973", fontWeight: 500 }}>Live now</span>
          )}
        </div>

        <button className="ab-dismiss" onClick={onDismiss} aria-label="Dismiss">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}
