import { addMonths } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTrolley } from "../../redux/Actions/Actions";

//-------------------Styles-----------------------//
import "react-datepicker/dist/react-datepicker.css";
import "./FullCalendar.css"; // utilizar si o si css normal al queres implementar estilos en DatePicker , porque component styled no funciona.
//------------------------------------------//
registerLocale("es", es);

function Calendario({ id }) {
  //*---------------Dispatch:
  const dispatch = useDispatch();
  //*-----------------------------------------------------Fechas:
  const [dateRange, setDateRange] = useState([new Date(), new Date()]); // new Date() muestra la fecha actual.
  const [stateFecha, setStateFecha] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [startDate, endDate] = dateRange;
  //*--------------------------------------------------------------------*//
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      VerDisponibilidad: "See availability",
      Fechas: `Start Date / End Date`,
    },
    es: {
      VerDisponibilidad: "Ver Disponibilidad",
      Fechas: `Fecha De Inicio / Fecha Final`,
    },
  };

  const SubirDisponibilidad = (idUser) => {
    dispatch(GetTrolley(idUser, stateFecha.checkIn, stateFecha.checkOut));
  };

  //*---------------------------------------Calendarios Funciones :

  //?-----------------------------------------------CheckIn:

  const onChange = (update) => {
    setDateRange(update);

    const formatDate = (date) => {
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); //? Se asegura de obtener el mes correcto sumando 1 al mes devuelto por  (ya que los meses en JavaScript van de 0 a 11).
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    const checkInDate = update[0];
    const checkOutDate = update[1];

    const checkIn = formatDate(checkInDate); //?invocamos la funcion de arriba pasandole el date para transformarlo.
    const checkOut = formatDate(checkOutDate); //?invocamos la funcion de arriba pasandole el date para transformarlo.

    setStateFecha({ checkIn, checkOut });
  };

  //------------------------------------------------------//
  return (
    <>
      <div className="divTheTrolley">
        <div className="Checks">
          <DatePicker
            showIcon
            className="customDatepicker"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => onChange(update)}
            withPortal
            dateFormat="dd '/' MMMM '/' yyyy"
            minDate={new Date()}
            maxDate={addMonths(new Date(), 12)} // La función addMonths es una función proporcionada por la biblioteca date-fns, que se utiliza para agregar un número específico de meses a una fecha determinada. Toma dos argumentos: la fecha inicial y la cantidad de meses que deseas agregar. se utiliza para realizar cálculos de fechas, como agregar o restar meses, de una manera sencilla y eficiente utilizando la biblioteca date-fns.
            showDisabledMonthNavigation
            customInput={
              <div className="datepicker-custom-input">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {!stateFecha.checkIn && !stateFecha.checkOut ? (
                  <span className="span">
                    <br />
                    {translations[idioma].Fechas}
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
          <button onClick={() => SubirDisponibilidad(id)}>
            {translations[idioma].VerDisponibilidad}
          </button>
        </div>
      </div>
    </>
  );
}

export default Calendario;
