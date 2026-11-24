import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BATAPRO — 100% Free ATS Resume & CV Builder";
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
          padding: "64px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #0f766e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "#10b981",
              color: "#022c22",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            100% FREE FOREVER • ZERO WATERMARKS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: "76px", fontWeight: 900, letterSpacing: "-2px" }}>
            BATAPRO
          </div>
          <div style={{ fontSize: "34px", color: "#e2e8f0", lineHeight: 1.3 }}>
            ATS-Verified Resume &amp; CV Builder — Arabic (RTL), French &amp; English
          </div>
        </div>

        <div style={{ display: "flex", gap: "28px", fontSize: "24px", color: "#93c5fd" }}>
          <span>Instant Vector A4 PDF</span>
          <span>•</span>
          <span>Free AI Enhancer</span>
          <span>•</span>
          <span>Algeria, MENA &amp; Global Formats</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
