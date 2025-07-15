import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  FuncionAllPartnerHotel,
  FuncionHotelesMasReservadosPartnerEstadistica,
  FuncionMesDondeMasSeReservaPartnerEstadistica,
} from "../../../redux/Actions/Actions";
import { PedirLocalStorage } from "../../../utils/LocalStorage/index";

import {
  EstadisticasBarraPartner,
  EstadisticasLinealPartner,
} from "./Estadisticas/EstadisticaProveedor";

import { Footer, NavBar } from "../../../components/index";
import ReviewPartner from "./ReviewPartner/ReviewPartner";

import PartnerHotels from "./PartnerHotels/PartnerHotels";

const ProfileColaborator = () => {
  let User = PedirLocalStorage();
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.PartnerHotels);
  const { HotelesMasReservadosPartner, MesDondeMasSeReservoPartner } =
    useSelector((state) => state.EstadisticasPartner);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      dispatch(FuncionAllPartnerHotel(User.id));
      dispatch(FuncionMesDondeMasSeReservaPartnerEstadistica(User.id));
      dispatch(FuncionHotelesMasReservadosPartnerEstadistica(User.id));
      setIsLoading(false);
    }
  }, []);

  let date = new Date();
  const horas = date.getHours();

  return (
    <div className="min-h-screen bg-primary-color">
      <NavBar />

      <main className="bg-primary-color">
        {/* Hero Section - Saludo personalizado */}
        <section className="relative bg-gradient-to-r from-secondary-color via-secondary-color/90 to-secondary-color border-b border-important-color/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-important-color/10 mb-6">
                <span className="text-4xl">👨‍💼</span>
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
                  Panel de colaborador - Gestiona tus propiedades
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-color/20 pointer-events-none"></div>
        </section>

        {/* Hotels Management Section */}
        <section className="py-12 bg-primary-color">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-3xl font-bold text-text-color mb-4">
                  Gestión de Hoteles
                </h2>
                <p className="text-lg text-secundary-text-color">
                  Administra y supervisa todas tus propiedades
                </p>
                <div className="w-24 h-1 bg-important-color mt-4"></div>
              </div>

              {/* Add Hotel Button */}
              <div className="flex-shrink-0">
                <NavLink
                  to="/FormHotel"
                  className="inline-flex items-center px-8 py-3 bg-important-color hover:bg-important-color/90 text-deep-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-important-color/30"
                >
                  <span className="mr-2">➕</span>
                  Agregar Hotel
                </NavLink>
              </div>
            </div>

            {/* Hotels Grid */}
            <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
              <PartnerHotels hotels={hotels} />
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 bg-secondary-color/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-color mb-4">
                Reseñas de Huéspedes
              </h2>
              <p className="text-lg text-secundary-text-color max-w-2xl mx-auto">
                Opiniones y comentarios de los huéspedes sobre tus propiedades
              </p>
              <div className="w-24 h-1 bg-important-color mx-auto mt-6"></div>
            </div>

            {/* Reviews Content */}
            <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-8">
              <ReviewPartner hotels={hotels} />
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 bg-primary-color">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-color mb-4">
                Estadísticas y Análisis
              </h2>
              <p className="text-lg text-secundary-text-color max-w-2xl mx-auto">
                Insights y métricas sobre el rendimiento de tus propiedades
              </p>
              <div className="w-24 h-1 bg-important-color mx-auto mt-6"></div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Linear Chart */}
              <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-important-color/20">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-text-color mb-2">
                    Tendencia de Reservas
                  </h3>
                  <p className="text-secundary-text-color">
                    Reservas por mes a lo largo del tiempo
                  </p>
                </div>
                <EstadisticasLinealPartner
                  MesDondeMasSeReservoPartner={MesDondeMasSeReservoPartner}
                />
              </div>

              {/* Bar Chart */}
              <div className="bg-secondary-color/50 backdrop-blur-sm rounded-xl border border-important-color/20 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-important-color/20">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-text-color mb-2">
                    Hoteles Más Reservados
                  </h3>
                  <p className="text-secundary-text-color">
                    Ranking de popularidad de tus propiedades
                  </p>
                </div>
                <EstadisticasBarraPartner
                  HotelesMasReservadosPartner={HotelesMasReservadosPartner}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileColaborator;
