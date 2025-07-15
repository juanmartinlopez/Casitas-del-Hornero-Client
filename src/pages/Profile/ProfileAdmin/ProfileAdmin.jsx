import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FuncionHotelesMasReservadosEstadistica,
  FuncionMesMasReservadoEstadistica,
  FuncionProvinciasMasReservaronEstadistica,
  FuncionTodosLosBookingsEstadistica,
  FuncionUsuariosQueMasReservaronEstadistica,
  FuncionValoracionHotelEstadistica,
} from "../../../redux/Actions/Actions";

import { PedirLocalStorage } from "../../../utils/LocalStorage/index";

import { Footer, NavBar } from "../../../components/index";
import {
  EstadisticasBarraHotelMasReservado,
  EstadisticasBarraMesMasReservado,
  EstadisticasLinealProvinciasMasReservada,
  EstadisticasLinealTodosLosBookings,
  EstadisticasLinealUsuarioQueMasReservo,
  EstadisticasLinealValoracionHoteles,
} from "./Estadisticas/EstadisticasSuperAdmin";
import { GetBookings, GetHotels, GetRequests, GetUsers } from "./Gets";

const ProfileAdmin = () => {
  const dispatch = useDispatch();
  const {
    ValoracionHoteles,
    TodosLosBookings,
    MesMasReservado,
    HotelMasReservado,
    UsuarioQueMasReservo,
    ProvinciasMasReservada,
  } = useSelector((state) => state.Estadisticas);
  let User = PedirLocalStorage();

  useEffect(() => {
    dispatch(FuncionHotelesMasReservadosEstadistica(User.id));
    dispatch(FuncionProvinciasMasReservaronEstadistica(User.id));
    dispatch(FuncionMesMasReservadoEstadistica(User.id));
    dispatch(FuncionValoracionHotelEstadistica(User.id));
    dispatch(FuncionUsuariosQueMasReservaronEstadistica(User.id));
    dispatch(FuncionTodosLosBookingsEstadistica(User.id, User.rol));
  }, []);

  let date = new Date();
  const horas = date.getHours();

  return (
    <div className="min-h-screen bg-primary-color">
      <NavBar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="pt-8 pb-6">
          {/* User Info Card */}
          <div className="mt-5 bg-secondary-color rounded-xl shadow-lg border border-important-color/10 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secundary-text-color mb-1">
                  Email de administrador
                </p>
                <p className="text-lg font-semibold text-text-color">
                  {User.email}
                </p>
              </div>
              <div className="w-12 h-12 bg-important-color/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-important-color/10 to-secondary-color/10 rounded-xl p-8 border border-important-color/20">
              {horas <= 12 && horas > 5 && (
                <h1 className="text-4xl font-bold text-text-color mb-2">
                  Buenos días, {User.username} ☀️
                </h1>
              )}
              {horas > 12 && horas < 19 && (
                <h1 className="text-4xl font-bold text-text-color mb-2">
                  Buenas tardes, {User.username} 🌅
                </h1>
              )}
              {(horas >= 19 || horas <= 5) && (
                <h1 className="text-4xl font-bold text-text-color mb-2">
                  Buenas noches, {User.username} 🌙
                </h1>
              )}
              <p className="text-base text-secundary-text-color">
                Panel de administración del sistema
              </p>
              <div className="w-20 h-0.5 bg-important-color mx-auto mt-4"></div>
            </div>
          </div>
        </div>

        {/* Management Tables Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-color mb-3">
              Gestión del Sistema
            </h2>
            <p className="text-base text-secundary-text-color max-w-2xl mx-auto">
              Administra usuarios, hoteles, solicitudes y reservas desde un solo
              lugar
            </p>
            <div className="w-20 h-0.5 bg-important-color mx-auto mt-4"></div>
          </div>

          <div className="space-y-8">
            <GetUsers />
            <GetRequests />
            <GetHotels />
            <GetBookings />
          </div>
        </section>

        {/* Statistics Section */}
        <section className="pb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-color mb-3">
              Estadísticas y Análisis
            </h2>
            <p className="text-base text-secundary-text-color max-w-2xl mx-auto">
              Visualiza el rendimiento y métricas importantes del negocio
            </p>
            <div className="w-20 h-0.5 bg-important-color mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-secondary-color rounded-xl shadow-lg border border-important-color/10 p-6">
              <h3 className="text-xl font-semibold text-text-color mb-4 flex items-center">
                <span className="w-3 h-3 bg-important-color rounded-full mr-3"></span>
                Valoración de Hoteles
              </h3>
              <EstadisticasLinealValoracionHoteles
                ValoracionHoteles={ValoracionHoteles}
              />
            </div>

            <div className="bg-secondary-color rounded-xl shadow-lg border border-important-color/10 p-6">
              <h3 className="text-xl font-semibold text-text-color mb-4 flex items-center">
                <span className="w-3 h-3 bg-important-color rounded-full mr-3"></span>
                Reservas y Pagos
              </h3>
              <EstadisticasLinealTodosLosBookings
                TodosLosBookings={TodosLosBookings}
              />
            </div>

            <div className="bg-secondary-color rounded-xl shadow-lg border border-important-color/10 p-6">
              <h3 className="text-xl font-semibold text-text-color mb-4 flex items-center">
                <span className="w-3 h-3 bg-important-color rounded-full mr-3"></span>
                Meses más Reservados
              </h3>
              <EstadisticasBarraMesMasReservado
                MesMasReservado={MesMasReservado}
              />
            </div>

            <div className="bg-secondary-color rounded-xl shadow-lg border border-important-color/10 p-6">
              <h3 className="text-xl font-semibold text-text-color mb-4 flex items-center">
                <span className="w-3 h-3 bg-important-color rounded-full mr-3"></span>
                Hoteles más Reservados
              </h3>
              <EstadisticasBarraHotelMasReservado
                HotelMasReservado={HotelMasReservado}
              />
            </div>

            <div className="bg-secondary-color rounded-xl shadow-lg border border-important-color/10 p-6">
              <h3 className="text-xl font-semibold text-text-color mb-4 flex items-center">
                <span className="w-3 h-3 bg-important-color rounded-full mr-3"></span>
                Usuarios más Activos
              </h3>
              <EstadisticasLinealUsuarioQueMasReservo
                UsuarioQueMasReservo={UsuarioQueMasReservo}
              />
            </div>

            <div className="bg-secondary-color rounded-xl shadow-lg border border-important-color/10 p-6">
              <h3 className="text-xl font-semibold text-text-color mb-4 flex items-center">
                <span className="w-3 h-3 bg-important-color rounded-full mr-3"></span>
                Provincias más Reservadas
              </h3>
              <EstadisticasLinealProvinciasMasReservada
                ProvinciasMasReservada={ProvinciasMasReservada}
              />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileAdmin;
