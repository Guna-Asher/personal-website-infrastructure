import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { MetaList } from "@/components/ui/meta-list";
import { StageChip } from "@/components/ui/chip";
import type { ProjectCaseStudy } from "@/lib/data/projects";

/**
 * One system in the index. Used on the homepage and on /work from one
 * component, so the two can't drift.
 *
 * The row is laid out on the page's own 12-column grid rather than a bespoke
 * track: the numeral takes the margin columns (where section labels live) and
 * the title starts on the prose edge, so a full-width row lines up with the
 * headings above it instead of sitting 16px off.
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
          edge. Sits flush with the hover surface, which extends into the
          gutter so the row content can align to the grid. */}
      <span
        aria-hidden
        className="absolute top-0 bottom-0 -left-4 w-0.5 origin-top scale-y-0 bg-clay-graphic transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-within:scale-y-100"
      />

      <Link
        href={`/work/${project.slug}`}
        className="grid-page -mx-4 rounded-sm px-4 py-9 transition-colors duration-200 hover:bg-raised md:py-12"
      >
        <span
          className="col-row-id font-serif text-4xl leading-none font-medium tracking-tight text-ink-muted transition-colors duration-200 group-hover:text-clay-graphic md:text-5xl"
          aria-hidden
        >
          {index}
        </span>

        <div className="col-row-identity min-w-0">
          <Heading className="t-title text-ink transition-colors duration-200 group-hover:text-clay">
            {project.title}
          </Heading>
          <p className="t-meta mt-3 text-ink-muted">{project.type}</p>
        </div>

        <div className="col-row-summary min-w-0">
          <p className="t-ui text-ink-secondary">{project.oneLiner}</p>
          {/* The real compressed flow from the architecture diagram — the one
              line that tells an engineer what this system actually is. */}
          <p className="t-code mt-4 text-ink-muted">{project.flow}</p>
          <MetaList items={project.stack} className="mt-2.5" />
        </div>

        <div className="col-row-meta flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-start lg:justify-start">
          <StageChip stage={project.stage} />
          <p className="t-meta inline-flex items-center gap-2 text-ink-muted transition-colors duration-200 group-hover:text-clay lg:mt-6">
            View
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </p>
        </div>
      </Link>
    </li>
  );
}
