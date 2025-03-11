import {
  NavBar,
  Footer,
  Favoritos,
  PedirLocalStorage,
  Booking,
} from "../Index";
// import style from "./PerfilUsuario.module.css";
import { GetTrolley } from "../../redux/Actions/Actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import axios from "axios";

import styleLight from "./PerfilUsuario.module.css";
import styleDark from "./PerfilUsuarioDark.module.css";

const PerfilUsuario = ({ countCarrito, setCountCarrito }) => {
  const Trolleys = useSelector((state) => state.Trolley);
  const dispatch = useDispatch();
  let User = PedirLocalStorage();
  const idioma = useSelector((state) => state.idioma);
  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;

  const translations = {
    en: {
      Favoritos: "Favorites",
      Booking: "Booking",
      QuieroSerProveedor: "I want to be a supplier",
      Aceptar: "Accept",
      Cancelar: "Cancel",
      TituloProveedor: "Are you sure you want to be a supplier?",
      TextoProveedor: "Our suppliers are those users who publish their hotels",
      Usuario: "USER",
    },
    es: {
      Favoritos: "Favoritos",
      Booking: "Reservas",
      QuieroSerProveedor: "Quiero ser proveedor",
      Aceptar: "Aceptar",
      Cancelar: "Cancelar",
      TituloProveedor: "¿Estás seguro que deseas ser proveedor?",
      TextoProveedor:
        "Nuestros proveedores son aquellos usuarios que publican sus hoteles",
      Usuario: "USUARIO",
    },
  };

  setCountCarrito((countCarrito = Trolleys.length));

  useEffect(() => {
    dispatch(GetTrolley(User.id));
  }, []);

  const FuncionQuieroSerProveedor = (id_user) => {
    swal({
      title: translations[idioma].TituloProveedor,
      text: translations[idioma].TextoProveedor,
      content: "input",
      buttons: {
        cancel: translations[idioma].Cancelar,
        confirm: translations[idioma].Aceptar,
      },
    }).then((result) => {
      if (result.length) {
        // El usuario ha hecho clic en el botón de confirmación y ha ingresado un mensaje
        const mensaje = result;
        axios
          .post(
            `https://casitasdelhornero.onrender.com/request`,
            { message: mensaje, id_user }
          )
          .then((response) => {
            swal({
              text: response.data,
              icon: "success",
              buttons: translations[idioma].Aceptar,
            });
          })
          .catch((error) => {
            swal({
              text: error.response.data.error,
              icon: "warning",
              buttons: translations[idioma].Aceptar,
            });
          });
      }
    });
  };

  return (
    <>
      <NavBar countCarrito={countCarrito} />
      <div className={style.perfil_container}>
        <div className={style.card_profile}>
          <div className={style.card_profile_left}>
            <div className={style.card_info}>
              <h2> {translations[idioma].Usuario}</h2>
              <h2>{`${User.username}`}</h2>
              <h2>{`${User.email}`}</h2>
            </div>
          </div>
          <div className={style.card_profile_right}>
            <button
              className={style.QuieroProveedor}
              onClick={() => FuncionQuieroSerProveedor(User.id)}
            >
              {translations[idioma].QuieroSerProveedor}!
            </button>
          </div>
        </div>

        <div className={style.divFavorites}>
          <h2>{translations[idioma].Favoritos}</h2>
          <Favoritos />
        </div>

        <div className={style.divRewies}>
          <h2>{translations[idioma].Booking}</h2>
          <Booking />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfilUsuario;
