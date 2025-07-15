//?---------------------------- IMPORTS --------------------------------

import es from "date-fns/locale/es";
import { useEffect, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  FuncionSelectFilter,
  PostFilters,
  getDepartment,
  getLocality,
  getProvinces,
  getServices,
} from "../../../redux/Actions/Actions.js";
import { GuardarCheckInCheckOut } from "../../../utils/LocalStorage";
registerLocale("es", es);

//css
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesDropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getProvinces());
    dispatch(getServices());
    if (provinceId.length) dispatch(getDepartment(provinceId));
    if (departmentId.length) dispatch(getLocality(departmentId));
  }, [dispatch, provinceId, departmentId]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const raiting = [1, 2, 3, 4, 5];

  //*---------------------------Funcion Fechas:
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

  console.log(stateFilter);
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
    event.preventDefault();
    document.forms["filterForm"].reset();
    setProvinceId("");
    setDepartmentId("");
    setDateRange([null, null]);
    setStateFecha({
      checkIn: "",
      checkOut: "",
    });
    setIsServicesOpen(false); // Cerrar dropdown de servicios
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
    <div className="bg-secondary-color/90 backdrop-blur-lg rounded-md shadow-lg border border-important-color/30 p-6 mx-auto max-w-7xl transform hover:scale-[1.01] transition-all duration-300">
      <form name="filterForm" className="space-y-6">
        {/* Título del filtro más compacto */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-extrabold tracking-wider text-elegant-gold mb-1 uppercase">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-important-color" /> Encuentra tu Casita Perfecta
          </h3>
          <div className="w-16 h-0.5 bg-important-color mx-auto"></div>
        </div>

        {/* Fila principal de filtros compactos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          {/* Búsqueda por nombre */}
          <div className="col-span-2 relative flex items-center">
            <FontAwesomeIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-important-color text-base" />
            <input
              type="text"
              name="text"
              placeholder="Buscar hotel..."
              onChange={onChangeName}
              className="w-full pl-10 pr-3 py-2 text-sm bg-primary-color/50 border border-important-color/30 rounded-md text-text-color placeholder-secundary-text-color focus:outline-none focus:ring-1 focus:ring-important-color/50 focus:border-important-color transition-all duration-300"
            />
          </div>

          {/* Provincia */}
          <select
            onChange={onChangeProvinces}
            className="px-2 py-2 text-sm bg-primary-color border border-important-color/30 rounded-md text-text-color focus:outline-none focus:ring-1 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 appearance-none"
            style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
          >
            <option hidden className="bg-primary-color text-text-color">Provincia</option>
            {Provinces.map((pro) => (
              <option
                id={pro.id}
                value={pro.nombre}
                key={pro.id}
                className="bg-primary-color text-text-color"
                style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
              >
                {pro.nombre}
              </option>
            ))}
          </select>

          {/* Departamento */}
          {provinceId.length ? (
            <select
              onChange={onChangeDeparment}
              className="px-2 py-2 text-sm bg-primary-color border border-important-color/30 rounded-md text-text-color focus:outline-none focus:ring-1 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 appearance-none"
              style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
            >
              <option hidden className="bg-primary-color text-text-color">Departamento</option>
              {Department.map((dep) => (
                <option
                  id={dep.id}
                  value={dep.nombre}
                  key={dep.id}
                  className="bg-primary-color text-text-color"
                  style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
                >
                  {dep.nombre}
                </option>
              ))}
            </select>
          ) : (
            <div className="px-2 py-2 text-sm bg-primary-color/30 border border-important-color/20 rounded-md text-secundary-text-color opacity-50">
              Departamento
            </div>
          )}

          {/* Localidad */}
          {departmentId.length ? (
            <select
              onChange={onChangeLocality}
              className="px-2 py-2 text-sm bg-primary-color border border-important-color/30 rounded-md text-text-color focus:outline-none focus:ring-1 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 appearance-none"
              style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
            >
              <option hidden className="bg-primary-color text-text-color">Localidad</option>
              {Locality.map((loc) => (
                <option
                  id={loc.id}
                  value={loc.nombre}
                  key={loc.id}
                  className="bg-primary-color text-text-color"
                  style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
                >
                  {loc.nombre}
                </option>
              ))}
            </select>
          ) : (
            <div className="px-2 py-2 text-sm bg-primary-color/30 border border-important-color/20 rounded-md text-secundary-text-color opacity-50">
              Localidad
            </div>
          )}

          {/* Rating */}
          <select
            onChange={onChangeRating}
            className="px-2 py-2 text-sm bg-primary-color border border-important-color/30 rounded-md text-text-color focus:outline-none focus:ring-1 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 appearance-none"
            style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
          >
            <option hidden className="bg-primary-color text-text-color">⭐ Estrellas</option>
            {raiting.map((rant, index) => (
              <option
                value={rant}
                key={index}
                className="bg-primary-color text-text-color"
                style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
              >
                {"⭐".repeat(rant)} {rant}
              </option>
            ))}
          </select>

          {/* Ordenamiento */}
          <select
            onChange={onChangeOrder}
            className="px-2 py-2 text-sm bg-primary-color border border-important-color/30 rounded-md text-text-color focus:outline-none focus:ring-1 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 appearance-none"
            style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
          >
            <option hidden className="bg-primary-color text-text-color">Ordenar</option>
            <option
              value="VALORATIONDESC"
              className="bg-primary-color text-text-color"
              style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
            >
              ↑ Valoración
            </option>
            <option
              value="VALORATIONASC"
              className="bg-primary-color text-text-color"
              style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
            >
              ↓ Valoración
            </option>
            <option
              value="NAMEASC"
              className="bg-primary-color text-text-color"
              style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
            >
              A-Z
            </option>
            <option
              value="NAMEDESC"
              className="bg-primary-color text-text-color"
              style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
            >
              Z-A
            </option>
            <option
              value="RATINGDESC"
              className="bg-primary-color text-text-color"
              style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
            >
              ⭐↑
            </option>
            <option
              value="RATINGASC"
              className="bg-primary-color text-text-color"
              style={{ backgroundColor: '#181A1B', color: '#F5F5F5' }}
            >
              ⭐↓
            </option>
          </select>
        </div>

        {/* Segunda fila: Fechas y Servicios */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
          {/* Selector de fechas compacto */}
          <div className="flex-shrink-0">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => onChange(update)}
              withPortal
              dateFormat="dd/MM"
              minDate={new Date()}
              maxDate={addMonths(new Date(), 12)}
              showDisabledMonthNavigation
              popperClassName="!bg-primary-color !border !border-important-color/30 !rounded-md !shadow-lg !text-text-color !z-[9999]"
              calendarClassName="!bg-primary-color !text-text-color !rounded-md !border !border-important-color/30"
              dayClassName={() => "!bg-primary-color !text-text-color hover:!bg-important-color/30"}
              wrapperClassName="!bg-primary-color"
              customInput={
                <div className="bg-primary-color border border-important-color/30 rounded-md px-3 py-2 cursor-pointer hover:border-important-color/50 transition-all duration-300 flex items-center space-x-2 min-w-[160px] text-text-color">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-important-color text-base mr-2"
                  />
                  <div className="text-xs">
                    {!stateFecha.checkIn && !stateFecha.checkOut ? (
                      <span className="text-secundary-text-color">Fechas</span>
                    ) : (
                      <span className="text-text-color font-medium">
                        {stateFecha.checkIn} - {stateFecha.checkOut}
                      </span>
                    )}
                  </div>
                </div>
              }
            />
          </div>

          {/* Servicios desplegables */}
          {Services.length > 0 && (
            <div className="flex-1 min-w-0 relative" ref={servicesDropdownRef}>
              <button
                type="button"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full px-3 py-2 bg-primary-color/50 border border-important-color/30 rounded-md text-text-color focus:outline-none focus:ring-1 focus:ring-important-color/50 focus:border-important-color transition-all duration-300 flex items-center justify-between text-sm"
              >
                <span className="flex items-center space-x-2">
                  <FontAwesomeIcon icon="hotel" className="text-important-color text-base" />
                  <span>
                    {stateFilter.services.length > 0
                      ? `${stateFilter.services.length} servicio${stateFilter.services.length > 1 ? "s" : ""
                      }`
                      : "Servicios"}
                  </span>
                </span>
                <FontAwesomeIcon icon={isServicesOpen ? "chevron-up" : "chevron-down"} className="w-4 h-4 text-important-color transition-transform duration-200" />
              </button>

              {/* Dropdown de servicios */}
              {isServicesOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-secondary-color/95 backdrop-blur-md border border-important-color/30 rounded-md shadow-lg z-[9999] max-h-60 overflow-y-auto" style={{ backgroundColor: '#181A1B' }}>
                  <div className="p-2">
                    <div className="grid grid-cols-1 gap-1">
                      {Services.map((Ser) => (
                        <label
                          key={Ser.id}
                          className="flex items-center space-x-2 p-2 hover:bg-primary-color/30 rounded-md cursor-pointer group transition-colors duration-200 text-text-color"
                          style={{ color: '#F5F5F5' }}>
                          <input
                            onChange={() => onChangeServices(Ser.name)}
                            value={Ser.name}
                            type="checkbox"
                            checked={stateFilter.services.includes(Ser.name)}
                            className="w-4 h-4 text-important-color bg-transparent border-important-color/50 rounded-md focus:ring-important-color/30 focus:ring-1"
                          />
                          <span className="text-text-color text-sm font-medium group-hover:text-important-color transition-colors duration-200 flex-1">
                            {Ser.name}
                          </span>
                        </label>
                      ))}
                    </div>
                    {Services.length > 0 && (
                      <div className="border-t border-important-color/20 mt-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFilter({
                              ...stateFilter,
                              services: [],
                            });
                          }}
                          className="text-xs text-secundary-text-color hover:text-important-color transition-colors duration-200"
                        >
                          Limpiar servicios
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Botones de acción compactos */}
          <div className="flex gap-2">
            <button
              onClick={FuncionFilter}
              className="bg-important-color hover:bg-important-color/90 text-primary-color font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-1 focus:ring-important-color/50 text-sm flex items-center gap-2"
            >
              <FontAwesomeIcon icon="search" className="text-base" /> Buscar
            </button>
            <button
              onClick={FuncionCleanFilter}
              className="bg-transparent border border-important-color/50 text-important-color hover:bg-important-color/10 hover:border-important-color font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-1 focus:ring-important-color/50 text-sm flex items-center gap-2"
            >
              <FontAwesomeIcon icon="trash" className="text-base" /> Limpiar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;
