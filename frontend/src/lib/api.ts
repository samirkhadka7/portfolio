const isServer = typeof window === 'undefined';

export const API_URL = isServer
  ? (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000')
  : '';

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function uploadFile(file: File): Promise<{ url: string; publicId: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Upload failed (${res.status})`);
  }

  return res.json() as Promise<{ url: string; publicId: string }>;
}
