import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
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
      setError('Error de conexión');
    }
  };

  return (
    <>
      <Header />
      <main className="container">
        <h1>Gestión de Usuarios</h1>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Fecha Registro</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <Footer />
    </>
  );
}