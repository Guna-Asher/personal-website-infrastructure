import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/data/site";

/**
 * Persistent nav for pages below the homepage (/work and /work/[slug]).
 * Deliberately small: three destinations don't need a collapsing mobile menu.
 */
export function SiteNav() {
  return (
    <header className="border-b border-border">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="rounded-sm font-display text-lg font-medium tracking-tight focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          {site.initials}
          <span className="text-accent">.</span>
        </Link>

        <nav className="flex items-center gap-6" aria-label="Primary">
          <Link
            href="/work"
            className="rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Work
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            GitHub ↗
          </a>
        </nav>

        <ThemeToggle />
      </Container>
    </header>
  );
}
