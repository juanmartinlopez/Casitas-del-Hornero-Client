import { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import validacion from "./Validations";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Maps from "../../MapForm/Map";
import { Footer, PedirLocalStorage } from "../../Index";
import { idHotelForm } from "../../../redux/Actions/Actions";
import NavBar from "../../Nav/Nav";

import styleLight from "./FormularioHotel.module.css";
import styleDark from "./FormularioHotelDark.module.css";

const initialLocation = {
  provinces: [],
  departments: [],
  localities: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PROVINCES":
      return {
        ...state,
        provinces: action.payload,
      };
    case "GET_DEPARTMENTS":
      return {
        ...state,
        departments: action.payload,
      };
    case "GET_LOCALITIES":
      return {
        ...state,
        localities: action.payload,
      };
    default:
      return { ...state };
  }
};

const FormularioHotel = () => {
  const URL_BASE = "https://casitasdelhornero.onrender.com";

  let User = PedirLocalStorage();
  const navigate = useNavigate();
  const [location, dispatch] = useReducer(reducer, initialLocation);
  const [services, setServices] = useState([]);
  const [fotos, setFotos] = useState({});
  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;

  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      CompletarTodos: "Please complete all fields",
      Aceptar: "Accept",
      ProblemaProvincias: "There was a problem loading the Provinces",
      ErrorDepartamentos: "There was a problem loading the Departments",
      ErrorLocalidad: "There was a problem loading the Locations",
      ErrorServicios: "There was a problem loading services",
      ErrorCampos: "You have errors in the fields",
      HotelExito: "Your hotel was registered successfully!",
      ErrorCarga: "Please try again, there was a problem loading your hotel",
      RegistraTuHotel: "HOTEL REGISTER",
      NombreDelHotel: "Name of the hotel",
      NotiMail: "Email notification",
      NumeroTelefonico: "Phone Number",
      DescripcionOpcional: "[Optional]Add a description...",
      Valoracion: "Hotel Valoration",
      Clasificacion: "Hotel Rating",
      SeleccionProvincia: "Province where your hotel is located:",
      SeleccionDepartamento: "Department where your hotel is located:",
      SeleccionLocalidad: "Locality where your hotel is located:",
      SeleccionServicios: "Select the services that your hotel has:",
      CargaFoto: "Upload your hotel photo/os:",
      URLFoto: "Photo url",
      UbicacionHotel: "Set the location of the hotel on the map:",
      Registrar: "REGISTER HOTEL",
      SelectProvince: "Select a province",
      SelectDepartment: "Select a department",
      SelectLocality: "Select a locality",
    },
    es: {
      CompletarTodos: "Por favor completa todos los campos",
      Aceptar: "Aceptar",
      ProblemaProvincias: "Ocurrió un problema al cargar las Provincias",
      ErrorDepartamentos: "Ocurrió un problema al cargar los Departamentos",
      ErrorLocalidad: "Ocurrió un problema al cargar las Localidades",
      ErrorServicios: "Ocurrió un problema al cargar los servicios",
      ErrorCampos: "Tienes errores en los campos",
      HotelExito: "Tu hotel se registró con éxito!",
      ErrorCarga:
        "Por favor vuelve a intentarlo, ocurrio un problema al cargar tu hotel",
      RegistraTuHotel: "REGISTRO DE HOTEL",
      NombreDelHotel: "Nombre del hotel",
      NotiMail: "Email de notificación",
      NumeroTelefonico: "Número de teléfono",
      DescripcionOpcional: "[Opcional] Añade una descripción...",
      Valoracion: "Valoración del hotel",
      Clasificacion: "Clasificación del hotel",
      SeleccionProvincia: "Provincia donde se encuentra tu hotel:",
      SeleccionDepartamento: "Departamento donde se encuentra tu hotel:",
      SeleccionLocalidad: "Localidad donde se encuentra tu hotel:",
      SeleccionServicios: "Selecciona los servicios que tiene tu hotel:",
      CargaFoto: "Carga la/s foto/s de tu hotel:",
      URLFoto: "URL de la foto",
      UbicacionHotel: "Establece la ubicación del hotel en el mapa:",
      Registrar: "REGISTRAR HOTEL",
      SelectProvince: "Selecciona una provincia",
      SelectDepartment: "Selecciona un departamento",
      SelectLocality: "Selecciona una localidad",
    },
  };

  const [geoposition, setGeoposition] = useState({
    location: ["-34.603718", "-58.381639"],
    name: "Tu hotel",
  });
  const resetHotel = {
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    rating: "",
    province: "",
    department: "",
    locality: "",
    services: [],
    image: [],
    location: [],
  };
  const [hotel, setHotel] = useState(resetHotel);
  const [error, setError] = useState({});

  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);

  // ACTIONS

  const getProvinces = async () => {
    try {
      const response = await axios.get(`${URL_BASE}/locations/`);
      dispatch({ type: "GET_PROVINCES", payload: response.data });
    } catch (error) {
      swal({
        text: translations[idioma].ProblemaProvincias,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    }
  };

  const getDepartments = async (id_province) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/locations?id_province=${id_province}`
      );
      dispatch({ type: "GET_DEPARTMENTS", payload: response.data });
    } catch (error) {
      swal({
        text: translations[idioma].ErrorDepartamentos,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    }
  };

  const getLocalities = async (id_department) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/locations?id_department=${id_department}`
      );
      dispatch({ type: "GET_LOCALITIES", payload: response.data });
    } catch (error) {
      swal({
        text: translations[idioma].ErrorLocalidad,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    }
  };

  const getServices = async () => {
    try {
      const response = await axios.get(`${URL_BASE}/services/`);
      setServices(response.data);
    } catch (error) {
      swal({
        text: translations[idioma].ErrorServicios,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    }
  };

  // CHANGES IN SELECTS

  const onChangeProvinces = (event) => {
    const nombre = event.target.value.toUpperCase();
    setHotel({ ...hotel, province: nombre });
    setError(validacion({ ...hotel, province: nombre }));
    const id_province = event.target.selectedOptions[0].id;
    getDepartments(id_province);
  };

  const onChangeDepartments = (event) => {
    const nombre = event.target.value.toUpperCase();
    setHotel({ ...hotel, department: nombre });
    setError(validacion({ ...hotel, department: nombre }));
    const id_department = event.target.selectedOptions[0].id;
    getLocalities(id_department);
  };

  const onChangeLocalities = (event) => {
    const nombre = event.target.value.toUpperCase();
    setHotel({ ...hotel, locality: nombre });
    setError(validacion({ ...hotel, locality: nombre }));
  };

  // CHANGES IN SERVICES

  const onChangeServices = (event) => {
    const checked = event.target.checked;
    const id = Number(event.target.id);
    if (checked) {
      setHotel({ ...hotel, services: [...hotel.services, id] });
      setError(validacion({ ...hotel, services: [...hotel.services, id] }));
    } else {
      const removed = hotel.services.filter((service) => service !== id);
      setHotel({ ...hotel, services: [...removed] });
      setError(validacion({ ...hotel, services: [...removed] }));
    }
  };

  // CHANGES IN IMAGE

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "La_Casita_Del_Hornero");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhe1t8gs0/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    await hotel.image.push(file.secure_url);
    setLoading(false);
    setError(validacion({ ...hotel, image: hotel.image }));
  };

  const deleteImage = async (url) => {
    setLoading(true);
    hotel.image = await hotel.image.filter((imagen) => url !== imagen);
    setLoading(false);
    setError(validacion({ ...hotel, image: hotel.image }));
  };

  // CHANGES IN HOTEL

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setHotel({ ...hotel, [property]: value });
    setError(validacion({ ...hotel, [property]: value }));
  };

  // USEEFFECT INITIAL

  useEffect(() => {
    !services.length && getServices();
    !location.provinces.length && dispatch(getProvinces());
    hotel.location = geoposition.location;
  }, [geoposition]);

  // BUTTON SUBMIT

  const handleSubmit = async (event) => {
    event.preventDefault();

    // resetHotel.image = imagenes;

    if (
      !hotel.name.length ||
      !hotel.email.length ||
      !hotel.phoneNumber.length ||
      !hotel.rating.length ||
      !hotel.province.length ||
      !hotel.department.length ||
      !hotel.locality.length ||
      !hotel.services.length ||
      !hotel.image.length ||
      !hotel.location.length
    )
      return swal({
        text: translations[idioma].CompletarTodos,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });

    if (Object.entries(error).length)
      return swal({
        text: translations[idioma].ErrorCampos,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });

    const {
      name,
      email,
      phoneNumber,
      description,
      rating,
      province,
      department,
      locality,
      services,
      image,
      location,
    } = hotel;
    try {
      const { data } = await axios.post(`${URL_BASE}/hotels/${User.id}`, {
        name,
        email,
        phoneNumber,
        description,
        rating: Number(rating),
        province,
        department,
        locality,
        services,
        image,
        location,
      });

      swal({
        text: "Tu hotel se registro con éxito!",
        icon: "success",
        buttons: "Aceptar",
      });
      dispatch(idHotelForm(data.id));
      navigate("/FormRoomType", {
        state: { id_hotel: data.id },
        replace: true,
      });
    } catch (error) {
      swal({
        text: translations[idioma].ErrorCarga,
        icon: "warning",
        buttons: translations[idioma].Aceptar,
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className={style.formHotelContainer}>
        <form onSubmit={handleSubmit} className={style.form}>
          <h1 className="h3 mb-3 fw-normal">
            {translations[idioma].RegistraTuHotel}!
          </h1>

          {/* NOMBRE DEL HOTEL */}

          {error.name ? (
            <span className={style.error}>{error.name}</span>
          ) : (
            <span className={style.hidden}>hidden</span>
          )}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder={translations[idioma].NombreDelHotel}
              onChange={handleChange}
              value={hotel.name}
              name="name"
            />
            <label>{translations[idioma].NombreDelHotel}</label>
          </div>

          {/* EMAIL PARA LA GESTION DEL HOTEL */}

          {error.email ? (
            <span className={style.error}>{error.email}</span>
          ) : (
            <span className={style.hidden}>hidden</span>
          )}
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder={translations[idioma].NotiMail}
              onChange={handleChange}
              value={hotel.email}
              name="email"
            />
            <label>{translations[idioma].NotiMail}</label>
          </div>

          {/* TELEFONO DE CONTACTO */}

          {error.phoneNumber ? (
            <span className={style.error}>{error.phoneNumber}</span>
          ) : (
            <span className={style.hidden}>hidden</span>
          )}
          <div className="form-floating">
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder={translations[idioma].NumeroTelefonico}
              onChange={handleChange}
              value={hotel.phoneNumber}
              name="phoneNumber"
            />
            <label>{translations[idioma].NumeroTelefonico}</label>
          </div>

          {/* UNA DESCRIPCION OPCIONAL */}

          <span className={style.hidden}>hidden</span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder={translations[idioma].DescripcionOpcional}
              onChange={handleChange}
              value={hotel.description}
              name="description"
            />
            <label>{translations[idioma].DescripcionOpcional}.</label>
          </div>

          {/* SERVICIOS QUE TENDRA EL HOTEL */}

          {error.services ? (
            <span className={style.error}>{error.services}</span>
          ) : (
            <span className={style.hidden}>hidden</span>
          )}
          <div className={style.selectService}>
            {translations[idioma].SeleccionServicios}
          </div>
          <span onChange={onChangeServices} className={style.checkContainer}>
            {services?.map((service) => (
              <div key={service.id} className={style.checkbox}>
                <label className={style.container}>
                  <input
                    type="checkbox"
                    id={service.id}
                    value={service.name}
                    onChange={onChangeServices}
                  />
                  <div className={style.checkmark}></div>
                </label>
                <span className={style.nameService}>{service.name}</span>
              </div>
            ))}
          </span>

          {/* CLASIFICACION DEL HOTEL */}

          {error.rating ? (
            <span className={style.error}>{error.rating}</span>
          ) : (
            <span className={style.hidden}>hidden</span>
          )}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="rating"
              placeholder={translations[idioma].Clasificacion}
              onChange={handleChange}
              value={hotel.rating}
              name="rating"
            />
            <label>{translations[idioma].Clasificacion}</label>
          </div>

          {/* CARGAR IMAGEN */}

          {error.image ? (
            <span className={style.error}>{error.image}</span>
          ) : (
            <span className={style.hidden}>hidden</span>
          )}
          <div className={style.label}>{translations[idioma].CargaFoto}</div>
          <div>
            <input
              className={style.uploadContainer}
              type="file"
              name="image"
              placeholder="arrastra la imagen aquí"
              onChange={uploadImage}
            />
            {hotel.image.length ? (
              <div className={style.DivPadre}>
                {hotel.image.map((imagen) => {
                  return (
                    <div className={style.ContainerImagen}>
                      <button
                        className={style.BotonDelete}
                        onClick={() => deleteImage(imagen)}
                      >
                        X
                      </button>
                      <img src={imagen} style={{ width: "300px" }} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* LOCATION DONDE SE UBICA EL HOTEL*/}

          <div className={style.label}>
            {translations[idioma].SeleccionProvincia}
          </div>
          <select onChange={onChangeProvinces} className={style.select}>
            <option hidden>{translations[idioma].SelectProvince}</option>
            {location.provinces?.map(({ nombre, id }) => (
              <option value={nombre} key={id} id={id}>
                {nombre}
              </option>
            ))}
          </select>
          {location.departments.length ? (
            <div>
              <div>{translations[idioma].SeleccionDepartamento}:</div>
              <select onChange={onChangeDepartments} className={style.select}>
                <option hidden>{translations[idioma].SelectDepartment}</option>
                {location.departments?.map(({ nombre, id }) => (
                  <option value={nombre} key={id} id={id}>
                    {nombre}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <></>
          )}
          {location.localities.length ? (
            <div>
              <div>{translations[idioma].SeleccionLocalidad}</div>
              <select onChange={onChangeLocalities} className={style.select}>
                <option hidden>{translations[idioma].SelectLocality}</option>
                {location.localities?.map(({ nombre, id }) => (
                  <option value={nombre} key={id} id={id}>
                    {nombre}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <></>
          )}

          {/* GEOLOCALIZACION DEL HOTEL */}

          <div className={style.label}>
            {translations[idioma].UbicacionHotel}
          </div>
          <Maps location={geoposition} setLocation={setGeoposition} />

          <button
            className="w-100 btn btn-lg"
            type="submit"
            style={{ "background-color": "#E56910", color: "white" }}
          >
            {translations[idioma].Registrar}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FormularioHotel;
