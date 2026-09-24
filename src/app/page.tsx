import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InteractiveLink } from "@/components/ui/interactive-link";
import { MetaList } from "@/components/ui/meta-list";
import { RevealText } from "@/components/ui/reveal-text";
import { AmbientLayer } from "@/components/ui/ambient-layer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/data/site";

export default function Home() {
  return (
    <main id="main-content" className="relative isolate flex min-h-screen flex-col">
      <AmbientLayer seed="home" variant="sparse" scale={0.6} allowLarge={false} />

      <div className="absolute top-6 right-6 md:top-8 md:right-8">
        <ThemeToggle />
      </div>

      <Container className="flex flex-1 items-center py-24">
        <div className="grid w-full gap-14 lg:grid-cols-[1fr_21rem] lg:items-start lg:gap-16">
          <RevealText as="div">
            <p className="font-mono text-sm tracking-widest text-muted uppercase">{site.role}</p>
            <h1 className="font-display text-display mt-4 font-semibold tracking-tight">{site.name}</h1>
            <p className="mt-7 max-w-lg text-lg text-muted">{site.tagline}</p>
            <Link
              href="/work"
              className="mt-11 inline-flex w-fit items-center gap-2 rounded-sm border-b-2 border-foreground pb-1 font-display text-xl font-semibold tracking-tight transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View Work
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </RevealText>

          <RevealText as="div" delay={0.1}>
            <div className="rounded-md border border-border-strong bg-surface p-6">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-[auto_1fr] gap-x-6 pb-3">
                  <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">Status</dt>
                  <dd className="font-mono text-xs">Open to work</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-6 py-3">
                  <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">Location</dt>
                  <dd className="font-mono text-xs">{site.location}</dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-6 pt-3">
                  <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">Running on</dt>
                  <dd>
                    <MetaList items={["Docker", "Nginx", "EC2", "GitHub Actions"]} className="font-mono text-xs" />
                  </dd>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 px-1">
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
          </RevealText>
        </div>
      </Container>
    </main>
  );
}
