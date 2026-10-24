import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { projects, type ProjectCaseStudy } from "@/lib/data/projects";
import { skillCategories } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Guna R works: leaving decisions reversible, scoping credentials on small projects, and documenting what's missing.",
};

function findProject(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`/approach references a missing project: ${slug}`);
  return project;
}

const strangerClub = findProject("stranger-club");
const portal = findProject("deployment-portal");
const logMonitoring = findProject("aws-log-monitoring");

function findConstraint(project: ProjectCaseStudy, needle: string) {
  const constraint = project.constraints?.find((c) => c.includes(needle));
  if (!constraint) {
    throw new Error(`/approach references a missing constraint on ${project.slug}: ${needle}`);
  }
  return constraint;
}

// Each principle has to cite a real decision from a real system. The quote is
// read out of projects.ts rather than retyped, so the page cannot drift from
// the case study it is citing.
const principles = [
  {
    index: "01",
    title: "I try to leave decisions reversible",
    body: "Picking the simpler option is easy. The useful part is writing down what would have to change if the constraint changes, right next to the code it affects. That turns a future migration into a small edit instead of a rewrite.",
    quote: strangerClub.lessons,
    source: strangerClub,
  },
  {
    index: "02",
    title: "I use scoped credentials even on small projects",
    body: "Small projects are where credentials get hardcoded, because nothing is watching and it would work anyway. I'd rather scope a role to the one action it needs, so there's no key sitting in the repo or on the instance for someone to find later.",
    quote: logMonitoring.lessons,
    source: logMonitoring,
  },
  {
    index: "03",
    title: "I document what's missing",
    body: "Every project here has gaps I know about. It's easy to mention them once in a README and then write about the project as if it's finished. I'd rather carry them through the whole write-up, so anyone reading can see what they'd be taking on.",
    quote: findConstraint(portal, "role-based access control"),
    source: portal,
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHeader
        eyebrow="Approach"
        title={<>How I work</>}
        standfirst={
          <>
            Habits I&apos;ve kept to across these projects. Each one comes from a specific
            project, linked at the end of the section.
          </>
        }
      />

      <Container>
        {principles.map((principle) => (
          <article
            key={principle.index}
            className="grid-page border-b border-rule py-12 last:border-b-0 md:py-16"
            data-reveal
          >
            <p className="t-meta col-label text-ink-muted">
              <span aria-hidden>
                {principle.index} <span className="text-clay-graphic">/</span>{" "}
              </span>
              Habit
            </p>

            <div className="col-content mt-5 lg:mt-0">
              <h2 className="t-statement text-ink">{principle.title}</h2>
              <p className="t-body measure-prose mt-6 text-ink-secondary">{principle.body}</p>
            </div>

            {/* The citation breaks the reading measure and runs through the
                outboard track, the same device the case-study figures use —
                it is the visual accent of this page, so it gets the width. */}
            <blockquote className="col-content-wide mt-8 border-l-2 border-l-clay-graphic bg-raised p-6">
              <p className="t-body text-ink-secondary italic">{principle.quote}</p>
              <footer className="t-meta mt-4 text-ink-muted not-italic">
                From {principle.source.title}
              </footer>
            </blockquote>

            <div className="col-content mt-7">
              <Link href={`/work/${principle.source.slug}`}>
                Read {principle.source.title}
              </Link>
            </div>
          </article>
        ))}
      </Container>

      <Section index="04" label="Skills" surface="raised" wide>
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
