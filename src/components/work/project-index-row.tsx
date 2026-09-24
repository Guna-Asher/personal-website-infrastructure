import Link from "next/link";
import { CornerMarks } from "@/components/ui/corner-marks";
import { InteractiveLink } from "@/components/ui/interactive-link";
import type { ProjectCaseStudy } from "@/lib/data/projects";

export function ProjectIndexRow({ project, index }: { project: ProjectCaseStudy; index: string }) {
  return (
    <li className="group relative border-b border-border py-8">
      <CornerMarks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link
        href={`/work/${project.slug}`}
        className="block rounded-sm px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:px-4"
      >
        <div className="grid grid-cols-[3rem_1fr] gap-x-6 gap-y-4 md:grid-cols-[4rem_1fr] md:gap-x-10">
          <span className="font-mono text-sm text-muted">{index}</span>
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs tracking-widest text-muted uppercase">
              {project.type} · {project.stage}
            </p>
            <p className="mt-3 max-w-lg text-muted">{project.oneLiner}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-4 pl-[3.25rem] md:pl-[4.75rem]">
        <InteractiveLink href={project.github} external>
          View source on GitHub
        </InteractiveLink>
      </div>
    </li>
  );
}
