export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 text-gray-800 p-6">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-orange-700">Tiempo a Su Favor</h1>
        <p className="text-lg mt-2 text-orange-600">
          Servicios climáticos y pronósticos personalizados
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-xl font-semibold text-orange-800">Servicios</h2>
          <ul className="list-disc pl-5 mt-2 text-sm text-orange-700">
            <li>Pronósticos diarios y semanales</li>
            <li>Alertas tempranas</li>
            <li>Asesoría climática para agricultura y turismo</li>
            <li>Visualización de mapas meteorológicos</li>
          </ul>
        </div>

        <div className="rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-xl font-semibold text-orange-800">Pronóstico en tiempo real</h2>
          <iframe
            title="OpenWeatherMap"
            src="https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=19.43&lon=-99.13&zoom=5"
            className="w-full h-64 rounded-xl border"
          ></iframe>
        </div>

        <div className="rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-xl font-semibold text-orange-800">Contáctanos</h2>
          <p className="text-sm text-orange-700">
            ¿Quieres recibir nuestros pronósticos? Escríbenos a:
            <br />
            <strong>contacto@tiempoasufavor.com</strong>
          </p>
          <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-xl">
            Formulario de contacto
          </button>
        </div>
      </section>

      <footer className="text-center text-sm text-orange-600 mt-12">
        © {new Date().getFullYear()} Tiempo a Su Favor. Todos los derechos reservados.
      </footer>
    </main>
  );
}
