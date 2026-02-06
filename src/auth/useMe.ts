import { useEffect, useState } from 'react';

import { authService } from '../services';
import type { ApiUser } from '../types/api';
import { getAuthToken } from './tokenStorage';

type UseMeState = {
  user: ApiUser | null;
  isLoading: boolean;
  errorMessage: string | null;
};

export function useMe(): UseMeState {
  const [state, setState] = useState<UseMeState>({
    user: null,
    isLoading: Boolean(getAuthToken()),
    errorMessage: null,
  });

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      const token = getAuthToken();
      if (!token) {
        setState({ user: null, isLoading: false, errorMessage: null });
        return;
      }

      setState((s) => ({ ...s, isLoading: true, errorMessage: null }));
      try {
        const res = await authService.me();
        if (!isCancelled) setState({ user: res.user, isLoading: false, errorMessage: null });
      } catch {
        // If token is invalid/expired, axios interceptor will clear it.
        if (!isCancelled) setState({ user: null, isLoading: false, errorMessage: 'Failed to load user.' });
      }
    }

    void load();

    const onAuthChanged = () => {
      void load();
    };

    window.addEventListener('auth:changed', onAuthChanged);
    window.addEventListener('storage', onAuthChanged);

    return () => {
      isCancelled = true;
      window.removeEventListener('auth:changed', onAuthChanged);
      window.removeEventListener('storage', onAuthChanged);
    };
  }, []);

  return state;
}
