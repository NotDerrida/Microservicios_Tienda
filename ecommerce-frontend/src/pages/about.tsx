import Header from '../components/Header';

export default function About() {
  return (
    <>
      <Header />
      <main style={{
        maxWidth: '800px',
        margin: '40px auto',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: '2rem'
      }}>
        <h1 style={{ marginBottom: '1.5rem', color: '#007bff' }}>Sobre Nosotros</h1>
        <section style={{ marginBottom: '2rem' }}>
          <h2>Misión</h2>
          <p>
            Empoderar a comunidades o entidades públicas y privadas vulnerables mediante plataformas colaborativas y redes de servicios basadas en sistemas distribuidos. Facilitamos el acceso a empleo digno, educación tecnológica y financiación ética, operando bajo principios de transparencia radical, propiedad comunitaria y soluciones escalables que generen un impacto sostenible.
          </p>
        </section>
        <section style={{ marginBottom: '2rem' }}>
          <h2>Visión</h2>
          <p>
            Crear una sociedad interconectada donde las comunidades, empresas y gobiernos gestionen sus recursos mediante redes descentralizadas, impulsando el acceso a la educación y el empleo para romper ciclos de injusticia y explotación.
          </p>
        </section>
        <section style={{ marginBottom: '2rem' }}>
          <h2>¿Qué ofrecemos?</h2>
          <p>
            En nuestra tienda encontrarás servidores, microservicios, herramientas de monitoreo, software de virtualización y todo lo necesario para construir entornos distribuidos robustos y eficientes.
          </p>
        </section>
        <section>
          <h2>Nuestros valores</h2>
          <ul style={{ fontSize: '1.1rem', lineHeight: 2 }}>
            <li>🚀 <b>Innovación</b> - Nos enfocamos en el futuro con tecnología avanzada.</li>
            <li>💡 <b>Calidad</b> - Ofrecemos productos probados y de alto rendimiento.</li>
            <li>📞 <b>Soporte Técnico</b> - Asesoramos a nuestros clientes en cada paso.</li>
            <li>🔍 <b>Transparencia</b> - Operamos con honestidad y claridad.</li>
          </ul>
        </section>
      </main>
    </>
  );
}