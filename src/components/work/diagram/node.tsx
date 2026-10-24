import type { DiagramNode, DiagramNodeKind } from "@/lib/data/diagram";

/**
 * Not everything is a box. A box means "a component that exists inside the
 * system"; people outside it and events that merely happen are set as type,
 * so the border carries meaning instead of decorating every label equally.
 */
const BOXED: Record<DiagramNodeKind, boolean> = {
  actor: false,
  service: true,
  store: true,
  event: false,
};

export function DiagramNodeView({
  node,
  align = "center",
  cap = true,
  className = "",
}: {
  node: DiagramNode;
  /** Centred under its connector by default; side branches read better left. */
  align?: "center" | "left";
  /** Drop the width cap when the node shares its cell with a side branch. */
  cap?: boolean;
  className?: string;
}) {
  const kind = node.kind ?? "service";
  const alignment = align === "center" ? "md:text-center" : "";

  if (!BOXED[kind]) {
    return (
      <div className={`${alignment} ${className}`}>
        <p className={`t-meta ${kind === "event" ? "text-clay" : "text-ink-muted"}`}>
          {node.label}
        </p>
        {node.note && <p className="t-code mt-1.5 text-ink-muted">{node.note}</p>}
      </div>
    );
  }

  const ruled = kind === "store" || node.emphasis;

  return (
    <div
      // Capped and centred so a layer holding one node doesn't stretch its box
      // across the whole panel. Centring keeps the box's centre on the track's
      // centre, which is where the connectors arrive.
      className={`rounded-sm border bg-canvas px-3.5 py-3 ${
        cap ? "md:mx-auto md:w-full md:max-w-sm" : ""
      } ${
        ruled ? "border-rule-strong border-l-2 border-l-clay-graphic" : "border-rule"
      } ${alignment} ${className}`}
    >
      <p className="t-ui text-ink">{node.label}</p>
      {node.note && <p className="t-code mt-1.5 text-ink-muted">{node.note}</p>}
    </div>
  );
}
