'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/router';
import { authService } from '@/services/authService';
import { User } from '@/types/user';
import { fetchAuthSession } from 'aws-amplify/auth';
import { HttpService } from '@/services/httpService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userLoading: boolean;
  userGroups: string[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  confirmRegister: (email: string, code: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<boolean>;
  forceChangePassword: (newPassword: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  loadUser: () => Promise<void>;
  updateUser: (userData: User) => Promise<User>;
  loading: boolean;
  // Registration flow state
  pendingEmail: string | null;
  setPendingEmail: (email: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingEmail, setPendingEmailState] = useState<string | null>(null);
  const router = useRouter();

  // Enhanced setPendingEmail that also uses localStorage for persistence
  const setPendingEmail = (email: string | null) => {
    setPendingEmailState(email);
    if (email) {
      localStorage.setItem('pendingRegistrationEmail', email);
    } else {
      localStorage.removeItem('pendingRegistrationEmail');
    }
  };

  // Load pending email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('pendingRegistrationEmail');
    if (savedEmail && !pendingEmail) {
      setPendingEmailState(savedEmail);
    }
  }, [pendingEmail]);

  // Load user data when authenticated
  const loadUser = useCallback(async () => {
    if (!isAuthenticated) {
      setUser(null);
      setUserGroups([]);
      return;
    }

    setUserLoading(true);
    try {
      const userData = await HttpService.getInstance().getUser();
      setUser(userData);
      try {
        const session = await fetchAuthSession();
        const idPayload = session.tokens?.idToken?.payload as Record<string, unknown> | undefined;
        const rawGroups = (idPayload?.['cognito:groups'] as string[] | undefined) || [];
        setUserGroups(rawGroups.map(g => String(g).toLowerCase()));
      } catch {
        setUserGroups([]);
      }
    } catch {
      setUser(null);
      setUserGroups([]);
      // Don't show error notification here as it might be expected (e.g., during logout)
    } finally {
      setUserLoading(false);
    }
  }, [isAuthenticated]);

  // Update user data
  const updateUser = useCallback(async (userData: User): Promise<User> => {
    const updatedUser = await HttpService.getInstance().updateUser(userData);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await authService.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        // Load user data if authenticated
        if (authenticated) {
          await loadUser();
        }
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [loadUser, router]); // Include loadUser in dependencies

  const login = async (email: string, password: string) => {
    const success = await authService.login(email, password);
    if (success) {
      setIsAuthenticated(true);
      // Load user data after successful login
      await loadUser();
    }
    return success;
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    return await authService.register(email, password, firstName, lastName);
  };

  const confirmRegister = async (email: string, code: string) => {
    return await authService.confirmRegister(email, code);
  };

  const forgotPassword = async (email: string) => {
    return await authService.forgotPassword(email);
  };

  const resetPassword = async (email: string, code: string, newPassword: string) => {
    return await authService.resetPassword(email, code, newPassword);
  };

  const forceChangePassword = async (newPassword: string) => {
    const success = await authService.forceChangePassword(newPassword);
    if (success) {
      setIsAuthenticated(true);
      // Load user data after successful password change
      await loadUser();
    }
    return success;
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null); // Clear user data on logout
    setUserGroups([]);
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      userLoading,
      userGroups,
      login, 
      register, 
      confirmRegister,
      forgotPassword,
      resetPassword,
      forceChangePassword,
      logout, 
      loadUser,
      updateUser,
      loading,
      pendingEmail,
      setPendingEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 