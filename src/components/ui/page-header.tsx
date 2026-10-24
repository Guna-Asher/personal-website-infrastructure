import type { ReactNode } from "react";
import { Container } from "./container";

/**
 * The opening of a page below the homepage. The eyebrow sits in the margin
 * column rather than above the title, so the heading starts on the same edge
 * as every other piece of prose on the site instead of being indented past
 * the page's own labels.
 */
export function PageHeader({
  eyebrow,
  title,
  standfirst,
  outboard,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  standfirst?: ReactNode;
  outboard?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-rule-strong">
      <Container className="pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="grid-page">
          <p className="t-meta col-label text-ink-muted">{eyebrow}</p>

          <div className="col-content mt-6 lg:mt-0">
            <h1 className="t-display text-ink">{title}</h1>
            {standfirst && (
              <p className="t-lead measure-lead mt-7 text-ink-secondary">{standfirst}</p>
            )}
            {children && <div className="mt-9">{children}</div>}
          </div>

          {outboard && <div className="col-outboard mt-10 lg:mt-0">{outboard}</div>}
        </div>
      </Container>
    </header>
  );
}
