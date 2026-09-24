import type { EngineeringDecision } from "@/lib/data/projects";

export function DecisionBlock({ decision, index }: { decision: EngineeringDecision; index: number }) {
  return (
    <div className="border border-border p-5 md:p-6">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-muted">{String(index).padStart(2, "0")}</span>
        <h3 className="font-display text-lg font-medium tracking-tight">{decision.title}</h3>
      </div>
      <dl className="mt-4 flex flex-col gap-3 text-sm">
        <div>
          <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">Decision</dt>
          <dd className="mt-1 text-muted">{decision.decision}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] tracking-widest text-muted uppercase">Reason</dt>
          <dd className="mt-1 text-muted">{decision.reason}</dd>
        </div>
        {decision.tradeoff && (
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-accent-secondary uppercase">
              Tradeoff
            </dt>
            <dd className="mt-1 text-muted">{decision.tradeoff}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
