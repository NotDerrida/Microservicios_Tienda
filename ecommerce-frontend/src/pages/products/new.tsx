import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function NewProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: 'https://via.placeholder.com/150', // URL por defecto
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convertir el precio a número
      const productToSend = {
        ...product,
        price: Number(product.price)
      };

      const response = await fetch('http://localhost:3002/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productToSend)
      });

      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Error al crear el producto');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al conectar con el servidor. Verifica que el servicio esté corriendo en el puerto 3002');
    }
  };

  return (
    <>
      <Header />
      <main style={{
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: '100px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Nuevo Producto</h1>
        
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
        )}
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem'
              }}
            />
          </div>

          <div>
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem'
              }}
            />
          </div>

          <div>
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem'
              }}
            />
          </div>

          <div>
            <label htmlFor="imageUrl">URL de la imagen (opcional):</label>
            <input
              type="text" // cambiado de url a text
              id="imageUrl"
              value={product.imageUrl}
              onChange={(e) => setProduct({...product, imageUrl: e.target.value || 'https://via.placeholder.com/150'})}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Crear Producto
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}