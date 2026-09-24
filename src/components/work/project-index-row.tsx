import Link from "next/link";
import { RevealText } from "@/components/ui/reveal-text";
import { CornerMarks } from "@/components/ui/corner-marks";
import { InteractiveLink } from "@/components/ui/interactive-link";
import type { ProjectCaseStudy } from "@/lib/data/projects";

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
    <li className="group relative border-b border-border py-10 md:py-12">
      <CornerMarks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <RevealText as="div" delay={delay}>
        <Link
          href={`/work/${project.slug}`}
          className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[5.5rem_1fr] md:gap-10">
            <span
              className="font-display text-5xl font-medium tracking-tight text-muted/40 transition-colors group-hover:text-accent/60 md:text-6xl"
              aria-hidden
            >
              {index}
            </span>
            <div className="min-w-0">
              <h3
                className={`font-display font-medium tracking-tight transition-colors group-hover:text-accent ${
                  emphasis ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
                }`}
              >
                {project.title}
              </h3>
              <p className="mt-2 font-mono text-xs tracking-widest text-muted uppercase">
                {project.type} · {project.stage}
              </p>
              <p className="mt-4 max-w-lg text-muted">{project.oneLiner}</p>
              <p className="mt-3 max-w-lg font-mono text-xs text-muted/80">{project.flow}</p>
              <p className="mt-4 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
            </div>
          </div>
        </Link>

        <div className="mt-5 md:pl-[7.5rem]">
          <InteractiveLink href={project.github} external>
            View source on GitHub
          </InteractiveLink>
        </div>
      </RevealText>
    </li>
  );
}
