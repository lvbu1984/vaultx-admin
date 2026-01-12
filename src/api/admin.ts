const API_BASE = "http://127.0.0.1:4000/api";

/**
 * Admin · System Overview
 */
export async function fetchSystemStatus() {
  const res = await fetch(`${API_BASE}/admin/overview`);
  if (!res.ok) {
    throw new Error("Failed to fetch admin overview");
  }
  return res.json();
}

/**
 * Admin · Files
 */
export async function fetchAdminFiles() {
  const res = await fetch(`${API_BASE}/admin/files`);
  if (!res.ok) {
    throw new Error("Failed to fetch admin files");
  }
  return res.json();
}

/**
 * Admin · Deals
 */
export async function fetchAdminDeals() {
  const res = await fetch(`${API_BASE}/admin/deals`);
  if (!res.ok) {
    throw new Error("Failed to fetch admin deals");
  }
  return res.json();
}
