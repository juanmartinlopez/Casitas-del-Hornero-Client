//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
//components
import {
  CarruselDetail,
  FuncionServices,
  Maps,
  NavBar,
  TypeRoom,
  Footer,
  Error404,
  Loading,
} from "../Index";
//actions
import {
  FuncionDetailHotel,
  FuncionClearDetail,
  GetTrolley,
  idHotelForm,
} from "../../redux/Actions/Actions";
//image
import imagen from "../../assets/icons/favorito.png";
import imagenCorreo from "../../assets/icons/correo-electronico-vacio.png";
import imagenTelefono from "../../assets/icons/llamada-telefonica.png";
import { PedirLocalStorage } from "../Index";
//css
import Reviews from "../Reviews/Reviews";
import styleLight from "./Detail.module.css";
import styleDark from "./DetailDark.module.css";

//?----------------- COMPONENTE DETAIL ------------------------------------
const Detail = ({ setCountCarrito, countCarrito }) => {
  const { id } = useParams();
  const User = PedirLocalStorage();
  const dispatch = useDispatch();
  const DetailHotel = useSelector((state) => state.DetailHotel);
  const Trolleys = useSelector((state) => state.Trolley);
  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;

  useEffect(() => {
    dispatch(FuncionDetailHotel(id));
    if (User?.id) {
      dispatch(GetTrolley(User.id, undefined, undefined));
    }
    return () => {
      dispatch(FuncionClearDetail());
    };
  }, [id]);

  setCountCarrito((countCarrito = Trolleys.length));

  const setHotel = async () => {
    await dispatch(idHotelForm(id));
  };
  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      Rating: "Rating :",
      Province: "Province",
      ServiciosDelAlojamiento: "Accommodation Services",
      Descripción: "Description",
      AgregarRoomType: "Add Room Type",
      notDescription: "No description available",
    },
    es: {
      Rating: "Valoracion Del Hotel :",
      Province: "Provincia",
      ServiciosDelAlojamiento: "Servicios del alojamiento",
      Descripción: "Descripción",
      AgregarRoomType: "Agregar tipo de habitacion",
      notDescription: "No hay descripción disponible",
    },
  };

  let array = Array(DetailHotel.rating).fill(DetailHotel.rating); // fill agrega al array un elemento x. Array() da la longitud que quiero de un determinado array.

  return (
    <>
      <NavBar countCarrito={countCarrito} />
      {DetailHotel.name ? (
        <>
          <div className={style.detailContainer}>
            {/* ---CONTENEDOR INFO HOTEL E IMAGE -------*/}
            <div className={style.div}>
              <div className={style.divDescription}>
                <h1>{DetailHotel.name}</h1>
                <div className={style.infoContainerEstrellas}>
                  {array.map((ranting, index) => (
                    <img className={style.img} src={imagen} key={index} />
                  ))}
                </div>
                <div className={style.infoContainer}>
                  <img className={style.img} src={imagenTelefono} />
                  <span>{DetailHotel.phoneNumber}</span>
                </div>
                <div className={style.infoContainer}>
                  <img className={style.img} src={imagenCorreo} />
                  <span>{DetailHotel.email}</span>
                </div>
                <div className={style.namesPlaces}>
                  <span>{DetailHotel.locality}, </span>
                  <span>{DetailHotel.department}, </span>
                  <span>{DetailHotel.province}</span>
                </div>
              </div>
              <div className={style.divCarrusel}>
                <CarruselDetail image={DetailHotel.image} />
              </div>
            </div>
            {/* ----CONTENEDOR DE TIPOS DE HABITACIONES---- */}
            <section className={style.sectionTypeRoom}>
              <h2>HABITACIONES</h2>
              <div className={style.roomContainer}>
                {" "}
                <TypeRoom
                  Trolleys={Trolleys}
                  name={DetailHotel.name}
                  setCountCarrito={setCountCarrito}
                  countCarrito={countCarrito}
                  id={id}
                />
              </div>

              {User?.rol === 2 ? (
                <NavLink
                  to="/FormRoomType"
                  style={{ "text-decoration": "none" }}
                >
                  <div className={style.divButonAddRoom}>
                    <p onClick={setHotel} className={style.butonAddRoom}>
                      {translations[idioma].AgregarRoomType}
                    </p>
                  </div>
                </NavLink>
              ) : (
                ""
              )}
            </section>
            {/* ----CONTENEDOR -VALORACION, DESCRIPCION,SERVICIOS UBICACION------ */}
            <section className={style.sectionDescription}>
              <h2>INFORMACIÓN </h2>
              <section>
                <div className={style.sectionDescription_left}>
                  <div className={style.reviewContainer}>
                    <h3>Puntuación de la review</h3>
                    <p className={style.valoration}>{DetailHotel.valoration}</p>
                  </div>
                  <div className={style.descriptionHotelCont}>
                    <h3>{translations[idioma].Descripción}</h3>
                    {DetailHotel.description ? (
                      <p>{DetailHotel.description}</p>
                    ) : (
                      <p>{translations[idioma].notDescription}</p>
                    )}
                  </div>
                </div>
                <div className={style.sectionDescription_right}>
                  <div className={style.servicesContainer}>
                    <FuncionServices Services={DetailHotel.Services} />
                  </div>
                  <div className={style.mapContainer}>
                    <h3>Ubicación</h3>
                    <section>
                      {DetailHotel.location && DetailHotel.name && (
                        <Maps
                          location={DetailHotel.location}
                          name={DetailHotel.name}
                        />
                      )}
                    </section>
                  </div>
                </div>
              </section>
            </section>
            <div className={style.sectionReviews}>
              <Reviews />
            </div>
          </div>
        </>
      ) : (
        <div className={style.DivContainerLoading}>
          <div className={style.DivContainerLoadingHijo}>
            <div className={style.LoadingDiv}>
              <Loading />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Detail;
