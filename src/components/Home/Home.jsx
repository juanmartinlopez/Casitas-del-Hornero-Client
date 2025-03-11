//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import AuthProvider from "../GoogleAuth/AuthProvider";
//css
import styleLight from "./Home.module.css";
import styleDark from "./HomeDark.module.css";

//actions
import {
  FuncionSelectFilter,
  FuncionAllFavoritesHotel,
  GetTrolley,
  getCurrencyRateAPI,
} from "../../redux/Actions/Actions";
//components
import {
  Filter,
  NavBar,
  Footer,
  Clima,
  Carrusel,
  Cards,
  Loading,
  Paginado,
  PedirLocalStorage,
  PedirCheckInCheckOut,
  GuardarCheckInCheckOut,
  PedirMonedaLocalStorage,
} from "../Index";
import { useNavigate } from "react-router-dom";
import SwitchButton from "../SwitchButton/SwitchButton";
import cargarDivisas from "./cargarDivisas";

//?----------------- COMPONENTE HOME ------------------------------------
const Home = ({ countCarrito, setCountCarrito }) => {
  const dispatch = useDispatch();
  const Hotels = useSelector((state) => state.Hotels);
  const { Filters } = useSelector((state) => state);
  const HotelsCopi = useSelector((state) => state.HotelsCopi);
  let User = PedirLocalStorage();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const navigate = useNavigate();
  const Trolleys = useSelector((state) => state.Trolley);
  const currencyExchange = useSelector((state) => state.currencyExchange);
  const estado = useSelector((state) => state);
  const theme = useSelector((state) => state.theme);
  const style = theme === "light" ? styleLight : styleDark;

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
    <>
      <NavBar countCarrito={countCarrito} />
      {Hotels.allHotels?.length ? (
        <>
          <div className={style.home_container}>
            <Carrusel HotelsCarrusel={Hotels?.allHotels} />
            <section className={`${style.section} ${style.one}`}>
              <div className={style.filtroContainer}>
                <Filter />
              </div>
              <div className={style.divCard}>
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
                  }) => (
                    status ? (
                      <Cards
                        key={id}
                        id={id}
                        name={name}
                        image={image}
                        province={province}
                        department={department}
                        rating={rating}
                        description={description}
                        valoration={valoration}
                      />
                    ) : (<></>)
                  )
                )}
              </div>
              <div className={style.climaContainer}>
                <Clima />
              </div>
            </section>
          </div>
          <Paginado paginas={Hotels.numPages} />
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
      {/* <section className={`${style.section} ${style.two}`}></section> */}
      <Footer />
    </>
  );
};

export default Home;
