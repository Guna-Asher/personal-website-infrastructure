import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { IndexRow } from "@/components/work/index-row";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Three projects Guna R has built and deployed, with the architecture and decisions behind each one.",
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
            Each write-up covers what the project does, how it&apos;s built, and the decisions I
            made along the way. Where I&apos;d do something differently now, I&apos;ve said so.
          </>
        }
      />

      <Container className="pb-20 md:pb-28">
        {/* The column header is what makes this read as a registry rather
            than three cards. It sits on the same grid as the rows. */}
        <div className="grid-page hidden border-b border-rule-strong pt-10 pb-3 lg:grid">
          <span className="t-meta col-row-id text-ink-muted">Index</span>
          <span className="t-meta col-row-identity text-ink-muted">System</span>
          <span className="t-meta col-row-summary text-ink-muted">Summary</span>
          <span className="t-meta col-row-meta text-ink-muted">Stage</span>
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
    </>
  );
}
