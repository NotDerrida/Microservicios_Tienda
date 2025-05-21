import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // 👈 Usa solo esta función
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.identifier, formData.password); // 👈 Llama a login()
      router.push('/');
    } catch (error: any) {
      setMessage(error.message || 'Error al iniciar sesión');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <main style={{
        padding: '40px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '100px',
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{
            textAlign: 'center',
            color: '#333',
            marginBottom: '2rem',
            fontSize: '2rem'
          }}>Iniciar Sesión</h1>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            <div>
              <label htmlFor="identifier" style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666'
              }}>Email o Nombre de Usuario:</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label htmlFor="password" style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#666'
              }}>Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button type="submit" style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}>
              Iniciar Sesión
            </button>

            {message && (
              <p style={{
                textAlign: 'center',
                color: message.includes('Error') ? '#dc3545' : '#28a745',
                marginTop: '1rem'
              }}>
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}