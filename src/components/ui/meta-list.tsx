/**
 * A dot-separated technical list (e.g. a tech stack) where the separator
 * itself carries the accent color — a small, consistent way to let the
 * identity color show up at rest, not just on hover.
 */
export function MetaList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={className}>
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && <span className="text-accent/70"> · </span>}
        </span>
      ))}
    </p>
  );
}
