import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { RevealText } from "@/components/ui/reveal-text";
import { AmbientLayer } from "@/components/ui/ambient-layer";
import { ProjectIndexRow, ROW_GRID } from "@/components/work/project-index-row";
import { SkillsSection } from "@/components/skills/skills-section";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work — Guna R",
  description: "Three systems Guna R has built, deployed, and operated end to end.",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative isolate">
        <AmbientLayer seed="work" variant="sparse" />
        <Container className="py-20 md:py-28">
          <RevealText as="div">
            <p className="font-mono text-sm tracking-widest text-muted uppercase">Work</p>
            <p className="font-display text-lead mt-4 max-w-2xl font-semibold tracking-tight">
              I&apos;m early in my career and I&apos;d rather show that honestly through working systems
              than dress it up.
            </p>
            <p className="mt-4 max-w-2xl text-muted">
              Three projects, each built, deployed, and operated end to end. What follows is what each
              one actually does — the problem, the architecture, the decisions, and what I&apos;d change.
            </p>
          </RevealText>
        </Container>
      </section>

      <Container>
        <div className={`hidden border-b border-border-strong pb-3 lg:grid ${ROW_GRID}`}>
          <span className="font-mono text-[11px] tracking-widest text-muted/70 uppercase">Index</span>
          <span className="font-mono text-[11px] tracking-widest text-muted/70 uppercase">System</span>
          <span className="font-mono text-[11px] tracking-widest text-muted/70 uppercase">Type</span>
          <span className="font-mono text-[11px] tracking-widest text-muted/70 uppercase">Stage</span>
        </div>
        <ol className="list-none">
          {projects.map((project, i) => (
            <ProjectIndexRow
              key={project.slug}
              project={project}
              index={String(i + 1).padStart(2, "0")}
              delay={i * 0.05}
              emphasis={i === 0}
            />
          ))}
        </ol>
      </Container>

      <SkillsSection />
    </>
  );
}
