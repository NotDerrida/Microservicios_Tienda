import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Cliente'
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Registro exitoso!');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setMessage(data.message || 'Error en el registro');
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        marginBottom: '100px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '2rem'
        }}>Registro</h1>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div>
            <label htmlFor="name" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333'
            }}>Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>

          <div>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333'
            }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333'
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
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>

          <div>
            <label htmlFor="role" style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333'
            }}>Rol:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <option value="Cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <button type="submit" style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '0.8rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Registrarse
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
      </main>
      <Footer />
    </>
  );
}