import type { EngineeringDecision } from "@/lib/data/projects";

export function DecisionBlock({ decision }: { decision: EngineeringDecision }) {
  return (
    <div className="rounded-md border border-border p-5">
      <h3 className="font-display text-lg font-medium tracking-tight">{decision.title}</h3>
      <dl className="mt-3 flex flex-col gap-3 text-sm">
        <div>
          <dt className="font-mono text-xs tracking-widest text-muted uppercase">Decision</dt>
          <dd className="mt-1 text-muted">{decision.decision}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs tracking-widest text-muted uppercase">Reason</dt>
          <dd className="mt-1 text-muted">{decision.reason}</dd>
        </div>
        {decision.tradeoff && (
          <div>
            <dt className="font-mono text-xs tracking-widest text-muted uppercase">Tradeoff</dt>
            <dd className="mt-1 text-muted">{decision.tradeoff}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
