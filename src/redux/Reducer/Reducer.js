//?---------------------------- IMPORTS --------------------------------
import GuardarMonedaLocalStorage from "../../components/LocalStorage/moneda/GuardarMonedaLocalStorage";
import {
  GET_ALL_HOTELS,
  POST_FILTERS,
  TYPE_ROOM,
  SEARCH_HOTELS,
  ALL_FAVORITES_HOTELS,
  DETAIL_HOTEL,
  DETAIL_CLEAR_HOTEL,
  USER,
  GET_TROLLEY,
  DELETE_TROLLEY,
  DELETE_ALL_TROLLEY,
  USER_LOGOUT,
  GET_ALL_PROVINCES,
  GET_LOCALITY,
  GET_DEPARTMENT,
  SERVICES,
  ALL_PARTNER_HOTELS,
  NEW_REVIEW,
  GET_BOOKYNG,
  GET_USERS,
  CHANGE_ROL,
  PUT_AMOUNT_TROLLEY,
  UP_DATE_TROLLEY,
  ID_HOTEL_FORM,
  SET_CURRENCY_SYMBOL,
  GET_CURRENCY_RATE,
  SET_THEME,
  VALORACION_HOTELES,
  HOTELES_MAS_RESERVADOS,
  USER_QUE_MAS_RESERVO,
  PROVINCIAS_MAS_RESERVADAS,
  MES_MAS_RESERVADO,
  TODOS_LOS_BOOKINGS,
  HOTELES_MAS_RESERVADOS_PARTNER,
  MES_MAS_RESERVA_PARTNER,
  MODIFICAR_HOTEL_PARTNER,
  UPDATE_LANGUAGE,
  GET_REQUESTS,
  GET_HOTELS_ADMIN,
  GET_ALL_BOOKINGS
} from "../Actions";

//?----------------- REDUCER ------------------------------------
const InicialState = {
  Trolley: [],
  ObjetoTrolley: {},
  Hotels: {},
  User: { email: "", id: 0, rol: 0, username: "" },
  HotelsCopi: [],
  DetailHotel: {},
  FavHotels: [],
  idUser: {},
  TypeRoom: [],
  Provinces: [],
  Department: [],
  Locality: [],
  Services: [],
  PartnerHotels: [],
  Booking: [],
  Users: [],
  idioma: "en",
  Requests: [],
  HotelsAdmin: [],
  BookingsAdmin: [],
  Filters: {
    provinces: "",
    department: "",
    locality: "",
    services: [],
    rating: "",
    order: "",
    page: 1,
    name: "",
    checkIn: "",
    checkOut: "",
  },
  Reviews: 0,
  idHotelForm: "",
  currencyExchange: { symbol: "ARS" },
  theme: "light",
  Estadisticas: {
    HotelMasReservado: [],
    MesMasReservado: [],
    ProvinciasMasReservada: [],
    TodosLosBookings: [],
    UsuarioQueMasReservo: [],
    ValoracionHoteles: [],
  },
  EstadisticasPartner: {
    HotelesMasReservadosPartner: [],
    MesDondeMasSeReservoPartner: [],
  },
};

export const rootReducer = (state = InicialState, actions) => {
  switch (actions.type) {
    case GET_ALL_HOTELS:
      return {
        ...state,
        Hotels: actions.payload,
        HotelsCopi: actions.payload,
      };
    case POST_FILTERS:
      return {
        ...state,
        Filters: actions.payload,
      };
    case TYPE_ROOM:
      return {
        ...state,
        TypeRoom: actions.payload,
      };
    case SEARCH_HOTELS:
      return {
        ...state,
        Hotels: actions.payload,
      };

    case ALL_FAVORITES_HOTELS:
      return {
        ...state,
        FavHotels: actions.payload,
      };

    case DETAIL_HOTEL:
      return {
        ...state,
        DetailHotel: actions.payload,
      };
    case DETAIL_CLEAR_HOTEL:
      return {
        ...state,
        DetailHotel: {},
      };
    case NEW_REVIEW:
      return {
        ...state,
        Reviews: +1,
      };
    case USER:
      return {
        ...state,
        User: actions.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        User: { email: "", id: 0, rol: 0, username: "" },
      };
    case GET_TROLLEY:
      return {
        ...state,
        Trolley: actions.payload,
      };
    case DELETE_TROLLEY:
      return {
        ...state,
        Trolley: state.Trolley.filter((tro) => tro.id !== actions.payload),
      };
    case DELETE_ALL_TROLLEY:
      return {
        ...state,
        Trolley: actions.payload,
      };
    case PUT_AMOUNT_TROLLEY:
      return {
        ...state,
        ObjetoTrolley: actions.payload,
      };

    case GET_ALL_PROVINCES:
      return {
        ...state,
        Provinces: actions.payload,
      };
    case GET_DEPARTMENT:
      return {
        ...state,
        Department: actions.payload,
      };
    case GET_LOCALITY:
      return {
        ...state,
        Locality: actions.payload,
      };
    case SERVICES:
      return {
        ...state,
        Services: actions.payload,
      };
    case ALL_PARTNER_HOTELS:
      return {
        ...state,
        PartnerHotels: actions.payload,
      };
    case GET_BOOKYNG:
      return {
        ...state,
        Booking: actions.payload,
      };
    case GET_USERS:
      return {
        ...state,
        Users: actions.payload,
      };
    case CHANGE_ROL:
      return {
        ...state,
      };
    case UP_DATE_TROLLEY:
      return {
        ...state,
        Trolley: actions.payload,
      };
    case ID_HOTEL_FORM:
      return {
        ...state,
        idHotelForm: actions.payload,
      };
    case UPDATE_LANGUAGE:
      return {
        ...state,
        idioma: actions.payload.language,
      };
    case GET_CURRENCY_RATE:
      return {
        ...state,
        currencyExchange: {
          ...state.currencyExchange,
          rate: actions.payload,
        },
      };
    case SET_CURRENCY_SYMBOL:
      GuardarMonedaLocalStorage({
        ...state.currencyExchange,
        symbol: actions.payload,
      }
      );
      return {
        ...state,
        currencyExchange: {
          ...state.currencyExchange,
          symbol: actions.payload,
        },
      };
    case SET_THEME:
      return {
        ...state,
        theme: actions.payload,
      };

    //*------------------------Estadisticas----------------------------*//

    case VALORACION_HOTELES:
      return {
        ...state,
        Estadisticas: {
          ...state.Estadisticas,
          ValoracionHoteles: actions.payload,
        },
      };

    case HOTELES_MAS_RESERVADOS:
      return {
        ...state,
        Estadisticas: {
          ...state.Estadisticas,
          HotelMasReservado: actions.payload,
        },
      };

    case USER_QUE_MAS_RESERVO:
      return {
        ...state,
        Estadisticas: {
          ...state,
          ...state.Estadisticas,
          UsuarioQueMasReservo: actions.payload,
        },
      };

    case PROVINCIAS_MAS_RESERVADAS:
      return {
        ...state,
        Estadisticas: {
          ...state,
          ...state.Estadisticas,
          ProvinciasMasReservada: actions.payload,
        },
      };

    case MES_MAS_RESERVADO:
      return {
        ...state,
        Estadisticas: {
          ...state,
          ...state.Estadisticas,
          MesMasReservado: actions.payload,
        },
      };

    case TODOS_LOS_BOOKINGS:
      return {
        ...state,
        Estadisticas: {
          ...state,
          ...state.Estadisticas,
          TodosLosBookings: actions.payload,
        },
      };

    case HOTELES_MAS_RESERVADOS_PARTNER:
      return {
        ...state,
        EstadisticasPartner: {
          ...state.EstadisticasPartner,
          HotelesMasReservadosPartner: actions.payload,
        },
      };

    case MES_MAS_RESERVA_PARTNER:
      return {
        ...state,
        EstadisticasPartner: {
          ...state.EstadisticasPartner,
          MesDondeMasSeReservoPartner: actions.payload,
        },
      };

    case GET_REQUESTS:
      return {
        ...state,
        Requests: actions.payload
      };

    case GET_HOTELS_ADMIN:
      return {
        ...state,
        HotelsAdmin: actions.payload
      }
    case GET_ALL_BOOKINGS:
      return {
        ...state,
        BookingsAdmin: actions.payload
      }
    default:
      return { ...state };
  }
};

/*
  EstadisticasPartner: {
    HotelesMasReservadosPartner: [],
    MesDondeMasSeReservoPartner: [],
  },



-----------------
  HOTELES_MAS_RESERVADOS_PARTNER,
  MES_MAS_RESERVA_PARTNER,
  MODIFICAR_HOTEL_PARTNER,

*/
