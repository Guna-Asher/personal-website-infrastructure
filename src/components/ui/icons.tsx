import type { SVGProps } from "react";

/**
 * The six icons this site actually uses, inlined rather than pulled from an
 * icon package. Shared geometry: 24-unit viewBox, 1.75 stroke, round joins —
 * sized by the `h-*`/`w-*` class on the call site, colored by `currentColor`.
 */
function Glyph({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Glyph>
  );
}

export function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </Glyph>
  );
}

export function ArrowUp(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </Glyph>
  );
}

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Glyph>
  );
}

export function Sun(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Glyph>
  );
}

export function Moon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </Glyph>
  );
}
