/**
 * Renders a plain-text/box-drawing architecture diagram.
 * The diagram is real text content (not an image), so it's readable by a
 * screen reader as-is; `overflow-x-auto` handles it on narrow screens instead
 * of shrinking or wrapping the drawing.
 */
export function ArchitectureDiagram({ diagram }: { diagram: string }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-md border border-border bg-surface">
      <pre className="min-w-max px-5 py-4 font-mono text-xs leading-relaxed text-muted">{diagram}</pre>
    </div>
  );
}
