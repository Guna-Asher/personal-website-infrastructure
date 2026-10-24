import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { IndexRow, ROW_GRID } from "@/components/work/index-row";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Systems",
  description: "Three systems Guna R has built, deployed, and operated end to end.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Index / Systems"
        title={
          <>
            I&apos;m early in my career and I&apos;d rather show that honestly through working
            systems than dress it up.
          </>
        }
        standfirst={
          <>
            Three projects, each built, deployed, and operated end to end. What follows is what
            each one actually does — the problem, the architecture, the decisions, and what
            I&apos;d change.
          </>
        }
      />

      <Container>
        {/* The column header is what makes this read as a registry rather
            than three cards. It only exists where the grid does. */}
        <div
          className={`hidden border-b border-rule-strong px-4 pt-10 pb-3 lg:grid ${ROW_GRID}`}
        >
          <span className="t-meta text-ink-muted">Index</span>
          <span className="t-meta text-ink-muted">System</span>
          <span className="t-meta text-ink-muted">Summary</span>
          <span className="t-meta text-ink-muted">Stage</span>
        </div>

        <ol className="list-none border-t border-rule lg:border-t-0">
          {projects.map((project, i) => (
            <IndexRow
              key={project.slug}
              project={project}
              index={String(i + 1).padStart(2, "0")}
              delay={i * 60}
              headingLevel="h2"
            />
          ))}
        </ol>
      </Container>

      <div className="h-20 md:h-28" />
    </>
  );
}
