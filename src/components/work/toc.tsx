"use client";

import { useEffect, useState } from "react";

export type TocSection = { id: string; label: string };

/**
 * Sticky section index for a case study, with scroll-spy. A long technical
 * document needs to say where you are in it; this is the only reason the
 * component is client-side.
 */
export function Toc({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The topmost section currently intersecting wins, so scrolling up
        // and down both land on the heading the reader is actually at.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Case study sections">
      <p className="t-meta text-ink-muted">On this page</p>
      <ul className="mt-4 flex flex-col gap-1">
        {sections.map((section, i) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`t-meta block rounded-sm py-1 transition-colors duration-150 hover:text-clay ${
                  isActive ? "text-clay" : "text-ink-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}{" "}
                <span className="text-clay-graphic" aria-hidden>
                  /
                </span>{" "}
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
