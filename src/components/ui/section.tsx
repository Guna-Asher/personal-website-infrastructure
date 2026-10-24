import type { ReactNode } from "react";
import { Container } from "./container";

/**
 * A numbered section of the record. The number and label sit in the margin
 * column — the same margin-label device the case studies use — so the whole
 * site reads as one document rather than a stack of unrelated blocks.
 *
 * `wide` puts the children in the full 12 columns instead of the 7-column
 * content track, for content that is meant to be full-bleed (the systems
 * index rows, the practice grid).
 */
export function Section({
  index,
  label,
  lead,
  children,
  wide = false,
  id,
  surface = "canvas",
}: {
  index: string;
  label: string;
  lead?: ReactNode;
  children: ReactNode;
  wide?: boolean;
  id?: string;
  surface?: "canvas" | "raised";
}) {
  return (
    <section
      id={id}
      className={`border-t border-rule-strong ${surface === "raised" ? "bg-raised" : ""}`}
    >
      <Container className="py-16 md:py-24 lg:py-32">
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

          <div
            className={`${wide ? "col-full" : "col-content"} ${
              lead ? "mt-12 md:mt-16" : "mt-6 lg:mt-0"
            }`}
          >
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
