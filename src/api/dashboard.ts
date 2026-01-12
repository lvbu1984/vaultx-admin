export interface OverviewResponse {
  ok: boolean
  db: {
    connected: boolean
  }
  meta: {
    timestamp: number
  }
}

export async function fetchOverview(): Promise<OverviewResponse> {
  const res = await fetch('http://127.0.0.1:3001/api/dashboard/overview')

  if (!res.ok) {
    throw new Error('Failed to fetch overview')
  }

  return res.json()
}
