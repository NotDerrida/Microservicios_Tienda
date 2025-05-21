import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

        const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log('handleSubmit ejecutado'); // Verifica que esta línea se imprime
      try {
        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        const response = await fetch(`http://localhost:3003${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        console.log('Respuesta del backend:', data); // Verifica qué datos llegan aquí
    
        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.user._id); // Guarda el userId
          localStorage.setItem('username', data.user.name)
          localStorage.setItem('userRole', data.user.role);; // Guarda el rol del usuario
          console.log('Datos guardados en localStorage:', {
            token: data.token,
            userId: data.user._id,
            username: data.user.name,
          });
          router.push('/');
        } else {
          setError(data.message || 'Error al iniciar sesión');
        }
      } catch (err) {
        console.error('Error de conexión:', err);
        setError('Error de conexión');
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isLogin ? 'Iniciar' : 'Registrar'}</button>
    </form>
  );
}