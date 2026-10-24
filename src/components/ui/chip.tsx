import type { ProjectStage } from "@/lib/data/projects";

const TONE: Record<ProjectStage, string> = {
  Shipped: "bg-cactus text-cactus-ink",
  MVP: "bg-manilla text-manilla-ink",
};

/**
 * The only place color is used to classify something. Reads a project's own
 * `stage` field — not a decorative badge.
 */
export function StageChip({ stage }: { stage: ProjectStage }) {
  return (
    <span className={`t-meta inline-flex rounded-sm px-2 py-1 ${TONE[stage]}`}>{stage}</span>
  );
}
