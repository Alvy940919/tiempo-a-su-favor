'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

export default function MapaClima() {
  const ciudades = [
    { nombre: 'Guadalajara', coords: [20.6597, -103.3496] },
    { nombre: 'Ciudad de México', coords: [19.4326, -99.1332] },
    { nombre: 'La Habana', coords: [23.1136, -82.3666] },
    { nombre: 'Cienfuegos', coords: [22.1490, -80.4466] },
    { nombre: 'Santiago de Cuba', coords: [20.0247, -75.8210] }
  ];

  const [pronosticos, setPronosticos] = useState({});

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    ciudades.forEach(async (ciudad) => {
      try {
        const [lat, lon] = ciudad.coords;
        // Usamos forecast en vez de weather
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;
        const respuesta = await axios.get(url);

        // Procesamos datos para 3 días
        // La respuesta tiene lista con datos cada 3 horas
        const lista = respuesta.data.list;

        // Agrupamos por fecha para obtener resumen diario
        const dias = {};

        lista.forEach(item => {
          const fecha = item.dt_txt.split(' ')[0]; // Extraemos la fecha (YYYY-MM-DD)
          if (!dias[fecha]) dias[fecha] = [];
          dias[fecha].push(item);
        });

        // Tomamos solo los próximos 3 días
        const fechas3dias = Object.keys(dias).slice(0, 3);

        // Para cada día calculamos temp promedio y condición principal (la más frecuente)
        const resumen3dias = fechas3dias.map(fecha => {
          const datosDia = dias[fecha];
          const temps = datosDia.map(d => d.main.temp);
          const descriptions = datosDia.map(d => d.weather[0].description);
          const icons = datosDia.map(d => d.weather[0].icon);

          // Temperatura promedio
          const tempPromedio = (temps.reduce((a,b) => a + b, 0) / temps.length).toFixed(1);

          // Descripción más frecuente
          const descripcionFrecuente = descriptions.sort((a,b) =>
            descriptions.filter(v => v===a).length - descriptions.filter(v => v===b).length
          ).pop();

          // Icono más frecuente
          const iconoFrecuente = icons.sort((a,b) =>
            icons.filter(v => v===a).length - icons.filter(v => v===b).length
          ).pop();

          return { fecha, tempPromedio, descripcionFrecuente, iconoFrecuente };
        });

        setPronosticos(prev => ({
          ...prev,
          [ciudad.nombre]: {
            ciudad: respuesta.data.city.name,
            country: respuesta.data.city.country,
            dias: resumen3dias
          }
        }));
      } catch (error) {
        console.error(`Error al obtener el pronóstico de ${ciudad.nombre}:`, error);
      }
    });
  }, []);

  return (
    <MapContainer
      center={[21.5, -85]} // Centrado general para todas las ciudades
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {ciudades.map((ciudad) => (
        <Marker key={ciudad.nombre} position={ciudad.coords}>
          <Popup>
            {pronosticos[ciudad.nombre] ? (
              <div>
                <strong>{pronosticos[ciudad.nombre].ciudad}, {pronosticos[ciudad.nombre].country}</strong>
                <br />
                {pronosticos[ciudad.nombre].dias.map(dia => (
                  <div key={dia.fecha} style={{ marginTop: '8px' }}>
                    <strong>{dia.fecha}</strong><br />
                    <img
                      src={`https://openweathermap.org/img/wn/${dia.iconoFrecuente}@2x.png`}
                      alt="Icono del clima"
                      width={50}
                      height={50}
                    /><br />
                    {dia.descripcionFrecuente}<br />
                    🌡 Temp promedio: {dia.tempPromedio}°C
                  </div>
                ))}
              </div>
            ) : (
              `Cargando pronóstico de ${ciudad.nombre}...`
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}





