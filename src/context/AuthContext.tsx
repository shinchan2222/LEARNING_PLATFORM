'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email?: string; role?: Role; demoUserId?: string }) => Promise<User | null>;
  register: (data: { name: string; email: string; college?: string; role?: Role }) => Promise<User | null>;
  logout: () => void;
  switchUser: (role: Role) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage or API for active user session
    const initAuth = async () => {
      try {
        const stored = localStorage.getItem('cs_user_session');
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setLoading(false);
          return;
        }

        // Fetch from /api/auth/me
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
            localStorage.setItem('cs_user_session', JSON.stringify(data.user));
          }
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email?: string; role?: Role; demoUserId?: string }): Promise<User | null> => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem('cs_user_session', JSON.stringify(data.user));
        return data.user;
      }
      return null;
    } catch (err) {
      console.error('Login error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; college?: string; role?: Role }): Promise<User | null> => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem('cs_user_session', JSON.stringify(data.user));
        return data.user;
      }
      return null;
    } catch (err) {
      console.error('Register error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cs_user_session');
    document.cookie = 'user_session=; Max-Age=0; path=/;';
  };

  const switchUser = async (targetRole: Role) => {
    const demoId = targetRole === 'admin' ? 'usr_prof_1' : 'usr_student_1';
    await login({ demoUserId: demoId });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
