import { useState } from "react";
import style from "./Clima.module.css";
import { useSelector } from "react-redux";

const VITE_API_KEY = "bf29d6808d85484fb42200108231005";
const API_WEATHER = `https://api.weatherapi.com/v1/forecast.json?key=${VITE_API_KEY}&q=`;

export default function Clima() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const [weather, setWeather] = useState({
    city: "",
    country: "",
    forecasts: [],
  });

  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Clima: "Climate",
      Buscar: "Search",
      Ciudad: "City *",
    },
    es: {
      Clima: "Clima",
      Buscar: "Buscar",
      Ciudad: "Ciudad *",
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      error: false,
      message: "",
    });

    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };
      const response = await fetch(`${API_WEATHER}${city}&days=7`); // Añadido el parámetro 'days' para obtener 7 días de pronóstico
      const data = await response.json();
      if (data.error) throw { message: data.error.message };

      setWeather({
        city: data.location.name,
        country: data.location.country,
        forecasts: data.forecast.forecastday, // Almacenar los pronósticos de varios días en 'forecasts'
      });
    } catch (error) {
      setError({
        error: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.h2}>{translations[idioma].Clima}</h2>
      <form className={style.form} autoComplete="off" onSubmit={onSubmit}>
        <input
          className={style.input}
          id="city"
          placeholder={translations[idioma].Ciudad}
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></input>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
        <button className={style.button} type="submit">
          {translations[idioma].Buscar}
        </button>
      </form>

      {weather.city && (
        <div style={{ "text-align": "center" }}>
          <h4>
            {weather.city}, {weather.country}
          </h4>
          {weather.forecasts.map((forecast) => (
            <div key={forecast.date}>
              <br />
              <h5>{forecast.date}:</h5>
              <div>
                <img
                  src={forecast.day.condition.icon}
                  alt={forecast.day.condition.text}
                />
              </div>
              <h3>{forecast.day.avgtemp_c}ºC</h3>
            </div>
          ))}
        </div>
      )}

      <p className={style.powered}>
        Powered by: <a href="https://www.weatherapi.com">WeatherAPI</a>{" "}
      </p>
    </div>
  );
}
