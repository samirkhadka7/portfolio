// Call the backend directly (both server and client) via NEXT_PUBLIC_API_URL.
// No Next.js rewrite/proxy — that was unreliable on Vercel (build-time env baking
// + external-proxy quirks caused "Not found" in production). Cross-origin works
// because the backend sets CORS (credentials + CLIENT_URL) and cookies use
// sameSite 'none'+secure in prod / 'lax' same-site on localhost in dev.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

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
