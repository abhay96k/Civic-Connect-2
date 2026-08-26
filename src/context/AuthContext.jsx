import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/databaseApi';

const AuthContext = createContext(null);

const LOCAL_USER_KEY = 'roadvision_auth_user';

// Pre-configured Demo Accounts for the 4 primary roles
export const DEMO_ACCOUNTS = {
  citizen: {
    id: 'usr_citizen_101',
    name: 'Aarav Sharma',
    email: 'citizen@roadvision.ai',
    role: 'Citizen',
    badge: 'Verified Citizen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  ambulance: {
    id: 'usr_amb_202',
    name: 'Dr. Vikram Sethi',
    email: 'ambulance@emergency.gov',
    role: 'Ambulance',
    badge: 'Emergency Response Unit',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
  },
  traffic: {
    id: 'usr_traffic_303',
    name: 'Inspector Rajesh Varma',
    email: 'police@traffic.gov',
    role: 'Traffic Police',
    badge: 'Traffic Control Division',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  constructor: {
    id: 'usr_const_404',
    name: 'Apex Infra Ltd.',
    email: 'constructor@apexinfra.com',
    role: 'Constructor',
    badge: 'Infrastructure Contractor',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  // Default to opening Login Page on initial website load if not authenticated
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_KEY);
      return !saved;
    } catch {
      return true;
    }
  });

  // Sync state with local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
  }, [user]);

  // Listen to Supabase auth session if active
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser((prev) => ({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          email: session.user.email,
          role: session.user.user_metadata?.role || 'Citizen',
          badge: 'Verified User',
          avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${session.user.email}`,
        }));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          email: session.user.email,
          role: session.user.user_metadata?.role || 'Citizen',
          badge: 'Verified User',
          avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${session.user.email}`,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithDemo = (roleKey) => {
    const demoUser = DEMO_ACCOUNTS[roleKey] || DEMO_ACCOUNTS.citizen;
    setUser(demoUser);
    setIsAuthModalOpen(false);
    return demoUser;
  };

  const loginWithCredentials = async (email, password) => {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data.user) {
          const loggedUser = {
            id: data.user.id,
            name: data.user.user_metadata?.full_name || email.split('@')[0],
            email: data.user.email,
            role: data.user.user_metadata?.role || 'Citizen',
            badge: 'Verified User',
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
          };
          setUser(loggedUser);
          setLoading(false);
          setIsAuthModalOpen(false);
          return { success: true, user: loggedUser };
        }
      }

      // Fallback local auth simulation
      const role = email.includes('admin')
        ? 'System Administrator'
        : email.includes('gov') || email.includes('officer')
        ? 'Municipal Officer'
        : 'Citizen';

      const simulatedUser = {
        id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: role,
        badge: 'Verified Account',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      };

      setUser(simulatedUser);
      setLoading(false);
      setIsAuthModalOpen(false);
      return { success: true, user: simulatedUser };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const signup = async ({ name, email, password, role }) => {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name, role: role },
          },
        });
        if (!error && data.user) {
          const newUser = {
            id: data.user.id,
            name: name,
            email: email,
            role: role || 'Citizen',
            badge: 'New Reporter',
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
          };
          setUser(newUser);
          setLoading(false);
          setIsAuthModalOpen(false);
          return { success: true, user: newUser };
        }
      }

      // Fallback local registration
      const newUser = {
        id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
        name: name,
        email: email,
        role: role || 'Citizen',
        badge: 'Registered Citizen',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      };

      setUser(newUser);
      setLoading(false);
      setIsAuthModalOpen(false);
      return { success: true, user: newUser };
    } catch (err) {
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signout fallback:', e);
      }
    }
    setUser(null);
    localStorage.removeItem(LOCAL_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginWithDemo,
        loginWithCredentials,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
