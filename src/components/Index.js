// ACA VAN LAS IMPORTACIONES DE LOS COMPONENTES PARA TENER MAS ORDENADO..
import Cards from "./Card/Card";
import Carrusel from "./Carrusel/Carrusel";
import CarruselDetail from "./CarruselDetail/CarruselDetail";
import Detail from "./Detail/Detail";
import Favoritos from "./Favorites/Favorites";
import Home from "./Home/Home";
import Loading from "./Loading/Loading";
import Footer from "./Footer/Footer";
import Search from "./Search/Search";
import FormularioIngresa from "./Formularios/FormularioIngresa/FormularioIngresa";
import Landing from "./Landing/Landing";
import Maps from "./Map/Map";
import FuncionServices from "./Detail/FuncionServicios";
import TypeRoom from "./TypeRoom/TypeRoom";
import NavBar from "./Nav/Nav";
import Filter from "./Filters/Filters";
import Clima from "./Clima/Clima";
import Paginado from "./Paginado/Paginado";
import { LogOut } from "./GoogleAuth/LogOut";
import Trolley from "./Trolley/Trolley";
import TrolleyCard from "./TrolleyCard/TrolleyCard";
import GetRequests from "./GetRequests/GetRequests";
import GetHotels from "./GetHotels/GetHotels"
import GetBookings from "./GetBookings/GetBookings"
//*------------------LoclaStorage-----------------------------------*//
import GuardarLocalStorage from "./LocalStorage/GuardarLocalStorage";
import PedirLocalStorage from "./LocalStorage/PedirLocalStorage";
import GuardarDatosParaCambiarPassword from "./LocalStorage/PutPasswordLocalStorage/GuardarDatosParaCambiarPassword";
import PedirEmailLocalStorage from "./LocalStorage/PutPasswordLocalStorage/PedirEmailLocalStorage";
import GuardarCheckInCheckOut from './LocalStorage/Check/GuardarCheckInCheckOut';
import PedirCheckInCheckOut from './LocalStorage/Check/PedirCheckInCheckOut';
import CleanCheckinCheckout from './LocalStorage/Check/CleanCheckinCheckout';
import GuardarMonedaLocalStorage from './LocalStorage/moneda/GuardarMonedaLocalStorage'
import PedirMonedaLocalStorage from './LocalStorage/moneda/PedirMonedaLocalStorage'


//*----------------------------------------------------------------*//
import FormLocal from "./Formularios/FormularioRegistrar/FormLocal";
import FormGoogle from "./Formularios/FormularioRegistrar/FormGoogle";
import PerfilColaborador from "./Perfil/PerfilColaborador";
import PerfilSuperAdmin from "./Perfil/PerfilSuperAdmin";
import PerfilUsuario from "./Perfil/PerfilUsuario";
import Perfil from "./Perfil/Perfil";
import ClearLocalStorage from "./LocalStorage/CleanLocalStorage";
import ReviewPartner from "./ReviewPartner/ReviewPartner";
import Booking from "./Booking/Booking";
import GetUsers from "./GetUsers/GetUser";
import BotonAuthGoogle from "./GoogleAuth/BotonAuthGoogle";
import FormularioHotel from "./Formularios/FormularioHotel/FormularioHotel";
import FormularioTipoHab from "./Formularios/FormularioTipoHabitacion/FormularioTipoHabitacion";
import Error404 from "./Error404/Error";
import OlvidasteLaPassword from "./OlvidasteLaPassword/OlvidasteLaPassword";
import RestablecerContraseña from "./OlvidasteLaPassword/RestablecerContraseña";

export {
  GuardarMonedaLocalStorage,
  PedirMonedaLocalStorage,
  TrolleyCard,
  GuardarCheckInCheckOut,
  PedirCheckInCheckOut,
  CleanCheckinCheckout,
  OlvidasteLaPassword,
  RestablecerContraseña,
  Error404,
  FormularioHotel,
  FormularioTipoHab,
  BotonAuthGoogle,
  GetUsers,
  Booking,
  ReviewPartner,
  ClearLocalStorage,
  PerfilColaborador,
  PerfilSuperAdmin,
  PerfilUsuario,
  FormGoogle,
  FormLocal,
  Filter,
  Clima,
  Paginado,
  NavBar,
  TypeRoom,
  FuncionServices,
  Maps,
  Cards,
  Carrusel,
  CarruselDetail,
  Home,
  Detail,
  Footer,
  Loading,
  Search,
  Favoritos,
  FormularioIngresa,
  Landing,
  LogOut,
  Trolley,
  Perfil,
  GuardarLocalStorage,
  PedirLocalStorage,
  GuardarDatosParaCambiarPassword,
  PedirEmailLocalStorage,
  GetRequests,
  GetHotels,
  GetBookings
};
