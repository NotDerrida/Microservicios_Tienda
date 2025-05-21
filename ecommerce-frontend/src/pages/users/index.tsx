import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'Administrador') {
      router.push('/');
      return;
    }
    fetchUsers();
  }, [user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/all-users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setUsers(data.users);
      } else {
        setError('Error al cargar usuarios');
      }
    } catch (error) {
      setError('Error de conexión index');
    }
  };

  return (
    <>
      <Header />
      <main style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '100px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '2rem'
        }}>Lista de Usuarios Registrados</h1>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflowX: 'auto'
        }}>
          {error ? (
            <p style={{color: '#dc3545'}}>{error}</p>
          ) : (
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1rem'
            }}>
              <thead>
                <tr style={{backgroundColor: '#e9ecef'}}>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Nombre</th>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Email</th>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Rol</th>
                  <th style={{padding: '1rem', textAlign: 'left'}}>Fecha Registro</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{borderBottom: '1px solid #dee2e6'}}>
                    <td style={{padding: '1rem'}}>{user.name}</td>
                    <td style={{padding: '1rem'}}>{user.email}</td>
                    <td style={{padding: '1rem'}}>{user.role}</td>
                    <td style={{padding: '1rem'}}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}