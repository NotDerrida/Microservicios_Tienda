import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth(); // 👈 Usa el contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password); // 👈 Llama a la función login del contexto
      router.push('/'); // O '/dashboard'
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Credenciales incorrectas');
      } else {
        setError(err.message || 'Error al procesar la solicitud');
      }
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