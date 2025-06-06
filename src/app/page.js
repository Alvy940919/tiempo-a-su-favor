import MapaClima from '../components/MapaClima';

export default function Page() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Tiempo a Su Favor</h1>
      <p>Bienvenido a tu servicio de pronóstico del tiempo.</p>

      <MapaClima />
    </main>
  );
}
