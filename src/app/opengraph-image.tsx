import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#032488",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            color: "#05deed",
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: 10,
          }}
        >
          SUBUP
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#fefefd",
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -1,
              maxWidth: 900,
            }}
          >
            Sub In. Level Up.
          </div>
          <div style={{ color: "rgba(254,254,253,0.75)", fontSize: 24 }}>
            {site.kicker}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
