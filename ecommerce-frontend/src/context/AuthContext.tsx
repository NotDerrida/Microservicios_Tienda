import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  email: string;
  role: string;
}

export const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar si hay usuario almacenado al cargar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error de autenticación');
      }

      const data = await response.json();
      
      // Asegurarse de que tenemos todos los datos necesarios
      const userData = {
        _id: data.user._id,
        email: data.user.email,
        role: data.user.role
      };

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      
      // Actualizar estado
      setUser(userData);
      
      console.log('Login exitoso:', userData); // Para debugging
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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