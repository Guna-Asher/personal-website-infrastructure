import type { ReactNode } from "react";
import { Container } from "./container";

/**
 * A numbered section of the record. The number and label sit in the margin
 * column — the same device the case studies use — so the whole site reads as
 * one document rather than a stack of unrelated blocks.
 *
 * `wide` puts the children across all twelve columns, for content that is
 * meant to span (the index rows, a grid). `outboard` fills the three columns
 * to the right of the reading measure, which are otherwise dead space on any
 * section that isn't wide.
 */
const SPACE = {
  // Deliberately uneven. A page where every band has identical padding reads
  // as a stack of equal slabs with nothing emphasised.
  tight: "py-12 md:py-16",
  normal: "py-16 md:py-24 lg:py-28",
  loose: "py-20 md:py-32 lg:py-40",
} as const;

export function Section({
  index,
  label,
  lead,
  children,
  outboard,
  wide = false,
  id,
  surface = "canvas",
  space = "normal",
}: {
  index: string;
  label: string;
  lead?: ReactNode;
  children: ReactNode;
  outboard?: ReactNode;
  wide?: boolean;
  id?: string;
  surface?: "canvas" | "raised";
  space?: keyof typeof SPACE;
}) {
  return (
    <section
      id={id}
      className={`border-t border-rule-strong ${surface === "raised" ? "bg-raised" : ""}`}
    >
      <Container className={SPACE[space]}>
        <div className="grid-page">
          <div className="col-label">
            {/* The margin label is the section's actual heading, so the
                outline doesn't jump from the page h1 straight to the h3s
                inside each row. The number is decorative. */}
            <h2 className="t-meta text-ink-muted lg:sticky lg:top-28">
              <span aria-hidden>
                {index} <span className="text-clay-graphic">/</span>{" "}
              </span>
              {label}
            </h2>
          </div>

          {lead && (
            <p className="t-statement measure-lead col-content mt-6 text-ink lg:mt-0">{lead}</p>
          )}

          {outboard && <div className="col-outboard mt-8 lg:mt-0">{outboard}</div>}

          <div
            className={`${wide ? "col-full" : "col-content"} ${
              lead ? "mt-10 md:mt-14" : "mt-6 lg:mt-0"
            }`}
          >
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
