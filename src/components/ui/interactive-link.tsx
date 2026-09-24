"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";

export function InteractiveLink({
  href,
  children,
  external = false,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  // -my-1.5/py-1.5 cancel out visually (net position unchanged) but widen the
  // actual tappable box — the visible line is ~20px tall on its own, under a
  // comfortable touch-target minimum.
  const classes = `group relative -my-1.5 inline-flex items-center gap-2 rounded-sm py-1.5 font-mono text-xs tracking-widest uppercase transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${className}`;

  const content = (
    <>
      <span className="relative inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
        <ArrowRight
          className="absolute h-3.5 w-3.5 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-0 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:opacity-0"
          aria-hidden
        />
        <ArrowUpRight
          className="absolute h-3.5 w-3.5 -translate-y-1 translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
          aria-hidden
        />
      </span>
      <span className="border-b border-current pb-0.5 transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent">
        {children}
      </span>
      <span
        aria-hidden
        className="scale-0 text-accent opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
      >
        ✦
      </span>
    </>
  );

  // Internal route (e.g. "/work") gets client-side navigation via next/link.
  // Anything external, or a non-route scheme like mailto:/tel:, stays a plain anchor.
  if (!external && href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={classes}
    >
      {content}
    </a>
  );
}
