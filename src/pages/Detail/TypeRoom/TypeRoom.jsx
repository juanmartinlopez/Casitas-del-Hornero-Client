//?---------------------------- IMPORTS --------------------------------
//react
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  PedirCheckInCheckOut,
  PedirLocalStorage,
} from "../../../utils/LocalStorage";

//action
import {
  FuncionTypeRoomTypes,
  GetTrolley,
} from "../../../redux/Actions/Actions";

//?----------------- COMPONENTE ROOM TYPE  ------------------------------------
const TypeRoom = ({ id, Trolleys }) => {
  const URL_BASE = import.meta.env.VITE_API;
  const User = PedirLocalStorage();
  const check = PedirCheckInCheckOut();
  const dispatch = useDispatch();
  const { TypeRoom } = useSelector((state) => state);

  const FuncionPostCarrito = async (idUser, idTypeRoom, stock) => {
    if (stock !== 0) {
      if (User) {
        try {
          await axios.post(`${URL_BASE}/cart/${idUser}/${idTypeRoom}`);
          swal({
            text: "Agregado con exito!!",
            icon: "success",
            buttons: "Aceptar",
          });
        } catch (error) {
          swal({
            text: error.response.data.error,
            icon: "warning",
            buttons: "Aceptar",
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
    <div
      key={index}
      className="bg-secondary-color rounded-xl overflow-hidden shadow-dark hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
    >
      <div className="relative">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-48 object-cover"
        />
        {room.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              No disponible
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-color mb-2 font-serif">
          {room.name}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-important-color">
            ${room.price}
          </span>
          <span className="text-secundary-text-color text-sm bg-primary-color px-2 py-1 rounded">
            /noche
          </span>
        </div>

        <div className="flex items-center mb-4 text-secundary-text-color">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 8a2 2 0 11-4 0 2 2 0 014 0zM15 8a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Hasta {room.people} personas</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          {room.stock === 0 ? (
            <span className="text-red-400 font-medium">Sin disponibilidad</span>
          ) : (
            <span className="text-green-400 font-medium">
              {room.stock} disponibles
            </span>
          )}
        </div>

        {User?.rol === 1 && (
          <button
            disabled={room.stock === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
              room.stock === 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-important-color text-primary-color hover:bg-elegant-gold-light transform hover:scale-105 shadow-elegant"
            }`}
            onClick={() =>
              FuncionPostCarrito(User.id, room.id, room.name, Trolleys)
            }
          >
            + Agregar al Carrito
          </button>
        )}
      </div>
    </div>
  ));
};

export default TypeRoom;
