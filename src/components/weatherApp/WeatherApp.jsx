import { useState, useEffect } from "react";
import { Loading } from "../Loading/Loading";
import { WeatherForm } from "../weatherForm/WeatherForm";
import { WeatherMainInfo } from "../weatherMainInfo/weatherMainInfo";
import styles from "./weatherApp.module.css";

/**
 * Componente principal de la aplicación de pronóstico del tiempo.
 */
export function WeatherApp() {
  // Clave de la API y URL de la API del pronóstico del tiempo
  const REACT_APP_KEY = "d831263e36b04493866183554231210";
  const REACT_APP_URL = "http://api.weatherapi.com/v1/current.json";

  // Estado local para almacenar los datos del pronóstico del tiempo
  const [weather, setWeather] = useState(null);

  // Efecto que se ejecuta al cargar el componente para obtener información de la ciudad por defecto
  useEffect(() => {
    loadInfo();
  }, []);

  // Efecto que actualiza el título de la página cuando cambian los datos del pronóstico del tiempo
  useEffect(() => {
    document.title = "Weather | " + (weather?.location?.name || "");
  }, [weather]);

  /**
   * Función asincrónica para cargar la información del pronóstico del tiempo de una ciudad.
   */
  async function loadInfo(city = "London") {
    try {
      const request = await fetch(
        `${REACT_APP_URL}?key=${REACT_APP_KEY}&q=${city}&aqi=no`
      );
      const json = await request.json();
      console.log(json);

      // Simula una carga de 2 segundos antes de actualizar el estado con los datos del pronóstico
      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);
    } catch (e) {
      console.error(e);
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
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  );
}
