import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} · ${site.role}`;

/**
 * Generated at build time, so there is no raster asset in the repo and no
 * runtime image work on the host. Type and rule only — the same system the
 * site itself uses.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f5",
          color: "#141413",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6b6a63",
          }}
        >
          {site.name} · {site.role} · {site.location}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 120, height: 4, background: "#d97757" }} />
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 68,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 940,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#6b6a63" }}>
          Three projects, with the architecture and decisions behind each one.
        </div>
      </div>
    ),
    size,
  );
}
