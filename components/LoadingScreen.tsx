"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import uLogo from "@/Media/ULogo.svg";

export default function LoadingScreen() {
  const screenRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const logo = logoRef.current;
    if (!screen || !logo) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Skip animation; remove immediately
      const t = setTimeout(() => screen.remove(), 100);
      return () => clearTimeout(t);
    }

    // Sequence:
    // t=50ms  → logo fades + scales in  (400ms transition)
    // t=1000ms → logo fades out         (300ms transition)
    // t=1300ms → screen fades out       (400ms transition)
    // t=1750ms → element removed from DOM
    // Total: ≤ 1800ms

    const t1 = setTimeout(() => logo.classList.add("loading-logo--visible"), 50);
    const t2 = setTimeout(() => logo.classList.remove("loading-logo--visible"), 1000);
    const t3 = setTimeout(() => screen.classList.add("loading-screen--out"), 1300);
    const t4 = setTimeout(() => screen.remove(), 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div ref={screenRef} className="loading-screen" aria-hidden="true">
      <div ref={logoRef} className="loading-logo">
        <Image src={uLogo} alt="" width={64} height={64} priority />
      </div>
    </div>
  );
}
