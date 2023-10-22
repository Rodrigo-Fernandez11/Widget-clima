import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./weatherForm.module.css";

// Componente que representa un formulario para buscar una ciudad en una aplicación de pronóstico del tiempo.
export function WeatherForm({ onChangeCity }) {
  const [city, setCity] = useState("");

  // Maneja el cambio en el campo de entrada.
  function handleChange(e) {
    setCity(e.target.value);
  }

  // Maneja el envío del formulario. Llama a la función `onChangeCity` si el campo de ciudad no está vacío.
  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim() !== "") {
      onChangeCity(city);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar ciudad..."
        value={city}
        onChange={handleChange}
      />
      <button type="submit" className={styles.submitButton}>
        Buscar
      </button>
    </form>
  );
}

// Propiedades requeridas y su tipo.
WeatherForm.propTypes = {
  onChangeCity: PropTypes.func.isRequired,
};
