import type { DiagramSpec } from "@/lib/data/diagram";
import { Diagram } from "./diagram/diagram";

/**
 * The panel an architecture diagram sits in: raised surface, hairline border,
 * clay left edge. The drawing itself is structured data rather than
 * hand-aligned text, so it reflows at every width instead of needing to be
 * scrolled sideways.
 */
export function ArchitectureDiagram({ diagram }: { diagram: DiagramSpec }) {
  return (
    <div className="mt-4 rounded-md border border-rule border-l-2 border-l-clay-graphic bg-raised">
      <Diagram spec={diagram} />
    </div>
  );
}
