import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; // Asegúrate de ajustar la ruta

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  status: string;
}

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const { user } = useAuth(); // Obtén el usuario del contexto
  const userRole = user?.role; // Extrae el rol

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3002/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError('Error al cargar los productos');
        }
      } catch (err) {
        setError('Error de conexión al servidor');
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    router.push('/products/new');
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Por favor inicia sesión para agregar productos al carrito');
        return;
      }

      const response = await fetch(`http://localhost:3004/cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
      });

      if (response.ok) {
        alert('Producto añadido al carrito');
      } else {
        alert('Error al añadir al carrito');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            textAlign: 'center',
            color: '#333',
            margin: 0
          }}>Bienvenido al Marketplace</h1>

          {/* Solo muestra el botón si el usuario es Administrador */}
          {userRole === 'Administrador' && (
            <button
              onClick={handleAddProduct}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Alta Producto
            </button>
          )}
        </div>

        {error && (
          <div style={{ color: 'red', textAlign: 'center', marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          padding: '1rem'
        }}>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
                  <p style={{ 
                    margin: '0 0 1rem 0',
                    color: '#666',
                    fontSize: '0.9rem'
                  }}>
                    {product.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#007bff'
                    }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: product.status === 'Activado' ? '#28a745' : '#dc3545',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        {product.status}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Añadir al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '2rem',
              color: '#666'
            }}>
              No hay productos disponibles
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}