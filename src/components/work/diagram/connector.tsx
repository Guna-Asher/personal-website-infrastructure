import { Fragment } from "react";
import { connectorKind, nodeCenterPercent } from "@/lib/data/diagram";

/** 8×5 chevron, the only SVG in the diagram. */
function Chevron({ left }: { left: number }) {
  return (
    <svg
      viewBox="0 0 8 5"
      className="absolute bottom-0 h-[5px] w-2 -translate-x-1/2 text-ink-muted"
      style={{ left: `${left}%` }}
      aria-hidden
    >
      <path d="M0 0 L4 5 L8 0 Z" fill="currentColor" />
    </svg>
  );
}

function VLine({ left, top, height }: { left: number; top: number; height: number }) {
  return (
    <span
      aria-hidden
      className="absolute w-px -translate-x-1/2 bg-rule-strong"
      style={{ left: `${left}%`, top: `${top}%`, height: `${height}%` }}
    />
  );
}

function HLine({ from, to }: { from: number; to: number }) {
  return (
    <span
      aria-hidden
      className="absolute top-1/2 h-px bg-rule-strong"
      style={{ left: `${from}%`, width: `${to - from}%` }}
    />
  );
}

/**
 * The band between two layers.
 *
 * Every x position here comes from `nodeCenterPercent`, the same function the
 * layer grid uses to place the nodes. That is the whole point: a rail end or a
 * stub cannot drift away from the node it serves, because neither is measured
 * independently.
 */
export function Connector({ from, to }: { from: number; to: number }) {
  const kind = connectorKind(from, to);
  const mid = 50;

  return (
    <>
      {/* Mobile: the layers are a single stacked column, so the connector is
          one short spine on the rail's axis. */}
      <div className="relative h-7 md:hidden" aria-hidden>
        <span className="absolute top-0 left-3 h-full w-px bg-rule-strong" />
      </div>

      <div className="relative hidden h-12 md:block" aria-hidden>
        {kind === "spine" && (
          <>
            <VLine left={mid} top={0} height={100} />
            <Chevron left={mid} />
          </>
        )}

        {kind === "parallel" &&
          Array.from({ length: from }, (_, i) => {
            const x = nodeCenterPercent(i, from);
            return (
              <Fragment key={i}>
                <VLine left={x} top={0} height={100} />
                <Chevron left={x} />
              </Fragment>
            );
          })}

        {kind === "merge" && (
          <>
            {Array.from({ length: from }, (_, i) => (
              <VLine key={i} left={nodeCenterPercent(i, from)} top={0} height={50} />
            ))}
            <HLine from={nodeCenterPercent(0, from)} to={nodeCenterPercent(from - 1, from)} />
            <VLine left={mid} top={50} height={50} />
            <Chevron left={mid} />
          </>
        )}

        {kind === "split" && (
          <>
            <VLine left={mid} top={0} height={50} />
            <HLine from={nodeCenterPercent(0, to)} to={nodeCenterPercent(to - 1, to)} />
            {Array.from({ length: to }, (_, i) => {
              const x = nodeCenterPercent(i, to);
              return (
                <Fragment key={i}>
                  <VLine left={x} top={50} height={50} />
                  <Chevron left={x} />
                </Fragment>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
