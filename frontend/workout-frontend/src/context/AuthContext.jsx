import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // optional: store profile
  const [loading, setLoading] = useState(true);

  const isAuthed = !!localStorage.getItem('access');

  // optional: fetch profile on load if authed
  useEffect(() => {
    const init = async () => {
      if (!isAuthed) { setLoading(false); return; }
      try {
        const { data } = await api.get('/api/users/profile/');
        setUser(data);
      } catch {
        // invalid tokens → clear
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [isAuthed]);

  const login = async (username, password) => {
    const { data } = await api.post('/api/token/', { username, password });
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);

    const me = await api.get('/api/users/profile/');
    setUser(me.data);
    return me.data;
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  const value = useMemo(() => ({ user, setUser, isAuthed: !!user, login, logout, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
