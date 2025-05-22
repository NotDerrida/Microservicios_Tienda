import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

interface Order {
  _id: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  shippingAddress?: string;
  paymentMethod?: string;
  phone?: string;
  status: string;
  createdAt: string;
}

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3004/carts/user/${user._id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setError('Error al cargar el historial'));
  }, [user]);

  if (!user) {
    return (
      <>
        <Header />
        <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
          <h2>Debes iniciar sesión para ver tus pedidos</h2>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem' }}>Historial de Pedidos</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {orders.length === 0 ? (
          <p>No tienes pedidos aún.</p>
        ) : (
          <div style={{
            overflowX: 'auto',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            background: '#fff'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '1rem'
            }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '12px' }}>Fecha</th>
                  <th style={{ padding: '12px' }}>Productos</th>
                  <th style={{ padding: '12px' }}>Total</th>
                  <th style={{ padding: '12px' }}>Dirección</th>
                  <th style={{ padding: '12px' }}>Método de Pago</th>
                  <th style={{ padding: '12px' }}>Celular</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            <span style={{ fontWeight: 500 }}>{item.name}</span> x{item.quantity} <span style={{ color: '#007bff' }}>${item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ padding: '12px', verticalAlign: 'top', fontWeight: 600 }}>${order.total.toFixed(2)}</td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>{order.shippingAddress}</td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>{order.paymentMethod}</td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>{order.phone}</td>
                    <td style={{ padding: '12px', verticalAlign: 'top' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: order.status === 'Completada' ? '#28a74522' : '#ffc10722',
                        color: order.status === 'Completada' ? '#28a745' : '#ffc107',
                        fontWeight: 500
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}