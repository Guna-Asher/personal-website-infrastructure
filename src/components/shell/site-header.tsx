"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ArrowUpRight } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/data/site";

const NAV = [
  { label: "Systems", href: "/work" },
  { label: "Approach", href: "/approach" },
];

/**
 * One shell for every route, including the homepage.
 *
 * The nav is `min-w-0 flex-1` on purpose. A flex item's default
 * `min-width: auto` resolves to its content size, so without this the nav
 * refuses to shrink, its `overflow-x-auto` never engages, and the whole
 * document is forced to the nav's intrinsic width (~490px) — which clipped
 * every page on every phone. The toggle sits outside the nav so it stays
 * reachable even if the links do scroll.
 */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-canvas/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center gap-4 md:h-20">
        <NextLink href="/" className="t-title shrink-0 rounded-sm text-ink">
          {site.name}
          <span className="text-clay-graphic">.</span>
        </NextLink>

        <nav
          className="flex min-w-0 flex-1 items-center justify-end gap-5 overflow-x-auto md:gap-7 md:overflow-x-visible"
          aria-label="Primary"
        >
          {NAV.map((link) => {
            // `/work/[slug]` is inside the Systems section but is not the
            // Systems page — aria-current marks the page, not the section.
            const isCurrent = pathname === link.href;
            return (
              <NextLink
                key={link.href}
                href={link.href}
                aria-current={isCurrent ? "page" : undefined}
                className={`t-ui flex h-11 shrink-0 items-center rounded-sm transition-colors duration-150 hover:text-clay ${
                  isCurrent ? "text-clay" : "text-ink-secondary"
                }`}
              >
                {link.label}
              </NextLink>
            );
          })}

          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="t-ui hidden h-11 shrink-0 items-center gap-1 rounded-sm text-ink-secondary transition-colors duration-150 hover:text-clay xs:flex"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
