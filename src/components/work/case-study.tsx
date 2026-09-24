import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InteractiveLink } from "@/components/ui/interactive-link";
import { ArchitectureDiagram } from "./architecture-diagram";
import { DecisionBlock } from "./decision-block";
import type { ProjectCaseStudy } from "@/lib/data/projects";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type Section = { label: string; content: ReactNode };

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
}: {
  project: ProjectCaseStudy;
  position: number;
  total: number;
}) {
  const sections: Section[] = [
    {
      label: "Problem",
      content: <p className="max-w-2xl text-muted">{project.problem}</p>,
    },
    {
      label: "Architecture",
      content: (
        <>
          <p className="max-w-2xl text-muted">{project.architecture.summary}</p>
          <p className="mt-6 font-mono text-xs tracking-widest text-muted/70 uppercase">
            Fig. 01 — System flow
          </p>
          <ArchitectureDiagram diagram={project.architecture.diagram} />
        </>
      ),
    },
    ...(project.decisions.length > 0
      ? [
          {
            label: "Engineering decisions",
            content: (
              <div className="flex flex-col gap-4">
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
      content: <p className="max-w-2xl text-muted">{project.deployment}</p>,
    },
    ...(project.constraints && project.constraints.length > 0
      ? [
          {
            label: "Constraints",
            content: (
              <ul className="max-w-2xl list-disc space-y-2 pl-5 text-muted">
                {project.constraints.map((constraint) => (
                  <li key={constraint}>{constraint}</li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...(project.failureRecovery && project.failureRecovery.length > 0
      ? [
          {
            label: "Failure & recovery",
            content: (
              <div className="flex flex-col divide-y divide-border">
                {project.failureRecovery.map((entry) => (
                  <div key={entry.symptom} className="grid gap-x-8 gap-y-3 py-6 first:pt-0 md:grid-cols-2">
                    <div>
                      <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Symptom</p>
                      <p className="mt-1 text-muted">{entry.symptom}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Cause</p>
                      <p className="mt-1 text-muted">{entry.cause}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Fix</p>
                      <p className="mt-1 text-muted">{entry.fix}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Lesson</p>
                      <p className="mt-1 text-muted">{entry.lesson}</p>
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
      content: <p className="max-w-2xl text-muted">{project.result}</p>,
    },
    {
      label: "Lessons",
      content: <p className="max-w-2xl text-muted">{project.lessons}</p>,
    },
  ];

  return (
    <article>
      <Container className="py-16 md:py-24">
        <header>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            System {pad(position)} of {pad(total)} · {project.type} · {project.stage}
          </p>
          <h1 className="font-display text-heading mt-3 font-medium tracking-tight">{project.title}</h1>
          <p className="text-lead mt-5 max-w-2xl text-muted">{project.oneLiner}</p>
          <p className="mt-6 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
          <div className="mt-5">
            <InteractiveLink href={project.github} external>
              View source on GitHub
            </InteractiveLink>
          </div>
        </header>

        <div className="mt-16">
          {sections.map((section, i) => (
            <section
              key={section.label}
              className="grid gap-4 border-t border-border py-10 first:border-t-0 first:pt-0 md:grid-cols-[8rem_1fr] md:gap-10 md:py-12 md:first:pt-0"
            >
              <div className="flex items-baseline gap-3 md:block">
                <span className="font-mono text-xs text-muted">{pad(i + 1)}</span>
                <h2 className="font-mono text-xs tracking-widest text-muted uppercase md:mt-2">
                  {section.label}
                </h2>
              </div>
              <div>{section.content}</div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-sm font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to Work
          </Link>
        </div>
      </Container>
    </article>
  );
}
