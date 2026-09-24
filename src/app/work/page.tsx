import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ProjectIndexRow } from "@/components/work/project-index-row";
import { SkillsSection } from "@/components/skills/skills-section";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work — Guna R",
  description: "Three systems Guna R has built, deployed, and operated end to end.",
};

export default function WorkPage() {
  return (
    <>
      <Container className="py-16 md:py-24">
        <p className="font-display text-lead max-w-2xl font-medium tracking-tight">
          I&apos;m early in my career and I&apos;d rather show that honestly through working systems
          than dress it up.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          Three projects, each built, deployed, and operated end to end. What follows is what each one
          actually does — the problem, the architecture, the decisions, and what I&apos;d change.
        </p>

        <ol className="mt-12 list-none">
          {projects.map((project, i) => (
            <ProjectIndexRow key={project.slug} project={project} index={String(i + 1).padStart(2, "0")} />
          ))}
        </ol>
      </Container>

      <SkillsSection />
    </>
  );
}
