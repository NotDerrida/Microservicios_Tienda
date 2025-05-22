import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toggleCart } = useCart();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header style={{ position: 'relative' }}>
      <nav style={{
        backgroundColor: '#333',
        padding: '1rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <Link href="/" style={{
              color: 'white',
              fontSize: '1.5rem',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              InnovaDistribuidos
            </Link>
            <Link href="/about" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1rem',
              marginLeft: '1rem'
            }}>
              Sobre Nosotros
            </Link>
            {user?.role === 'Administrador' && (
              <>
                <Link href="/users" style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem'
                }}>
                  Usuarios
                </Link>
                <Link href="/products/new" style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  marginLeft: '1rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px'
                }}>
                  Alta Producto
                </Link>
              </>
            )}
            {user && (
              <Link href="/orders" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1rem',
                marginLeft: '1rem'
              }}>
                Mis pedidos
              </Link>
            )}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {user ? (
              <>
                <span style={{ color: 'white' }}>
                  Bienvenido, {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: '#007bff'
                }}>
                  Iniciar Sesión
                </Link>
                <Link href="/auth/register" style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  backgroundColor: '#28a745'
                }}>
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <button
        onClick={toggleCart}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 2000,
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 50,
          height: 50,
          fontSize: 24,
          cursor: 'pointer'
        }}
        aria-label="Ver carrito"
      >
        🛒
      </button>
    </header>
  );
}