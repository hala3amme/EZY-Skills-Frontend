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

  const appKey = getEnvString('VITE_REVERB_APP_KEY');
  if (!appKey) return null;

  const apiBaseUrl = getApiBaseUrl();
  const apiUrl = new URL(apiBaseUrl);

  const wsHost = getEnvString('VITE_REVERB_HOST') ?? apiUrl.hostname;
  const wsPort = getEnvNumber('VITE_REVERB_PORT') ?? 8080;
  const scheme = (getEnvString('VITE_REVERB_SCHEME') ?? apiUrl.protocol.replace(':', '')).toLowerCase();
  const forceTLS = scheme === 'https';

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
          if (!token) {
            callback(new Error('Not authenticated'));
            return;
          }

          fetch(`${apiBaseUrl}/broadcasting/auth`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              Authorization: `Bearer ${token}`,
            },
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

  return echoInstance;
}

export function disconnectEcho(): void {
  if (!echoInstance) return;
  echoInstance.disconnect();
  echoInstance = null;
}
