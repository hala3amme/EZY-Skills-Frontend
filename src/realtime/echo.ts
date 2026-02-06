import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import { getApiBaseUrl } from '../config';
import { getAuthToken } from '../auth/tokenStorage';

type ReverbEcho = Echo<'reverb'>;

let echoInstance: ReverbEcho | null = null;

function getEnvString(key: string): string | undefined {
  const v = (import.meta as any).env?.[key];
  return typeof v === 'string' && v.trim() ? v : undefined;
}

function getEnvNumber(key: string): number | undefined {
  const v = getEnvString(key);
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function getEcho(): ReverbEcho | null {
  if (echoInstance) return echoInstance;

  // Must match backend REVERB_APP_KEY.
  // Do not default this value, otherwise it's easy to silently connect to the wrong app.
  const appKey = getEnvString('VITE_REVERB_APP_KEY');
  if (!appKey) return null;

  const apiBaseUrl = getApiBaseUrl();
  const apiUrl = new URL(apiBaseUrl);

  const wsHost = getEnvString('VITE_REVERB_HOST') ?? apiUrl.hostname;
  const wsPort = getEnvNumber('VITE_REVERB_PORT') ?? 8080;
  const scheme = (getEnvString('VITE_REVERB_SCHEME') ?? apiUrl.protocol.replace(':', '')).toLowerCase();
  const forceTLS = scheme === 'https';

  const debugRealtime = getEnvString('VITE_REALTIME_DEBUG') === 'true';
  if (debugRealtime) {
    // Intentionally log only non-sensitive connection details.
    // eslint-disable-next-line no-console
    console.info('[realtime] init', { broadcaster: 'reverb', key: appKey, wsHost, wsPort, scheme, forceTLS });
  }

  // Echo expects Pusher protocol client even for Reverb.
  (window as any).Pusher = Pusher;

  echoInstance = new Echo({
    broadcaster: 'reverb',
    key: appKey,
    wsHost,
    wsPort,
    wssPort: wsPort,
    forceTLS,
    enabledTransports: ['ws', 'wss'],

    // /broadcasting/auth is NOT under /api
    authorizer: (channel: any) => {
      return {
        authorize: (socketId: string, callback: (error: Error | null, data?: any) => void) => {
          const token = getAuthToken();

          const headers: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          };

          // Supports Sanctum personal access tokens.
          // If token is missing, this still allows cookie-based auth
          // (when the backend is configured for Sanctum SPA mode).
          if (token) headers.Authorization = `Bearer ${token}`;

          fetch(`${apiBaseUrl}/broadcasting/auth`, {
            method: 'POST',
            credentials: 'include',
            headers,
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channel.name,
            }),
          })
            .then(async (res) => {
              const data = await res.json().catch(() => ({}));
              if (!res.ok) {
                const message = typeof data?.message === 'string' ? data.message : 'Broadcast auth failed';
                callback(new Error(message), data);
                return;
              }
              callback(null, data);
            })
            .catch((err) => {
              callback(err instanceof Error ? err : new Error('Broadcast auth failed'));
            });
        },
      };
    },
  } as any) as ReverbEcho;

  if (debugRealtime) {
    try {
      const pusher = (echoInstance as any)?.connector?.pusher;
      pusher?.connection?.bind?.('connected', () => {
        // eslint-disable-next-line no-console
        console.info('[realtime] connected', { socketId: pusher?.connection?.socket_id });
      });
      pusher?.connection?.bind?.('error', (err: unknown) => {
        // eslint-disable-next-line no-console
        console.warn('[realtime] connection error', err);
      });
      pusher?.connection?.bind?.('disconnected', () => {
        // eslint-disable-next-line no-console
        console.info('[realtime] disconnected');
      });
    } catch {
      // ignore
    }
  }

  return echoInstance;
}

export function disconnectEcho(): void {
  if (!echoInstance) return;
  echoInstance.disconnect();
  echoInstance = null;
}
