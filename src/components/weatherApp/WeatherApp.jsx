import { useState, useEffect } from "react";
import { LoadingIcon } from "../Loading/LoadingIcon";
import { WeatherForm } from "../weatherForm/WeatherForm";
import { WeatherMainInfo } from "../weatherMainInfo/weatherMainInfo";
import styles from "./weatherApp.module.css";

/**
 * Componente principal de la aplicación de pronóstico del tiempo.
 */
export function WeatherApp() {
  // Variables de entorno
  const { VITE_REACT_APP_KEY, VITE_REACT_APP_URL } = import.meta.env;

  // Estado local para almacenar los datos del pronóstico del tiempo
  const [weather, setWeather] = useState(null);

  // Efecto que se ejecuta al cargar el componente para obtener información de la ciudad por defecto
  useEffect(() => {
    loadInfo();
  }, []);

  // Efecto que actualiza el título de la página cuando cambian los datos del pronóstico del tiempo
  useEffect(() => {
    document.title = `Weather | ${weather?.location?.name || ""}`;
  }, [weather]);

  /**
   * Función asincrónica para cargar la información del pronóstico del tiempo de una ciudad.
   */
  async function loadInfo(city = "London") {
    try {
      const request = await fetch(`${VITE_REACT_APP_URL}?key=${VITE_REACT_APP_KEY}&q=${city}&aqi=no`);
      if (!request.ok) {
        throw new Error(`Error al cargar los datos del pronóstico del tiempo para ${city}`);
      }
      const json = await request.json();

      // Simula una carga de 2 segundos antes de actualizar el estado con los datos del pronóstico
      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Maneja el cambio de ciudad y carga la información del pronóstico para la ciudad seleccionada.
   */
  function handleOnChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {/* Muestra el componente WeatherMainInfo si hay datos de pronóstico, de lo contrario, muestra el componente Loading */}
      {weather ? <WeatherMainInfo weather={weather} /> : <LoadingIcon />}
    </div>
  );
}
