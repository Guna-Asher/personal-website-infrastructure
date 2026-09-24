import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InteractiveLink } from "@/components/ui/interactive-link";
import { RevealText } from "@/components/ui/reveal-text";
import { AmbientLayer } from "@/components/ui/ambient-layer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/data/site";

const RUNNING_ON = ["Docker", "Nginx", "EC2", "GitHub Actions"];

export default function Home() {
  return (
    <main id="main-content" className="relative isolate grid min-h-screen grid-rows-[auto_1fr]">
      {/* Top frame — gives the composition an actual edge instead of content
          floating with a loose icon in the corner. */}
      <div className="border-b border-border">
        <Container className="flex h-16 items-center justify-end md:h-20">
          <ThemeToggle />
        </Container>
      </div>

      <div className="grid lg:grid-cols-[1fr_23rem]">
        <div className="relative isolate flex flex-col justify-center px-6 py-16 md:px-8 md:py-20 lg:px-12 lg:py-0 xl:px-16">
          <AmbientLayer seed="home" variant="sparse" scale={0.6} allowLarge={false} />
          <RevealText as="div">
            <p className="font-mono text-xs tracking-widest text-muted/70 uppercase">01 / Identity</p>
            <h1 className="font-display text-display mt-6 font-semibold tracking-tight">{site.name}</h1>
            <p className="mt-5 font-mono text-sm tracking-widest text-muted uppercase">{site.role}</p>
            <p className="mt-8 max-w-md text-lg text-muted">{site.tagline}</p>
            <Link
              href="/work"
              className="mt-12 inline-flex w-fit items-center gap-2 rounded-sm border-b-2 border-foreground pb-1 font-display text-xl font-semibold tracking-tight transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View Work
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </RevealText>
        </div>

        {/* Environment zone — a full-height surface, not a small floating
            card, so it carries real visual weight next to the identity. */}
        <RevealText as="div" delay={0.1}>
          <div className="flex h-full flex-col justify-between border-t border-border bg-surface px-6 py-10 lg:border-t-0 lg:border-l lg:px-9 lg:py-12">
            <div>
              <p className="font-mono text-[11px] tracking-widest text-muted/70 uppercase">Environment</p>
              <div className="mt-5 flex flex-col gap-6">
                <div>
                  <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Status</p>
                  <p className="mt-1.5 text-sm">Open to work</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Location</p>
                  <p className="mt-1.5 text-sm">{site.location}</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Running on</p>
                  <ul className="mt-1.5 flex flex-col gap-0.5 text-sm">
                    {RUNNING_ON.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-border pt-8 lg:mt-0">
              <p className="font-mono text-[11px] tracking-widest text-muted/70 uppercase">Connect</p>
              <div className="mt-4 flex flex-col gap-3">
                <InteractiveLink href={site.github} external>
                  GitHub
                </InteractiveLink>
                {site.linkedin && (
                  <InteractiveLink href={site.linkedin} external>
                    LinkedIn
                  </InteractiveLink>
                )}
                {site.resume && (
                  <InteractiveLink href={site.resume} external>
                    Resume
                  </InteractiveLink>
                )}
                <InteractiveLink href={`mailto:${site.email}`}>Email</InteractiveLink>
              </div>
            </div>
          </div>
        </RevealText>
      </div>
    </main>
  );
}
