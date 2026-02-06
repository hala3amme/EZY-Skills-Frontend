import { useEffect, useState } from 'react';

import { getAuthToken } from './tokenStorage';

export function useIsAuthenticated(): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAuthToken()));

  useEffect(() => {
    const update = () => setIsAuthenticated(Boolean(getAuthToken()));

    // Custom event we emit when login/logout happens in this tab.
    window.addEventListener('auth:changed', update);

    // Sync across tabs.
    window.addEventListener('storage', update);

    return () => {
      window.removeEventListener('auth:changed', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return isAuthenticated;
}
