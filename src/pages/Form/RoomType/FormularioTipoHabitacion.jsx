import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { Footer, NavBar } from "../../../components/index";
import { PedirLocalStorage } from "../../../utils/LocalStorage/index";
import Validations from "./Validations";

const FormularioTipoHab = (props) => {
  const CLOUDINARY = import.meta.env.VITE_CLOUDINARY_URL;
  const URL_BASE = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const User = PedirLocalStorage();
  const { state } = useLocation();
  const idHotelForm = useSelector((state) => state.idHotelForm);
  const id = state?.id_hotel || idHotelForm;

  const resetTipoHab = {
    people: "",
    price: "",
    name: "",
    image: "",
    stock: "",
    id_user: User.id,
    id_hotel: id,
  };
  const [tipoHab, setTipoHab] = useState(resetTipoHab);
  const [error, setError] = useState({});
  const tipo = {
    1: "Simple",
    2: "Doble",
    3: "Triple",
  };
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);

  // CHANGES IN FORM TIPOHAB

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setTipoHab({ ...tipoHab, [property]: value });
    setError(Validations({ ...tipoHab, [property]: value }));
  };

  // BUTTON SUBMIT

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !tipoHab.people.length ||
      !tipoHab.price.length ||
      !tipoHab.image.length ||
      !tipoHab.stock.length
    )
      return swal({
        text: "Por favor completa todos los campos.",
        icon: "warning",
        buttons: "Aceptar",
      });

    if (Object.entries(error).length)
      return swal({
        text: "Tienes errores en los campos",
        icon: "warning",
        buttons: "Aceptar",
      });

    const { people, price, name, image, stock, id_user } = tipoHab;
    try {
      const res = await axios.post(`${URL_BASE}/roomtypes/${id}`, {
        people: Number(people),
        price: Number.parseFloat(price).toFixed(2),
        name: tipo[people] || "Multiple",
        image,
        stock,
        id_user,
      });

      swal({
        text: "Tus habitaciones se registraron con éxito! ",
        icon: "success",
        buttons: "Aceptar",
      });
      navigate("/FormRoomType", {
        state: { id_hotel: state.id_hotel },
        replace: true,
      });
      setTipoHab(resetTipoHab);
    } catch (error) {
      console.log(error);
      if (error.response.data.error === "Room type already exists.") {
        setTipoHab(resetTipoHab);
        return swal({
          text: "Ya registraste este tipo de habitación.",
          icon: "warning",
          buttons: "Aceptar",
        });
      }
      swal({
        text: "Por favor vuelve a intentarlo, ocurrio un problema al cargar las habitaciones.",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

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

    const file = files[0];

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      swal({
        text: "Por favor selecciona un archivo de imagen válido",
        icon: "warning",
        buttons: "Aceptar",
      });
      return;
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      swal({
        text: "La imagen es muy grande. El tamaño máximo permitido es 10MB",
        icon: "warning",
        buttons: "Aceptar",
      });
      return;
    }

    setLoading(true);

    try {
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

      const updatedTipoHab = { ...tipoHab, image: result.secure_url };
      setTipoHab(updatedTipoHab);
      setError(Validations(updatedTipoHab));

      swal({
        text: "Imagen subida exitosamente",
        icon: "success",
        buttons: "Aceptar",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      swal({
        text: `Error al subir la imagen: ${error.message}`,
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
      const updatedTipoHab = { ...tipoHab, image: "" };
      setTipoHab(updatedTipoHab);
      setError(Validations(updatedTipoHab));

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

  return (
    <div className="min-h-screen bg-primary-color">
      <NavBar />

      <main className="bg-primary-color">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-secondary-color via-secondary-color/90 to-secondary-color border-b border-important-color/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-important-color/10 mb-6">
                <span className="text-4xl">🛏️</span>
              </div>
              <h1 className="text-4xl font-bold text-text-color mb-4">
                Registro de{" "}
                <span className="text-important-color">Habitaciones</span>
              </h1>
              <p className="text-lg text-secundary-text-color max-w-2xl mx-auto">
                Define los tipos de habitaciones disponibles en tu propiedad
              </p>
              <div className="w-24 h-1 bg-important-color mx-auto mt-6"></div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 bg-primary-color">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Room Information Card */}
              <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
                <h2 className="text-2xl font-semibold text-text-color mb-6 flex items-center">
                  <span className="mr-3">📋</span>
                  Información de la Habitación
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Capacity */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-color">
                      Cantidad de personas *
                    </label>
                    <input
                      type="number"
                      id="people"
                      placeholder="Ej: 2"
                      onChange={handleChange}
                      value={tipoHab.people}
                      name="people"
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                    />
                    {error.people ? (
                      <p className="text-red-400 text-sm mt-1">
                        {error.people}
                      </p>
                    ) : (
                      tipoHab.people && (
                        <p className="text-important-color text-sm mt-1 flex items-center">
                          <span className="mr-2">✓</span>
                          Tipo de habitación:{" "}
                          {tipo[tipoHab.people]?.toUpperCase() || "MÚLTIPLE"}
                        </p>
                      )
                    )}
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-color">
                      Precio por noche *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-important-color font-medium">
                        $
                      </span>
                      <input
                        type="number"
                        id="price"
                        placeholder="150.00"
                        onChange={handleChange}
                        value={tipoHab.price}
                        name="price"
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                      />
                    </div>
                    {error.price && (
                      <p className="text-red-400 text-sm mt-1">{error.price}</p>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-text-color">
                      Cantidad de habitaciones disponibles *
                    </label>
                    <input
                      type="number"
                      id="stock"
                      placeholder="Ej: 5"
                      onChange={handleChange}
                      value={tipoHab.stock}
                      name="stock"
                      min="1"
                      className="w-full px-4 py-3 bg-primary-color border border-important-color/30 rounded-lg text-text-color placeholder-secundary-text-color focus:outline-none focus:ring-2 focus:ring-important-color focus:border-important-color transition-all duration-300"
                    />
                    {error.stock && (
                      <p className="text-red-400 text-sm mt-1">{error.stock}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Card */}
              <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
                <h2 className="text-2xl font-semibold text-text-color mb-6 flex items-center">
                  <span className="mr-3">📸</span>
                  Imagen de la Habitación
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
                            Selecciona una imagen de la habitación
                          </span>
                          <p className="text-secundary-text-color mt-2">
                            Arrastra y suelta un archivo aquí o haz clic para
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
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {tipoHab.image && (
                    <div className="relative max-w-md mx-auto">
                      <div className="relative group">
                        <img
                          src={tipoHab.image}
                          alt="Vista previa de la habitación"
                          className="w-full h-64 object-cover rounded-lg border border-important-color/20 shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => deleteImage(tipoHab.image)}
                          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                        >
                          <span className="text-lg">✕</span>
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg p-4">
                          <p className="text-white text-sm font-medium">
                            Imagen de la habitación
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {loading && (
                    <div className="flex flex-col items-center justify-center space-y-3 text-important-color p-6 bg-secondary-color/30 rounded-lg border border-important-color/20">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-important-color"></div>
                      <span className="text-lg font-medium">
                        Subiendo imagen...
                      </span>
                      <span className="text-sm text-secundary-text-color">
                        Por favor espera, esto puede tomar unos momentos
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-12 py-4 bg-important-color hover:bg-important-color/90 text-deep-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-important-color/30 flex items-center justify-center space-x-3"
                >
                  <span>🛏️</span>
                  <span>REGISTRAR HABITACIÓN</span>
                </button>

                <NavLink
                  to="/"
                  className="w-full sm:w-auto px-12 py-4 bg-secondary-color hover:bg-secondary-color/80 border border-important-color/30 hover:border-important-color/50 text-text-color font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
                >
                  <span>🏠</span>
                  <span>VOLVER AL INICIO</span>
                </NavLink>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FormularioTipoHab;
