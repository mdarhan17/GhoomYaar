import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { apiRequest, type User, ApiRequestError } from '../../lib/api/client';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signUp(name: string, email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
};
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    apiRequest<{ user: User }>('/auth/me')
      .then(data => { if (active) setUser(data.user); })
      .catch(error => { if (active && !(error instanceof ApiRequestError && error.status === 401)) console.error('Session lookup failed', error); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const signIn = useCallback(async (email: string, password: string) => {
    const data = await apiRequest<{ user: User }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    setUser(data.user);
  }, []);
  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const data = await apiRequest<{ user: User }>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
    setUser(data.user);
  }, []);
  const signOut = useCallback(async () => {
    await apiRequest<void>('/auth/logout', { method: 'POST' });
    setUser(null);
  }, []);
  const value = useMemo(() => ({ user, loading, signIn, signUp, signOut }), [user, loading, signIn, signUp, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be inside AuthProvider');
  return value;
}