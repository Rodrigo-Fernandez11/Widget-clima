import { useState, useEffect } from "react";
import { Loading } from "../Loading/Loading";
import { WeatherForm } from "../weatherForm/WeatherForm";
import { WeatherMainInfo } from "../weatherMainInfo/weatherMainInfo";
import styles from "./weatherApp.module.css";

export function WeatherApp() {
  const REACT_APP_KEY = "d831263e36b04493866183554231210";
  const REACT_APP_URL = "http://api.weatherapi.com/v1/current.json";

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = "Weather | " + (weather?.location?.name || "");
  }, [weather]);

  async function loadInfo(city = "London") {
    try {
      const request = await fetch(
        `${REACT_APP_URL}?key=${REACT_APP_KEY}&q=${city}&aqi=no`
      );
      const json = await request.json();
      console.log(json);

      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }

  function handleOnChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  );
}
