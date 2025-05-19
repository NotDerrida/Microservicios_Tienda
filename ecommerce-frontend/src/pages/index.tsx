import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
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
        }}>Bienvenido al Marketplace</h1>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#666'
          }}>
            Explora nuestra variedad de productos
          </p>
          
          {/* Aquí irá el grid de productos cuando los implementemos */}
          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            color: '#666'
          }}>
            Productos próximamente
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}