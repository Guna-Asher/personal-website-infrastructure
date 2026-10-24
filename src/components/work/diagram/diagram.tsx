import { describeDiagram, type DiagramSpec } from "@/lib/data/diagram";
import { DiagramNodeView } from "./node";
import { Connector } from "./connector";

/**
 * A layered architecture diagram.
 *
 * Desktop: layer names sit in a margin column — the same margin-label device
 * the rest of the site uses — with the nodes in horizontal rows and orthogonal
 * connectors between them.
 *
 * Mobile: one vertical column behind a shared rail. It reflows rather than
 * scaling, so nothing shrinks below its normal size and nothing has to be
 * dragged sideways to be read.
 */
/**
 * One track definition, shared by the layer rows and the connector bands. The
 * band must sit in the same grid column as the nodes, or its percentages are
 * measured against the label track too and every endpoint lands half a label
 * column off.
 */
const TRACK =
  "md:grid md:grid-cols-[6.5rem_1fr] md:gap-6 lg:grid-cols-[7.5rem_1fr] lg:gap-8";

export function Diagram({ spec }: { spec: DiagramSpec }) {
  return (
    <div className="px-4 py-6 md:px-6 md:py-8">
      <p className="sr-only">{describeDiagram(spec)}</p>

      <div aria-hidden>
        {spec.layers.map((layer, layerIndex) => {
          const previous = spec.layers[layerIndex - 1];
          const count = layer.nodes.length;

          return (
            <div key={`${layer.label}-${layerIndex}`}>
              {previous && (
                <div className={TRACK}>
                  <span aria-hidden />
                  <Connector from={previous.nodes.length} to={count} />
                </div>
              )}

              <div className={`${TRACK} md:items-center`}>
                <p className="t-meta text-ink-muted md:text-right">{layer.label}</p>

                {/* One `repeat(count, 1fr)` track per node. The connector band
                    calls nodeCenterPercent with this same count, which is what
                    keeps every rail end and stub on its node. */}
                {/* No column gap. nodeCenterPercent() describes the centre of
                    an equal-width track, which is only true when the tracks
                    are not separated by one — a gap pulls the outer endpoints
                    inward by half its width. Breathing room comes from padding
                    inside each cell, which is symmetric and so leaves the
                    track centre and the node centre identical. */}
                <div
                  className="mt-3 ml-3 flex flex-col gap-3 border-l border-rule-strong pl-5 md:mt-0 md:ml-0 md:grid md:gap-x-0 md:border-l-0 md:pl-0"
                  style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
                >
                  {layer.nodes.map((node) => (
                    <div key={node.id} className="relative min-w-0 md:px-3 lg:px-4">
                      {/* Stub off the mobile rail. */}
                      <span
                        aria-hidden
                        className="absolute top-1/2 -left-5 h-px w-3 bg-rule-strong md:hidden"
                      />

                      {node.aside ? (
                        /* Three symmetric columns: the node sits in the middle
                           one so it stays centred on the track, and therefore
                           on the spine, while the branch takes the third. A
                           two-column split would shift the node off-axis and
                           the incoming connector would land in the gap. */
                        <div className="md:grid md:grid-cols-3 md:items-center md:gap-4">
                          <span aria-hidden className="hidden md:block" />

                          <div className="min-w-0">
                            <DiagramNodeView node={node} cap={false} />
                          </div>

                          <div className="mt-3 flex min-w-0 items-center gap-3 md:mt-0">
                            <span
                              aria-hidden
                              className="h-px w-4 shrink-0 bg-rule-strong"
                            />
                            <DiagramNodeView
                              align="left"
                              cap={false}
                              className="min-w-0 flex-1"
                              node={{
                                id: `${node.id}-aside`,
                                label: node.aside.label,
                                note: node.aside.note,
                                kind: node.aside.kind ?? "store",
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <DiagramNodeView node={node} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {spec.footnotes && spec.footnotes.length > 0 && (
        <div className="mt-8 border-t border-rule pt-5 md:mt-10" aria-hidden>
          {spec.footnotes.map((footnote) => (
            <p key={footnote} className="t-code text-ink-muted">
              {footnote}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
