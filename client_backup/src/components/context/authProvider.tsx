import React, {createContext, useContext, useEffect, useState} from 'react';
import AuthService from '../../services/auth.service';

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  logout: () => Promise<void>;
  setAuth: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsAuthenticating(true);
      const res = await AuthService.validateAuth();
      if (!res) {
        setIsAuthenticating(false);
      }
      setIsAuthenticated(res);
      setIsAuthenticating(false);
    };
    checkAuthStatus();
  }, []);

  const logout = async () => {
    setIsAuthenticating(true);
    // await AuthService.logout();
    setIsAuthenticated(false);
    setIsAuthenticating(false);
  };

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider
      value={{isAuthenticated, isAuthenticating, logout, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
