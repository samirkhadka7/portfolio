// Admin auth token stored in localStorage and sent as `Authorization: Bearer`.
// We can't rely on the httpOnly cookie cross-domain: the cookie is set on the
// backend domain (onrender.com) and browsers increasingly block third-party
// cookies, so a vercel.app page can't reliably send it. A bearer token from the
// login response sidesteps that entirely. The backend's requireAuth accepts both
// the Authorization header and the cookie, so the cookie remains a fallback.
const TOKEN_KEY = 'portfolio_admin_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore (e.g. private mode / storage disabled)
  }
}

export function clearToken(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}
