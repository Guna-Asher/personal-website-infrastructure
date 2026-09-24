import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";
import { CornerMarks } from "@/components/ui/corner-marks";
import { InteractiveLink } from "@/components/ui/interactive-link";
import { MetaList } from "@/components/ui/meta-list";
import type { ProjectCaseStudy } from "@/lib/data/projects";

// Four real zones spanning the full row width: index, system identity, a
// flexible technical-summary column (no artificial max-width — it uses
// whatever space remains), and stage. This is what makes the page read as
// a registry rather than three narrow blocks with empty space beside them.
export const ROW_GRID = "lg:grid-cols-[4.5rem_17rem_1fr_9rem]";

export function ProjectIndexRow({
  project,
  index,
  delay = 0,
  emphasis = false,
}: {
  project: ProjectCaseStudy;
  index: string;
  delay?: number;
  emphasis?: boolean;
}) {
  return (
    <li className="group relative border-b border-border">
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-within:scale-y-100"
      />
      <CornerMarks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible/link:opacity-100" />

      <RevealText as="div" delay={delay}>
        <Link
          href={`/work/${project.slug}`}
          className={`group/link grid grid-cols-1 gap-x-8 gap-y-5 rounded-sm px-4 py-10 transition-colors duration-300 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:py-12 lg:grid ${ROW_GRID}`}
        >
          <span
            className="font-display text-5xl font-semibold tracking-tight text-muted/40 transition-colors group-hover/link:text-accent/60 group-focus-visible/link:text-accent/60 md:text-6xl"
            aria-hidden
          >
            {index}
          </span>

          <div className="min-w-0">
            <h3
              className={`font-display font-semibold tracking-tight transition-colors group-hover/link:text-accent group-focus-visible/link:text-accent ${
                emphasis ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
              }`}
            >
              {project.title}
            </h3>
            <p className="mt-2 font-mono text-xs text-muted/60">~/work/{project.slug}</p>
            <p className="mt-3 font-mono text-xs tracking-widest text-muted uppercase">{project.type}</p>
          </div>

          <div className="min-w-0">
            <p className="text-muted">{project.oneLiner}</p>
            <p className="mt-3 font-mono text-xs text-muted/80">{project.flow}</p>
            <MetaList items={project.stack} className="mt-4 font-mono text-xs text-muted" />
          </div>

          <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-start lg:justify-start">
            <p className="font-mono text-xs tracking-widest text-muted uppercase">{project.stage}</p>
            <p className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted uppercase transition-colors group-hover/link:text-accent group-focus-visible/link:text-accent lg:mt-6">
              View system
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
                aria-hidden
              />
            </p>
          </div>
        </Link>

        <div className={`px-4 pb-8 lg:grid ${ROW_GRID}`}>
          <div className="lg:col-start-2">
            <InteractiveLink href={project.github} external>
              View source on GitHub
            </InteractiveLink>
          </div>
        </div>
      </RevealText>
    </li>
  );
}
