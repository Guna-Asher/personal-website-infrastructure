import type { EngineeringDecision } from "@/lib/data/projects";

export function DecisionBlock({
  decision,
  index,
}: {
  decision: EngineeringDecision;
  index: number;
}) {
  return (
    <div className="border-l-2 border-rule-strong py-1 pl-5">
      <div className="flex items-baseline gap-3">
        <span className="t-code text-clay-graphic">{String(index).padStart(2, "0")}</span>
        <h3 className="t-title text-ink">{decision.title}</h3>
      </div>
      <dl className="mt-4 flex flex-col gap-4">
        <div>
          <dt className="t-meta text-ink-muted">Decision</dt>
          <dd className="t-ui mt-1.5 text-ink-secondary">{decision.decision}</dd>
        </div>
        <div>
          <dt className="t-meta text-ink-muted">Reason</dt>
          <dd className="t-ui mt-1.5 text-ink-secondary">{decision.reason}</dd>
        </div>
        {decision.tradeoff && (
          <div>
            <dt className="t-meta text-kraft">Tradeoff</dt>
            <dd className="t-ui mt-1.5 text-ink-secondary">{decision.tradeoff}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
