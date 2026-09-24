import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InteractiveLink } from "@/components/ui/interactive-link";
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
        <div className="grid w-full gap-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-20">
          <RevealText as="div">
            <p className="font-mono text-sm tracking-widest text-muted uppercase">{site.role}</p>
            <h1 className="font-display text-display mt-3 font-medium tracking-tight">{site.name}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{site.tagline}</p>
            <Link
              href="/work"
              className="mt-10 inline-flex w-fit items-center gap-2 border-b-2 border-foreground pb-1 font-display text-xl font-medium tracking-tight transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View Work
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </RevealText>

          <RevealText as="div" delay={0.1}>
            <div className="flex flex-col gap-8 border-t border-border pt-8 lg:w-[280px] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 font-mono text-xs">
                <dt className="tracking-widest text-muted uppercase">Status</dt>
                <dd>Open to work</dd>
                <dt className="tracking-widest text-muted uppercase">Location</dt>
                <dd>{site.location}</dd>
                <dt className="tracking-widest text-muted uppercase">Infra</dt>
                <dd>Docker · Nginx · EC2 · GitHub Actions</dd>
              </dl>

              <div className="flex flex-col gap-3">
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
          </RevealText>
        </div>
      </Container>
    </main>
  );
}
