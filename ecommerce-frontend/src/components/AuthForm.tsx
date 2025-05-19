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
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await api.post(endpoint, { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data.message || 'Error en la solicitud');
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