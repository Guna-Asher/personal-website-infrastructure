"use client";

import type { CSSProperties } from "react";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InteractiveLink } from "@/components/ui/interactive-link";
import { AmbientLayer } from "@/components/ui/ambient-layer";
import { navLinks, site } from "@/lib/data/site";

const footerVars = {
  "--color-bg": "#0f1512",
  "--color-fg": "#f1efe6",
  "--color-muted": "#97948a",
  "--color-border": "rgba(241, 239, 230, 0.14)",
  "--color-surface": "rgba(241, 239, 230, 0.06)",
  "--color-accent": "#71b491",
  "--color-accent-fg": "#0f1512",
  "--ambient-symbol-color": "#f1efe6",
  "--ambient-theme-boost": 0.06,
} as CSSProperties;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={footerVars} className="relative isolate overflow-hidden bg-background text-foreground">
      <AmbientLayer seed="footer" variant="dense" extend />

      <Container className="relative py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="grid gap-16 border-b border-border pb-16 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">{site.role}</p>
            <h2 className="font-display text-statement mt-4 font-medium tracking-tight">
              {site.name}
            </h2>
            <p className="mt-6 max-w-sm text-muted">
              Building applications and the infrastructure that keeps them running.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">Explore</p>
            <ul className="mt-5 space-y-4">
              <li>
                <InteractiveLink href="/">Home</InteractiveLink>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <InteractiveLink href={link.href}>{link.label}</InteractiveLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">Connect</p>
            <ul className="mt-5 space-y-4">
              <li>
                <InteractiveLink href={`mailto:${site.email}`}>Email</InteractiveLink>
              </li>
              <li>
                <InteractiveLink href={site.github} external>
                  GitHub
                </InteractiveLink>
              </li>
              {site.resume && (
                <li>
                  <InteractiveLink href={site.resume} external>
                    Resume
                  </InteractiveLink>
                </li>
              )}
              {site.linkedin && (
                <li>
                  <InteractiveLink href={site.linkedin} external>
                    LinkedIn
                  </InteractiveLink>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">
              © {year} {site.name} · built with Next.js
            </p>
            <p className="mt-2 font-mono text-xs text-muted/70">guna@portfolio:~$ exit</p>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 rounded-full border border-border px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Back to top
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
              aria-hidden
            />
          </button>
        </div>
      </Container>
    </footer>
  );
}
