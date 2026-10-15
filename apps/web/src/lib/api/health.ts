import type { ApiResponse } from "@ghoomyaar/shared";

export interface HealthData {
  service: string;
  status: string;
  timestamp: string;
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000/api/v1";

export async function getApiHealth(
  signal?: AbortSignal
): Promise<HealthData> {
  const response = await fetch(
    `${API_URL.replace(/\/$/, "")}/health`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Backend API is unavailable");
  }

  const result =
    (await response.json()) as ApiResponse<HealthData>;

  if (!result.success) {
    throw new Error("API health check failed");
  }

  return result.data;
}