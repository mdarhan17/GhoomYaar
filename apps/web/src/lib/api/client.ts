export type User = { id: string; name: string; email: string; role: 'traveller' | 'admin' };

export class ApiRequestError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!response.ok) {
    const payload: { message?: string } = await response.json().catch(() => ({}));
    throw new ApiRequestError(response.status, payload.message ?? `Request failed (${response.status})`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}