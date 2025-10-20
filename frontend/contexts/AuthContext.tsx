import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

interface User {
  email: string;
  name: string;
  picture?: string;
  total_games: number;
  wins: number;
  losses: number;
  draws: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  sessionToken: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  sessionToken: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on app load
    checkExistingSession();
    
    // Handle deep link (OAuth callback)
    const handleUrl = ({ url }: { url: string }) => {
      handleAuthCallback(url);
    };

    const subscription = Linking.addEventListener('url', handleUrl);

    // Check if app was opened with a URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleAuthCallback(url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const checkExistingSession = async () => {
    try {
      const token = await AsyncStorage.getItem('session_token');
      if (token) {
        setSessionToken(token);
        await verifySession(token);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking session:', error);
      setLoading(false);
    }
  };

  const verifySession = async (token: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Invalid session, clear it
        await AsyncStorage.removeItem('session_token');
        setSessionToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error verifying session:', error);
      await AsyncStorage.removeItem('session_token');
      setSessionToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthCallback = async (url: string) => {
    try {
      // Extract session_id from URL fragment
      const hashParams = url.split('#')[1];
      if (!hashParams) return;

      const params = new URLSearchParams(hashParams);
      const sessionId = params.get('session_id');

      if (sessionId) {
        setLoading(true);
        
        // Exchange session_id for session_token
        const response = await fetch(`${BACKEND_URL}/api/auth/session`, {
          method: 'POST',
          headers: {
            'X-Session-ID': sessionId,
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          // Store session token
          await AsyncStorage.setItem('session_token', data.session_token);
          setSessionToken(data.session_token);
          
          // Set user data
          setUser({
            email: data.email,
            name: data.name,
            picture: data.picture,
            total_games: 0,
            wins: 0,
            losses: 0,
            draws: 0,
          });
        } else {
          console.error('Failed to exchange session_id');
        }
        
        setLoading(false);
      }
    } catch (error) {
      console.error('Error handling auth callback:', error);
      setLoading(false);
    }
  };

  const login = () => {
    // Get the current URL for redirect
    const redirectUrl = Linking.createURL('/');
    const authUrl = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
    
    // Open Emergent auth in browser
    Linking.openURL(authUrl);
  };

  const logout = async () => {
    try {
      if (sessionToken) {
        // Call logout endpoint
        await fetch(`${BACKEND_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
          },
        });
      }

      // Clear local storage
      await AsyncStorage.removeItem('session_token');
      setSessionToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, sessionToken }}>
      {children}
    </AuthContext.Provider>
  );
};
