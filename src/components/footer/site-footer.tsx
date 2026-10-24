import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { site } from "@/lib/data/site";

/**
 * An inverse surface in both themes. The palette comes from the
 * `data-surface="inverse"` token block in globals.css — not from a hardcoded
 * hex object in this file, which is how the old footer managed to define the
 * dark theme a second time.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-surface="inverse" className="bg-canvas text-ink">
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 border-b border-rule pb-14 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="t-meta text-ink-muted">{site.role}</p>
            <p className="t-statement mt-4 text-ink">{site.name}</p>
            <p className="t-ui measure-lead mt-5 text-ink-secondary">
              Building applications and the infrastructure that keeps them running.
            </p>
          </div>

          <nav aria-label="Explore">
            <p className="t-meta text-ink-muted">Explore</p>
            <ul className="mt-5 space-y-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/work">Systems</Link>
              </li>
              <li>
                <Link href="/approach">Approach</Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="t-meta text-ink-muted">Connect</p>
            <ul className="mt-5 space-y-4">
              <li>
                <Link href={`mailto:${site.email}`}>Email</Link>
              </li>
              <li>
                <Link href={site.github} external>
                  GitHub
                </Link>
              </li>
              {site.linkedin && (
                <li>
                  <Link href={site.linkedin} external>
                    LinkedIn
                  </Link>
                </li>
              )}
              {site.resume && (
                <li>
                  <Link href={site.resume} external>
                    Resume
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <p className="t-meta text-ink-muted">
            © {year} {site.name} · built with Next.js
          </p>
          <p className="t-code mt-2 text-ink-muted">guna@portfolio:~$ exit</p>
        </div>
      </Container>
    </footer>
  );
}
