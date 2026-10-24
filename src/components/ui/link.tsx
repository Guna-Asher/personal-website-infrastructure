import NextLink from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

/**
 * The site's primary action. One gesture: the underline thickens and the
 * arrow steps forward. Links carry the work here — there are no buttons
 * other than the theme toggle and back-to-top.
 */
export function Link({
  href,
  children,
  external = false,
  tone = "default",
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  /** `meta` sets the label in the mono eyebrow register instead of UI sans. */
  tone?: "default" | "meta";
  className?: string;
}) {
  const isMailto = href.startsWith("mailto:");
  // A mailto link leaves the site the same way an external link does — give
  // both a persistent "leaving" cue rather than only revealing it on hover,
  // which a touch user would never see before tapping.
  const leavesSite = external || isMailto;
  const Icon = leavesSite ? ArrowUpRight : ArrowRight;

  // -my-1.5/py-1.5 cancel out visually (net position unchanged) but widen the
  // actual tappable box — the visible line is ~20px tall on its own, under a
  // comfortable touch-target minimum.
  const classes = [
    "group -my-1.5 inline-flex w-fit items-center gap-2 py-1.5 rounded-sm",
    "text-ink transition-colors duration-150 hover:text-clay focus-visible:text-clay",
    tone === "meta" ? "t-meta" : "t-ui",
    className,
  ].join(" ");

  const content = (
    <>
      <span className="underline decoration-rule-strong decoration-1 underline-offset-[0.22em] transition-[text-decoration-color,text-decoration-thickness] duration-150 group-hover:decoration-clay group-hover:decoration-2 group-focus-visible:decoration-clay group-focus-visible:decoration-2">
        {children}
        {leavesSite && (
          <span className="sr-only">
            {isMailto ? " (opens your email app)" : " (opens in a new tab)"}
          </span>
        )}
      </span>
      <Icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
    </>
  );

  // Internal route (e.g. "/work") gets client-side navigation via next/link.
  // Anything external, or a non-route scheme like mailto:/tel:, stays a
  // plain anchor.
  if (!leavesSite && href.startsWith("/")) {
    return (
      <NextLink href={href} className={classes}>
        {content}
      </NextLink>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {content}
    </a>
  );
}
