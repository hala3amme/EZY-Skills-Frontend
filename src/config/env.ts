export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;

  if (!raw) {
    // Keep the existing app runnable even if env isn't configured yet.
    // docs/API.md uses http://127.0.0.1:8000 as local default.
    return 'http://127.0.0.1:8000';
  }

  return raw.replace(/\/+$/, '');
}
