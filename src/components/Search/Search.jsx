import { useState } from "react";
import SeleccionHuespedes from "./SeleccionHuesped";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import styles from "./Search.module.css";
import { useDispatch, useSelector } from "react-redux";
// import MyCalendar from "./Calendario";
import { FuncionSelectFilter, PostFilters } from "../../redux/Actions/Actions";
registerLocale("es", es);

const Search = () => {
  const dispatch = useDispatch();
  // const [state, setState] = useState("");
  const { Filters } = useSelector((state) => state);
  const [stateFilter, setFilter] = useState(Filters);
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Buscar: "Search",
      Placeholder: "Find an Hotel",
    },
    es: {
      Buscar: "Buscar",
      Placeholder: "Buscar un Hotel",
    },
  };

  // const [state, setState] = useState(new Date("2023", "05", "09"));
  // const [SearchAll, setSearchAll] = useState({
  //   InputText: "",
  //   Calendario: "",
  //   Huespedes: 0,
  //   Habitaciones: 0,
  // });

  // Podria crear un estado que sea un objeto y guarde la informacion del calendario , huspedes y lo que hay en el input
  // Que al hacer onClick en buscar envie eso en un dispatch y me busque a los hoteles disponibles.

  // const onChange = (state) => {
  //   setState(state);
  //   setSearchAll({ ...SearchAll, Calendario: state });
  // };

  const onChangeText = (event) => {
    setFilter({ ...stateFilter, name: event.target.value });
  };

  const FuncionSearchAll = () => {
    dispatch(PostFilters(stateFilter));
    dispatch(FuncionSelectFilter(stateFilter, 1));
  };

  // const FuncionSearchAll = () => {
  //   // Aca envio el estado SearchAll y se lo mando a un dispatch , para luego enviar esa infor por body a una ruta.
  //   dispatch(FuncionSearch(SearchAll)); // al hacer click en el boton busca en la base de datos.
  // };

  return (
    <div className={styles.divMayor}>
      <div className={styles.div}>
        {/* <div className={styles.divHijo}> */}

        <input
          className={styles.input}
          type="text"
          name="text"
          placeholder={translations[idioma].Placeholder}
          onChange={onChangeText}
        />
        <button className={styles.fancy} onClick={() => FuncionSearchAll()}>
          {translations[idioma].Buscar}
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Search;

{
  /* <DatePicker
selected={state}
onChange={onChange}
locale="es"
className="pickers"
dateFormat="dd 'de' MMMM 'de' yyyy"
/>

<SeleccionHuespedes setSearchAll={setSearchAll} SearchAll={SearchAll} /> */
}
