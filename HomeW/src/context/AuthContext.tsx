import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useCredentials, type UserCredential } from '../hooks/useCredentials';

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  users: UserCredential[];
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  
  const { users, validateUser} = useCredentials();

  const login = (em: string, pass: string) => {
    if (validateUser(em, pass)) {
      setIsAuthenticated(true);
      setEmail(em);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, email, login, logout, 
      users
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
