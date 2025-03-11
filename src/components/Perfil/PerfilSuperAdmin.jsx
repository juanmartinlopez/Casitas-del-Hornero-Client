import { useEffect } from "react";
import {
  FuncionHotelesMasReservadosEstadistica,
  FuncionProvinciasMasReservaronEstadistica,
  FuncionTodosLosBookingsEstadistica,
  FuncionMesMasReservadoEstadistica,
  FuncionValoracionHotelEstadistica,
  FuncionUsuariosQueMasReservaronEstadistica,
} from "../../redux/Actions/Actions";
import {
  EstadisticasLinealValoracionHoteles,
  EstadisticasLinealTodosLosBookings,
  EstadisticasBarraMesMasReservado,
  EstadisticasBarraHotelMasReservado,
  EstadisticasLinealUsuarioQueMasReservo,
  EstadisticasLinealProvinciasMasReservada,
} from "../../Estadisticas/EstadisticasSuperAdmin";
import { NavBar, Footer, PedirLocalStorage, GetUsers, GetRequests, GetHotels, GetBookings } from "../Index";
import { useDispatch, useSelector } from "react-redux";
// import style from "./PerfilSuperAdmin.module.css";
import styleLight from "./PerfilSuperAdmin.module.css"
import styleDark from"./PerfilSuperAdminDark.module.css"

const PerfilSuperAdmin = () => {
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
  const idioma = useSelector((state) => state.idioma);
  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;

  const translations = {
    en: {
      BuenosDias: "Good morning",
      BuenasTardes: "Good afternoon",
      BuenasNoches: "Good night",
      Email: "Your email is",
      ValoraciondeHoteles: "Hotel valuations",
      Todaslasreservasypago: "Bookings and payments",
      Mesesmasreservados: "Most months booked",
      Hotelesmasreservados: "Most booked hotels",
      Cantidaddereservasporusuario: "Number of reservations per user",
      ProvinciasMasReservada: "Most bookeds provinces",

    },
    es: {
      BuenosDias: "Buenos días",
      BuenasTardes: "Buenas tardes",
      BuenasNoches: "Buenas noches",
      Email: "Tu email es",
      Todaslasreservasypago: "Todas las reservas y pago",
      ValoraciondeHoteles: "Valoración de Hoteles",
      Mesesmasreservados: "Meses más reservados",
      Hotelesmasreservados: "Hoteles más reservados",
      Cantidaddereservasporusuario: "Cantidad de reservas por usuario",
      ProvinciasMasReservada: "Provincias más reservadas"
    },
  };

  useEffect(() => {
    dispatch(FuncionHotelesMasReservadosEstadistica(User.id));
    dispatch(FuncionProvinciasMasReservaronEstadistica(User.id));
    dispatch(FuncionMesMasReservadoEstadistica(User.id));
    dispatch(FuncionValoracionHotelEstadistica(User.id));
    dispatch(FuncionUsuariosQueMasReservaronEstadistica(User.id));
    dispatch(FuncionTodosLosBookingsEstadistica(User.id, User.rol));
  }, []);


  let date = new Date()
  const horas = date.getHours()



  return (
    <>
      <NavBar />
      <div className={style.divContainerGigaChad}>
        <div className={style.divEmail}>

          <p>{`Email: ${User.email}`}</p>
        </div>
        <section>
          <div className={style.divDeBienvenido}>
            {horas <= 12 && horas > 5 && (
              <h1>{translations[idioma].BuenosDias} {User.username}</h1>
            )}
            {horas > 12 && horas < 19 && (
              <h1>{translations[idioma].BuenasTardes} {User.username}</h1>
            )}
            {(horas >= 19 || horas <= 5) && (
              <h1>{translations[idioma].BuenasNoches} {User.username}</h1>
            )}
          </div>
        </section>
        <section>
          <div className={style.DivTables}>
            {/* <h1>Usuarios</h1> */}
            <GetUsers />
            <GetRequests />
            <GetHotels />
            <GetBookings />
          </div>
        </section>
        <section className={style.ContainerEst}>
          <div className={style.DivEstadisticas}>
            <section>
              <h3>{translations[idioma].ValoraciondeHoteles}</h3>
              <EstadisticasLinealValoracionHoteles
                ValoracionHoteles={ValoracionHoteles}
              />
            </section>
            <section>
              <h3>{translations[idioma].Todaslasreservasypago}</h3>
              <EstadisticasLinealTodosLosBookings
                TodosLosBookings={TodosLosBookings}
              />
            </section>
            <section>
              <h3>{translations[idioma].Mesesmasreservados}</h3>
              <EstadisticasBarraMesMasReservado MesMasReservado={MesMasReservado} />
            </section>
            <section>
              <h3>{translations[idioma].Hotelesmasreservados}</h3>
              <EstadisticasBarraHotelMasReservado
                HotelMasReservado={HotelMasReservado}
              />
            </section>
            <section>
              <h3>{translations[idioma].Cantidaddereservasporusuario}</h3>
              <EstadisticasLinealUsuarioQueMasReservo
                UsuarioQueMasReservo={UsuarioQueMasReservo}
              />
            </section>
            <section>
              <h3>{translations[idioma].ProvinciasMasReservada}</h3>
              <EstadisticasLinealProvinciasMasReservada
                ProvinciasMasReservada={ProvinciasMasReservada}
              />
            </section>
          </div>
        </section>
      </div>
      <section className={style.Footer}>
        <Footer />
      </section>
    </>
  );
};

export default PerfilSuperAdmin;
