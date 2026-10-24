import type { ReactNode } from "react";
import { Container } from "./container";

/**
 * The opening of a page below the homepage. Mono eyebrow, serif statement,
 * optional sans standfirst — the same three-part opening anthropic.com uses
 * for a research or policy page.
 */
export function PageHeader({
  eyebrow,
  title,
  standfirst,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  standfirst?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-rule-strong">
      <Container className="pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid-page">
          <div className="col-content">
            <p className="t-meta text-ink-muted">{eyebrow}</p>
            <h1 className="t-display mt-6 text-ink">{title}</h1>
            {standfirst && (
              <p className="t-ui measure-lead mt-8 text-ink-secondary">{standfirst}</p>
            )}
            {children && <div className="mt-10">{children}</div>}
          </div>
        </div>
      </Container>
    </header>
  );
}
