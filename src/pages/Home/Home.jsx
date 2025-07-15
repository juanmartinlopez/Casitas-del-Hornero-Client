//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//actions
import {
  FuncionSelectFilter,
  GetTrolley,
  getCurrencyRateAPI,
} from "../../redux/Actions/Actions";
//components
import { Card, Footer, Loading, NavBar } from "../../components";
import AuthProvider from "../../services/AuthProvider.jsx";
import CarouselHome from "./Carousel/Carousel.jsx";
import Filter from "./Filter/Filter.jsx";
import Paginado from "./Pagination/Pagination.jsx";

import {
  GuardarCheckInCheckOut,
  PedirCheckInCheckOut,
  PedirLocalStorage,
  PedirMonedaLocalStorage,
} from "../../utils/LocalStorage";

import cargarDivisas from "../../utils/Divices.js";

//?----------------- COMPONENTE HOME ------------------------------------
const Home = ({ countCarrito, setCountCarrito }) => {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);
  const { Filters } = useSelector((state) => state);
  let User = PedirLocalStorage();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const navigate = useNavigate();
  const Trolleys = useSelector((state) => state.Trolley);
  const currencyExchange = useSelector((state) => state.currencyExchange);

  if (!PedirCheckInCheckOut()) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkIn = today;
    const checkOut = tomorrow;
    GuardarCheckInCheckOut({
      CheckIn: checkIn,
      CheckOut: checkOut,
    });
  }

  if (!PedirMonedaLocalStorage()) cargarDivisas();

  setCountCarrito((countCarrito = Trolleys.length));

  const handleUserLoggedIn = (user) => {
    setCurrentUser(user);
    setState(2);
  };

  const handleUserNotRegistered = (user) => {
    navigate("/Registrar");
  };

  const handleUserNotLoggedIn = () => {
    navigate("/Registrar");
  };

  useEffect(() => {
    if (User) dispatch(GetTrolley(User.id, undefined, undefined));
    if (!currencyExchange.rate) dispatch(getCurrencyRateAPI());
    if (!Hotels.allHotels?.length) {
      dispatch(FuncionSelectFilter(Filters));
    }
  }, []);

  if (state === 0 && User?.id === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      ></AuthProvider>
    );
  }
  return (
    <div className="min-h-screen bg-primary-color">
      <NavBar countCarrito={countCarrito} />

      {Hotels.allHotels?.length ? (
        <>
          {/* Hero Section with Carousel */}
          <section className="relative">
            <CarouselHome HotelsCarrusel={Hotels?.allHotels} />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black/20 via-transparent to-deep-black/40 pointer-events-none"></div>
          </section>

          {/* Filter Section - Floating and Compact */}
          <section className="relative -mt-8 z-10 mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Filter />
            </div>
          </section>

          {/* Main Content */}
          <main className="bg-primary-color">
            {/* Hotels Grid Section */}
            <section className="py-8 bg-primary-color">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text-color mb-3">
                    Nuestras Casitas Disponibles
                  </h2>
                  <p className="text-base text-secundary-text-color max-w-2xl mx-auto">
                    Descubre la comodidad y elegancia en cada una de nuestras
                    propiedades cuidadosamente seleccionadas
                  </p>
                  <div className="w-20 h-0.5 bg-important-color mx-auto mt-4"></div>
                </div>

                {/* Hotels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {Hotels.allHotels?.map(
                    ({
                      id,
                      name,
                      image,
                      province,
                      department,
                      rating,
                      description,
                      valoration,
                      status,
                    }) =>
                      status ? (
                        <div
                          key={id}
                          className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-important-color/20"
                        >
                          <Card
                            id={id}
                            name={name}
                            image={image}
                            province={province}
                            department={department}
                            rating={rating}
                            description={description}
                            valoration={valoration}
                          />
                        </div>
                      ) : null
                  )}
                </div>

                {/* Empty State */}
                {Hotels.allHotels?.filter((hotel) => hotel.status).length ===
                  0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl text-secundary-text-color mb-4">
                      🏨
                    </div>
                    <h3 className="text-2xl font-semibold text-text-color mb-2">
                      No hay casitas disponibles
                    </h3>
                    <p className="text-secundary-text-color">
                      Intenta ajustar tus filtros de búsqueda
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Pagination Section */}
            <section className="bg-secondary-color/20 border-t border-important-color/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Paginado paginas={Hotels.numPages} />
              </div>
            </section>
          </main>
        </>
      ) : (
        /* Loading State */
        <div className="min-h-screen bg-primary-color flex items-center justify-center">
          <div className="text-center">
            <Loading />
            <p className="text-secundary-text-color mt-4 text-lg">
              Cargando nuestras mejores casitas para ti...
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
