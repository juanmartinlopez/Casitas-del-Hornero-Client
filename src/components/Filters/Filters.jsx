//?---------------------------- IMPORTS --------------------------------
import { addMonths } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
// import { differenceInDays } from "date-fns";
import es from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
registerLocale("es", es);
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FuncionSelectFilter,
  PostFilters,
  getDepartment,
  getLocality,
  getProvinces,
  getServices,
} from "../../redux/Actions/Actions";
//css
import style from "./FiltersDark.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "./FiltrosCalendario.css";
import styleLight from "./Filters.module.css";
import styleDark from "./FiltersDark.module.css";
import { GuardarCheckInCheckOut } from "../Index";
import traductor from "../Traductor/Traductor";

// import style from theme === 'light'? "./Filters.module.css":"./FiltersDark.module.css";

//?----------------- COMPONENTE FILTER ------------------------------------
const Filter = () => {
  const dispatch = useDispatch();
  const { Filters, Services, Provinces, Department, Locality } = useSelector(
    (state) => state
  );
  //*-----------------------------------------------------Fechas:
  const [dateRange, setDateRange] = useState([null, null]);
  const [stateFecha, setStateFecha] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [startDate, endDate] = dateRange;

  //*-----------------------------------------------------------------*//

  const [stateFilter, setFilter] = useState(Filters);
  const [provinceId, setProvinceId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;

  useEffect(() => {
    dispatch(getProvinces());
    dispatch(getServices());
    if (provinceId.length) dispatch(getDepartment(provinceId));
    if (departmentId.length) dispatch(getLocality(departmentId));
  }, [dispatch, provinceId, departmentId]);

  const raiting = [1, 2, 3, 4, 5];
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      FiltroPorProvincia: "Filter By Province",
      FiltroPorDepartamento: "Filter By Department",
      FiltroPorLocalidad: "Filter By Location",
      FiltroPorRating: "Filter By Rating",
      OrdenarPor: "Sort by",
      MayorValoracion: "Highest Valuation",
      MenorValoracion: "Lower Valuation",
      NombreAZ: "Name A-Z",
      NombreZA: "Name Z-A",
      MasEstrellas: "More Stars",
      MenosEstrellas: "Less stars",
      Estrellas: "Number of stars",
      Filtrar: "Filter",
      LimpiarFiltros: "Clean Filters",
    },
    es: {
      FiltroPorProvincia: "Filtro Por Provincia",
      FiltroPorDepartamento: "Filtro Por Departamento",
      FiltroPorLocalidad: "Filtro Por Localidad",
      FiltroPorRating: "Filtro Por Rating",
      OrdenarPor: "Ordenar por",
      MayorValoracion: "Mayor Valoración",
      MenorValoracion: "Menor Valoración",
      NombreAZ: "Nombre A-Z",
      NombreZA: "Nombre Z-A",
      MasEstrellas: "Mas Estrellas",
      MenosEstrellas: "Menos estrellas",
      Estrellas: "N° de estrellas",
      Filtrar: "Filtrar",
      LimpiarFiltros: "Limpiar Filtros",
    },
  };

  //*---------------------------Funcion Fehcas:

  const onChange = (update) => {
    setDateRange(update);

    const formatDate = (date) => {
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    const [checkInDate, checkOutDate] = update; // destructuro de upDate el valor de fecha inicio y final.
    const checkIn = checkInDate ? formatDate(checkInDate) : ""; // lo guardo en constatne y pregunto si existe , si existe se lo envio como parametro a la funcion y sino un string vacio.
    const checkOut = checkOutDate ? formatDate(checkOutDate) : ""; // lo guardo en constatne y pregunto si existe , si existe se lo envio como parametro a la funcion y sino un string vacio.

    setFilter({
      ...stateFilter,
      checkIn: checkIn,
      checkOut: checkOut,
    });
    setStateFecha({
      checkIn: checkIn,
      checkOut: checkOut,
    });
  };

  //*----------------------------------------------------------*//

  const onChangeProvinces = async (event) => {
    setFilter({
      ...stateFilter,
      provinces: event.target.value,
    });
    setProvinceId(
      event.target.options[event.target.selectedIndex].getAttribute("id")
    );
  };

  const onChangeDeparment = async (event) => {
    setFilter({
      ...stateFilter,
      department: event.target.value,
    });
    setDepartmentId(
      event.target.options[event.target.selectedIndex].getAttribute("id")
    );
  };

  const onChangeLocality = async (event) => {
    setFilter({
      ...stateFilter,
      locality: event.target.value,
    });
  };

  const onChangeRating = async (event) => {
    setFilter({ ...stateFilter, rating: event.target.value });
  };

  const onChangeServices = (ser) => {
    if (stateFilter.services.includes(ser)) {
      // basicamente pregunte si ya lo incluye que lo filtre y lo saque sino
      // Remove the service from the filter
      setFilter({
        ...stateFilter,
        services: stateFilter.services.filter((s) => s !== ser),
      });
    } else {
      // sino que me permita setearlo
      // Add the service to the filter
      setFilter({
        ...stateFilter,
        services: [...stateFilter.services, ser],
      });
    }
  };

  const onChangeName = (event) => {
    setFilter({ ...stateFilter, name: event.target.value });
  };

  const onChangeOrder = (event) => {
    setFilter({ ...stateFilter, order: event.target.value });
  };

  // FILTRAR
  const FuncionFilter = (event) => {
    event.preventDefault();
    dispatch(PostFilters(stateFilter)); // Para modificar el estado global
    dispatch(FuncionSelectFilter(stateFilter, 1)); // Para el get a la DB
    GuardarCheckInCheckOut({
      CheckIn: stateFecha.checkIn,
      CheckOut: stateFecha.checkOut,
    });
  };

  // CLEAN FILTROS
  const FuncionCleanFilter = (event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setStateCheckIn(today);

    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setStateCheckOut(tomorrow);

    event.preventDefault();
    document.forms["filterForm"].reset();
    setProvinceId("");
    setDepartmentId("");
    setFilter({
      provinces: "",
      department: "",
      locality: "",
      services: [],
      rating: "",
      order: "",
      page: 1,
      name: "",
      checkIn: "",
      checkOut: "",
    });

    dispatch(
      PostFilters({
        provinces: "",
        department: "",
        locality: "",
        services: [],
        rating: "",
        order: "",
        page: 1,
        name: "",
        checkIn: "",
        checkOut: "",
      })
    );

    dispatch(
      FuncionSelectFilter({
        provinces: "",
        department: "",
        locality: "",
        services: [],
        rating: "",
        order: "",
        page: 1,
        name: "",
        checkIn: "",
        checkOut: "",
      })
    );
  };

  return (
    <div>
      <form name="filterForm" className={style.form}>
        <input
          type="text"
          name="text"
          className={style.inputSearch}
          placeholder="Buscar un Hotel . . ."
          onChange={onChangeName}
        />
        <select onChange={onChangeProvinces} className={style.select}>
          <option hidden>{translations[idioma].FiltroPorProvincia}</option>
          {Provinces.map((pro) => (
            <option id={pro.id} value={pro.nombre} key={pro.id}>
              {pro.nombre}
            </option>
          ))}
        </select>

        {provinceId.length ? (
          <>
            <select onChange={onChangeDeparment} className={style.select}>
              <option hidden>
                {translations[idioma].FiltroPorDepartamento}
              </option>
              {Department.map((dep) => (
                <option id={dep.id} value={dep.nombre}>
                  {dep.nombre}
                </option>
              ))}
            </select>
          </>
        ) : (
          <></>
        )}
        {departmentId.length ? (
          <>
            <select onChange={onChangeLocality} className={style.select}>
              <option hidden>{translations[idioma].FiltroPorLocalidad}</option>
              {Locality.map((loc) => (
                <option id={loc.id} value={loc.nombre}>
                  {loc.nombre}
                </option>
              ))}
            </select>
          </>
        ) : (
          <></>
        )}
        <select onChange={onChangeRating} className={style.select}>
          <option hidden>{translations[idioma].Estrellas}</option>
          {raiting.map((rant, index) => (
            <option value={rant} key={index}>
              {rant}
            </option>
          ))}
        </select>
        <select onChange={onChangeOrder} className={style.select}>
          <option hidden>{translations[idioma].OrdenarPor}</option>
          <option value="VALORATIONDESC">
            {translations[idioma].MayorValoracion}
          </option>
          <option value="VALORATIONASC">
            {translations[idioma].MenorValoracion}
          </option>
          <option value="NAMEASC">{translations[idioma].NombreAZ}</option>
          <option value="NAMEDESC">{translations[idioma].NombreZA}</option>
          <option value="RATINGDESC">
            {translations[idioma].MasEstrellas}
          </option>
          <option value="RATINGASC">
            {translations[idioma].MenosEstrellas}
          </option>
        </select>
        <div className={style.Checks}>
          <DatePicker
            showIcon
            className="customDatepicker"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => onChange(update)}
            withPortal
            dateFormat="dd 'de' MMMM 'de' yyyy"
            minDate={new Date()}
            maxDate={addMonths(new Date(), 12)} // La función addMonths es una función proporcionada por la biblioteca date-fns, que se utiliza para agregar un número específico de meses a una fecha determinada. Toma dos argumentos: la fecha inicial y la cantidad de meses que deseas agregar. se utiliza para realizar cálculos de fechas, como agregar o restar meses, de una manera sencilla y eficiente utilizando la biblioteca date-fns.
            showDisabledMonthNavigation
            customInput={
              <div
                className="datepicker-custom-input"
                style={{ "background-color": "#E56910" }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
                {!stateFecha.checkIn && !stateFecha.checkOut ? (
                  <span className="span">
                    <br />
                    {`CheckIn-CheckOut`}
                  </span>
                ) : (
                  <span className="span">
                    <br />
                    {`${stateFecha.checkIn}`} <br /> {`${stateFecha.checkOut}`}
                  </span>
                )}
              </div>
            }
          />
        </div>

        <table className={style.table}>
          {Services.map((Ser) => (
            <tbody key={Ser.id}>
              <tr className={style.tr}>
                <td className={style.td}>
                  {idioma === "en" ? traductor(Ser.name) : Ser.name}
                </td>
                <td className={style.td}>
                  <label className={style.checkbox_btn}>
                    <label htmlFor="checkbox"></label>
                    <input
                      className={style.inputServices}
                      onChange={() => onChangeServices(Ser.name)}
                      value={Ser.name}
                      type="checkbox"
                      id="checkbox"
                    ></input>
                    <span className={style.checkmark}></span>
                  </label>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div>
          <button onClick={FuncionFilter} className={style.button}>
            {translations[idioma].Filtrar}
          </button>
          <button onClick={FuncionCleanFilter} className={style.button}>
            {translations[idioma].LimpiarFiltros}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
