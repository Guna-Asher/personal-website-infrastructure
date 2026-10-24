"use client";

import { useEffect } from "react";

/**
 * One observer for the whole site. Mounted once in the root layout, it walks
 * every `[data-reveal]` node — including ones added by a client-side route
 * change — and sets `data-revealed` when it first enters the viewport.
 *
 * Doing it this way means server components opt into the reveal with a plain
 * attribute instead of each becoming a client component, and the animation is
 * genuinely once (a scroll-linked CSS view() timeline would re-run in
 * reverse on the way back up, and wouldn't run in Firefox at all).
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    const observeAll = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-revealed])")
        .forEach((el) => observer.observe(el));
    };

    observeAll();

    // Route changes swap the tree without remounting this component, so watch
    // for new nodes rather than assuming one pass is enough.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    // Safety net. A client that runs JS but never scrolls — a screenshot
    // service, a social-card renderer, print — would otherwise be left
    // looking at a page where everything below the fold is still at
    // opacity 0. Reveal the rest shortly after load.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
    }, 2000);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
