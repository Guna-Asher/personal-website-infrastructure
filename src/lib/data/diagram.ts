/**
 * Structured architecture diagrams.
 *
 * These used to be hand-aligned ASCII in template literals, which is why the
 * drawings had off-by-one spines, junctions sitting over empty space, and
 * labels overhanging their connectors by up to seven columns. Authors now
 * describe the architecture as layers of nodes; the renderer derives every
 * connector from the same expression it uses to place the nodes, so a
 * connector cannot land anywhere other than on the node it belongs to.
 */

export type DiagramNodeKind =
  /** Someone or something outside the system boundary. Rendered unboxed. */
  | "actor"
  /** A component inside the system. Rendered as a box. */
  | "service"
  /** Persistent storage. Boxed, with a clay left rule. */
  | "store"
  /** Something that happens rather than something that exists. Unboxed, clay. */
  | "event";

export type DiagramNode = {
  id: string;
  label: string;
  /** A short qualifier under the label, e.g. "no account". */
  note?: string;
  /** Defaults to "service". */
  kind?: DiagramNodeKind;
  /** The node the surrounding prose is about. Gets the clay rule. */
  emphasis?: boolean;
  /** A side branch off this node — something it talks to without the main
   *  flow passing through, e.g. a backend writing to its database. */
  aside?: { label: string; note?: string; kind?: DiagramNodeKind };
};

export type DiagramLayer = {
  /** Named layer, shown in the margin: "Clients", "Persistence", … */
  label: string;
  nodes: DiagramNode[];
};

export type DiagramSpec = {
  layers: DiagramLayer[];
  /** Facts that are true of the whole diagram but sit outside the flow,
   *  e.g. "Trigger: cron, hourly". */
  footnotes?: string[];
};

/** How one layer connects to the next. Derived, never authored. */
export type ConnectorKind = "spine" | "split" | "merge" | "parallel";

export function connectorKind(from: number, to: number): ConnectorKind {
  if (from === 1 && to === 1) return "spine";
  if (from === 1) return "split";
  if (to === 1) return "merge";
  return "parallel";
}

/**
 * The single source of horizontal position. A layer of `count` nodes is laid
 * out as `repeat(count, 1fr)`, so node `index` is centred here. The connector
 * band calls this same function for its rails and stubs — that shared call is
 * what makes the endpoints correct by construction.
 */
export function nodeCenterPercent(index: number, count: number): number {
  return ((index + 0.5) / count) * 100;
}

function spoken(text: string): string {
  // "+" and em dashes read badly in a screen reader.
  return text.replace(/\s+\+\s+/g, " and ").replace(/\s*—\s*/g, ", ");
}

function list(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * Prose description of the diagram, rendered visually hidden beside it. The
 * `<pre>` this replaced gave a screen reader rows of box-drawing characters
 * and conveyed no relationship between any two nodes.
 */
export function describeDiagram(spec: DiagramSpec): string {
  const sentences: string[] = [`Architecture diagram with ${spec.layers.length} layers.`];

  spec.layers.forEach((layer, i) => {
    const names = layer.nodes.map((n) => (n.note ? `${n.label} (${spoken(n.note)})` : n.label));
    // Agree with the number of nodes in the layer doing the connecting, and
    // leave the layer's own name cased as written — lowercasing it turned
    // "API surface" into "api surface".
    const sources = spec.layers[i - 1]?.nodes.length ?? 0;
    const verb = sources === 1 ? "This connects" : "These connect";
    const lead = i === 0 ? `${layer.label}:` : `${verb} to ${layer.label}:`;
    sentences.push(`${lead} ${list(names)}.`);

    for (const node of layer.nodes) {
      if (!node.aside) continue;
      const note = node.aside.note ? ` (${spoken(node.aside.note)})` : "";
      sentences.push(`${node.label} also connects to ${node.aside.label}${note}.`);
    }
  });

  for (const footnote of spec.footnotes ?? []) sentences.push(`${spoken(footnote)}.`);

  return sentences.join(" ");
}
