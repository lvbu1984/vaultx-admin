import { API_BASE } from "./config";

/* -------------------- 类型定义 -------------------- */

export type SystemStatus = {
  fwss: {
    status: "online" | "offline";
    nodes: number;
    capacityTB: number;
  };
  curio: {
    status: "online" | "offline";
    queue: number;
    lastTask: string;
  };
  lotus: {
    status: "online" | "degraded" | "offline";
    headLag: number;
    syncing: boolean;
  };
  database: {
    status: "online" | "offline";
    type: string;
  };
  storage: {
    totalFiles: number;
    storedFiles: number;
    totalSize: string;
    errors: number;
  };
  trust: {
    pdpEnabled: boolean;
    lastProof: string;
    coveredFiles: number;
  };
};

/* -------------------- API 实现 -------------------- */

export async function fetchSystemStatus(): Promise<SystemStatus> {
  // 真实后端（已在 3001）
  const [dealsRes, uploadsRes] = await Promise.all([
    fetch(`${API_BASE}/deal/list`),
    fetch(`${API_BASE}/upload/list`),
  ]);

  const deals = await dealsRes.json();
  const uploads = await uploadsRes.json();

  // ⚠️ 这里先 mock + 真实数据混合
  return {
    fwss: {
      status: "online",
      nodes: 1,
      capacityTB: 1.8,
    },
    curio: {
      status: "online",
      queue: 0,
      lastTask: "ok",
    },
    lotus: {
      status: "degraded",
      headLag: 12,
      syncing: true,
    },
    database: {
      status: "online",
      type: "yugabyte",
    },
    storage: {
      totalFiles: uploads.length,
      storedFiles: uploads.length,
      totalSize: "9.1 GB",
      errors: 0,
    },
    trust: {
      pdpEnabled: true,
      lastProof: "09:40 UTC",
      coveredFiles: uploads.length,
    },
  };
}
