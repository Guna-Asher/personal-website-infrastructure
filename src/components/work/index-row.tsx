import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { MetaList } from "@/components/ui/meta-list";
import { StageChip } from "@/components/ui/chip";
import type { ProjectCaseStudy } from "@/lib/data/projects";

// Four real zones spanning the full row width: index, system identity, a
// flexible technical-summary column (no artificial max-width — it uses
// whatever space remains), and stage. This is what makes the page read as
// a registry rather than three narrow blocks with empty space beside them.
export const ROW_GRID = "lg:grid-cols-[4.5rem_17rem_1fr_8rem]";

/**
 * One system in the index. Used in two placements — the homepage and /work —
 * from one component, so the two can't drift apart.
 */
export function IndexRow({
  project,
  index,
  delay = 0,
  headingLevel = "h3",
}: {
  project: ProjectCaseStudy;
  index: string;
  delay?: number;
  /** h3 inside a numbered Section (the homepage), h2 when the list is the
   *  page's own primary content (/work). */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <li
      className="group relative border-b border-rule"
      data-reveal
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {/* The row's state indicator: a clay rule that grows down the leading
          edge. The only motion in the index, and it reports hover/focus
          rather than decorating. */}
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-0.5 origin-top scale-y-0 bg-clay-graphic transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-within:scale-y-100"
      />

      <Link
        href={`/work/${project.slug}`}
        className={`grid grid-cols-1 gap-x-8 gap-y-5 rounded-sm px-4 py-9 transition-colors duration-200 hover:bg-raised md:py-11 lg:grid ${ROW_GRID}`}
      >
        {/* Sized independently of .t-display, which reaches 68px at >=1200
            and would overflow the index column. */}
        <span
          className="font-serif text-4xl leading-none font-medium tracking-tight text-ink-muted/40 transition-colors duration-200 group-hover:text-clay-graphic md:text-5xl"
          aria-hidden
        >
          {index}
        </span>

        <div className="min-w-0">
          <Heading className="t-title text-ink transition-colors duration-200 group-hover:text-clay">
            {project.title}
          </Heading>
          <p className="t-code mt-2 text-ink-muted">~/work/{project.slug}</p>
          <p className="t-meta mt-3 text-ink-muted">{project.type}</p>
        </div>

        <div className="min-w-0">
          <p className="t-ui text-ink-secondary">{project.oneLiner}</p>
          {/* The real compressed flow from the architecture diagram — the one
              line that tells an engineer what this system actually is. */}
          <p className="t-code mt-3 text-ink-muted">{project.flow}</p>
          <MetaList items={project.stack} className="mt-4" />
        </div>

        <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-start lg:justify-start">
          <StageChip stage={project.stage} />
          <p className="t-meta inline-flex items-center gap-2 text-ink-muted transition-colors duration-200 group-hover:text-clay lg:mt-6">
            View system
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </p>
        </div>
      </Link>
    </li>
  );
}
