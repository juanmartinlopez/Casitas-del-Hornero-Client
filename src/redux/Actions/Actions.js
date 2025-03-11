//?---------------------------- IMPORTS --------------------------------
import {
  GET_ALL_HOTELS,
  GET_ALL_PROVINCES,
  GET_LOCALITY,
  GET_DEPARTMENT,
  POST_FILTERS,
  TYPE_ROOM,
  SEARCH_HOTELS,
  ALL_FAVORITES_HOTELS,
  DETAIL_HOTEL,
  DETAIL_CLEAR_HOTEL,
  USER,
  GET_TROLLEY,
  DELETE_ALL_TROLLEY,
  DELETE_TROLLEY,
  USER_LOGOUT,
  SERVICES,
  ALL_PARTNER_HOTELS,
  NEW_REVIEW,
  GET_BOOKYNG,
  GET_USERS,
  CHANGE_ROL,
  UP_DATE_TROLLEY,
  PUT_AMOUNT_TROLLEY,
  ID_HOTEL_FORM,
  GET_CURRENCY_RATE,
  SET_CURRENCY_SYMBOL,
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
import axios from "axios";
import swal from "sweetalert";

//?----------------- ACTIONS ------------------------------------

//* ----------------- GET ALL HOTELS ------------------------------------
const URL_BASE = "https://casitasdelhornero.onrender.com";
export const FuncionSelectFilter = (filters) => {
  let URL = `${URL_BASE}/hotels`;
  const {
    provinces,
    services,
    rating,
    order,
    page,
    department,
    locality,
    name,
    checkIn,
    checkOut,
  } = filters;

  URL = URL + `?page=${page}`;
  return async (dispatch) => {
    try {
      if (Number(rating) !== 0) {
        URL = URL + `&rating=${Number(rating)}`;
      }
      if (provinces.length) {
        URL = URL + `&province=${encodeURIComponent(provinces)}`;
      }
      if (department.length) {
        URL = URL + `&department=${encodeURIComponent(department)}`;
      }
      if (locality.length) {
        URL = URL + `&locality=${encodeURIComponent(locality)}`;
      }
      if (order.length) {
        URL = URL + `&order=${order}`;
      }
      if (name.length) {
        URL = URL + `&name=${name}`;
      }

      //*----------------------------------------Fechas:
      console.log("check:",checkIn, checkOut);
      if (checkIn.length) {
        URL = URL + `&checkIn=${checkIn}`;
      }
      if (checkOut.length) {
        URL = URL + `&checkOut=${checkOut}`;
      }

      //*------------------------------------------------------*//

      if (services.length) {
        services.map(
          (ser) => (URL = URL + `&services=${encodeURIComponent(ser)}`)
        );
      }
      const response = await axios.get(URL);
      console.log("respuesta url:",response.data);
      dispatch({ type: GET_ALL_HOTELS, payload: response.data });
    } catch (error) {
      console.log(error)
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- POST FILTERS ------------------------------------
export const PostFilters = (filters) => {
  return async (dispatch) => {
    dispatch({ type: POST_FILTERS, payload: filters });
  };
};

//* ----------------- TYPE ROOMS ------------------------------------
export const FuncionTypeRoomTypes = (idHotel, checkIn, checkOut) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/roomTypes/${idHotel}?checkIn=${checkIn}&checkOut=${checkOut}`
      );
      dispatch({ type: TYPE_ROOM, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- SEARCH ------------------------------------
export const FuncionSearch = (nameHotel, page) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/hotels?page=${page}&name=${nameHotel}`
      );
      dispatch({ type: SEARCH_HOTELS, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- ALL FAVORITES HOTELS ------------------------------------
export const FuncionAllFavoritesHotel = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/favorites/${idUser}`);
      dispatch({
        type: ALL_FAVORITES_HOTELS,
        payload: response.data,
      });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- POST FAVORITE HOTEL ------------------------------------
export const PostFavoriteHotel = (idUser, idHotel) => {
  return async () => {
    try {
      const response = await axios.post(
        `${URL_BASE}/favorites/${idUser}/${idHotel}`
      );
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- DETAIL HOTELS ------------------------------------
export const FuncionDetailHotel = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/hotels/${id}`);
      dispatch({ type: DETAIL_HOTEL, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*------------------------------TROLLEY------------------------------*//
// trolley es ===> carrito manga de giles!!😐

export const GetTrolley = (idUser, checkIn, checkOut) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/cart/${idUser}?checkIn=${checkIn}&checkOut=${checkOut}`
      );

      dispatch({ type: GET_TROLLEY, payload: response.data });
    } catch (error) {
      // swal({
      //   text: error.response.data.error,
      //   icon: "warning",
      //   buttons: "Aceptar",
      // });
    }
  };
};

//*-----------Delete del carrito (todo lo que hay en el carrito).

export const DeleteAllTrolley = (idUser) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_BASE}/cart/${idUser}`);

      dispatch({ type: DELETE_ALL_TROLLEY, payload: [] });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*-----------Delete del carrito (un solo carrito).
// cartRouter.delete("/:id_user/:id_roomtype", deleteCartHandler);

export const DeleteTrolley = (idUser, idTypeRoom) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_BASE}/cart/${idUser}/${idTypeRoom}`);

      dispatch({ type: DELETE_TROLLEY, payload: idTypeRoom });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

export const putAmountTrolley = (value, idUser, id_Roomtype) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${URL_BASE}/cart/${idUser}/${id_Roomtype}?putAmount=${value}`
      );
      dispatch({
        type: PUT_AMOUNT_TROLLEY,
        payload: { id: id_Roomtype, amount: response.data },
      });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*---------------------Post del Trolley.

export const UpdateTrolley = (ArrayNuevoTrolley) => {
  return { type: UP_DATE_TROLLEY, payload: ArrayNuevoTrolley };
};
//* ----------------- DETAIL HOTELS ------------------------------------
export const FuncionClearDetail = () => {
  return { type: DETAIL_CLEAR_HOTEL }; // cuando se desmonte el detail , el objeto se vacia.
};

//* ----------------- ID USER ------------------------------------

export const GetUser = (User) => {
  return {
    type: USER,
    payload: User,
  };
};

//* ----------------------- LOG OUT -----------------------------

export const LogOut = () => {
  return { type: USER_LOGOUT };
};

//* ----------------------- GET PROVINCES -----------------------------

export const getProvinces = () => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_BASE}/locations`);
    dispatch({ type: GET_ALL_PROVINCES, payload: response.data });
  };
};

//* ----------------------- GET DEPARTMENT -----------------------------

export const getDepartment = (id_province) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${URL_BASE}/locations?id_province=${id_province}`
    );
    dispatch({ type: GET_DEPARTMENT, payload: response.data });
  };
};

//* ----------------------- GET LOCALITY -----------------------------

export const getLocality = (id_departament) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${URL_BASE}/locations?id_department=${id_departament}`
    );
    dispatch({ type: GET_LOCALITY, payload: response.data });
  };
};

//* ----------------------- GET SERVICES -----------------------------

export const getServices = () => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_BASE}/services`);
    dispatch({ type: SERVICES, payload: response.data });
  };
};

//* ----------------- ALL PARTNER HOTELS ------------------------------------
export const FuncionAllPartnerHotel = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/hotels?id_user=${idUser}`);
      dispatch({ type: ALL_PARTNER_HOTELS, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//* ----------------- ALL NEW REVIEW ------------------------------------
export const NewReview = () => {
  return (dispatch) => {
    dispatch({ type: NEW_REVIEW });
  };
};

//* ----------------- GET BOOKYNG ------------------------------------
export const getBooking = (id, rol) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${URL_BASE}/booking?id_user=${id}&rol=${rol}`
    );
    dispatch({ type: GET_BOOKYNG, payload: response.data });
  };
};

//* ----------------- GET USERS ------------------------------------
export const getUsers = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`${URL_BASE}/user/${id}`);
    dispatch({ type: GET_USERS, payload: response.data });
  };
};

//* ----------------- CHANGE ROL ------------------------------------
export const changeRol = (data) => {
  return async function (dispatch) {
    const response = await axios.put(`${URL_BASE}/user`, data);
    dispatch({ type: CHANGE_ROL, payload: response.data });
  };
};

//* ----------------- ID HOTEL FORM ------------------------------------
export const idHotelForm = (id) => {
  return async function (dispatch) {
    dispatch({ type: ID_HOTEL_FORM, payload: id });
  };
};

export const updateLanguage = (language) => ({
  type: "UPDATE_LANGUAGE",
  payload: {
    language,
  },
});
//* ----------------- GET CURRENCY RATE API----------------------------------
export const getCurrencyRateAPI = () => {
  try {
    return async function (dispatch) {
      const response = await axios.get(
        `https://openexchangerates.org/api/latest.json?app_id=d7185c1a1d0d4580a879e291d173af8a`
      );
      dispatch({
        type: GET_CURRENCY_RATE,
        payload: response.data.rates,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    swal({
      text: error.response.data.error,
      icon: "warning",
      buttons: "Aceptar",
    });
  }
};

// //* ----------------- SET CURRENCY SYMBOL----------------------------------
export const setCurrencySymbol = (currencySymbol) => {
  return async function (dispatch) {
    dispatch({ type: SET_CURRENCY_SYMBOL, payload: currencySymbol });
  };
};
//-------------- SET THEME ---------------

export const changeTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};

//*---------------------------ACTIONS ESTADISTICAS--------------------------//

export const FuncionValoracionHotelEstadistica = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/hotels/stats/${idUser}/rated`
      );

      dispatch({ type: VALORACION_HOTELES, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*--------------------------------------Hoteles mas reservados------------------------------------*//

export const FuncionHotelesMasReservadosEstadistica = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/hotels/stats/${idUser}/booking`
      );

      dispatch({ type: HOTELES_MAS_RESERVADOS, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};
//*-----------------------------------------Usuarios que mas reservaron---------------------------------------------------*//

export const FuncionUsuariosQueMasReservaronEstadistica = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/booking/mostBookingUser/${idUser}`
      );

      dispatch({ type: USER_QUE_MAS_RESERVO, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*----------Provincias en donde mas se reservaron----------------*//
export const FuncionProvinciasMasReservaronEstadistica = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/booking/province/${idUser}`
      );

      dispatch({ type: PROVINCIAS_MAS_RESERVADAS, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*---------------------------Mes donde mas se reservo----------------------------*//

export const FuncionMesMasReservadoEstadistica = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/booking/month/${idUser}`);

      dispatch({ type: MES_MAS_RESERVADO, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*--------------------------------Todos los bookings---------------------------------*//

export const FuncionTodosLosBookingsEstadistica = (idUser, rol) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/booking?id_superadmin=${idUser}&rol=${rol}`
      );

      dispatch({ type: TODOS_LOS_BOOKINGS, payload: response.data });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};
//*----------------------------------------------------------------------------*//
/*
Partner:
  - Hoteles mas reservados:  .../booking/mostBooking/:id_admin
  - Traer mes donde mas se reservo:  .../booking/monthPartner/:id_admin
  - Modificar el Hotel:  hotel/update/:id_hotel
*/

//*-------------------------------Estadisticas Partner---------------------------------*//
export const FuncionHotelesMasReservadosPartnerEstadistica = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/booking/mostBooking/${idUser}`
      );
      dispatch({
        type: HOTELES_MAS_RESERVADOS_PARTNER,
        payload: response.data,
      });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*----------------------------------------------------------------------------------------*//

export const FuncionMesDondeMasSeReservaPartnerEstadistica = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/booking/monthPartner/${idUser}`
      );

      dispatch({
        type: MES_MAS_RESERVA_PARTNER,
        payload: response.data,
      });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

//*--------------------------------------Modificar el Hotel--------------------------------------------------*//

export const FuncionModificarHotel = (idHotel) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL_BASE}/hotels/update/${idHotel}`); // body mandar lo que se pinte

      dispatch({
        type: MODIFICAR_HOTEL_PARTNER,
        payload: response.data,
      });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };
};

export const getRequests = (id_user) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/request/${id_user}`);

      dispatch({
        type: GET_REQUESTS,
        payload: response.data,
      });
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  }
}

export const getHotelsAdmin = (id_user) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_BASE}/hotels/allHotels/${id_user}`)

      dispatch({
        type: GET_HOTELS_ADMIN,
        payload: response.data
      })
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  }
}

export const getAllBookings = (id, rol) => {

  return async (dispatch) => {

    try {
      const response = await axios.get(`${URL_BASE}/booking/?id_superadmin=${id}&rol=${rol}`)

      dispatch({
        type: GET_ALL_BOOKINGS,
        payload: response.data
      })
    } catch (error) {
      swal({
        text: error.response.data.error,
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  }
}
