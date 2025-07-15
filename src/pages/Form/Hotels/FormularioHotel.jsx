import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Maps from "./Map/Map";
import Validations from "./Validations";

import { Footer, NavBar } from "../../../components/index";
import { idHotelForm } from "../../../redux/Actions/Actions";
import { PedirLocalStorage } from "../../../utils/LocalStorage/index";

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
  const CLOUDINARY =
    import.meta.env.VITE_CLOUDINARY_URL ||
    "https://api.cloudinary.com/v1_1/dhe1t8gs0/image/upload";
  const URL_BASE = import.meta.env.VITE_API;

  let User = PedirLocalStorage();
  const navigate = useNavigate();
  const [location, dispatch] = useReducer(reducer, initialLocation);
  const [services, setServices] = useState([]);
  const [fotos, setFotos] = useState({});

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
        text: "Ocurrió un problema al cargar las Provincias",
        icon: "warning",
        buttons: "Aceptar",
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
        text: "Ocurrió un problema al cargar los Departamentos",
        icon: "warning",
        buttons: "Aceptar",
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
        text: "Ocurrió un problema al cargar las Localidades",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  const getServices = async () => {
    try {
      const response = await axios.get(`${URL_BASE}/services/`);
      setServices(response.data);
    } catch (error) {
      swal({
        text: "Ocurrió un problema al cargar los servicios",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  // CHANGES IN SELECTS

  const onChangeProvinces = (event) => {
    const nombre = event.target.value.toUpperCase();
    setHotel({ ...hotel, province: nombre });
    setError(Validations({ ...hotel, province: nombre }));
    const id_province = event.target.selectedOptions[0].id;
    getDepartments(id_province);
  };

  const onChangeDepartments = (event) => {
    const nombre = event.target.value.toUpperCase();
    setHotel({ ...hotel, department: nombre });
    setError(Validations({ ...hotel, department: nombre }));
    const id_department = event.target.selectedOptions[0].id;
    getLocalities(id_department);
  };

  const onChangeLocalities = (event) => {
    const nombre = event.target.value.toUpperCase();
    setHotel({ ...hotel, locality: nombre });
    setError(Validations({ ...hotel, locality: nombre }));
  };

  // CHANGES IN SERVICES

  const onChangeServices = (event) => {
    const checked = event.target.checked;
    const id = Number(event.target.id);
    if (checked) {
      setHotel({ ...hotel, services: [...hotel.services, id] });
      setError(Validations({ ...hotel, services: [...hotel.services, id] }));
    } else {
      const removed = hotel.services.filter((service) => service !== id);
      setHotel({ ...hotel, services: [...removed] });
      setError(Validations({ ...hotel, services: [...removed] }));
    }
  };

  // CHANGES IN IMAGE

  const uploadImage = async (e) => {
    const files = e.target.files;

    // Validar que se haya seleccionado un archivo
    if (!files || files.length === 0) {
      swal({
        text: "Por favor selecciona una imagen",
        icon: "warning",
        buttons: "Aceptar",
      });
      return;
    }

    setLoading(true);
    const uploadedUrls = [];

    try {
      // Procesar cada archivo
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validar tipo de archivo
        if (!file.type.startsWith("image/")) {
          console.warn(`Archivo ${file.name} no es una imagen válida`);
          continue;
        }

        // Validar tamaño (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
          console.warn(`Archivo ${file.name} es muy grande (máximo 10MB)`);
          continue;
        }

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "La_Casita_Del_Hornero");

        const res = await fetch(CLOUDINARY, {
          method: "POST",
          body: data,
        });

        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const result = await res.json();

        if (result.error) {
          throw new Error(result.error.message);
        }

        uploadedUrls.push(result.secure_url);
      }

      if (uploadedUrls.length > 0) {
        // Crear una nueva copia del array de imágenes
        const newImages = [...hotel.image, ...uploadedUrls];
        setHotel({ ...hotel, image: newImages });
        setError(Validations({ ...hotel, image: newImages }));

        swal({
          text: `${uploadedUrls.length} imagen(es) subida(s) exitosamente`,
          icon: "success",
          buttons: "Aceptar",
          timer: 2000,
        });
      } else {
        swal({
          text: "No se pudieron subir las imágenes. Verifica que sean archivos de imagen válidos",
          icon: "warning",
          buttons: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      swal({
        text: `Error al subir las imágenes: ${error.message}`,
        icon: "error",
        buttons: "Aceptar",
      });
    } finally {
      setLoading(false);
      // Limpiar el input
      e.target.value = "";
    }
  };

  const deleteImage = async (url) => {
    try {
      setLoading(true);
      const filteredImages = hotel.image.filter((imagen) => url !== imagen);
      setHotel({ ...hotel, image: filteredImages });
      setError(Validations({ ...hotel, image: filteredImages }));

      swal({
        text: "Imagen eliminada exitosamente",
        icon: "success",
        buttons: "Aceptar",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      swal({
        text: "Error al eliminar la imagen",
        icon: "error",
        buttons: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  // CHANGES IN HOTEL

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setHotel({ ...hotel, [property]: value });
    setError(Validations({ ...hotel, [property]: value }));
  };

  // USEEFFECT INITIAL

  useEffect(() => {
    !services.length && getServices();
    !location.provinces.length && dispatch(getProvinces());
    hotel.location = geoposition.location;
    // Ejecutar validaciones iniciales
    setError(Validations(hotel));
  }, [geoposition, hotel]);

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
        text: "Por favor completa todos los campos",
        icon: "warning",
        buttons: "Aceptar",
      });

    console.log("Errores encontrados:", error);
    if (Object.entries(error).length)
      return swal({
        text: "Tienes errores en los campos",
        icon: "warning",
        buttons: "Aceptar",
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
      console.log(error);
      swal({
        text: "Por favor vuelve a intentarlo, ocurrio un problema al cargar tu hotel",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary-color">
      <NavBar />

      <main className="bg-primary-color">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-secondary-color via-secondary-color/90 to-secondary-color border-b border-important-color/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-important-color/10 mb-6">
                <span className="text-4xl">🏨</span>
              </div>
              <h1 className="text-4xl font-bold text-text-color mb-4">
                Registro de <span className="text-important-color">Hotel</span>
              </h1>
              <p className="text-lg text-secundary-text-color max-w-2xl mx-auto">
                Completa la información de tu propiedad para comenzar a recibir
                huéspedes
              </p>
              <div className="w-24 h-1 bg-important-color mx-auto mt-6"></div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 bg-primary-color">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Card */}
              <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
                <h2 className="text-2xl font-semibold text-text-color mb-6 flex items-center">
                  <span className="mr-3">📝</span>
                  Información Básica
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hotel Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-color">
                      Nombre del hotel *
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Ej: Hotel Villa Mercedes"
                      onChange={handleChange}
                      value={hotel.name}
                      name="name"
                      className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                    />
                    {error.name && (
                      <p className="text-red-400 text-sm mt-1">{error.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-color">
                      Email de notificación *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="hotel@ejemplo.com"
                      onChange={handleChange}
                      value={hotel.email}
                      name="email"
                      className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                    />
                    {error.email && (
                      <p className="text-red-400 text-sm mt-1">{error.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-color">
                      Número de teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="+54 11 1234-5678"
                      onChange={handleChange}
                      value={hotel.phoneNumber}
                      name="phoneNumber"
                      className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                    />
                    {error.phoneNumber && (
                      <p className="text-red-400 text-sm mt-1">
                        {error.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-color">
                      Clasificación del hotel *
                    </label>
                    <input
                      type="text"
                      id="rating"
                      placeholder="Ej: 4 estrellas"
                      onChange={handleChange}
                      value={hotel.rating}
                      name="rating"
                      className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                    />
                    {error.rating && (
                      <p className="text-red-400 text-sm mt-1">
                        {error.rating}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-text-color">
                      Descripción (Opcional)
                    </label>
                    <textarea
                      id="description"
                      placeholder="Describe tu hotel, sus características principales y lo que lo hace especial..."
                      onChange={handleChange}
                      value={hotel.description}
                      name="description"
                      rows="4"
                      className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300 resize-vertical"
                    />
                  </div>
                </div>
              </div>

              {/* Services Card */}
              <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
                <h2 className="text-2xl font-semibold text-text-color mb-6 flex items-center">
                  <span className="mr-3">🛎️</span>
                  Servicios del Hotel
                </h2>

                {error.services && (
                  <p className="text-red-400 text-sm mb-4">{error.services}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services?.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center space-x-3 p-3 bg-primary-color/50 rounded-lg border border-important-color/20 hover:bg-primary-color/70 transition-all duration-300"
                    >
                      <input
                        type="checkbox"
                        id={service.id}
                        value={service.name}
                        onChange={onChangeServices}
                        className="w-5 h-5 text-important-color bg-primary-color border-important-color/30 rounded focus:ring-important-color focus:ring-2"
                      />
                      <p> </p>
                      <label
                        htmlFor={service.id}
                        className="text-text-color text-sm font-medium cursor-pointer flex-1"
                      >
                        {service.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images Card */}
              <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
                <h2 className="text-2xl font-semibold text-text-color mb-6 flex items-center">
                  <span className="mr-3">📸</span>
                  Imágenes del Hotel
                </h2>

                {error.image && (
                  <p className="text-red-400 text-sm mb-4">{error.image}</p>
                )}

                <div className="space-y-6">
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-important-color/30 rounded-lg p-8 text-center hover:border-important-color/50 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="text-4xl text-important-color">📷</div>
                      <div>
                        <label htmlFor="image" className="cursor-pointer">
                          <span className="text-lg font-medium text-text-color">
                            Selecciona las imágenes de tu hotel
                          </span>
                          <p className="text-secundary-text-color mt-2">
                            Arrastra y suelta archivos aquí o haz clic para
                            seleccionar
                          </p>
                        </label>
                        <input
                          type="file"
                          id="image"
                          name="image"
                          onChange={uploadImage}
                          className="hidden"
                          accept="image/*"
                          multiple
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {hotel.image.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {hotel.image.map((imagen, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={imagen}
                            alt={`Hotel imagen ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg border border-important-color/20"
                          />
                          <button
                            type="button"
                            onClick={() => deleteImage(imagen)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {loading && (
                    <div className="flex flex-col items-center justify-center space-y-3 text-important-color p-6 bg-secondary-color/30 rounded-lg border border-important-color/20">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-important-color"></div>
                      <span className="text-lg font-medium">
                        Subiendo imágenes...
                      </span>
                      <span className="text-sm text-secundary-text-color">
                        Por favor espera, esto puede tomar unos momentos
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
                <h2 className="text-2xl font-semibold text-text-color mb-6 flex items-center">
                  <span className="mr-3">📍</span>
                  Ubicación del Hotel
                </h2>

                <div className="space-y-6">
                  {/* Location Selects */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Province */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-color">
                        Provincia *
                      </label>
                      <select
                        onChange={onChangeProvinces}
                        className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                      >
                        <option
                          value=""
                          className="bg-primary-color text-secundary-text-color"
                        >
                          Selecciona una provincia
                        </option>
                        {location.provinces?.map(({ nombre, id }) => (
                          <option
                            value={nombre}
                            key={id}
                            id={id}
                            className="bg-primary-color text-text-color"
                            style={{
                              backgroundColor: "#1a1f1a",
                              color: "#F5F5F5",
                            }}
                          >
                            {nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Department */}
                    {location.departments.length > 0 && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-color">
                          Departamento *
                        </label>
                        <select
                          onChange={onChangeDepartments}
                          className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                        >
                          <option
                            value=""
                            className="bg-primary-color text-secundary-text-color"
                            style={{
                              backgroundColor: "#1a1f1a",
                              color: "#B4B4B4",
                            }}
                          >
                            Selecciona un departamento
                          </option>
                          {location.departments?.map(({ nombre, id }) => (
                            <option
                              value={nombre}
                              key={id}
                              id={id}
                              className="bg-primary-color text-text-color"
                              style={{
                                backgroundColor: "#1a1f1a",
                                color: "#F5F5F5",
                              }}
                            >
                              {nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Locality */}
                    {location.localities.length > 0 && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-color">
                          Localidad *
                        </label>
                        <select
                          onChange={onChangeLocalities}
                          className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                        >
                          <option
                            value=""
                            className="bg-primary-color text-secundary-text-color"
                            style={{
                              backgroundColor: "#1a1f1a",
                              color: "#B4B4B4",
                            }}
                          >
                            Selecciona una localidad
                          </option>
                          {location.localities?.map(({ nombre, id }) => (
                            <option
                              value={nombre}
                              key={id}
                              id={id}
                              className="bg-primary-color text-text-color"
                              style={{
                                backgroundColor: "#1a1f1a",
                                color: "#F5F5F5",
                              }}
                            >
                              {nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Map */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-text-color">
                      Ubicación exacta en el mapa
                    </h3>
                    <div className="rounded-lg overflow-hidden border border-important-color/20 bg-secondary-color/30">
                      <div
                        style={{
                          height: "400px",
                          minHeight: "400px",
                          width: "100%",
                        }}
                      >
                        <Maps
                          location={geoposition}
                          setLocation={setGeoposition}
                        />
                      </div>
                    </div>
                    <p className="text-secundary-text-color text-sm">
                      Haz clic en el mapa para establecer la ubicación exacta de
                      tu hotel
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  className="px-12 py-4 bg-important-color hover:bg-important-color/90 text-deep-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-important-color/30 flex items-center space-x-3"
                >
                  <span>🏨</span>
                  <span>REGISTRAR HOTEL</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FormularioHotel;
