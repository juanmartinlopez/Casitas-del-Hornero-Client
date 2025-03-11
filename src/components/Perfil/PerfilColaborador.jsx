import { useEffect, useState } from "react";
import { NavBar, Footer, PedirLocalStorage, ReviewPartner } from "../Index";
import PartnerHotels from "../PartnerHotels/PartnerHotels";
import { useDispatch, useSelector } from "react-redux";
import {
  FuncionAllPartnerHotel,
  FuncionMesDondeMasSeReservaPartnerEstadistica,
  FuncionHotelesMasReservadosPartnerEstadistica,
} from "../../redux/Actions/Actions";
import {
  EstadisticasLinealPartner,
  EstadisticasBarraPartner,
} from "../../Estadisticas/EstadisticaProveedor";
import { NavLink } from "react-router-dom";

import styleLight from "./PerfilColaborador.module.css"
import styleDark from"./PerfilColaboradorDark.module.css"

const PerfilColaborador = () => {
  let User = PedirLocalStorage();
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.PartnerHotels);
  const { HotelesMasReservadosPartner, MesDondeMasSeReservoPartner } =
    useSelector((state) => state.EstadisticasPartner);
  const [isLoading, setIsLoading] = useState(true);
  const idioma = useSelector((state) => state.idioma);

  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;


  const translations = {
    en: {
      TusHoteles: "Your Hotels",
      AgregarHotel: "Add Hotel",
      Reviews: "Reviews",
    },
    es: {
      TusHoteles: "Tus Hoteles",
      AgregarHotel: "Agregar Hotel",
      Reviews: "Reseñas",
    },
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(FuncionAllPartnerHotel(User.id));
      dispatch(FuncionMesDondeMasSeReservaPartnerEstadistica(User.id));
      dispatch(FuncionHotelesMasReservadosPartnerEstadistica(User.id));
      setIsLoading(false);
    }
  }, []);

  let date = new Date()
  const horas = date.getHours()



  return (
    <>
      <NavBar />
      <div className={style.perfilColaboradorContainer}>
        <div className={style.saludo}>

          {horas <= 12 && horas > 5 && (
            <h1>Buenos días {User.username}</h1>
          )}
          {horas > 12 && horas < 19 && (
            <h1>Buenas tardes {User.username}</h1>
          )}
          {(horas >= 19 || horas <= 5) && (
            <h1>Buenas noches {User.username}</h1>
          )}
        </div>




        <div className={style.divConteinerHotels}>
          <div>
            <h1>{translations[idioma].TusHoteles}</h1>
            <div className={style.LinkFormHotel}>
              <NavLink to="/FormHotel" className={style.Link}>
                <h4>Agregar Hotel</h4>
              </NavLink>
            </div>
          </div>
          <div className={style.divHotels}>
            <br />
            <PartnerHotels hotels={hotels} />
          </div>
        </div>




        <div className={style.divConteinerReviews}>
          <h1>{translations[idioma].Reviews}</h1>
          <ReviewPartner hotels={hotels} />
        </div>



        <div className={style.divConteinerStats}>
          <h1>Stats</h1>
          <div className={style.divConteinerStatsView}>
            <EstadisticasLinealPartner
              MesDondeMasSeReservoPartner={MesDondeMasSeReservoPartner}
            />
            <EstadisticasBarraPartner
              HotelesMasReservadosPartner={HotelesMasReservadosPartner}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfilColaborador;
