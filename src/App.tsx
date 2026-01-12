import React, { useEffect, useState } from "react";
import { fetchSystemStatus, fetchAdminFiles } from "./api/admin";

/* -------------------- 样式常量 -------------------- */

const bgBlur = "rgba(15, 23, 42, 0.55)";
const cardBg = "rgba(30, 41, 59, 0.65)";
const border = "1px solid rgba(148,163,184,0.15)";

/* -------------------- 主 App -------------------- */

export default function App() {
  const [system, setSystem] = useState<any>(null);
  const [files, setFiles] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [heartbeatTs, setHeartbeatTs] = useState<number | null>(null);

  // 页面加载时拉取一次真实数据
  useEffect(() => {
    Promise.all([fetchSystemStatus(), fetchAdminFiles()])
      .then(([sys, files]) => {
        setSystem(sys);
        setFiles(files);
        setHeartbeatTs(sys?.timestamp ?? null);
        console.log("[dashboard] system =", sys);
        console.log("[dashboard] files =", files);
      })
      .catch((err) => {
        console.error("[dashboard] fetch failed", err);
      })
      .finally(() => setLoading(false));
  }, []);

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
        {/* ======== 系统心跳（来自后端） ======== */}
        {heartbeatTs && (
          <div
            style={{
              color: "#22c55e",
              fontSize: 12,
              marginBottom: 12,
            }}
          >
            🟢 System heartbeat ·{" "}
            {new Date(heartbeatTs).toLocaleTimeString()}
          </div>
        )}

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

          <SystemStatusBadge system={system} />
        </div>

        {/* ---------------- 第一排卡片 ---------------- */}
        <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
          {[
            { title: "Total Files", value: files?.totalFiles ?? 0 },
            { title: "Stored Files", value: files?.byStatus?.stored ?? 0 },
            { title: "Uploading", value: files?.byStatus?.uploading ?? 0 },
            { title: "Failed", value: files?.byStatus?.failed ?? 0 },
          ].map((item) => (
            <div
              key={item.title}
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
              <div style={{ fontSize: 14, marginBottom: 8 }}>
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  marginTop: 32,
                }}
              >
                {loading ? "-" : item.value}
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- 第二排卡片 ---------------- */}
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

        {/* ---------------- 分析区 ---------------- */}
        <AnalysisBlock title="Daily Line Chart" />
        <AnalysisBlock title="System Behavior Trend" />
        <AnalysisBlock title="Capacity & Growth Projection" />
      </main>
    </div>
  );
}

/* -------------------- 系统状态灯 -------------------- */

function SystemStatusBadge({ system }: { system: any }) {
  let label = "Initializing";
  let color = "#94a3b8";

  const healthy =
    system?.status === "ok" &&
    system?.system?.storage === "online" &&
    system?.system?.fwss === "connected";

  if (healthy) {
    label = "🟢 System Healthy";
    color = "#22c55e";
  } else if (system) {
    label = "🔴 System Error";
    color = "#ef4444";
  }

  return (
    <div
      style={{
        padding: "6px 14px",
        borderRadius: 999,
        background: "rgba(15,23,42,0.6)",
        border: "1px solid rgba(148,163,184,0.2)",
        fontSize: 13,
        color,
      }}
    >
      {label}
    </div>
  );
}

/* -------------------- 分析区大卡片 -------------------- */

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
