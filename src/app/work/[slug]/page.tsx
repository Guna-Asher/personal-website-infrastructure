import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/work/case-study";
import { projects } from "@/lib/data/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Guna R`,
    description: project.oneLiner,
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const position = projects.findIndex((p) => p.slug === slug);
  if (position === -1) notFound();

  return (
    <CaseStudy
      project={projects[position]}
      position={position + 1}
      total={projects.length}
      previous={projects[position - 1]}
      next={projects[position + 1]}
    />
  );
}
