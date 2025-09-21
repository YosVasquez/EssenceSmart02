import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Crear cuenta de administrador por defecto si no existe
    try {
      const users = JSON.parse(localStorage.getItem('essence_users') || '[]');
      const adminExists = users.find((u: User) => u.email === 'essence@gmail.com');
      
      if (!adminExists) {
        const adminUser: User = {
          id: 'admin-001',
          name: 'Administrador Essence Smart',
          email: 'essence@gmail.com',
          phone: '+1 (809) 555-1234',
          address: 'Av. Winston Churchill #45, Santo Domingo, República Dominicana',
          isAdmin: true,
          createdAt: new Date().toISOString()
        };
        
        users.push(adminUser);
        localStorage.setItem('essence_users', JSON.stringify(users));
      }
    } catch (error) {
      console.error('Error initializing admin user:', error);
    }

    // Verificar si hay un usuario guardado
    try {
      const savedUser = localStorage.getItem('essence_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading saved user:', error);
      localStorage.removeItem('essence_user');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Verificar credenciales de administrador
      if (email === 'essence@gmail.com') {
        // Solo permitir acceso admin con contraseña exacta "GMVP"
        if (password !== 'GMVP') {
          return false;
        }
        
        const users = JSON.parse(localStorage.getItem('essence_users') || '[]');
        const adminUser = users.find((u: User) => u.email === 'essence@gmail.com');
        
        if (adminUser) {
          setUser(adminUser);
          localStorage.setItem('essence_user', JSON.stringify(adminUser));
          return true;
        }
      }

      // Obtener usuarios registrados
      const users = JSON.parse(localStorage.getItem('essence_users') || '[]');
      
      // Verificar credenciales de usuarios regulares
      const foundUser = users.find((u: User) => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('essence_user', JSON.stringify(foundUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'isAdmin'>): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('essence_users') || '[]');
      
      // Verificar si el email ya existe
      if (users.some((u: User) => u.email === userData.email)) {
        return false;
      }

      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isAdmin: false
      };

      users.push(newUser);
      localStorage.setItem('essence_users', JSON.stringify(users));
      
      setUser(newUser);
      localStorage.setItem('essence_user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Error during registration:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('essence_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Create a copy without the avatar to save to localStorage
      const { avatar, ...userDataForStorage } = updatedUser;
      localStorage.setItem('essence_user', JSON.stringify(userDataForStorage));
      
      // Actualizar en la lista de usuarios
      const users = JSON.parse(localStorage.getItem('essence_users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        // Also exclude avatar from the users list to prevent quota issues
        const { avatar: _, ...userForList } = updatedUser;
        users[userIndex] = userForList;
        localStorage.setItem('essence_users', JSON.stringify(users));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};