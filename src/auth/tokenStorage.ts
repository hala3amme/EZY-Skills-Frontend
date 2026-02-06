const TOKEN_KEY = 'ezy:token';

function emitAuthChanged() {
  window.dispatchEvent(new Event('auth:changed'));
}
type SetTokenOptions = {
  remember?: boolean;
};

export function getAuthToken(): string | null {
  try {
    // Prefer session token when present.
    return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string, options: SetTokenOptions = {}): void {
  try {
    const remember = options.remember ?? true;

    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.removeItem(TOKEN_KEY);
      emitAuthChanged();
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
      localStorage.removeItem(TOKEN_KEY);
      emitAuthChanged();
    }
  } catch {
    // ignore
  }
}

export function clearAuthToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    emitAuthChanged();
  } catch {
    // ignore
  }
}
