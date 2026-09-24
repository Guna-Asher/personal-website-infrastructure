const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='1' stitchTiles='stitch' />
    <feColorMatrix type='matrix' values='0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.35 0' />
  </filter>
  <rect width='100%' height='100%' filter='url(#n)' />
</svg>`;

const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

/**
 * A quiet paper-grain texture rather than an obvious dot-grid pattern.
 * Rendered as mid-gray noise with `mix-blend-mode: overlay` so the same
 * asset reads correctly against both a light and a dark background instead
 * of needing a separate light/dark variant. Kept deliberately faint — this
 * should read as "refined surface" at normal viewing distance, not as a
 * visible repeating texture.
 */
export function TechnicalBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
      style={{
        backgroundImage: GRAIN_URL,
        backgroundSize: "128px 128px",
        mixBlendMode: "overlay",
      }}
    />
  );
}
