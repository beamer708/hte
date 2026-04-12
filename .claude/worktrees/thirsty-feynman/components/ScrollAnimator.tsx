"use client";

import { useEffect } from "react";

export default function ScrollAnimator() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const observe = (el: Element) => io.observe(el);

    // Observe elements already in the DOM
    document.querySelectorAll(".animate-on-scroll").forEach(observe);

    // Watch for elements added during client-side navigation
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as Element;
          if (el.classList?.contains("animate-on-scroll")) observe(el);
          el.querySelectorAll?.(".animate-on-scroll").forEach(observe);
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
