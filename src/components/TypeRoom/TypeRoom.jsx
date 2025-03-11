//?---------------------------- IMPORTS --------------------------------
//react
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { PedirCheckInCheckOut, PedirLocalStorage } from "../Index";
import GetCurrencyExchange from "../CurrencyExchange/GetCurrencyExchange";
import swal from "sweetalert";
// import style from "./TypeRoom.module.css";

import styleLight from "./TypeRoom.module.css"
import styleDark from"./TypeRoomDark.module.css"
//action
import { FuncionTypeRoomTypes, GetTrolley } from "../../redux/Actions/Actions";
import { v4 as uuidv4 } from "uuid";

//?----------------- COMPONENTE ROOM TYPE  ------------------------------------
const TypeRoom = ({ id, Trolleys }) => {
  const URL_BASE = "https://casitasdelhornero.onrender.com";
  const User = PedirLocalStorage();
  const check = PedirCheckInCheckOut();
  const dispatch = useDispatch();
  const [State, setState] = useState([]);
  const idioma = useSelector((state) => state.idioma);
  const theme = useSelector((state) => state.theme);
  const style = theme === "light"?styleLight:styleDark;

  const translations = {
    en: {
      AgregadoCorrectamente: "Added successfully!!",
      Aceptar: "Accept",
      Personas: "People",
      AgregarAlCarrito: "Add to cart",
    },
    es: {
      AgregadoCorrectamente: "Agregado con exito!!",
      Aceptar: "Aceptar",
      Personas: "Personas",
      AgregarAlCarrito: "Agregar al Carrito",
    },
  };
  const { TypeRoom } = useSelector((state) => state);

  const FuncionPostCarrito = async (idUser, idTypeRoom, stock) => {
    if (stock !== 0) {
      if (User) {
        try {
          await axios.post(`${URL_BASE}/cart/${idUser}/${idTypeRoom}`);
          swal({
            text: translations[idioma].AgregadoCorrectamente,
            icon: "success",
            buttons: translations[idioma].Aceptar,
          });
        } catch (error) {
          swal({
            text: error.response.data.error,
            icon: "warning",
            buttons: translations[idioma].Aceptar,
          });
        }
        dispatch(GetTrolley(User.id));
      }
    } else {
      swal({
        text: "No hay Disponibilidad",
        icon: "warning",
        buttons: "Aceptar",
      });
    }
  };

  useEffect(() => {
    const checkIn = check.CheckIn;
    const checkOut = check.CheckOut;
    dispatch(FuncionTypeRoomTypes(id, checkIn, checkOut));
  }, []);

  //{ id, name, image, price, stock, people }

  return TypeRoom?.map((room, index) => (
    <div key={index}>
      <Card className={style.cardContainer} >
        <Card.Body >
          <Card.Title>{room.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <GetCurrencyExchange value={room.price} />
          </Card.Subtitle>
          <Card.Text>
            {translations[idioma].Personas}: {room.people}
          </Card.Text>
          <img className={style.img} src={room.image} />
          {room.stock === 0 ? (
            <Card.Text>No disponible</Card.Text>
          ) : (
            <Card.Text>stock : {room.stock}</Card.Text>
          )}

          {User?.rol === 1 ? (
            <button
              disabled={room.stock === 0}
              className={style.BotonCarrito}
              onClick={() =>
                FuncionPostCarrito(User.id, room.id, room.name, Trolleys)
              }
            >
              + {translations[idioma].AgregarAlCarrito}
            </button>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </div>
  ));
};

export default TypeRoom;
