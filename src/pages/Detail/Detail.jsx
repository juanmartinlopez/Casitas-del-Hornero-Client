//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
//components
import { Footer, Loading, NavBar } from "../../components/index";
import CarruselDetail from "./Carrucel/CarruselDetail";
import FuncionServices from "./FuncionService/FuncionServicios";
import Maps from "./Map/Map.jsx";
import Reviews from "./Review/Reviews";
import TypeRoom from "./TypeRoom/TypeRoom";
//actions
import {
  FuncionClearDetail,
  FuncionDetailHotel,
  GetTrolley,
  idHotelForm,
} from "../../redux/Actions/Actions";

import { faEnvelope, faPhone, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PedirLocalStorage } from "../../utils/LocalStorage/index";

//?----------------- COMPONENTE DETAIL ------------------------------------
const Detail = ({ setCountCarrito, countCarrito }) => {
  const { id } = useParams();
  const User = PedirLocalStorage();
  const dispatch = useDispatch();
  const DetailHotel = useSelector((state) => state.DetailHotel);
  const Trolleys = useSelector((state) => state.Trolley);

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

  let array = Array(DetailHotel.rating).fill(DetailHotel.rating);

  return (
    <div className="min-h-screen bg-primary-color">
      <NavBar countCarrito={countCarrito} />
      {DetailHotel.name ? (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ---CONTENEDOR INFO HOTEL E IMAGE -------*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
              {/* Información del Hotel */}
              <div className="mt-5 bg-secondary-color rounded-2xl p-8 shadow-dark">
                <h1 className="text-4xl font-bold text-text-color mb-6 font-serif">
                  {DetailHotel.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex text-important-color mr-3">
                    {array.map((ranting, index) => (
                      <FontAwesomeIcon
                        icon={faStar}
                        key={index}
                        className="text-lg mr-1"
                      />
                    ))}
                  </div>
                  <span className="text-secundary-text-color text-sm">
                    ({DetailHotel.rating}/5)
                  </span>
                </div>

                {/* Información de Contacto */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-text-color">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-important-color mr-3 w-5"
                    />
                    <span className="text-base">{DetailHotel.phoneNumber}</span>
                  </div>
                  <div className="flex items-center text-text-color">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-important-color mr-3 w-5"
                    />
                    <span className="text-base">{DetailHotel.email}</span>
                  </div>
                  <div className="flex items-center text-text-color">
                    <svg
                      className="w-5 h-5 text-important-color mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base">
                      {DetailHotel.locality}, {DetailHotel.department},{" "}
                      {DetailHotel.province}
                    </span>
                  </div>
                </div>

                {/* Servicios pequeños */}
                <div className="mt-6">
                  <h3 className="text-base font-semibold text-important-color mb-2">
                    Servicios
                  </h3>
                  <div className="bg-primary-color/20 rounded-lg p-2">
                    <div className="scale-75 origin-top-left">
                      <FuncionServices Services={DetailHotel.Services} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrusel de Imágenes */}
              <div className="mt-5 rounded-2xl overflow-hidden shadow-dark">
                <CarruselDetail image={DetailHotel.image} />
              </div>
            </div>
            {/* ----CONTENEDOR DE TIPOS DE HABITACIONES---- */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-text-color mb-3 font-serif">
                  HABITACIONES
                </h2>
                <div className="w-20 h-0.5 bg-important-color mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TypeRoom
                  Trolleys={Trolleys}
                  name={DetailHotel.name}
                  setCountCarrito={setCountCarrito}
                  countCarrito={countCarrito}
                  id={id}
                />
              </div>

              {User?.rol === 2 && (
                <div className="text-center mt-8">
                  <NavLink
                    to="/FormRoomType"
                    className="inline-flex items-center px-6 py-3 bg-important-color text-primary-color rounded-xl font-semibold hover:bg-elegant-gold-light transition-all duration-300 transform hover:scale-105 shadow-elegant"
                  >
                    <span onClick={setHotel}>+ Agregar tipo de habitación</span>
                  </NavLink>
                </div>
              )}
            </section>
            {/* ----CONTENEDOR DESCRIPCION Y PUNTUACION------ */}
            <section className="py-12 bg-secondary-color/50 rounded-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-text-color mb-3 font-serif">
                  DESCRIPCIÓN
                </h2>
                <div className="w-20 h-0.5 bg-important-color mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Descripción */}
                <div className="bg-secondary-color rounded-xl p-6 shadow-soft">
                  <h3 className="text-xl font-semibold text-important-color mb-3 flex items-center">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Acerca del hotel
                  </h3>
                  <p className="text-secundary-text-color leading-relaxed">
                    {DetailHotel.description}
                  </p>
                </div>

                {/* Puntuación */}
                <div className="bg-secondary-color rounded-xl p-6 shadow-soft">
                  <h3 className="text-xl font-semibold text-important-color mb-3 flex items-center">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Puntuación de las reviews
                  </h3>
                  <p className="text-text-color text-lg font-semibold">
                    {DetailHotel.valoration}/10
                  </p>
                </div>
              </div>

              {/* Ubicación centrada */}
              <div className="flex justify-center">
                <div className="bg-secondary-color rounded-xl p-6 shadow-soft w-full max-w-2xl">
                  <h3 className="text-xl font-semibold text-important-color mb-4 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ubicación
                  </h3>
                  <div className="rounded-lg overflow-hidden shadow-soft">
                    {DetailHotel.location && DetailHotel.name && (
                      <Maps
                        location={DetailHotel.location}
                        name={DetailHotel.name}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="py-12">
              <Reviews />
            </section>
          </div>
        </>
      ) : (
        <div className="mt-5 min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Detail;
