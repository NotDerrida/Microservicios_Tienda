import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';

export default function CartSidebar() {
  const { items, removeFromCart, total, isOpen, toggleCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user || !user._id) {
      alert('Por favor inicia sesión para continuar');
      return;
    }

    // Solicita los datos al usuario
    const shippingAddress = window.prompt('Dirección de envío:');
    if (!shippingAddress) return alert('Debes ingresar una dirección de envío');
    const paymentMethod = window.prompt('Método de pago (ej: Tarjeta, Efectivo):');
    if (!paymentMethod) return alert('Debes ingresar un método de pago');
    const phone = window.prompt('Celular de contacto:');
    if (!phone) return alert('Debes ingresar un número de celular');

    const cartData = {
      userId: user._id,
      items: items.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
      shippingAddress,
      paymentMethod,
      phone
    };

    try {
      const response = await fetch('http://localhost:3004/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(cartData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la orden');
      }

      const responseData = await response.json();
      alert('¡Orden creada exitosamente!');
      items.forEach(item => removeFromCart(item._id));
      toggleCart();
    } catch (error) {
      console.error('Error al crear orden:', error);
      alert(error instanceof Error ? error.message : 'Error al procesar la orden');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      backgroundColor: 'white',
      boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
      zIndex: 1000,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2>Carrito de Compras</h2>
        <button
          onClick={toggleCart}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.map(item => (
          <div
            key={item._id}
            style={{
              display: 'flex',
              padding: '10px',
              borderBottom: '1px solid #eee'
            }}
          >
            <img
              src={item.imageUrl || 'https://via.placeholder.com/50'}
              alt={item.name}
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                marginRight: '10px'
              }}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 5px' }}>{item.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Cantidad: {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '1px solid #eee',
        padding: '20px 0',
        marginTop: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <strong>Total:</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <button
          onClick={handleCheckout}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          disabled={!user}
        >
          {user ? 'Proceder al Pago' : 'Inicia sesión para comprar'}
        </button>
      </div>
    </div>
  );
}