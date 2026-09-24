import Link from "next/link";
import { Container } from "@/components/ui/container";
import { InteractiveLink } from "@/components/ui/interactive-link";
import { ArchitectureDiagram } from "./architecture-diagram";
import { DecisionBlock } from "./decision-block";
import type { ProjectCaseStudy } from "@/lib/data/projects";

/**
 * One reusable template for every project. Sections beyond Problem/
 * Architecture/Deployment/Result/Lessons render only when the project's
 * data actually has content for them — nothing is padded to fill the shape.
 */
export function CaseStudy({ project }: { project: ProjectCaseStudy }) {
  return (
    <article>
      <Container className="py-16 md:py-24">
        <header>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            {project.type} · {project.stage}
          </p>
          <h1 className="font-display text-heading mt-2 font-medium tracking-tight">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{project.oneLiner}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <InteractiveLink href={project.github} external>
              View source on GitHub
            </InteractiveLink>
          </div>
        </header>

        <section className="mt-16">
          <h2 className="font-display text-xl font-medium tracking-tight">Problem</h2>
          <p className="mt-3 max-w-2xl text-muted">{project.problem}</p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-xl font-medium tracking-tight">Architecture</h2>
          <p className="mt-3 max-w-2xl text-muted">{project.architecture.summary}</p>
          <ArchitectureDiagram diagram={project.architecture.diagram} />
        </section>

        {project.decisions.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-xl font-medium tracking-tight">Engineering decisions</h2>
            <div className="mt-4 flex flex-col gap-4">
              {project.decisions.map((decision) => (
                <DecisionBlock key={decision.title} decision={decision} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-16">
          <h2 className="font-display text-xl font-medium tracking-tight">Deployment</h2>
          <p className="mt-3 max-w-2xl text-muted">{project.deployment}</p>
        </section>

        {project.constraints && project.constraints.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-xl font-medium tracking-tight">Constraints</h2>
            <ul className="mt-3 max-w-2xl list-disc space-y-1 pl-5 text-muted">
              {project.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          </section>
        )}

        {project.failureRecovery && project.failureRecovery.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-xl font-medium tracking-tight">Failure &amp; recovery</h2>
            <div className="mt-4 flex flex-col gap-6">
              {project.failureRecovery.map((entry) => (
                <div key={entry.symptom} className="rounded-md border border-border p-5">
                  <dl className="flex flex-col gap-3 text-sm">
                    <div>
                      <dt className="font-mono text-xs tracking-widest text-muted uppercase">Symptom</dt>
                      <dd className="mt-1 text-muted">{entry.symptom}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs tracking-widest text-muted uppercase">Cause</dt>
                      <dd className="mt-1 text-muted">{entry.cause}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs tracking-widest text-muted uppercase">Fix</dt>
                      <dd className="mt-1 text-muted">{entry.fix}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs tracking-widest text-muted uppercase">Lesson</dt>
                      <dd className="mt-1 text-muted">{entry.lesson}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16">
          <h2 className="font-display text-xl font-medium tracking-tight">Result</h2>
          <p className="mt-3 max-w-2xl text-muted">{project.result}</p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-xl font-medium tracking-tight">Lessons</h2>
          <p className="mt-3 max-w-2xl text-muted">{project.lessons}</p>
        </section>

        <div className="mt-20">
          <Link
            href="/work"
            className="rounded-sm font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            ← Back to Work
          </Link>
        </div>
      </Container>
    </article>
  );
}
