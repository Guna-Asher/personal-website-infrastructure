export type Definition = { term: string; value: string };

/**
 * A labelled fact grid — symptom/cause/fix/lesson, or any other set of short
 * mono-labelled values. Pulled out of case-study.tsx so the homepage's
 * failure strip and the case study render the same thing.
 */
export function DefinitionRow({
  definitions,
  columns = 2,
}: {
  definitions: Definition[];
  columns?: 1 | 2;
}) {
  return (
    <dl
      className={`grid gap-x-8 gap-y-4 ${columns === 2 ? "md:grid-cols-2" : ""}`}
    >
      {definitions.map((definition) => (
        <div key={definition.term}>
          <dt className="t-meta text-ink-muted">{definition.term}</dt>
          <dd className="t-ui mt-1.5 text-ink-secondary">{definition.value}</dd>
        </div>
      ))}
    </dl>
  );
}
