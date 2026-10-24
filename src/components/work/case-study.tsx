import NextLink from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { MetaList } from "@/components/ui/meta-list";
import { StageChip } from "@/components/ui/chip";
import { DefinitionRow } from "@/components/ui/definition-row";
import { ArchitectureDiagram } from "./architecture-diagram";
import { DecisionBlock } from "./decision-block";
import { Toc, type TocSection } from "./toc";
import type { ProjectCaseStudy } from "@/lib/data/projects";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function slugify(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Section = { label: string; content: ReactNode; figure?: ReactNode };

/**
 * One reusable template, rendered as a margin-labeled technical document —
 * a numbered label column beside the content, in the same register as this
 * repo's own ARCHITECTURE.md / DECISIONS.md. Sections with no data for a
 * given project (constraints, failure/recovery, decisions) simply don't
 * appear, so the numbering is computed from what actually renders.
 */
export function CaseStudy({
  project,
  position,
  total,
  previous,
  next,
}: {
  project: ProjectCaseStudy;
  position: number;
  total: number;
  previous?: ProjectCaseStudy;
  next?: ProjectCaseStudy;
}) {
  const sections: Section[] = [
    {
      label: "Problem",
      content: <p className="t-body measure-prose text-ink-secondary">{project.problem}</p>,
    },
    {
      label: "Architecture",
      content: (
        <p className="t-body measure-prose text-ink-secondary">{project.architecture.summary}</p>
      ),
      figure: (
        <figure className="min-w-0">
          <figcaption className="t-meta text-ink-muted">Fig. 01: System flow</figcaption>
          <ArchitectureDiagram diagram={project.architecture.diagram} />
        </figure>
      ),
    },
    ...(project.decisions.length > 0
      ? [
          {
            label: "Decisions",
            content: (
              <div className="flex flex-col gap-8">
                {project.decisions.map((decision, i) => (
                  <DecisionBlock key={decision.title} decision={decision} index={i + 1} />
                ))}
              </div>
            ),
          },
        ]
      : []),
    {
      label: "Deployment",
      content: <p className="t-body measure-prose text-ink-secondary">{project.deployment}</p>,
    },
    ...(project.constraints && project.constraints.length > 0
      ? [
          {
            label: "Constraints",
            content: (
              <ul className="measure-prose flex flex-col gap-3">
                {project.constraints.map((constraint) => (
                  <li key={constraint} className="flex gap-3">
                    <span className="t-code mt-1.5 shrink-0 text-clay-graphic" aria-hidden>
                      —
                    </span>
                    <span className="t-body text-ink-secondary">{constraint}</span>
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...(project.failureRecovery && project.failureRecovery.length > 0
      ? [
          {
            label: "What broke",
            content: (
              <div className="flex flex-col divide-y divide-rule">
                {project.failureRecovery.map((entry) => (
                  <div key={entry.symptom} className="py-7 first:pt-0 last:pb-0">
                    <p className="t-code text-clay">{entry.symptom}</p>
                    <div className="mt-4">
                      <DefinitionRow
                        columns={1}
                        definitions={[
                          { term: "Cause", value: entry.cause },
                          { term: "Fix", value: entry.fix },
                          { term: "Lesson", value: entry.lesson },
                        ]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
    {
      label: "Result",
      content: <p className="t-body measure-prose text-ink-secondary">{project.result}</p>,
    },
    {
      label: "Lessons",
      content: <p className="t-body measure-prose text-ink-secondary">{project.lessons}</p>,
    },
  ];

  const tocSections: TocSection[] = sections.map((section) => ({
    id: slugify(section.label),
    label: section.label,
  }));

  return (
    <article>
      <header className="border-b border-rule-strong">
        <Container className="pt-14 pb-14 md:pt-20 md:pb-16">
          <div className="grid-page">
            <div className="col-content">
              <p className="t-code text-ink-muted">~/work/{project.slug}</p>
              <p className="t-meta mt-3 text-ink-muted">
                System {pad(position)} of {pad(total)}{" "}
                <span className="text-clay-graphic">·</span> {project.type}
              </p>
              <h1 className="t-display mt-5 text-ink">{project.title}</h1>
              <p className="t-lead measure-lead mt-6 text-ink-secondary">{project.oneLiner}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <StageChip stage={project.stage} />
                <Link href={project.github} external>
                  View source on GitHub
                </Link>
              </div>

              <MetaList items={project.stack} className="mt-6" />
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-14 md:py-20">
        <div className="grid-page">
          <aside className="col-outboard hidden lg:order-2 lg:block">
            <div className="sticky top-28">
              <Toc sections={tocSections} />
            </div>
          </aside>

          <div className="col-body lg:order-1">
            {sections.map((section, i) => (
              <section
                key={section.label}
                id={tocSections[i].id}
                className="grid gap-4 border-t border-rule py-10 first:border-t-0 first:pt-0 md:gap-x-8 md:py-12 md:first:pt-0 lg:grid-cols-9"
                data-reveal
              >
                {/* The label sits in the margin, beside the prose — the
                    device this template is built on. It is always rendered:
                    it used to be display:none above lg, which removed it from
                    the accessibility tree and left every heading announcing
                    as just "01 /". */}
                <h2 className="t-meta text-ink-muted lg:col-span-2">
                  <span aria-hidden>
                    {pad(i + 1)} <span className="text-clay-graphic">/</span>{" "}
                  </span>
                  {section.label}
                </h2>
                <div className="min-w-0 lg:col-span-7">{section.content}</div>
                {section.figure && (
                  <div className="mt-2 min-w-0 lg:col-span-9 lg:col-start-1">
                    {section.figure}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-rule-strong pt-10 sm:flex-row sm:items-start sm:justify-between">
          <NextLink
            href="/work"
            className="t-meta group inline-flex min-h-11 items-center gap-2 rounded-sm text-ink-muted transition-colors duration-150 hover:text-clay"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
            All systems
          </NextLink>

          {(previous || next) && (
            <div className="flex flex-col gap-4 sm:items-end">
              {next && (
                <NextLink
                  href={`/work/${next.slug}`}
                  className="t-meta group inline-flex min-h-11 items-center gap-2 rounded-sm text-right text-ink-muted transition-colors duration-150 hover:text-clay"
                >
                  Next: {next.title}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                </NextLink>
              )}
              {previous && (
                <NextLink
                  href={`/work/${previous.slug}`}
                  className="t-meta group inline-flex min-h-11 items-center gap-2 rounded-sm text-ink-muted transition-colors duration-150 hover:text-clay"
                >
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
                  Previous: {previous.title}
                </NextLink>
              )}
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
