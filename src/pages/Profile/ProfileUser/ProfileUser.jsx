import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import { GetTrolley } from "../../../redux/Actions/Actions";
import { PedirLocalStorage } from "../../../utils/LocalStorage/index";

import { Footer, NavBar } from "./../../../components/index";

import Booking from "./Booking/Booking";
import Favorites from "./Favorites/Favorites";

const ProfileUser = ({ countCarrito, setCountCarrito }) => {
  const URL_BASE = import.meta.env.VITE_API;
  const Trolleys = useSelector((state) => state.Trolley);
  const dispatch = useDispatch();
  let User = PedirLocalStorage();

  setCountCarrito((countCarrito = Trolleys.length));

  useEffect(() => {
    dispatch(GetTrolley(User.id));
  }, []);

  const FuncionQuieroSerProveedor = (id_user) => {
    swal({
      title: "¿Estás seguro que deseas ser proveedor?",
      text: "Nuestros proveedores son aquellos usuarios que publican sus hoteles",
      content: "input",
      buttons: {
        cancel: "Cancelar",
        confirm: "Aceptar",
      },
    }).then((result) => {
      if (result.length) {
        // El usuario ha hecho clic en el botón de confirmación y ha ingresado un mensaje
        const mensaje = result;
        axios
          .post(`${URL_BASE}/request`, { message: mensaje, id_user })
          .then((response) => {
            swal({
              text: response.data,
              icon: "success",
              buttons: "Aceptar",
            });
          })
          .catch((error) => {
            swal({
              text: error.response.data.error,
              icon: "warning",
              buttons: "Aceptar",
            });
          });
      }
    });
  };

  let date = new Date();
  const horas = date.getHours();

  return (
    <div className="min-h-screen bg-primary-color">
      <NavBar countCarrito={countCarrito} />

      <main className="bg-primary-color">
        {/* Hero Section - Saludo personalizado */}
        <section className="relative bg-gradient-to-r from-secondary-color via-secondary-color/90 to-secondary-color border-b border-important-color/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-important-color/10 mb-6">
                <span className="text-4xl">👤</span>
              </div>
              <div className="space-y-2">
                {horas <= 12 && horas > 5 && (
                  <h1 className="text-4xl font-bold text-text-color mb-2">
                    Buenos días,{" "}
                    <span className="text-important-color">
                      {User.username}
                    </span>
                  </h1>
                )}
                {horas > 12 && horas < 19 && (
                  <h1 className="text-4xl font-bold text-text-color mb-2">
                    Buenas tardes,{" "}
                    <span className="text-important-color">
                      {User.username}
                    </span>
                  </h1>
                )}
                {(horas >= 19 || horas <= 5) && (
                  <h1 className="text-4xl font-bold text-text-color mb-2">
                    Buenas noches,{" "}
                    <span className="text-important-color">
                      {User.username}
                    </span>
                  </h1>
                )}
                <p className="text-lg text-secundary-text-color">
                  Panel de usuario - Gestiona tus reservas y favoritos
                </p>
                <div className="mt-4 p-4 bg-secondary-color/30 rounded-lg border border-important-color/20 inline-block">
                  <p className="text-sm text-secundary-text-color">Email:</p>
                  <p className="text-important-color font-semibold">
                    {User.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-color/20 pointer-events-none"></div>
        </section>

        {/* Become Provider Section */}
        <section className="py-12 bg-primary-color">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-important-color/10 via-important-color/5 to-important-color/10 rounded-xl border border-important-color/20 p-8 text-center">
              <div className="inline-block p-4 rounded-full bg-important-color/20 mb-6">
                <span className="text-3xl">🏨</span>
              </div>
              <h3 className="text-2xl font-bold text-text-color mb-4">
                ¿Tienes una propiedad?
              </h3>
              <p className="text-lg text-secundary-text-color mb-6 max-w-2xl mx-auto">
                Únete a nuestra comunidad de proveedores y comienza a generar
                ingresos con tu propiedad
              </p>
              <button
                onClick={() => FuncionQuieroSerProveedor(User.id)}
                className="inline-flex items-center px-8 py-3 bg-important-color hover:bg-important-color/90 text-deep-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-important-color/30"
              >
                <span className="mr-2">🚀</span>
                ¡Quiero ser proveedor!
              </button>
            </div>
          </div>
        </section>

        {/* Favorites Section */}
        <section className="py-12 bg-secondary-color/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-color mb-4">
                Mis Favoritos
              </h2>
              <p className="text-lg text-secundary-text-color max-w-2xl mx-auto">
                Los hoteles que has marcado como favoritos para futuras reservas
              </p>
              <div className="w-24 h-1 bg-important-color mx-auto mt-6"></div>
            </div>

            {/* Favorites Content */}
            <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
              <Favorites />
            </div>
          </div>
        </section>

        {/* Bookings Section */}
        <section className="py-12 bg-primary-color">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-color mb-4">
                Mis Reservas
              </h2>
              <p className="text-lg text-secundary-text-color max-w-2xl mx-auto">
                Historial y estado de todas tus reservas realizadas
              </p>
              <div className="w-24 h-1 bg-important-color mx-auto mt-6"></div>
            </div>

            {/* Bookings Content */}
            <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
              <Booking />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileUser;
