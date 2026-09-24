import Link from "next/link";
import { Container } from "@/components/ui/container";
import { InteractiveLink } from "@/components/ui/interactive-link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { site } from "@/lib/data/site";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col justify-between">
      <div className="absolute top-6 right-6 md:top-8 md:right-8">
        <ThemeToggle />
      </div>

      <Container className="flex flex-1 flex-col justify-center py-24">
        <p className="font-mono text-sm tracking-widest text-muted uppercase">{site.role}</p>
        <h1 className="font-display text-display mt-3 font-medium tracking-tight">{site.name}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{site.tagline}</p>

        <Link
          href="/work"
          className="mt-10 inline-flex w-fit items-center gap-2 border-b-2 border-foreground pb-1 font-display text-xl font-medium tracking-tight transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          View Work
        </Link>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
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
      </Container>

      <Container className="pb-10">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          Docker · Nginx · EC2 · GitHub Actions
        </p>
      </Container>
    </main>
  );
}
