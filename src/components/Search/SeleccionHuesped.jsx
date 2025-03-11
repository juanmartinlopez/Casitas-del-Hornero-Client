import Dropdown from "react-bootstrap/Dropdown";
import style from "./SeleccionHuesped.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function SeleccionHuespedes({ setSearchAll, SearchAll }) {
  const [statePerson, setStatePerson] = useState(0);
  const [stateHabitacion, setStateHabitacion] = useState(0);
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Personas: "Persons",
      Placeholder: "Find an Hotel",
      CantidadDeHabitaciones: "Number of rooms",
      SeleccionDeHuespedes: "Guest Selection",
    },
    es: {
      Personas: "Personas",
      CantidadDeHabitaciones: "Cantidad De Habitaciones",
      SeleccionDeHuespedes: "Seleccion De Huespedes",
    },
  };

  const FuncionIncrementPerson = () => {
    setSearchAll({ ...SearchAll, Huespedes: statePerson });
    setStatePerson(statePerson + 1);
  };

  const FuncionDecrementPerson = () => {
    if (statePerson !== 0 || !statePerson < 0) {
      setSearchAll({ ...SearchAll, Huespedes: statePerson });
      setStatePerson(statePerson - 1);
    }
  };

  const FuncionIncrementHabitaciones = () => {
    setSearchAll({ ...SearchAll, Habitaciones: stateHabitacion });
    setStateHabitacion(stateHabitacion + 1);
  };

  const FuncionDecrementHabitaciones = () => {
    if (stateHabitacion !== 0 || !stateHabitacion < 0) {
      setSearchAll({ ...SearchAll, Habitaciones: stateHabitacion });
      setStateHabitacion(stateHabitacion - 1);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Seleccion De Huespedes
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div className={style.div}>
          <div className={style.divInput}>
            <label className={style.label}>
              {translations[idioma].Personas} :
              <button onClick={FuncionDecrementPerson} className={style.boton}>
                -
              </button>
              <input
                type="text"
                className={style.input}
                value={statePerson}
                readonly
              />
              <button onClick={FuncionIncrementPerson} className={style.boton}>
                +
              </button>
            </label>
          </div>

          <div className={style.divInput}>
            <label className={style.label}>
              {translations[idioma].CantidadDeHabitaciones} :
              <button
                onClick={FuncionDecrementHabitaciones}
                className={style.boton}
              >
                -
              </button>
              <input
                type="text"
                className={style.input}
                value={stateHabitacion}
                readonly
              />
              <button
                onClick={FuncionIncrementHabitaciones}
                className={style.boton}
              >
                +
              </button>
            </label>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SeleccionHuespedes;
