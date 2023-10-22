import PropTypes from "prop-types";
import styles from "./weatherMainInfo.module.css";

/**
 * Componente que muestra información meteorológica, incluyendo la ciudad, país,
 * condiciones climáticas actuales y un mapa de ubicación si se proporcionan
 * coordenadas de longitud y latitud.
 * @param {object} weather - Los datos del pronóstico del tiempo.
 */
export function WeatherMainInfo({ weather }) {
  return (
    <div className={styles.mainInfo}>
      {/* Información de la ciudad y país */}
      <div className={styles.city}>{weather?.location?.name}</div>
      <div className={styles.country}>{weather?.location?.country}</div>

      {/* Condiciones climáticas actuales */}
      <div className={styles.row}>
        <div>
          {/* Ícono del clima */}
          <img
            src={`http:${weather?.current?.condition?.icon}`}
            width="128"
            alt="Weather Icon"
          />
        </div>
        <div className={styles.weatherConditions}>
          {/* Texto de las condiciones climáticas y temperatura */}
          <div className={styles.condition}>
            {weather?.current?.condition.text}
          </div>
          <div className={styles.current}>
            {weather?.current?.temp_c}°C
          </div>
        </div>
      </div>

      {/* Mapa de ubicación si se proporcionan coordenadas */
      weather?.location?.lon && weather?.location?.lat && (
        <iframe
          // Inserta un mapa de Google Maps
          src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d${weather.location.lon}!3d${weather.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smx!4v1651103744472!5m2!1sen!2smx`}
          width="100%"
          height="350px" 
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      )}
    </div>
  );
}

WeatherMainInfo.propTypes = {
  weather: PropTypes.shape({
    location: PropTypes.shape({
      name: PropTypes.string, // Nombre de la ciudad
      country: PropTypes.string, // Nombre del país
      lon: PropTypes.number, // Longitud
      lat: PropTypes.number, // Latitud
    }),
    current: PropTypes.shape({
      condition: PropTypes.shape({
        icon: PropTypes.string, // URL del ícono del clima
        text: PropTypes.string, // Descripción del clima
      }),
      temp_c: PropTypes.number, // Temperatura en grados Celsius
    }),
  }),
};
