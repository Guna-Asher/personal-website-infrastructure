import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";
import { CornerMarks } from "@/components/ui/corner-marks";
import { InteractiveLink } from "@/components/ui/interactive-link";
import { MetaList } from "@/components/ui/meta-list";
import type { ProjectCaseStudy } from "@/lib/data/projects";

export const ROW_GRID = "lg:grid-cols-[5.5rem_1fr_13rem_5rem]";

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
    <li className="group relative border-b border-border transition-colors duration-300 hover:bg-surface">
      <CornerMarks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible/link:opacity-100" />

      <RevealText as="div" delay={delay}>
        <Link
          href={`/work/${project.slug}`}
          className={`group/link grid grid-cols-1 gap-x-6 gap-y-4 rounded-sm px-1 py-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:px-2 md:py-12 lg:grid ${ROW_GRID}`}
        >
          <span
            className="font-display text-5xl font-semibold tracking-tight text-muted/40 transition-colors group-hover/link:text-accent/60 group-focus-visible/link:text-accent/60 md:text-6xl"
            aria-hidden
          >
            {index}
          </span>

          <h3
            className={`font-display font-semibold tracking-tight transition-colors group-hover/link:text-accent group-focus-visible/link:text-accent ${
              emphasis ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
            }`}
          >
            {project.title}
          </h3>

          <div className="flex items-center gap-3 lg:contents">
            <p className="font-mono text-xs tracking-widest text-muted uppercase lg:pt-1">{project.type}</p>
            <span className="text-accent/70 lg:hidden" aria-hidden>
              ·
            </span>
            <p className="font-mono text-xs tracking-widest text-muted uppercase lg:pt-1">{project.stage}</p>
          </div>

          <div className="min-w-0 lg:col-start-2 lg:col-span-3">
            <p className="font-mono text-xs text-muted/60">~/work/{project.slug}</p>
            <p className="mt-3 max-w-lg text-muted">{project.oneLiner}</p>
            <p className="mt-3 max-w-lg font-mono text-xs text-muted/80">{project.flow}</p>
            <MetaList items={project.stack} className="mt-4 font-mono text-xs text-muted" />
            <p className="mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted uppercase transition-colors group-hover/link:text-accent group-focus-visible/link:text-accent">
              View case study
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
                aria-hidden
              />
            </p>
          </div>
        </Link>

        <div className={`px-1 pb-8 md:px-2 lg:grid ${ROW_GRID}`}>
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
