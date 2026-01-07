import React from "react";

/* -------------------- 基础样式常量 -------------------- */

const bgBlur = "rgba(15, 23, 42, 0.55)";
const cardBg = "rgba(30, 41, 59, 0.65)";
const border = "1px solid rgba(148,163,184,0.15)";

/* -------------------- 主 App -------------------- */

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b 0%, #020617 70%)",
        color: "#e5e7eb",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
        display: "flex",
      }}
    >
      {/* ---------------- 左侧 Sidebar ---------------- */}
      <aside
        style={{
          width: 220,
          padding: 24,
          background: bgBlur,
          backdropFilter: "blur(12px)",
          borderRight: border,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 32 }}>VaultX</div>

        {["Dashboard", "Analytics", "Storage", "Network", "Trust"].map(
          (item) => (
            <div
              key={item}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                marginBottom: 8,
                cursor: "pointer",
                color: item === "Analytics" ? "#38bdf8" : "#cbd5f5",
                background:
                  item === "Analytics"
                    ? "rgba(56,189,248,0.15)"
                    : "transparent",
              }}
            >
              {item}
            </div>
          )
        )}
      </aside>

      {/* ---------------- 主内容区 ---------------- */}
      <main style={{ flex: 1, padding: 32 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>
              Analytics · Company Performance
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>
              internal dashboard preview
            </div>
          </div>

          <div
            style={{
              width: 240,
              height: 36,
              borderRadius: 18,
              background: cardBg,
              border,
            }}
          />
        </div>

        {/* ---------------- 第一排正方形卡片 ---------------- */}
        <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
          {[
            "Visits Today",
            "Revenue Breakdown",
            "App Performance",
            "Server Overview",
          ].map((title) => (
            <div
              key={title}
              style={{
                width: 220,
                height: 220,
                padding: 16,
                borderRadius: 16,
                background: cardBg,
                backdropFilter: "blur(12px)",
                border,
              }}
            >
              <div style={{ fontSize: 14, marginBottom: 8 }}>{title}</div>
              <div
                style={{
                  height: 140,
                  borderRadius: 10,
                  background:
                    "linear-gradient(180deg, rgba(148,163,184,0.25), rgba(148,163,184,0.05))",
                }}
              />
            </div>
          ))}
        </div>

        {/* ---------------- 第二排正方形卡片 ---------------- */}
        <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
          {[
            "Storage Efficiency",
            "Network Stability",
            "Trust Coverage",
            "Risk Signals",
          ].map((title) => (
            <div
              key={title}
              style={{
                width: 220,
                height: 220,
                padding: 16,
                borderRadius: 16,
                background: cardBg,
                backdropFilter: "blur(12px)",
                border,
              }}
            >
              <div style={{ fontSize: 14, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>
                Analysis placeholder
              </div>
            </div>
          ))}
        </div>

        {/* ================= 黄色分析区 · 1 ================= */}
        <AnalysisBlock title="Daily Line Chart" />

        {/* ================= 黄色分析区 · 2 ================= */}
        <AnalysisBlock title="System Behavior Trend" />

        {/* ================= 黄色分析区 · 3 ================= */}
        <AnalysisBlock title="Capacity & Growth Projection" />
      </main>
    </div>
  );
}

/* -------------------- 分析区大卡片组件 -------------------- */

function AnalysisBlock({ title }: { title: string }) {
  return (
    <div
      style={{
        height: 320,
        padding: 20,
        borderRadius: 20,
        background: cardBg,
        backdropFilter: "blur(12px)",
        border,
        marginBottom: 24,
      }}
    >
      <div style={{ fontSize: 14, marginBottom: 12 }}>{title}</div>
      <div
        style={{
          height: 240,
          borderRadius: 12,
          background:
            "linear-gradient(180deg, rgba(56,189,248,0.35), rgba(56,189,248,0.05))",
        }}
      />
    </div>
  );
}
