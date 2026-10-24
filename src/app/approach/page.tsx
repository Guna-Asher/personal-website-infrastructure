import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { projects } from "@/lib/data/projects";
import { skillCategories } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Three habits Guna R applies to every system — reversible decisions, least privilege by default, and saying what is missing.",
};

function findProject(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`/approach references a missing project: ${slug}`);
  return project;
}

const strangerClub = findProject("stranger-club");
const portal = findProject("deployment-portal");
const logMonitoring = findProject("aws-log-monitoring");

// Each principle has to cite a real decision from a real system. The quote is
// read out of projects.ts rather than retyped, so the page cannot drift from
// the case study it is citing.
const principles = [
  {
    index: "01",
    title: "Make the decision reversible, on purpose",
    body: "Picking the simpler option is easy. The part worth doing is leaving the exit visible — writing down, next to the code, exactly what would have to change if the constraint changes. A decision with a documented swap point is a small change later instead of a rewrite.",
    quote: strangerClub.lessons,
    source: strangerClub,
  },
  {
    index: "02",
    title: "Least privilege even when nothing is forcing it",
    body: "Small projects are where credentials get hardcoded, because nothing is watching and it would work. That is exactly why the habit has to hold at that size — a scoped role on a one-script pipeline costs nothing extra and means there is no key to leak.",
    quote: logMonitoring.lessons,
    source: logMonitoring,
  },
  {
    index: "03",
    title: "Say what is missing, and keep saying it",
    body: "Every one of these systems has a gap I know about. Naming them once in a README and then presenting the project as finished is the normal thing to do; carrying them through the write-up is more useful to anyone deciding whether to trust the work.",
    quote: portal.lessons,
    source: portal,
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHeader
        eyebrow="Approach"
        title={<>Three habits, applied to every system here.</>}
        standfirst={
          <>
            Not a philosophy — each of these is a specific thing I did in a specific project, and
            each one is cited below from the case study it came from.
          </>
        }
      />

      <Container>
        <div className="grid-page">
          <div className="col-content">
            {principles.map((principle) => (
              <article
                key={principle.index}
                className="border-b border-rule py-12 last:border-b-0 md:py-16"
                data-reveal
              >
                <p className="t-meta text-ink-muted">
                  {principle.index} <span className="text-clay-graphic">/</span> Principle
                </p>
                <h2 className="t-statement mt-5 text-ink">{principle.title}</h2>
                <p className="t-body mt-6 text-ink-secondary">{principle.body}</p>

                {/* The citation. Clay rule on the leading edge, the same
                    device the architecture diagrams use. */}
                <blockquote className="mt-8 border-l-2 border-l-clay-graphic bg-raised p-5">
                  <p className="t-body text-ink-secondary italic">{principle.quote}</p>
                  <footer className="t-meta mt-4 text-ink-muted not-italic">
                    From {principle.source.title}
                  </footer>
                </blockquote>

                <div className="mt-7">
                  <Link href={`/work/${principle.source.slug}`}>
                    Read {principle.source.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>

      <Section index="04" label="Technical areas" surface="raised" wide>
        <div className="grid gap-10 border-t border-rule pt-10 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <div
              key={category.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <h3 className="t-meta text-ink-muted">
                <span aria-hidden>
                  {String(i + 1).padStart(2, "0")}{" "}
                  <span className="text-clay-graphic">/</span>{" "}
                </span>
                {category.label}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {category.skills.map((skill) => (
                  <li key={skill} className="t-ui text-ink-secondary">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
