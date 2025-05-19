export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '1rem',
      textAlign: 'center',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
    }}>
      <p style={{ margin: 0 }}>InnovaDistribuidos © {new Date().getFullYear()}</p>
    </footer>
  );
}