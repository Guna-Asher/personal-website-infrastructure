export type Definition = { term: string; value: string };

/**
 * A labelled fact grid — cause/fix/lesson, or any other set of short
 * mono-labelled values. Shared by the homepage evidence strip and the case
 * studies so the two render identically.
 */
export function DefinitionRow({
  definitions,
  columns = 2,
}: {
  definitions: Definition[];
  /** Match this to the number of items. Three items in a two-column grid
   *  orphans the third with a void beside it. */
  columns?: 1 | 2 | 3;
}) {
  const cols =
    columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "";

  return (
    <dl className={`grid gap-x-8 gap-y-5 ${cols}`}>
      {definitions.map((definition) => (
        <div key={definition.term}>
          <dt className="t-meta text-ink-muted">{definition.term}</dt>
          <dd className="t-ui mt-2 text-ink-secondary">{definition.value}</dd>
        </div>
      ))}
    </dl>
  );
}
